---
Tags:
  - 机器学习
  - scikit-learn
  - 翻译
  - Python
Title: Scikit-Learn机器学习介绍（中文翻译）
date: 2014-12-02
---


翻译自：http://scikit-learn.org/stable/tutorial/basic/tutorial.html

以后可能会根据自己的学习慢慢翻译其他的章节，水平有限，不足之处请指正。

> 本章内容
在本章中，我们会介绍在使用scikit-learn中遇到的[机器学习][1](machine learning)术语，以及一个简单的机器学习例子。


## 机器学习：问题设定
-------------------------------------

一般来说，机器学习问题可以这样来理解：我们有n个[样本][2](sample)的数据集，想要预测未知数据的属性。<!--more-->
如果描述每个样本的数字不只一个，比如一个多维的条目（也叫做[多变量数据][3](multivariate data)），那么这个样本就有多个属性或者**特征**。
我们可以将学习问题分为以下几类：

* [有监督学习][4](unsupervised learning)是指数据中包括了我们想预测的属性，有监督学习问题有以下两类：
    * [分类][5]（classification）:样本属于两个或多个类别，我们希望通过从已标记类别的数据学习，来预测未标记数据的分类。例如，识别手写数字就是一个分类问题，其目标是将每个输入向量对应到有穷的数字类别。从另一种角度来思考，分类是一种有监督学习的离散（相对于连续）形式，对于n个样本，一方有对应的有限个类别数量，另一方则试图标记样本并分配到正确的类别。

    * [回归][6](regression):如果希望的输出是一个或多个连续的变量，那么这项任务被称作*回归*，比如用年龄和体重的函数来预测三文鱼的长度。

* [无监督学习][7](unsupervised learning)的训练数据包括了输入向量X的集合，但没有相对应的目标变量。这类问题的目标可以是发掘数据中相似样本的分组，被称作[聚类][8](Clustering)；也可以是确定输入样本空间中的数据分布，被称作[密度估计][9]（density estimation）;还可以是将数据从高维空间投射到两维或三维空间，以便进行数据可视化。[这里][10]是Scikit-Learn的无监督学习主页。


> 训练集和测试集
机器学习是关于如何从数据学习到一些属性并且用于新的数据集。这也是为什么机器学习中评估算法的一个习惯做法是将手头已有的数据集分成两部分：一部分我们称作**训练集**（training set），用来学习数据的属性；另一部分叫做**测试集**（testing set），用来测试这些属性。
    
## 加载样例数据集
--------------------------

scikit-learn有一些标准数据集，比如用于分类的[iris][11]和[digits][12]数据集，和用于回归的[波士顿房价][13](boston house prices)数据集。
下面，我们会用shell里的Python解释器来加载``iris``和``digits``数据集。``$``表示shell提示符，``>>>``表示Python解释器提示符：

      $ python
      >>> from sklearn import datasets
      >>> iris = datasets.load_iris()
      >>> digits = datasets.load_digits()

数据集类似字典对象，包括了所有的数据和关于数据的元数据（metadata）。数据被存储在`.data`成员内，是一个``n_samples*n_features``的数组。在有监督问题的情形下，一个或多个因变量（response variables）被储存在``.target``成员中。有关不同数据集的更多细节可以在[这里][14]被找到。
例如，在digits数据集中，``digits.data``是可以用来分类数字样本的特征：

      >>> print(digits.data)  # doctest: +NORMALIZE_WHITESPACE
      [[  0.   0.   5. ...,   0.   0.   0.]
       [  0.   0.   0. ...,  10.   0.   0.]
       [  0.   0.   0. ...,  16.   9.   0.]
       ...,
       [  0.   0.   1. ...,   6.   0.   0.]
       [  0.   0.   2. ...,  12.   0.   0.]
       [  0.   0.  10. ...,  12.   1.   0.]]


``digits.target``给出了digits数据集的真实值，即每个数字图案对应的我们想预测的真实数字：

      >>> digits.target
      array([0, 1, 2, ..., 8, 9, 8])

> 数据数组的形式
数据是一个2维``n_samples*n_features``的数组，尽管原始数据集可能会有不同的形式。在digits数据集中，每个原始样本是一个8*8的数组，可以用以下方式访问：

        >>> digits.images[0]
        array([[  0.,   0.,   5.,  13.,   9.,   1.,   0.,   0.],
             [  0.,   0.,  13.,  15.,  10.,  15.,   5.,   0.],
             [  0.,   3.,  15.,   2.,   0.,  11.,   8.,   0.],
             [  0.,   4.,  12.,   0.,   0.,   8.,   8.,   0.],
             [  0.,   5.,   8.,   0.,   0.,   9.,   8.,   0.],
             [  0.,   4.,  11.,   0.,   1.,  12.,   7.,   0.],
             [  0.,   2.,  14.,   5.,  10.,  12.,   0.,   0.],
             [  0.,   0.,   6.,  13.,  10.,   0.,   0.,   0.]])


> [这个简单的例子][15]说明了如何从原始问题里将数据形式化，以便scikit-learn使用。


## 学习和预测
------------------------
在digits数据集中，我们的任务是给定一个图案，预测其表示的数字是什么。我们的样本有10个可能的分类（数字0到9)，我们将拟合一个[预测器][16](estimator)来**预测**(predict)未知样本所属的分类。
在scikit-learn中，分类的预测器是一个Python对象，来实现``fit(X, y)``和 ``predict(T)``方法。
下面这个预测器的例子是class``sklearn.svm.SVC``，实现了[支持向量机分类][17]。创建分类器需要模型参数，但现在，我们暂时先将预测器看作是一个黑盒：

    
      >>> from sklearn import svm
      >>> clf = svm.SVC(gamma=0.001, C=100.)

