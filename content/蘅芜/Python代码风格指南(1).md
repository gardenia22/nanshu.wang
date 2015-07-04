---
date: 2015-07-04
description: ""
tags: ["Python","代码风格","翻译","风格指南","缩进","Tab","每行最大长度","代码设计","imports","编码","空行"]
title: "Python代码风格指南（一）代码设计(Style Guide for Python Code中文翻译)"
topics: []
draft: false
url: /post/2015-07-04
---

翻译自：[PEP 8 - Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)


介绍(Introduction)
============

这篇文档说明了Python主要发行版中标准库代码所遵守的规范。请参考实现Python的C代码风格指南信息PEP。

这篇文档和PEP 257(Docstring Conventions)都改编自Guido(译注：Python之父)最早的Python风格指南文章，并加入了Barry风格指南里的内容。

语言自身在发生着改变，随着新的规范的出现和旧规范的过时，代码风格也会随着时间演变。

很多项目都有自己的一套风格指南。若和本指南有任何冲突，应该优先考虑其项目相关的那套指南。

<!--more-->
保持盲目的一致是头脑简单的表现(A Foolish Consistency is the Hobgoblin of Little Minds)
======================================================

(注：标题语出自Ralph Waldo Emerson, Hobgolin意指民间故事中友好但常制造麻烦的动物角色。)

Guido的一个重要观点是代码被读的次数远多于被写的次数。这篇指南旨在提高代码的可读性，使浩瀚如烟的Python代码风格能保持一致。正如PEP 20那首《Zen of Python》的小诗里所说的：“可读性很重要(Readability counts)”。

这本风格指南是关于一致性的。同风格指南保持一致性是重要的，但是同项目保持一致性更加重要，同一个模块和一个函数保持一致性则最为重要。

然而最最重要的是：要知道何时去违反一致性，因为有时风格指南并不适用。当存有疑虑时，请自行做出最佳判断。请参考别的例子去做出最好的决定。并且不要犹豫，尽管提问。

特别的：千万不要为了遵守这篇PEP而破坏向后兼容性！

如果有以下借口，则可以忽略这份风格指南：

1. 当采用风格指南时会让代码更难读，甚至对于习惯阅读遵循这篇PEP的代码的人来说也是如此。

2. 需要和周围的代码保持一致性，但这些代码违反了指南中的风格（可是时历史原因造成的）——尽管这可能也是一个收拾别人烂摊子的机会（True in XP style?）。

3. 若是有问题的某段代码早于引入指南的时间，那么没有必要去修改这段代码。

4. 代码需要和更旧版本的Python保持兼容，而旧版本的Python不支持风格指南所推荐的特性。

代码设计(Code lay-out)
============

缩进(Indentation)
-----------

每个缩进级别采用4个空格。

连续行所包装的元素应该要么采用Python隐式续行，即垂直对齐于圆括号、方括号和花括号，要么采用*悬挂缩进(hanging indent)*。采用悬挂缩进时需考虑以下两点：第一行不应该包括参数，并且在续行中需要再缩进一级以便清楚表示。

正确的例子:

    # 同开始分界符(左括号)对齐
    foo = long_function_name(var_one, var_two,
                             var_three, var_four)

    # 续行多缩进一级以同其他代码区别
    def long_function_name(
            var_one, var_two, var_three,
            var_four):
        print(var_one)

    # 悬挂缩进需要多缩进一级
    foo = long_function_name(
        var_one, var_two,
        var_three, var_four)

错误的例子:

    # 采用垂直对齐时第一行不应该有参数
    foo = long_function_name(var_one, var_two,
        var_three, var_four)

    # 续行并没有被区分开，因此需要再缩进一级
    def long_function_name(
        var_one, var_two, var_three,
        var_four):
        print(var_one)

对于续行来说，4空格的规则可以不遵守。

同样可行的例子:

    # 悬挂缩进可以不采用4空格的缩进方法。
    foo = long_function_name(
      var_one, var_two,
      var_three, var_four)

`多行if语句`

