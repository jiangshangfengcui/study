/**
 * 新增正则对象属性 sticky , 表示是否设置了 y 修饰符
 *
 */
const r = /hello\d/y;

console.log(r.sticky);// true