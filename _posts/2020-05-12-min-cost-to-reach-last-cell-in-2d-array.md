---
layout: post
title:  "Min cost to reach last cell in 2D Array"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
---

Given a **(n,n) 2D matrix**, we need to start from **(0,0)** cell and go till **(n-1,n-1)** cell. Assuming that each cell has a **cost** associated and we can only go **right or down** from current cell, find the traversal in **minimum** cost.

```text
Example
-----------
input: [
  [ 4, 7, 8, 6, 4 ],
  [ 6, 7, 3, 9, 2 ],
  [ 3, 8, 1, 2, 4 ],
  [ 7, 1, 7, 3, 7 ],
  [ 2, 9, 8, 9, 3 ]
]
output: 36
Explanation: 4->6->7->3->1->2->3->3
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's try to derive the subproblems.

```text
1. min of going right f(0, 1) and going down f(1, 0)
2. if we reach the end of the right cell, we can only go down
3. if we reach the end of the bottom cell, we can only go right
```

## Code Algortihm

```py3
def min_cost(mat: List[List[int]], row: int, col: int) -> int:
  if row > len(mat)-1 or col > len(mat[0])-1:
    return sys.maxsize

  if row == len(mat)-1 and col == len(mat[0])-1:
    return mat[row][col]

  right: int = min_cost(mat, row, col+1)
  down: int = min_cost(mat, row+1, col)

  return mat[row][col] + min(right, down)
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                                    min(0,0)
                                  /          \
                              /                \
                          /                      \
                      min(0,1)                   min(1,0)
                    /        \                  /       \
                  /             \           min(1,1)     min(2,0)
              min(0,2)         min(1,1)     /      \
            /         \                 min(1,2)  min(2,1)
          /             \
        min(0,3)       min(1,2)
      /       \        /       \
min(0,4)   min(1,3)  min(1,3)  min(2,2)
</pre>

We are computing a new of the subproblems more than once such as `min(1,1)` and `min(1,2)`. We can then apply `Dynamic Programming` to optimise the solution.

```py3
dp = {}

def min_cost(mat: List[List[int]], row: int, col: int) -> int:
  if row > len(mat)-1 or col > len(mat[0])-1:
    return sys.maxsize

  if row == len(mat)-1 and col == len(mat[0])-1:
    return mat[row][col]

  if (row, col) not in dp:
    right: int = min_cost(mat, row, col+1)
    down: int = min_cost(mat, row+1, col)

    dp[row, col] = mat[row][col] + min(right, down)

  return dp[row, col]
```

## Bottom Up Approach

We can now then apply some reverse engineer to use the `Bottom Up Approach` (also known as `Tabulation`). Firstly, let's start from looking at the `Top Down Approach` using a matrix table.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
    <thead>
      <tr>
        <th></th>
        <th>C1</th>
        <th>C2</th>
        <th>C3</th>
        <th>C4</th>
        <th>C5</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>R1</th>
        <td class="bg-info">min(R1C2,R2C1)+4</td>
        <td>min(R1C3,R2C2)+7</td>
        <td>min(R1C4,R2C4)+8</td>
        <td>min(R1C5,R2C5)+6</td>
        <td>R2C5+4</td>
      </tr>
      <tr>
        <th>R2</th>
        <td>min(R2C2,R3C1)+6</td>
        <td>min(R2C3,R3C2)+7</td>
        <td>min(R2C4,R3C3)+3</td>
        <td>min(R2C5,R3C4)+9</td>
        <td>R3C5+2</td>
      </tr>
      <tr>
        <th>R3</th>
        <td>min(R3C2,R4C1)+3</td>
        <td>min(R3C3,R4C2)+8</td>
        <td>min(R3C4,R4C3)+1</td>
        <td>min(R3C5,R4C4)+2</td>
        <td>R4C5+4</td>
      </tr>
      <tr>
        <th>R4</th>
        <td>min(R4C2,R5C1)+7</td>
        <td>min(R4C3,R5C2)+1</td>
        <td>min(R4C4,R5C3)+7</td>
        <td>min(R4C5,R5C4)+3</td>
        <td>R5C5+7</td>
      </tr>
      <tr>
        <th>R5</th>
        <td>R5C2+2</td>
        <td>R5C3+9</td>
        <td>R5C4+8</td>
        <td>R5C5+9</td>
        <td class="bg-success">3</td>
      </tr>
    </tbody>
  </table>
</div>

For top down approach, we enter from `R1C1` and then recusively all the way to `R5C5` to hit our base condition which is the first independent value. Hence, for bottom up approach, we can the solve `R5C5` cell first, then the `R5` row and then make our way up to `R1C1` to get our final answer.

```py3
def min_cost(mat: List[List[int]]) -> int:
  dp = {}

  for row in range(len(mat)-1, -1, -1):
    for col in range(len(mat[0])-1, -1, -1):
      if row == len(mat)-1 and col == len(mat[0])-1:
        dp[row, col] = mat[row][col]
      elif row == len(mat)-1:
        dp[row, col] = mat[row][col] + dp[row, col+1]
      elif col == len(mat[0])-1:
        dp[row, col] = mat[row][col] + dp[row+1, col]
      else:
        dp[row, col] = mat[row][col] + min(dp[row+1, col], dp[row, col+1])

  return dp[0,0]
```
