// @flow
'use strict';

const expect = require('expect');
const asymmetricMatcher = Symbol.for('jest.asymmetricMatcher');

/*::
type Input =
  | void
  | null
  | boolean
  | string
  | number
  | Array<Input>
  | { [key: any]: Input };
*/

function isAsymmetricMatcher(obj) {
  return obj['$$typeof'] === asymmetricMatcher;
}

function containDeep(input /*: Input */) {
  if (typeof input === 'function') {
    return input;
  } else if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return expect.arrayContaining(input.map(item => {
        return containDeep(item);
      }));
    } else if (input instanceof RegExp) {
      return expect.stringMatching(input);
    } else if (input !== null && !isAsymmetricMatcher(input)) {
      let obj = {};
      let safeRef = input;
      Object.keys(input).forEach(key => {
        obj[key] = containDeep(safeRef[key]);
      });
      return expect.objectContaining(obj);
    }
  }
  return input;
}

module.exports = containDeep;
