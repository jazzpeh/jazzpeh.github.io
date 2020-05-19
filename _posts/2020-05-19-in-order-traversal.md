---
layout: post
title:  "In-order Traversal"
author: jazz
categories: [ Software Engineering ]
tags: [ Binary Tree, Data Structures and Algorithm ]
image: assets/images/iot.jpg
---

Lets look at the 4 options to traverse a binary tree:

- Depth First Search
  - [Pre-order]({% post_url 2020-05-18-pre-order-traversal %})
  - In-order
  - Post-order
- Breadth First Search
  - Level-order

In this post, let's explore `In-order` traversal.

## Visualise how it traverse

We first visit the `Left Subtree`, then the `Root` and lastly, the `Right subtree`.

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
lt = left subtree
rt = right subtree

1. (lt)r(rt)
2. (lt)20(rt)
3. ((lt)r(rt))20(r)
4. ((lt)100(rt))20(r)
5. (((lt)r(rt))100(rt))20(r)
6. (((lt)50(rt))100(rt))20(r)
7. (((222)50)100(rt))20(r)
8. (((222)50)100(15))20(r)
9. (((222)50)100(15))20((lt)r(rt))
10. (((222)50)100(15))20((lt)3(rt))
11. (((222)50)100(15))20((250)3(35))

Answer: 222, 50, 100, 15, 20, 250, 3, 35

```

## Code Algorithm

Here's the code example to implmenent a `In-order`traversal.

```py3
# Definition for binary node.
# class BinaryNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def in_order(root: BinaryNode) -> None:
  if not root:
    throw Error()
  else:
    in_order(root.left)
    print(root.val)
    in_order(root.right)
```
