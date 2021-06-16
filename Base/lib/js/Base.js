console.log('JS 基础总结练习');


console.log('=================================');
console.log('测试闭包相关概念的代码');

console.log('---------------------------------');
console.log('理解闭包的用途');

function f1() {
	var n = 999;
	nAdd = function() {
		n += 1
	}

	function f2() {
		console.log(n)
	}
	return f2;
}
var result = f1();
result();
nAdd();
result();
console.log('---------------------------------');
console.log('测试对闭包的理解一');
var nameA = 'The Window';
var objA = {
	nameA: 'My Obj A',
	getName: function() {
		console.log(this)
		return function() {
			console.log(this)
			// 盲猜 My Obj A，因为这里是隐式指向的是父级函数的this
			// 额，猜错了，对象的函数内部this就是指向该对象的！！！
			return this.nameA;
		};
	}
};
console.log(objA.getName()());
console.log('---------------------------------');
console.log('测试对闭包的理解二');
var nameB = 'The Window';
var objB = {
	nameB: 'My Obj B',
	getName: function() {
		var that = this;
		console.log(this)
		return function() {
			console.log(this)
			// 盲猜 The Window，因为父级是显示指向window的
			// 额，猜错了，对象的函数内部this就是指向该对象的！！！
			return that.nameB;
		}
	}
};
console.log(objB.getName()());
console.log('---------------------------------');


console.log('=================================');
console.log('测试this关键字');
console.log('---------------------------------');
console.log('默认绑定');

function foo1() {
	var a = 1;
	var b = 2;
	console.log(this.a);
	console.log(this.b);
};
var a = 10;
b = 20;
foo1();

console.log('---------------------------------');
console.log('隐式绑定');

function foo2() {
	console.log(this.a2);
};
var obj = {
	a2: 30,
	foo2: foo2
};
foo2();
obj.foo2();

console.log('---------------------------------');
console.log('显式绑定');

function foo3(x, y) {
	console.log(this);
	console.log(this.x, this.y);
	console.log(x, y);
};
// call 是 foo3 上的一个函数,在改变 this 指向的同时执行这个函数
foo3.call(null, 'liu', 'lei');
foo3.apply(null, ['liu', 'lei']);

function foo4() {
	console.log(this.aa);
};
var obj = {
	aa: 11
};
foo4 = foo4.bind(obj);
foo4();
