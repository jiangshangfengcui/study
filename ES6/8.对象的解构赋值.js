// 对象解构的规则：变量名必须与属性名相同，如果不相同，就是 undefined
let {foo, bar} = {bar: 'jklj', foo: '898'};
let {baz} = {bar: 'jklj', foo: '898'};
console.log(foo, bar, baz); // 898 jklj undefined

// 变量名与数据属性名不一致情况下结构赋值先转换成一致
let {first: f, last: l} = {first: '你好', last: '再见'};
console.log(f, l);// 你好 再见


// 嵌套对象解构赋值
let obj = {
	p: ['Hello', {y: 'World'}]
}
let {p, p: [x, {y}]} = obj;
console.log(p, x, y); // [ 'Hello', { y: 'World' } ] 'Hello' 'World'

// 对已有复杂数据类型结构赋值
let obj1 = {}, arr = [];
({foo: obj1.prop, buffer: arr[0]} = {foo: 'ksdf', buffer: "jfadsj"}); // 使用圆括号， 不实用let声明
console.log(obj1, arr);

// 类似于数组，对象也可以设置默认值
var {x: yy = 3} = {};
console.log(yy); // 3

// 数组本质是特殊的对象， 所以可以对数组进行对象解构
let arr1 = [0, 8, 9];
let {0: a0, [arr1.length - 1]: a2} = arr1;
console.log(a0, a2); // 0 9
