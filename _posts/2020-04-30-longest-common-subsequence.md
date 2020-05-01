---
layout: post
title:  "Longest Common Subsequence"
author: jazz
categories: [ Tech ]
tags: [ Divide & Conquer, Dynamic Programming,  Data Structures & Algorithm ]
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

  return max(c1, c2, c3)
```

### Optimisation

So if you noticed, the solution is not optimised. Why would I say that? This is because, we are running certain calculation twice or more. Let's take a look at the **recursion tree below**:

<pre class="text-white bg-dark">
                            lcs(0,0)
                  /             |             \
              lcs(0,1)        lcs(1,0)        lcs(1,1)
                |               |               |
                |-lcs(0,2)      |-lcs(1,1)      |-lcs(1,2)
                |-lcs(1,1)      |-lcs(2,0)      |-lcs(2,1)
                |-lcs(1,2)      |-lcs(2,1)      |-lcs(2,2)
</pre>

We are actually running **lcs(1,1)** at least 3 times, **lcs(1,2)** at least twice, etc. This is a case of overlapping subproblems. Hence in order to optimise this solution we can use `Dynamic Programming`.

### Top Down Approach

`Top Down Approach` is also known as `Memoization`. Below shows the code algorithm to achieve this approach.

```py3
dp = {}

def lcs(s1, s2, i1, i2):
  if i1 == len(s1) or i2 == len(s2):
    return 0

  if (i1, i2) not in dp[i1, i2]: # We'll only solve this problem if we haven't already done it
    c3 = 0
    if s1[i1] == s2[i2]:
      c3 = 1 + find_lcs_length(s1, s2, i1+1, i2+1)

    c1 = find_lcs_length(s1, s2, i1, i2+1)
    c2 = find_lcs_length(s1, s2, i1+1, i2)
    dp[i1, i2] = max(c1, c2, c3)

  return dp[i1, i2]
```

As we can see, basically it is the almost the same as `Divide & Conquer` except for the additonal variable to store already solved subproblems. This would ensure that we don't run the recursion again to solve something that was already solved.

### Bottom Up Approach

`Bottom Up Approach` is also known as `Tabulation`. This approach is more complex as compared to `Top Down Approach`. Hence, let's explore the solution.

Firstly, let's start from looking at the `Top Down Approach` using a matrix table with **Example 2** as the test input.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered" style="font-size: .8rem">
    <thead>
      <tr>
        <th rowspan="2" colspan="2"></th>
        <th>B1</th>
        <th>B2</th>
        <th>B3</th>
        <th>B4</th>
        <th>B5</th>
        <th>B6</th>
        <th>B7</th>
        <th>B8</th>
      </tr>
      <tr>
        <th>H</th>
        <th>O</th>
        <th>U</th>
        <th>D</th>
        <th>I</th>
        <th>N</th>
        <th>I</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>A1</th>
        <th>H</th>
        <td class="bg-success">max(1+A2B2, A1B2, A2B1)</td>
        <td>max(A1B3, A2B2)</td>
        <td>max(A1B4, A2B3)</td>
        <td>max(A1B5, A2B4)</td>
        <td>max(A1B6, A2B5)</td>
        <td>max(A1B7, A2B6)</td>
        <td>max(A1B8, A2B7)</td>
        <td>0</td>
      </tr>
      <tr>
        <th>A2</th>
        <th>U</th>
        <td>max(A2B2, A3B1)</td>
        <td>max(A2B3, A3B2)</td>
        <td>max(1+A3K4, A2B4, A3B3)</td>
        <td>max(A2B5, A3B4)</td>
        <td>max(A2B6, A3B5)</td>
        <td>max(A2B7, A3B6)</td>
        <td>max(A2B8, A3B7)</td>
        <td>0</td>
      </tr>
      <tr>
        <th>A3</th>
        <th>I</th>
        <td>max(A3B2, A4B1)</td>
        <td>max(A3B3, A4B2)</td>
        <td>max(A3B4, A4B3)</td>
        <td>max(A3B5, A4B4)</td>
        <td>max(1+A4B6, A3B6, A4B5)</td>
        <td>max(A3B7, A4B6)</td>
        <td>max(A3B8, A4B7)</td>
        <td>0</td>
      </tr>
      <tr>
        <th>A4</th>
        <th>N</th>
        <td>max(A4B2, A5B1)</td>
        <td>max(A4B3, A5B2)</td>
        <td>max(A4B4, A5B3)</td>
        <td>max(A4B5, A5B4)</td>
        <td>max(A4B6, A5B5)</td>
        <td>max(1+A5B7, A4B7, A5B6)</td>
        <td>max(A4B8, A5B7)</td>
        <td>0</td>
      </tr>
      <tr>
        <th>A5</th>
        <th>D</th>
        <td>max(A5B2, A6B1)</td>
        <td>max(A5B3, A6B2)</td>
        <td>max(A5B4, A6B3)</td>
        <td>max(1+A6B5, A5B5, A6B4)</td>
        <td>max(A5B6, A6B5)</td>
        <td>max(A5B7, A6B6)</td>
        <td class="bg-info">max(A5B8, A6B7)</td>
        <td>0</td>
      </tr>
      <tr>
        <th>A6</th>
        <th></th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</div>

We then need to find the cell which doesn't have any dependency as our starting point as we will have our first answer there. That would be the last cell `A5K7`. And we slowly move our way up to the rest of the cells until we reach the first cell `A1B1` which will give us our final answer.

`B8`, `A6` rows and columns are our base conditions where we return **0**.

```py3
def lcs(s1, s2):
  dp = {}

  for i in range(len(s1), 0, -1):
    for j in range(len(s2), 0, -1):
      if s1[i-1] == s2[j-1]:
        dp[i,j] = max(1 + dp[i-1, j-1], dp[i, j+1], dp[i+1, j])
      else:
        do[i,j] = max(dp[i,j+1], dp[i+1,j])

  return dp[0][0]
```
