---
layout: post
title:  "House Thief Problem"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
---

There are **n** houses built in a line, each containing some value. A thief is going to steal the **maximum** value from these houses. However, he can't steal in **2 adjacent** houses. What is the maximum stolen value?

```text
Example 1
-----------
n: [6, 7, 1, 30, 8, 2, 4]
max value: 41
Explanation: Thief will steal from houses with 7, 30, 4.
```

```text
Example 2
-----------
n: [20, 5, 1, 13, 6, 11, 40]
max value: 73
Explanation: Thief will steal from houses with 20, 13, 40.
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving this subproblems, we will arrive at our final answer. Let's look at **Example 1** and try to derive the subproblems.

```text
f(7 houses) = max of [6 + f(remaining 5 houses)] or [0 + f(6 remaining 6 houses)]
```

So, what the above subproblems are saying is that, since we can't steal from two adjacent houses, the thief can either steal from the first house, and then skip the second house and move on to the other remaining 5 houses given that we have 7 houses in total. Hence `6 + f(remaining 5 houses)`. Or, the thief can skip the first house and steal from the remaining 6 houses, and hence, `0 + f(remaining 6 houses)`. We're looking for the maximum value which the thief can steal. Therefore, we want to find the maximum value returned from the two subproblems.

## Code Algortihm

```py3
def steal_money(n: List[int], i: int) -> int:
    if i >= len(n):
      return 0

    money1 = n[i] + steal_money(n, i+2)
    money2 = steal_money(n, i+1)

    return max(money1, money2)
```

## Optimisation

Let's look at the an example of the **recursion tree** to examine whether we need to optimise it.

<pre class="p-5 text-white bg-dark">
                                                        steal_money(0)
                                                      /                 \
                                                  /                         \
                                              /                                 \
                                          /                                         \
                                      /                                                 \
                                steal_money(2)                                        steal_money(1)
                        /                           \                                 /             \
                steal_money(4)                  steal_money(3)                   steal_money(3)   steal_money(2)
                /             \                 /           \                    /            \
          steal_money(6)  steal_money(5)  steal_money(5)  steal_money(4)   steal_money(5)   steal_money(4)
        /             \
steal_money(8)    steal_money(7)
</pre>

We can see from the above recursion tree that `steal_money(3)`, `steal_money(4)` and `steal_money(5)` have been computed multiple times. Hence, we can apply `Dynamic Programming` to optimise this solution.

### Top Down Approach

We will start off by applying `Top Down Approach` (also known as `Memoization`).

```py3
dp = {}

def steal_money(n: List[int], i: int) -> int:
    if i >= len(n):
      return 0

    if i not in dp:
      money1 = n[i] + steal_money(n, i+2)
      money2 = steal_money(n, i+1)
      dp[i] = max(money1, money2)

    return dp[i]
```

### Bottom Up Approach

We can now then apply some reverse engineer to use the `Bottom Up Approach` (also known as `Tabulation`). Let's visualise how **dp** is filled using `Top Down Approach`.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
    <thead>
      <tr>
        <th rowspan="2">Iteration</th>
        <th colspan="8">Steal Money</th>
      </tr>
      <tr>
        <th>DP0</th>
        <th>DP1</th>
        <th>DP2</th>
        <th>DP3</th>
        <th>DP4</th>
        <th>DP5</th>
        <th>DP6</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>2.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>3.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>4.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>5.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>6.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>7.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-warning">max(H5+DP[7],DP[6])</td>
        <td class="bg-danger">?</td>
      </tr>
      <tr>
        <td>8.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-warning">max(H5+DP[7],DP[6])</td>
        <td class="bg-warning">max(H6+DP[8],DP[7])</td>
      </tr>
       <tr>
        <td>9.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-warning">max(H5+DP[7],DP[6])</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>10.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>11.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>12.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>13.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>14.</td>
        <td class="bg-warning">max(H0+DP[2],DP[1])</td>
        <td class="bg-success">max(7+34,34)=41</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
      </tr>
      <tr>
        <td>15.</td>
        <td class="bg-success">max(6+34,41)=41</td>
        <td class="bg-success">max(7+34,34)=41</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
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
        <th colspan="8">Steal Money</th>
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
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H6+DP[8],DP[7])</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>3.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H5+DP[7],DP[6])</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>3.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>4.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H4+DP[6],DP[5])</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>5.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>6.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H3+DP[5],DP[4])</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>7.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>8.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H2+DP[4],DP[3])</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>9.</td>
        <td class="bg-danger">?</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>10.</td>
        <td class="bg-danger">?</td>
        <td class="bg-warning">max(H1+DP[3],DP[2])</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>11.</td>
        <td class="bg-danger">?</td>
        <td class="bg-success">max(7+34,34)=41</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>12.</td>
        <td class="bg-success">max(6+34,41)=41</td>
        <td class="bg-success">max(7+34,34)=41</td>
        <td class="bg-success">max(1+12,34)=34</td>
        <td class="bg-success">max(30+4,12)=34</td>
        <td class="bg-success">max(8+4,4)=12</td>
        <td class="bg-success">max(2+0,4)=4</td>
        <td class="bg-success">max(4+0,0)=4</td>
        <td>0</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</div>

```py3
def steal_money(n: List[int]) -> int:
  dp = {}

  for i in range(len(n)+1, -1, -1):
    if i > len(n) - 1:
      dp[i] = 0
    else:
      dp[i] = max(n[i] + dp[i+2], dp[i+1])

  return dp[0]
```
