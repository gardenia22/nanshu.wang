---
date: 2015-02-17
description: ""
tags: ["机器学习","有监督学习","线性回归","logistic回归","正则化"]
title: "机器学习笔记4 正则化"
topics: []
draft: false
---
Andrew Ng cs229 Machine Learning 笔记

# 正则化 Regularization

为了和正规方程(normal equation)里"正规"区分开来，这里Regularization都译作“正则化”，有些地方也用的是“正规化”。以下内容来自[wikipedia](http://en.wikipedia.org/w/index.php?title=Regularization_(mathematics))：

正则化是指通过引入额外新信息来解决机器学习中过拟合问题的一种方法。这种额外信息通常的形式是模型复杂性带来的惩罚度。正则化的一种理论解释是它试图引入[奥卡姆剃刀原则](http://en.wikipedia.org/wiki/Occam%27s_razor)。而从贝叶斯的观点来看，正则化则是在模型参数上引入了某种先验的分布。
<!--more-->
机器学习中最常见的正则化是$L_1$和$L_2$正则化。正则化是在学习算法的损失(成本)函数$E(X,Y)$的基础上在加上一项正则化参数项：$E(X,Y)+\alpha|w|$，其中$w$是参数向量，$\alpha$是正则项的参数值，需要在实际训练中调整。正则化在许多模型中都适用，对于线性回归模型来说，采用$L_1$正则化的模型叫作lasso回归，采用$L_2$的叫作ridge回归。对于logistic回归，神经网络，支持向量机，随机条件场和一些矩阵分解方法，正则化也适用。在神经网络中，$L_2$正则化又叫作“权重衰减”(weight decay)。$L_1$正则化能产生稀疏模型，因此在特征选择中很有用，但是$L_1$范式不可微，所以需要在学习算法中修改，特别是基于梯度下降的算法。

# 过拟合问题

欠拟合(也叫做高偏差(high bias))是指不能很好地拟合数据，一般是因为模型函数太简单或者特征较少。过拟合问题是指过于完美拟合了训练集数据，而对新的样本失去了一般性，不能有效预测新样本，这个问题也叫做高方差(high variances)。造成过拟合的原因可能是特征量太多或者模型函数过于复杂。线性回归和logistic回归都存在欠拟合和过拟合的问题。

要解决过拟合的问题，通常有两种方法：

1. 减少特征数量

	* 手动筛选特征
	* 采用特征筛选算法

2. 正则化

	* 保留所有的特征，但尽可能使参数$\theta_j$尽量小。

正则化在很多特征变量对目标值只有很小影响的情况下非常有用。

# 成本函数

在原有的成本函数的基础上加上使参数$\theta_j$正则化的项：

<div>
$$\min \frac1{2m}(\sum_{i=1}^m (h_{\theta}(x^{(i)}-y^{(i)}) + \lambda \sum_{j=1}^n \theta_j^2))$$
</div>

其中$\lambda$叫做正则化参数，决定了参数正则化项的影响大小。引入正则化参数项，可以避免模型过拟合的问题。如果$\lambda$的值设置过大，可能会使模型函数出现欠拟合的问题。

# 正则化线性回归

## 梯度下降法

常数项$\theta_0$不用正则化，因此更新策略为：

<div>
\begin{align*}
& \text{Repeat}\ \lbrace \newline
& \ \ \ \ \theta_0 := \theta_0 - \alpha\ \frac{1}{m}\ \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_0^{(i)} \newline
& \ \ \ \ \theta_j := \theta_j - \alpha\ \left[ \left( \frac{1}{m}\ \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)} \right) + \frac{\lambda}{m}\theta_j \right] &\ \ \ \ \ \ \ \ \ \ j \in \lbrace 1,2...n\rbrace\newline
& \rbrace
\end{align*}
</div>

上面的式子可以写成：

<div>
$$\theta_j:=\theta_j(1 - \alpha \frac{\lambda}m)-\alpha (\frac1m \sum_{i=1}^m(h_{\theta}(x^{(i)}-y^{(i)})x_j^{(i)}) $$
</div>

注意到$(1 - \alpha \frac{\lambda}m) < 1$，直观上可以理解为将式子中第一项$\theta_j$值减小了一点，第二项还是和无正则化的更新策略的第二项一致。

## 正规方程

正则化正规方程求解$\theta$为：

<div>
\begin{align*}
& \theta = \left( X^TX + \lambda \cdot L \right)^{-1} X^Ty \newline
& \text{where}\ \ L = 
\begin{bmatrix}
 0 & & & & \newline
 & 1 & & & \newline
 & & 1 & & \newline
 & & & \ddots & \newline
 & & & & 1 \newline
\end{bmatrix}
\end{align*}
</div>

$L$是(n+1)*(n+1)的矩阵，除了右上角的值为0外，对角线上其他值都为1。直观上理解，不包括右上角$X_0$项，$L$是一个单位矩阵。

当$m\leq n$时，$X^TX$不可逆，但加入$\lambda L$后，$X^TX$也变得可逆了。

# 正则化logistic回归

## 成本函数

加上正则化参数$\theta$项：

<div>
$$J(\theta) = - \frac{1}{m} \sum_{i=1}^m \large[ y^{(i)}\ log (h_\theta (x^{(i)})) + (1 - y^{(i)})\ log (1 - h_\theta(x^{(i)}))\large] + \frac{\lambda}{2m}\sum_{j=1}^n \theta_j^2$$
</div>

注意$\sum_{j=1}^n \theta_j^2$中参数的下标时从1到n，没有包括常数项$\theta_0$

## 梯度下降

和线性回归一样，$\theta_0$和其他参数要分开更新：

<div>
	$$\begin{align*}
& \text{Repeat}\ \lbrace \newline
& \ \ \ \ \theta_0 := \theta_0 - \alpha\ \frac{1}{m}\ \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_0^{(i)} \newline
& \ \ \ \ \theta_j := \theta_j - \alpha\ \left[ \left( \frac{1}{m}\ \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)} \right) + \frac{\lambda}{m}\theta_j \right] &\ \ \ \ \ \ \ \ \ \ j \in \lbrace 1,2...n\rbrace\newline
& \rbrace
\end{align*}$$
</div>

这和正则化线性回归的更新策略是一样的。

