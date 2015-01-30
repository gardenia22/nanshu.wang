---
date: 2015-01-31T00:30:03+08:00
description: ""
tags: []
title: "\u7528Hugo\u642D\u5EFA\u4E2A\u4EBA\u535A\u5BA2"
topics: []
---


# 安装Hugo
1.安装brew
```
$ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2.安装pip
下载 https://bootstrap.pypa.io/get-pip.py
```
$python get-pip.py
```

3.安装Pygments
```
$pip install Pygments
```
4.安装Hugo
```
$brew new Hugo
```
# Started
1. Create a site
```
$Hugo new site sitepath
```
2.Create page
```
$Hugo new about.me
```
3. Create a post
```
$Hugo new post/first.me
```
# 选择主题
4. download thems
```
$ git clone --recursive https://github.com/spf13/hugoThemes themes
```
5. run Hugo
```
$ hugo server --theme=hyde --buildDraft
```
5. 选择主题
直接选择了Hugo 作者博客的主题，先将他的博客全部fork下来
```
$ git clone https://github.com/spf13/hugo.git
```
# 其他功能
## rss订阅
## 代码高亮
安装pygments，在代码两头加上
```
{{ < highlight python>}}
your code here.
{{ /highlight }}
```
## 图片管理
```
{{ % img src="/media/spf13-responsive.jpg" alt="spf13 responsive website" %}}
```
原文件放入media文件夹内

## Mathjax支持

## 采用github pages
内核恐慌关于静态网站生成器 http://ipn.li/kernelpanic/3/