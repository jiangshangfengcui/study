// 交换变量的值
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);

// 从函数返回多个值
let a, b, c;
let f = () => [1, 2, 3]; // Function: f
console.log(a, b, c);
[a, b, c] = f();
console.log(a, b, c);

// 便于函数传参
let fun = ({x, y, z}) => console.log(x, y, z);
fun({x:34, y:99, z:9999}); // 34 99 9999

// 提取JSON数据
let jsonData = {
	id: 787,
	status: 'ok',
	data: [9999, 999999]
};
let {id, status, data: number} = jsonData;
console.log(id, status, number); // 787 'ok' [ 9999, 999999 ]

// 函数参数的默认值
(x= 8, y = function() {}, z= []) => {};

// 遍历Map解构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

console.log(map);
for(let [key, value] of map) {
	console.log(key + ' is ' + value);
}

// 指定模块方法加载
const {sourceMapConsumer, sourceNode} = require('source-map');