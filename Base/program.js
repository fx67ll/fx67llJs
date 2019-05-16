document.write("Hello World!");

// 注意!没有用的注释比没有注释还要糟糕,注释一定要精确地描述代码
// 块注释没有行注释安全,星号可能会被用于正则匹配中导致一些问题

document.write("这些都是保留的关键字 abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var volatile void while with");

// js没有分离出整数类型居然是一种方便避免很多的报错(并不懂为什么)
// NaN表示一个不能产生正常结果的运算结果,NaN不等于任何值,可以使用isNaN()函数来检测NaN

// \表示转义字符，转移字符允许把那些正常情况下不被允许的字符插入到字符串中
// 因为Unicode是一个16位的字符集,所以js中所有的字符都是16位的
// 字符串有length属性,字符串是不可变的,一旦创建就无法改变,字符串有常用的方法(后面搞一个详细学习)

// false null undefined 空字符串 数字0 数字NaN 这六个值会被当做false

// 下次试试switch case
// do-while循环每次都要先执行一次循环体里的代码块

// break 立刻停止当前的循环后续不执行
// continue 跳过本次循环不影响后续执行
// return 立刻停止当前循环并可以返回一个值,后续不执行

// 属性访问表达式，不管使用何种形式属性访问表达式，在.和[之前的表达式都会首先计算，如果计算结果是null或undefined，则表达式会抛出一个类型错误异常，因为这两个值都不能包含任意属性 