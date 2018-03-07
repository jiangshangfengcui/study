// ES6 中添加了 u 修饰符，含义为 unicode 模式， 用来正确处理大于 \uffff 的字符， 也就是说能正确处理四字节的utf-16 编码

console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false
console.log(/^\uD83D/.test('\uD83D\uDC2A'));  // true

// 点字符 .  含义是除了换行符以外的任意单个字符。
//  对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
var s = '𠮷';
console.log(/^.$/.test(s)); // false
console.log(/^.$/u.test(s));//true

/// Unicode 字符表示法
// ES6 中新增了{} 来表示unicode编码， 这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')); // true  
// 上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配61个连续的u。
console.log(/\u{20BB7}/u.test('𠮷')); // true


// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。 

// /\w{2}/.test('aa') // true
// /a+/u.test('aa') // true
// /𠮷{2,2}/.test('𠮷𠮷') // false
// /𠮷{2}/u.test('𠮷𠮷') // true

//预定义模式 
// u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。

// y 修饰符，类似于 g 修饰符
/*
	区别：
			g 只要有就能匹配到
			y 必须从第一个字符起就能匹配到，才能匹配到


*/
const str = `baaa_aa_a`;
const r1 = /a+/g;
const r2 = /a+/y;
const r3 = /a+/;

console.log(r1.exec(str)); // [ 'aaa', index: 0, input: 'aaa_aa_a' ]
console.log(r2.exec(str)); // [ 'aaa', index: 0, input: 'aaa_aa_a' ]

console.log(r1.exec(str)); // [ 'aa', index: 4, input: 'aaa_aa_a' ]
console.log(r2.exec(str)); // null

console.log(r1.exec(str)); // [ 'a', index: 7, input: 'aaa_aa_a' ]

console.log(r1.exec(str)); // null

console.log(r1.exec(str)); // [ 'aaa', index: 0, input: 'aaa_aa_a' ]

console.log(`**************************`)
const REGEX = /a/g;
// 指定从第2号位置开始匹配
REGEX.lastIndex = 2;
//	
const metch = REGEX.exec(`xaya`);
console.log(metch, metch.index);// [ 'a', index: 3, input: 'xaya' ] 3
REGEX.lastIndex = 4;
console.log(REGEX.exec(`xaya`));// null


