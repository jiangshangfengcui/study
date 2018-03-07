// 传统上，JavaScript只提供了indexOf方法，可以用来确定一个字符串中是否含有另一个字符串。
// 现在，ES6 中有提供了三中判断方法：startsWith、endsWith、includes, 返回值均为Boolean

const s = 'Hello World!';

console.log(s.startsWith('Hello'))//true
console.log(s.endsWith('!'));//true
console.log(s.includes('llo'));//true

// 这三种方法都支持第二个参数，表示开始查询的位置
console.log(s.startsWith('World', 6));//false    从第6的字符开始
console.log(s.endsWith(' ', 6));// true          到第6个字符，但不包括第6个字符
console.log(s.includes('Hello', 6)); //false     从第6的字符开始