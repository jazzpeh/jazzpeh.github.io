---
layout: post
title:  Number of paths to reach last cell"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
image: assets/images/nplc.jpg
---

Given a **(n,n) 2D matrix** and a **total cost** to reach the destination cell, we need to start from **(0,0)** cell and go till **(n-1,n-1)** cell. Assuming that each cell has a **cost** associated and we can only go right or down from current cell. Find the number of ways to reach destination cell with given total cost.

```text
Example
-----------
input: [
  [ 4, 7, 1, 6 ],
  [ 5, 7, 3, 9 ],
  [ 3, 2, 1, 2 ],
  [ 7, 1, 6, 3 ]
]
cost: 25
output: 2
Explanation: 4->7->1->3->1->6->3 and 4->5->7->4->1->2->3
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's try to derive the subproblems.

```text
1. f(2, 3, 22) -> e.g. 5 ways ---|---sum
2. f(3, 2, 22) -> e.g. 4 ways ---|
```

We shall start by looking at the last cell. In order to reach the last cell, we know that the traversal can only go right or down. Therefore, it meant that from the last cell, we can only go **left** or **up**. If the given cost is 25, we know that in order to reach the last cell which has a value of 3, the cell before need to only have a value of **22**. Hence, if we can solve these, by summing them up we can then get our final answer.

## Code Algortihm

```py3
def num_paths(mat: List[List[int]], row: int, col: int, cost: int) -> int:
  if cost < 0:
    return 0

  remaining_cost: int = cost - mat[row][col]

  if row == 0 and col == 0:
    return 1 if remaining_cost == 0 else 0

  if row == 0:
    return num_paths(mat, 0, col-1, remaining_cost)
  if col == 0:
    return num_paths(mat, row-1, 0, remaining_cost)

  from_up: int = num_paths(mat, row-1, col, remaining_cost)
  from_left: int = num_paths(mat, row, col-1, remaining_cost)

  return from_up + from_left
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                                   p(3,3,25)
                                  /          \
                              /                \
                          /                      \
                      p(2,3,22)                  p(3,2,22)
                    /        \                  /       \
                  /             \           p(2,2,20)   p(3,1,20)
            p(1,3,20)         p(2,2,20)     /      \
            /         \                 p(1,2,19) p(2,1,19)
          /             \
      p(0,3,11)       p(1,2,11)
      |               /        \
      |-p(0,2,5)   p(0,2,8)   p(1,1,8)
      |-p(0,3,4)   |
                   |-p(0,1,7)
</pre>

We are computing a new of the subproblems more than once such as `p(2,2,20)`. We can then apply `Dynamic Programming` to optimise the solution.

```py3
dp = {}

def num_paths(mat: List[List[int]], row: int, col: int, cost: int) -> int:
  if cost < 0:
    return 0

  remaining_cost: int = cost - mat[row][col]

   if row == 0 and col == 0:
    return 1 if remaining_cost == 0 else 0

  if (row, col, cost) not in dp:
    if row == 0:
      dp[row, col, cost] = num_paths_topdown(mat, 0, col-1, remaining_cost)
    elif col == 0:
      dp[row, col, cost] = num_paths_topdown(mat, row-1, 0, remaining_cost)
    else:
      from_up: int = num_paths_topdown(mat, row-1, col, remaining_cost)
      from_left: int = num_paths_topdown(mat, row, col-1, remaining_cost)
      dp[row, col, cost] = from_up + from_left

  return dp[row, col, cost]
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
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>R1</th>
        <td class="bg-success">?</td>
        <td>R1C1</td>
        <td>R1C2</td>
        <td>R1C3</td>
      </tr>
      <tr>
        <th>R2</th>
        <td>R1C1</td>
        <td>R1C2+R2C1</td>
        <td>R1C3+R2C2</td>
        <td>R1C4+R2C3</td>
      </tr>
      <tr>
        <th>R3</th>
        <td>R2C1</td>
        <td>R2C2+R3C1</td>
        <td>R2C3+R3C2</td>
        <td>R2C4+R3C3</td>
      </tr>
      <tr>
        <th>R4</th>
        <td>R3C1</td>
        <td>R3C2+R4C1</td>
        <td>R3C3+R4C2</td>
        <td class="bg-info">R3C4+R4C3</td>
      </tr>
    </tbody>
  </table>
</div>

For our top down approach, in order to get the solution at `R1C1`, we entered from `R4C4` and worked our way up, checking the cost as we go along. Hence, in order to perform bottom up approach. However, this is a tricky scenario because typically at our base condition, we have a value, instead, at `R1C1` we are dependent on the other cells for the remaining cost. Hence, we will need to apply the same format, starting from the bottom and working our way up to `R1C1` with a twist. I will cover it in the next time as it is going to be long post by itself.
