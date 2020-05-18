---
layout: post
title:  "Single Source Shortest Path"
author: jazz
categories: [ Software Engineering ]
tags: [ Graph, Data Structures and Algorithm ]
image: assets/images/sssp.jpg
---

Single source shortest path problem (SSSP) is about finding a path between a given vertex (a.k.a *Source*) to all other vertices in a graph such that the total distance between from the *Source* to the *Destination* is minimum.

There are 4 algortihms which can solve the SSSP problem:

- Breadth First Search (BFS)
- Depth First Search (DFS)
- Dijkstra
- Bellman Ford

## Using BFS

To use BFS to solve SSSP, we need to do some tweaks to the algorithm. To find out more about BFS, check out my previous [post]({% post_url 2020-04-29-breadth-first-search %}).

We will need an extra variable `parent` to keep track of the path.
