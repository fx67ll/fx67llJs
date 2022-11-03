# js数组操作————对象数组根据某个相同的字段分组

### 先说点废话
最近在实际业务中，需要编写一个方法根据数组中每一个对象的一个相同字段，来将该字段值相等的对象重新编入一个数组，返回一个嵌套的数组对象，特地来做个总结。
当然需要注意的是，在开发过程这种数组的处理函数，应当被编写到项目的公共工具函数库中全局调用  

#### 目标对象数组
```
let dataArr = [{
		id: 1,
		anyId: 1023,
		anyVal: 'fx67ll',
		value: 'value-1'
	},
	{
		id: 2,
		anyId: 1024,
		anyVal: 'fx67ll',
		value: 'value-2'
	},
	{
		id: 3,
		anyId: 10086,
		anyVal: 'll',
		value: 'value-3'
	},
	{
		id: 1,
		anyId: 10086,
		anyVal: 'fx67',
		value: 'value-4'
	},
	{
		id: 2,
		anyId: 1024,
		anyVal: 'll',
		value: 'value-5'
	},
];
```

#### 准换后的对象数组
```
[{
	"key": 1,
	"data": [{
		"id": 1,
		"anyId": 1023,
		"anyVal": "fx67ll",
		"value": "value-1"
	}, {
		"id": 1,
		"anyId": 10086,
		"anyVal": "fx67",
		"value": "value-4"
	}]
}, {
	"key": 2,
	"data": [{
		"id": 2,
		"anyId": 1024,
		"anyVal": "fx67ll",
		"value": "value-2"
	}, {
		"id": 2,
		"anyId": 1024,
		"anyVal": "ll",
		"value": "value-5"
	}]
}, {
	"key": 3,
	"data": [{
		"id": 3,
		"anyId": 10086,
		"anyVal": "ll",
		"value": "value-3"
	}]
}]
```


### 编写函数的思路
1. 首先肯定是一个循环，因为需要循环来比对数组中每个对象相同的字段的值  
2. 其次，根据比对的字段值判断是否存在重复，如果重复存在新的数组中，不重复则添加到之前定义过的数组中，完成分组  
3. 最后，返回处理完成的对象数组  

#### 方法一
```
// arr 目标对象数组
// filed 分组字段
function classifyArrayGroupBySameFieldAlpha(arr, filed) {
	let temObj = {}
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i]
		if (!temObj[item[filed]]) {
			temObj[item[filed]] = [item]
		} else {
			temObj[item[filed]].push(item)
		}
	}
	let resArr = []
	Object.keys(temObj).forEach(key => {
		resArr.push({
			key: key,
			data: temObj[key],
		})
	})
	return resArr
}
```

#### 方法二
```
// arr 目标对象数组
// filed 分组字段
function classifyArrayGroupBySameFieldVBeta(arr, filed) {
	let temObj = {};
	let resArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (!temObj[arr[i][filed]]) {
			resArr.push({
				key: arr[i][filed],
				data: [arr[i]]
			});
			temObj[arr[i][filed]] = arr[i]
		} else {
			for (let j = 0; j < resArr.length; j++) {
				if (arr[i][filed] === resArr[j].key) {
					resArr[j].data.push(arr[i]);
					break
				}
			}
		}
	}
	return resArr
}
```

### 拓展————ES6的新方法`Object.keys`  
1. `Object.keys()`方法用于返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致  
2. 需要注意的传不同类型的变量，返回的数组值也不同
	+ 如果传入对象，则返回属性名数组  
	+ 如果传入字符串，则返回索引  
	+ 如果数组，则返回索引  
	+ 如果构造函数，则返回空数组或者属性名  



我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llJs/blob/master/js-blog/2022/2022-11/handle-array_group-by-same-field.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***