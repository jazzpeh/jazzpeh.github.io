---
layout: post
title:  "Post-order Traversal"
author: jazz
categories: [ Software Engineering ]
tags: [ Binary Tree, Data Structures and Algorithm ]
image: assets/images/posot.jpg
---

Lets look at the 4 options to traverse a binary tree:

- Depth First Search
  - [Pre-order]({% post_url 2020-05-18-pre-order-traversal %})
  - [In-order]({% post_url 2020-05-19-in-order-traversal %})
  - Post-order
- Breadth First Search
  - Level-order

In this post, let's explore `Post-order` traversal.

## Visualise how it traverse

We first visit the `Left Subtree`, then the `Right subtree` and lastly, the `Root`.

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

1. (lt)(rt)r
2. ((lt)(rt)r)(rt)20
3. ((lt)(rt)100)(rt)20
4. (((lt)(rt)r)(rt)100)(rt)20
5. (((lt)(rt)50)(rt)100)(rt)20
6. (((222)50)(rt)100)(rt)20
7. (((222)50)(15)100)(rt)20
8. (((222)50)(15)100)((lt)(rt)r)20
9. (((222)50)(15)100)((lt)(rt)3)20
10. (((222)50)(15)100)((250)(35)3)20

Answer: 222, 50, 15, 100, 250, 35, 3, 20

```

## Code Algorithm

Here's the code example to implmenent a `Post-order`traversal.

```py3
# Definition for binary node.
# class BinaryNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def post_order(root: BinaryNode) -> None:
  if not root:
    throw Error()
  else:
    post_order(root.left)
    post_order(root.right)
    print(root.val)
```
