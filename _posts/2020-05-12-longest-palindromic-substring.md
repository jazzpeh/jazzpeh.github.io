---
layout: post
title:  "Longest Palindromic Substring"
author: jazz
categories: [ Software Engineering ]
tags: [ Divide and Conquer, Dynamic Programming,  Data Structures and Algorithm ]
image: assets/images/lps2.jpg
---

Given a string **S**, we need to find length of its **Longest Palindromic Substring**. Palindrome is a string that reads the same backwards as well as forward and can be odd or even length. A substring is a **contiguous** sequence of characters within a string.

```text
Example 1
-----------
s: "ABCYRCFBTUA"
output: 1
Explanation: "ABCYRCFBTUA" => "A"
              ^
```

```text
Example 2
-----------
s: "ABCCBUA"
output: 4
Explanation: "ABCCBUA" => "BCCB"
               ^^^^
```

```text
Example 3
-----------
s: "MQADASM"
output: 3
Explanation: "MQADASM" => "ADA"
                ^^^
```

## Solution

This problem can be solved by applying `Divide and Conquer` to break down the problem into smaller subproblems. Thus, by solving these subproblems, we will arrive at our final answer. Let's try to derive the subproblems.

```text
If the first and last character matches: 2 + f(2,6) only if the remaining characters are palindrome ---|--- max
If it doesn't match: max of [0 + f(2,7)] or [0 + f(1,6)]                                            ---|
```

For palindrome, the first and last character should be the same so that it reads the same from the front and the back. Hence, to achive optimal substructure, if the first and last character matches, our answer increases by 2 and we move on to the next characters, hence, `2 + f(2,6)`. However, if the remaining characters are not palindrome, we should not increase our answer by 2 since we are looking for substring which needs to be contiguous. If it doesn't match, we should then attempt to see if the next characters on both side matches and get the max value from it. Therefore, `max of [0 + f(2,7)] or [0 + f(1,6)]`.

## Code Algortihm

```py3
def lps(s: str, start: int, end: int) -> int:
    if start > end:
      return 0

    if start == end:
      return 1

    count1 = 0
    if s[start] == s[end]:
      remainingLen = end - start - 1
      if lps(s, start+1, end-1) == remainingLen:
        count1 = 2 + remainingLen

    count2 = lps(s, start, end-1)
    count3 = lps(s, start+1, end)

    return max(count1, count2, count3)
```

## Optimisation

Let's look at the an example of the **recursion tree** see if we need to optimise this solution.

<pre class="p-5 text-white bg-dark">
                lps(0,8)
    /               |               \
  lps(1,7)        lps(1,8)        lps(0,7)
  |                |                |
  |-lps(2,6)       |-lps(2,7)       |-lps(1,6)
  |-lps(2,7)       |-lps(2,8)       |-lps(1,7)
  |-lps(1,6)       |-lps(1,7)       |-lps(0,6)
</pre>

We are computing a new of the subproblems more than once such as `lps(1,7)`. We can then apply `Dynamic Programming` to optimise the solution.

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
        remainingLen = end - start - 1
        if lps(s, start+1, end-1) == remainingLen:
          count1 = 2 + remainingLen

      count2 = lps(s, start, end-1)
      count3 = lps(s, start+1, end)

      dp[start, end] = max(count1, count2, count3)

    return dp[start, end]
```

## Bottom Up Approach

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
      </tr>
      <tr>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>C</th>
        <th>B</th>
        <th>U</th>
        <th>A</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>A1</th>
        <th>A</th>
        <td class="bg-success">1</td>
        <td>max((0),A1B1,A2B2)</td>
        <td>max((0),A1B2,A2B3)</td>
        <td>max((0),A1B6,A2B4)</td>
        <td>max((0),A1B4,A2B5)</td>
        <td>max((0),A1B5,A2B6)</td>
        <td class="bg-warning">max((A2B6==5?A2B6+2:0),A1B6,A2B7)</td>
      </tr>
      <tr>
        <th>A2</th>
        <th>B</th>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max((0),A2B2,A3B3)</td>
        <td>max((0),A2B3,A3B4)</td>
        <td class="bg-warning">max((A3B4==2?A3B4+2:0),A2B4,A3B5)</td>
        <td>max((0),A2B5,A3B6)</td>
        <td>max((0),A2B6,A3B7)</td>
      </tr>
      <tr>
        <th>A3</th>
        <th>C</th>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td class="bg-warning">max((A4B3==0?A4B3+2:0),A3B3,A4B4)</td>
        <td>max((0),A3B4,A4B5)</td>
        <td>max((0),A3B5,A4B6)</td>
        <td>max((0),A3B6,A4B7)</td>
      </tr>
      <tr>
        <th>A4</th>
        <th>C</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max((0),A4B4,A5B5)</td>
        <td>max((0),A4B5,A5B6)</td>
        <td>max((0),A4B6,A5B7)</td>
      </tr>
      <tr>
        <th>A5</th>
        <th>B</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max((0),A5B5,A6B6)</td>
        <td>max((0),A5B6,A6B7)</td>
      </tr>
      <tr>
        <th>A6</th>
        <th>U</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="bg-success">1</td>
        <td>max((0),A6B6,A7B7)</td>
      </tr>
      <tr>
        <th>A7</th>
        <th>A</th>
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

To achieve bottom up approach, we then need to solve row by row starting from the last row.

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
          length = 0
          remainingLen = col - row - 1
          if remainingLen == dp[row+1, col-1]:
            length = 2
          dp[row, col] = max(length+dp[row+1, col-1], dp[row, col-1], dp[row+1, col])
        else:
          dp[row, col] = max(dp[row, col-1], dp[row+1, col])

  return dp[0, len(s)-1]
```
