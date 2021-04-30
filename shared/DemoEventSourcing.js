import React, { useState, useEffect, } from 'react';
import BoxFlex from '~/shared/BoxFlex';

const styles = {
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'stretch',
    alignItems: 'stretch',
    marginTop: 16,
    marginBottom: 16,
    border: '1px solid #050505',
    color: '#050505',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    fontSize: '0.9rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#fdf6e3',
  },

  process: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: '33%',
    padding: 8,
  },

  comms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    minWidth: 48,
    paddingTop: 8,
  },

  comm_positive: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'mediumseagreen',
  },

  comm_negative: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'tomato',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  row_header: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  row_log: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },

  button: {
    fontSize: '1em',
    padding: 8,
    marginRight: 4,
  },

  btnRow: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },


  h4: {
    margin: 0,
    fontSize: '1.2em',
    fontWeight: 'normal',
  },

  ul: {
    padding: 0,
  },
};

const conflictDetectionInit = {
  value: null,
  originEventId: null,
  hasConflict: false,
  conflictingValues: [],
};

function conflictDetectionReducer(state = conflictDetectionInit, event) {
  if (
    state &&
    state.version &&
    state.version > event.originEventId &&
    state.value !== event.data.value
  ) {
    const values = state.value ? [ state.value ] : state.conflictingValues;
    return {
      ...state,
      hasConflict: true,
      conflictingValues: values.concat([event.data.value]),
      value: state.value,
    };
  }

  return {
    ...state,
    value: event.data.value,
    version: event.originEventId,
    hasConflict: false,
    conflictingValues: [],
  };
}


const lastWriteWinsInit = { value: null };
function lastWriteWinsReducer(state = lastWriteWinsInit, event) {
  if (state.version > event.originEventId) {
    return state;
  }

  return {
    ...state,
    version: event.originEventId,
    value: event.data.value,
  };
}

const maxInit = { value: null };
function maxReducer(state = maxInit, event) {
  return {
    ...state,
    value: Math.max(state.value, event.data.value),
  };
}


function sync({
  from,
  to,
  setFrom,
  setTo,
  fromReplica,
  toReplica,
}) {
  const toAppend = [];
  const fromAppend = [];

  for (let event of from) {
    if (!to.find(e => e.originEventId === event.originEventId)) {
      toAppend.push({
        ...event,
        localEventId: genId(toReplica),
      });
    }
  }

  for (let event of to) {
    if (!from.find(e => e.originEventId === event.originEventId)) {
      fromAppend.push({
        ...event,
        localEventId: genId(fromReplica),
      });
    }
  }

  setTo(to.concat(toAppend));
  setFrom(from.concat(fromAppend));
}

function getTime(id) {
  const idPart = id.split('@')[0];
  return idPart.split('.')[0];
}

function getSeq(id) {
  const idPart = id.split('@')[0];
  return Number(idPart.split('.').slice(-1)[0]);
}

const lastIdByReplica = {};

function genId(replica) {
  const d = new Date();
  const newTime = (
    `${d.getMinutes()}:` +
    `${d.getSeconds()}`
  );
  let newSeq = 0;
  const last = lastIdByReplica[replica];
  if (last && getTime(last) === newTime) {
    newSeq = getSeq(last) + 1;
  }
  const newId = `${newTime}.${newSeq}@${replica}`;
  lastIdByReplica[replica] = newId;
  return newId;
}


function byOrigin(e1, e2) {
  if (e1.originEventId > e2.originEventId) {
    return 1;
  }

  if (e1.originEventId < e2.originEventId) {
    return -1;
  }

  return 0;
}

function byLocalReverse(e1, e2) {
  if (e1.localEventId > e2.localEventId) {
    return -1;
  }

  if (e1.localEventId < e2.localEventId) {
    return 1;
  }

  return 0;
}

const reducers = [
  {
    name: 'Conflict detection',
    reducer: conflictDetectionReducer,
    initValue: conflictDetectionInit,
  },
  {
    name: 'Last-write-wins',
    reducer: lastWriteWinsReducer,
    initValue: lastWriteWinsInit,
  },
  {
    name: 'Max reducer',
    reducer: maxReducer,
    initValue: maxInit,
  },
];

