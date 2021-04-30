import { makeBlogPost } from '~/layouts/BlogPostLayout';
import Details from '~/shared/Details';
import DemoCrud from '~/shared/DemoCrud';
import DemoEventSourcing from '~/shared/DemoEventSourcing';

export const meta = {
  title: `Building offline-first web and mobile apps using event-sourcing`,
  heading: `Building offline-first web and mobile apps using event-sourcing`,
  publishDate: '2019-07-20',
  author: 'Andrey Salomatin',
  image: '/static/blog/eventsourcing/serverroom.png',
  description: (
    `An interactive practical guide to building local-first ` +
    `and real-time applications using event-sourcing.`
  ),
};

export default makeBlogPost(meta);

Today [CRUD][crud] is *the default* paradigm for managing data in a
user-facing application. It works fine if the user's device has a stable
internet connection, but makes the app unusable in the case of an absent or
poor connection. Even when online using CRUD eventually leads to loss of
data and ordering issues due to the concurrent nature of network
communication.

This post is a detailed description of how I use event-sourcing to
overcome limitations of CRUD and some of the problems that come with this
approach.

![Inside the server](/static/blog/eventsourcing/serverroom.png)

## The problem

When we use CRUD, we tether our frontend application to the server. The
server's database becomes the ultimate source of truth. The UI becomes a
view of the server's database. Keeping that view up to date is hard.
Adding layers of caching and processing in between the frontend and the
database makes it even harder.

Here's a quick demo. Let's say we have a single number that we want to
synchronize between 3 instances of the app:

* App on the user's laptop;
* App on the user's smartphone;
* Server.

Let's say each instance loads the value from the server upon startup. To
make user experience better, each frontend updates the UI as soon as the
user clicks on a button and makes the update call to the server
immediately after. To simulate network conditions, we'll add a delay in
frontend-to-server communication. "Reload all" button sets the value on
each of the frontends to the current value on the server.

<DemoCrud header='Fixed delay' />

Try clicking on the User's buttons and "Reload all" and you'll notice how
unpredictable the final state of the system can be. We might end up in a
state where each instance has a different value or we might end up in a
consistent state.

Let's bring the system even closer to real conditions and randomize the
time it takes for an update to reach the database:

<DemoCrud
  header='Random delay'
  hasRandomDelay
/>

The state of the system becomes less and less predictable.

Things get even more complex if we add offline/poor connection to the
picture. Do we allow users to edit the value while offline?

* If yes, how do we sync that value to the database once the device is back online? How do we know that the value wasn't changed by a different process during the "offline time";
* If no, how do we detect if the device is truly offline? It's possible that we have got no or very slow internet even if the sensors on a device tell us we're connected.


### Workarounds

There are tricks we could employ to improve the situation, without having
to get rid of CRUD. For example:

* Poll data from the server at regular intervals to make sure UI is up to date with the server;
* Restrict offline edits, using regular ping-style checks to the API host to determine whether we're offline;
* Use a versioning system similar to the one in [CouchDB][couchdb]. Only allow those updates that have the up-to-date version number of the object attached.

These tricks might make the system a bit more reliable, but they will
*worsen* user experience.

## Local-first

A better way is to untether the frontend from the server. The client app needs to be able to:

* Work online, offline or on a slow or unreliable connection;
* It should provide full, unrestricted experience when offline;
* Once two instances of the app had a chance to exchange messages (via a server or directly), they need to be able to come to the same "truth", to converge on the same value;

To do that we need to move the app logic to the client. Make the
user-facing app behave more like Winamp less like Soundcloud.

In the client-server model, the server is the ultimate authority and hence
the ultimate bottleneck. We need to move towards a *peer-to-peer* or
*local-first* model.


### Three comrades

Before we dive into event-sourcing, I'd like to give a real-world
example that could help us understand how it works. First time I've heard
that example was from someone from [Scuttlebutt][scuttlebutt] community
and it's been very helpful to me.

Say there are three friends: Ginny, Harry and Ron. They know each other
pretty well, but they've been busy lately and haven't seen or heard from
each other for a couple of months.

Imagine now that Ron meets Ginny and they catch up. Now Ron knows that
Ginny has passed her exams successfully and Ginny knows that Ron's rat
disappeared. Both of those facts are unknown to Harry.

