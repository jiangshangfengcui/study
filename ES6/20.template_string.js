// 模版字符串（template string）: 使用 '`' 符号做标识，引用的字符串可以使用占位符（ ${basket.count} ）

// 普通字符串
const s = `I am a line string!`;
console.log(s);

// 多行字符串
const ss = `I am more line
				string`;
console.log(ss);        // 所有换行和空格都被保留， 可以使用 trim 方法消除首尾空格和换行

// 字符串中使用占位符
const w = `world`;
const str = `Hello, ${w}!`;
console.log(str);

// 占位符大括号中可放 对象属性 ，可以运算
const x = 1, y = 2;
console.log(`${x} + ${y} = ${x + y}`);
 
const obj = {x: 1, y: 3};
console.log(`${ obj.x + obj.y }`);

// 如果在字符串中使用反引号 ` ，应使用转义字符
const sssss = `nihao\`,world\``;


// 标识模版功能
console.log`21334`;
// 等同与
console.log(`21334`);

// 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
const a = 5;
const b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

function tag(stringArr, value1, value2) {
	// 处理后的参数
	// stringArr = ['Hello ', ' world ', ''] ,  value1 = 15, value2 = 50
};