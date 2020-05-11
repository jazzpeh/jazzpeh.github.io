---
layout: post
title:  "0/1 Knapsack Problem"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Data Structures and Algorithm ]
image: assets/images/convert-one-string-to-another.jpg
---

Given the weights and profits of **N** items, we are asked to put these items in a knapsack which as a capacity **C**. Restriction is, we cannot break the item into smaller units (fractional unit is not allowed). Find the maximum profit from the items in the knapsack.

```text
Example
-----------
items: ["Mango", "Apple", "Banana", "Orange"]
profits: [31, 26, 72, 17]
weights: [3, 1, 5, 2]
capacity: 7
output: 98
Explanation: Apple + Banana (total weight = 6) => 98 profit
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's try to derive the subproblems.

```text
1. We take the first item: 31 + f([2,3,4], weight=3)  --|-- max
2. We skip the first item: 0 + f([2,3,4], weight=0)   --|
```

To achieve optimal substructure, we assume that at every step, we would take the first item or we skip it. Hence, if we take the first time, we add on the profit and also run a recursive function and pass in the remaining items and the weight that this item takes and hence `31 + f([2,3,4], weight=3)`. If we skip the first item, we then run a recursive function, pass in the remaining items and since we skip the item, the weight is 0 and therefore `0 + f([2,3,4], weight=0)`. By getting the max value of these 2 subproblems, we would then derive at our final answer.

## Code Algortihm

```py3
def knapsack(profits: List[int], weights: List[int], capacity: int, index: int) -> int:
    if index > len(profits)-1 or capacity == 0:
      return 0

    profit1: int = 0
    if weights[index] <= capacity:
      profit1 = profits[index] + knapsack(profits, weights, capacity-weights[index], index+1)

    profit2: int = knapsack(profits, weights, capacity, index+1)

    return max(profit1, profit2)
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                        knapsack(7, 0)
                  /                       \
            knapsack(4,1)               knapsack(7,1)
            /          \               /             \
    knapsack(3,1)  knapsack(4,2)   knapsack(6,2)   knapsack(7,2)
    /          \
base       knapsack(3,3)
</pre>

Since there are no recurrences of any computation, we don't have to but still can apply `Dynamic Programming` to optimise the solution.