如果``if``语句太长，需要用多行书写，2个字符(例如,``if``)加上一个空格和一个左括号刚好是4空格的缩进，但这对多行条件语句的续行是没用的。因为这会和``if``语句中嵌套的其他的缩进的语句产生视觉上的冲突。这份PEP中并没有做出明确的说明应该怎样来区分条件语句和``if``语句中所嵌套的语句。以下几种方法都是可行的，但不仅仅只限于这几种方法：

    # 不采用额外缩进
    if (this_is_one_thing and
        that_is_another_thing):
        do_something()

    # 增加一行注释，在编辑器中显示时能有所区分
    # supporting syntax highlighting.
    if (this_is_one_thing and
        that_is_another_thing):
        # Since both conditions are true, we can frobnicate.
        do_something()

    # 在条件语句的续行增加一级缩进
    if (this_is_one_thing
            and that_is_another_thing):
        do_something()

多行结束右圆/方/花括号可以单独一行书写，和上一行的缩进对齐：

    my_list = [
        1, 2, 3,
        4, 5, 6,
        ]
    result = some_function_that_takes_arguments(
        'a', 'b', 'c',
        'd', 'e', 'f',
        )

也可以和多行开始的第一行的第一个字符对齐：

    my_list = [
        1, 2, 3,
        4, 5, 6,
    ]
    result = some_function_that_takes_arguments(
        'a', 'b', 'c',
        'd', 'e', 'f',
    )


Tab还是空格？(Tab or space?)
---------------

推荐使用空格来进行缩进。

Tab应该只在现有代码已经使用tab进行缩进的情况下使用，以便和现有代码保持一致。

Python 3不允许tab和空格混合使用。

Python 2的代码若有tab和空格混合使用的情况，应该把tab全部转换为只有空格。

当使用命令行运行Python 2时，使用``-t``选项，会出现非法混用tab和空格的警告。当使用``-tt``选项时，这些警告会变成错误。强烈推荐使用这些选项！

每行最大长度(Maximum Line Length)
-------------------

将所有行都限制在79个字符长度以内。

对于连续大段的文字（比如文档字符串(docstring)或注释），其结构上的限制更少，这些行应该被限制在72个字符长度内。

限制编辑器的窗口宽度能让好几个文件同时打开在屏幕上显示，在使用代码评审(code review)工具时在两个相邻窗口显示两个版本的代码效果很好。

很多工具的默认自动换行会破坏代码的结构，使代码更难以理解。在窗口大小设置为80个字符的编辑器中，即使在换行时编辑器可能会在最后一列放置一个记号，为避免自动换行也需要限制每行字符长度。一些基于web的工具可能根本没有自动换行的功能。

一些团队会强烈希望行长度比79个字符更长。当代码仅仅只由一个团队维护时，可以达成一致让行长度增加到80到100字符(实际上最大行长是99字符)，注释和文档字符串仍然是以72字符换行。

Python标准库比较传统，将行长限制在79个字符以内（文档字符串/注释为72个字符）。

一种推荐的换行方式是利用Python圆括号、方括号和花括号中的隐式续行。长行可以通过在括号内换行来分成多行。应该最好加上反斜杠来区别续行。

有时续行只能使用反斜杠才。例如，较长的多个``with``语句不能采用隐式续行，只能接受反斜杠表示换行：

    with open('/path/to/some/file/you/want/to/read') as file_1, \
         open('/path/to/some/file/being/written', 'w') as file_2:
        file_2.write(file_1.read())

（参照前面关于 `多行if语句`的讨论来进一步考虑这里`with`语句的缩进。）

另一个这样的例子是``assert``语句。

要确保续行的缩进适当。逻辑运算符附近的换行处最好是在运算符**之后**，而不是在其之前。来看一些例子：

    class Rectangle(Blob):

        def __init__(self, width, height,
                     color='black', emphasis=None, highlight=0):
            if (width == 0 and height == 0 and
                    color == 'red' and emphasis == 'strong' or
                    highlight > 100):
                raise ValueError("sorry, you lose")
            if width == 0 and height == 0 and (color == 'red' or
                                               emphasis is None):
                raise ValueError("I don't think so -- values are %s, %s" %
                                 (width, height))
            Blob.__init__(self, width, height,
                          color, emphasis, highlight)

