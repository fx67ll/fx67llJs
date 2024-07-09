# 简述 JS 中对象的创建和拷贝  

在 JavaScript 中，对象是一种非常重要且灵活的数据结构，用于存储多个值（属性）和方法（函数）  

对象的创建和拷贝是日常开发中经常涉及的操作，对于业务逻辑的准确实现有着重要的作用  

本文将简要概括 JavaScript 中对象的创建和拷贝方式，都是一些非常基础的知识，大家看个乐就好~  



## 目录
- [对象的作用](#对象的作用)
- [创建对象](#创建对象)
  - [对象字面量](#对象字面量)
  - [使用 `new Object()` 方法](#使用-new-object-方法)
  - [构造函数](#构造函数)
  - [Object.create()](#objectcreate)
  - [类（ES6+）](#类es6)
- [对象的拷贝](#对象的拷贝)
  - [深拷贝与浅拷贝的区别](#深拷贝与浅拷贝的区别)
  - [如何实现深拷贝](#如何实现深拷贝)
  - [展开运算符是深拷贝还是浅拷贝](#展开运算符是深拷贝还是浅拷贝)
- [补充知识点：JS 中有哪些数据类型？](#补充知识点js-中有哪些数据类型)
- [面试问题合集](#面试问题合集)



## 对象的作用  
JavaScript中的对象是一种复合数据类型，用于存储多个值（属性）和方法（函数）。它主要有以下作用：  
- **组织数据**：对象可以存储和管理相关数据，使数据处理更加结构化。
- **封装功能**：对象可以包含相关的函数，便于管理和使用。
- **数据抽象**：对象允许隐藏内部实现细节，只暴露必要的操作接口。
- **模拟现实世界实体**：对象是现实世界实体的良好抽象，有助于在程序中模拟现实世界的行为和属性。
 
  
  
## 创建对象  
在JavaScript中，创建对象是非常常见的操作，因为对象是一种非常灵活的数据结构，用于存储和组织数据。以下是创建对象的几种主要方式及其特点：

### 1. 对象字面量
这是创建对象最简单也是最直接的方式。通过大括号 `{}` 来定义一个新对象，可以在其中直接定义属性和方法。
```javascript
let person = {
  name: "Alice",
  age: 25,
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
```
**优点**：简单直观，易于阅读和写入。  
**缺点**：不适合创建具有相同属性和方法的多个实例。  


### 2. 使用 `new Object()` 方法
这种方法使用 `new Object()` 构造函数来创建一个新的空对象。这是一种较为基础的方法，与对象字面量 `{}` 类似，但使用了构造函数的形式。
```javascript
let person = new Object();
person.name = "Eve";
person.age = 28;
person.greet = function() {
  console.log("Hello, " + this.name);
};
```
**优点**：
- 明确表达了创建对象的意图。  
- 可以动态添加属性和方法。  

**缺点**：  
- 与使用对象字面量相比，没有明显的优势，而且写法更繁琐。  
- 每次使用 `new Object()` 都会创建一个全新的对象实例，如果需要创建多个结构相同的对象，这种方式不如使用构造函数或类那样高效。  

#### 比较 `new Object()` 和 `{}`
实际上，`new Object()` 和对象字面量 `{}` 在功能上是等价的。对象字面量的语法更简洁、更直观，因此在实际开发中更常被使用。例如，以下两种创建空对象的方式是等效的：
```javascript
let obj1 = new Object();
let obj2 = {};
```
通常，推荐使用对象字面量的方式，因为它更简洁且易于阅读和维护。
然而，了解 `new Object()` 的存在和用法也是有益的，特别是在需要通过某些特定的构造函数动态决定对象类型的高级用法中。


### 3. 构造函数
可以定义一个构造函数，然后用 `new` 关键字来创建对象的实例。
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log("Hello, " + this.name);
  };
}
let person1 = new Person("Bob", 30);
```
**优点**：适合创建多个具有相似属性和方法的对象。  
**缺点**：每个实例都会重新定义方法，可能导致内存浪费。  


### 4. Object.create()
`Object.create()` 方法可以用来创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。
```javascript
const proto = {
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

let person = Object.create(proto);
person.name = "Charlie";
person.age = 20;

person.greet();
```
**优点**：可以指定原型对象，适合实现原型继承。  
**缺点**：不如构造函数直观，使用稍复杂。  


### 5. 类（ES6+）
ES6 引入了类的概念，使得创建对象更接近传统面向对象编程。
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log("Hello, " + this.name);
  }
}

let person = new Person("Dave", 40);
```
**优点**：语法清晰，易于理解和继承，更接近传统的OOP语法。  
**缺点**：较新的语法，旧版浏览器可能不支持。  



## 对象的拷贝  
在 JavaScript 中，理解深拷贝和浅拷贝的区别及其实现方式对于管理复杂数据结构非常重要。以下是深拷贝和浅拷贝的区别和实现方法的详解：

### 深拷贝与浅拷贝的区别
1. **浅拷贝（Shallow Copy）**：
   - 浅拷贝只复制对象的第一层属性。如果属性值是基本数据类型，拷贝的是值；如果属性值是引用数据类型（如对象或数组），拷贝的是内存地址（引用），因此原始数据和拷贝数据会共享相同的引用对象。
   - 修改引用数据类型的属性时，原始对象和拷贝对象都会受到影响。
2. **深拷贝（Deep Copy）**：
   - 深拷贝会递归复制所有层级的属性，确保原始数据和拷贝数据在内存中完全独立。修改拷贝对象不会影响原始对象。
   - 实现深拷贝通常需要递归调用或使用特定的库函数。


### 如何实现深拷贝
1. **使用 JSON 方法**：
   - 最简单的深拷贝实现可以通过 JSON 的序列化和反序列化完成。但这种方法不能复制函数、`undefined`、`Symbol` 等特殊类型的数据，也无法处理循环引用的情况。
   ```javascript
   const obj = {
       a: 1,
       b: {
           c: 2
       }
   };
   const deepCopy = JSON.parse(JSON.stringify(obj));
   deepCopy.b.c = 3;
   console.log(obj.b.c); // 输出 2
   ```
2. **使用库（如 Lodash 的 `cloneDeep` 方法）**：
   - 一些 JavaScript 库如 Lodash 提供了深拷贝的实现。这些实现通常更为完整，能处理各种数据类型和复杂的数据结构。
   ```javascript
   import _ from 'lodash';
   const obj = {
       a: 1,
       b: {
           c: 2
       }
   };
   const deepCopy = _.cloneDeep(obj);
   deepCopy.b.c = 3;
   console.log(obj.b.c); // 输出 2
   ```
3. **手动实现递归深拷贝**：
   - 你可以手动编写一个递归函数来实现深拷贝。这种方法需要处理各种数据类型和循环引用的问题。
   ```javascript
   function deepClone(obj, hash = new WeakMap()) {
       if (obj === null) return null; 
       if (typeof obj !== 'object') return obj;
       if (obj instanceof Date) return new Date(obj);
       if (obj instanceof RegExp) return new RegExp(obj);
       if (hash.has(obj)) return hash.get(obj);
       
       const cloneObj = new obj.constructor();
       hash.set(obj, cloneObj);
       
       for (const key in obj) {
           if (obj.hasOwnProperty(key)) {
               cloneObj[key] = deepClone(obj[key], hash);
           }
       }
       return cloneObj;
   }
   ```


### 开发中如何避免浅拷贝
- 在处理复杂的数据结构时，尤其是包含嵌套对象或数组时，避免使用如 `Object.assign()` 或展开运算符（`...`）这样的浅拷贝方法。
- 使用深拷贝方法（如上述的 JSON 方法或 Lodash 的 `cloneDeep`）来确保数据的完整独立性。
- 在不需要完整拷贝对象的情况下，明确你的需求，选择合适的拷贝策略。  


### 展开运算符是深拷贝还是浅拷贝  
展开运算符（spread operator）在 JavaScript 中用于“展开”数组或对象的元素。  
当用于对象或数组时，展开运算符仅复制第一层的元素到新的数组或对象中。  
这意味着如果原始数据结构中包含嵌套的对象或数组，这些嵌套的结构不会被真正地复制，而是复制它们的引用。  
因此，展开运算符实际上进行的是浅拷贝。  
#### 示例：对象的浅拷贝
```javascript
const original = {
    a: 1,
    b: {
        c: 2
    }
};
const copied = { ...original };
copied.a = 3; // 修改基本类型值
copied.b.c = 3; // 修改引用类型值
console.log(original); // 输出：{ a: 1, b: { c: 3 } }
console.log(copied);  // 输出：{ a: 3, b: { c: 3 } }
```
在这个例子中，修改 `copied.b.c` 同时也改变了 `original.b.c`，因为 `b` 属性的值（一个对象）通过引用被复制到了 `copied` 对象中。
#### 示例：数组的浅拷贝
```javascript
const originalArray = [1, { b: 2 }, 3];
const copiedArray = [...originalArray];
copiedArray[1].b = 3; // 修改数组中对象的属性
console.log(originalArray); // 输出：[1, { b: 3 }, 3]
console.log(copiedArray);  // 输出：[1, { b: 3 }, 3]
```
这个例子同样展示了修改 `copiedArray` 中的对象属性 `b` 时，`originalArray` 中相应的属性也被改变了。这是因为数组中的对象是通过引用被复制的。



## 补充知识点：JS 中有哪些数据类型？  
在 JavaScript 中，数据类型分为两大类：基本数据类型（Primitive types）和引用数据类型（Reference types）。  
理解这两种类型的区别对于掌握 JavaScript 的数据操作和性能优化非常重要。  

### 基本数据类型（Primitive types）
基本数据类型直接存储在栈（Stack）中，它们的值是不可变的。
当你对基本数据类型的变量进行操作时，实际上是在操作它的值的副本，而不是原始值本身。JavaScript 中的基本数据类型包括：
1. **Number**: 用于表示整数或浮点数，也包括特殊的数值如 `Infinity`, `-Infinity`, 和 `NaN`。
2. **BigInt**: 用于表示非常大的整数，超出了 `Number` 类型能够表示的范围。
3. **String**: 由字符组成的序列，用于表示文本数据，使用单引号、双引号或反引号表示。
4. **Boolean**: 表示逻辑实体，只有两个值，`true` 和 `false`，用于逻辑判断。
5. **Undefined**: 一个变量被声明了，但没有赋值时，它的值就是 `undefined`。
6. **Null**: 表示没有值或空值。通常用来表示变量将不会存储任何值。
7. **Symbol**: ES6 引入的新的基本数据类型，每个 `Symbol` 的值都是唯一的，常用于创建对象的私有成员。


### 引用数据类型（Reference types）
引用数据类型的值是对象，存储在堆（Heap）中，变量实际上存储的是一个指向堆内存中实际对象的指针。这意味着当你操作一个对象时，你是在操作对象的引用而不是实际的对象。引用数据类型包括：
1. **Object**: 基本的对象类型，几乎所有的 JavaScript 对象都是 `Object` 类型的实例。
   - **Date**: 用于处理日期和时间。
   - **RegExp**: 用于定义正则表达式。
   - **Array**和**Function**也都是对象。
   - 其他如 `Map`, `Set`, `WeakMap`, `WeakSet` 等也属于对象。  
2. **Array**: 用于存储有序集合的对象。  
3. **Function**: 函数实际上是一种特殊类型的对象，它具有可被执行的功能。


### 特殊提及
> **BigInt**: ES2020 引入的一种新的数字类型，可以表示非常大的整数。  
> 传统的 `Number` 类型只能安全地表示 `-2^53 + 1` 到 `2^53 - 1` 之间的整数，而 `BigInt` 可以表示任意大的整数。  


### 类型检测
可以使用 `typeof` 操作符来检查一个变量的类型，除了 `null` 返回的是 `"object"`。
对于更复杂的类型判断，通常使用 `instanceof` 操作符或者 `Object.prototype.toString.call()` 方法。


### 总结
- **基本数据类型**：Number, String, Boolean, Undefined, Null, Symbol, BigInt  
- **引用数据类型**：Object (包括 Array, Function, Date, RegExp 等)  
JavaScript 的灵活性在很大程度上来自于它的动态类型系统和对各种数据类型的支持。  
理解这些数据类型及其使用场景对于编写有效和高效的 JavaScript 代码至关重要。  
了解这些类型及其分类有助于更好地理解 JavaScript 的内存管理和性能优化，以及如何在代码中有效地处理数据。  




## 面试问题合集  
恭喜你耐心看完本文了，对照下方的问题列表，自我提问一下吧~
> js中对象的作用是什么？  
> js中如何创建对象？有哪些方式？
> js中创建对象不同方式的区别是什么？优缺点有哪些？  
> js中对象的深拷贝和浅拷贝有什么区别？
> js中如何实现对象的深拷贝？
> js中开发中如何避免发生对象的浅拷贝？  
> js中的展开运算符是深拷贝还是浅拷贝？  
> js中有哪些数据类型？


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llJs/blob/master/js-blog/2024/2024-07/js-object-create-clone.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***
