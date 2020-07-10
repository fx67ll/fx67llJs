var SortAll = (function() {

	function getStartTime(sortname) {
		var datas = new Date();
		var startTime = datas.getTime();
		console.log('------------' + sortname + '------------');
		console.log("开始时间:" + startTime + '毫秒');
		return startTime;
	}

	function getEndTime(sortname, startTime, ps) {
		var datae = new Date();
		var endTime = datae.getTime()
		console.log("结束时间:" + endTime + '毫秒');
		var totalTime = endTime - startTime;
		console.log(sortname + '总耗时：' + totalTime + '毫秒');
		if (ps !== undefined) {
			console.log(ps);
		}
		console.log('-------------------------------');
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
		var starttime = getStartTime('冒泡排序');
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
		var starttime = getStartTime('选择排序');
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
		var starttime = getStartTime('插入排序');
		for (var i = 1; i < arr.length; i++) {
			var key = arr[i];
			var j = i - 1;
			while (arr[j] > key) {
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = key;
		}
		getEndTime('插入排序', starttime, '这性能我也是醉了。。。');
		return arr;
	}

	//插入排序升级版：二分法插入排序
	//从这边开始之后的排序对我的理解能力造成巨大挑战
	//先抄一遍，后续理解
	//看了第二遍了，还是没有明白所以然
	function sortInsertBinary(arr) {
		var starttime = getStartTime('二分插入');
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
		getEndTime('二分法插入排序', starttime, '二分法插入排序没看懂！！！');
		return arr;
	}

	//希尔排序
	//还是不懂，依旧先抄一遍
	function sortShell(arr) {
		var starttime = getStartTime('希尔排序');
		var len = arr.length;
		var temp;
		var gap = 1;
		while (gap < len / 5) {
			gap = gap * 5 + 1;
		}
		for (gap; gap > 0; gap = Math.floor(gap / 5)) {
			for (var i = gap; i < len; i++) {
				temp = arr[i];
				for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
					arr[j + gap] = arr[j];
				}
				arr[j + gap] = temp
			}
		}
		getEndTime('希尔排序', starttime, '希尔排序完全不懂！但是真的快！');
		return arr;
	}

	//归并排序
	//具体过程明白了，写代码还没明白
	function sortMerge(arr) {
		var len = arr.length;
		if (len < 2) {
			return arr;
		}
		var middle = Math.floor(len / 2);
		var left = arr.slice(0, middle);
		var right = arr.slice(middle);
		return merge(sortMerge(left), sortMerge(right));
	}

	function merge(left, right) {
		var result = [];
		// var starttime = getStartTime();
		while (left.length && right.length) {
			if (left[0] < right[0]) {
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}
		while (left.length) {
			result.push(left.shift());
		}
		while (right.length) {
			result.push(right.shift());
		}
		// getEndTime('归并排序', starttime);
		// console.log('归并排序具体过程明白了，写代码还没明白');
		// console.log('-----------------------------');
		return result;
	}

	//快速排序
	//好像陈总说过这个排序，完全没印象了
	//这个排序看动图都没看懂，先抄代码为敬
	function sortQuick(arr) {
		var starttime = getStartTime('快速排序');
		var left = 0;
		var right = arr.length - 1;
		if (left < right) {
			var x = arr[right];
			var i = arr[left - 1];
			var temp;
			for (var j = left; j <= right; j++) {
				if (arr[j] <= x) {
					i++;
					temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		getEndTime('快速排序', starttime, '快速排序NB！！！');
		return arr;
	}

	//堆排序
	//听到这个名字我已经放弃理解了，直接背就完事了，当做工具用吧，算法工程师这辈子应该是不用想了，慢慢进步
	function sortHeap(arr) {
		var starttime = getStartTime('堆排序');
		//建堆
		var heapSize = arr.length;
		var temp;
		for (var i = Math.floor(heapSize / 2) - 1; i > 0; i--) {
			heapify(arr, i, heapSize);
		}
		//堆排序
		for (var j = heapSize - 1; j >= 1; j--) {
			temp = arr[0];
			arr[0] = arr[j];
			arr[j] = temp;
			heapify(arr, 0, --heapSize);
		}
		getEndTime('堆排序', starttime, '已经放弃理解堆排序。。。');
		return arr;
	}

	function heapify(arr, x, len) {
		var l = 2 * x + 1;
		var r = 2 * x + 2;
		var largest = x;
		var temp;
		if (l < len && arr[l] > arr[largest]) {
			largest = l;
		}
		if (r < len && arr[r] > arr[largest]) {
			largest = r;
		}
		if (largest !== x) {
			temp = arr[x];
			arr[x] = arr[largest];
			arr[largest] = temp;
			heapify(arr, largest, len);
		}
	}



	var arr = randomArr(10000, 1, 2000000);

	function SortInit() {
		SortBubble(JSON.parse(JSON.stringify(arr)));
		sortSelect(JSON.parse(JSON.stringify(arr)));
		sortInsert(JSON.parse(JSON.stringify(arr)));
		sortInsertBinary(JSON.parse(JSON.stringify(arr)));
		sortShell(JSON.parse(JSON.stringify(arr)));

		sortMerge(JSON.parse(JSON.stringify(arr)));
		console.log('------------归并排序------------');
		console.log('暂时没想到展示归并排序性能的方式！归并排序具体过程明白了，如何将过程用代码写出来还没明白！后面回顾的时候把这边搞定！！！');
		console.log('-------------------------------');

		sortQuick(JSON.parse(JSON.stringify(arr)));
		sortHeap(JSON.parse(JSON.stringify(arr)));
	}


	return {
		init: function() {
			SortInit();
		}
	}
}());
