'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const value = 'shared';

console.log('dynamic1', value);
Promise.resolve().then(function () { return require('./generated-dynamic2.js'); });

exports.value = value;
