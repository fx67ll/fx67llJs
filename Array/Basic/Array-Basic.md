# 数组的基本操作

### 数组转化成字符串
1. toString()
	+ 数组中`toString()`方法能够把每个元素转换为字符串，然后以逗号连接输出显示  
	```
	var a = [1,2,3,4,5,6,7,8,9,0];  //定义数组
	var s = a.toString();  //把数组转换为字符串
	console.log(s);  //返回字符串“1,2,3,4,5,6,7,8,9,0”
	console.log(typeof s);  //返回字符串string，说明是字符串类型
	```
	+ 当数组用于字符串环境中时，JavaScript 会自动调用`toString()`方法将数组转换成字符串  
	```
	var a = [1,2,3,4,5,6,7,8,9,0];  //定义数组
	var b = [1,2,3,4,5,6,7,8,9,0];  //定义数组
	var s = a + b;  //数组连接操作
	console.log(s);  //返回“1,2,3,4,5,6,7,8,9,01,2,3,4,5,6,7,8,9,0”
	console.log(typeof s);  //返回字符串string，说明是字符串类型
	```
	+ `toString()`在把数组转换成字符串时，首先要将数组的每个元素都转换为字符串，当每个元素都被转换为字符串时，才使用逗号进行分隔，以列表的形式输出这些字符串  
	```
	var a = [1,[2,3],[4,5]],[6,[7,[8,9],0]]];  //定义多维数组
	var s = a.toString();  //把数组转换为字符串
	console.log(S);  //返回字符串“1,2,3,4,5,6,7,8,9,0”
	```
2. toLocaleString()
	+ 目前来看`toLocaleString()`好像和`toString()`没什么区别，后期有发现再记录  
	+ 注意！！！没有`toLocalString()`这个函数，只有`toLocal***e***String()`函数  
	+ 可根据本地时间把 Date 对象转换为字符串，并返回结果  
	+ 还可以将数字变成千分位格式  
	+ `toLocaleDateString()`返回的是日期，`toLocaleString()`返回的是日期加时间  
3. join()
	+ `join()`方法可以把数组转换为字符串，不过它可以指定分隔符  
	+ 在调用`join()`方法时，可以传递一个参数作为分隔符来连接每个元素  
	+ 如果省略参数，默认使用逗号作为分隔符，这时与`toString()`方法转换操作效果相同  
	```
	var a = [1,2,3,4,5];  //定义数组
	var s = a.join("==");  //指定分隔符
	console.log(s);  //返回字符串“1==2==3==4==5”
	```

[参考资料 - JS数组转字符串（3种方法）](http://c.biancheng.net/view/5673.html)  
[参考资料 - JavaScript toLocaleString() 方法](https://www.runoob.com/jsref/jsref-tolocalestring.html)  
[参考资料 - JavaScript join() 方法](https://www.w3school.com.cn/jsref/jsref_join.asp)  

### 字符串转化成数组
1. split()
	+ split() 方法是 String 对象方法，与 join() 方法操作正好相反，该方法可以指定两个参数  
	+ 参数一，必需，字符串或正则表达式，从该参数指定的地方分割字符串  
	+ 参数二，可选，该参数可指定返回的数组的最大长度；如果设置了该参数，返回的子串不会多于这个参数指定的数组；如果没有设置该参数，整个字符串都会被分割，不考虑它的长度  
```
var s = "1==2== 3==4 ==5";
var a = s.split("==");
console.log(a);
console.log(a.constructor == Array);
```

[参考资料 - JavaScript split() 方法](https://www.w3school.com.cn/js/jsref_split.asp)