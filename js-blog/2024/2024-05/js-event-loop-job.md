# 详解 JS 中的事件循环、宏/微任务、Primise对象、定时器函数，以及其在工作中的应用和注意事项  

为什么会突然想到写这么一个大杂烩的博文呢，必须要从笔者几年前的一次面试说起

当时的我年轻气盛，在简历上放了自己的博客地址，而面试官应该是翻了我的博客，好几道面试题都是围绕着我的博文来提问

其中一个问题，直接使得空气静止了五分钟，然后面试官结束了这次面试，那就是：如何手写一个简易的Promise对象?

在这里，我也先挖个坑，给你们五分钟思考并自己回答一下这个问题~ *（答案隐藏在文章中自行查看~）*  

也是自从那次面试，我告诉自己，工作实战中总结的经验，一定要知其然知其所以然  

才可以真正用好这些核心知识点，不积跬步，无以至千里  

说了这么多的废话，我们进入今天的博文正题~


## 目录
- [事件循环（Event Loop）](#事件循环event-loop)
  - [事件循环的执行顺序](#事件循环的执行顺序)
- [宏任务（MacroTasks）和微任务（MicroTasks）](#宏任务macrotasks和微任务microtasks)
  - [常见宏任务](#常见宏任务)
  - [常见微任务](#常见微任务)
  - [宏任务和微任务的区别](#宏任务和微任务的区别)
- [Promise 对象](#promise-对象)
  - [Promise 的基本概念](#promise-的基本概念)
  - [如何创建 Promise 对象](#如何创建-promise-对象)
  - [如何使用 Promise 对象](#如何使用-promise-对象)
  - [Promise 的优势](#promise-的优势)
  - [Promise 在工作中的应用场景](#promise-在工作中的应用场景)
  - [如何快速入门上手 JavaScript 中的 Promise](#如何快速入门上手javascript中的-promise)
  - [手写一个简易的 Promise 对象](#手写一个简易的-promise-对象)
- [定时器函数](#定时器函数)
  - [setTimeout()](#settimeout)
  - [setInterval()](#setinterval)
  - [clearTimeout() 和 clearInterval()](#cleartimeout-和-clearinterval)
  - [定时器函数的使用注意](#定时器函数的使用注意)
  - [销毁定时器](#销毁定时器)
    - [为什么要销毁定时器？](#为什么要销毁定时器)
    - [Vue 中如何销毁定时器？](#vue中如何销毁定时器)
    - [React 中如何销毁定时器？](#react中如何销毁定时器)
- [补充知识点](#补充知识点)
  - [requestAnimationFrame](#requestanimationframe)
  - [setImmediate](#setimmediate)
  - [process.nextTick](#processnexttick)
  - [MutationObserver](#mutationobserver)
- [面试问题合集](#面试问题合集)


## 什么是事件循环（Event Loop）
事件循环是JavaScript运行时环境的核心机制，用于协调事件、用户交互、脚本、渲染、网络等。
由于JavaScript是单线程的，事件循环使得它能够执行非阻塞操作，即使在处理IO等长时间运行的任务时也能保持响应性。

### 事件循环的执行顺序
在JavaScript的执行模型中，事件循环按照以下顺序处理任务：
1. 执行全局脚本代码，这些同步代码直接运行。
2. 当执行栈为空时，事件循环会查看微任务队列。如果队列中有微任务，就一直执行微任务直到队列清空。
3. 执行一个宏任务（如由 `setTimeout()` 或 `setInterval()` 设置的回调）。
4. 宏任务执行完毕后，再次执行所有微任务。
5. 如果有必要，进行UI渲染。
6. 开始下一轮事件循环，处理下一个宏任务。

通过这种机制，JavaScript可以在单线程中有效地处理异步事件，同时保持代码执行的顺序和预期效果。  
理解这些概念将帮助你更好地设计和调试JavaScript中的异步代码。  



## 什么是宏任务（MacroTasks）和 微任务（MicroTasks）
### 宏任务  
宏任务是 JavaScript 事件循环中的一个较大的任务单元，每个宏任务在执行时会开启一个新的事件循环  
一个宏任务的完成通常会涉及到一个较为完整的工作流程，例如整个脚本的执行、事件（如用户交互事件）、定时器事件（setTimeout、setInterval）以及浏览器的 UI 渲染等  
每个宏任务在执行完毕后，会从任务队列中清除  

#### 常见宏任务
- `setTimeout()`：用于设置定时器，在指定的时间间隔后执行任务  
- `setInterval()`：用于设置定时器，在指定的时间间隔循环执行任务  
- `setImmediate()`：类似`setTimeout(fn, 0)` *(仅在Node.js中)*  
- IO操作：例如文件读写、网络请求等  
- UI渲染：浏览器需要重新渲染页面时触发的任务 
- `requestAnimationFrame`：动画渲染函数  
- 
#### 拓展提问：点击和键盘事件是宏任务吗？  
在 JavaScript 中，**事件（如点击和键盘事件）** 通常被处理为任务  
但它们不是宏任务（macro-tasks）也不是微任务（micro-tasks），而是作为任务队列中的**任务**来处理  
这些任务在宏任务和微任务之外，有自己的特殊队列，通常称为 **任务队列**（task queue） 

**事件（如点击和键盘事件）**通常被放入任务队列，并且它们被视为任务的一种。当
事件循环执行时，它会首先检查宏任务队列，执行完当前宏任务后，再执行所有的微任务。
在微任务执行完毕后，浏览器可能会进行渲染操作（如果需要），然后事件循环会继续到下一个宏任务。

因此，可以说点击和键盘事件是作为任务处理的，而不特定分类为宏任务或微任务。
这种机制确保了 JavaScript 可以在单线程环境中高效地处理异步事件和操作，同时保持代码执行的顺序性和可预测性。


### 微任务  
微任务是在当前宏任务执行完毕后立即执行的任务，事件循环会在每个宏任务之后执行所有队列中的微任务  
它们的执行时机是在下一个宏任务开始之前，当前宏任务的后续阶段，微任务的执行时间早于宏任务  
微任务通常用于处理异步操作的结果，确保尽可能快地响应  
#### 常见微任务
- `Promise.then/catch/finally`  
- Promise回调：当Promise状态改变时，会执行相应的回调函数  
- `async`/`await`：使用async函数和await关键字进行异步操作时，await后面的代码会作为微任务执行  
- `process.nextTick`：在 Node.js 的事件循环的当前阶段完成后、下一个事件循环阶段开始之前，安排一个回调函数尽快执行 *(仅在Node.js中)*  
- `MutaionObserver()`：浏览器中用于观察DOM树的变化，监听DOM变化，当DOM发生变化时触发微任务  


### 宏任务和微任务的区别
#### 任务特征
1. **宏任务** 有明确的异步任务需要执行和回调；需要其他异步线程支持  
2. **微任务** 没有明确的异步任务需要执行，只有回调，不需要其他异步线程支持  
#### 存放位置
1. **宏任务** 中的事件放在`callback queue`中，由事件触发线程维护  
2. **微任务** 的事件放在微任务队列中，由js引擎线程维护  
#### 执行顺序
1. 事件循环的过程中，执行栈在同步代码执行完成后，优先检查 **微任务** 队列是否有任务需要执行，如果没有，再去 **宏任务** 队列检查是否有任务执行，如此往复  
2. **微任务** 一般在当前循环就会优先执行，而 **宏任务** 会等到下一次循环  
3. 因此，**微任务** 一般比 **宏任务** 先执行
#### 队列数量
1. **微任务** 队列只有一个  
2. **宏任务** 队列可能有多个  



## 什么是 `Promise` 对象
在 JavaScript 中，`Promise` 对象是异步编程的一种重要机制，它代表了一个尚未完成但预期将来会完成的操作的最终结果。  
`Promise` 提供了一种处理异步操作的方法，使得异步代码易于编写和理解。  

### `Promise` 的基本概念
`Promise` 对象有三种状态：
1. **Pending（等待中）**：初始状态，既不是成功，也不是失败。
2. **Fulfilled（已完成）**：意味着操作成功完成。
3. **Rejected（已拒绝）**：意味着操作失败或出现错误。


### 如何创建 `Promise` 对象
`Promise` 对象是通过 `new Promise` 构造函数创建的，它接收一个执行器函数作为参数。  
这个执行器函数本身接受两个参数：`resolve` 和 `reject`，这两个参数也是函数。  
当异步操作成功时，调用 `resolve` 函数；当操作失败时，调用 `reject` 函数。  
```javascript
const myPromise = new Promise((resolve, reject) => {
    // 异步操作
    const condition = true;  // 假设这是某种条件判断
    if (condition) {
        resolve('Operation successful');
    } else {
        reject('Error occurred');
    }
});
```


### 如何使用 `Promise` 对象
一旦 `Promise` 被解析（resolved）或拒绝（rejected），它就不能更改状态。  
你可以使用 `.then()` 方法来处理已完成的 `Promise`，并使用 `.catch()` 方法来处理被拒绝的 `Promise`。  
还有 `.finally()` 方法，它在 `Promise` 完成后被调用，无论其结果如何。  
```javascript
myPromise
    .then(result => {
        console.log(result);  // 处理结果
    })
    .catch(error => {
        console.error(error);  // 处理错误
    })
    .finally(() => {
        console.log('Operation completed');  // 最终都会执行
    });
```


### `Promise` 的优势
1. **链式调用**：`Promise` 允许你通过 `.then()` 方法链式调用多个异步操作，每个操作依次执行。
2. **错误处理**：通过 `.catch()` 方法，可以集中处理多个异步操作中的错误。
3. **并行处理**：`Promise.all()` 方法允许并行执行多个异步操作，并等待所有操作完成。


### `Promise` 在工作中的应用场景
`Promise` 在处理如网络请求、文件操作等异步操作时非常有用，它使得代码更加清晰，减少了回调地狱（callback hell）的问题。  
通过 `Promise`，开发者可以写出更加优雅和可维护的异步代码。  


### 如何快速入门上手JavaScript中的 `Promise`？
[拓展资料 ———— 快速入门上手JavaScript中的Promise](https://fx67ll.xyz/archives/promise-quickstart)  



## 解答文章开头的问题：如何手写一个简易的 `Promise` 对象?  
```js
function SimplePromise(executor) {
  let onResolve, onReject;
  let fulfilled = false;
  let rejected = false;
  let called = false; // 防止resolve和reject被多次调用
  let value;
  let reason;

  // resolve函数
  function resolve(val) {
    if (!called) {
      value = val;
      fulfilled = true;
      called = true;
      if (onResolve) {
        onResolve(val);
      }
    }
  }

  // reject函数
  function reject(err) {
    if (!called) {
      reason = err;
      rejected = true;
      called = true;
      if (onReject) {
        onReject(err);
      }
    }
  }

  // then方法
  this.then = function(callback) {
    onResolve = callback;
    if (fulfilled) {
      onResolve(value);
    }
    return this; // 支持链式调用
  };

  // catch方法
  this.catch = function(callback) {
    onReject = callback;
    if (rejected) {
      onReject(reason);
    }
    return this; // 支持链式调用
  };

  // 立即执行传入的executor函数
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 使用示例
let promise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
    // reject("Error!"); // 也可以测试reject情况
  }, 1000);
});

promise.then(result => {
  console.log(result); // 输出 "Success!"
}).catch(error => {
  console.log(error);
});
```


## 什么是定时器函数  
JavaScript 中的定时器函数允许你在一定时间后或者以指定的时间间隔重复执行代码。  
这些功能主要通过两个全局函数实现：`setTimeout()` 和 `setInterval()`。  
这些函数是异步的，意味着它们不会阻塞代码的执行，而是在指定的延时后将任务加入到 JavaScript 的事件队列中，等待当前执行栈清空后再执行。  


### setTimeout()
`setTimeout()` 函数用于在指定的毫秒数后执行一个函数或指定的代码。  
它不会阻止后续代码的执行，而是在背后计时，一旦时间到达，就将回调函数加入到事件队列中，等待执行。  
#### 语法
```javascript
let timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
```
- `function`：要执行的函数。
- `delay`：延迟的时间，以毫秒为单位。如果省略，或者为 0，浏览器通常会有最小延迟时间（在HTML5标准中定义为4ms）。
- `arg1, arg2, ...`：传递给函数的额外参数。
#### 使用示例
```javascript
console.log("Hello");
setTimeout(() => {
  console.log("World!");
}, 1000);
```
*这个例子会先打印 "Hello"，然后大约1秒后打印 "World!"*


### setInterval()
`setInterval()` 函数用于重复调用一个函数或执行代码片段，每隔指定的周期时间（以毫秒为单位）。  
它也是非阻塞的，每次间隔时间到达后，就会尝试执行指定的代码。  
#### 语法
```javascript
let intervalID = setInterval(function[, delay, arg1, arg2, ...]);
```
- `function`：要定期执行的函数。
- `delay`：执行间隔的时间，以毫秒为单位。
- `arg1, arg2, ...`：传递给函数的额外参数。
#### 使用示例
```javascript
let counter = 0;
const intervalID = setInterval(() => {
  console.log("Hello World!");
  counter++;
  if (counter === 5) {
    clearInterval(intervalID);
  }
}, 1000);
```
*这个例子会每秒打印 "Hello World!"，并在打印5次后停止* 

### clearTimeout() 和 clearInterval()
这两个函数用于取消由 `setTimeout()` 和 `setInterval()` 设置的定时器。  
#### 语法
- `clearTimeout(timeoutID)`：取消由 `setTimeout()` 设置的定时器。
- `clearInterval(intervalID)`：取消由 `setInterval()` 设置的定时器。

### 定时器函数的使用注意
虽然 `setTimeout()` 和 `setInterval()` 提供了方便的定时执行功能，但它们并不保证精确的时间控制。  
JavaScript 是单线程的，如果事件队列中有其他任务在执行，定时器的回调可能会延迟执行。  
此外，浏览器或者环境可能对这些函数的行为有特定的限制，如在后台标签页或未激活的窗口中降低定时器的精度或延迟执行，以优化性能和电池寿命。  


## 拓展提问：为什么要销毁定时器？Vue中如何销毁定时器？React中如何销毁定时器？
在JavaScript中，销毁定时器是一个重要的操作，主要是为了避免不必要的资源占用和潜在的内存泄漏。定时器如果不被适当销毁，可能会导致一些问题，如：
1. **继续执行不必要的操作**：如果定时器触发的函数不再需要执行，定时器仍然活跃会导致额外的计算，这可能影响程序性能。
2. **内存泄漏**：在某些情况下，定时器的回调函数可能引用了外部变量或者大型数据结构，如果定时器没有被销毁，这些引用关系可能导致所涉及的内存无法被垃圾回收，从而造成内存泄漏。

### Vue中销毁定时器
在Vue中，通常我们会在组件的生命周期钩子中设置和销毁定时器。最常见的做法是在`mounted`钩子中创建定时器，并在`beforeDestroy`（Vue 2.x）或`beforeUnmount`（Vue 3.x）钩子中销毁定时器。例如：
```javascript
export default {
  mounted() {
    this.timer = setInterval(() => {
      console.log('Interval triggered');
    }, 1000);
  },
  beforeDestroy() { // Vue 2.x
    clearInterval(this.timer);
  },
  beforeUnmount() { // Vue 3.x
    clearInterval(this.timer);
  }
}
```

### React中销毁定时器
在React中，定时器通常在组件的生命周期方法或者钩子中设置和清除。使用类组件时，你可以在`componentDidMount`中设置定时器，并在`componentWillUnmount`中清除。如果使用函数组件和Hooks，可以在`useEffect`钩子中处理定时器：
```js
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Interval triggered');
    }, 1000);

    // 清理函数
    return () => clearInterval(timer);
  }, []); // 空依赖数组表示这个effect只在组件挂载时运行一次

  return <div>Check the console.</div>;
}
```
在这个例子中，`useEffect`钩子的返回函数负责清除定时器，这个函数会在组件卸载时被调用，从而确保定时器被适当销毁。
通过这些方法，可以确保在组件或应用的生命周期结束时，相关的定时器也被正确清除，避免潜在的问题。



## 补充知识点：什么是 `requestAnimationFrame`?  
`requestAnimationFrame` 是一个由浏览器提供的 API，用于在下一次浏览器重绘之前调用特定的函数，以执行动画或其他视觉更新。
这个函数是专门为动画和连续的视觉更新设计的，它可以帮助你创建平滑的动画效果，因为它能保证在浏览器进行下一次重绘之前更新动画帧。

### `requestAnimationFrame` 的特点
1. **高效性能**：`requestAnimationFrame` 会将动画函数的执行时机安排在浏览器的下一次重绘之前，这样可以保证动画的更新和浏览器的绘制操作同步进行，从而减少画面撕裂和不必要的计算和渲染，提高性能。
2. **节能**：相比于 `setTimeout` 或 `setInterval`，`requestAnimationFrame` 是更智能的，因为它会在浏览器标签页不可见时自动暂停，从而减少CPU、GPU和电力的消耗。
3. **简单的使用方式**：`requestAnimationFrame` 只需要一个回调函数作为参数，浏览器会自动计算出最适合的调用时间。

### `requestAnimationFrame` 的使用示例
假设你想要创建一个简单的动画，使一个元素在水平方向上移动：
```javascript
let xPos = 0;

function animate() {
    xPos += 5; // 每帧向右移动5像素
    element.style.transform = `translateX(${xPos}px)`; // 更新元素位置
    if (xPos < 500) { // 如果元素还没移动到500像素的位置，继续动画
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate); // 开始动画
```
在这个示例中，`animate` 函数会被连续调用，每次调用都会将元素向右移动5像素，直到它达到500像素的位置。

### `requestAnimationFrame` 在工作中应用的注意事项
- `requestAnimationFrame` 需要在每一帧都重新调用来继续动画。
- 如果动画或者视觉更新不再需要，应当使用 `cancelAnimationFrame` 来取消回调函数的执行，避免不必要的性能消耗。
- 由于 `requestAnimationFrame` 的调用时间是由浏览器决定的，通常它的频率会与浏览器的刷新率相匹配，例如大多数设备上是每秒60次（即60Hz），但这可能会因设备而异。



## 补充知识点：什么是 `setImmediate`?
`setImmediate` 是一个在 Node.js 环境中使用的函数，用于安排一个回调函数在当前事件循环结束后、下一次事件循环开始前被立即执行。
这个函数是特定于 Node.js 的，不是 Web 标准的一部分，因此在浏览器环境中不可用。

### `setImmediate` 的功能和用途
`setImmediate` 的主要用途是将一些需要尽快执行但不必阻塞当前正在执行的操作的代码延迟执行。它与 `setTimeout` 和 `process.nextTick` 类似，但行为略有不同：
- `setImmediate` 安排的任务会在当前事件循环的“check”阶段执行。
- `setTimeout(fn, 0)` 会在定时器阶段执行，通常会有一小段延迟（最小延迟时间，通常是1毫秒，取决于环境）。
- `process.nextTick` 会在当前事件循环的任何阶段结束后立即执行，甚至在进入下一个事件循环阶段之前。

### `setImmediate` 的使用示例
#### 下面是一个简单的 Node.js 示例，演示了 `setImmediate` 的用法：
```javascript
console.log('开始执行');
setImmediate(() => {
    console.log('执行 setImmediate 回调');
});
console.log('结束执行');
```
**在这个例子中，输出将会是：**
```
开始执行
结束执行
执行 setImmediate 回调
```
*这表明 `setImmediate` 安排的回调确实是在当前事件循环的末尾执行的。*

### `setImmediate` 在工作中应用的注意事项
- **非标准 API**：`setImmediate` 是一个非标准的 API，只在 Node.js 环境中可用。在浏览器中，你可能需要使用 `setTimeout(fn, 0)` 来达到类似的效果，虽然这两者在行为上有细微的差别。
- **使用场景**：通常用于处理长时间运行的操作后需要快速响应的场景，或者在处理完一些同步任务后需要尽快执行的异步代码。



## 补充知识点：什么是 `process.nextTick`?  
`process.nextTick` 是 Node.js 环境中的一个函数，它用于在 Node.js 的事件循环的当前阶段完成后、下一个事件循环阶段开始之前，安排一个回调函数尽快执行。
这意味着无论在事件循环的哪个阶段调用 `process.nextTick`，提供的回调函数都会在当前操作完成后立即执行，但在任何I/O事件（包括定时器）或者执行其他计划任务之前执行。

### `process.nextTick` 的功能和用途
`process.nextTick` 主要用于确保在当前执行栈运行完毕后、在进行任何异步操作之前立即处理给定的回调。
这对于处理错误、清理资源或者在继续其他事件之前进行其他紧急计算是非常有用的。

### 与 `setImmediate` 的区别
尽管 `process.nextTick` 和 `setImmediate` 都用于安排异步操作，但它们的执行时间点不同：
- `process.nextTick` 回调在同一事件循环阶段尽可能早地执行，即在任何I/O事件和定时器之前。
- `setImmediate` 设计为在当前事件循环的所有I/O事件处理完毕后执行，即在下一个事件循环迭代的开始。

### `process.nextTick` 的使用示例
下面是一个 Node.js 示例，展示了 `process.nextTick` 的使用：
```javascript
console.log('开始执行');
process.nextTick(() => {
    console.log('执行 process.nextTick 回调');
});
console.log('结束执行');
```
**在这个例子中，输出将会是：**
```
开始执行
结束执行
执行 process.nextTick 回调
```
*这表明 `process.nextTick` 安排的回调确实是在当前事件循环的末尾、在其他异步事件之前执行的。*

### `process.nextTick` 在工作中应用的注意事项
- **递归调用**：如果 `process.nextTick` 被递归调用，或在一个循环中大量调用，它可以导致I/O饿死，因为它会在处理任何I/O事件之前不断地将新的回调加入到队列中。
- **用途选择**：`process.nextTick` 非常适合在当前操作完成后立即需要运行的情况，例如在事件或低级逻辑之后立即处理错误或进行清理。

### 框架拓展：Vue 中有用到 `process.nextTick` 吗？  
Vue.js 中也使用了 `process.nextTick`，或者更具体地说，它使用了与之类似的异步延迟功能。
`process.nextTick` 是 Node.js 的一个特性，但在浏览器环境中，Vue 使用的是 `nextTick` 方法。
这是 Vue 的全局 API，用于在下一个 DOM 更新循环结束后执行延迟回调。
在内部，Vue 会尝试使用原生的 `Promise.then`、`MutationObserver`，或者 `setImmediate`，最后退回到 `setTimeout(fn, 0)`。
#### Vue中 `nextTick` 的应用
1. **确保 DOM 更新完成**：Vue 的数据绑定和 DOM 更新是异步的。当你更改数据后，DOM 不会立刻更新。`nextTick` 允许你在 DOM 更新完成后立即运行回调函数，这对于 DOM 依赖的操作非常有用。
2. **解决状态更新问题**：有时候，你可能在同一方法中多次更改数据，使用 `nextTick` 可以确保所有的 DOM 更新都完成后再执行某些操作。
#### Vue中 `nextTick` 的使用示例
```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  },
  methods: {
    updateMessage() {
      this.message = 'Updated message';
      this.$nextTick(() => {
        // 这个回调将在 DOM 更新后执行
		// `$nextTick()` 用来确保 `console.log('DOM updated')` 的执行发生在 DOM 真正更新之后
        console.log('DOM updated');
      });
    }
  }
});
```



## 补充知识点：什么是 `MutationObserver`?  
`MutationObserver` 是一个强大的 Web API，用于监视 DOM（文档对象模型）的变化。
当 DOM 元素被添加、删除或修改时，`MutationObserver` 可以被用来异步地通知这些变化，使开发者能够响应这些变化并执行相应的操作。

### `MutationObserver` 的功能
`MutationObserver` 主要用于监视以下类型的 DOM 变化：
- 子节点的添加或删除。
- 属性的添加、删除或修改。
- 文本内容的变更。
- 更多其他类型的 DOM 变化。

### `MutationObserver` 的用途
这使得 `MutationObserver` 在开发复杂的 Web 应用时非常有用，特别是在需要响应 DOM 变化来执行某些操作的情况下，如动态内容的加载、用户界面的自动更新等。

### 如何使用 `MutationObserver`
要使用 `MutationObserver`，你需要创建一个观察者实例，定义一个回调函数来处理变化，然后指定要监视的 DOM 节点和具体的观察选项。

### `MutationObserver` 的简易示例
```javascript
// 监视目标节点
const targetNode = document.getElementById('some-id');
// 配置观察选项:
const config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
    }
};
// 创建一个观察者对象并传入回调函数
const observer = new MutationObserver(callback);
// 开始观察已配置的变动
observer.observe(targetNode, config);
// 之后，你可以停止观察
// observer.disconnect();
```

### `MutationObserver` 在工作中应用的注意事项
- **性能考虑**：虽然 `MutationObserver` 是异步的，但过度使用或监视大量的 DOM 变化仍可能影响性能。合理配置观察选项，只监视必要的变化，可以帮助避免性能问题。
- **内存管理**：使用 `MutationObserver` 时应确保在不需要时断开观察（使用 `disconnect` 方法），以避免内存泄漏。



## 面试问题合集  
恭喜你耐心看完本文了，对照下方的问题列表，自我提问一下吧~
> 什么是 事件循环？  
> 事件循环 的执行顺序是什么？  
> 什么是 宏任务和微任务？ 
> 宏任务和微任务 有什么区别？  
> 点击和键盘事件 是宏任务吗？
> 什么是 `Promise` 对象？  
> 如何手写一个简易的 `Promise` 对象?  
> 为什么 `Promise` 比 `setTimeout` 快？  
> `Promise.all` 和 `Promise.race` 有什么区别？  
> 什么是 `requestAnimationFrame`?  
> 什么是 `setImmediate`?  
> 什么是 `process.nextTick`?  
> Vue 中有用到 `process.nextTick` 吗？  
> 什么是 `MutationObserver`?  
> Vue中如何销毁定时器？React中如何销毁定时器？为什么要销毁定时器？  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llJs/blob/master/js-blog/2024/2024-05/js-event-loop-job.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***