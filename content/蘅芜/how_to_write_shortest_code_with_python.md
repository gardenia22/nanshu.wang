---
date: 2016-01-25
description: ""
tags: ["Python","shortest","algorithm"]
title: "How to write shortest code with Python"
topics: []
draft: true
url: /post/2016-01-25
---

I was so enthralled by the [Codefights](https://codefights.com) Challenges of writing shortest code last weekend. After several attempts, I finally managed to rank #1 in this [MatchingParentheses](https://codefights.com/challenge/vjxo2WFyex6a85BrH) problem with one-line solution of only 77 chars(excludes whitespace).

Curtailing chars of solution is fun with little tricks. In the following I will show the tricks I used in this problem.

Here is the problem description:

    Given a string para, consisting of symbols '(', '[', '{', ')', ']', '}' and ' ', find out if it is a correct bracket sequence (CBS in short) with occasional whitespace (' ') characters. A CBS can be defined as follows:
    empty string ("") is a CBS;
    if S is a CBS, then (S), [S], {S} are CBSs;
    if S1, S2 are CBS, then S1S2 is a CBS.
    
    Example:
    MatchingParentheses("( )(( )){([( )])}") = true
    MatchingParentheses(")(") = false
    [input] string para
    A string of symbols '(', '[', '{', ')', ']', '}' and ' '.
    [output] boolean
    true if the given string is CBS, false otherwise.

Let me put my solution here. It is short and hard to understand. I will explain step by step how I get there.

    MatchingParentheses = f = lambda p,d=1:d and f(*re.subn('\(\)|{}|\[\]| ','',p)) or not p

First of my thought, stack would be a perfect way to solve this problem: push the element when left bracket appears and pop last element when matching right bracket appears. If the stack is empty at last, return True, otherwise False.

Before translating this procedure into code, think twice if there is simpler way. The answer is YES.

Instead of pushing and popping the element, can we directly delete adjacent matching parentheses? We delete repeatedly until the string is empty or we can't find parentheses to delete anymore. This way is quite straightforward:

    def MatchingParentheses(p):
        # d function deletes adjacent matching parentheses and whitespace
        def d(p):
            return re.sub('\(\)|{}|\[\]| ','',p)
        while p and p!=d(p):
            p = d(p)
        if p=='':
            return True
        else:
            return False

This solution is easy to understand with 125 chars. Then let's cut down the chars. 

##Lessen the return statement

We can absolutely lose the if-else statement and write just:

    return p==''

In Python, empty string has False value in bool type. This works too:

    return not p

##use subn() instead of sub

subn() return 2 arguments, first is the modified string and second is the times of modification. Then this solution becomes:

    def MatchingParentheses(p):
        # d function deletes adjacent matching parentheses and whitespace
        def d(p):
            return re.subn('\(\)|{}|\[\]| ','',p)
        n = 1
        while n:
            p,n= d(p)
        return not p

Since we only use d function once, there is no need to define it separately.

    def MatchingParentheses(p):
        # d function deletes adjacent matching parentheses and whitespace
        n = 1
        while n:
            p,n= re.subn('\(\)|{}|\[\]| ','',p)
        return not p

Now we have reduce this solution to 79 chars, but we still have room to go even further.

##Lambda function

Let's translate the whole function into lambda expression. Because lambda can only have one-line, we need to use recursion as an alternative to while loop.

    MatchingParentheses = lambda p,n=1:MatchingParentheses(re.subn('\(\)|{}|\[\]| ','',p)) if n else not p

We write MatchingParentheses twice, and that's a lot of chars! There is a little trick to save chars:

    MatchingParentheses = f = lambda p,n=1:f(*re.subn('\(\)|{}|\[\]| ','',p)) if n else not p

Now we have 78 chars, with only 1 char reduced after this big transformation...(So we really shouldn't write code like this if we are not in this shortest code competition.)

And can we reduce even more chars?

Answer is still YES!

##Ternary in Python

There is no ternary expression in Python like `(condition)? v1:v2`, instead we have `v1 if condition else v2`. But there is a **dangerous** way to use bool operation as a proxy of ternary expression: `condition and v1 or v2`. This is dangerous because this proxy is wrong when `v1` has possible `0` value. The right bool expression is: `(condition and [v1] or [v2])[0]`. In this problem, `v1 = f(*re.subn('\(\)|{}|\[\]| ','',p))` is a tuple of 2 values, so there is no chance `v1` equals to `0`. So we take a risk here and get our **final solution**:

    MatchingParentheses = f = lambda p,n=1:n and f(*re.subn('\(\)|{}|\[\]| ','',p)) or not p

Fortunately, this trick saves one more char for us. The final solution has 77 chars in total.

##Some takeaway

1. Never pursue writing shortest code in real practice.
2. Never overuse tricks.
3. Keep code readable and simple.

If you can write even shorter solution for this problem, welcome to leave a comment here. :)
