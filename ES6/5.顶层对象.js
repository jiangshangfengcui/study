// 顶层对象： window globle

// var function 声明的全局变量既属于全局对象，也属于顶层对象，因为顶层对象 window 就是全局对象

// 在 ES6 中，let  const import class 声明的全局变量不再属于顶层对象，但仍然是全局作用

let b = '';

console.log(global.b); // undefined