> 选择模型参数
在这个例子里我们手动设置了``gamma``值。可以通过这些工具例如[网格搜索][18]（grid search）和[交叉验证][19]（cross validation）来自动找到参数的最佳取值。

给预测器取个名字叫做``clf``（claasifier）。现在预测器必须来**拟合**（fit）模型，也就是说，它必须从模型中**学习**（learn）。这个过程是通过将训练集传递给``fit``方法来实现的。我们将除了最后一个样本的数据全部作为训练集。通过Python语法``[:-1]``来选择训练集，这会生成一个新的数组，包含了除最后一个条目的``digits.data``：

      >>> clf.fit(digits.data[:-1], digits.target[:-1])  # doctest: +NORMALIZE_WHITESPACE
      SVC(C=100.0, cache_size=200, class_weight=None, coef0=0.0, degree=3,
        gamma=0.001, kernel='rbf', max_iter=-1, probability=False,
        random_state=None, shrinking=True, tol=0.001, verbose=False)

现在你可以预测新值了，具体来说，我们可以询问分类器，``digits``数据集里最后一个图案所代表的数字是什么，我们并没有用最后一个数据来训练分类器。

      >>> clf.predict(digits.data[-1])
      array([8])

最一个图案如下：
![此处输入图片的描述][20]

如你所见，这项任务很具有挑战性：这个图案的分辨率很差。你能和分类器得到一致结果吗？
一个更复杂的分类问题的例子在这里:[识别手写数字][21]（Recognizing hand-written digits），供学习参考。



## 模型持久性（Model persistence）
-----------------

可以采用Python内建的持久性模型[pickle][22]来保存scikit的模型:

      >>> from sklearn import svm
      >>> from sklearn import datasets
      >>> clf = svm.SVC()
      >>> iris = datasets.load_iris()
      >>> X, y = iris.data, iris.target
      >>> clf.fit(X, y)  # doctest: +NORMALIZE_WHITESPACE
      SVC(C=1.0, cache_size=200, class_weight=None, coef0=0.0, degree=3, gamma=0.0,
        kernel='rbf', max_iter=-1, probability=False, random_state=None,
        shrinking=True, tol=0.001, verbose=False)
  
      >>> import pickle
      >>> s = pickle.dumps(clf)
      >>> clf2 = pickle.loads(s)
      >>> clf2.predict(X[0])
      array([0])
      >>> y[0]
      0

在scikit的特定情形下，用joblib's来代替pickle（``joblib.dump`` & ``joblib.load``）会更吸引人，在大数据下效率更高，但只能pickle到磁盘而不是字符串：

      >>> from sklearn.externals import joblib
      >>> joblib.dump(clf, 'filename.pkl') # doctest: +SKIP
  
你可以在之后重新加载pickled模型（可以在另一个Python程序里）：
  
      >>> clf = joblib.load('filename.pkl') # doctest:+SKIP

> 注意：
joblib.dump返回一个文件名列表。每个包含在``clf``对象中独立的numpy数组是在文件系统中是按顺序排列的一个独立文件。当用joblib.load重新加载模型时，所有文件必须在同一个目录下。

注意pickle有一些安全性和维护性问题。请参考[模型持久性][23]章节获得更多关于scikit-learn模型持久性的信息。


  [1]: http://en.wikipedia.org/wiki/Machine_learning
  [2]: http://en.wikipedia.org/wiki/Sample_(statistics)
  [3]: http://en.wikipedia.org/wiki/Multivariate_random_variable
  [4]: http://en.wikipedia.org/wiki/Supervised_learning
  [5]: http://en.wikipedia.org/wiki/Classification_in_machine_learning
  [6]: http://en.wikipedia.org/wiki/Regression_analysis
  [7]: http://en.wikipedia.org/wiki/Unsupervised_learning
  [8]: http://en.wikipedia.org/wiki/Cluster_analysis
  [9]: http://en.wikipedia.org/wiki/Density_estimation
  [10]: http://scikit-learn.org/stable/unsupervised_learning.html#unsupervised-learning
  [11]: http://en.wikipedia.org/wiki/Iris_flower_data_set
  [12]: http://archive.ics.uci.edu/ml/datasets/Pen-Based+Recognition+of+Handwritten+Digits
  [13]: http://archive.ics.uci.edu/ml/datasets/Housing
  [14]: http://scikit-learn.org/stable/datasets/index.html#datasets
  [15]: http://scikit-learn.org/stable/auto_examples/plot_digits_classification.html#example-plot-digits-classification-py
  [16]: http://en.wikipedia.org/wiki/Estimator
  [17]: http://en.wikipedia.org/wiki/Support_vector_machine
  [18]: http://scikit-learn.org/stable/modules/grid_search.html#grid-search
  [19]: http://scikit-learn.org/stable/modules/cross_validation.html#cross-validation
  [20]: http://scikit-learn.org/stable/_images/plot_digits_last_image_0011.png
  [21]: http://scikit-learn.org/stable/auto_examples/plot_digits_classification.html#example-plot-digits-classification-py
  [22]: http://docs.python.org/library/pickle.html
  [23]: http://scikit-learn.org/stable/modules/model_persistence.html#model-persistence