var SortAll = (function() {

	function getStartTime() {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log("开始时间:" + startTime + '毫秒');
		return startTime;
	}

	function getEndTime(sortname, startTime) {
		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log(sortname + '总耗时：' + totalTime + '毫秒');
		console.log('-----------------------------');
	}

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

	//冒泡排序
	//不多废话了
	function SortBubble(arr) {
		var starttime = getStartTime();
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
		getEndTime('冒泡排序', starttime);
		return arr;
	}

	//选择排序
	//简单理解选择排序就是从一个未知数据空间，选取数据之最放到一个新的空间。
	function sortSelect(arr) {
		var starttime = getStartTime();
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
		getEndTime('选择排序', starttime);
		return arr;
	}

	//插入排序
	//插入排序的原理其实很好理解，可以类比选择排序;
	//选择排序时在两个空间进行，等于说每次从旧的空间选出最值放到新的空间，而插入排序则是在同一空间进行。
	function sortInsert(arr) {
		var starttime = getStartTime();
		for (var i = 1; i < arr.length; i++) {
			var key = arr[i];
			var j = i - 1;
			while (arr[j] > key) {
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = key;
		}
		getEndTime('插入排序', starttime);
		return arr;
	}

	//插入排序升级版：二分法插入排序
	//先抄一遍，后续理解
	function sortInsertBinary(arr) {
		var starttime = getStartTime();
		for (var i = 0; i < arr.length; i++) {
			var key = arr[i]
			var left = 0;
			var right = i - 1;
			while (left <= right) {
				var middle = parseInt((left + right) / 2);
				if (key < arr[middle]) {
					right = middle - 1;
				} else {
					left = middle + 1;
				}
			}
			for (var j = i - 1; j >= left; j--) {
				arr[j + 1] = arr[j];
			}
			arr[left] = key;
		}
		getEndTime('二分法插入排序', starttime);
		return arr;
	}
	
	var arr = randomArr(15000, 1, 2000000);
	
	function SortInit() {
		SortBubble(JSON.parse(JSON.stringify(arr)));
		sortSelect(JSON.parse(JSON.stringify(arr)));
		sortInsert(JSON.parse(JSON.stringify(arr)));
		sortInsertBinary(JSON.parse(JSON.stringify(arr)));
	}


	return {
		init: function() {
			SortInit();
		}
	}
}());
