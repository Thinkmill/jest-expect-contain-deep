# jest-expect-contain-deep

> Assert deeply nested values in [Jest](https://facebook.github.io/jest/)

## Installation

```sh
yarn add --dev jest-expect-contain-deep
```

## Usage

```js
const getMassiveObject = require('./lib/getMassiveObject');
const containDeep = require('jest-expect-contain-deep');

test('getMassiveObject', () => {
  expect(getMassiveObject()).toEqual(containDeep({
    foo: [1, 2],
    bar: { prop: true },
    baz: expect.stringContaining('bar'),
  }));
});
```
