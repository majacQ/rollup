'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var value = 42;

const promise = Promise.resolve().then(function () { return require('./generated-dynamic.js'); }).then(result => console.log('main', result, value));

var main = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	promise: promise
}, '__esModule', { value: true }));

exports.main = main;
exports.promise = promise;
exports.value = value;