Sometime later Ginny meets Harry. The CRUD approach to get Harry up to
speed would be for Ginny to describe who Ron is in every detail including
the fact that *Ron doesn't have a rat*. Outside of it being weird to
mention that last point, it would be a very inefficient way to
tell Harry what's been going on with his friend.

In the real world it would go a bit different though. Ginny would ask Harry
when was the last time he'd heard of Ron and then describe to him events
that happened to his friend after that moment.

Their communication model gives us a good idea of how event-sourcing works.

## Event-sourcing

In the event-sourcing model each instance of the app has its
append-only log of events. Events are atomic updates that correspond to
user actions in the app. Those logs of events are what gets synchronized between all the instances of the app, including the server.

So, let's say we have a user profile object that looks like this:

```js
// User profile object shape

{
  id: "user-profile-a1",
  firstName: "Andrei",
  lastName: "Salomatin
}
```

Instead of working directly with this object, whenever we want to read or
update it, we would work with events that later will be reduced to become
that object.

This is similar to how in banking software we don't write code that
manipulates the balance of client's account directly. Instead, we add
transactions to an append-only log and calculate the final balance based
on that log.

```js
// User profile events

[
  {
    localEventId: "update-profile-1@laptop",
    originEventId: "update-profile-1@phone",
    eventType: "setFirstName",
    objectId: "user-profile-a1",
    data: {
      firstName: "Andrey"
    }
  },
  {
    localEventId: "update-profile-1@laptop",
    originEventId: "update-profile-2@laptop",
    eventType: "setLastName",
    objectId: "user-profile-a1",
    data: {
      lastName: "Salomatin"
    }
  }
]
```

Events represent atomic operations. They must contain all the necessary
data for us to later be able to reconstruct the object. They *can* also
contain additional info.  For example, for audit purposes, each event might
have a `userId` and a `timestamp` set.

Each event has an `originEventId` that never changes and a `localEventId`
that is assigned by the replica at the moment it observes that event.

The `objectId` field is the globally unique identifier of the object the
event is related to. In the example above that object is my user's
profile.

To reconstruct an actual value-object from a log of events, we can use a
reducer:

```js
// User profile reducer

function userProfileReducer(state, event) {
  return {
    ...state,
    id: event.objectId,
    ...event.data
  };
}

const userProfile = events.reduce(userProfileReducer, {});
```

### Synchronizing events

I'll call an instance of the app **a replica.**  It could be a client app
or a server.

Each replica has its *append-only* log of events. Another way to think
about it is that each replica records all the events in the order it
observes them.

Whenever a replica creates a new event, it generates a unique monotonically
increasing identifier and assigns it to *two fields*: `localEventId` and
`originEventId`.

* `localEventId` is an indicator of the order in which a replica has observed an event, it changes from replica to replica;
* `originEventId` is the actual id of the event, it stays the same across replicas.

<DemoEventSourcing header='Conflict detection w/ event-sourcing' />

Whenever a replica observes an event created by someone else, it overrides
its `localEventId` before adding it to its log.  That way we know the
relative order of events on any replica. `originEventId` always stays the
same.

Only the event's origin replica (the replica that has created that
concrete event) would have `localEventId` and `originEventId` for that
event set to the same value.

Because every event has a unique `originEventId`, it makes it easy to
synchronize events across devices. In case of a poor connection, we can
retry sending events without the risk of applying the same update several
times.

We can use `localEventId`s to retrieve only those events that we haven't
seen yet. For example, if `ReplicaA` hasn't received any events from
`ReplicaB`, it will query *all the events* and add them to its log. But if
`ReplicaA` has received some events from `ReplicaB`, with the last
`localEventId (on ReplicaB) === 'event-5'`. `ReplicaA` can now query
events that `ReplicaB` *observed after* `event-5`.

> It's not easy to explain the sync process with just text,
> so please do play around with the demo above.
>
> The demo shows how we can detect conflicts: one replica changing its
> number to `ValueA` before receiving an update with a different value,
> `ValueB`, from another replica.

### Reducers

Capturing and syncing events across replicas was the hard part, but it's
not very useful in itself. How can we show actual values to the user?

I've already mentioned reducers – functions that can help us transform a
list of events into a value-object. Here's how a simple
last-write-wins reducer might look like:

```js
// Last-write-wins reducer

function reducer(state = initialState, event) {
  if (state.version > event.originEventId) {
    return state;
  }

  return {
    ...state,
    version: event.originEventId,
    value: event.data.value,
  };
}
```

