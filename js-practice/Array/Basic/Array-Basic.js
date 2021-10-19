var ArrayBasic = (function() {

	var arr = [1, 2.3, 3, 4, 5];
	var num = 123456789;
	var date = new Date();

	function test() {
		test1();
	}

	function test1() {
		console.log(arr.toLocaleString());
		console.log(num.toLocaleString());
		console.log(date.toLocaleString());
		console.log(date.toLocaleDateString());
	}

	return {
		init: function() {
			test();
		}
	}
}());