空行(Blank line)
-----------

使用2个空行来分隔最高级的函数(function)和类(class)定义。

使用1个空行来分隔类中的方法(method)定义。

（尽量少地）使用额外的空行来分隔一组相关的函数。在一系列相关的仅占一行的函数之间，空格也可以被省略，比如一组dummy实现。

在函数内（尽量少地）使用空行使代码逻辑更清晰。

Python支持control-L（如:^L）换页符作为空格；许多工具将这些符号作为分页符，因此你可以使用这些符号来分页或者区分文件中的相关区域。注意，一些编辑器和基于web的代码预览器可能不会将control-L识别为分页符，而是显示成其他符号。

源文件编码(Source File Encoding)
--------------------

Python核心发行版中的代码应该一直使用UTF-8（Python 2中使用ASCII）。

使用ASCII（Python 2）或者UTF-8（Python 3）的文件不应该添加编码声明。

在标准库中，只有用作测试目的，或者注释或文档字符串需要提及作者名字而不得不使用非ASCII字符时，才能使用非默认的编码。否则，在字符串文字中包括非ASCII数据时，推荐使用``\x``, ``\u``, ``\U``或``\N``等转义符。

对于Python 3.0及其以后的版本中，标准库遵循以下原则（参见PEP 3131）：Python标准库中的所有标识符都**必须**只采用ASCII编码的标识符，在可行的条件下也**应当**使用英文词（很多情况下，使用的缩写和技术术语词都不是英文）。此外，字符串文字和注释应该只包括ASCII编码。只有两种例外：
(a) 测试情况下为了测试非ASCII编码的特性
(b) 作者名字。作者名字不是由拉丁字母组成的也**必须**提供一个拉丁音译名。

鼓励面向全世界的开源项目都采用类似的原则。


Imports
-------

- Imports应该分行写，而不是都写在一行，例如：

      Yes: import os
           import sys

      No:  import sys, os

  但这样写也是可以的：

      from subprocess import Popen, PIPE

- Imports应该写在代码文件的开头，位于模块(module)注释和文档字符串之后，模块全局变量(globals)和常量(constants)声明之前。

  Imports应该按照下面的顺序分组来写：

  1. 标准库imports
  2. 相关第三方imports
  3. 本地应用/库的特定imports

  不同组的imports之前用空格隔开。

  将任何相关的``__all__``说明(specification)放在imports之后。

- 推荐使用绝对(absolute)imports，因为这样通常更易读，在import系统没有正确配置（比如中的路径以``sys.path``结束）的情况下，也会有更好的表现（或者至少会给出错误信息）：

    import mypkg.sibling
    from mypkg import sibling
    from mypkg.sibling import example

  然而，除了绝对imports，显式的相对imports也是一种可以接受的替代方式。特别是当处理复杂的包布局(package layouts)时，采用绝对imports会显得啰嗦。

    from . import sibling
    from .sibling import example

  Standard library code should avoid complex package layouts and always
  use absolute imports.
  标准库代码应当一直使用绝对imports，避免复杂的包布局。

  隐式的相对imports应该**永不**使用，并且Python 3中已经被去掉了。

- 当从一个包括类的模块中import一个类时，通常可以这样写：

      from myclass import MyClass
      from foo.bar.yourclass import YourClass

  如果和本地命名的拼写产生了冲突，应当直接import模块：

      import myclass
      import foo.bar.yourclass

  然后使用"myclass.MyClass"和"foo.bar.yourclass.YourClass".

- 避免使用通配符imports(``from <module> import *``)，因为会造成在当前命名空间出现的命名含义不清晰，给读者和许多自动化工具造成困扰。有一个可以正当使用通配符import的情形，即将一个内部接口重新发布成公共API的一部分（比如，使用备选的加速模块中的定义去覆盖纯Python实现的接口，被覆盖的定义恰好在不能提前知晓）。

  当使用这种方式重新发布命名时，指南后面关于公共和内部接口的部分仍然适用。

