---
date: 2015-07-05
description: ""
tags: ["Python","代码风格","翻译","风格指南","字符串引用"]
title: "Python代码风格指南（二）字符串引用 表达式和语句中的空格(Style Guide for Python Code中文翻译)"
topics: []
draft: true
url: /post/2015-07-05
---
字符串引用(String Quotes)
=============

在Python中，用单引号和双引号来表示字符串是一样的。但是不推荐将这两种方式看作一样。最好选择一种规则并坚持使用。当字符串中包含单引号时，采用双引号来表示字符串，反之也是一样，这样可以避免使用反斜杠，使代码更易读。

对于三引号表示的字符串，使用双引号字符来表示，这样可以和PEP 257的文档字符串规则保持一致。

表达式和语句中的空格(Whitespace in Expressions and Statements)
========================================
<!--more-->
一些痛点(Pet peeves)
----------

在下列情形中避免使用过多的空白：

- 方括号，圆括号和花括号之后：

      Yes: spam(ham[1], {eggs: 2})
      No:  spam( ham[ 1 ], { eggs: 2 } )

- 逗号，分号或冒号之前：

      Yes: if x == 4: print x, y; x, y = y, x
      No:  if x == 4 : print x , y ; x , y = y , x

- 不过，在分片操作时，冒号和二元运算符是一样的，应该在其左右两边有相同数量的空格（就像对待优先级最低的运算符一样）。在扩展的分片操作中，所有冒号的左右两边空格数都应该相等。不过也有例外，当切片操作中的参数被省略时，应该也忽略空格。
  Yes:

      ham[1:9], ham[1:9:3], ham[:9:3], ham[1::3], ham[1:9:]
      ham[lower:upper], ham[lower:upper:], ham[lower::step]
      ham[lower+offset : upper+offset]
      ham[: upper_fn(x) : step_fn(x)], ham[:: step_fn(x)]
      ham[lower + offset : upper + offset]

  No:

      ham[lower + offset:upper + offset]
      ham[1: 9], ham[1 :9], ham[1:9 :3]
      ham[lower : : upper]
      ham[ : upper]

- 在调用函数时传递参数list的括号之前：

      Yes: spam(1)
      No:  spam (1)

- 在索引和切片操作的左括号之前：

      Yes: dct['key'] = lst[index]
      No:  dct ['key'] = lst [index]

- 赋值(或其他)运算符周围使用多个空格来和其他语句对齐：

  Yes::

      x = 1
      y = 2
      long_variable = 3

  No::

      x             = 1
      y             = 2
      long_variable = 3


其他建议
---------------------

- 在二元云算符的两边都使用一个空格：赋值运算符(``=``)，增量赋值运算符(``+=``, ``-=``
  etc.)，比较运算符(``==``, ``<``, ``>``, ``!=``, ``<>``, ``<=``,
  ``>=``, ``in``, ``not in``, ``is``, ``is not``)，布尔运算符(``and``,
  ``or``, ``not``)。

- 如果使用了优先级不同的运算符，则在优先级较低的操作符周围增加空白。请你自行判断，不过永远不要用超过1个空格，永远保持二元运算符两侧的空白数量一样。

  Yes::

      i = i + 1
      submitted += 1
      x = x*2 - 1
      hypot2 = x*x + y*y
      c = (a+b) * (a-b)

  No::

      i=i+1
      submitted +=1
      x = x * 2 - 1
      hypot2 = x * x + y * y
      c = (a + b) * (a - b)

- 使用``=``符号来表示关键字参数或默认参数值时，不要在其周围使用空格。

  Yes::

      def complex(real, imag=0.0):
          return magic(r=real, i=imag)

  No::

      def complex(real, imag = 0.0):
          return magic(r = real, i = imag)

- 在带注释的函数定义中需要在``=``符号周围加上空格。此外, 在``:``后使用一个空格，在``->``表示带注释的返回值时，其两侧各使用一个空格。

  Yes::

      def munge(input: AnyStr):
      def munge(sep: AnyStr = None):
      def munge() -> AnyStr:
      def munge(input: AnyStr, sep: AnyStr = None, limit=1000):

  No::

      def munge(input: AnyStr=None):
      def munge(input:AnyStr):
      def munge(input: AnyStr)->PosInt:

- 复合语句（即将多行语句写在一行）一般是不鼓励使用的。

  Yes::

      if foo == 'blah':
          do_blah_thing()
      do_one()
      do_two()
      do_three()

  Rather not::

      if foo == 'blah': do_blah_thing()
      do_one(); do_two(); do_three()

