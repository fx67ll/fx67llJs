console.log('JS 基础总结练习');


console.log('=================================');
console.log('测试闭包相关概念的代码');

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
