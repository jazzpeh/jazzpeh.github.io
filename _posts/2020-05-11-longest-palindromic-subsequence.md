---
layout: post
title:  "Longest Palindromic Subsequence"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
image: assets/images/lps.jpg
---

Given a string **S**, we need to find the length of its **Longest Palindromic Subsequence**. Palindrome is a string that reads the same backwards as well as forward and can be odd or even length. A subsequence is a sequence that can be derived from another string by *deleting some or no elements* without **changing the order** of the remaining elements.

```text
Example 1
-----------
s: "ELRMENMET"
output: 5
Explanation: "ELRMENMET" => "EMEME"
              ^  ^^ ^^
```

```text
Example 2
-----------
s: "AMEEWMEA"
output: 6
Explanation: "AMEEWMEA" => "AMEEMA"
              ^^^^ ^ ^
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's try to derive the subproblems.

```text
If the first and last character matches: 1 + f(1,8)      ---|---max
If it doesn't match: max of [0 + f(0,8)] or [0 + f(1,9)] ---|
```

For palindrome, the first and last character should be the same so that it reads the same from the front and the back. Hence, to achive optimal substructure, if the first and last character matches, our answer increases by 1 and we move on to the next characters, hence, `1 + f(1,8)`. If it doesn't match, we should then attempt to see if the next characters on both side matches and get the max value from it. Therefore, `max of [0 + f(0,8)] or [0 + f(1,9)]`.

## Code Algortihm

```py3
def lps(s: str, start: int, end: int) -> int:
    if start > end:
      return 0

    if start == end:
      return 1

    count1 = 0
    if s[start] == s[end]:
      count1 = 2 + lps(s, start+1, end-1)

    count2 = lps(s, start, end-1)
    count3 = lps(s, start+1, end)

    return max(count1, count2, count3)
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                lps(0,3)
    /               |               \
  lps(2)        lps(1,3)        lps(1,2)
  |                |                |
  |-lps(1,2)       |-lps(2,3)       |-lps(2,2)
  |-lps(0,1)       |-lps(1,2)       |-lps(1,1)
  |-lps(1,1)       |-lps(2,2)       |-lps(2,1)
</pre>

We are computing a new of the subproblems more than once such as `lps(1,2)`. We can then apply `Dynamic Programming` to optimise the solution.

### Top Down Approach

We will start off by applying `Top Down Approach` (also known as `Memoization`).

```py3
dp = {}

def lps(s: str, start: int, end: int) -> int:
    if start > end:
      return 0

    if start == end:
      return 1

    if (start, end) not in dp:
      count1 = 0
      if s[start] == s[end]:
        count1 = 2 + lps(s, start+1, end-1)

      count2 = lps(s, start, end-1)
      count3 = lps(s, start+1, end)

      dp[start, end] = max(count1, count2, count3)

    return dp[start, end]
```

### Bottom Up Approach

We can now then apply some reverse engineer to use the `Bottom Up Approach` (also known as `Tabulation`). Firstly, let's start from looking at the `Top Down Approach` using a matrix table.

<div class="table-responsive">
  <table class="table table-dark table-striped table-sm table-bordered">
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
        <th>B9</th>
      </tr>
      <tr>
        <th>E</th>
        <th>L</th>
        <th>R</th>
        <th>M</th>
        <th>E</th>
        <th>N</th>
        <th>M</th>
        <th>E</th>
        <th>T</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>A1</th>
        <th>E</th>
        <td class="bg-success">1</td>
        <td>max(0,A1B1,A2B2)</td>
        <td>max(0,A1B2,A2B3)</td>
        <td>max(0,A1B3,A2B4)</td>
        <td class="bg-warning">max(2+A2B4,A1B4,A2B5)</td>
        <td>max(0,A1B5,A2B6)</td>
        <td>max(0,A1B6,A2B7)</td>
        <td class="bg-warning">max(2+A2B7,A1B7,A2B8)</td>
        <td>max(0,A1B8,A2B9)</td>
      </tr>
      <tr>
        <th>A2</th>
        <th>L</th>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A2B2,A3B3)</td>
        <td>max(0,A2B3,A3B4)</td>
        <td>max(0,A2B4,A3B5)</td>
        <td>max(0,A2B5,A3B6)</td>
        <td>max(0,A2B6,A3B7)</td>
        <td>max(0,A2B7,A3B8)</td>
        <td>max(0,A2B8,A3B9)</td>
      </tr>
      <tr>
        <th>A3</th>
        <th>R</th>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A3B3,A4B4)</td>
        <td>max(0,A3B4,A4B5)</td>
        <td>max(0,A3B5,A4B6)</td>
        <td>max(0,A3B6,A4B7)</td>
        <td>max(0,A3B7,A4B8)</td>
        <td>max(0,A3B8,A4B9)</td>
      </tr>
      <tr>
        <th>A4</th>
        <th>M</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A4B4,A5B5)</td>
        <td>max(0,A4B5,A5B6)</td>
        <td class="bg-warning">max(2+A5B6,A4B6,A5B7)</td>
        <td>max(0,A4B7,A5B8)</td>
        <td>max(0,A4B8,A5B9)</td>
      </tr>
      <tr>
        <th>A5</th>
        <th>E</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A5B5,A6B6)</td>
        <td>max(0,A5B6,A6B7)</td>
        <td class="bg-warning">max(2+A6B7,A5B7,A6B8)</td>
        <td>max(0,A5B8,A6B9)</td>
      </tr>
      <tr>
        <th>A6</th>
        <th>N</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A6B6,A7B7)</td>
        <td>max(0,A6B7,A7B8)</td>
        <td>max(0,A6B8,A7B9)</td>
      </tr>
      <tr>
        <th>A7</th>
        <th>M</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A7B7,A8B8)</td>
        <td>max(0,A7B8,A8B9)</td>
      </tr>
      <tr>
        <th>A8</th>
        <th>E</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max(0,A8B8,A9B9)</td>
      </tr>
      <tr>
        <th>A9</th>
        <th>T</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
      </tr>
    </tbody>
  </table>
</div>

We then need to find the cell which doesn't have any dependency as our starting point as we will have our first answer there. That would be the last cell `A9B9`. And we slowly move our way up to the rest of the cells until we reach cell `A1B9` which will give us our final answer.

`B8`, `A6` rows and columns are our base conditions where we return **0**.

```py3
def lps(s: str) -> int:
  dp = {}

  for col in range(len(s)):
    for row in range(len(s)-1, -1, -1):
      if row > col:
        dp[row, col] = 0
      elif row == col:
        dp[row, col] = 1
      else:
        if s[row] == s[col]:
          dp[row, col] = max(2+dp[row+1, col-1], dp[row, col-1], dp[row+1, col])
        else:
          dp[row, col] = max(dp[row, col-1], dp[row+1, col])

  return dp[0, len(s)-1]
```
