---
layout: post
title:  "Merge Sort"
author: jazz
categories: [ Software Engineering ]
tags: [ Sorting, Divide and Conquer, Data Structures and Algorithm ]
image: assets/images/merge-sort.jpg
---

Merge sort is a `Divide & Conquer` algorithm. It divides the input array into 2 halves, and recursively breaks those halves until they become so small that it can't be broken further. Then, each section of the pieces are merged together to inch towards the final answer.

<pre class="p-5 text-white bg-dark">
                    [30, 20, 40, 10, 80, 50, 15]
                  /                             \
        [30, 20, 40, 10]                      [80, 50, 15]
        /             \                       /          \
  [30, 20]          [40, 10]               [80,50]       [15]
  /      \          /      \               /     \         \
[30]    [20]      [40]    [10]           [80]   [50]       [15]
  \      /          \      /               \     /          /
  [20, 30]          [10, 40]               [50,80]        [15]
        \            /                          \         /
        [10, 20, 30, 40]                       [15, 50, 80]
                      \                         /
                      [10, 15, 20, 30, 40, 50, 60]
</pre>

## Code algorithm

Let's now look at how to implement it in code.

```py3
import sys

def mergeSort(a: List[int], left: int, right: int) -> None:
  if right > left:
    mid = (left + right) / 2
    mergeSort(a, left, mid)
    mergeSort(a, mid + 1, right)
    merge(a, left, mid, right)

def merge(a: List[int], left: int, mid: int, right: int) -> None:
  leftTmp: List[int] = [None for _ in range(mid - left + 2)]
  rightTmp: List[int] = [None for _ in range(right - mid + 1)]

  for i in range(mid - left + 1):
    leftTmp[i] = a[left + i]

  for i in range(right - mid):
    rightTmp[i] = a[mid + 1 + i]

  leftTmp[mid - left + 1] = sys.maxsize
  rightTmp[right - mid] = sys.maxsize

  i: int = 0
  j: int = 0
  for k in range(left, right + 1):
    if leftTmp[i] < rightTmp[j]:
      a[k] = leftTmp[i]
      i += 1
    else:
      a[k] = rightTmp[j]
      j += 1
```

For time and space complexity, check out my post on [Run Time Complexity]({% post_url 2020-04-28-run-time-complexity %}#sorting-algorithms).
