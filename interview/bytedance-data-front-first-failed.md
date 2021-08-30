---
title: 字节南京 Data 前端提前批一面
date: 2021-07-20
categories:
  - 面试
tags:
  - front-end
---

字节跳动南京 Data 大数据部门前端提前批一面，面试时长约一小时，由于准备不充分，已挂。

先把题目列出来，后面慢慢补答案。

<!-- more -->

## 项目介绍

- 项目中权限管理是怎么做的？_（这一块面试的时候只提到了 RBAC，其实可以展开很多）_

  - 用户的认证过程是通过 jwt token 实现的：

    1. 不同的客户端通过不同的方式向身份认证服务器申请 access_token，前端一般使用的 authorization code 或者 implicit 方式
    2. 通过 axios 请求拦截器实现为每一个 api 请求添加 Authorization 请求头，值为上一步获取到的 token_type + access_token
    3. token 是自包含的，token 值解码出来之后会包含必要的认证信息，服务器读取进行认证

  - 用户的授权是基于资源去做的：

    1. 为几乎每一个 api 请求都设置了独立的权限，同时身份认证服务器提供了一个接口，可以根据用户的 token 返回它可以访问的所有权限
    2. 前端页面的路由是通过 vue-router 实现的，在每一个路由上设置 meta 数据，添加上访问当前页面所需要的权限
    3. 在构建页面左侧导航栏里面的列表元素的时候，会对比当前用户已有的权限和元素需要的权限，如果没有就不渲染
    4. 同时添加全局的路由守卫防止用户直接通过网址访问

- CI/CD 是怎么实现的？

  - git 本身提供了 hook 的机制，CI/CD 服务器根据用户提供的信息申请向 git 服务器中指定的仓库添加自己的 hook。
  - 当用户推送了提交到 git 服务器，就会触发相应的 hook，将本次提交相应的信息发送到 CI/CD 服务器
  - CI/CD 服务器根据信息判断执行怎样的自定义流程

## html/css

- box-sizing 是什么，它的默认值是什么？_(考察盒模型，但是这个之前没涉及到)_

  - 盒模型定义了元素由四个部分组成：content，padding，border，margin
  - box-sizing 规定了当为元素设置宽高时渲染的方式，一共有两个值：content-box 和 border-box
  - content-box 称为标准盒模型，也是默认值。此时，宽高的设置会被应用于 content 部分
  - border-box 称为替代盒模型。此时，宽高的设置会被应用于 content, padding, border 三个部分。因此，如果除了宽高还设置了 padding 值或者 border 值，那么 content 部分的宽高会小于上一种方式

## javascript

