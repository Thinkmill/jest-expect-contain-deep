// @flow
'use strict';

const containDeep = require('./');

test('undefined', () => {
  expect(() => {
    expect(undefined).toEqual(containDeep(undefined));
  }).not.toThrow();

  expect(() => {
    expect(false).toEqual(containDeep(undefined));
  }).toThrow();
});

test('null', () => {
  expect(() => {
    expect(null).toEqual(containDeep(null));
  }).not.toThrow();

  expect(() => {
    expect(false).toEqual(containDeep(null));
  }).toThrow();
});

test('string', () => {
  expect(() => {
    expect('foo').toEqual(containDeep('foo'));
  }).not.toThrow();

  expect(() => {
    expect('foo').toEqual(containDeep('bar'));
  }).toThrow();
});

test('number', () => {
  expect(() => {
    expect(42).toEqual(containDeep(42));
  }).not.toThrow();

  expect(() => {
    expect(42).toEqual(containDeep(3.14));
  }).toThrow();
});

test('boolean', () => {
  expect(() => {
    expect(true).toEqual(containDeep(true));
  }).not.toThrow();

  expect(() => {
    expect(true).toEqual(containDeep(false));
  }).toThrow();
});

test('array', () => {
  expect(() => {
    expect([1, 2, 3]).toEqual(containDeep([1, 2]));
  }).not.toThrow();

  expect(() => {
    expect([1, 2, 3]).toEqual(containDeep([3, 4]));
  }).toThrow();
});

test('obj', () => {
  expect(() => {
    expect({
      foo: 1,
      bar: 2,
    }).toEqual(containDeep({
      foo: 1,
    }));
  }).not.toThrow();

  expect(() => {
    expect({
      foo: 1,
      bar: 2,
    }).toEqual(containDeep({
      bar: 3,
    }));
  }).toThrow();
});

test('another matcher', () => {
  expect(() => {
    expect('foobar').toEqual(containDeep(expect.stringContaining('foo')));
  }).not.toThrow();

  expect(() => {
    expect(true).toEqual(containDeep(false));
  }).toThrow();
});

test('everything', () => {
  expect(() => {
    expect({
      foo: [1, 2, 3],
      bar: { prop: true },
      baz: 'foobarbaz'
    }).toEqual(containDeep({
      foo: [1, 2],
      bar: { prop: true },
      baz: expect.stringContaining('bar'),
    }));
  }).not.toThrow();

  expect(() => {
    expect({
      foo: [1, 2, 3],
      bar: { prop: true },
      baz: 'foobarbaz'
    }).toEqual(containDeep({
      foo: [1, 2],
      bar: { prop: false },
      baz: expect.stringContaining('bar'),
    }));
  }).toThrow();

  expect(() => {
    expect({
      foo: [1, 2, 3],
      bar: { prop: true },
      baz: 'foobarbaz'
    }).toEqual(containDeep({
      foo: [3, 4],
      bar: { prop: true },
      baz: expect.stringContaining('bar'),
    }));
  }).toThrow();
});
