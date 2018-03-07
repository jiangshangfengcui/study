let state = 666;
(x => x *2)(1)


{
	let block = '你好';
}
console.log(state);
//console.log(block);

var a = [];
for(let i = 1; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	}
}

a[6]();



// temporal dead zone  暂时性死区
var tmp = '222';
// if(true) {
// 	tmp = 'kjjl';     // referenceError
// 	console.log(typeof tmp) ;      // ReferenceError
// 	let tmp = 'tdz';
// }


// function arg(arg) {
// 	let a ;
// 	var a ; // 报错
// 	let arg = 'jkj'; // 报错
// }

// ES6浏览器环境，
function foo () { console.log('I am outside！')};

(function() {
	if(false) {
		function foo() {console.log('I am inside! ')};
	}
	foo();
}());

if(true) {
	function floor() {console.log('I am inside! ')};
	floor();
};


// 在符合 es6 的浏览器中，块级作用域中函数的声明等价于 函数式声明 var f = function() {},变量提升作用域最顶端，
(function() {
	if(true) {
		function foo() {console.log('I am inside! ')};
	}
	foo();
}());


