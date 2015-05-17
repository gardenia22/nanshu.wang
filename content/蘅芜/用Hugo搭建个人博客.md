---
date: 2015-01-31T00:30:03+08:00
description: ""
tags: ["Hugo","静态网站生成器","博客","教程","网站"]
title: "Hugo静态网站生成器中文教程"
topics: []
draft: false
url: /post/2015-01-31
---

# 前言

[Hugo](http://gohugo.io)是什么？官方文档是这样介绍它的：

> Hugo is a general-purpose website framework. Technically speaking, Hugo is a static site generator.

Hugo是一种通用的网站框架。严格来说，Hugo应该被称作静态网站生成器。

静态网站生成器从字面上来理解，就是将你的内容生成静态网站。所谓“静态”的含义其实反映在网站页面的生成的时间。一般的web服务器（WordPress, Ghost, Drupal等等）在收到页面请求时，需要调用数据库生成页面（也就是HTML代码），再返回给用户请求。而静态网站则不需要在收到请求后生成页面，而是在整个网站建立起之前就将所有的页面全部生成完成，页面一经生成便称为静态文件，访问时直接返回现成的静态页面，不需要数据库的参与。
<!--more-->
采用静态网站的维护也相当简单，实际上你根本不需要什么维护，完全不用考虑复杂的运行时间，依赖和数据库的问题。再有也不用担心安全性的问题，没有数据库，网站注入什么的也无从下手。

静态网站最大好处就是访问快速，不用每次重新生成页面。当然，一旦网站有任何更改，静态网站生成器需要重新生成所有的与更改相关的页面。然而对于小型的个人网站，项目主页等等，网站规模很小，重新生成整个网站也是非常快的。Hugo在速度方面做得非常好，Dan Hersam在他这个[Hugo教程](https://www.udemy.com/build-static-sites-in-seconds-with-hugo/)里提到，5000篇文章的博客，Hugo生成整个网站只花了6秒，而很多其他的静态网站生成器则需要几分钟的时间。我的博客目前文章只有几十篇，用Hugo生成整个网站只需要0.1秒。官方文档提供的数据是每篇页面的生成时间不到1ms。

我认为对于个人博客来说，应该将时间花在内容上而不是各种折腾网站。Hugo会将Markdown格式的内容和设置好模版一起，生成漂亮干净的页面。挑选折腾好一个喜爱的模版，在Sublime Text里用Markdown写博客，再敲一行命令生成同步到服务器就OK了。整个体验是不是非常优雅简单还有点geek的味道呢？

Hugo是用[Go语言](http://golang.org/)写的，为什么使用Go，作者[Steve Francia](http://spf13.com)的原话是：

> I looked at existing static site generators like Jekyll, Middleman and nanoc. All had complicated dependencies to install and took far longer to render my blog with hundreds of posts than I felt was acceptable. I wanted a framework to be able to get rapid feedback while making changes to the templates, and the 5+-minute render times was just too slow. In general, they were also very blog minded and didn’t have the ability to have different content types and flexible URLs.

> I wanted to develop a fast and full-featured website framework without dependencies. The Go language seemed to have all of the features I needed in a language. I began developing Hugo in Go and fell in love with the language. I hope you will enjoy using (and contributing to) Hugo as much as I have writing it.

总结他的一下大意：

* 吐槽脸：Jekyll以及那一堆静态网站生成器安装麻烦（依赖多），速度又慢，内容类型单一，url死板
* 挽袖子状：Go挺萌的符合我对语言的一切幻想，就用它重写一个吧

我为啥用Hugo？除了以上提到的原因，很重要的一点是[Hugo主页](http://gohugo.io)很漂亮，看了一圈静态网站生成器的主页，一眼就被Hugo的美到了，首页的照片里的那个格子小本子应该是[Paperthinks](http://www.paperthinks.com)，我正好也在用，有种刚好看到自己桌面的感觉。

# 安装
如果说速度快是Hugo的第一大优点，那么安装简单应该就是Hugo的第二大优点。对于Mac用户，没有brew的话先安装brew，在命令行里敲：

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后再敲一行安装Hugo:

```
$ brew new Hugo
```

当然你也可以在[这里](https://github.com/spf13/hugo/releases)直接下载对应系统的binary文件，解压就行了。

# 了解Hugo

首先建立自己的网站，mysite是网站的路径

```
$ hugo new site mysite
```

然后进入该路径

```
$ cd mysite
```

在该目录下你可以看到以下几个目录和``config.toml``文件

```
 ▸ archetypes/ 
 ▸ content/
 ▸ layouts/
 ▸ static/
   config.toml
```
``config.toml``是网站的配置文件，包括``baseurl``, ``title``, ``copyright``等等网站参数。

这几个文件夹的作用分别是：

* archetypes：包括内容类型，在创建新内容时自动生成内容的配置
* content：包括网站内容，全部使用markdown格式
* layouts：包括了网站的模版，决定内容如何呈现
* static：包括了css, js, fonts, media等，决定网站的外观

Hugo提供了一些完整的主题可以使用，下载这些主题：

```
$ git clone --recursive https://github.com/spf13/hugoThemes themes
```

此时现成的主题存放在``themes/``文件夹中。

现在我们先熟悉一下Hugo，创建新页面：

```
$ hugo new about.md
```

进入``content/``文件夹可以看到，此时多了一个markdown格式的文件``about.md``，打开文件可以看到时间和文件名等信息已经自动加到文件开头，包括创建时间，页面名，是否为草稿等。

```
---
+++
date = "2015-02-01T18:19:54+08:00"
draft = true
title = "about"

+++

# 关于我
- 2010  HR@RUC
- 2014  CS@ICT, CAS
```

我在页面中加入了一些内容，然后运行Hugo:


```
$ hugo server -t hyde --buildDrafts
```

``-t``参数的意思是使用hyde主题渲染我们的页面，注意到``about.md``目前是作为草稿，即``draft``参数设置为``true``，运行Hugo时要加上``--buildDrafts``参数才会生成被标记为草稿的页面。
在浏览器输入localhost:1313，就可以看到我们刚刚创建的页面。

{{% img src="/media/hugo-server-1.png" alt="hugo-server-1" %}}

注意观察当前目录下多了一个文件夹``public/``，这里面是Hugo生成的整个静态网站，如果使用Github pages来作为博客的Host，你只需要将``public/``里的文件上传就可以，这相当于是Hugo的输出。


# 主题选择

进入``themes/hyde``文件夹，可以看到熟悉的文件夹名，和主题相关的文件主要是在``layouts/``和``static/``这两个文件内，选择好一个主题后，可以将``themes/``中的文件夹直接复制到``mysite/``目录下，覆盖原来的``layouts/``, ``static/``文件夹，此时直接使用\$Hugo server就可以看到主题效果，修改主题也可以直接修改其中的css, js, html等文件。

我的博客模版是在Hugo作者spf13的[博客](http://spf13.com)基础上修改的。第一步，先去他的博客网站源码[主页](https://github.com/spf13/spf13.com)把整个项目clone下来

```
$ git clone git@github.com:spf13/spf13.com.git
```

把项目中的``static/``和``layouts/``文件复制到自己网站的目录下替换原来的文件夹。再次运行Hugo:

```
$ hugo server --buildDrafts -w
```

这次没有选择主题，如果选择了主题会将当前的主题覆盖掉。参数``-w``意味监视watch，此时如果修改了网站内的信息，会直接显示在浏览器的页面上，不需要重新运行\$hugo server，方便我们进行修改。这是采用了spf13主题的页面：

{{% img src="/media/hugo-server-2.png" alt="hugo-server-2" %}}

我们尝试在他的主题基础上修改，找到``/layouts/partials/subheader.html``文件:

```html
<header id="header">
    <figure>
      <a href="/" border=0 id="logolink"><div class="icon-spf13-3" id="logo"> </div></a>
    </figure>
    <div id="byline">by Steve Francia</div>
    <nav id="nav">
    {{ partial "nav.html" . }}
    {{ partial "social.html" . }}
    </nav>
</header>
```

将by Steve Francia换成by myname，再次回到浏览器，可以看到左边侧栏已经发生变化了，你可以根据自己的需要修改对应的文件，当然得懂一点css, html。

{{% img src="/media/hugo-server-change.png" alt="hugo-server-change" %}}

# 评论功能

个人博客当然不能没有评论，Hugo默认支持[Disqus](https://disqus.com/)的评论，需要在模版中添加以下代码：

```
{{ template "_internal/disqus.html" . }}
```

spf13在``/layouts/partials/disqus.html``中已经添加好了。

只需要去Disqus注册一个账号，然后在``config.toml``里加上：

```
disqusShortname = "yourdisqusShortname"
```

注意``-w``参数是不能监测``config.toml``里参数变化的，因此需要重新运行Hugo，进入localhost:1313/about，可以看到评论功能。

{{% img src="/media/comments.png" alt="comments" %}}

# 代码高亮

作为码农，代码高亮对于写博客来说当然必不可少。有两种方法：第一种是在生成页面时就生成好代码高亮过的页面；第二种是使用js，用户加载页面时浏览器再进行渲染。

第一种方法需要使用[Pygments](http://pygments.org/)，一个python写的工具。

安装Pygments：

```shell
$ pip install Pygments
```

没有pip的先下载 https://bootstrap.pypa.io/get-pip.py ，然后安装pip：


```shell
$ python get-pip.py
```

Pygments的调用采用shortcodes实现，spf13里也写好了，在``/layouts/shortcode/highlight.html``里


```
{{ $lang := index .Params 0 }}
{{ highlight .Inner $lang }}
```

要使代码高亮，在你的代码外面加上：

```
{{ % highlight python %}}
your code here.
{{ % /highlight %}}
```

这里为了避免以上两行被识别为代码高亮的标识，在``{{``和``%``之间多加了一个空格，实际使用的时候需要把空格去掉。

第二种方法比较简单，在``layouts/partials/header_includes.html``中加上：


```
<script src="https://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<link rel="stylesheet" href="https://yandex.st/highlightjs/8.0/styles/default.min.css">
<script>hljs.initHighlightingOnLoad();</script>
```


这里使用了[Yandex](http://yandex.ru/)的[Highlight.js](http://highlightjs.org/)。

其他的可以实现代码高亮的js库还有：

* [Highlight.js](http://highlightjs.org/)
* [Rainbow](http://craig.is/making/rainbows)
* [Syntax Highlighter](http://alexgorbatchev.com/SyntaxHighlighter/)
* [Google Prettify](https://code.google.com/p/google-code-prettify/)

# 插入图片

图片文件放在``static/media``文件中，插入图片：

```
{{ % img src="/media/example.jpg" alt="example" %}}
```

注意这里的``{{``和``%``之间也加上了空格，避免这行代码起作用，实际使用也需要把空格去掉。

# 使用Mathjax

在需要渲染公式的页面加入以下代码，比如``layouts/_default/single.html``文件，这个文件是对于所有post进行页面生成的模版，如果你希望所有页面都对公式渲染的话，可以加入``layouts/partials/footer.html``文件里，保证所有生成的页面都有这几行代码。

```html
<script type="text/javascript"
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```
Mathjax和Markdown会有冲突问题，[这里](http://doswa.com/2011/07/20/mathjax-in-markdown.html)提供了解决方案。

# 用github pages作为网站的Host

Github pages分为两种：一种是项目主页，每个项目都可以有一个；另一种是用户主页，一个用户只能有一个。

因为用户主页只能有一个，所以建议使用项目主页托管，不过我这里采用了用户主页，反正我也只用一个博客，使用个人主页作为Host也相对更简单一点。

我们需要创建两个单独的repo，一个用于放Hugo的输入文件，即除了``public/``文件夹之外的所有文件，另一个放我们生成的静态网站，也就是``public/``的内容。

步骤如下：

1. 在Github上创建repo ``<your-project>-hugo``，托管Hugo的输入文件。
2. 创建repo ``<username>.github.io``，用于托管``public/``文件夹，注意这里的repo名字一定要用自己的用户名，才会被当作是个人主页。
3. clone your-project
```
$ git clone <<your-project>-hugo-url>
```
4. 进入your-project 目录
```
$ cd <your-project>-hugo
```
5. 删掉public目录（这个目录每次运行Hugo都会再次生成，不用担心）
```
$ rm -rf public
```
6. 把public/目录添加为submodule 与<username>.github.io同步
```
$ git submodule add git@github.com:<username>/<username>.github.io.git public
```
7. 添加.gitignore文件，文件中写``public/``，在同步``<your-project>-hugo``时会忽略public文件夹
8. 下面是写好的一个script ``deploy.sh``，拷贝过去直接就能用，记得chmod +x deploy.sh加上运行权限。

```bash
#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi

# Push Hugo content 
git add -A
git commit -m "$msg"
git push origin master


# Build the project. 
hugo # if using a theme, replace by `hugo -t <yourtheme>`

# Go To Public folder
cd public
# Add changes to git.
git add -A

# Commit changes.

git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
cd ..

```

等一小会儿（10分钟左右），你就能在http://username.github.io/ 这个页面看到你的网站了！每次更新网站或者写了新文章，只需要运行./deploy.sh 发布就搞定了，简单吧？

Github pages还支持域名绑定，三个步骤：

1. 在``<username>.github.io`` repo的跟目录下添加``CNAME``文件，文件里写上你的域名，不用加http://的开头。
2. 记下http://username.github.io/ 的ip地址。
```
$ ping username.github.io
```
3. 在你的域名管理中加上两条A记录，分别是www和@，记录指向http://username.github.io/ 的ip地址，也需要等一小会儿生效。

# 更改字体服务商

我的博客模版里用的字体是从googleapis里获取的，国内访问会下载失败，把字体库改成360的。
找到``layouts/partials/head_includes.html``文件：

```html
<link href='http://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans:300' rel='stylesheet' type='text/css'>
```

将其中的googleapis替换为useso就行了。

教程会根据我的博客遇到的问题继续更新。

# 增加网站分析

使用网站分析可以帮助我们更好地了解博客的读者和流量来源，我使用了[百度统计](http://tongji.baidu.com)和[谷歌统计](http://www.google.cn/webmasters/)，注册帐号后只需要按照提示在模板中加入相应的script代码就可以了。

# 参考
1. [Hugo docs](http://gohugo.io/overview/introduction/)
2. [《内核恐慌》静态网站生成器](http://ipn.li/kernelpanic/3/) 
3. [Build Static Sites in Seconds with Hugo](https://www.udemy.com/build-static-sites-in-seconds-with-hugo/)
4. [Setting up a custom domain with GitHub Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/)