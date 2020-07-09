var SortAll = (function() {

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

	var arr = randomArr(15000, 1, 2000000);

	function SortInit() {
		SortBubble(JSON.parse(JSON.stringify(arr)));
		sortSelect(JSON.parse(JSON.stringify(arr)));
	}

	//冒泡排序
	//不多废话了
	function SortBubble(arr) {
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
		
		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('冒泡排序总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}

	//选择排序
	//简单理解选择排序就是从一个未知数据空间，选取数据之最放到一个新的空间。
	function sortSelect(arr) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');

		var minIndex, temp;

		for (var i = 0; i < arr.length - 1; i++) {
			minIndex = i;
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[j] < arr[minIndex]) {
					minIndex = j;
				}
			}
			temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}

		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log('选择排序总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
		return arr;
	}


	return {
		init: function() {
			SortInit();
		}
	}
}());
