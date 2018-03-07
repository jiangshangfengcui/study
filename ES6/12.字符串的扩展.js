// 字符的 unicode 表示法   \u0000 ~ \uffff
console.log('\u0061') // a  
console.log('\uD842\uDFB7') // 吉  超出范围的字符需要用双字节的形式表示
// 对于超出范围的 编码 如：\u20BB7 ，javascript 认为是 \u20BB + 7  ， 因为\u20BB 是不可打印字符，最后结果是" 7";

// ES6 对超出范围情况做了修改，只要放进大括号中，就能正常解读。 如：'\u{20BB7}'
'\u{41}\u{42}\u{43}';

//  有了这种表示法后， javascript 有6 中方法表示一个字符
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
