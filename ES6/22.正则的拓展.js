// RegExp 的拓展

// 第一种情况
const regex = new RegExp('xyz', 'i'); // 等价于 const regex = /xyz/i;

// 第二种情况
const regex2 = new RegExp(/xyz/i); // 等价于 const regex = /xzy/i;

// ES6 中可以改变原有正则表达式的修饰符
let s = new RegExp(/xyz/ig, 'i').flags;
console.log(s); // i  原来的修饰符 ‘ig’ 被覆盖


