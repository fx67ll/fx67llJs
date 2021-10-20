var PromiseTest = (function() {

	function PromiseInit() {

		// [Demo1-5 参考文档，注意这个文档中有一点缝合怪的感觉，请谨慎阅读](https://blog.csdn.net/weixin_34273479/article/details/86352877)

		/* Demo1 通过then()完成链式回调*/
		// 第1个Promise方法
		function ptFir() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					console.log('方法1执行');
					resolve('方法1执行完毕');
				}, 2000)
			})
		}
		// 第2个Promise方法
		function ptSec() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					console.log('方法2执行');
					resolve('方法2执行完毕');
				}, 1000)
			})
		}
		// 第3个Promise方法
		function ptThi() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					console.log('方法3执行');
					resolve('方法3执行完毕');
				}, 3000)
			})
		}
		// 执行第1个Demo
		// ptFir().then(function(data) {
		// 	console.log('第一个回调：' + data);
		// 	return ptSec();
		// }).then(function(data) {
		// 	console.log('第二个回调：' + data);
		// 	return ptThi();
		// }).then(function(data) {
		// 	console.log('第三个回调：' + data);
		// 	return '还没完？该结束了吧！';
		// }).then(function(data) {
		// 	console.log(data);
		// })
		/* Demo1 结束 */

		/* Demo2 then()方法的两个回调函数，代表成功结果和失败结果*/
		function ptFou() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					var fouRamNum = Math.ceil(Math.random() * 10);
					if (fouRamNum <= 5) {
						resolve(fouRamNum);
					} else {
						reject('数字大于4');
					}
				}, 1000);
			})
		}
		// setInterval(function() {
		// 	// then()方法后面可以传两个函数，第一个是resolve的结果，第二个是reject的结果  
		// 	ptFou().then(function(successResult) {
		// 		console.log(successResult);
		// 	}, function(failResult) {
		// 		console.log(failResult);
		// 	});
		// }, 1000);
		/* Demo2 结束 */

		/* Demo3 深入理解then()方法 */
		/* then()方法提供两个自定义回调函数，new Promise.then(onFulfilled, onRejected){Todo}
		回调函数中会把上一个then()方法中返回的值当做参数值供当前then()方法调用
		then()方法执行完毕后需要返回一个新的值给下一个then()方法调用，如果没有返回值默认使用undefined
		每个then()方法只可能使用前一个then()方法的返回值 */
		/* 插一个小知识点，关于原文箭头函数，如果只是一个参数，可以直接省略表示传参的括号 */
		var fcFir = function() {
			return new Promise(function(resolve, reject) {
				resolve('返回值');
			})
		}
		var fcSec = function() {
			return '新的返回值';
		}
		// 现在思考下面四个函数分别返回的结果是什么
		// // eg.1
		// fcFir().then(function() {
		// 	return fcSec();
		// }).then(function(data) {
		// 	console.log(data);
		// 	console.log('1 =============== <');
		// })
		// // eg.2
		// fcFir().then(function() {
		// 	fcSec();
		// }).then(function(data) {
		// 	console.log(data);
		// 	console.log('2 =============== <');
		// })
		// // eg.3
		// fcFir().then(fcSec()).then(function(data) {
		// 	console.log(data);
		// 	console.log('3 =============== <');
		// })
		// // eg.4
		// fcFir().then(fcSec).then(function(data) {
		// 	console.log(data);
		// 	console.log('4 =============== <');
		// })
		/* Demo3 结束 */

		/* Demo4 all()方法 */
		// 直接拿Demo1的3个函数来做测试
		// all()方法接收一个数组参数，里面的值最终都算返回Promise对象
		// 三个异步操作的并行执行的，等到它们都执行完后才会进到then里面
		// all()方法会把所有异步操作的结果放进一个数组中传给.then()
		// Promise.all([ptFir(), ptSec(), ptThi()]).then(function(data) {
		// 	console.log(data);
		// 	// console.log({}.toString.call(data));
		// })
		/* Demo4 结束 */

		/* Demo5 race()方法 */
		// all()方法的效果实际上是「谁跑的慢，以谁为准执行回调  
		// 那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race()方法，这个词本来就是赛跑的意思
		// 这个race()方法有什么用呢？使用场景还是很多的，比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作
		// catch()方法捕捉异常
		// finally()方法是无论Promise最后是fulfilled还是rejected都会执行的操作
		// Promise.race([ptFir(), ptSec(), ptThi()]).then(function(data) {
		// 	console.log(data);
		// 	// console.log({}.toString.call(data));
		// }).finally(function() {
		// 	console.log('无论结果如何finally一定会执行')
		// })
		/* Demo5 结束 */

		// Demo6 [参考文档](https://zhuanlan.zhihu.com/p/98383032)
		/* Demo6 谷歌官方文档中关于promise例子 */
		// var asyncThing1 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log(1);
		// 			resolve('异步方法1执行成功完毕');
		// 			reject('异步方法1执行失败');
		// 		}, 2000)
		// 	})
		// }
		// var asyncThing2 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log(2);
		// 			resolve('异步方法2执行成功完毕');
		// 			reject('异步方法2执行失败');
		// 		}, 2000)
		// 	})
		// }
		// var errThing3 = false;
		// var asyncThing3 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log(3);
		// 			if (errThing3) {
		// 				resolve('异步方法3执行成功完毕');
		// 			} else {
		// 				reject('异步方法3执行失败');
		// 			}
		// 		}, 2000)
		// 	})
		// }
		// var asyncThing4 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log(4);
		// 			resolve('异步方法4执行成功完毕');
		// 			reject('异步方法4执行失败');
		// 		}, 2000)
		// 	})
		// }
		// var asyncRecovery1 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log('e1');
		// 			resolve('异步修复异常方法1执行成功完毕');
		// 			reject('异步修复异常方法1执行失败');
		// 		}, 2000)
		// 	})
		// }
		// var asyncRecovery2 = function() {
		// 	return new Promise(function(resolve, reject) {
		// 		setTimeout(function() {
		// 			console.log('e2');
		// 			resolve('异步修复异常方法2执行成功完毕');
		// 			reject('异步修复异常方法2执行失败');
		// 		}, 2000)
		// 	})
		// }

		// asyncThing1().then(function(data) {
		// 	console.log(data);
		// 	return asyncThing2();
		// }).then(function(data) {
		// 	console.log(data);
		// 	return asyncThing3();
		// }).catch(function(err) {
		// 	console.log(err);
		// 	return asyncRecovery1();
		// }).then(function(data) {
		// 	console.log(data);
		// 	return asyncThing4();
		// }, function(err) {
		// 	console.log(err);
		// 	return asyncRecovery2();
		// }).catch(function(err) {
		// 	console.log("Don't worry about it");
		// }).then(function() {
		// 	console.log("All done!");
		// })
		/* Demo6 结束 */

		/* Demo7 Promise的创建 */
		// 实例一个promise对象并查看，由于promise会立即执行，所以必须用一个延时器延时创建更为直观的看到  
		// var promiseFir = new Promise(function(resolve, reject) {
		// 	setTimeout(function() {
		// 		resolve({
		// 			message: '与大家分享知识很开心！',
		// 			code: 200
		// 		});
		// 	}, 2000)
		// })
		// console.log(promiseFir);
		// setTimeout(function() {
		// 	console.log(promiseFir);
		// }, 2000)
		/* Demo7 结束 */

		/* Demo8 我觉得挺好的关于原型方法的示例 */
		// 用一个小故事举例，你是一个上学的孩子，你问你的妈妈要一个电话。她说: 这个月底我要买一部手机
		// var momsPromise = new Promise(function(resolve, reject) {
		// 	momsSavings = 20000;  // 因为妈妈没有足够储蓄所以无法买到礼物  
		// 	// momsSavings = 200000;  // 如果妈妈有足够的储蓄就可以买到礼物
		// 	priceOfPhone = 60000;
		// 	if (momsSavings > priceOfPhone) {
		// 		resolve({
		// 			brand: "iphone",
		// 			model: "6s"
		// 		});
		// 	} else {
		// 		reject("我们没有足够的储蓄，让我们多存点钱吧。");
		// 	}
		// });
		// momsPromise.then(function(value) {
		// 	console.log("哇，我得到这个电话作为礼物 ", JSON.stringify(value));
		// });
		// momsPromise.catch(function(reason) {
		// 	console.log("妈妈不能给我买电话，因为 ", reason);
		// });
		// momsPromise.finally(function() {
		// 	console.log(
		// 		"不管妈妈能不能给我买个电话，我仍然爱她"
		// 	);
		// });
		/* Demo8 结束 */

		/* Demo9 演示resolve和reject快捷帮助方法 */
		// var ptSix = Promise.resolve('Hello，这里是执行成功的内容！');
		// // var ptSix = Promise.reject('出错了，这里是被发现的错误！');  // 成功和失败只会有一种状态哦  
		// ptSix.then(function(data) {
		// 	console.log(data)
		// });
		// ptSix.catch(function(err) {
		// 	console.log(err)
		// });
		/* Demo9 结束 */
	}

	return {
		init: function() {
			PromiseInit();
		}
	}
}());
