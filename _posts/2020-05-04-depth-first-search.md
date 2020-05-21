---
layout: post
title:  "Depth First Search"
author: jazz
categories: [ Software Engineering ]
tags: [ Graph,  Data Structures and Algorithm ]
---

DFS is an algorithm for traversing Graph data structures. It starts by selecting some arbitrary node and explores as far as possible along each edge before backtracking.

In the easiest possible way to explain:

<canvas id="dfs" class="code-aid"></canvas>

## Code algorithm

For DFS, we utilise `stack` to help with the operations.

```py3
def dfs(graph):
  stack = []

  for node in graph:
    if not node.isVisited:
      continue

    stack.append(node)

    while not len(stack) > 0:
      current_node = stack.pop()
      if current_node.isVisited: continue

      current_node.isVisited = True
      print(current_node.value)

      for neighbour in current_node.neighbours:
        if neighbour.isVisited: continue
        stack.append(neighbour)
```

For time and space complexity, check out my post on [Run Time Complexity]({% post_url 2020-04-28-run-time-complexity %}#common-operations).
