---
date: 2015-02-12
description: ""
tags: ["机器学习","有监督学习","线性回归","logistic回归","分类"]
title: "机器学习笔记3 有监督学习 分类 logistic回归"
topics: []
draft: false
url: /post/2015-02-12
---
Andrew Ng cs229 Machine Learning 笔记

# 分类问题

分类问题和回归问题不同的是，分类问题的预测值$y$只能取离散值，而非连续值。首先来看一个二类分类问题，预测值$y$只能取0或1。0又被称作负例(negative class)，1被称作正例(positive class)。通常也用"-","+"符号来表示。对于一个样本集输入$x^{(i)}$，对应的目标值$y^{(i)}$也被为标注(lable)。

## logistic回归
也可以用线性回归的方法运用到分类问题上，但是这样做很容易得到不好的结果。稍微改变一下我们的假设函数$h_\theta(x)$，使其的取值在{0,1}范围内：

<!--more-->

<div>
$$h_\theta(x) = g(\theta^Tx)=\frac1{1+e^{-\theta^Tx}}$$
$$g(z)=\frac1{1+e^{-z}}$$
</div>

$g(z)$叫做logistic函数，也叫做sigmoid函数。$g(z)$的函数图像如下：

{{% img src="/media/logistic-function.png" alt="logistic-function" %}}

当$z\rightarrow \infty$时，$g(z)$趋近于1；当$z\rightarrow -\infty$时，$g(z)$趋近于0。因此$h(x)$的取值在0到1范围内。

求$g(z)$的导数可得：

<div>
$$g'(z)=g(z)(1-g(z))$$
</div>

下面是对分类问题作出的一些假设，预测函数$h_\theta(x)$将给出样本目标值分类为1的概率：

<div>
$$P(y=1|x;\theta) = h_{\theta}(x)$$
$$P(y=0|x;\theta) = 1-h_{\theta}(x)$$
$$p(y|x;\theta) = (h_{\theta}(x)^y(1-h_{\theta}(x)^{1-y}))$$
</div>

那么$\theta$的似然函数为：

<div>
$$\begin{equation}
\begin{split}
L(\theta) =& p(\overrightarrow y|X;\theta)\\
=& \Pi_{i=1}^m p(y^{(i)}|x^{(i)};\theta)\\
=& \Pi_{i=1}^m (h_\theta(x^{(i)})^{y^{(i)}}(1-h_{\theta}(x^{(i)}))^{1-y^{(i)}})
\end{split}
\end{equation}$$
</div>

求log似然函数:

<div>
$$l(\theta)=\log L(\theta)=\sum_{i=1}^m y^{(i)}\log h(x^{(i)})+(1-y^{(i)})\log (1-h(x^{(i)}))$$
</div>

求最大似然估计，同样可以采用梯度下降的方法，更新$\theta$：

<div>
$$\theta:=\theta+\alpha \nabla_\theta l(\theta)$$
</div>

这里是求最大值，因此更新$\theta$是加上$l(\theta)$的偏导。

解之得到：

<div>
$$\theta_j:=\theta_j+\alpha (y^{(i)}-h_\theta(x^{(i)}))x_j^{(i)}$$
</div>

这和之前在线性回归模型得到的LMS更新策略一样，这并不是巧合，而是因为线性回归和logistic回归都属于广义线性模型(GLM models)。


## perceptron学习算法
有趣的是，如果这里不采用logistic函数，而是采用一种简单粗暴的只考虑阈值的函数g(z)：

<div>
$$g(z) = \begin{cases}1,if z\geq 0\\0,if z < 0\end{cases}$$
</div>

我们得到的更新$\theta$的策略和采用logistic函数得到的策略是一致。这种算法叫做感知器(perceptron)学习算法，感知器原指一种用来刻画大脑神经元的粗糙模型。虽然表面上看这种简单粗暴的方式和其他算法得到的结果是一样的，但是这是一种和logistic回归以及最小二乘线性回归非常不同的一类算法，它不能推导出有意义的概率解释，也不能通过极大似然估计得到。

## 牛顿法

为了求$f(\theta)=0$时$\theta$的取值，牛顿法每次更新$\theta$：

<div>
$$\theta:=\theta-\frac{f(\theta)}{f'(\theta)}$$
</div>

要最大化似然函数$l(\theta)$的值，使其导数$l'(\theta)＝0$。更新策略为：

<div>
$$\theta:=\theta-\frac{l'(\theta)}{l''(\theta)}$$
</div>

当$\theta$为向量时，推广更一般的牛顿法，这种方法也叫做牛顿－拉普森法(Newton-Raphson method)：

<div>
$$\theta:=\theta-H^{-1} \nabla_\theta l(\theta)$$
</div>

$\nabla_\theta l(\theta)$是$l(\theta)$对于$\theta$的偏导。$H$是$(n+1)*(n+1)$的矩阵，叫做Hessian：

<div>
$$H_{ij}=\frac{\delta^2 l(\theta)}{\delta \theta_i \delta \theta_j}$$
</div>

牛顿法收敛的速度通常比批量梯度下降要快，但是牛顿法每次迭代的计算量更大，每次迭代重新计算Hessian矩阵，需要$O(n^2)$的时间复杂度。但在n没有很大的情况下，牛顿法是更有效率的。将牛顿法用于logistic回归的log似然函数$l(\theta)$得到的方法也被称为Fisher scoring。