If we want to do something more complex, like conflict detection, the
reducer will look slightly different:


```js
// Conflict-detecting reducer, simplified

function reducer(state = initialState, event) {
  if (state.version > event.originEventId) {
    return {
      ...state,
      hasConflict: true,
      conflictingValues: (
        state.conflictingValues.concat([
          event.data.value
        ])
      ),
    };
  }

  return {
    ...state,
    hasConflict: false,
    version: event.originEventId,
    value: event.data.value,
  };
}
```

What's great is that we can swap the reducer as the app and the business
requirements change. As long as events contain all the necessary metadata
for the new reducer to work – we can painlessly fit it in.

At the same time, if reducers are pure functions with no side-effects,
we can reuse them across the backend/frontend parts of the application.

Here's an example of the app with several different reducers:

<DemoEventSourcing
  header='Using different reducers on the same data'
  showReducers={true}
/>

### Snapshots

We can now reduce events and get the actual value, how do we filter and
query data that is scattered across hundreds of tiny events?

This is where snapshots come in. Snapshot is a versioned value-object
saved in indexable storage. Here's how to generate a snapshot from
scratch:

1. List all the local events related to an object using `objectId`;
2. Run those events through a reducer to get the value-object;
3. The most recent (largest) `localEventId` among those events is the `version` of the snapshot;
4. Save the snapshot alongside its version in indexable storage.

Now let's say the app receives new events related to an object that
already has an older snapshot. In this case:

1. Get the most recent snapshot of the object by its `objectId`;
2. List all the local events related to that object starting from the `localEventId` equal to the `version` of the most recent snapshot;
3. Run those events through a reducer using the snapshot as the initial state;
4. The most recent (largest) `localEventId` among those events is the `version` of the snapshot;
5. Save the snapshot alongside its version in indexable storage.

Snapshots are expendable, we can delete and recreated them whenever we
need. The typical usecase for Snapshots is feeding list views, tables and
search features in an app.

We can store snapshots on all replicas or not use them at all. That
depends on the experience we want to achieve.

For example, if we want to let users be able to search through their social
media feed offline, we'd have to store a significant amount of snapshot
data locally. If that's not required, we can use the server for such
queries. The third option is to do something in between – my apps typically
store snapshots of at least 1 page worth of content locally and load
everything else from the server if required.


### Storage

We can store both events and snapshots in any SQL/NoSQL storage on both
frontend and backend, browser and mobile.

Events table (or collection) contains all the events for all the objects
in the system that use event-sourcing. Events storage would normally have
unique indexes on `localEventId`, `originEventId` and `objectId` fields.

Snapshots storage would have an index on `[ objectId, version ]` pair and
any other fields we want to query or search. For example, a `User` object
might have a full-text index on the `fullName` field.

As to the concrete storage engines. In the web browser, IndexedDB fits
perfectly, on a mobile device SQLite does the job. I've had some
experience with MongoDB, MSSql Server, MySQL.  All work fine.

When using an SQL storage I tend to store indexable fields in separate
columns and the rest of the data as a JSON string in a column named
`rawData` or somesuch.

The only tricky part is finding out how can we index `*EventId` fields so
that we can query events in order. That depends on the clock
implementation you choose. More on this later.

### Transport

We can use HTTP(S) to sync events and snapshots via a [REST][rest] or a
[GraphQL][graphql] API, it's no different from how we'd normally build a
server.

Making real-time apps is easy with event-sourcing too. We can use
[Websocket][websocket] to send events to all subscribed replicas.

If we are on a mobile or a desktop device we can bypass the server
completely and sync devices directly using [libp2p][libp2p] or [dat][dat].
The approach would be *exactly the same*. It could work in a web-browser
too, through [WebRTC][webrtc], although not without quirks and problems
intrinsic to that protocol.

We can combine approaches. Normally in an app, I would use both REST or
GraphQL and a Websocket. For example, REST for sending events to the
server, querying snapshots and receiving initial event log for an object,
Websocket for receiving updates related to that object in real-time.

The beauty of event-sourcing is it doesn't depend on the transport you
choose. Use whatever works for your app. The sync code will be the same.

### Clocks and generating event IDs

Choosing the right algorithm for generating eventIds is extremely
important. Remember that those ids should be globally unique, locally
monotonically increasing and ideally as close to globally monotonically
increasing as we can get. Let's get into those properties one at a time:

