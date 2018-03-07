'use strict'
function f() {
	console.log('函数声明')
};

f();

// 2、
/**
 *		In strict mode code, functions can only be declared at top level or
 * 	inside a block.
 *
 *		在严格模式下，如下代码报错：
 *
 *			if(true) 
 *				function ff() {
 *					console.log('没有大扩号情况下声明函数')
 *			}
 *
 *			ff();
 *
 *
 */

// 3、
