// repeat方法： 将字符串重复n次拼接并返回

const s = 'repeat';

console.log(s.repeat(5)); // repeatrepeatrepeatrepeatrepeat

// repeat 的参数不能为负数（-1）、不能为 infinite

// s.repeat(Infinite) 报错

// 可以是正小数 ，会自动向下取整
console.log(s.repeat(3.8));  //  repeatrepeatrepeat

s.repeat(NaN); // ''
s.repeat('na');// '' 先将参数转换成数字