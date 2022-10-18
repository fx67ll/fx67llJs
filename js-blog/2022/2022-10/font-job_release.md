# 2022前端面试总结

### 先说些废话
这是一篇笔者面试记录的文章，并非要写一篇非常全面的面试题汇总文章，希望看完本文对您能有一定的帮助。  

首先，面试对个人来说，就是一种对以往工作之中经验积累的一种检验，如果平时在工作中对自己遇到的问题、难点、新知识点，没有花时间去学习积累，
那么我相信，面试的时候花时间背面试题，也不一定能胜任预期的工作，不过摸鱼混工时的工作除外~  

其次，面试中除了技术面试，还有针对项目中运用的技术亮点和个人能够提供的技术解决方案等等能力的展现，这方面的能力没实际解决过就一定无法提出自己的解决方案。
所以居安思危，平时就严格要求自己，对于疑难问题、性能问题，不逃避问题，迎难而上去解决，才能使得自己真正在技术岗位上站稳脚跟。


## 工作中必备的核心框架工具
Vue和React是前端开发岗必备的两种技术栈，以下是工作中项目开发必须要具备的框架技能，参考大纲查漏补缺
### Vue（Vue2/3）  
1. Vue主流组件库（[ant-design](https://antdv.com/components/overview)、[element-ui](https://element.eleme.cn/#/zh-CN/component/installation)、[arco-design](https://arco.design/vue/docs/start)）  
2. Vue组件封装（公共组件抽离，npm组件发布以及[私有部署](https://blog.csdn.net/lwplvx/article/details/115367282)，编写组件必须考虑的几个要素props、methods、样式）  
3. Vue父子、兄弟组件通信（Vuex，[EventBus](https://blog.csdn.net/qq_26834399/article/details/106387585)）  
4. [生命周期函数](https://blog.csdn.net/weixin_45791692/article/details/124045505)、[Watch函数](https://blog.csdn.net/weixin_45773421/article/details/106282254)、以及[计算属性Computed](https://blog.csdn.net/alical/article/details/122892108)的应用  
5. Vue动态路由，权限相关（菜单页面、按钮操作），单点登录，使用图片验证防止CSFR攻击  
6. Vue3更新的内容，老旧Vue2项目维护和新项目Vue3技术选型的注意点，Vue配合TypeScript    
### React（React16及以上）  
1. 企业级开发框架[UMI](https://umijs.org/docs/tutorials/getting-started)（简化项目构建和初始开发流程）
2. React主流组件库（[ant-design](https://ant.design/components/overview-cn/)、[arco-design](https://arco.design/react/docs/start)）  
3. React组件封装（类比Vue）  
4. React组件通信（[Redux](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts/)、Redux-thunk、Redux-saga、Redux-logger、[dva](https://dvajs.com/)）  
5. [生命周期函数](https://zhuanlan.zhihu.com/p/392532496)、[React Hooks钩子函数](https://blog.csdn.net/shadowfall/article/details/115387015)的应用  
6. [无状态组件](https://blog.csdn.net/XiaoSen207/article/details/125292167)、[项目分层](https://www.freesion.com/article/77531504180/)（view + model + service）  
7. React路由和权限（类比Vue）
### 公共部分
1. webpack[打包配置](https://zhuanlan.zhihu.com/p/463523330)、[性能优化](https://zhuanlan.zhihu.com/p/490076369)、[webpack.dev.conf.js添加cdn配置](http://www.cncsto.com/article/52406)  
2. 如何首屏加载优化、图标和图片资源优化  


## 目前面试中已经遇到的问题
### JavaScript和CSS
1. ES6的数据类型有哪些？（基本数据类型和引用数据类型，ES6新增`Symbol`，用于对象属性中唯一的key；新增`BigInt`用于解决数据量过大Int报错的问题）  
2. ES6新增的方法有哪些？（`new Set()`处理数组去重，`new Map()`链式处理数组，可以搭配Filter使用，再说一些和`ForEach`的区别，ForEach是在原数组中操作。
	可以再说说`is()`，判断值是否相等；`assign()`，浅拷贝对象；entries()与后者反之和fromEntries()键值对数组转为对象）
	- [Javascript中的assign()方法到底是浅拷贝还是深拷贝？](https://blog.csdn.net/qq_27518937/article/details/118523830)  
	- [Es6新增的对象方法](https://blog.csdn.net/weixin_65308648/article/details/126323181)  
3. 如何判断一个数据是否是对象？（1.isArray 2.Object.prototype.toString().call()，返回'[object Array]'即为 3.实例的构造函数属性constructor指向构造函数，数组.contructor===Array即可 4.使用instanceof亦可，a instanceof Array）
	- [JS判断是否是数组的四种做法](https://www.cnblogs.com/echolun/p/10287616.html)  
4. 什么是BFC盒子模型，他的作用是什么（具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素；
	触发条件：1.overflow 除了 visible 以外的值 (hidden、auto、scroll)。2.绝对定位元素：position (absolute、fixed)。3.display 为 inline-block、table-cells、flex。）  
	- [盒子模型与BFC](https://blog.csdn.net/weixin_39703655/article/details/110403734)  
5. null和undefined的区别（null和undefined非严格相等，自身也全等，但是相互不严格相等；null是人为赋予初始空值，undefined是全局对象的属性；typeof(null)不是null，而是object，
	是因为typeof判断二进制码，object前三位是0，null刚好也是，typeof(undefined)正常；）
6. var和let的区别（var是函数作用域，let是块状作用域，let声明的变量不能重复；const声明的变量不可修改；var声明的变量属于window，可以window.访问，let和const的不行）  
	- [var和let的区别](https://blog.csdn.net/m0_63574519/article/details/125257156)  
	- [const 声明了数组，还能 push 元素吗，为什么？](https://blog.csdn.net/qq_44810886/article/details/125141857?spm=1001.2014.3001.5502)  
7. `push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`操作的区别。shift删除第一个元素并返回，unshift反之。
	splice用于添加或删除数组中的元素，array.splice(index,howmany,item1,.....,itemX)；index必需，规定从何处添加/删除元素；
	howmany可选，规定应该删除多少元素，必须是数字，但可以是 "0"，如果未规定此参数，则删除从`index`开始到原数组结尾的所有元素；
	item1, ..., itemX可选，要添加到数组的新元素  
	- [JavaScript splice() 方法 ](https://www.runoob.com/jsref/jsref-splice.html)
8. axios有什么竞品是否有了解过（ajax和fetch，fetch是js原生api，需要自己做一些封装；ajxa针对mvc不是现在mvvm，并且基于原生xhr，还需要引入jquery；axios支持promise，支持防止csrf）  
	- [ajax、axios、fetch之间的详细区别以及优缺点](https://blog.csdn.net/twodogya/article/details/80223508)  
	- [Ajax、Fetch、Axios](https://www.jianshu.com/p/5f17eea7f8f4)  
9. js的深拷贝和浅拷贝（1. 常用深拷贝使用JSON.parse+JSON.stringify、2. object.assign一级属性深拷贝二级属性浅拷贝、3. 用foreach方法递归迭代实现深拷贝、4. 使用第三方函数库，比如loadsh的clonedeep或者underscore的deepclone，clone是浅拷贝）
	- [js的深拷贝与浅拷贝](https://blog.csdn.net/weixin_36430673/article/details/123323392)  
10. H5移动端如何做性能优化（1. 资源压缩，图片压缩，引入资源包压缩，有条件的使用cdn加速，icon雪碧图精灵图。2. 优化dom结构，减少页面的重绘和重排布，首屏支出的页面使用内联css，使用节流防抖的手段减少修改dom事件触发的频率。
	3. 使用预先加载骨架图的方式优化用户体验，我们之前有用过page-web-skeleton这个chorme组件快速生成骨架图。4. 尽量使用css内置动画，减少使用`requestAnimationFrame`，他会触发大量的dom操作，
	而内置动画会调用硬件加速，体验更优。5. 配合后端同学做接口合并，对于首页显示的接口统一为一个总接口，并针对性优化。6. 最后就是优化主要针对不同项目，通过不同的方式去做优化，针对性的修改）
	- [H5前端性能优化图鉴](https://zhuanlan.zhihu.com/p/516199187)  
11. css样式的优先规则（简而言之，内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器，`!important`最高）  
	- [CSS的优先级](https://blog.csdn.net/XiaoSen207/article/details/123265270)  
	- [CSS 样式优先级](https://blog.csdn.net/qq_43000315/article/details/126168264)  
	
### Vue
1. Vue的实现原理，`Object.defineProperty()`；Vue2 和 Vue3 的实现响应式的区别； Vue如何实现数组的响应式（底层代码主要是编写了一套js相同的方法暴露出来，Vue通过原型拦截的方式重写了数组的7个方法）  
2. Vue如何封装一个组件（定义参数，定义需要暴露出的方法，参数需要写的属性，最后export出来）  
3. Vue父子组件和兄弟组件的通信方式（1. 第一种方式借助父组件。2. 第二种方式借助eventbus，在main中全局注册事件bus，通过$on和$emit来监听和触发。3. 使用Vuex）
	- [vue学习之----兄弟组件之间通信方式](http://t.zoukankan.com/zhaoyingzhen-p-15244958.html)  
4. Vue如何实现v-model（使用object.defineProperty设置getset方法，再给绑定的input输入框的keyup事件添加劫持，从而实现mvvm，即数据驱动页面；接着继续吹mvvm和之前jquery时代的区别；
	jquery主要是链式函数操作，对dom的操作很多，性能上会有一定落后；mvvm是指model，view，viewmodel，最后一个是同步view和model的对象，model是业务逻辑，view是页面ui）
	- [Vue的v-model的原理和实现](https://blog.csdn.net/weixin_52280029/article/details/124900333)  
	- [什么是MVVM？](https://www.cnblogs.com/zixian/p/mvvm.html)  
5. 当Vue使用history模式的时候，出现404，nginx该如何处理（`try_files $uri $uri/ /index.html`，表示查找当前请求地址对应的文件是否存在，不存在则查找请求地址对应的目录是否存在，还是不存在则重定向到/index.html页面）
	- [Nginx：vue路由使用history模式刷新404](https://blog.csdn.net/m0_38037668/article/details/122962248)  

### React（个人简历未突出react能力，所以这方面问的比较少）
1. redux如何使用？
2. redux中传递组件样式css无法生效怎么办？


## 杂乱记录一些
* 前端性能优化：[H5页面如何解决首屏加载白屏问题](https://www.cnblogs.com/sunidol/p/11546884.html)、[如何防止内存泄漏](https://blog.csdn.net/JavaMonsterr/article/details/125017666)  
* 前端安全基础：[XSS攻击](https://blog.csdn.net/m0_55854679/article/details/123028852)、[XSRF攻击](https://www.jianshu.com/p/1fee1a187b11)  
* js继承的几种方式：[总结JS继承的六种方式](https://blog.csdn.net/AI_huihui/article/details/120773032)、[js几种继承](https://blog.csdn.net/qq_44746317/article/details/124171314)  
* js如何创建对象：[JS创建对象的四种方式](https://www.jb51.net/article/230503.htm)  
* 如何实现一个promise：[javaScript之js模拟封装一个promise](https://blog.csdn.net/weixin_44178305/article/details/110723671)、[模拟实现 Promise（小白版）](https://www.cnblogs.com/dasusu/p/12047873.html)  
* [高德地图](https://blog.csdn.net/weixin_43312391/article/details/123213412)、[Cesium](https://blog.csdn.net/qq_63140863/article/details/120858694)、[ArcGIS](https://blog.csdn.net/gongxifacai_believe/article/details/113071383)有哪些图层？  
* 原型和原型链有什么作用，简单描述一下？  


## 笔试面试题记录
1. 一些奇奇怪怪工作中很少用到的冷门CSS知识点考察题目（比如：长50px，宽50px，border-radius: 30px 50px; 是什么效果？）  
2. 数组去重、数组排序以及组合能力的算法题（牛客网和Leecode刷题处理）  
3. 手写sql（加分项）  


## 八股文汇总整理
八股文总会被问到，还是需要看看，大部分八股文遇到的问题也都可以在工作中遇到，你遇到过自然印象就深刻
1. [前端200道面试题及答案（更新中）](https://blog.csdn.net/m0_65450343/article/details/125238400)  
2. [50个最新TypeScript面试题合集 – TypeScript开发教程](https://blog.csdn.net/weixin_44727080/article/details/123108565)  
3. [React面试题最全](https://blog.csdn.net/qq_60976312/article/details/125783396)
4. [react 面试题整理](https://zhuanlan.zhihu.com/p/472168884)  
5. [耗时一个月，React 知识点万字大总结（超全超基础）](https://blog.csdn.net/weixin_46232841/article/details/124505088)  
6. [webpack 面试题整理](https://blog.csdn.net/qq_41370833/article/details/124783929)  
7. [vue面试常问的原理](https://blog.csdn.net/weixin_43778426/article/details/125651514)  
8. [12道vue高频原理面试题,你能答出几道?](https://blog.csdn.net/allen_he_123/article/details/119478300)  
9. [vue面试题整理(2022-持续更新中...)](https://blog.csdn.net/qq_45659769/article/details/119564784)  
10. [vue3面试题：2022 最新前端 Vue 3.0 面试题及答案](https://blog.csdn.net/qq_22182989/article/details/125781704)  
11. [vue3.0 面试题总结](https://blog.csdn.net/weixin_40599109/article/details/110938941)  
12. [高频 JS面试题 数据类型和变量、闭包、作用域、原型链、继承](https://blog.csdn.net/qq_44810886/article/details/125141857)  
13. [CSS高频面试题](https://blog.csdn.net/qq_44810886/article/details/124355440)  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llJs/blob/master/js-blog/2022/2022-10/font-job_release.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***