# lensalot

> Lens approach to global react state via Hooks

[![NPM](https://img.shields.io/npm/v/lensalot.svg)](https://www.npmjs.com/package/lensalot) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save lensalot #or
yarn add lensalot
```

## Usage

```jsx
import React from 'react';
import { LensProvider, useLens } from 'lensalot';

const state = {
  logic: {
    foo: false,
    count: 0,
  },
};

const Count = () => {
  const [count] = useLens('logic.count');
  return <p>{count}</p>;
};

const Increment = () => {
  const [count, setCount] = useLens('logic.count');
  return <button onClick={() => setCount(count + 1)}>+</button>;
};

const Toggle = () => {
  const [foo, setFoo] = useLens('logic.foo');
  return <button onClick={() => setFoo(!foo)}>{foo ? 'foo' : 'bar'}</button>;
};

const Logic = () => {
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
```

## License

MIT © [oakfang](https://github.com/oakfang)
