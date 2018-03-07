// ES2017 中引入了字符串自动补全的功能 padStart、padEnd
// 这两个方法接受两个参数，第一个参数是不全后的字符串长度，第二个参数是是用于补全的字符串

// 此方法是 ES2017 新增api ，现在node还不支持

const s = 'x';

console.log(s.padStart(4, 'ui')); // 如果指定的长度小与原字符长度，直接返回原字符串
console.log(s.padEnd(4, 'ji'));