- 有时也可以将短小的if/for/while中的语句写在一行，但对于有多个分句的语句永远不要这样做。也要避免将多行都写在一起。

  Rather not::

      if foo == 'blah': do_blah_thing()
      for x in lst: total += x
      while t < 10: t = delay()

  Definitely not::

      if foo == 'blah': do_blah_thing()
      else: do_non_blah_thing()

      try: something()
      finally: cleanup()

      do_one(); do_two(); do_three(long, argument,
                                   list, like, this)

      if foo == 'blah': one(); two(); three()

注释(Comments)
========

Comments that contradict the code are worse than no comments.  Always
make a priority of keeping the comments up-to-date when the code
changes!
和代码矛盾的注释还不如没有。当代码有改动时，一定要优先更改注释使保持更新。

Comments should be complete sentences.  If a comment is a phrase or
sentence, its first word should be capitalized, unless it is an
identifier that begins with a lower case letter (never alter the case
of identifiers!).
注释应该是完整的几个句子。如果注释是一个短语或一个句子，其首字母应该大写，除非开头是一个以小写字母开头的标识符（永远不要更改标识符的大小写）。

If a comment is short, the period at the end can be omitted.  Block
comments generally consist of one or more paragraphs built out of
complete sentences, and each sentence should end in a period.
如果注释很短，结束的句号可以被忽略。块注释通常由一段或几段完整的句子组成，每个句子都应该以句号结束。

You should use two spaces after a sentence-ending period.
你应该在句尾的句号后再加上2个空格。

When writing English, follow Strunk and White.
使用英文写作，参考Strunk和White的《The Elements of Style》

Python coders from non-English speaking countries: please write your
comments in English, unless you are 120% sure that the code will never
be read by people who don't speak your language.
来自非英语国家的Python程序员们，请使用英文来写注释，除非你120%确定你的代码永远不会被不使用你所用语言的人阅读到。

Block Comments
块注释
--------------

Block comments generally apply to some (or all) code that follows
them, and are indented to the same level as that code.  Each line of a
block comment starts with a ``#`` and a single space (unless it is
indented text inside the comment).
块注释一般写在对应代码之前，并且和对应代码有同样的缩进级别。块注释的每一行都应该以``#``和一个空格开头（除非这在注释内缩进对齐的文本）。

Paragraphs inside a block comment are separated by a line containing a
single ``#``.
块注释中的段落应该用只含有单个``#``的一行隔开。

Inline Comments
行内注释
---------------

Use inline comments sparingly.
尽量少用行内注释。

An inline comment is a comment on the same line as a statement.
Inline comments should be separated by at least two spaces from the
statement.  They should start with a # and a single space.
行内注释是和代码语句写在一行内的注释。行内注释应该至少和代码语句之间有两个空格的间隔，并且以``#``和一个空格开始。

Inline comments are unnecessary and in fact distracting if they state
the obvious.  Don't do this::
行内注释不是必要的，在代码含义很明显时甚至会让人分心。请不要这样做：

    x = x + 1                 # Increment x

But sometimes, this is useful::
但这样做是有用的：

    x = x + 1                 # Compensate for border

Documentation Strings
文档字符串
---------------------

Conventions for writing good documentation strings
(a.k.a. "docstrings") are immortalized in PEP 257.
要知道如何写出好的文档字符串（docstring），请参考PEP 257。

- Write docstrings for all public modules, functions, classes, and
  methods.  Docstrings are not necessary for non-public methods, but
  you should have a comment that describes what the method does.  This
  comment should appear after the ``def`` line.
- 所有的公共模块，函数，类和方法都应该有文档字符串。对于非公共方法，文档字符串不是必要的，但你应该留有注释说明该方法的功能，该注释应当出现在``def``的下一行。

- PEP 257 describes good docstring conventions.  Note that most
  importantly, the ``"""`` that ends a multiline docstring should be
  on a line by itself, e.g.::
- PEP 257描述了好的文档字符应该遵循的规则。其中最重要的是，多行文档字符串以单行``"""``结尾，不能有其他字符，例如：

      """Return a foobang

      Optional plotz says to frobnicate the bizbaz first.
      """

- For one liner docstrings, please keep the closing ``"""`` on
  the same line.
- 对于仅有一行的文档字符串，结尾处的``"""``应该也写在这一行里。


Version Bookkeeping
版本注记
===================

If you have to have Subversion, CVS, or RCS crud in your source file,
do it as follows. ::
如果你必须在源代码中包含Subversion, CVS或RCS crud，请这样做：

    __version__ = "$Revision$"
    # $Source$

These lines should be included after the module's docstring, before
any other code, separated by a blank line above and below.
以上几行的内容应当在模块的文档字符串之后，在其他代码之前，并且在其开始和结束都使用一个空行隔开。
