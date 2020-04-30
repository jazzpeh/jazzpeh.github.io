---
layout: post
title:  "Breadth First Search"
author: jazz
categories: [ Tech ]
tags: [ Graph,  Data Structures & Algorithm ]
image: assets/images/bfs.jpg
---

## What is Breadth First Search (BFS)?

In the easiest possible way to explain:

<canvas id="bfs" class="code-aid"></canvas>

> BFS is an algorithm for traversing Graph data structures. It starts at some arbitrary node of a graph and explores the neighbour nodes (which are at current level) first, before moving to the next level neighbours.

## Code algorithm

For BFS we utilise `queue` to help with the operations.

```py3
def bfs(graph):
  queue = Queue()

  for node in graph:
    if not node.isVisited:
      continue

    queue.enqueue(node)

    while not queue.is_empty():
      current_node = queue.dequeue()
      if current_node.isVisited: continue

      current_node.isVisited = True
      print(current_node.value)

      for neighbour in current_node.neighbours:
        if neighbour.isVisisted: continue
        queue.enqueue(neighbour)
```

For time and space complexity, check out my post on [Run Time Complexity]({% post_url 2020-04-28-run-time-complexity %}).
