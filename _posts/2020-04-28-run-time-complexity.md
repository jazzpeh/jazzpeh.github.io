---
layout: post
title:  "A cheat guide to run time complexity"
author: jazz
categories: [ Tech ]
tags: [ Big-O, Data Structures & Algorithm ]
image: assets/images/bigo.jpg
---

This guide is curated to help prepare for technical interviews. I've complied all the useful information including how to calculate the complexity in this guide.

## Table of contents

* [Big-O Complexity Chart](#big-o-complexity-chart)
* [Common Data Structure Operations](#common-data-structure-operations)
  * [Physical Data Structures](#physical-data-structures)
    * [Array](#array)
    * [Linked List](#linked-list)
  * [Logical Data Structures](#logical-data-structures)
    * [Stack](#stack)
    * [Queue](#queue)
    * [Tree](#tree)
      * [Binary Tree](#binary-tree)
      * [Binary Search Tree & AVL Tree](#binary-search-tree--avl-tree)
    * [Heap (Using Array)](#heap-using-array)
    * [Hash Table](#hash-table)
    * [Graphs](#graphs)
      * [Common Operations](#common-operations)
      * [Common Algorithms for Graph problems](#common-algorithms-for-graph-problems)
* [Sorting Algorithms](#sorting-algorithms)
* [How to find time complexity](#how-to-find-time-complexity)
  * [Iterative](#iterative)
  * [Recursive #1](#recursive-1)
  * [Recursive #2](#recursive-2)

## Big-O Complexity Chart

![Big-O Complexity Chart](/assets/images/chart.svg)

> Disclaimer: I didn't create this chart, it's adapted from https://www.bigocheatsheet.com/. All credits goes to [Eric](https://twitter.com/ericdrowell).

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Types</th>
        <th>Name</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>O(1)</code></td>
        <td>Constant</td>
        <td>Adding an element at front of linked list</td>
      </tr>
      <tr>
        <td><code>O(log n)</code></td>
        <td>Logarithmic</td>
        <td>Finding an element in sorted array</td>
      </tr>
      <tr>
        <td><code>O(n)</code></td>
        <td>Linear</td>
        <td>Finding an element in unsorted array</td>
      </tr>
      <tr>
        <td><code>O(n log n)</code></td>
        <td>Linear Logarithmic</td>
        <td>Merge Sort</td>
      </tr>
      <tr>
        <td><code>O(n<sup>2</sup>)</code></td>
        <td>Quadratic</td>
        <td>Shortest path between 2 nodes in a graph</td>
      </tr>
      <tr>
        <td><code>O(n<sup>3</sup>)</code></td>
        <td>Cubic</td>
        <td>Matrix Multiplication</td>
      </tr>
      <tr>
        <td><code>O(2<sup>n</sup>)</code></td>
        <td>Exponential</td>
        <td>Tower of Hanoi Problem</td>
      </tr>
    </tbody>
  </table>
</div>

## Common Data Structure Operations

Below are some common data structure and their operation time and space complexity.

### Physical Data Structures

There are two types of physical data structures, **array** and **linked list**.

#### Array

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">1D Array</th>
        <th colspan="2">2D Array</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>create()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(mn)</code></td>
      </tr>
      <tr>
        <td>insert()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>traverse()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(mn)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>access[n]</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>search()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(mn)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>delete()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Linked List

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">Single Linked List</th>
        <th colspan="2">Double Linked List</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>create()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>insert()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>traverse()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>search()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>deleteNode()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>deleteList()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Logical Data Structures

Below are some common types of logical data structures.

#### Stack

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">using Array</th>
        <th colspan="2">using Linked List</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>createStack()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>push()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>pop()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>peek()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>isEmpty()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>isFull()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>N/A</code></td>
        <td><code>N/A</code></td>
      </tr>
      <tr>
        <td>deleteStack()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Queue

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">using Array</th>
        <th colspan="2">using Linked List</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>createQueue()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>enqueue()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>dequeue()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>peek()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>isEmpty()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>isFull()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>N/A</code></td>
        <td><code>N/A</code></td>
      </tr>
      <tr>
        <td>deleteQueue()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Tree

##### Binary Tree

The table below shows the implementation between Array and Linked List for Binary Tree.

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">using Array</th>
        <th colspan="2">using Linked List</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>createTree()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>insert()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>delete()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>search()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>traverse()</td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>deleteTree()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

> Using Linked List is more space efficient as creating a binary tree is O(1) as compared to Array which is O(n), hence, the preferred implementation is Linked List.

##### Binary Search Tree & AVL Tree

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="3">Operations</th>
        <th colspan="4">Binary Search Tree</th>
        <th rowspan="2" colspan="2">AVL Tree</th>
      </tr>
      <tr>
        <th colspan="2">Avg.</th>
        <th colspan="2">Worst</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>createTree()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>search()</td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
      </tr>
      <tr>
        <td>traverse()</td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>insertNode()</td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
      </tr>
      <tr>
        <td>deleteNote()</td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
      </tr>
      <tr>
        <td>deleteTree()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Heap (Using Array)

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Operations</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>createHeap()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>peekTopOfHeap()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>sizeOfHeap()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
      <tr>
        <td>insertValue()</td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
      </tr>
      <tr>
        <td>extractMin() / extractMax()</td>
        <td><code>O(log n)</code></td>
        <td><code>O(log n)</code></td>
      </tr>
      <tr>
        <td>deleteHeap()</td>
        <td><code>O(1)</code></td>
        <td><code>O(1)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Hash Table

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="2">Operations</th>
        <th colspan="2">Time Complexity</th>
        <th rowspan="2">Space Complexity</th>
      </tr>
      <tr>
        <th>Avg.</th>
        <th>Worst</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>search()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>insert()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
      <tr>
        <td>delete()</td>
        <td><code>O(1)</code></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
      </tr>
    </tbody>
  </table>
</div>

#### Graphs

##### Common Operations

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th rowspan="2">Operations</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Breadth First Search</td>
        <td><code>O(V + E)</code></td>
        <td><code>O(E)</code></td>
      </tr>
      <tr>
        <td>Depth First Search</td>
        <td><code>O(E + V)</code></td>
        <td><code>O(V)</code></td>
      </tr>
      <tr>
        <td>Topological sort</td>
        <td><code>O(E + V)</code></td>
        <td><code>O(E + V)</code></td>
      </tr>
    </tbody>
  </table>
</div>

##### Common Algorithms for Graph problems

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th class="align-middle" rowspan="3">Operations</th>
        <th colspan="2">Single Source Shortest Path</th>
        <th colspan="2">All Pair Shortest Path</th>
      </tr>
      <tr>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Breadth First Search</td>
        <td><code>O(V<sup>2</sup>)</code></td>
        <td><code>O(E)</code></td>
        <td><code>O(V<sup>3</sup>)</code></td>
        <td><code>O(EV)</code></td>
      </tr>
      <tr>
        <td>Dijkstra</td>
        <td><code>O(V<sup>2</sup>)</code></td>
        <td><code>O(V)</code></td>
        <td><code>O(V<sup>3</sup>)</code></td>
        <td><code>O(EV)</code></td>
      </tr>
      <tr>
        <td>Bellman Ford</td>
        <td><code>O(VE)</code></td>
        <td><code>O(V)</code></td>
        <td><code>O(VE<sup>2</sup>)</code></td>
        <td><code>O(V<sup>2</sup>)</code></td>
      </tr>
      <tr>
        <td>Floyd Warshall</td>
        <td><code>N/A</code></td>
        <td><code>N/A</code></td>
        <td><code>O(V<sup>3</sup>)</code></td>
        <td><code>O(V<sup>2</sup>)</code></td>
      </tr>
    </tbody>
  </table>
</div>

## Sorting Algorithms

<div class="table-responsive">
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Types</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>Stable</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bubble sort</td>
        <td><code>O(n<sup>2</sup>)</code></td>
        <td><code>O(1)</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>Selection sort</td>
        <td><code>O(n<sup>2</sup>)</code></td>
        <td><code>O(1)</code></td>
        <td>No</td>
      </tr>
      <tr>
        <td>Insertion sort</td>
        <td><code>O(n<sup>2</sup>)</code></td>
        <td><code>O(1)</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>Bucket sort</td>
        <td><code>O(n log n)</code></td>
        <td><code>O(n)</code></td>
        <td>Yes<sup>*</sup></td>
      </tr>
      <tr>
        <td>Merge sort</td>
        <td><code>O(n log n)</code></td>
        <td><code>O(n)</code></td>
        <td>No</td>
      </tr>
      <tr>
        <td>Heap sort</td>
        <td><code>O(n log n)</code></td>
        <td><code>O(1)</code></td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</div>

## How to find time complexity

This section will show how to calculate the time complexity of **iterative** vs **recursive** algorithms.

### Iterative

```py3
def findBiggestNum(arr):
  biggestNum = arr[0]            # ------------------O(1)
  for i in range(0, len(arr)):   # ---------O(n)--|--O(n)
    if arr[i] > biggestNum:      # O(1)--|--O(1)--|
      biggestNum = arr[i]        # O(1)--|
  return biggestNum              # ------------------O(1)
```

**Time complexity:** O(1) + O(n) + O(1) = O(n)

---

### Recursive #1

```py3
highest = 0

def findBiggestNum(arr, n):         # ----T(n)
  if n == -1:                       # ----O(1) ---|--- Base condition
    return highest                  # ----O(1) ---|
  else:                             # ----O(1)
    if arr[n] > highest:            # ----O(1)
  return findBiggestNum(arr, n-1)   # ----T(n-1)
```

**Equation 1:** T(n) = O(1) + T(n-1)
> O(1) + O(1) + O(1) + O(1) = O(1)

**Base Condition:** T(-1) = O(1)
> if n == -1, recursion will end, so if the recursion method = T(n), we replace n to -1 to get T(-1), and since base condition = O(1), T(-1) = O(1)

**Equation 2:** T(n-1) = O(1) + T((n-1)-1)

**Equation 3:** T(n-2) = O(1) + T((n-2)-1)

```js
T(n) = 1 + T(n-1)
     = 1 + (1 + T((n-1)-1)) // substitute `Equation 2`
     = 2 + T(n-2)
     = 2 + (1 + T((n-2)-1)) // substitute `Equation 3`
     = 3 + T(n-3)           // notice the pattern, substitue with k
     = k + T(n-k)
     = (n+1) + T(n-(n+1))   // attempt to make it T(-1) since it is the base condition, replace k with n+1
     = n + 1 + T(-1)
     = n + 1 + 1            // T(-1) = 1
     = O(n)
```

---

### Recursive #2

```py3
def search(num, arr, start, end):       # ----T(n)
  if start <= end:                      # ----O(1) ---|--- Base Condition
    if arr[start] == num:               # ----O(1) ---|
      return start                      # ----O(1) ---|
    else:                               # ----O(1) ---|
      return False                      # ----O(1) ---|
  mid = find_mid(arr, start, end)       # ----O(1)
  if mid > num:                         # ----O(1)
    search(num, arr, start, mid)        # ----T(n/2)
  elif mid < num:                       # ----O(1)
    search(num, arr, mid, end)          # ----T(n/2)
  elif mid == num:                      # ----O(1)
    return mid                          # ----O(1)
```

**Equation 1:** T(n) = T(n/2) + 1

**Base Condition:** T(1) = O(1)
> If the array is of size 1, we can perform it in constant time

**Equation 2:** T(n/2) = T(n/4) + 1

**Equation 3:** T(n/4) = T(n/8) + 1

```js
T(n) = T(n/2) + 1
     = T(n/4) + 1 + 1       // substitue `Equation 2`
     = T(n/4) + 2
     = T(n/8) + 1 + 2       // substitue `Equation 3`
     = T(n/8) + 3
     = T(n/2^k) + k         // notice the pattern, substitue with k
     = T(1) + log n         // attempt to make it T(1) snce it is the base condition, see below how n/2^k = 1 = k
     = 1 + log n
     = O(log n)
```

> [n/2^K = 1] => [n = 2^K] => [k = log n]

