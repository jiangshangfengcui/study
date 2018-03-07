

//let [a, b, c] = [1, 3, 3];
//console.log(a, b, c)

let [[[a,b],c],d] =[[[234], 34],355];
console.log(a, b, c, d);

/**
 *
 *		事实上，只要数据结构具有iterator接口，都可以采用数组形式的结构赋值。
 * 
 */

// Set 结构赋值

let [w, ww, www] = new Set([898, 678, 6789]);
console.log(w, ww, www);


// 解构赋值，允许设置默认值
let [foo = true] = [];
let [x, y = 'ljlj'] = ['asdljfa', undefined];  // 默认值的优先级比赋值高
console.log(foo, x, y);
// 在 ES6 中使用严格相等运算符( === ), 来判断一个位置是否有值。如果一个位置的值不严格等于 undefined ，那这个位置对应的变量的默认值不起作用。
// 如果默认值是个函数表达式，；那么这个表达式是惰性求值，即只有在 对应位置的值不严格等于 undefined 时，求值
function f() {
	console.log(23);
}
let [xx = f()]= [1];
// 使用其他结构赋值变量，但该变量必须已经声明
let [h = 9, j = h] = ['hjasd', ];// h = 'hjasd', j = 'hjasd'