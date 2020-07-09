var SortBubble = (function() {

	//min<=r<=max
	function RandomNumBoth(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.round(Rand * Range); //四舍五入
		return num;
	}

	//min<=r<max
	function RandomNum(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.floor(Rand * Range); //舍去
		return num;
	}

	function randomArr(len, min, max) {
		if ((max - min) < len) { //可生成数的范围小于数组长度
			return null;
		}
		var arr = [];
		while (arr.length < len) {
			var num = RandomNum(min, max);
			if (arr.indexOf(num) == -1) {
				arr.push(num);
			}
		}
		// console.log('----------初始数组------------');
		// console.log(arr);
		// console.log('-----------------------------');
		return arr;
	}

	// 十万级别的数据可能要跑一阵子，用一万级别的数据可以直接看效果
	var arr = randomArr(10000, 1, 2000000);
	// var arr0 = [10, 1, 32, 43, 3, 3212, 23]; //用于测试观看理解具体的排序过程
	var arrr = randomArr(10000, 1, 2000000);
	var arrrr = randomArr(10000, 1, 2000000);
	var arrrrr = randomArr(10000, 1, 2000000);

	function SortInit() {
		// Sort1Bubble(arr0);
		Sort1Bubble(arr);
		console.log('-----------------------------');
		Sort2Bubble(arrr);
		console.log('-----------------------------');
		Sort3Bubble(arrrr);
		console.log('-----------------------------');
		Sort4Bubble(arrrrr);
		console.log('-----------------------------');
	}

	//基础版冒泡排序
	function Sort1Bubble(arr) {
		var date = new Date();
		var date1 = date.getTime();
		console.log("基础版冒泡排序开始时间:" + date1);
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			for (var j = 0; j < len - 1 - i; j++) {
				if (arr[j] > arr[j + 1]) {
					var temp = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = temp;
				}
			}
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("冒泡排序结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("基础版冒泡排序耗费时间:" + date0 + '毫秒');
		return arr;
	}

	//初步改进版冒泡排序
	//“进化版”冒泡排序算法相对于“原始人”冒泡排序有个亮点，就是每一层的循环都记录上一次排序的位置;
	//这两种排序算法都是先排最后一位，最后一位是最大的，然后以此类推。细细推敲第二种方法显然比第一种方法少走了一些冤枉路;
	//也就是说每一层排完序之后，就记录排到最大的哪一位在什么位置，因为每一层最大的数就是它所在数组的倒数的位数，因此下一次就没必要再循环一遍，相对于第一种就少进行了很多计算。
	//但是也看运气，有些时候只是最后几次的排序没有进行而已，并不是一定比第一种快，两种排序方法的时间差距不大。
	function Sort2Bubble(arr) {
		var date = new Date();
		var date1 = date.getTime();
		console.log("第一次改进冒泡排序开始时间:" + date1);
		var i = arr.length - 1;
		while (i > 0) {
			//每趟开始的时候没有记录交换，没懂这里的意思后面慢慢理解
			var pos = 0;
			for (var j = 0; j < i; j++) {
				// console.log(j);
				if (arr[j] > arr[j + 1]) {
					pos = j;
					var temp = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = temp;
				}
				// console.log(pos+'/'+arr);
			}
			i = pos;
			// 如果这里pos===0的时候说明没有左边比右边还大的情况发生了，就不需要继续冒泡排序了啊
			// console.log(i);
			// console.log(arr);
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("第一次改进冒泡排序结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("第一次改进冒泡排序耗费时间:" + date0 + '毫秒');
		return arr;
	}

	//继续改进版冒泡排序
	//因为前两次的排序都是按最大或者最小方向进行排序，而第三种方法会选择从两头出发一起计算，双管齐下
	function Sort3Bubble(arr) {
		var low = 0;
		var high = arr.length - 1;
		var date = new Date();
		var date1 = date.getTime();
		console.log("第二次改进冒泡排序开始时间:" + date1);
		while (low < high) {
			// console.log(high,low);
			// console.log(arr);
			for (var i = low; i < high; i++) {
				if (arr[i] > arr[i + 1]) {
					var temp = arr[i + 1];
					arr[i + 1] = arr[i];
					arr[i] = temp;
				}
				// console.log(arr)
			}
			high--;
			for (var j = high; j > low; j--) {
				if (arr[j] < arr[j - 1]) {
					var temp = arr[j - 1];
					arr[j - 1] = arr[j];
					arr[j] = temp;
				}
				// console.log(arr)
			}
			low++;
			// console.log(arr);
			// console.log(high,low);
			// console.log('-----------------------------');
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("第二次改进冒泡排序结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("第二次改进冒泡排序耗费时间:" + date0 + '毫秒');
		return arr;
	}

	//高阶版冒泡排序
	//下次训练的时候重新手撸一遍，这个玩意不按照自己的理解撸一遍，也只是纸上谈兵理解。----20200708
	function Sort4Bubble(arr) {
		var low = 0;
		var high = arr.length - 1;
		var date = new Date();
		var date1 = date.getTime();
		console.log("第三次改进冒泡排序开始时间:" + date1);
		while (low < high) {
			var pos1 = 0;
			var pos2 = 0;
			for (var i = low; i < high; i++) {
				if (arr[i] > arr[i + 1]) {
					var temp = arr[i + 1];
					arr[i + 1] = arr[i];
					arr[i] = temp;
					pos1 = i;
				}
			}
			high = pos1;
			for (var j = high; j > low; j--) {
				if (arr[j] < arr[j - 1]) {
					var temp = arr[j - 1];
					arr[j - 1] = arr[j];
					arr[j] = temp;
					pso2 = j;
				}
			}
			low = pos2;
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("第三次改进冒泡排序结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("第三次改进冒泡排序耗费时间:" + date0 + '毫秒');
		return arr;
	}

	return {
		init: function() {
			SortInit();
		}
	}
}());
