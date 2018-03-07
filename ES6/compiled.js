'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var state = 666;
(function (x) {
	return x * 2;
})(1);

{
	var block = '你好';
}
console.log(state);


var a = [];

var _loop = function _loop(i) {
	a[i] = function () {
		console.log(i);
	};
};

for (var i = 1; i < 10; i++) {
	_loop(i);
}

a[6]();

var tmp = '222';
if (true) {
	_tmp = 'kjjl';
	console.log(typeof _tmp === 'undefined' ? 'undefined' : _typeof(_tmp));
	var _tmp = 'tdz';
}

function foo() {
	console.log('I am outside！');
};

(function () {
	if (false) {
		var _foo = function _foo() {
			console.log('I am inside! ');
		};

		;
	}
	foo();
})();

if (true) {
	var floor = function floor() {
		console.log('I am inside! ');
	};

	;
	floor();
};

(function () {
	if (true) {
		var _foo2 = function _foo2() {
			console.log('I am inside! ');
		};

		;
	}
	foo();
})();

/*  ES6 的块级作用域允许声明函数的规则 */

