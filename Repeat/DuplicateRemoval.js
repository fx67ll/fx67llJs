var DuplicateRemoval = (function() {

	var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];

	function RemovalInit() {
		// Removal1();
		// Removal2a();
		// Removal2b();
		// Removal3();
	}

	//最基础的方式，两层for循环，然后用splice方法，也是最蠢的方法
	function Removal1() {
		var date = new Date();
		var date1 = date.getTime();
		console.log("数组去重开始时间:" + date1);
		for (var i = 0; i < arr.length; i++) {
			for (var j = i + 1; j < arr.length - 1; j++) {
				if (arr[i] == arr[j]) {
					arr.splice(j, 1);
					j--;
				}
				console.log(arr);
			}
		}
		var date = new Date();
		var date2 = date.getTime();
		console.log("数组去重结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("数组去重耗费时间:" + date0);
	}

	//利用出现在数组中的下标与indexof对比是否相同判断去重，稍微快一点了
	function Removal2a() {
		var date = new Date();
		var date1 = date.getTime();
		console.log("数组去重开始时间:" + date1);
		for (var i = 0; i < arr.length; i++) {
			if (arr.indexOf(arr[i]) != i) {
				arr.splice(i, 1);
				i--;
			}
			console.log(arr);
		}
		var date = new Date();
		var date2 = date.getTime();
		console.log("数组去重结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("数组去重耗费时间:" + date0);
	}

	//同上思路，若下标相等添加到新的数组中
	function Removal2b() {
		var date = new Date();
		var date1 = date.getTime();
		console.log("数组去重开始时间:" + date1);
		var arr0 = new Array();
		for (var i = 0; i < arr.length; i++) {
			if (arr.indexOf(arr[i]) == i) {
				arr0.push(arr[i]);
			}
			console.log(arr0);
		}
		var date = new Date();
		var date2 = date.getTime();
		console.log("数组去重结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("数组去重耗费时间:" + date0);
	}

	//利用js的filter方法，速度非常快啊，api调用者
	function Removal3() {
		var date = new Date();
		var date1 = date.getTime();
		console.log("数组去重开始时间:" + date1);
		var arr0 = arr.filter(function(element, index, self) {
			return self.indexOf(element) === index;
		});
		console.log(arr0);
		var date = new Date();
		var date2 = date.getTime();
		console.log("数组去重结束时间:" + date2);
		var date0 = date2 - date1;
		console.log("数组去重耗费时间:" + date0);
	}

	//

	return {
		init: function() {
			RemovalInit();
		}
	}
}());
