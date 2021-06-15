console.log('测试ES6中Set数据结构')


console.log('=================================');
console.log('Set 基本介绍');
const testSet1 = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => testSet1.add(x));
for (let i of testSet1) {
	console.log(i)
};

console.log('---------------------------------');
const testSet2 = new Set([2, 3, 4, 5, 6]);
console.log([...testSet2]);
console.log(testSet2.size);

// querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象
console.log('---------------------------------');
const testSet3 = new Set(document.querySelectorAll('div'));
console.log(testSet3.size);

// testSet3 展示的Set初始化方式和下面这个例子差不多类似
console.log('---------------------------------');
const testSet4 = new Set();
document.querySelectorAll('div').forEach(div => testSet4.add(div));
console.log(testSet4.size);

// 展示Set数组去重的能力
console.log('---------------------------------');
const testArr1 = [1, 2, 2, 2, 3, 4, 5, 5];
console.log([...new Set(testArr1)]);
console.log([...new Set('abcdddefffghh')].join(''));

// 演示向Set中加入值的时候不会发生类型转换
console.log('---------------------------------');
let testSet5 = new Set();
console.log(testSet5.add(NaN, NaN));

// 在Set内部对象总是不相等
console.log('---------------------------------');
let testSet6 = new Set();
console.log(testSet6.add({}).size);
console.log(testSet6.add({}).size);
console.log('=================================');


console.log('=================================');
console.log('Set 实例的属性和方法');
const testSet11 = new Set();
console.log(testSet11.add(1).add(2).add(3).size);
console.log(testSet11.has(1));
console.log(testSet11.has(4));
console.log(testSet11.delete(2));
console.log(testSet11.has(2));

// 在判断是否包括一个键上面，Object结构和Set结构的写法不同
// Object 的写法
console.log('---------------------------------');
const pObj = {
	a: 123,
	b: '456'
};
console.log(pObj['a']);
// Set 的写法
const pSet = new Set();
pSet.add('a');
pSet.add('b');
console.log(pSet.has('a'));

// 展示通过Array.from()函数配合来实现另一种去除数组中重复成员的方式
console.log('---------------------------------');

function dedupe(arr) {
	return Array.from(new Set(arr))
};
const testArr2 = [11, 22, 22, 222, 33, 4444, 555, 555];
console.log(dedupe(testArr2));
console.log('=================================');


console.log('=================================');
console.log('Set 遍历操作');
let testSet7 = new Set(['a', 'b', 'c']);
// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法，参考下面第二个console
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);
for (let item of testSet7) {
	console.log(item);
};
console.log('---------------------------------');
// keys方法遍历和values方法遍历相同
for (let item of testSet7.keys()) {
	console.log(item);
};
console.log('---------------------------------');
for (let item of testSet7.values()) {
	console.log(item);
};
console.log('---------------------------------');
// entries方法因为
for (let item of testSet7.entries()) {
	console.log(item);
};
console.log('---------------------------------');
let testSet8 = new Set([1, 3, 9]);
testSet8.forEach((value, key) => {
	console.log(key + ':' + value);
});

// 原文里的 "另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象" 并不是太理解  
// 看了一篇文章更不理解了
function Curve(ptList) {
	var pts = [];

	console.log(this)

	function addPoint(p, k, arr) {
		console.log(p, k, arr)
		console.log(this)
		pts.push(p);
		// console.log(pts)
	};
	if (ptList.length > 2) {
		ptList.forEach(addPoint, this);
	};
	// this.addPoint = addPoint;
	// console.log(this)
}
Curve(new Set([1, 2, 3, 4]));
Curve([11, 12]);
Curve([21, 22, 23]);
console.log('---------------------------------');

// 试了一下这个的实例有点明白了
[1, 2, 3, 4, 5].forEach(function(a) {
	console.log(a, this);
});
console.log('---------------------------------');
[1, 2, 3, 4, 5].forEach(function(a) {
	console.log(a, this);
}, [6, 7, 8, 9]);
console.log('---------------------------------');
Array.prototype.forEach.call([1, 2, 3, 4, 5], function(a) {
	console.log(a, this);
}, [6, 7, 8, 9]);
console.log('---------------------------------');
Array.prototype.forEach.apply([1, 2, 3, 4, 5], [function(a) {
		console.log(a, this)
	},
	[6, 7, 8, 9]
]);
console.log('---------------------------------');
Array.prototype.forEach.bind([1, 2, 3, 4, 5])(function(a) {
	console.log(a, this)
}, [6, 7, 8, 9]);
console.log('---------------------------------');
console.log('---------------------------------');
// 最后再测试一下对象里的foreach函数
// 注意对象里命名函数不可以用箭头函数
var obj = {
	name: 'test',
	say: function() {
		console.log(this.name);
	},
	think: function() {
		var arr = [1, 2, 3, 4];
		arr.forEach((item, key) => {
			console.log(key, this);
		});
		console.log('---------------------------------');
		arr.forEach((item, key) => {
			console.log(this)
		}, this)
	},
}
obj.say();
obj.think();
