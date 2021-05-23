'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var external1 = require('external1');
var external2 = require('external2');

function _interopNamespace(e) {
	if (e && e.__esModule) { return e; } else {
		var n = Object.defineProperty(Object.create(null), '__esModule', { value: true });
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () {
							return e[k];
						}
					});
				}
			});
		}
		n['default'] = e;
		return Object.freeze(n);
	}
}

var external1__namespace = /*#__PURE__*/_interopNamespace(external1);
var external2__namespace = /*#__PURE__*/_interopNamespace(external2);

var reexportExternal = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), external1__namespace), '__esModule', { value: true }));

const extra = 'extra';

const override = 'override';
var reexportExternalsWithOverride = { synthetic: 'synthetic' };

var reexportExternalsWithOverride$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), external1__namespace, external2__namespace, reexportExternalsWithOverride, {
	override: override,
	'default': reexportExternalsWithOverride,
	extra: extra
}), '__esModule', { value: true }));

exports.external = reexportExternal;
exports.externalOverride = reexportExternalsWithOverride$1;
