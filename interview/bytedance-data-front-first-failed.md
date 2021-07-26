---
title: 字节南京 Data 前端提前批一面
date: 2021-07-14
categories:
  - 面试
tags:
  - front-end
---

字节跳动南京 Data 大数据部门前端提前批一面，由于准备不充分，已挂。

先把题目列出来，后面慢慢补答案。

<!-- more -->

## 项目介绍

- 项目中权限管理是怎么做的？_（这一块面试的时候只提到了 RBAC，其实可以展开很多）_

  - 底层是基于 OpenId 协议和 OAuth 2.0 协议实现的
  - 用户的认证过程是通过 jwt token 实现的：

    1. 不同的客户端通过不同的方式向身份认证服务器申请 access_token，前端一般使用的 authorization code 或者 implicit 方式
    2. 通过 axios 请求拦截器实现为每一个 api 请求添加 Authorization 请求头，值为上一步获取到的 token_type + access_token
    3. token 是自包含的，token 值解码出来之后会包含必要的认证信息，服务器读取进行认证

  - 用户的授权是基于 RBAC 的：token 中包含了用户的角色信息，但是也支持基于策略去做

- CI/CD 是怎么实现的？

  - git 本身提供了 hook 的机制，CI/CD 服务器根据用户提供的信息申请向 git 服务器中指定的仓库添加自己的 hook。
  - 当用户推送了提交到 git 服务器，就会触发相应的 hook，将本次提交相应的信息发送到 CI/CD 服务器
  - CI/CD 服务器根据信息判断执行怎样的自定义流程

## CSS

- box-sizing 是什么，它的默认值是什么？_(考察盒模型，但是这个之前没涉及到)_

  - 盒模型定义了元素由四个部分组成：content，padding，border，margin
  - box-sizing 规定了当为元素设置宽高时渲染的方式，一共有两个值：content-box 和 border-box
  - content-box 称为标准盒模型，也是默认值。此时，宽高的设置会被应用于 content 部分
  - border-box 称为替代盒模型。此时，宽高的设置会被应用于 content, padding, border 三个部分。因此，如果除了宽高还设置了 padding 值或者 border 值，那么 content 部分的宽高会小于上一种方式

- 还有一些忘记了

## javascript

- new Object 和 {} 的区别是什么？
- 模块化方案有哪些，区别是什么？
- 数组的 map，reduce 和 filter 的作用分别是什么？

  - [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 接受一个函数以及一个可选的 thisArg，返回一个新的数组。作用是迭代数组中的元素调用传入的函数，将函数返回值 push 到新数组并最终返回新数组
  - [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 接受一个函数以及一个可选的累计器，最终返回累计器的值。作用是迭代数组中的元素，将该元素以及累计器作为参数调用传入的函数，将函数返回值赋给累计器，直到最后返回累计器的值
  - [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 接受一个函数以及一个可选的 thisArg，返回一个新的数组。作用是迭代数组的每一个元素并调用传入的函数，将函数返回值为 true 的元素 push 到新数组并最终返回新数组

- 防抖是什么？
- 手写 instanceof 的实现
- Promise 链的理解 + 根据代码判断输出
- Proxy 可以用来干什么？

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

- script 标签会阻塞下载吗？
- 多个 script defer 是并行下载还是串行下载？
- 跨域请求的概念，解决方案
- 跨域请求发送出去了吗
- CSRF 是什么？怎么解决？
- dom 树操作耗性能吗，为什么？

## 算法

最长递增子序列

## 面试总体感受

第一次面试确实缺乏经验，总结出以下几个教训：

1. 拿到问题之后立刻开始回答，就导致有时候前言不搭后语，逻辑上显得比较混乱，明明会的知识点也会显得好像不懂的样子。
2. 自认为做了项目就能在一定程度上获得面试的主动权，实际上如果和面试官的业务不重合，人家不会问的很深入。
3. 不能完全扎在 js 里面，css 和浏览器相关的知识在面试中也占了很大的比重，面试官也说知识面还不够宽。
4. 算法不能荒废，哪怕项目再忙，必须保证每天的刷题量，尤其是动态规划相关。
