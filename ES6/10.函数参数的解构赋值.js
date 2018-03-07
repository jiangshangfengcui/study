// 所谓函数参数解构赋值，即为调用函数是传入的数据赋给形参

let res = [[1,2],[3, 4]].map(([a, b]) => a + b);
console.log(res);

// 默认值
function move({x, y} = {x: 0, y: 0}) {
	console.log(x , y) ;
}
move({});// undefined undefined  // 解构成功就赋值，解构参数不成功时默认值才启用
move(); // 0 0

let y = [1, undefined, 4].map((x = 'yes') => x);
console.log(y);  // [ 1, 'yes', 4 ]

// 模式中使用圆括号会导致解构报错
let jkj;
({x: (jkj)} = {x: 'jkjkjkj'});

let m;
[(m)] = [8];