**Globally unique**<br />We are working with a distributed system. Parts of the system might go offline at any point. We need a globally unique identifier to be able to distinguish events from each other;

**Monotonically increasing (within replica)**<br/>
Events happen in order. At least they do so on a single replica. Order is important for programs to be able to calculate the final value object.

`[ (set 1), (set 2) ]` will yield a different final value than `[ (set 2), (set 1) ]`;

**Monotonically increasing (globally)**<br/>
This is the trickiest condition. In an ideal world, all the events
happening on all the replicas would have an absolute and precise order.
That is possible *in theory*. *In theory*, if all the physical clocks on
all the computers in the system would be perfectly synchronized, we could
use timestamps as identifiers. *In practice*, synchronizing clocks
precisely across several machines is impossible.

Physical clocks can not do the job, so people invented
[logical][logicalClock] and [hybrid][hybridClock] clocks. The goal of
those is to get us as close as possible to the ideal scenario without
relying too much on communication between replicas.

Clocks is a large subject in itself and frankly, I don't know enough to
talk about it. Here's the approach I'm using in my projects that I picked
up from [Victor Grischenko's][victor] work on [RON][ron]:

* Each replica (server process, a tab in the browser, a mobile app) has an instance of a hybrid clock;
* Whenever a new event is created on a replica, we use that clock to generate an id for that event. That id is a combination of a replica's name, a timestamp and a sequence number. The clock "remembers" the last id it generated to guarantee that the next id would be larger than the previous one;
* Whenever we receive an event from another replica, we check it's `localEventId` against the last value remembered by our local clock. If it is larger, we override the remembered value;
* On app startup, we initialize the local clock instance with the largest `localEventId` from the local storage.

### Pros of event-sourcing

* The app can work online / offline and with poor connectivity;
* We can share most of the code for working with events and snapshots across the server and different clients;
* Concurrency issues become *possible* to detect and debug;
* The amount of traffic the app generates decreases;
* We can add offline features gradually;
* We can vary depending on a feature or even user preferences how much data we want to store for offline use;
* Client devices can sync with each other without relying on the server;
* We can change business logic retroactively by changing reducers, as long as events contain all the necessary data for the new reducer to work;
* We can store additional metadata with the event. Things like the user that made the edit and the timestamp.


### Cons of event-sourcing

Compared to CRUD here are the things we have to be aware of:

* The amount of data we need to store on devices and *especially* on the server grows significantly. That issue is still an area of active research. If you're curious about the subject, check out Victor's work on [RON][ron];
* We're bringing business logic to the client, that might be a security or an intellectual property concern;
* It's a new paradigm for many developers. It takes time and effort to get a hang of it and there's not much information out there.

It doesn't seem like much if we look at sheer numbers, but these three
points are *very significant* and can overshadow the benefits of
event-sourcing.


## Finale


I've built several applications using a combination of event-sourcing and
CRUD. I use CRUD for the data that rarely changes, doesn't need to be
updated offline or by several users at a time. I use event-sourcing for
everything that needs offline and real-time functionality: chat,
collaborative editing, local-first applications.

It's astonishing how powerful and underutilized our users' devices are.
I believe if we want to improve UX and performance of our apps we have to
step away from CRUD and try new approaches.

---

I've tried to make this article as practical and hands-on as possible and
leave history and philosophy for some other time.
Please reach out and share your experience using event-sourcing in
building web and mobile apps, or send in questions and suggestions for
other articles on the subject.


[crud]: https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete
[rest]: https://en.wikipedia.org/wiki/Representational_state_transfer
[couchdb]: https://docs.couchdb.org/en/stable/api/document/common.html#updating-an-existing-document
[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[sqlite]: https://www.sqlite.org/index.html
[scuttlebutt]: https://www.scuttlebutt.nz/
[graphql]: https://graphql.org/
[websocket]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[webrtc]: https://developer.mozilla.org/en-US/docs/Glossary/WebRTC
[libp2p]: https://github.com/libp2p
[dat]: https://dat.foundation/
[logicalClock]: https://en.wikipedia.org/wiki/Logical_clock
[hybridClock]: http://sergeiturukin.com/2017/06/26/hybrid-logical-clocks.html
[victor]: https://twitter.com/gritzko
[ron]: http://replicated.cc
