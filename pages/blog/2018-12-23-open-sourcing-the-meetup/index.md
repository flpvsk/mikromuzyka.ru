import { makeBlogPost } from '../../../layouts/BlogPostLayout';

export const meta = {
  title: 'Open-sourcing the Meetup',
  publishDate: '2018-12-23',
  author: 'Andrey Salomatin',
  description: `Increasingly meetups are dependent on platforms like Meetup.com and Facebook. Is it the best option? Let’s imagine an open-source version of meetup software.`,
};

export default makeBlogPost(meta);


# Open-sourcing the Meetup

A while back I was helping organize MoscowJS, a meetup that by now has turned into a larger event. Before I stepped down as an organizer, I wrote a bunch of docs for future speakers and organizers and put it on Github.
I remembered that recently and decided to revive that initiative. This time though I'm thinking bigger.

## Issues

Increasingly meetups are dependent on platforms like Meetup.com and Facebook. Network effects help with discovery and that's cool, that's how most participants find those meetups. But outside of the discovery use-case, experience with those networks for meetup organizers is poor:
* Even on Meetup.com there's no actual information about how to organize a meetup;
* There's no direct channel of communication with participants;
* Not possible to move from one platform to another;
* "Everything looks and feels the same";
* All the other tropes of a centralized service.

## Proposal

With `tinymeetup` initiative, I would like to:
* Document most of the aspects of organizing a meetup: different formats, how to find a venue etc;
* Gather cool tips from organizers. This is an example from KyivJS: if a person comes to an overbooked event without RSVP, they should bring a pizza / drinks;
* Give some localized information e.g. what are some of the good places for a meetup in Berlin;
* Provide a place where people can ask questions and get help (via GitHub issues for now);
* Build open-source tools that help meetup organizers (I've started with this [meetup website template](https://github.com/tinymeetup/tinymeetup-web)). Eventually I'd love to build a tool that looks like a New Meetup form on Meetup.com, that would generate a website with some sort of free hosting, create a free/cheap newsletter etc

## Open questions

* I'm curious, if you were ever organizing a meetup: what were some of the challenges you had?
* If you ever started or wanted to start a meetup, I'd be curious to hear your story.
There's not much ready yet, but you can get an idea of how it could look like here: https://github.com/tinymeetup.

