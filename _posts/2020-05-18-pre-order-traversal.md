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
  - [In-order]({% post_url 2020-05-19-in-order-traversal %})
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
lt = left subtree
rt = right subtree

1. r(lt)(rt)
2. 20(lt)(rt)
3. 20(r(lt)(rt))(rt)
4. 20(100(lt)(rt))(rt)
5. 20(100(r(lt)(rt))(rt))(rt)
6. 20(100(50(lt)(rt))(rt))(rt)
7. 20(100(50(222)(rt))(rt))(rt)
8. 20(100(50(222))(rt))(rt)
9. 20(100(50(222))(15))(rt)
10. 20(100(50(222))(15))(3(lt)(rt))
11. 20(100(50(222))(15))(3(250)(rt))
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
