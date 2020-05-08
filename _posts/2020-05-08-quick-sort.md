---
layout: post
title:  "Quick Sort"
author: jazz
categories: [ Software Engineering ]
tags: [ Sorting, Divide & Conquer, Data Structures & Algorithm ]
image: assets/images/quick-sort.jpg
---

Quick sort is a `Divide & Conquer` algorithm. At each step, it finds the **Pivot** and then makes sure that all the smaller elements are left of **Pivot** and all larger elements are on the right. It continues to do so recursively until the entire array is sorted. Unlike [`Merge Sort`]({% post_url 2020-05-06-merge-sort %}), it doesn't requires any external space.

<canvas id="quick-sort" class="code-aid"></canvas>

## Code algorithm

Let's now look at how to implement it in code.

```py3
def quickSort(arr: List[int], start: int, end: int) -> None:
  if start < end:
    pivot: int = partition(arr, start, end)
    quickSort(arr, start, pivot - 1)
    quickSort(arr, pivot + 1, end)

def partition(arr: List[int], p: int, q: int) -> int:
  pivot: int = q
  i: int = p - 1
  for j in range(p, q+1):
    if arr[j] <= arr[pivot]:
      i += 1
      temp: int = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
  return i
```

For time and space complexity, check out my post on [Run Time Complexity]({% post_url 2020-04-28-run-time-complexity %}#sorting-algorithms).
