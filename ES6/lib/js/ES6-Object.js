console.log('测试ES6中对象新增的一些内容');

console.log('=================================')
console.log('Object.is()，判断对象是否相等')
console.log(+0 === -0)
console.log(NaN === NaN)
console.log(Object.is({
	a: 1
}, {
	a: 1
}))
console.log(Object.is(1, 1))


console.log('=================================')
console.log('Object.assign()，拷贝对象')
const targetObj = {
	a: 1
}
const sourceObj1 = {
	b: 2
}
const sourceObj2 = {
	c: 3
}
console.log(Object.assign(targetObj, sourceObj1, sourceObj2))
const sourceHasSameObj3 = {
	a: 1
}
console.log(Object.assign(targetObj, sourceHasSameObj3))
console.log(Object.assign(sourceObj1))
// console.log(Object.assign(undefined))
// console.log(Object.assign(null))
console.log(Object.assign(targetObj, undefined))
console.log(Object.assign(targetObj, null))
const v1 = 'abc'
const v2 = true
const v3 = 1
const mixObj = Object.assign({}, v1, v2, v3)
// 字符串的包装对象，会产生可枚举属性，所以会被合并到对象中
console.log(mixObj)
console.log(Object.assign(targetObj, {
	[Symbol('d')]: '4'
}))


console.log('=================================')
console.log('Object.getOwnPropertyDescriptors，返回对象描述属性')
const desObj = {
	a: '描述',
	b: 123,
	get bar() {
		return 'abc'
	}
}
Object.getOwnPropertyDescriptor(desObj)
console.log('这里遇到点问题，抽空详细学习下对象中getset属性重写，再来深入理解下这里的内容')


console.log('=================================')
console.log('对象原型链这块完全不懂，需要系统学习！！！')

console.log('=================================')
const testObj = {
	a: 'abc',
	b: 123
}
console.log(Object.keys(testObj))

console.log(Object.values(testObj))
const forObj1 = Object.create({}, {
	p: {
		value: 42
	}
})
console.log(Object.values(forObj1))
// 上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的
// 因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性
// 只要把enumerable改成true，Object.values就会返回属性p的值
const forObj2 = Object.create({}, {
	p: {
		value: 42,
		enumerable: true
	}
})
console.log(Object.values(forObj2))
const symbolObj = {
	[Symbol()]: 123,
	b: '456'
}
console.log(Object.values(symbolObj))
console.log(Object.values('123456'))
console.log(Object.values(true))
console.log(Object.values(123))

console.log(Object.entries(testObj))
const mapObj = {
	a: 123,
	b: '456'
}
console.log(new Map(Object.entries(mapObj)))

console.log(Object.fromEntries([
	['a', '123'],
	['b', 456]
]))
const mapMap = new Map().set('a', true).set('b', false);
console.log(Object.fromEntries(mapMap))
// 将查询字符串转为对象，这个功能有意思哎
console.log(Object.fromEntries(new URLSearchParams('params1=123&params2=false')))
console.log('=================================')
