---
date: 2015-03-15
description: ""
tags: ["python","numpy","统计","自相关系数"]
title: "python numpy 计算自相关系数"
topics: []
draft: false
---

在分析时间序列时，通常需要计算一个序列的自相关系数。自相关([Autocorrelation](http://en.wikipedia.org/wiki/Autocorrelation))又叫做序列相关，通常采用自相关系数来发现序列的重复规律，周期等信息。

我们有序列$X:x\_1,x\_2,x\_3,...,x\_n$，设$X\_{s,t}$为$s$时刻开始，$t$时刻结束的序列：$x\_s,x\_{s+1}...,x\_{t-1},x\_t$。$\mu\_{s,t}$为序列$X\_{s,t}$的均值，$\sigma\_{s,t}$为序列$X\_{s,t}$的标准差。那么一阶自相关系数为：
<!--more-->
<div>

$$R(1) = \frac{E(X_{2,n}-\mu_{2,n})(X_{1,n-1}-\mu_{1,n-1})}{\sigma_{2,n}\sigma_{1,n-1}}$$

</div>

同理$k$阶自相关系数为：

<div>

$$R(k) = \frac{E(X_{k+1,n}-\mu_{k+1,n})(X_{1,n-k}-\mu_{1,n-k})}{\sigma_{k+1,n}\sigma_{1,n-k}}$$

</div>

python的numpy库里没有直接计算序列自相关系数的函数，但有计算两个不同序列的相关系数函数： [correlate](http://docs.scipy.org/doc/numpy/reference/generated/numpy.correlate.html)。给定两个序列$X,Y$，correlation(X,Y) = $\sum XY$。可以利用correlate函数计算$X$的自相关性：

```python
def autocorrelation(x,lags):#计算lags阶以内的自相关系数，返回lags个值，分别计算序列均值，标准差
	n = len(x)
	x = numpy.array(x)
	result = [numpy.correlate(x[i:]-x[i:].mean(),x[:n-i]-x[:n-i].mean())[0]\
		/(x[i:].std()*x[:n-i].std()*(n-i)) \
		for i in range(1,lags+1)]
	return result
```


通常在实际中，很多时间序列的均值和标准受时间变化的影响较小，可以看作是恒定的，此时：

<div>

$$R(k) = \frac{E(X_{k+1,n}-\mu)(X_{1,n-k}-\mu)}{\sigma^2}$$

</div>

同样可以利用correlate函数实现：

```python
def autocorrelation(x,lags):#计算lags阶以内的自相关系数，返回lags个值，将序列均值、标准差视为不变
	n = len(x)
	x = numpy.array(x)
	variance = x.var()
	x = x-x.mean()
	result = numpy.correlate(x, x, mode = 'full')[-n+1:-n+lags+1]/\
		(variance*(numpy.arange(n-1,n-1-lags,-1)))
	return result
```

参考：http://stackoverflow.com/questions/643699/how-can-i-use-numpy-correlate-to-do-autocorrelation