---
layout: post
title:  "Data Preprocessing, the basics to Machine Learning"
author: jazz
categories: [ Machine Learning ]
tags: [ Data Preprocessing ]
image: assets/images/data-preprocessing.jpg
---

To start with machine learning, learning how to handle data is key, since machine learning is driven by data.

## Importing the libraries

```py3
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
```

> Find out more about <a href="https://numpy.org/" target="_blank">`numpy`</a>, <a href="https://matplotlib.org/" target="_blank">`matplotlib`</a> and [`pandas`](https://pandas.pydata.org/)

## Importing the dataset

**Data.csv**

```csv
Country,Age,Salary,Purchased
France,44,72000,No
Spain,27,48000,Yes
Germany,30,54000,No
Spain,38,61000,No
Germany,40,,Yes
France,35,58000,Yes
Spain,,52000,No
France,48,79000,Yes
Germany,50,83000,No
France,37,67000,Yes
```

So we're going to separate the dataset into `matrix of features` and `dependent variable vectors`.

- `Matrix of features`: These are the columns which are being used to predict the dependent variable.
- `Dependent variable vectors`: The column that that is being predicted.

```py3
dataset = pd.read_csv('Data.csv')
x = dataset.iloc(:, :-1).values
y = dataset.iloc(:, -1).values
```

> **What does ’iloc’ exactly do?**
>
> It locates the column by its index. In other words, using ’iloc’ allows us to take columns by just taking their index.

> **Why do we create x and y separately?**
>
> Because we want to work with Numpy arrays, instead of Pandas dataframes. Numpy arrays are the most convenient format to work with when doing data preprocessing and building Machine Learning models. So we create two separate arrays, one that contains our independent variables (also called the input features), and another one that contains our dependent variable (what we want to predict).

`x` refers to the `matrix of features` which are actually the first 3 columns, **Conutry**, **Age** and **Salary**. And `y` is the `dependent variable vector` which will be predicted and is the last column **Purchased**. Hence, to further explain the code above, I'm using the `pandas` library to import **Data.csv** file and then using the `iloc` method which is available from the library to define the columns which are needed for `x` and `y` separately.

> To understand more about how the semicolon (`:`) works in python, check out this [`Stackoverflow`](https://stackoverflow.com/questions/509211/understanding-slice-notation) explanation.

```py3
print(x)
# [['France' 44.0 72000.0]
#  ['Spain' 27.0 48000.0]
#  ['Germany' 30.0 54000.0]
#  ['Spain' 38.0 61000.0]
#  ['Germany' 40.0 nan]
#  ['France' 35.0 58000.0]
#  ['Spain' nan 52000.0]
#  ['France' 48.0 79000.0]
#  ['Germany' 50.0 83000.0]
#  ['France' 37.0 67000.0]]

print(y)
# ['No' 'Yes' 'No' 'No' 'Yes' 'Yes' 'No' 'Yes' 'No' 'Yes']
```

## Taking care of missing data

There are 3 ways to handle missing data in any cell:

- Replace by *average (mean)*.
- Replace by *median*.
- Replace by *most frequent value*.

> Replacing missing values by average (mean) is the most classic and recommended way.

```py3
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
imputer.fit(x[:, 1:3])
x[:, 1:3] = imputer.transform(x[:, 1:3])
```

To handle missing data, we make use of the <a href="https://scikit-learn.org/stable/" target="_blank">`scikit-learn`</a> library.

> **What is the difference between fit and transform?**
>
> The fit part is used to extract some info of the data on which the object is applied (here, Imputer will spot the missing values and get the mean of the column). Then, the transform part is used to apply some transformation (here, Imputer will replace the missing value by the mean).

```py3
print(x)
# [['France' 44.0 72000.0]
#  ['Spain' 27.0 48000.0]
#  ['Germany' 30.0 54000.0]
#  ['Spain' 38.0 61000.0]
#  ['Germany' 40.0 63777.77777777778]
#  ['France' 35.0 58000.0]
#  ['Spain' 38.77777777777778 52000.0]
#  ['France' 48.0 79000.0]
#  ['Germany' 50.0 83000.0]
#  ['France' 37.0 67000.0]]
```

## Encoding categorical data

Encoding is a technique to convert string values into numerical values. Why is encoding needed? Since there are string values in the dataset, it will be difficult for machine learning model to compute some correlations between these columns.

### Encoding the Independent Variable

One idea would be to encode France into 0, Spain into 1 and Germany into 2. However the machine learning model would understand that because France is 0, Spain is 1 and Germany is 2, there is a numerical order between these countries. That is absolutely not the case. There is not a relationship order between these countries. We want to avoid to have such an interpretation for the model because that would cause some misinterpreted correlations between features and the prediction outcome. Hence a better technique would be `One hot encoding`.

For example, the country column would be turned into 3 columns because there are actually 3 different classes in the country column. So if there are 5 different countries in the country column, it would then be turned into 5 columns. `One hot encoding` consists of creating binary vectors for each of the countries. Hence, France would have the vector **1 0 0**, Spain would be **0 1 0**, and Germarny **0 0 1**. There would then be no numerical order between these countries.

> `One hot encoding` is extremely useful and popular method to use when the data sets contain categorical variables.

```py3
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], remainder='passthrough')
x = np.array(ct.fit_transform(x))

print(x)
# [[1.0 0.0 0.0 44.0 72000.0]
#  [0.0 0.0 1.0 27.0 48000.0]
#  [0.0 1.0 0.0 30.0 54000.0]
#  [0.0 0.0 1.0 38.0 61000.0]
#  [0.0 1.0 0.0 40.0 63777.77777777778]
#  [1.0 0.0 0.0 35.0 58000.0]
#  [0.0 0.0 1.0 38.77777777777778 52000.0]
#  [1.0 0.0 0.0 48.0 79000.0]
#  [0.0 1.0 0.0 50.0 83000.0]
#  [1.0 0.0 0.0 37.0 67000.0]]
```

> **What do the two ’fit_transform’ methods do?**
>
> When the ’fit_transform()’ method is called from the LabelEncoder() class, it transforms the categories strings into integers. For example, it transforms France, Spain and Germany into 0, 1 and 2. Then, when the ’fit_transform()’ method is called from the OneHotEncoder() class, it creates separate columns for each different labels with binary values 0 and 1. Those separate columns are the dummy variables.

### Encoding the Dependent Variable

```py3
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

print(y)
# [0 1 0 0 1 1 0 1 0 1]
```

## Splitting the dataset into the Training set and Test set

- **Training set**. Used to train the model.
- **Test Set**. Used to test the model performance.

The recommended ratio is *80%* of the dataset to be used for training and *20%* and test.

> **Why dataset spliting comes first and feature scale later?**
>
> Feature scaling is a technique to get the mean and standard deviation of the feature, so if we apply feature scaling before splitting, then it will actually get the mean and standard deviation of all the values including the ones in the test set and since the test set is not something we're supposed to have for data in production, it would then caused information leakage on the test set. Hence, tt is to prevent information leakage on the test set which we're not supposed to have until the training is done.


> **Why do we split on the dependent variable?**
>
> Because we want to have well distributed values of the dependent variable in the training and test set. For example if we only had the same value of the dependent variable in the training set, our model wouldn’t be able to learn any correlation between the independent and dependent variables.

```py3
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=1)

print(x_train)
# [[0.0 0.0 1.0 38.77777777777778 52000.0]
#  [0.0 1.0 0.0 40.0 63777.77777777778]
#  [1.0 0.0 0.0 44.0 72000.0]
#  [0.0 0.0 1.0 38.0 61000.0]
#  [0.0 0.0 1.0 27.0 48000.0]
#  [1.0 0.0 0.0 48.0 79000.0]
#  [0.0 1.0 0.0 50.0 83000.0]
#  [1.0 0.0 0.0 35.0 58000.0]]

print(x_test)
# [[0.0 1.0 0.0 30.0 54000.0]
#  [1.0 0.0 0.0 37.0 67000.0]]

print(y_train)
# [0 1 0 0 1 1 0 1]

print(y_test)
# [0 1]
```

## Feature Scaling

There are 2 ways to scale the features. And the most recommended way is `Standardisation`.

```text
Standardisation =  x - mean(+x) / standard deviation(x)
Normalisation = x - min(x) / max(x) = min(x)
```

- `Standardisation` will always work all the time (-3:+3, -2:+2 etc)
- `Normalisation` is recommend when you have a normal distribution in most of the features (0:1)

> **Do we have to apply feature scaling to the dummy variables in the matrix of features**
>
> No. The goal of standardisation or feature scaling in general is to have all the values of the features in the same range. Hence, if we apply standardisation to the dummy variables, we will get nonsense numerical values which will make it incapable to tell which couple of three values here correspond to the which country. And also the dummy variables are already in the same range as the scaling. Hence, only apply feature scaling to the numerical values.

```py3
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
x_train[:, 3:] = sc.fit_transform(x_train[:, 3:])

# Use the same scale as x_train and just transform the test to apply the forumla
x_test[:, 3:] = sc.transform(x_test[:, 3:])

print(x_train)
# [[0.0 0.0 1.0 -0.19159184384578545 -1.0781259408412425]
#  [0.0 1.0 0.0 -0.014117293757057777 -0.07013167641635372]
#  [1.0 0.0 0.0 0.566708506533324 0.633562432710455]
#  [0.0 0.0 1.0 -0.30453019390224867 -0.30786617274297867]
#  [0.0 0.0 1.0 -1.9018011447007988 -1.420463615551582]
#  [1.0 0.0 0.0 1.1475343068237058 1.232653363453549]
#  [0.0 1.0 0.0 1.4379472069688968 1.5749910381638885]
#  [1.0 0.0 0.0 -0.7401495441200351 -0.5646194287757332]]

print(x_test)
# [[0.0 1.0 0.0 -1.4661817944830124 -0.9069571034860727]
#  [1.0 0.0 0.0 -0.44973664397484414 0.2056403393225306]]
```
