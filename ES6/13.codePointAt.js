// codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32bit(c) {
	return c.codePointAt(0) > 0xFFFF;
}
console.log(is32bit('吉a'));

let x = '𠮷a'.codePointAt(0).toString(16);
console.log(x);  // 20bb7

// var s = '𠮷a';

// console.log(s.codePointAt(0)) // 134071
// s.codePointAt(1) // 57271

// s.codePointAt(2) // 97

// 或者使用for of 循环
for(let ch of x) {
	return ch.codePointAt(0) > 0xffff;
}