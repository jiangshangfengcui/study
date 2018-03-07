// String.fromCharCode() 用于返回编码对应的字符， 但这个方法不能识别32位的utf-16字符 （编码超过 0xffff）
let str = String.fromCharCode(0x20BB7);
console.log(str);


// ES6 改进： String.fromCodePoint()
let s = String.fromCodePoint(0x20BB7);
console.log(s); // 吉
let st = String.fromCodePoint(0x78, 0x1f680, 0x79);
console.log(st);// 连续的字符 x y

// 此方法与 codePointAt() 相对应; 两者的差别在于，String.fromCodePoint 定义在String对象上，而codePointAt 挂载在字符串实例对象上
