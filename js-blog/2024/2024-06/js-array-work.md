# 记录工作中常用的 JS 数组相关操作  

工作中难免会遇到各种各样的数据结构，较为全面的了解数组操作，对于复杂数据结构的处理会非常有用且节省时间  

所以想在这里总结一下工作中常用的数组操作，都是一些非常基础的知识，大家看个乐就好~  



## 目录
- [工作中常用的数组方法](#工作中常用的数组方法)
	- [常见数组方法中的用法、以及坑](#常见数组方法中的用法、以及坑)
	  - [slice() 和 splice() 方法之间有什么区别](#slice-和-splice-方法之间有什么区别)
	  - [如何合并两个数组](#如何合并两个数组)
	  - [slice()、concat()、[...arr] 方法返回的数组是浅拷贝还是深拷贝](#slice、concat、arr-方法返回的数组是浅拷贝还是深拷贝)
	  - [如何有效地搜索数组中的元素](#如何有效地搜索数组中的元素)
	  - [如何使用reduce()方法](#如何使用reduce方法)
	  - [sort() 方法是否可以对纯数字数组进行正确的排序](#sort-方法是否可以对纯数字数组进行正确的排序)
- [sort() 方法如何进行自定义排序](#sort-方法如何进行自定义排序)
  - [数字排序](#数字排序)
  - [字符串排序（考虑大小写）](#字符串排序考虑大小写)
  - [复杂对象数组排序](#复杂对象数组排序)
- [如何去除数组中的重复元素](#如何去除数组中的重复元素)
  - [使用 Set 对象](#使用-set-对象)
  - [使用 filter() 方法](#使用-filter-方法)
  - [使用 reduce() 方法](#使用-reduce-方法)
  - [使用对象键](#使用对象键)
- [如何判断一个变量是否是数组？有哪些判断方式？](#如何判断一个变量是否是数组有哪些判断方式)
  - [使用 Array.isArray() 方法（推荐）](#使用-arrayisarray-方法推荐)
  - [使用 instanceof 操作符](#使用-instanceof-操作符)
  - [使用 Object.prototype.toString.call()](#使用-objectprototypetostringcall)
  - [使用构造函数属性 constructor](#使用构造函数属性-constructor)
  - [使用 Array.prototype.isPrototypeOf()](#使用-arrayprototypeisprototypeof)
- [IF 条件中的空数组是 false 还是 true](#if-条件中的空数组是-false-还是-true)
  - [JS 中的哪些值会被判断为 Falsy 值](#js-中的哪些值会被判断为-falsy-值)
  - [判断为 Falsy 值的相关示例](#判断为-falsy-值的相关示例)
- [面试问题合集](#面试问题合集)



## 工作中常用的数组方法  
1. **`push()`** - 向数组的末尾添加一个或多个元素，并返回新的长度。  
2. **`pop()`** - 删除数组的最后一个元素并返回该元素。  
3. **`shift()`** - 删除数组的第一个元素并返回该元素，数组中的其他元素向前移动。  
4. **`unshift()`** - 向数组的开头添加一个或多个元素，并返回新的长度。  
5. **`slice()`** - 返回数组的一个片段或子数组。  
6. **`splice()`** - 用于插入、删除或替换数组的元素。  
7. **`map()`** - 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后的返回值。  
8. **`filter()`** - 创建一个新数组，包含通过所提供函数实现的测试的所有元素。  
9. **`reduce()`** - 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。  
10. **`forEach()`** - 对数组的每个元素执行一次提供的函数。  
11. **`find()`** - 返回数组中满足提供的测试函数的第一个元素的值，否则返回 `undefined`。  
12. **`findIndex()`** - 返回数组中满足提供的测试函数的第一个元素的索引，否则返回 `-1`。  
13. **`sort()`** - 对数组的元素进行排序，并返回数组。  
14. **`reverse()`** - 颠倒数组中元素的顺序。  
15. **`concat()`** - 用于合并两个或多个数组。  
16. **`join()`** - 把数组的所有元素放入一个字符串。  
17. **`includes()`** - 判断一个数组是否包含一个指定的值，根据情况返回 true 或 false。  
18. **`some()`** - 测试数组中是不是至少有一个元素通过了被提供的函数测试。  
19. **`every()`** - 测试一个数组内的所有元素是否都能通过某个指定函数的测试。  

### 常见数组方法中的用法、以及坑
#### `slice()` 和 `splice()` 方法之间有什么区别  
- `slice()`方法返回数组的一个副本，从开始到结束（不包括结束），不改变原数组。  
- `splice()`方法通过删除或替换现有元素或添加新元素来修改数组，并返回被修改的元素数组。在需要同时对数组进行元素的删除和添加操作时非常有用。  

#### 如何合并两个数组
- 可以使用`concat()`方法或者展开运算符（`...`）。例如，`arr1.concat(arr2)`或`[...arr1, ...arr2]`。  
- **`concat()`**：用于合并多个数组成一个新数组，常用于不改变原数组的情况下创建新的数组集合。  

#### `slice()`、`concat()`、`[...arr]` 方法返回的数组是浅拷贝还是深拷贝  
使用`slice()`或`[...arr]`是浅拷贝操作。浅拷贝是指只复制对象的第一层属性，如果属性是引用类型，复制的是引用。  

#### 如何有效地搜索数组中的元素
- 使用`indexOf()`或`includes()`来检查元素是否存在。  
- 使用`find()`或`findIndex()`来查找符合条件的元素或其索引。  
- 这些方法都会在找到符合条件的第一个元素后停止搜索。  

#### 如何使用`reduce()`方法
- `reduce()`方法对数组中的每个元素执行一个由您提供的reducer函数（升序执行），将其结果汇总为单个返回值。  
- 例如，计算数组所有值的总和：`array.reduce((acc, val) => acc + val, 0)`。  

#### `sort()` 方法是否可以对纯数字数组进行正确的排序
- `sort()` 方法可以用来按数字大小排序数组中的数字。
- 在JavaScript中，如果直接使用 `sort()` 方法而不提供比较函数，它默认会将数组元素转换成字符串，然后按照字符串的`Unicode`字典顺序进行排序。
- 这种默认行为对于数字排序通常是不正确的，特别是当数字的位数不一致时。
```javascript
let numbers = [10, 5, 100, 2, 1000];
numbers.sort();
console.log(numbers); // 输出: [10, 100, 1000, 2, 5]
```



## `sort()` 方法如何进行自定义排序
在JavaScript中，`Array.prototype.sort()` 方法可以接受一个可选的比较函数作为参数，用来定义数组元素的排序方式。
这个比较函数应该接受两个参数（通常表示为`a`和`b`），这两个参数是数组中将要被比较的两个元素。比较函数的返回值决定了这两个元素在最终排序后数组中的顺序：
- 如果比较函数返回一个小于0的值，那么元素`a`将排在元素`b`之前。
- 如果比较函数返回一个大于0的值，那么元素`b`将排在元素`a`之前。
- 如果比较函数返回0，那么元素`a`和`b`的顺序不变。

### `sort()`方法自定义排序的基础示例
#### 数字排序
对于数字类型的数组，可以这样定义比较函数来确保数组按照数值大小升序或降序排列：
```javascript
let numbers = [10, 5, 100, 2, 1000];
// 升序排序
numbers.sort((a, b) => a - b);
console.log(numbers); // 输出: [2, 5, 10, 100, 1000]
// 降序排序
numbers.sort((a, b) => b - a);
console.log(numbers); // 输出: [1000, 100, 10, 5, 2]
```

#### 字符串排序（考虑大小写）
对于字符串数组，如果要按字典顺序排序，可能还需要考虑大小写：
```javascript
let words = ['banana', 'Apple', 'orange'];
// 升序排序，忽略大小写
words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(words); // 输出: ['Apple', 'banana', 'orange']
```

#### 复杂对象数组排序
如果数组包含对象，可以根据对象的某个属性来排序：
```javascript
let items = [
    { name: "John", age: 25 },
    { name: "Anna", age: 30 },
    { name: "Mike", age: 22 }
];
// 根据age属性升序排序
items.sort((a, b) => a.age - b.age);
console.log(items); // 输出: [{ name: "Mike", age: 22 }, { name: "John", age: 25 }, { name: "Anna", age: 30 }]
```

### `sort()`方法在工作中应用的注意事项
- 使用`sort()`方法时需要注意，它是在原数组上进行排序，而不是返回一个新的排序后的数组。  
- 如果不提供比较函数，`sort()`将元素转换为字符串，并按照字符串的Unicode码点顺序排序，这可能不会按照数值大小排序数字。  
- 通过提供自定义的比较函数，可以灵活地控制数组的排序行为，满足不同的业务需求。  



## 如何去除数组中的重复元素
### 使用 `Set` 对象
`Set` 是一种允许存储任何类型唯一值的集合。由于 `Set` 自动去除重复的元素，我们可以利用这个特性来去除数组中的重复项。
```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 使用 `filter()` 方法
`filter()` 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。可以利用这个方法和 `indexOf()` 来过滤掉重复的元素。
```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 使用 `reduce()` 方法
`reduce()` 方法对数组中的每个元素执行一个 reducer 函数（升序执行），将其结果汇总为单个返回值。这个方法也可以用来去除重复元素。
```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.reduce((acc, current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 使用对象键
利用对象的属性不能重复的特性，可以快速去除数组中的重复元素。
```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueObj = {};
array.forEach(item => {
  uniqueObj[item] = true;
});
const uniqueArray = Object.keys(uniqueObj).map(key => parseInt(key));
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```



## 如何判断一个变量是否是数组？有哪些判断方式？
在JavaScript中，判断一个变量是否是数组可以通过多种方式实现。这些方法各有优缺点，适用于不同的场景。
- **最推荐的方法**：`Array.isArray()`，因为它简单且总是可靠的。
- **较可靠的方法**：`Object.prototype.toString.call()`，尤其是在涉及多个执行环境时。
- **其他方法**：虽然 `instanceof`、`constructor` 和 `isPrototypeOf` 可以用来判断数组，但它们在某些情况下可能不够可靠或容易受到环境的影响。

### 使用 `Array.isArray()` 方法（推荐）
`Array.isArray()` 是 ECMAScript 5 新增的方法，它提供了一种简单、可靠的方式来判断一个变量是否是数组。这是判断数组的最推荐方式。
```javascript
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // 输出：true
```

### 使用 `instanceof` 操作符
`instanceof` 操作符用于测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。
```javascript
let arr = [1, 2, 3];
console.log(arr instanceof Array); // 输出：true
```
但是，`instanceof` 可能在不同的执行环境（如不同的iframe或window对象）中不一定可靠，因为数组的构造器可能不同。

### 使用 `Object.prototype.toString.call()`
这是一个更加通用的方法，可以用来获取任意对象的类型。对于数组，`Object.prototype.toString.call()` 返回 `"[object Array]"`。
```javascript
let arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // 输出：true
```
这种方法相对可靠，并且在不同的执行环境中也能保持一致性。

### 使用构造函数属性 `constructor`
每个数组都有一个 `constructor` 属性，指向它的构造函数。如果这个属性是 `Array`，那么对象通常是数组。但这种方法不是非常可靠，因为 `constructor` 属性可以被改写。
```javascript
let arr = [1, 2, 3];
console.log(arr.constructor === Array); // 输出：true
```

### 使用 `Array.prototype.isPrototypeOf()`
这个方法可以用来检查 `Array.prototype` 是否存在于某个对象的原型链上。
```javascript
let arr = [1, 2, 3];
console.log(Array.prototype.isPrototypeOf(arr)); // 输出：true
```



## IF 条件中的空数组是 `false` 还是 `true`
在 JavaScript 中，空数组（`[]`）在 `if` 条件判断中被视为 `true`。  
这是因为所有对象，包括数组（无论是否为空），在布尔上下文中都被视为 `true`。  
这意味着即使数组没有任何元素，它仍然被认为是真值。  

### JS 中的哪些值会被判断为 `Falsy` 值  
以下是JavaScript中的所有 `Falsy` 值：
1. **`false`** - 布尔值 `false` 本身自然是 `Falsy`。  
2. **`0`** 和 **`-0`** - 数字零和负零。  
3. **`0n`** - BigInt类型的零。
4. **`""`**（空字符串） - 双引号或单引号中没有任何字符。  
5. **`null`** - 表示无值。  
6. **`undefined`** - 变量已声明但未赋值时的默认值。  
7. **`NaN`** - 表示 "不是一个数字" 的特殊值。  

### 判断为 `Falsy` 值的相关示例  
在实际的编程实践中，了解哪些值是 `Falsy` 值非常重要，因为它们会影响条件语句的行为。  
```javascript
if (false) {} // 不执行
if (0) {} // 不执行
if (-0) {} // 不执行
if (0n) {} // 不执行
if ("") {} // 不执行
if (null) {} // 不执行
if (undefined) {} // 不执行
if (NaN) {} // 不执行
if ([]) {} // 执行，因为空数组是 true
```




## 面试问题合集  
恭喜你耐心看完本文了，对照下方的问题列表，自我提问一下吧~
> 你知道哪些 JS 数组操作？  
> 工作中常用哪些方法？  
> slice() 和 splice() 方法之间有什么区别？  
> 如何合并两个数组？  
> slice()、concat()、[...arr] 方法返回的数组是浅拷贝还是深拷贝？  
> 如何有效地搜索数组中的元素？  
> 如何使用reduce()方法？  
> sort() 方法是否可以对纯数字数组进行正确的排序？  
> sort() 方法如何进行自定义排序？  
> 如何去除数组中的重复元素？  
> 如何判断一个变量是否是数组？  
> IF 条件中的空数组是 false 还是 true？  
> JS 中的哪些值会被判断为 Falsy 值？  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llJs/blob/master/js-blog/2024/2024-06/js-array-work.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***