- `new Object()` 和 `{}` 创建对象的区别是什么？

  说实话，没找到太有价值的回答，可能是我问题记错了。StackOverflow 上有一个[相关的回答](https://stackoverflow.com/questions/4597926/what-is-the-difference-between-new-object-and-object-literal-notation)，可以了解一下。

- CommonJs 和 ES Module 的区别是什么？

  - 导出方式不同。CommonJs 支持 `module.exports = {}` 和 `exports.属性名 = {}` 两种方式导出，但是二者不能同时使用，会存在覆盖关系；ES Module 支持 `export 属性名 = {}` 和 `export default {}` 两种方式导出，而且二者可以同时使用
  - 导入方式不同。CommonJs 是同步导入，ES Module 是异步导入
  - 加载时机不同。CommonJs 是运行时加载，因此可以动态导入；ES Module 是编译时加载，只能通过确定的字符串形式指定模块，好处是可以做摇树优化
  - 导出值的类型不同。CommonJs 导出的是值的拷贝，因此内部修改无法同步到外部；ES Module 导出的是值的引用，内部修改可以同步到外部
  - this 的指向不同。CommonJs 中顶层的 this 指向这个模块本身，而 ES6 中顶层 this 指向 undefined

- 数组的 map，reduce 和 filter 的作用分别是什么？

  - [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 接受一个函数以及一个可选的 thisArg，返回一个新的数组。作用是迭代数组中的元素调用传入的函数，将函数返回值 push 到新数组并最终返回新数组
  - [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 接受一个函数以及一个可选的累计器，最终返回累计器的值。作用是迭代数组中的元素，将该元素以及累计器作为参数调用传入的函数，将函数返回值赋给累计器，直到最后返回累计器的值
  - [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 接受一个函数以及一个可选的 thisArg，返回一个新的数组。作用是迭代数组的每一个元素并调用传入的函数，将函数返回值为 true 的元素 push 到新数组并最终返回新数组

- 防抖是什么？

  单独抽离到了[这里](./debounce-and-throttle.md)

- 手写 instanceof 的实现

  - instanceof 的作用

    1. 判断某个实例是否属于某构造函数
    2. 在继承关系中用来判断一个实例是否属于它的父类型或者祖先类型的实例

  - 换句话说，判断右边变量的 prototype 是不是在左边变量的**原型链**上

  ```js
  function instanceof(obj, classType) {
    let classProto = classType.prototype;
    obj = obj.__proto__;
    while (true) {
      if (obj === null) {
        return false;
      }
      if (obj === classProto) {
        return true;
      }
      obj = obj.__proto__;
    }
  }
  ```

- Promise 链的理解 + 根据代码判断输出

  - 每一个 promise 都会有 then 和 catch 方法
  - 这些方法返回的还是一个 promise，then 还可以返回新的 promise 值
  - 因此，对于初始的一个 promise，通过不断调用 then 和 catch 方法就形成 promise 的链式调用

- Proxy 可以用来干什么？

  - proxy 可以实现对被代理对象的 get，set，has，deleteProperty 等等很多方法的劫持，添加上自己的逻辑之后通过 Reflect Api 调用原功能
  - 基于此，我们可以实现比如说日志，缓存，默认值等功能
  - 我之前还尝试过通过 proxy 和 reflect 实现依赖注入

## Vue

- computed 和 watch 的区别是什么？_([参考链接 1](https://v3.cn.vuejs.org/guide/computed.html)，[参考链接 2](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html))_

  - computed 会缓存依赖，只在它依赖的响应式数据变化时才会更新自身；watch 会在监听的数据源变更时执行指定的操作
  - computed 支持通过 get 返回自身计算所得的响应式数据，通过 set 根据自身值的改变进行其他操作；watch 没有返回值
  - watch 主要用于需要在数据变化时执行**异步的**或者**开销较大的**操作，或者设置中间状态等复杂逻辑时

- vue-router 的原理
- vue-router 的路由方式有哪些

## 浏览器

- 页面阻塞的概念

  - 浏览器在解析 html 时是自上往下进行解析和渲染的
  - 当发现需要引用外部的脚本或者 css 样式表的时候会阻塞页面渲染，等待外部文件加载完成之后再接着往下渲染
  - 通常来说，如果 html 中引用了外部的 js、css 资源，或者 js 中引用了外部的 css 资源，就会发生页面阻塞

- ~~script 标签会阻塞下载吗？ 多个 script defer 是并行下载还是串行下载？~~ 主要考察的是：script 标签上 async 和 defer 的作用是什么？
- 跨域请求的概念，解决方案，跨域请求发送出去了吗？

  答案总结在[面试中跨域相关问题汇总](./cross-origin.md)

- CSRF 是什么？怎么解决？
- dom 树操作耗性能吗，为什么？**提及怎么优化必然加分**

## 算法

[Leetcode 300 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

## 面试总体感受

第一次面试确实缺乏经验，总结出以下几个教训：

1. 拿到问题之后立刻开始回答，就导致有时候前言不搭后语，逻辑上显得比较混乱，明明会的知识点也会显得好像不懂的样子。
2. 自认为做了项目就能在一定程度上获得面试的主动权，实际上如果和面试官的业务不重合，人家不会问的很深入。
3. 不能完全扎在 js 里面，css 和浏览器相关的知识在面试中也占了很大的比重，面试官也说知识面还不够宽。
4. 算法不能荒废，哪怕项目再忙，必须保证每天的刷题量，尤其是动态规划相关。
