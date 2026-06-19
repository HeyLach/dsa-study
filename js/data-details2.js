// Detailed explanations part 2 — Algorithm topics
// Extends DETAIL_DATA defined in data-details.js
Object.assign(DETAIL_DATA, {

// ── Sorting ────────────────────────────────────────────────────────────────────
'sorting': {
  patterns: [
    {
      detail: 'Python sorted() / list.sort() 接受 key 函式，可以一行完成複雜排序：按頻次、按多鍵、按自訂比較。不需手寫排序演算法，但需要理解穩定性（相同 key 保持原順序）。',
      code:
`# 按頻次降序、字母升序排序
from collections import Counter
def frequencySort(s):
    cnt=Counter(s)
    return ''.join(sorted(s, key=lambda c:(-cnt[c],c)))

# 區間排程：按結束時間升序
intervals=[[1,3],[2,6],[8,10]]
intervals.sort(key=lambda x:x[1])

# 多鍵排序（先按長度，再按字母序）
words=["banana","apple","cherry"]
words.sort(key=lambda w:(len(w),w))
print(words)   # ['apple', 'banana', 'cherry']`
    },
    {
      detail: 'Quick Select 是 Quick Sort 的單邊版本：分區後只遞迴含第 K 個元素的那側。平均 O(n)（每次約砍半），最壞 O(n²)（已排序+固定 pivot），可用隨機 pivot 規避。',
      code:
`import random
def quickSelect(nums, k):
    """找第 k 大（1-indexed）"""
    def partition(l, r):
        pivot_idx=random.randint(l,r)
        nums[pivot_idx],nums[r]=nums[r],nums[pivot_idx]
        pivot=nums[r]; i=l
        for j in range(l,r):
            if nums[j]>=pivot:
                nums[i],nums[j]=nums[j],nums[i]; i+=1
        nums[i],nums[r]=nums[r],nums[i]; return i
    l,r=0,len(nums)-1; target=k-1
    while l<r:
        p=partition(l,r)
        if p==target: break
        elif p<target: l=p+1
        else: r=p-1
    return nums[target]`
    },
    {
      detail: 'Merge Sort 分治：把陣列對半分，遞迴排好兩半，再 merge（雙指針比較）。穩定且 O(n log n) 保證。逆序對計數在 merge 步驟中統計：當右半元素先被選，左半剩餘元素個數即新增逆序對。',
      code:
`def mergeSort(arr):
    if len(arr)<=1: return arr,0
    m=len(arr)//2
    L,lc=mergeSort(arr[:m])
    R,rc=mergeSort(arr[m:])
    merged=[]; i=j=0; inv=lc+rc
    while i<len(L) and j<len(R):
        if L[i]<=R[j]: merged.append(L[i]); i+=1
        else:
            merged.append(R[j]); j+=1
            inv+=len(L)-i   # 右半元素比左半 L[i..] 都小 → 逆序對
    merged+=L[i:]+R[j:]
    return merged,inv`
    },
    {
      detail: '計數排序：建一個大小為 max_val+1 的 count 陣列，統計每個值出現次數，再重建。O(n+k)，k 為值域大小。桶排序：把元素分配到各桶（每桶代表一個值域區間），各桶內排序後串接。',
      code:
`# 計數排序（值域 [0,k]）
def countingSort(nums, k):
    count=[0]*(k+1)
    for v in nums: count[v]+=1
    res=[];
    for v,c in enumerate(count): res+=[v]*c
    return res

# 桶排序（浮點數 [0,1)）
def bucketSort(nums):
    n=len(nums); buckets=[[] for _ in range(n)]
    for v in nums: buckets[int(v*n)].append(v)
    for b in buckets: b.sort()   # 每桶 insertion sort
    return [v for b in buckets for v in b]`
    },
  ],
  variations: [
    {
      detail: 'Quick Select 只需遞迴一側，平均 O(n)。面試時 heapq.nlargest(k,nums) 是 O(n log k)，Quick Select 是 O(n)，後者理論更優。隨機化 pivot 避免最壞情況。',
      code:
`# LC 215 — Kth Largest Element
import random
def findKthLargest(nums, k):
    def sel(l,r,idx):
        if l==r: return nums[l]
        p=random.randint(l,r)
        nums[p],nums[r]=nums[r],nums[p]
        pivot=nums[r]; i=l
        for j in range(l,r):
            if nums[j]>=pivot: nums[i],nums[j]=nums[j],nums[i]; i+=1
        nums[i],nums[r]=nums[r],nums[i]
        if i==idx: return nums[i]
        elif i<idx: return sel(i+1,r,idx)
        else: return sel(l,i-1,idx)
    return sel(0,len(nums)-1,k-1)`
    },
    {
      detail: '桶排序適合值域有限的整數：每個值一個桶（計數排序）或值域等分區間（一般桶排序）。最大間距問題（LC 164）用桶排序 O(n)：n 個數放進 n+1 個桶，最大間距必在相鄰非空桶之間。',
      code:
`# Maximum Gap (LC 164) — 桶排序
def maximumGap(nums):
    if len(nums)<2: return 0
    lo,hi=min(nums),max(nums)
    if lo==hi: return 0
    n=len(nums); size=max(1,(hi-lo)//(n-1))
    buckets=[[None,None] for _ in range((hi-lo)//size+1)]
    for v in nums:
        i=(v-lo)//size
        buckets[i][0]=v if buckets[i][0] is None else min(buckets[i][0],v)
        buckets[i][1]=v if buckets[i][1] is None else max(buckets[i][1],v)
    ans=0; prev_max=lo
    for mn,mx in buckets:
        if mn is None: continue
        ans=max(ans,mn-prev_max); prev_max=mx
    return ans`
    },
    {
      detail: '計數排序適合值域 [0,k]，k=O(n) 時總複雜度 O(n)。Sort Colors (LC 75, Dutch National Flag)：三路分區，把 0/1/2 一次分好，無需計數排序，O(n) 一趟完成。',
      code:
`# Dutch National Flag / Sort Colors (LC 75)
def sortColors(nums):
    lo=mid=0; hi=len(nums)-1
    while mid<=hi:
        if nums[mid]==0:
            nums[lo],nums[mid]=nums[mid],nums[lo]
            lo+=1; mid+=1
        elif nums[mid]==1:
            mid+=1
        else:
            nums[mid],nums[hi]=nums[hi],nums[mid]
            hi-=1   # mid 不前進（新交換來的值未檢查）`
    },
    {
      detail: '逆序對：陣列中 i<j 且 nums[i]>nums[j] 的對數。用 Merge Sort：merge 時若右半的 R[j] 比左半的 L[i] 小，則 L[i..] 都和 R[j] 構成逆序對（共 len(L)-i 個）。',
      code:
`def countInversions(arr):
    def msort(a):
        if len(a)<=1: return a,0
        m=len(a)//2
        L,lc=msort(a[:m]); R,rc=msort(a[m:])
        merged=[]; i=j=inv=0; inv=lc+rc
        while i<len(L) and j<len(R):
            if L[i]<=R[j]: merged.append(L[i]); i+=1
            else:
                merged.append(R[j]); j+=1
                inv+=len(L)-i   # L[i..] 全都比 R[j] 大
        return merged+L[i:]+R[j:], inv
    _,count=msort(arr); return count`
    },
  ],
},

// ── Binary Search ──────────────────────────────────────────────────────────────
'binary-search': {
  patterns: [
    {
      detail: '閉區間模板 [lo,hi]：while lo<=hi，找到返回 mid，否則縮小區間（hi=mid-1 或 lo=mid+1）。適合「精確查找」。找左邊界時即使找到也繼續往左（hi=mid-1），退出後 lo 即最左位置。',
      code:
`def search(nums, target):
    lo,hi=0,len(nums)-1
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if nums[mid]==target: return mid
        elif nums[mid]<target: lo=mid+1
        else: hi=mid-1
    return -1

# 找最左出現位置（left bound）
def leftBound(nums, target):
    lo,hi=0,len(nums)-1; res=-1
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if nums[mid]==target: res=mid; hi=mid-1  # 繼續往左
        elif nums[mid]<target: lo=mid+1
        else: hi=mid-1
    return res`
    },
    {
      detail: '旋轉排序陣列一定有一半是有序的：比較 nums[lo] 和 nums[mid]。若 nums[lo]<=nums[mid]，左半有序；否則右半有序。確認 target 是否在有序的那半，再決定往哪側縮。',
      code:
`def searchRotated(nums, target):
    lo,hi=0,len(nums)-1
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if nums[mid]==target: return mid
        if nums[lo]<=nums[mid]:          # 左半有序
            if nums[lo]<=target<nums[mid]: hi=mid-1
            else: lo=mid+1
        else:                            # 右半有序
            if nums[mid]<target<=nums[hi]: lo=mid+1
            else: hi=mid-1
    return -1`
    },
    {
      detail: '「二元搜尋答案」：答案空間是一個範圍 [lo,hi]，對「候選答案 mid」定義 feasible(mid) 函式（能否滿足條件），找最小/最大可行 mid。feasible 函式通常是貪婪模擬。',
      code:
`# Koko Eating Bananas (LC 875)
def minEatingSpeed(piles, h):
    import math
    def feasible(speed):
        return sum(math.ceil(p/speed) for p in piles) <= h
    lo,hi=1,max(piles)
    while lo<hi:
        mid=lo+(hi-lo)//2
        if feasible(mid): hi=mid   # 可行，試更小
        else: lo=mid+1             # 不可行，增大
    return lo

# Capacity to Ship (LC 1011) — 同樣框架
def shipWithinDays(weights, days):
    def feasible(cap):
        days_needed=1; cur=0
        for w in weights:
            if cur+w>cap: days_needed+=1; cur=0
            cur+=w
        return days_needed<=days
    lo,hi=max(weights),sum(weights)
    while lo<hi:
        mid=lo+(hi-lo)//2
        if feasible(mid): hi=mid
        else: lo=mid+1
    return lo`
    },
    {
      detail: 'Python bisect_left(arr,x) 返回 x 可插入的最左位置（等同 lower_bound），bisect_right 返回最右位置（upper_bound）。直接用來實作「找第一個 >=x 的位置」等查詢。',
      code:
`from bisect import bisect_left, bisect_right

arr=[1,3,3,5,7]
print(bisect_left(arr,3))   # 1 (第一個 3 的 index)
print(bisect_right(arr,3))  # 3 (最後一個 3 的後一個 index)

# 計算 target 出現次數
def countTarget(arr,target):
    return bisect_right(arr,target)-bisect_left(arr,target)

# 找第一個 >= target 的 index
def lowerBound(arr,target):
    return bisect_left(arr,target)

# Search Insert Position (LC 35)
def searchInsert(nums,target):
    return bisect_left(nums,target)`
    },
  ],
  variations: [
    {
      detail: '旋轉陣列找最小值（LC 153）：和 nums[hi] 比較而非 nums[lo]。若 nums[mid]>nums[hi]，最小值在右半；否則在左半（包含 mid）。注意模板：hi=mid（不是 mid-1），因為 mid 可能是答案。',
      code:
`def findMin(nums):
    lo,hi=0,len(nums)-1
    while lo<hi:
        mid=lo+(hi-lo)//2
        if nums[mid]>nums[hi]: lo=mid+1   # 最小在右半
        else: hi=mid                       # mid 可能是最小
    return nums[lo]

# 找旋轉點 index（最大值）
def findRotationIndex(nums):
    lo,hi=0,len(nums)-1
    while lo<hi:
        mid=lo+(hi-lo)//2
        if nums[mid]>nums[hi]: lo=mid+1
        else: hi=mid
    return lo-1 if lo>0 else len(nums)-1`
    },
    {
      detail: '二元搜尋答案的通用框架：1) 確認答案值域 [lo,hi]；2) 寫 feasible(mid) 貪婪判斷；3) 根據求最小還是最大決定縮小方向。這個框架可以解幾十道看似不相關的題目。',
      code:
`# 通用框架：找最小可行值
def binarySearchAnswer(lo, hi, feasible_fn):
    while lo < hi:
        mid = lo + (hi-lo)//2
        if feasible_fn(mid): hi = mid    # 可行，試更小
        else: lo = mid+1                 # 不可行，增大
    return lo   # lo==hi 時就是答案

# Split Array Largest Sum (LC 410)
def splitArray(nums, m):
    def feasible(cap):
        parts=1; cur=0
        for v in nums:
            if cur+v>cap: parts+=1; cur=0
            cur+=v
        return parts<=m
    return binarySearchAnswer(max(nums), sum(nums), feasible)`
    },
    {
      detail: '浮點數二元搜尋：把 while 條件改為 while hi-lo > 1e-6（或迭代固定次數如 100 次）。mid=(lo+hi)/2，根據 f(mid) 和目標比較決定方向。適合求平方根、幾何問題的精確解。',
      code:
`# Sqrt(x) 整數版 (LC 69)
def mySqrt(x):
    lo,hi=0,x
    while lo<hi:
        mid=lo+(hi-lo+1)//2    # 上取整防無限迴圈
        if mid*mid<=x: lo=mid
        else: hi=mid-1
    return lo

# 浮點數 sqrt
def sqrtFloat(x, precision=1e-7):
    lo,hi=0.0,max(1.0,float(x))
    while hi-lo>precision:
        mid=(lo+hi)/2
        if mid*mid<x: lo=mid
        else: hi=mid
    return (lo+hi)/2`
    },
    {
      detail: '二維矩陣二元搜尋（LC 74）：m×n 矩陣視為長度 m*n 的有序陣列。mid 轉換：row=mid//n, col=mid%n。前提：矩陣每行升序，且下一行第一個元素 > 上一行最後一個。',
      code:
`def searchMatrix(matrix, target):
    if not matrix: return False
    m,n=len(matrix),len(matrix[0])
    lo,hi=0,m*n-1
    while lo<=hi:
        mid=lo+(hi-lo)//2
        v=matrix[mid//n][mid%n]  # 二維轉一維
        if v==target: return True
        elif v<target: lo=mid+1
        else: hi=mid-1
    return False`
    },
  ],
},

// ── BFS / DFS ──────────────────────────────────────────────────────────────────
'bfs-dfs': {
  patterns: [
    {
      detail: 'BFS 標準框架：deque + visited set，enqueue 時立刻標記 visited（不是 dequeue 時）。level 計數用「拍 snapshot: sz=len(q)」，處理完 sz 個節點後 level+1。',
      code:
`from collections import deque
def bfs(graph, start):
    q=deque([start]); vis={start}; level=0
    while q:
        for _ in range(len(q)):     # 逐層處理
            u=q.popleft()
            for v in graph[u]:
                if v not in vis:
                    vis.add(v); q.append(v)
        level+=1
    return level-1  # 最大層數

# Word Ladder (LC 127)
def ladderLength(beginWord, endWord, wordList):
    wset=set(wordList)
    if endWord not in wset: return 0
    q=deque([(beginWord,1)])
    while q:
        word,steps=q.popleft()
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                nw=word[:i]+c+word[i+1:]
                if nw==endWord: return steps+1
                if nw in wset: wset.discard(nw); q.append((nw,steps+1))
    return 0`
    },
    {
      detail: 'DFS 遞迴框架：先標記訪問，再對鄰居遞迴。有向圖判環需三色（0/1/2）。回溯型 DFS（如排列）需要在遞迴後撤銷標記（unmark）。',
      code:
`# 島嶼面積 DFS (LC 695)
def maxAreaOfIsland(grid):
    R,C=len(grid),len(grid[0])
    def dfs(r,c):
        if r<0 or r>=R or c<0 or c>=C or grid[r][c]==0: return 0
        grid[r][c]=0   # 標記訪問（原地修改）
        return 1+dfs(r+1,c)+dfs(r-1,c)+dfs(r,c+1)+dfs(r,c-1)
    return max(dfs(r,c) for r in range(R) for c in range(C))

# 有向圖三色判環
def hasCycle(graph, n):
    color=[0]*n  # 0:白 1:灰(訪問中) 2:黑(完成)
    def dfs(u):
        color[u]=1
        for v in graph.get(u,[]):
            if color[v]==1: return True   # back edge = 環
            if color[v]==0 and dfs(v): return True
        color[u]=2; return False
    return any(dfs(i) for i in range(n) if color[i]==0)`
    },
    {
      detail: '迭代 DFS 用顯式 stack 取代系統遞迴，避免 Python 遞迴深度限制（預設 1000）。注意：stack 是 LIFO，所以入棧順序要反轉才能得到和遞迴相同的遍歷順序。',
      code:
`def dfsIterative(root):
    if not root: return []
    stk=[root]; res=[]
    while stk:
        node=stk.pop()
        res.append(node.val)
        if node.right: stk.append(node.right)  # 先 right 後 left
        if node.left:  stk.append(node.left)   # left 後入先出
    return res  # 前序遍歷結果

# 後序（左右根）：兩個 stack 或反轉前序
def postorderIterative(root):
    if not root: return []
    stk=[root]; res=[]
    while stk:
        n=stk.pop(); res.append(n.val)
        if n.left:  stk.append(n.left)
        if n.right: stk.append(n.right)
    return res[::-1]  # 反轉得到後序`
    },
    {
      detail: 'Kahn\'s BFS 拓撲排序：建 in-degree 陣列，in-degree=0 的節點入隊（可先開始執行），每處理一個節點就把鄰居 in-degree-1，降為 0 則入隊。若最後計數 < n，圖中有環。',
      code:
`from collections import deque, defaultdict
def topoSort(n, prereqs):
    graph=defaultdict(list); indegree=[0]*n
    for a,b in prereqs:   # b → a（b 是 a 的前置）
        graph[b].append(a); indegree[a]+=1
    q=deque(i for i in range(n) if indegree[i]==0)
    order=[]
    while q:
        u=q.popleft(); order.append(u)
        for v in graph[u]:
            indegree[v]-=1
            if indegree[v]==0: q.append(v)
    return order if len(order)==n else []`
    },
  ],
  variations: [
    {
      detail: '多源 BFS：所有源點距離=0 同時入隊，BFS 自然計算各節點到最近源的距離。典型：腐爛橘子、城堡護城河距離、01矩陣。比「對每個源單獨 BFS」快得多（O(mn) vs O(sources × mn)）。',
      code:
`# Gates and Rooms (LC 286) — 多源 BFS
from collections import deque
INF=2**31-1
def wallsAndGates(rooms):
    R,C=len(rooms),len(rooms[0])
    q=deque((r,c) for r in range(R) for c in range(C) if rooms[r][c]==0)
    while q:
        r,c=q.popleft()
        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C and rooms[nr][nc]==INF:
                rooms[nr][nc]=rooms[r][c]+1
                q.append((nr,nc))`
    },
    {
      detail: '雙向 BFS：從 start 和 end 各維護一個 visited set，每次擴展較小的那個。當兩個 set 的鄰居有交集時，找到最短路徑。搜尋空間從 O(b^d) 降至 O(2 × b^(d/2))，指數級加速。',
      code:
`def bidirectionalBFS(start, end, graph):
    if start==end: return 0
    front={start}; back={end}
    visited_f={start}; visited_b={end}; dist=0
    while front and back:
        dist+=1
        # 每次擴展較小的 frontier
        if len(front)>len(back): front,back=back,front; visited_f,visited_b=visited_b,visited_f
        next_front=set()
        for node in front:
            for nb in graph.get(node,[]):
                if nb in visited_b: return dist   # 找到！
                if nb not in visited_f:
                    visited_f.add(nb); next_front.add(nb)
        front=next_front
    return -1`
    },
    {
      detail: '迭代 DFS（顯式 stack）讓你在 push 和 pop 時都能做事。前序：pop 時處理；後序需要兩次訪問（第一次 push 子節點，第二次 pop 時處理），可用 visited 標記或反轉法。',
      code:
`# 中序迭代 DFS（最實用）
def inorderIterative(root):
    stk=[]; cur=root; res=[]
    while cur or stk:
        while cur:             # 一路往左壓
            stk.append(cur); cur=cur.left
        cur=stk.pop()
        res.append(cur.val)    # 訪問根
        cur=cur.right          # 轉向右子樹
    return res

# 通用後序（前序反轉）
def postorderIterative(root):
    stk=[root]; res=[]
    while stk:
        n=stk.pop(); res.append(n.val)
        if n.left: stk.append(n.left)
        if n.right: stk.append(n.right)
    return res[::-1]`
    },
    {
      detail: 'DFS 後序完成順序的反轉即拓撲序。Post-order DFS：完成遞迴後把節點 push 到結果 stack，最後反轉。若發現環（灰色節點），拓撲排序不存在。',
      code:
`def topoBFS(n, edges):   # Kahn 版（更直觀，可檢測環）
    from collections import defaultdict, deque
    g=defaultdict(list); ind=[0]*n
    for u,v in edges: g[u].append(v); ind[v]+=1
    q=deque(i for i in range(n) if ind[i]==0)
    order=[]
    while q:
        u=q.popleft(); order.append(u)
        for v in g[u]:
            ind[v]-=1
            if ind[v]==0: q.append(v)
    return order if len(order)==n else None  # None=有環

# Alien Dictionary (LC 269) — 拓撲應用
# 從相鄰字對的第一個不同字元建邊，拓撲排序`
    },
  ],
},

// ── Dynamic Programming ────────────────────────────────────────────────────────
'dynamic-programming': {
  patterns: [
    {
      detail: '1D DP 只依賴前一兩個狀態時，可以用兩個變量代替陣列（O(1) 空間）。關鍵：先計算新值再更新，或用 a,b = b, a+b 同步更新。背包類 1D DP 通常需要從後往前掃（避免重複使用）。',
      code:
`# Climbing Stairs (LC 70) — O(1) 空間
def climbStairs(n):
    a,b=1,1
    for _ in range(n-1): a,b=b,a+b
    return b

# House Robber (LC 198)
def rob(nums):
    prev2=prev1=0
    for v in nums:
        prev2,prev1=prev1,max(prev1,prev2+v)
    return prev1

# Jump Game (LC 55) — DP 或貪婪均可
def canJump(nums):
    reach=0
    for i,v in enumerate(nums):
        if i>reach: return False
        reach=max(reach,i+v)
    return True`
    },
    {
      detail: '2D DP 常用於字串比對或矩陣路徑。狀態定義 dp[i][j] = 前 i 個 s1 字元和前 j 個 s2 字元的最優解。字元相同時可繼承 dp[i-1][j-1]+1（LCS 類），不同時取相鄰狀態的最優（Edit Distance 類）。',
      code:
`# Longest Common Subsequence (LC 1143)
def longestCommonSubsequence(s1,s2):
    m,n=len(s1),len(s2)
    dp=[[0]*(n+1) for _ in range(m+1)]
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1
            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
    return dp[m][n]

# Edit Distance (LC 72)
def minDistance(s1,s2):
    m,n=len(s1),len(s2)
    dp=[[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0]=i
    for j in range(n+1): dp[0][j]=j
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]
            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
    return dp[m][n]`
    },
    {
      detail: '0/1 背包（每個物品只能選一次）：外層迴圈物品，內層迴圈容量**從大到小**（防止同一物品被選兩次）。完全背包（可重複選）：內層從小到大。這個方向的差別非常重要。',
      code:
`# 0/1 背包
def knapsack01(weights, values, capacity):
    dp=[0]*(capacity+1)
    for w,v in zip(weights,values):
        for j in range(capacity,w-1,-1):  # 從大到小（0/1）
            dp[j]=max(dp[j],dp[j-w]+v)
    return dp[capacity]

# 完全背包（可重複選）— Coin Change (LC 322)
def coinChange(coins, amount):
    dp=[float('inf')]*(amount+1); dp[0]=0
    for c in coins:
        for j in range(c,amount+1):       # 從小到大（完全背包）
            dp[j]=min(dp[j],dp[j-c]+1)
    return dp[amount] if dp[amount]!=float('inf') else -1`
    },
    {
      detail: '區間 DP：dp[i][j] = 區間 [i,j] 的最優解。填表順序按區間長度從小到大。轉移：枚舉分割點 k，dp[i][j] = opt(dp[i][k] + dp[k+1][j] + cost(i,k,j))。',
      code:
`# Burst Balloons (LC 312)
def maxCoins(nums):
    nums=[1]+nums+[1]; n=len(nums)
    dp=[[0]*n for _ in range(n)]
    for length in range(2,n):   # 區間長度
        for i in range(0,n-length):
            j=i+length
            for k in range(i+1,j):  # k 是「最後一個被戳破」
                dp[i][j]=max(dp[i][j],
                    dp[i][k]+nums[i]*nums[k]*nums[j]+dp[k][j])
    return dp[0][n-1]`
    },
  ],
  variations: [
    {
      detail: '1D DP 空間優化：若 dp[i] 只依賴 dp[i-1] 和 dp[i-2]，用兩個變量代替整個陣列；若依賴整行，用滾動陣列（交替用兩行）。',
      code:
`# Unique Paths (LC 62) — 2D→1D 空間優化
def uniquePaths(m,n):
    dp=[1]*n
    for i in range(1,m):
        for j in range(1,n):
            dp[j]+=dp[j-1]   # dp[j] 原值=從上方來，dp[j-1]=從左方來
    return dp[n-1]

# Minimum Path Sum (LC 64)
def minPathSum(grid):
    m,n=len(grid),len(grid[0])
    dp=grid[0][:]
    for j in range(1,n): dp[j]+=dp[j-1]  # 第一行
    for i in range(1,m):
        dp[0]+=grid[i][0]                  # 第一列
        for j in range(1,n):
            dp[j]=grid[i][j]+min(dp[j],dp[j-1])
    return dp[n-1]`
    },
    {
      detail: '2D DP 的經典題型：最長公共子序列（LCS）、編輯距離、正則表達式匹配。dp[i][j] 定義清楚後，轉移方程通常只有 2-3 種情況（字元相等/不等）。',
      code:
`# Regular Expression Matching (LC 10) — 難題
def isMatch(s,p):
    m,n=len(s),len(p)
    dp=[[False]*(n+1) for _ in range(m+1)]
    dp[0][0]=True
    for j in range(1,n+1):
        if p[j-1]=='*': dp[0][j]=dp[0][j-2]  # 空字串也需初始化
    for i in range(1,m+1):
        for j in range(1,n+1):
            if p[j-1]=='*':
                dp[i][j]=dp[i][j-2]  # '*' 匹配 0 次
                if p[j-2] in {s[i-1],'.'}: dp[i][j]|=dp[i-1][j]  # 匹配 1+ 次
            elif p[j-1]=='.' or p[j-1]==s[i-1]:
                dp[i][j]=dp[i-1][j-1]
    return dp[m][n]`
    },
    {
      detail: '0/1 背包方向記憶：**0/1 從右到左**（確保每個物品只被選一次）；**完全背包從左到右**（允許重複使用）。口訣：「01 倒，完全正」。這是背包類 DP 最容易出錯的地方。',
      code:
`# Partition Equal Subset Sum (LC 416) — 0/1 背包
def canPartition(nums):
    total=sum(nums)
    if total%2: return False
    target=total//2
    dp=[False]*(target+1); dp[0]=True
    for v in nums:
        for j in range(target,v-1,-1):  # 從右到左（0/1）
            dp[j]|=dp[j-v]
    return dp[target]

# Combination Sum IV (LC 377) — 完全背包（順序計入）
def combinationSum4(nums, target):
    dp=[0]*(target+1); dp[0]=1
    for j in range(1,target+1):    # 外層枚舉目標值
        for v in nums:             # 內層枚舉物品（完全背包）
            if j>=v: dp[j]+=dp[j-v]
    return dp[target]`
    },
    {
      detail: '區間 DP 的關鍵：枚舉「分割點 k」或「最後操作的元素 k」，把大區間分解成兩個小區間的組合。填表順序必須按區間長度從小到大（短區間先填，長區間依賴短區間）。',
      code:
`# Matrix Chain Multiplication — 區間 DP 原型
def minMatrixChain(dims):
    n=len(dims)-1   # n 個矩陣
    dp=[[0]*n for _ in range(n)]
    for length in range(2,n+1):
        for i in range(n-length+1):
            j=i+length-1
            dp[i][j]=float('inf')
            for k in range(i,j):
                cost=dp[i][k]+dp[k+1][j]+dims[i]*dims[k+1]*dims[j+1]
                dp[i][j]=min(dp[i][j],cost)
    return dp[0][n-1]`
    },
  ],
},

// ── Greedy ─────────────────────────────────────────────────────────────────────
'greedy': {
  patterns: [
    {
      detail: '貪婪選擇需要「交換論證」：假設最優解不選當前貪婪選擇，把它替換進去後，解不會變差。區間排程的交換論證：選最早結束的區間，剩下空間最多，可能選到更多區間。',
      code:
`# Activity Selection / Non-overlapping Intervals (LC 435)
def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x:x[1])   # 按結束時間排序
    count=0; end=float('-inf')
    for start,finish in intervals:
        if start>=end:   # 不重疊
            end=finish   # 選這個區間
        else:
            count+=1     # 需要刪除（重疊了）
    return count

# Meeting Rooms II (LC 253)：需要幾個房間
import heapq
def minMeetingRooms(intervals):
    intervals.sort()
    h=[]  # 最小堆：記錄各房間的結束時間
    for start,end in intervals:
        if h and h[0]<=start: heapq.heappop(h)  # 釋放最早結束的房間
        heapq.heappush(h,end)
    return len(h)  # heap 大小 = 需要的房間數`
    },
    {
      detail: 'max_reach 維護「目前能到達的最遠 index」。掃描每個 index i：若 i>max_reach 說明無法到達，返回 False；否則更新 max_reach=max(max_reach, i+nums[i])。Jump Game II 用「層邊界」計數跳躍次數。',
      code:
`# Jump Game I (LC 55)
def canJump(nums):
    reach=0
    for i,v in enumerate(nums):
        if i>reach: return False
        reach=max(reach,i+v)
    return True

# Jump Game II (LC 45) — 最少跳躍數
def jump(nums):
    jumps=cur_end=cur_far=0
    for i in range(len(nums)-1):
        cur_far=max(cur_far,i+nums[i])
        if i==cur_end:        # 到達當前層的邊界
            jumps+=1
            cur_end=cur_far   # 進入下一層
    return jumps`
    },
    {
      detail: '排序 + 配對：把兩個陣列分別排序後，按序匹配。小配小（Assign Cookies）或大配大（Advantage Shuffle）。貪婪正確性：配錯了不如配對，交換後只會更好或相同。',
      code:
`# Assign Cookies (LC 455)
def findContentChildren(g,s):
    g.sort(); s.sort()
    i=j=0
    while i<len(g) and j<len(s):
        if s[j]>=g[i]: i+=1   # 滿足了一個小孩
        j+=1                   # 餅乾無論如何都用掉
    return i

# Candy (LC 135) — 兩次貪婪掃描
def candy(ratings):
    n=len(ratings); candy=[1]*n
    for i in range(1,n):               # 左→右
        if ratings[i]>ratings[i-1]: candy[i]=candy[i-1]+1
    for i in range(n-2,-1,-1):         # 右→左
        if ratings[i]>ratings[i+1]: candy[i]=max(candy[i],candy[i+1]+1)
    return sum(candy)`
    },
    {
      detail: 'Priority Queue 貪婪：每次從可選項中取最優（最小 cost / 最大 profit）。用 min-heap（Python 預設），最大 profit 用負值 trick。典型：Task Scheduler（頻次最高的先執行），IPO（資金允許時選利潤最高的）。',
      code:
`# IPO (LC 502) — 先投資能做的利潤最大的項目
import heapq
def findMaximizedCapital(k, w, profits, capital):
    projects=sorted(zip(capital,profits))
    available=[]; i=0
    for _ in range(k):
        while i<len(projects) and projects[i][0]<=w:
            heapq.heappush(available,-projects[i][1])  # max-heap
            i+=1
        if not available: break
        w+=-heapq.heappop(available)  # 選利潤最大的
    return w`
    },
  ],
  variations: [
    {
      detail: '區間排程經典結論：按**結束時間**升序排列後，貪婪選擇不重疊的最多區間。刪除最少區間使剩餘不重疊 = n - 最多不重疊數。',
      code:
`# LC 435 — 刪除最少使不重疊
def eraseOverlapIntervals(intervals):
    if not intervals: return 0
    intervals.sort(key=lambda x:x[1])
    keep=1; end=intervals[0][1]
    for s,e in intervals[1:]:
        if s>=end: keep+=1; end=e
    return len(intervals)-keep

# LC 56 — 合併重疊區間（按開始時間排序）
def merge(intervals):
    intervals.sort(); res=[intervals[0]]
    for s,e in intervals[1:]:
        if s<=res[-1][1]: res[-1][1]=max(res[-1][1],e)
        else: res.append([s,e])
    return res`
    },
    {
      detail: 'Jump Game 系列：I 問能否到達（貪婪 O(n)），II 問最少步數（層邊界計數），III 問能否到達值為 0 的位置（DFS/BFS）。max_reach 是最核心的概念。',
      code:
`# Jump Game III (LC 1306) — BFS
from collections import deque
def canReach(arr, start):
    q=deque([start]); vis=set()
    while q:
        i=q.popleft()
        if arr[i]==0: return True
        if i in vis: continue
        vis.add(i)
        for ni in [i+arr[i],i-arr[i]]:
            if 0<=ni<len(arr) and ni not in vis:
                q.append(ni)
    return False`
    },
    {
      detail: '分配問題的貪婪思路：排序後一一對應匹配。Assign Cookies 小配小；Advantage Shuffle 大欺小（略大於對方的牌才去打，不然直接扔最小牌）。',
      code:
`# Advantage Shuffle (LC 870)
import sortedcontainers
def advantageCount(nums, queries):
    SL=sortedcontainers.SortedList(nums)
    res=[]
    for q in queries:
        idx=SL.bisect_right(q)    # 找剛好能贏的最小值
        if idx==len(SL): idx=0    # 贏不了就扔最小
        res.append(SL.pop(idx))
    return res`
    },
    {
      detail: 'Huffman 編碼：每次合併頻次最小的兩個節點，合併代價 = 兩者頻次之和，新節點加回 min-heap。總代價 = 所有合併代價之和。等價於 LC 1167 連接棍子最小代價。',
      code:
`import heapq
def connectSticks(sticks):
    heapq.heapify(sticks)
    cost=0
    while len(sticks)>1:
        a=heapq.heappop(sticks)
        b=heapq.heappop(sticks)
        cost+=a+b
        heapq.heappush(sticks,a+b)
    return cost`
    },
  ],
},

// ── Backtracking ───────────────────────────────────────────────────────────────
'backtracking': {
  patterns: [
    {
      detail: '核心框架：for 每個選擇 → 做選擇（加入 path）→ 遞迴 → 撤銷選擇（移出 path）。收集結果時用 path[:] 複製，不能存引用。剪枝放在「做選擇」前：提前排除不可能的分支。',
      code:
`def backtrack(choices, path, result):
    if is_complete(path):
        result.append(path[:])   # 複製！
        return
    for c in choices:
        if is_valid(c, path):    # 剪枝
            path.append(c)
            backtrack(choices, path, result)
            path.pop()           # 撤銷

# Subsets (LC 78)
def subsets(nums):
    res=[];
    def bt(start,path):
        res.append(path[:])
        for i in range(start,len(nums)):
            path.append(nums[i])
            bt(i+1,path)
            path.pop()
    bt(0,[]); return res`
    },
    {
      detail: '組合（不重複使用同一元素）：下次遞迴的 start 從 i+1 開始（不往回走）。允許重複使用：下次 start 仍從 i 開始。有重複元素需要先排序，然後跳過 nums[i]==nums[i-1]（且 i>start）。',
      code:
`# Combination Sum (LC 39) — 元素可重複使用
def combinationSum(candidates, target):
    res=[]
    def bt(start,path,remain):
        if remain==0: res.append(path[:]); return
        for i in range(start,len(candidates)):
            if candidates[i]>remain: break  # 已排序，可剪枝
            path.append(candidates[i])
            bt(i,path,remain-candidates[i])  # i 不是 i+1（可重複）
            path.pop()
    candidates.sort(); bt(0,[],target); return res

# Combination Sum II (LC 40) — 元素不可重複
def combinationSum2(candidates, target):
    candidates.sort(); res=[]
    def bt(start,path,remain):
        if remain==0: res.append(path[:]); return
        for i in range(start,len(candidates)):
            if i>start and candidates[i]==candidates[i-1]: continue  # 去重
            if candidates[i]>remain: break
            path.append(candidates[i])
            bt(i+1,path,remain-candidates[i])
            path.pop()
    bt(0,[],target); return res`
    },
    {
      detail: '排列問題：需要知道哪些元素已被使用，用 used[] 布林陣列標記。每次從頭遍歷，跳過已用的。去重排列（有重複元素）：排序後，若 nums[i]==nums[i-1] 且 !used[i-1]，則跳過。',
      code:
`# Permutations (LC 46)
def permute(nums):
    res=[]; n=len(nums); used=[False]*n
    def bt(path):
        if len(path)==n: res.append(path[:]); return
        for i in range(n):
            if used[i]: continue
            used[i]=True; path.append(nums[i])
            bt(path)
            used[i]=False; path.pop()
    bt([]); return res

# Permutations II (LC 47) — 去重
def permuteUnique(nums):
    nums.sort(); res=[]; used=[False]*len(nums)
    def bt(path):
        if len(path)==len(nums): res.append(path[:]); return
        for i in range(len(nums)):
            if used[i]: continue
            if i>0 and nums[i]==nums[i-1] and not used[i-1]: continue  # 去重！
            used[i]=True; path.append(nums[i]); bt(path)
            used[i]=False; path.pop()
    bt([]); return res`
    },
    {
      detail: '去重技巧的本質：「在同一遞迴層（同一 start 位置）不允許相同值被選兩次」。排序後相鄰的相同元素，第一次選是合法的，第二次在同層選就跳過（i>start && nums[i]==nums[i-1]）。',
      code:
`# Subsets II (LC 90) — 去重子集
def subsetsWithDup(nums):
    nums.sort(); res=[]
    def bt(start,path):
        res.append(path[:])
        for i in range(start,len(nums)):
            if i>start and nums[i]==nums[i-1]: continue  # 同層去重
            path.append(nums[i]); bt(i+1,path); path.pop()
    bt(0,[]); return res`
    },
  ],
  variations: [
    {
      detail: '去重排列/組合：排序讓相同元素相鄰，在同一遞迴層跳過重複。排列用 used[] + "not used[i-1]" 條件；組合用 "i>start" 條件。兩種方式都是確保同層不選相同值兩次。',
      code:
`# 通用去重模板
def bt_dedup(nums, start, path, res):
    res.append(path[:])
    for i in range(start, len(nums)):
        # 組合去重：同層跳過重複
        if i > start and nums[i] == nums[i-1]: continue
        path.append(nums[i])
        bt_dedup(nums, i+1, path, res)
        path.pop()

nums = [1,2,2]; nums.sort()
res = []; bt_dedup(nums, 0, [], res)
# res = [[], [1], [1,2], [1,2,2], [2], [2,2]]`
    },
    {
      detail: '矩陣 DFS 回溯：訪問前標記（grid[r][c]="#" 或 visited.add），遞迴完後還原（grid[r][c]=ch 或 visited.remove）。確保同一條路徑不重複使用同一格，但不同路徑可以使用同一格。',
      code:
`# Word Search (LC 79)
def exist(board, word):
    R,C=len(board),len(board[0])
    def dfs(r,c,i):
        if i==len(word): return True
        if r<0 or r>=R or c<0 or c>=C or board[r][c]!=word[i]: return False
        tmp,board[r][c]=board[r][c],'#'   # 標記
        found=any(dfs(r+dr,c+dc,i+1) for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)])
        board[r][c]=tmp                    # 還原
        return found
    return any(dfs(r,c,0) for r in range(R) for c in range(C))`
    },
    {
      detail: 'N-Queens：三個集合追蹤已佔用的列（cols）、主對角線（diag1: r-c）、副對角線（diag2: r+c）。每行只放一個皇后，逐行遞迴，O(N!) 但有效剪枝讓實際運行很快。',
      code:
`def solveNQueens(n):
    cols=set(); d1=set(); d2=set()
    res=[]; board=['.'*n]*n
    def bt(r):
        if r==n: res.append(board[:]); return
        for c in range(n):
            if c in cols or r-c in d1 or r+c in d2: continue
            cols.add(c); d1.add(r-c); d2.add(r+c)
            board[r]=board[r][:c]+'Q'+board[r][c+1:]
            bt(r+1)
            cols.discard(c); d1.discard(r-c); d2.discard(r+c)
            board[r]='.'*n
    bt(0); return res`
    },
    {
      detail: '分割問題（回文分割、IP 地址）：枚舉分割點，驗證當前段是否合法，合法才遞迴。剪枝：IP 地址每段 0-255 且不能有前導零；回文分割可用 DP 預計算 is_palindrome[i][j]。',
      code:
`# Palindrome Partitioning (LC 131)
def partition(s):
    n=len(s); res=[]
    # 預計算回文（O(n²)）
    dp=[[False]*n for _ in range(n)]
    for i in range(n-1,-1,-1):
        for j in range(i,n):
            dp[i][j]=(s[i]==s[j]) and (j-i<=2 or dp[i+1][j-1])
    def bt(start,path):
        if start==n: res.append(path[:]); return
        for end in range(start,n):
            if dp[start][end]:
                path.append(s[start:end+1])
                bt(end+1,path); path.pop()
    bt(0,[]); return res`
    },
  ],
},

// ── Two Pointers ───────────────────────────────────────────────────────────────
'two-pointers': {
  patterns: [
    {
      detail: '對向雙指針（l,r 從兩端向中間）：適用於已排序陣列。每步根據 nums[l]+nums[r] 與目標的關係移動一個指針。3Sum：固定一個元素後，對剩下的有序部分用對向雙指針，記得跳過重複。',
      code:
`# Two Sum II (LC 167) — 已排序
def twoSum(nums, target):
    l,r=0,len(nums)-1
    while l<r:
        s=nums[l]+nums[r]
        if s==target: return [l+1,r+1]
        elif s<target: l+=1
        else: r-=1

# 3Sum (LC 15)
def threeSum(nums):
    nums.sort(); res=[]
    for i in range(len(nums)-2):
        if i>0 and nums[i]==nums[i-1]: continue  # 外層去重
        l,r=i+1,len(nums)-1
        while l<r:
            s=nums[i]+nums[l]+nums[r]
            if s==0:
                res.append([nums[i],nums[l],nums[r]])
                while l<r and nums[l]==nums[l+1]: l+=1  # 內層去重
                while l<r and nums[r]==nums[r-1]: r-=1
                l+=1; r-=1
            elif s<0: l+=1
            else: r-=1
    return res`
    },
    {
      detail: 'write 指針 w 標記下一個有效寫入位置，r 掃描所有元素。w 只在條件滿足時前進並覆寫。nums[:w] 即有效結果。這個模板無需額外空間，一趟 O(n) 完成原地修改。',
      code:
`# Remove Duplicates (LC 26)
def removeDuplicates(nums):
    w=1
    for r in range(1,len(nums)):
        if nums[r]!=nums[w-1]:
            nums[w]=nums[r]; w+=1
    return w

# Move Zeroes (LC 283)
def moveZeroes(nums):
    w=0
    for r in range(len(nums)):
        if nums[r]!=0: nums[w]=nums[r]; w+=1
    for i in range(w,len(nums)): nums[i]=0

# Remove Element (LC 27)
def removeElement(nums,val):
    w=0
    for r in range(len(nums)):
        if nums[r]!=val: nums[w]=nums[r]; w+=1
    return w`
    },
    {
      detail: '有序陣列操作：同向指針（slow/fast）或對向指針均可。合併有序陣列時從尾部開始（避免覆蓋），用 i,j 分別指向兩個陣列末端，較大值寫到 k 位置，k 從末尾往前。',
      code:
`# Merge Sorted Array (LC 88) — 從後往前
def merge(nums1, m, nums2, n):
    i,j,k=m-1,n-1,m+n-1
    while i>=0 and j>=0:
        if nums1[i]>=nums2[j]:
            nums1[k]=nums1[i]; i-=1
        else:
            nums1[k]=nums2[j]; j-=1
        k-=1
    while j>=0: nums1[k]=nums2[j]; k-=1; j-=1

# Squares of Sorted Array (LC 977) — 對向指針
def sortedSquares(nums):
    l,r=0,len(nums)-1; res=[]
    while l<=r:
        if abs(nums[l])>abs(nums[r]):
            res.append(nums[l]**2); l+=1
        else:
            res.append(nums[r]**2); r-=1
    return res[::-1]`
    },
    {
      detail: '鏈結串列快慢指針：slow 走 1，fast 走 2。找中點（fast 到底 slow 在中間）；偵測環（相遇即有環）；找環入口（相遇後 reset slow 到 head，同速再走再次相遇即入口）；倒數第 k 個（fast 先走 k 步）。',
      code:
`# 鏈結串列中點（用於 Merge Sort）
def middleNode(head):
    s=f=head
    while f and f.next: s,f=s.next,f.next.next
    return s

# 找環入口 (LC 142)
def detectCycle(head):
    s=f=head
    while f and f.next:
        s,f=s.next,f.next.next
        if s is f:
            s=head
            while s is not f: s,f=s.next,f.next
            return s
    return None`
    },
  ],
  variations: [
    {
      detail: '3Sum 固定外層元素 nums[i]，對 nums[i+1..n-1]（已排序）用對向雙指針找 -nums[i] 的兩數之和。去重：外層跳過 nums[i]==nums[i-1]；內層找到答案後雙指針各跳過重複值。',
      code:
`def threeSum(nums):
    nums.sort(); res=[]
    for i in range(len(nums)-2):
        if nums[i]>0: break              # 最小值>0不可能=0
        if i>0 and nums[i]==nums[i-1]: continue
        l,r=i+1,len(nums)-1
        while l<r:
            s=nums[i]+nums[l]+nums[r]
            if s==0:
                res.append([nums[i],nums[l],nums[r]])
                while l<r and nums[l]==nums[l+1]: l+=1
                while l<r and nums[r]==nums[r-1]: r-=1
                l+=1; r-=1
            elif s<0: l+=1
            else: r-=1
    return res`
    },
    {
      detail: 'write 指針模板的三種經典變體：移除值、去除重複、移動零。核心相同：r 無腦掃，w 有條件寫。面試時靠這個模板一行都不用臨時想。',
      code:
`# 通用模板：r 掃描，w 條件寫入
def inplace_filter(nums, condition):
    """保留 condition(nums[r]) 為 True 的元素"""
    w=0
    for r in range(len(nums)):
        if condition(nums[r]):
            nums[w]=nums[r]; w+=1
    return w   # 有效長度

# 保留非重複元素
removedup = lambda nums: inplace_filter(
    nums, lambda v: not nums or v != nums[0])  # 注意：需修改使用 w-1

# 去除所有 0
remove_zeros = lambda nums: inplace_filter(nums, lambda v: v!=0)`
    },
    {
      detail: 'Squares of Sorted Array（LC 977）：排序陣列的平方後再排序是 O(n log n)。更優：用對向雙指針，每次把絕對值較大的那端的平方放到結果末尾，O(n)。',
      code:
`def sortedSquares(nums):
    n=len(nums); res=[0]*n
    l,r=0,n-1; k=n-1
    while l<=r:
        lsq,rsq=nums[l]**2,nums[r]**2
        if lsq>rsq: res[k]=lsq; l+=1
        else:       res[k]=rsq; r-=1
        k-=1
    return res`
    },
    {
      detail: 'Floyd 判環 + 找入口：相遇後 reset slow=head，fast 留在相遇點，兩者同速（各走 1 步）再次相遇即環入口。數學推導：設環前長 F，環長 C，相遇點距入口 a，則 F≡-a(mod C)，同速後恰好在入口相遇。',
      code:
`def detectCycle(head):
    slow=fast=head
    # Phase 1：找相遇點
    while fast and fast.next:
        slow=slow.next
        fast=fast.next.next
        if slow is fast:
            # Phase 2：找環入口
            slow=head
            while slow is not fast:
                slow=slow.next
                fast=fast.next
            return slow
    return None`
    },
  ],
},

// ── Sliding Window ─────────────────────────────────────────────────────────────
'sliding-window': {
  patterns: [
    {
      detail: '固定大小 k 的視窗：先建立初始視窗（前 k 個元素），再每次滑動 1 步（加右端新元素、移左端舊元素）。維護視窗內的統計量（和、最大值、字元頻次）。不需每次重新計算 O(k)，只需 O(1) 更新。',
      code:
`# Maximum Average Subarray (LC 643)
def findMaxAverage(nums,k):
    w=sum(nums[:k]); ans=w
    for i in range(k,len(nums)):
        w+=nums[i]-nums[i-k]   # 加右端，減左端
        ans=max(ans,w)
    return ans/k

# Permutation in String (LC 567)
from collections import Counter
def checkInclusion(s1,s2):
    need=Counter(s1); k=len(s1)
    window=Counter(s2[:k])
    if window==need: return True
    for i in range(k,len(s2)):
        c_in,c_out=s2[i],s2[i-k]
        window[c_in]+=1
        window[c_out]-=1
        if window[c_out]==0: del window[c_out]
        if window==need: return True
    return False`
    },
    {
      detail: '最長可變視窗：r 無條件右移擴張，視窗不合法時 l 右移縮小直到再次合法。更新答案在「視窗合法時」（縮小前或縮小後皆可，視題目而定）。關鍵：確定「合法」的定義。',
      code:
`# Longest Substring Without Repeating (LC 3)
def lengthOfLongestSubstring(s):
    freq={}; l=ans=0
    for r,c in enumerate(s):
        freq[c]=freq.get(c,0)+1
        while freq[c]>1:           # 視窗不合法：有重複
            freq[s[l]]-=1; l+=1
        ans=max(ans,r-l+1)
    return ans

# Longest Repeating Character Replacement (LC 424)
def characterReplacement(s,k):
    freq={}; l=max_f=ans=0
    for r,c in enumerate(s):
        freq[c]=freq.get(c,0)+1
        max_f=max(max_f,freq[c])
        while (r-l+1)-max_f>k:    # 需要替換超過 k 個
            freq[s[l]]-=1; l+=1
        ans=max(ans,r-l+1)
    return ans`
    },
    {
      detail: '最短可變視窗：r 擴張直到視窗合法（滿足條件），然後 l 縮小更新最短，縮小到不合法時停止，再繼續擴張 r。需要一個計數器 missing 追蹤「還差多少才合法」，避免每次重新驗證。',
      code:
`# Minimum Window Substring (LC 76)
from collections import Counter
def minWindow(s,t):
    need=Counter(t); missing=len(t)
    best=""; l=0
    for r,c in enumerate(s):
        if need[c]>0: missing-=1
        need[c]-=1
        if missing==0:           # 視窗合法，嘗試縮小
            while need[s[l]]<0:
                need[s[l]]+=1; l+=1
            if not best or r-l+1<len(best):
                best=s[l:r+1]
            need[s[l]]+=1; missing+=1; l+=1  # 再次縮小使不合法
    return best`
    },
    {
      detail: '單調 deque（雙端佇列）：維護一個遞減序列（存 index）。右端：新元素進來前，彈出所有 ≤ 新元素的舊 index（它們永遠不可能是最大值）。左端：視窗滑走時，若 deque 左端 index < l，popleft。',
      code:
`from collections import deque
def maxSlidingWindow(nums,k):
    dq=deque(); ans=[]
    for i,v in enumerate(nums):
        # 移除過期的左端
        while dq and dq[0]<=i-k: dq.popleft()
        # 維護遞減順序：彈出右端所有 <= 當前值的 index
        while dq and nums[dq[-1]]<=v: dq.pop()
        dq.append(i)
        if i>=k-1: ans.append(nums[dq[0]])  # 左端即最大值
    return ans`
    },
  ],
  variations: [
    {
      detail: '固定視窗：每個「滑動步驟」是原子操作：加入 nums[r]，移除 nums[r-k]，r 和隱式的 l 同步移動。適合：最大/最小子陣列和、子陣列平均、字元排列檢查。',
      code:
`# 找所有字母異位詞 (LC 438)
from collections import Counter
def findAnagrams(s,p):
    need=Counter(p); k=len(p)
    if len(s)<k: return []
    window=Counter(s[:k]); res=[]
    if window==need: res.append(0)
    for i in range(k,len(s)):
        c_in,c_out=s[i],s[i-k]
        window[c_in]+=1
        window[c_out]-=1
        if window[c_out]==0: del window[c_out]
        if window==need: res.append(i-k+1)
    return res`
    },
    {
      detail: '最長合法視窗：r 不斷擴張，不合法時 l 收縮（收縮到剛好合法）。可以記錄 max(ans, r-l+1)。另一種思路：最長視窗不需每次都縮到合法，只需不縮小（l 只右移，不左移），ans 永遠是最寬的合法視窗。',
      code:
`# Fruits into Baskets (LC 904) — 最多 2 種水果
def totalFruit(fruits):
    from collections import defaultdict
    basket=defaultdict(int); l=ans=0
    for r,f in enumerate(fruits):
        basket[f]+=1
        while len(basket)>2:        # 超過 2 種
            basket[fruits[l]]-=1
            if basket[fruits[l]]==0: del basket[fruits[l]]
            l+=1
        ans=max(ans,r-l+1)
    return ans`
    },
    {
      detail: '最短合法視窗：r 擴張到「剛好滿足條件」後，嘗試縮小 l 找最短。用 missing 計數器避免每次重新驗證 O(|t|)，只需 O(1) 判斷當前是否合法（missing==0）。',
      code:
`# Min Size Subarray Sum (LC 209)
def minSubArrayLen(target, nums):
    l=total=0; ans=float('inf')
    for r,v in enumerate(nums):
        total+=v
        while total>=target:        # 合法，嘗試縮小
            ans=min(ans,r-l+1)
            total-=nums[l]; l+=1
    return ans if ans!=float('inf') else 0`
    },
    {
      detail: '單調 deque 視窗最大值：deque 儲存「候選最大值的 index」，嚴格遞減排列。O(n) 解決視窗最大值問題，遠優於每次 O(k) 掃描。也可用於視窗最小值（改為嚴格遞增 deque）。',
      code:
`# Sliding Window Maximum (LC 239)
from collections import deque
def maxSlidingWindow(nums,k):
    dq=deque(); ans=[]
    for i in range(len(nums)):
        while dq and dq[0]<i-k+1: dq.popleft()  # 過期
        while dq and nums[dq[-1]]<nums[i]: dq.pop()  # 維護遞減
        dq.append(i)
        if i>=k-1: ans.append(nums[dq[0]])
    return ans

# 變體：視窗最小值（deque 改為遞增）
def minSlidingWindow(nums,k):
    dq=deque(); ans=[]
    for i in range(len(nums)):
        while dq and dq[0]<i-k+1: dq.popleft()
        while dq and nums[dq[-1]]>nums[i]: dq.pop()  # 遞增
        dq.append(i)
        if i>=k-1: ans.append(nums[dq[0]])
    return ans`
    },
  ],
},

}); // END Object.assign — algo topics
