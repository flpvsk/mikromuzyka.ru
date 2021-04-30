import React, { useState, useEffect, } from 'react';
import styled from '@emotion/styled';
import BoxFlex from '~/shared/BoxFlex';

const styles = {
  block: {
    display: 'flex',
    width: '100%',
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

  pipeline: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  processWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  process: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
  },

  comms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    whiteSpace: 'nowrap',
    minWidth: 54,
    minHeight: 32,
    paddingTop: 8,
  },

  comm_positive: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'mediumseagreen',
    whiteSpace: 'nowrap',
  },

  comm_negative: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'tomato',
    whiteSpace: 'nowrap',
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

};

async function timeout(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), t);
  });
}

let updateId = 0;

export default function DemoCrud({ header, hasRandomDelay }) {
  const [dbValue, setDbValue] = useState(1);
  const [app1Value, setApp1Value] = useState(1);
  const [app2Value, setApp2Value] = useState(1);
  const [delay, setDelay] = useState(4);
  const [app1ToDb, setApp1ToDb] = useState([]);
  const [app2ToDb, setApp2ToDb] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  function reload() {
    setApp1Value(dbValue);
    setApp2Value(dbValue);
  }

  async function updateApp1Value(v) {
    setApp1Value(v);
    const id = updateId++;
    const d = hasRandomDelay ? Math.round(Math.random() * delay) : delay;
    let queue = [
      ...app1ToDb, {
        id,
        end: Date.now() + d * 1000,
        value: v,
      }
    ];
    setApp1ToDb(queue);
    await timeout(delay * 1000);
    setDbValue(v);
  }

  async function updateApp2Value(v) {
    setApp2Value(v);
    const id = updateId++;
    const d = hasRandomDelay ? Math.round(Math.random() * delay) : delay;
    let queue = [
      ...app2ToDb, {
        id,
        end: Date.now() + d * 1000,
        value: v,
      }
    ];
    setApp2ToDb(queue);
    await timeout(d * 1000);
    setDbValue(v);
  }

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 500);
    return () => clearInterval(interval);
  });

  const delayStr = hasRandomDelay ? `0s - ${delay}s` : `${delay}s`;

  return (
    <div style={styles.block}>
      <div style={styles.row_header}>
        <h4 style={styles.h4}>
          {header}
        </h4>
      </div>
      <BoxFlex
        flexDirection={[ 'column', 'row', ]}
        alignItems={[ 'center' ]}
        justifyContent={'space-between'}
      >
        <div style={styles.process}>
          <label>{`User's laptop`}</label>
          <div style={styles.btnRow}>
            <Btn
              selected={app1Value}
              value={1}
              update={updateApp1Value}
            />
            <Btn selected={app1Value} value={2} update={updateApp1Value} />
            <Btn selected={app1Value} value={3} update={updateApp1Value} />
          </div>
        </div>
        <div style={styles.comms}>
          <label>{``}</label>
          {app1ToDb.filter(e => e.end - currentTime > 0).map(e => (
            <div key={e.id} style={styles.comm_positive}>
              {
                `${e.value} ` +
                `in ${Math.round((e.end - currentTime) / 1000)}s`
              }
            </div>
          ))}
        </div>
        <div style={styles.process}>
          <label>{`Server`}</label>
          <h4 style={styles.h4}>{dbValue}</h4>
        </div>
        <div style={styles.comms}>
          <label>{``}</label>
          {app2ToDb.filter(e => e.end - currentTime > 0).map(e => (
            <div key={e.id} style={styles.comm_positive}>
              {
                `${e.value} ` +
                `in ${Math.round((e.end - currentTime) / 1000)}s`
              }
            </div>
          ))}
        </div>
        <div style={styles.process}>
          <label htmlFor='app2Value'>{`User's phone`}</label>
          <div style={styles.btnRow}>
            <Btn selected={app2Value} value={1} update={updateApp2Value} />
            <Btn selected={app2Value} value={2} update={updateApp2Value} />
            <Btn selected={app2Value} value={3} update={updateApp2Value} />
          </div>
        </div>
      </BoxFlex>
      <div style={styles.row}>
        <label htmlFor='delay' style={{marginRight: 4}}>
          Delay: {delayStr}
        </label>
        <input
          type='range'
          id='delay'
          min={0}
          max={10}
          step={1}
          value={delay}
          onChange={e => setDelay(e.target.value)}
        />
      </div>
      <div style={styles.row}>
        <button style={styles.button} onClick={reload}>
          Reload all
        </button>
      </div>
    </div>
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
