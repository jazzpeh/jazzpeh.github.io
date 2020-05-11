---
layout: post
title:  "Number Factor Problem"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
image: assets/images/number-factor.jpg
---

Given **N**, count the number of ways to express N as sum of **1,3 and 4**.

```text
Example 1
-----------
n: 4
num of ways: 4
Explanation: There are four ways to express 'n': {4}, {1,3}, {3,1}, {1,1,1,1}
```

```text
Example 2
-----------
n: 5
num of ways: 6
Explanation: There are six ways to express 'n': {4,1}, {1,4}, {3,1,1}, {1,3,1}, {1,1,3}, {1,1,1,1,1}
```

## Solution

This problem can be solved by applying `Divide and Conquer` algorithm techniques. Firstly, let's try to break the problem into smaller subproblems. Since we are given 3 numbers, {1,3,4}, let's try to find the complements of those numbers and also the number of ways to form those complements. We will use the example where **N = 5**:

```text
n = 5

1 | + 4 = {1,1,1,1}, {1,3}, {3,1}, {4} = 4 ways
3 | + 2 = {1,1} = 1 way
4 | + 1 = {1} = 1 way

num of ways: 4 + 1 + 1 = 6
```

By solving the subproblems, we arrive at the final result by getting the sum of all the answers to the subproblems.

## Code Algorithm

```py3
def num_ways(n: int) -> int:
    if n == 0 or n == 1 or n == 2:
      return 1
    if n == 3:
      return 2

    comp1: int = num_ways(n-1)
    comp2: int = num_ways(n-3)
    comp3: int = num_ways(n-4)

    return comp1 + comp2 + comp3
```

## Optimisation

Let's look at the an example of the **recursion tree** using **N = 8** for a larger recursive tree and see if we can optimise this solution.

<pre class="p-5 text-white bg-dark">
                  num_ways(8)
      /               |                   \
num_ways(7)        num_ways(5)        num_ways(4)
  |                   |                   |
  |-num_ways(6)       |-num_ways(4)       |-num_ways(3)
  |-num_ways(4)       |-num_ways(2)       |-num_ways(1)
  |-num_ways(3)       |-num_ways(1)       |-num_ways(0)
</pre>

We are computing a new of the subproblems more than once such as `num_ways(4)`. We can then apply `Dynamic Programming` to optimise the solution.

### Top Down Approach

We will start off by applying `Top Down Approach` (also known as `Memoization`).

```py3
dp = {}

def num_ways(n: int) -> int:
  if n == 0 or n == 1 or n == 2:
    return 1
  if n == 3:
    return 2

  if n not in dp:
    comp1: int = num_ways(n-1)
    comp2: int = num_ways(n-3)
    comp3: int = num_ways(n-4)
    dp[n] = comp1 + comp2 + comp3

  return dp[n]
```

### Bottom Up Approach

We can now then apply some reverse engineer to use the `Bottom Up Approach` (also known as `Tabulation`). Let's visualise how **dp** is filled using `Top Down Approach`.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
    <thead>
      <tr>
        <th rowspan="2">Iteration</th>
        <th colspan="9">Num of ways</th>
      </tr>
      <tr>
        <th>DP0</th>
        <th>DP1</th>
        <th>DP2</th>
        <th>DP3</th>
        <th>DP4</th>
        <th>DP5</th>
        <th>DP6</th>
        <th>DP7</th>
        <th>DP8</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>4.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">DP4+DP2+DP1</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>5.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-warning">DP3+DP1+DP0</td>
        <td class="bg-warning">DP4+DP2+DP1</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>6.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-warning">DP4+DP2+DP1</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>7.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>8.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>9.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-success">9+4+2=15</td>
        <td class="bg-warning">DP7+DP5+DP4</td>
      </tr>
      <tr>
        <td>10.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-success">9+4+2=15</td>
        <td class="bg-success">15+6+4=25</td>
      </tr>
    </tbody>
  </table>
</div>

We can then now reverse the process. Let's visualize how `Bottom Up Approach` works here.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
    <thead>
      <tr>
        <th rowspan="2">Iteration</th>
        <th colspan="9">Num of ways</th>
      </tr>
      <tr>
        <th>DP0</th>
        <th>DP1</th>
        <th>DP2</th>
        <th>DP3</th>
        <th>DP4</th>
        <th>DP5</th>
        <th>DP6</th>
        <th>DP7</th>
        <th>DP8</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>1.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-warning">DP3+DP1+DP0</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-warning">DP4+DP2+DP1</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>4.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>5.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-warning">DP5+DP3+DP2</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>6.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>7.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-warning">DP6+DP4+DP3</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>8.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-success">9+4+2=15</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>9.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-success">9+4+2=15</td>
        <td class="bg-warning">DP7+DP5+4</td>
      </tr>
      <tr>
        <td>9.</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="bg-success">2+1+1=4</td>
        <td class="bg-success">4+1+1=6</td>
        <td class="bg-success">6+2+1=9</td>
        <td class="bg-success">9+4+2=15</td>
        <td class="bg-success">15+6+4=25</td>
      </tr>
    </tbody>
  </table>
</div>

```py3
def num_ways(n: int) -> int:
  dp = {
    0: 1,
    1: 1,
    2: 1,
    3: 2
  }

  for i in range(4, n+1):
    dp[i] = dp[i-1] + dp[i-3] + dp[i-4]

  return dp[n]
```
