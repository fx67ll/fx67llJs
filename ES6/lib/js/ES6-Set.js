console.log('测试ES6中Set数据结构');

console.log('=================================')
console.log('Set 基本介绍')
const testSet1 = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => testSet1.add(x));
for (let i of testSet1) {
	console.log(i);
}

console.log('---------------------------------')
const testSet2 = new Set([2, 3, 4, 5, 6])
console.log([...testSet2])
console.log(testSet2.size)

// querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象
console.log('---------------------------------')
const testSet3 = new Set(document.querySelectorAll('div'))
console.log(testSet3.size)

// testSet3 展示的Set初始化方式和下面这个例子差不多类似
console.log('---------------------------------')
const testSet4 = new Set()
document.querySelectorAll('div').forEach(div => testSet4.add(div));
console.log(testSet4.size)

// 展示Set数组去重的能力
console.log('---------------------------------')
const testArr1 = [1, 2, 2, 2, 3, 4, 5, 5]
console.log([...new Set(testArr1)])
console.log([...new Set('abcdddefffghh')].join(''))

// 演示向Set中加入值的时候不会发生类型转换
console.log('---------------------------------')
let testSet5 = new Set()
console.log(testSet5.add(NaN, NaN))

// 在Set内部对象总是不相等
console.log('---------------------------------')
let testSet6 = new Set()
console.log(testSet6.add({}).size)
console.log(testSet6.add({}).size)


console.log('=================================')
console.log('Set 实例的属性和方法')
const testSet11 = new Set();
console.log(testSet11.add(1).add(2).add(3).size)
console.log(testSet11.has(1))
console.log(testSet11.has(4))
console.log(testSet11.delete(2))
console.log(testSet11.has(2))

// 在判断是否包括一个键上面，Object结构和Set结构的写法不同
// Object 的写法
console.log('---------------------------------')
const pObj = {
	a: 123,
	b: '456'
}
console.log(pObj['a'])
// Set 的写法
const pSet = new Set()
pSet.add('a')
pSet.add('b')
console.log(pSet.has('a'))

// 展示通过Array.from()函数配合来实现另一种去除数组中重复成员的方式
console.log('---------------------------------')

function dedupe(arr) {
	return Array.from(new Set(arr))
}
const testArr2 = [11, 22, 22, 222, 33, 4444, 555, 555]
console.log(dedupe(testArr2))
console.log('=================================')
