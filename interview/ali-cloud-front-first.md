---
title: 阿里云智能前端一面
date: 2021-08-03
categories:
  - 面试
tags:
  - front-end
---

阿里云智能事业部基础平台云网络前端一面，面试时长约 45 分钟。

先把题目列出来，后面慢慢补答案。

<!-- more -->

## 项目介绍

- 介绍一下核电站主泵项目的整体情况，以及你在其中担任的角色？
- 项目中遇到了什么问题吗，怎么解决的？
- 数据可视化用的 echarts，用的是 svg 模式还是 canvas 模式？

  - 项目中使用的是默认模式，也就是 canvas 模式
  - canvas 在渲染大数据量（>1000）时具有优势，能够实现更好的显示效果
  - svg 内存占用小，渲染性能略高，放大缩小时不模糊，需要考虑性能时使用，在移动端尤其推荐

- svg 和 canvas 的区别是什么？

  - svg 是基于矢量的，可以任意改变图像大小而不失真；canvas 是基于位图的，不能改变大小，只能缩放
  - svg 内部采用类似 xml 的语言描述，具有自己的节点，事件，动画机制，也可以通过 js 实现动态改变；canvas 是 H5 包含的一个标签，需要通过内部提供的 api 进行图像绘制
  - svg 的重绘由浏览器自行处理；canvas 的重绘需要手动调用相应 api
  - svg 有成熟的国际标准，修改和导入导出方便，支持广泛；canvas 往往需要上层封装才能实现较好的易用性

- 学习前端多久了，大概经历是什么样的？

## html/css

- XML，HTML，XHTML 三者的区别是什么？

  - XML 是可扩展标记语言，用户可以自己定义标签，节点，属性等等；作用是方便地存储传输数据，往往用作跨语言的对象描述，不过这个功能渐渐地被 json 替代
  - HTML 在 XML 基础上预定义了标签，主要用于描述和定义网页内容，给浏览器渲染提供一个统一的标准
  - XHTML 在 HTML 基础上增加了更加严格的语法格式

- 了解 HTML 语义化吗，图片用什么标签（img），段落用什么标签（p），你还知道什么语义化标签？

  - img, audio, video, track
  - article, h1-h6, p, header, footer, nav, aside, section
  - img, button, input

- 了解 HTML5 吗，它有哪些新功能？_不需要全部答出来，挑重点的说，关键在于让面试官知道你在关注这方面_

  - 语义化标签
  - 增强型表单
  - **视频和音频**：支持直接播放视频和音频，并提供了相应的控制 api
  - **绘图 API**：canvas 和 svg
  - 地理定位
  - 拖放 API
  - **webworker 多线程**：让 Web 应用程序具备后台处理能力，对多线程的支持性非常好
  - **webstorage**：增加了 localstorage， sessionstorage
  - **websocket**：基于 tcp 的全双工通讯

- div 标签和 span 标签的区别是什么？
- 块级元素和行内元素的区别是什么？
- localstorage 和 cookies 的区别有哪些？

  - cookies 可存储的数据量远远小于 localstorage，具体大小与浏览器相关
  - cookies 可以通过设置 httponly 限制 js 的访问，localstorage 永远可以被 js 访问到
  - cookies 通过设置 domain、path 等参数可以随着请求发送到服务器端，localstorage 无法发送到服务器端
  - cookies 可以通过 expires 设置有效期，localstorage 只要存在就永远有效
  - cookies 提供了大量可配置项（domain、path、httponly、secure、expires、samesite 等等），localstorage 只有键值对的配置

- 重绘知道吗，哪些操作会触发重绘？
- css 的定位方式有哪些？

  答案总结在[阿里巴巴本地生活前端一面](./ali-local-front-first.md)

- z-index 是什么，作用是什么？

  - z-index 是一个 css 属性，作用是更改元素在 z 方向上的排序层级
  - 页面同一位置上的元素存在覆盖的关系，默认情况下，它的层级关系是：background < 块级元素 < 浮动元素 < 行内元素
  - 通过引入 z-index，可以强制将元素的覆盖关系更改，实现：background < **z-index 为负值** < 块级元素 < 浮动元素 < 行内元素 < **z-index = 0/auto** < **z-index 为正值**

## javascript

- function 中 this 的指向是什么？

  答案总结在[阿里巴巴本地生活前端一面](./ali-local-front-first.md)

- undefined 和 null 的区别是什么？
- 用过 webpack 吗，写过 webpack 的插件吗？
- Babel 用过吗，作用和原理是什么？

  - babel 的主要作用是转译，就是将 ES6 的代码转换成 ES5 的代码
  - babel 的转译主要分为三个阶段：解析，转换和生成
  - 具体过程为：

    1. 读取 ES6 代码输入
    2. 解析代码，构建 AST 抽象语法树
    3. 遍历 AST，调用配置好的插件对节点进行转译，形成新的 AST
    4. 根据新的 AST 生成 ES5 代码

  - 一般来说，新标准中的改进分为两部分：语法变化（箭头函数，解构，async/await 等）和新对象，新 API（Proxy，Set）

    - 对于新语法，主要通过 babel-runtime/regenerator 包提供的函数进行转换
    - 对于新对象，主要通过 babel-runtime/core-js 包提供的函数进行转换

## Vue

- vue 的生命周期有哪些？（区分 vue2 和 vue3，最好能够说出每个阶段可以访问到哪些东西）
- 如果要在组件中发送请求，那么在声明周期的哪个阶段比较合适？
- vue 组件间的通信应该怎么做？

## 浏览器

- 同源策略是什么？跨域请求的概念，解决方案
- http 1.1 和 http 2.0 的区别是什么
- 了解过 xss 和 csrf 吗？

## 面试总体感受

整体上体验良好，笔试和面试是分开的，中午做完面试约了晚上的笔试，笔试是很基础的四道 js 题，不涉及到算法，总结如下：

1. 虽然遇到了没有覆盖到的题目，但是思路清晰地把自己知道的都表达出来了，问题不大
2. 反问环节问面试官自己在面试过程中有没有明显的错漏之处，面试官说没有
3. 反问中了解到没有实习还是会有一定影响的，入职后在业务这一块就会相对难以上手一些
