var SortBubble = (function(){
	
	var arr = [32,43,12,54,44,123,4];
	
	function SortInit(){
		//Sort1Bubble(arr);
		//Sort2Bubble(arr);
		//Sort3Bubble(arr);
		Sort4Bubble(arr);
	}
	
	//基础版冒泡排序
	function Sort1Bubble(arr){
		var date = new Date();
		var date1 = date.getTime();
		console.log("冒泡排序开始时间:"+date1);
		var len = arr.length;
		for (var i=0;i<len;i++) {
			for (var j=0;j<len-1-i;j++) {
				if(arr[j]>arr[j+1]){
					var temp = arr[j+1];
					arr[j+1] = arr[j];
					arr[j] = temp;
				}
				console.log(arr);
			}
		}
		var date = new Date();
		var date2 = date.getTime();
		console.log("冒泡排序结束时间:"+date2);
		var date0 = date2 - date1;
		console.log("第一次改进冒泡排序耗费时间:"+date0);
		return arr;
	}
	
	//初步改进版冒泡排序
	//“进化版”冒泡排序算法相对于“原始人”冒泡排序有个亮点，就是每一层的循环都记录上一次排序的位置;
	//这两种排序算法都是先排最后一位，最后一位是最大的，然后以此类推。细细推敲第二种方法显然比第一种方法少走了一些冤枉路;
	//也就是说每一层排完序之后，就记录排到最大的哪一位在什么位置，因为每一层最大的数就是它所在数组的倒数的位数，因此下一次就没必要再循环一遍，相对于第一种就少进行了很多计算。
	function Sort2Bubble(arr){
		var date = new Date();
		var date1 = date.getTime();
		console.log("第一次改进冒泡排序开始时间:"+date1);
		var i = arr.length - 1;
		while(i>0){
			//每趟开始的时候没有记录交换，没懂这里的意思后面慢慢理解
			var pos = 0;
			for(var j=0;j<i;j++){
				if(arr[j]>arr[j+1]){
					pos = j;
					var temp = arr[j+1];
					arr[j+1] = arr[j];
					arr[j] = temp;
				}
			}
			i = pos;
			console.log(arr);
		}
		var date = new Date();
		var date2 = date.getTime();
		console.log("第一次改进冒泡排序结束时间:"+date2);
		var date0 = date2 - date1;
		console.log("第一次改进冒泡排序耗费时间:"+date0);
		return arr;
	}
	
	//继续改进版冒泡排序
	//因为前两次的排序都是按最大或者最小方向进行排序，而第三种方法会选择从两头出发一起计算，双管齐下
	function Sort3Bubble(arr){
		var low = 0;
		var high = arr.length-1;
		var date = new Date();
		var date1 = date.getTime();
		console.log("第二次改进冒泡排序开始时间:"+date1);
		while(low<high){
			for(var i=low;i<high;i++){
				if(arr[i]>arr[i+1]){
					var temp = arr[i+1];
					arr[i+1] = arr[i];
					arr[i] = temp;
				}
			}
			high--;
			for(var j=high;j>low;j--){
				if(arr[j]<arr[j-1]){
					var temp = arr[j-1];
					arr[j-1] = arr[j];
					arr[j] = temp;
				}
			}
			low++;
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("第二次改进冒泡排序结束时间:"+date2);
		var date0 = date2 - date1;
		console.log("第二次改进冒泡排序耗费时间:"+date0);
		return arr;
	}
	
	//高阶版冒泡排序
	function Sort4Bubble(arr){
		var low = 0;
		var high = arr.length-1;
		var date = new Date();
		var date1 = date.getTime();
		console.log("第三次改进冒泡排序开始时间:"+date1);
		while(low<high){
			var pos1 = 0;
			var pos2 = 0;
			for(var i=low;i<high;i++){
				if(arr[i]>arr[i+1]){
					var temp = arr[i+1];
					arr[i+1] = arr[i];
					arr[i] = temp;
					pos1 = i
				}
			}
			high = pos1;
			for(var j=high;j>low;j--){
				if(arr[j]<arr[j-1]){
					var temp = arr[j-1];
					arr[j-1] = arr[j];
					arr[j] = temp;
					pso2 = j;
				}
			}
			low = pos2;
		}
		console.log(arr);
		var date = new Date();
		var date2 = date.getTime();
		console.log("第三次改进冒泡排序结束时间:"+date2);
		var date0 = date2 - date1;
		console.log("第三次改进冒泡排序耗费时间:"+date0);
		return arr;
	}
	
	return {
		init: function(){
			SortInit();
		}
	}
}());