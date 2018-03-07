// 字符串也可以转换成类似数组的对象，
const [a,b, c, d, e] = 'hello';
console.log(a, b, c, d, e);

// 转换成对象后有一个隐式的属性 length 也可以用与赋值
let {length: len}   =  'jas;lfdja';
console.log(len); // 9

// 数据是数字或布尔值时，先将其转换成对象在赋值
let {toString: s} = 78;
console.log();

// 解构赋值先将等号右边的转换成对象在赋值，因为undefined 和 null 不能转换成对象，所以无法用于直接用于解构赋值
// let {proxy: x} = undefined;
// let {prox: y} = null;