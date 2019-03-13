import React, { Component } from 'react';

import { LensProvider, useLens } from 'lensalot';

const state = {
  logic: {
    foo: false,
    count: 0,
  },
};

const Count = () => {
  console.log('count');
  const [count] = useLens('logic.count');
  return <p>{count}</p>;
};

const Increment = () => {
  console.log('increment');
  const [count, setCount] = useLens('logic.count');
  return <button onClick={() => setCount(count + 1)}>+</button>;
};

const Toggle = () => {
  console.log('toggle');
  const [foo, setFoo] = useLens('logic.foo');
  return <button onClick={() => setFoo(!foo)}>{foo ? 'foo' : 'bar'}</button>;
};

const Logic = () => {
  console.log('logic');
  const [logic] = useLens('logic');
  return <p>{JSON.stringify(logic)}</p>;
};

function Root() {
  return (
    <LensProvider state={state}>
      <Count />
      <Increment />
      <Toggle />
      <Logic />
    </LensProvider>
  );
}

export default class App extends Component {
  render() {
    return (
      <div className="x">
        <Root />
      </div>
    );
  }
}
