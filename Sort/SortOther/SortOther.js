var SortOther = (function() {

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
		return arr;
	}

	// 创建初始数据，超过20000的时候浏览器会爆炸
	var arr = randomArr(10000, 1, 2000000);

	function SortInit() {
		sortBubble(JSON.parse(JSON.stringify(arr)));
		sortBubblePro(JSON.parse(JSON.stringify(arr)));
		sortBubbleMax(JSON.parse(JSON.stringify(arr)));
		sortBubbleProMax(JSON.parse(JSON.stringify(arr)));
	}

	function sortBubble(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');

		for (var i = 0; i < arr.length; i++) {
			// 艹，i，是每次排完之后在整个数组之后已经排好序的
			for (var j = 0; j < arr.length - i - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					var tem = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = tem;
				}
			}
		}

		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}

	function sortBubblePro(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');

		var i = arr.length - 1;
		while (i > 0) {
			var pos = 0;
			for (var j = 0; j < i; j++) {
				if (arr[j] > arr[j + 1]) {
					pos = j;
					var tem = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = tem;
				}
			}
			// 这里如果pos===0则说明已经排序完成了，那么后续的排序就不需要进行了，清除了无用功
			i = pos;
		}

		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序Pro总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}

	function sortBubbleMax(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');

		var low = 0;
		var high = arr.length - 1;
		while (low < high) {
			for (var i = low; i < high; i++) {
				if (arr[i] > arr[i + 1]) {
					var tem = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = tem;
				}
			}
			high--;
			for (var j = high; j > low; j--) {
				if (arr[j] < arr[j - 1]) {
					var tem = arr[j - 1];
					arr[j - 1] = arr[j];
					arr[j] = tem;
				}
			}
			low++;
		}

		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序Max总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}

	function sortBubbleProMax(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');

		var low = 0;
		var high = arr.length - 1;
		while (low < high) {
			var pos1 = 0;
			var pos2 = 0;
			for (var i = low; i < high; i++) {
				if (arr[i] > arr[i + 1]) {
					var tem = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = tem;
					pos1 = i;
				}
			}
			high = pos1;
			for (var j = high; j > low; j--) {
				if (arr[j] < arr[j - 1]) {
					var tem = arr[j - 1];
					arr[j - 1] = arr[j];
					arr[j] = tem;
					pos2 = j;
				}
			}
			low = pos2;
		}

		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序ProMax总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}
	
	function sort(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');
	
	
	
		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}
	
	function sort(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');
	
	
	
		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}

	return {
		init: function() {
			SortInit();
		}
	}
}());
