---
layout: post
title:  "Convert One String to Another Problem"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
image: assets/images/convert-one-string-to-another.jpg
---

Given strings **s1** and **s2**, convert s2 into s1 by deleting, inserting or replacing characters. Find out the minimum number of edit operations.

```text
Example 1
-----------
s1: "catch"
s2: "carch"
output: 1
Explanation: Replace 'r' with 't'.
```

```text
Example 2
-----------
s1: "table"
s2: "tbres"
Explanation: Insert 'a' at second position, replace 'r' with 'l' and delete 's'.
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's look at **Example 2** and try to derive the subproblems.

```text
Delete
---------
s1 = "table"  --|-- f(2,3) ---|--- min
s2 = "tgable" --|             |
                              |
Insert                        |
---------                     |
s1 = "table" --|-- f(3,2)   --|
s2 = "tble"  --|              |
                              |
Replace                       |
---------                     |
s1 = "table" --|-- f(3,3)   --|
s2 = "tcble" --|              |
```

So, what the derived above subproblems, we know that there will be 3 operations, **Insert**, **Replace** and **Delete**. Hence, we explore how each operations will then move on to the next subproblem.

If it is a delete operation, we will stay on the same index for **s1** and increment the index for **s2** and hence, `f(2,3)`.

For an insert operation, we should increment the index for **s1** and stay on the same index for **s2** since logically the length of **s2** will increase by 1 and hence, `f(3,2)`.

For replace operation, we should increment both the indexes for **s1** and **s2** since we then assume the current character is now identical after the replacement.

Lastly, getting the minimum of the 3 subproblems will get us to the final answer.

## Code Algortihm

```py3
def min_ops(s1: str, s2: str, i1: int, i2: int) -> int:
    if i1 == len(s1):
      return len(s2)-i2

    if i2 == len(s2):
      return len(s1)-i1

    if s1[i1] == s2[i2]:
      return min_ops(s1, s2, i1+1, i2+1)

    insert = 1 + min_ops(s1, s2, i1+1, i2)
    replace = 1 + min_ops(s1, s2, i1+1, i2+1)
    delete = 1 + min_ops(s1, s2, i1, i2+1)

    return min(insert, replace, delete)
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                  min_ops(0,0)
      /               |                   \
min_ops(1,0)        min_ops(0,1)        min_ops(1,1)
  |                   |                   |
  |-min_ops(2,0)      |-min_ops(1,1)      |-min_ops(2,1)
  |-min_ops(1,1)      |-min_ops(0,2)      |-min_ops(1,2)
  |-min_ops(2,1)      |-min_ops(1,2)      |-min_ops(2,2)
</pre>

We are computing a new of the subproblems more than once such as `min_ops(1,1)` and `min_ops(2,1)`. We can then apply `Dynamic Programming` to optimise the solution.

### Top Down Approach

We will start off by applying `Top Down Approach` (also known as `Memoization`).

```py3
dp = {}

def min_ops(s1: str, s2: str, i1: int, i2: int) -> int:
    if (i1, i2) not in dp:
      if i1 == len(s1):
        dp[i1, i2] = len(s2)-i2
      elif i2 == len(s2):
        dp[i1, i2] = len(s1)-i1
      elif s1[i1] == s2[i2]:
        dp[i1, i2] = min_ops(s1, s2, i1+1, i2+1)
      else:
        insert = 1 + min_ops(s1, s2, i1+1, i2)
        replace = 1 + min_ops(s1, s2, i1+1, i2+1)
        delete = 1 + min_ops(s1, s2, i1, i2+1)

        dp[i1, i2] = min(insert, replace, delete)

    return dp[i1, i2]
```

### Bottom Up Approach

We can now then apply some reverse engineer to use the `Bottom Up Approach` (also known as `Tabulation`). Let's visualise how **dp** is filled using `Top Down Approach`.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
    <thead>
      <tr>
        <th colspan="2" rowspan="2"></th>
        <th>B1</th>
        <th>B2</th>
        <th>B3</th>
        <th>B4</th>
        <th>B5</th>
        <th>B6</th>
      </tr>
      <tr>
        <th>T</th>
        <th>A</th>
        <th>B</th>
        <th>L</th>
        <th>E</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>A1</th>
        <th>T</th>
        <td class="bg-success">A2B2</td>
        <td>?</td>
        <td>?</td>
        <td>?</td>
        <td>?</td>
        <td></td>
      </tr>
      <tr>
        <th>A2</th>
        <th>B</th>
        <td>?</td>
        <td>1+min(A3B2,A2B3,A3B3)</td>
        <td>A3B4</td>
        <td>?</td>
        <td>?</td>
        <td></td>
      </tr>
      <tr>
        <th>A3</th>
        <th>R</th>
        <td>?</td>
        <td>1+min(A4B2,A3B3,A4B3)</td>
        <td>1+min(A5B4,A4B5,A5B5)</td>
        <td>1+min(A4B4,A3B5,A4B5)</td>
        <td>1+Min(A4B5,A3B6,A4B6)</td>
        <td class="bg-primary">3</td>
      </tr>
      <tr>
        <th>A4</th>
        <th>E</th>
        <td>?</td>
        <td>1+min(A5B2,A5B3,A5B3)</td>
        <td>1+min(A5B3,A4B4,A5B4)</td>
        <td>1+min(A5B4,A4B5,A5B5)</td>
        <td>A5B6</td>
        <td class="bg-primary">2</td>
      </tr>
      <tr>
        <th>A5</th>
        <th>S</th>
        <td>?</td>
        <td>1+min(A6B2,A6B3,A6B3)</td>
        <td>1+min(A6B3,A5B4,A6B4)</td>
        <td>1+min(A6B4,A5B5,A6B5)</td>
        <td>1+min(A6B5,A5B6,A6B6)</td>
        <td class="bg-primary">1</td>
      </tr>
      <tr>
        <th>A6</th>
        <th></th>
        <td></td>
        <td class="bg-info">4</td>
        <td class="bg-primary">3</td>
        <td class="bg-primary">2</td>
        <td class="bg-primary">1</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</div>

We then need to find where the first solution of the subproblem starts. And this is actually the `A6B2` cell. And then the base solutions start to move to all the `A6` and `B6` cells. Finally, it slowlys move towards the subproblems that doesn't have an answer and then to cell `A1B1` where we will arrive at our final answer.

```py3
def min_ops(s1: str, s2: str) -> int:
  dp = {}

  for i1 in range(len(s1)-1):
    dp[i1, 0] = i1

  for i2 in range(len(s2)-1):
    dp[0, i2] = i2

  for i1 in range(1, len(s1)):
    for i2 in range(1, len(s2)):
      if s1[i1] == s2[i2]:
        dp[i1, i2] = dp[i1-1, i2-1]
      else:
        dp[i1, i2] = 1 + min(dp[i1-1, i2], min(dp[i1, i2-1], dp[i1-1, i2-1]))

  return dp[len(s1)-1, len(s2)-1]
```
