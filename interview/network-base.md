---
title: 计算机网络基础
date: 2021-07-14
categories:
  - 面试
tags:
  - network
---

计算机网络面试八股文，结合自己的理解进行语言组织

<!-- more -->

## 在浏览器输入 URL 回车之后发生了什么

### 建立连接前

1. 检查浏览器缓存（是否存在，是否过期）：
   1. 如果存在且没有过期则直接使用
   2. 如果不存在或者已经过期，则继续建立连接
2. 域名解析到 ip：
   1. 查看系统 hosts 文件
   2. 查看系统 DNS 缓存
   3. 本地 DNS 服务器**递归查询**
   4. 根 DNS 服务器**迭代查询**

### 建立连接

这里主要根据 TCP/IP 四层网络模型来展开。

1. 应用层构建 [HTTP 请求](#TODO: HTTP 请求的格式)。一般来说，打开网页是 GET 请求。
2. 传输层建立 TCP 连接，涉及到[三次握手](#TODO: 详细过程)
3. 网络层查找主机，为数据选择路由方式
4. 链路层传输数据

### 服务器处理请求

1. 通常，都会存在 Nginx 这样的应用进行负载均衡，反向代理，静态页面在这里直接就返回了
2. 后端应用程序解析 HTTP 请求，进行相应的处理
3. 后端应用程序生成 [HTTP 响应](#TODO：HTTP 响应的格式)，发送给客户端

### 浏览器处理响应

1. 查看响应头，根据[状态码](#TODO：常见的状态码)进行相应的处理
   1. 3XX，重定向
   2. gzip，解压缩
   3. 缓存
2. 根据 MIME 解析响应内容

### 渲染页面

1. 构建 DOM 和 CSSOM，二者是同步进行的
2. 结合 DOM 树 和 CSSOM 树，生成渲染树
3. 生成 Layout 布局
4. 绘制页面