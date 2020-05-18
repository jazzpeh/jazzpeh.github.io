---
layout: post
title:  "Pre-order Traversal"
author: jazz
categories: [ Software Engineering ]
tags: [ Binary Tree, Data Structures and Algorithm ]
image: assets/images/pot.jpg
---

Lets look at the 4 options to traverse a binary tree:

- Depth First Search
  - Pre-order
  - In-order
  - Post-order
- Breadth First Search
  - Level-order

In this post, let's explore `Pre-order` traversal.

## Visualise how it traverse

We first visit the `Root`, then the `Left Subtree` and lastly, the `Right subtree`.

```text
               20
             /    \
          /         \
        100         3
      /     \     /   \
    50      15  250   35
  /
222

r = root
l = left subtree
r = right subtree

1. r(l)(r)
2. 20(l)(r)
3. 20(r(l)(r))(r)
4. 20(100(l)(r))(r)
5. 20(100(r(l)(r))(r))(r)
6. 20(100(50(l)(r))(r))(r)
7. 20(100(50(222)(r))(r))(r)
8. 20(100(50(222))(r))(r)
9. 20(100(50(222))(15))(r)
10. 20(100(50(222))(15))(3(l)(r))
11. 20(100(50(222))(15))(3(250)(r))
12. 20(100(50(222))(15))(3(250)(35))

Answer: 20, 100, 50, 222, 15, 3, 250, 35

```

## Code Algorithm

Here's the code example to implmenent a `Pre-order`traversal.

```py3
# Definition for binary node.
# class BinaryNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def pre_order(root: BinaryNode) -> None:
  if not root:
    throw Error()
  else:
    print(root.val)
    pre_order(root.left)
    pre_order(root.right)
```
