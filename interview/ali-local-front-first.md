---
title: 阿里巴巴本地生活前端一面
date: 2021-07-26
categories:
  - 面试
tags:
  - front-end
---

阿里巴巴南京本地生活部门前端一面，面试时长约半小时。

已挂，挂的原因是反问环节暴露出我的意向城市与他们的工作地点不匹配。

先把题目列出来，后面慢慢补答案。

<!-- more -->

## 项目介绍

- 非科班出生，学的东西和软件相关吗？学习前端多久了？
- 项目中权限管理是怎么做的？

  答案总结在[字节南京 Data 前端提前批一面](./bytedance-data-front-first-failed.md)

- 说说你为办公室搭建的整个系统吧
- CI/CD 这一整套实现了吗？
- 在构建一整套系统时遇到了什么样的问题？怎么解决的？
- 数据可视化用的 echarts，数据更新怎么做的？

  - 本身 echarts 就是**数据驱动**的，我们可以通过 `setOption` 方法更新数据
  - 在实际的项目中，我是采用 Angular 来实现数据的响应式更新的
  - 考虑到折线图存在大量的可复用数据，我采取的是通过数组的 `shift` 方法移除首部数据，`push` 方法添加尾部数据

- 如果页面上需要大量的可视化图表呢，性能优化怎么做？

  - 考虑到每一个图表的数据量不大，表现形式简单，可以采用 svg 的渲染模式来提升效率
  - 如果同时渲染可能导致短期内 CPU 负载过高，所以不妨为每一张图表的渲染设置一个短暂的延时

## html/css

- 盒模型是什么？

  答案总结在[字节南京 Data 前端提前批一面](./bytedance-data-front-first-failed.md)

- css 的定位方式有哪些？

  - static(默认)：元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效
  - relative：元素相对于 static 定位时的位置进行偏移，元素本身还在原始位置，但是在偏移后的位置渲染
  - absolute：元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的**非 static 定位祖先元素**（之前以为必须是 relative 定位的祖先元素）的偏移，来确定元素位置
  - fixed：元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置
  - sticky：元素根据正常文档流进行定位，然后相对它的最近滚动祖先和最近块级祖先进行偏移

- 如果要实现两栏加顶部标题栏的布局可以怎么做？_（学会圣杯布局就行）_

  - flex 方法
  - 浮动方法

## javascript

- function 中 this 的指向是什么？

  - 主要取决于函数的声明方式和调用方式
  - 对于通过函数声明和函数表达式两种方式声明的函数，this 的指向是动态的，根据调用方式来确定。如果是直接调用，那么 this 指向的是全局对象，在浏览器环境下是 window；如果是以对象 . 方法的形式调用，那么 this 指向的是 . 前面的那个对象
  - 对于箭头函数，它没有自己的 this，它的 this 始终只想创建这个函数的执行上下文中的 this

- funtion 中能不能改变 this 的指向，怎么改变？

  - 可以改变
  - 很多函数本身就提供了一个 thisArg 这样的参数用来指定 this 的指向
  - 此外，函数提供了 bind，apply 和 call 三种方式来改变 this 的指向

- bind，apply 和 call 的区别是什么呢？

  - bind 传入的第一个参数就是 this 的指向，后续的参数会作为原函数参数列表的一部分，最终返回一个绑定了新的 this 和初始参数的函数
  - apply 传入两个参数，第一个参数是 this 的指向，第二个参数是一个类数组，类数组的内容就是要传递给原函数的参数列表，返回的是函数值
  - call 和 apply 功能差不多，区别在于 call 要求把要传递给原函数的参数原封不动地放到 call 函数的第一个参数之后

- bind 在 ES5 中不支持，你要怎么实现，说出思路就行

  - 在 Function 的 prototype 上手动实现 bind 的功能
  - 获取 arguments 变量的第一个参数作为新的 this 的指向，其余参数保存到新的变量 args 备用
  - 通过 apply 绑定新的 this，并且合并两组参数列表
  - 注意：**下面的方法不支持 new function**

  ```js
  // Does not work with `new (funcA.bind(thisArg, args))`
  if (!Function.prototype.bind)
    (function () {
      var slice = Array.prototype.slice;
      Function.prototype.bind = function () {
        var thatFunc = this,
          thatArg = arguments[0];
        var args = slice.call(arguments, 1);
        if (typeof thatFunc !== 'function') {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError(
            'Function.prototype.bind - ' +
              'what is trying to be bound is not callable'
          );
        }
        return function () {
          var funcArgs = args.concat(slice.call(arguments));
          return thatFunc.apply(thatArg, funcArgs);
        };
      };
    })();
  ```

## Vue

- vue3 和 vue2 的区别在哪里？

  - 响应式原理的重写。vue2 响应式是基于 `Object.defineProperty` 实现的，存在较大的问题 **（1. 对数组等集合类型的支持不佳 2. 对嵌套属性的深层响应支持不佳 3. 对新增属性的支持不佳）**；vue3 响应式是基于新的 API `proxy` 实现的，功能更加强大
  - 组合式 API 的引入，使 vue 可以写出更加解耦的代码
  - vue3 各模块之间更加解耦，响应式相关封装成了 reactivity 包，组合式 API 相关封装成了 composition-api 包，因此可以按需引入了
  - 对 typescript 的支持更好

- vue3 响应式原理的实现是 proxy，那么 proxy 在一些浏览器中不支持怎么办呢？

  - 本身 vue3 就已经在兼容性方面进行了取舍，放弃了对 IE11 的支持
  - 现代化的打包工具都已经集成了 babel，可以实现 proxy 的转译

- babel 的作用和原理是什么？

  答案总结在[阿里云智能前端一面](./ali-cloud-front-first.md)

## 浏览器

- 浏览器从输入 url 到页面显示经历了哪些？

  答案总结在[计算机网络基础](./network-base.md)

- 跨域相关（答案总结在[面试中跨域相关问题汇总](./cross-origin.md)）

  - 跨域请求的解决方案
  - cors 方案中预检过程是什么样的？
  - jsonp 方案的大致流程是什么样的？
  - nginx 和 webpack 代理方式的区别是什么？

## 面试总体感受

整体上面试体验良好，没有算法和明显不会的题目，总结如下：

1. 面试官没有难为，知道非科班后问的问题相对比较基础，但是不知道会不会直接拉低评估
2. 在自身项目上的准备不足，对一些自身没有把握的问题可以避开
3. 面试官表示整体上基础知识还可以，但是希望在系统性上在进步一点，对一些问题再深入一点
