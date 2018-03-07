/**
 *
 *		const 声明一个只读的常量，一旦声明，常量的值不能改变，再次赋值会报错
 *
 *
 *
 *
 */

const PI = 3.1415;

// PI = 3; 从新赋值，报错。TypeError: Assignment to constant variable.

// const foo; 定义时未初始化， 报错。SyntaxError: Missing initializer in const declaration

// if(true) {
// 	console.log(MAX);   //  const定义的常量也不会提升， 暂时性死区
// 	const MAX = 5;
// }
// MAX  // 报错。 const 定义的常量也符合块级作用域的规则， 也同样存在暂时性死区，只能在声明的位置后面使用

const oop = {};

oop.ppp = 8888;

console.log(oop);

// oop = {};  // 从新赋值，报错。TypeError: Assignment to constant variable. 实际上oop是存储的对象的地址，用来操作对象，但这个地址不可写
// 数组同理

// 冻结对象
const m = Object.freeze({name:{}});
console.log(m);
m.name = '被冻结的对象';
// console.log(m);  在常规模式下不起作用，在严格模式下报错
m.name.f = '小名';
console.log(m);//  { name: { f: '小名' } }   对象的复杂数据类型属性依然能操作
m.name = [];
console.log(m);