export default function DemoEventSourcing({ header, showReducers, }) {
  const [app1Events, setApp1Events] = useState([]);
  const [app2Events, setApp2Events] = useState([]);
  const [serverEvents, setServerEvents] = useState([]);
  const [reducerIndex, setReducerIndex] = useState(0);

  const reducerOption = reducers[reducerIndex];

  async function updateApp1Value(v) {
    const eventId = genId('laptop');
    setApp1Events(app1Events.concat([{
      localEventId: eventId,
      originEventId: eventId,
      data: {
        value: v,
      }
    }]));
  }

  async function updateApp2Value(v) {
    const eventId = genId('phone');
    setApp2Events(app2Events.concat([{
      localEventId: eventId,
      originEventId: eventId,
      data: {
        value: v,
      }
    }]));
  }

  function syncApp1() {
    sync({
      from: app1Events,
      to: serverEvents,
      setFrom: setApp1Events,
      setTo: setServerEvents,
      fromReplica: 'laptop',
      toReplica: 'server',
    });
  }

  function syncApp2() {
    sync({
      from: app2Events,
      to: serverEvents,
      setFrom: setApp2Events,
      setTo: setServerEvents,
      fromReplica: 'phone',
      toReplica: 'server',
    });
  }

  function reset() {
    setApp1Events([]);
    setApp2Events([]);
    setServerEvents([]);
  }

  const app1State = [...app1Events]
    .reduce(reducerOption.reducer, reducerOption.initValue);

  const app2State = [...app2Events]
    .reduce(reducerOption.reducer, reducerOption.initValue);

  const serverState = [...serverEvents]
    .reduce(reducerOption.reducer, reducerOption.initValue);

  const app1Value = app1State.value;
  const app2Value = app2State.value;
  const serverValue = serverState.value;

  const sortedApp1 = [...app1Events].sort(byLocalReverse);
  const sortedApp2 = [...app2Events].sort(byLocalReverse);
  const sortedServer = [...serverEvents].sort(byLocalReverse);

  let reducerOptions = null;
  if (showReducers) {
    reducerOptions = reducers.map((option, i) => (
      <div key={`reducer-option-${i}`} style={{ marginRight: 16 }}>
        <input
          style={{ marginRight: 8 }}
          id={`reducer-${i}`}
          type='radio'
          name='reducer-option'
          checked={i === reducerIndex}
          onChange={() => setReducerIndex(i)}
        />
        <label htmlFor={`reducer-${i}`}>{option.name}</label>
      </div>
    ));
  }

  return (
    <div style={styles.block}>
      <div style={styles.row_header}>
        <h4 style={styles.h4}>
          {header}
        </h4>
      </div>
      <div style={styles.row}>
        {reducerOptions}
      </div>
      <BoxFlex
        flexDirection={[ 'column', 'row', ]}
        alignItems={[ 'center', 'stretch', ]}
        justifyContent={'space-between'}
      >
        <div style={styles.process}>
          <BoxFlex flexDirection='column' alignItems='center'>
            <label>{`User's laptop`}</label>
            <div style={styles.btnRow}>
              <Btn selected={app1Value} value={1} update={updateApp1Value} />
              <Btn selected={app1Value} value={2} update={updateApp1Value} />
              <Btn selected={app1Value} value={3} update={updateApp1Value} />
            </div>
            <div>
              <button onClick={syncApp1} style={styles.button}>
                Sync with server
              </button>
            </div>
            <ConflictInfo {...app1State} />
          </BoxFlex>
          <ul style={styles.ul}>
            {sortedApp1.map(e => <Event key={e.localEventId} {...e} />)}
          </ul>
        </div>
        <div style={styles.process}>
          <BoxFlex flexDirection='column' alignItems='center'>
            <label>{`Server`}</label>
            <h4 style={styles.h4}>{serverValue}</h4>
            <ConflictInfo {...serverState} />
          </BoxFlex>
          <ul style={styles.ul}>
            {sortedServer.map(e => <Event key={e.localEventId} {...e} />)}
          </ul>
        </div>
        <div style={styles.process}>
          <BoxFlex flexDirection='column' alignItems='center'>
            <label htmlFor='app2Value'>{`User's phone`}</label>
            <div style={styles.btnRow}>
              <Btn selected={app2Value} value={1} update={updateApp2Value} />
              <Btn selected={app2Value} value={2} update={updateApp2Value} />
              <Btn selected={app2Value} value={3} update={updateApp2Value} />
            </div>
            <div>
              <button onClick={syncApp2} style={styles.button}>
                Sync with server
              </button>
            </div>
            <ConflictInfo {...app2State} />
          </BoxFlex>
          <ul style={styles.ul}>
            {sortedApp2.map(e => <Event key={e.localEventId} {...e} />)}
          </ul>
        </div>
      </BoxFlex>
      <div style={styles.row}>
        <button style={styles.button} onClick={reset}>Reset all</button>
      </div>
    </div>
  );
}


function ConflictInfo({ hasConflict, conflictingValues }) {
  if (!hasConflict) {
    return <div style={{minHeight: '1em'}} />;
  }

  const values = [...conflictingValues].reverse();
  const text = `Has conflict: ${values.join(' vs ')}`;

  return (
    <div style={{minHeight: '1em', color: 'tomato'}}>{text}</div>
  );
}


function Event({ localEventId, originEventId, data }) {
  const pStyle = { margin: 0, marginTop: 4 };
  const liStyle = {
    fontSize: '0.82em',
    listStyle: 'none',
    borderBottom: '1px solid #050505',
    marginBottom: 8,
    marginLeft: 8,
  }
  return (
    <li style={liStyle}>
      <p style={pStyle}>
        <b>{`value: `}{`${data.value}`}</b>
      </p>
      <p style={pStyle}>
        {`localEventId: `}<i>{`${localEventId}`}</i>
      </p>
      <p style={pStyle}>
        {`originEventId: `}<i>{`${originEventId}`}</i>
      </p>
    </li>
  );
}


function Btn({ selected, value, update }) {
  const disabled = selected === value;
  return (
    <button
      style={styles.button}
      disabled={disabled}
      onClick={() => update(value)}
    >
      {value}
    </button>
  );
}

function getReplicaName(eventId) {
  return eventId.split('@').slice(-1)[0];
}

