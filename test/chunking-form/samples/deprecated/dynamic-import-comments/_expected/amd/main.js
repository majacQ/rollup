define(['require'], function (require) { 'use strict';

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

	new Promise(function (resolve, reject) { require([
	/* webpackChunkName: "chunk-name" */
	'./foo'/*suffix*/], function (m) { resolve(/*#__PURE__*/_interopNamespace(m)); }, reject) });

});
