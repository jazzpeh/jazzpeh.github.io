---
layout: post
title:  "Divide & Conquer: Longest Common Subsequence"
author: jazz
categories: [ Tech ]
tags: [ Divide & Conquer,  Data Structures & Algorithm ]
image: assets/images/dc-lcs.jpg
---

`Divide & Conquer` algorithm can be used to solve **Longest Common Subsequence** problem . Let's explore how it works below.

## Problem Statement

- We are given two strings **s1** and **s2**.
- We need to find the length of the longest subsequence which is common in both the strings.
- Subsequence is a sequence that can be derived from another sequence by deleting some elements *without changing the order* of the remaining elements.

**Example 1:**

```text
Input: "elephant", "erepat"
Output: 5
Explanation: The longest substring is "eepat".
```

**Example 2:**

```text
Input: "houdini", "hdupti"
Output: 3
Explanation: The longest substring is "hui".
```

## Solution

Using **Example 1** as a reference, we need to determine the probablity. Typically when comparing 2 characters, there are 2 probablities:

### Matches

Say, if we check the first characters of each string. Since they matches, we can say that `1 + F(2, 2)`.

Let's go in depth on the subproblem above. The value `1` is because we have a match on the first character. The second part `F(2, 2)` means the next iteration where we're moving to the second character for each string.

### Doesn't match

Since it doesn't match, we can say that `0 + F(3, 2)`, and also `0 + F(2, 3)`.

As the characters doesn't match, we need to stay at the same character for one of the string and move to the next character for the other.

### Getting the answer

Hence, if we manage to solve the subproblems, the end result would be the maximum value of these 3 subproblems.

## Code algorithm

```py3
def lcs(s1, s2, i1, i2):
  if i1 == len(s1) or i2 == len(s2):
    return 0

  c3 = 0
  if s1[i1] == s2[i2]:
    c3 = 1 + find_lcs_length(s1, s2, i1+1, i2+1)

  c1 = find_lcs_length(s1, s2, i1, i2+1)
  c2 = find_lcs_length(s1, s2, i1+1, i2)

  return max(c3, max(c1, c2))
```
