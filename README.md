# jest-expect-contain-deep

> Assert deeply nested values in [Jest](https://facebook.github.io/jest/)

## Installation

```sh
yarn add --dev jest-expect-contain-deep
```

## Usage

**Before:**

```js
const containDeep = require('jest-expect-contain-deep');

test('values', () => {
  let massiveObject = getMassiveObject();
  expect(massiveObject.foo).toBe(expect.arrayContaining([1, 2]));
  expect(massiveObject.bar.prop).toBe(true);
  expect(massiveObject.baz).toContain('bar');
});

test('spies', () => {
  doSomething();
  expect(mySpy.mock.calls[0][0].foo).toBe(expect.arrayContaining([1, 2]));
  expect(mySpy.mock.calls[0][0].bar.prop).toBe(true);
  expect(mySpy.mock.calls[0][0].baz).toContain('bar');
});
```

**After:**

```js
const containDeep = require('jest-expect-contain-deep');

test('values', () => {
  expect(getMassiveObject()).toEqual(containDeep({
    foo: [1, 2],
    bar: { prop: true },
    baz: expect.stringContaining('bar'),
  }));
});

test('spies', () => {
  doSomething();
  expect(mySpy).toHaveBeenCalledWith('arg1', containDeep({
    foo: [1, 2],
    bar: { prop: true },
    baz: expect.stringContaining('bar'),
  }));
});
```
