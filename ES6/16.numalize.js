// ES6 提供字符串实例的normalize()方法，用来将字符的不同的表示形式统一为相同形式
let b = '\u01D1'.normalize() === '\u004F\u030C'.normalize();
console.log(b); /// true

// 不过， 目前normalize方法不能处理三个及以上个编码的合成；这种情况下，只能使用正则表达式判断编码区间