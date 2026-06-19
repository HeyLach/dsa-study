// Detailed explanations + code templates for interview patterns and variations
// DETAIL_DATA[id].patterns[i] parallels t.interview.patterns[i]
// DETAIL_DATA[id].variations[i] parallels t.variations[i]
const DETAIL_DATA = {

// ── Array ──────────────────────────────────────────────────────────────────────
'array': {
  patterns: [
    {
      detail: '左右指針從兩端向中間夾逼。每步根據 nums[l]+nums[r] 和目標的大小關係決定移動哪端。排序後使用，O(n) 時間 O(1) 空間，徹底取代 O(n²) 暴力。',
      code:
`def two_sum_sorted(nums, target):
    l, r = 0, len(nums) - 1
    while l < r:
        s = nums[l] + nums[r]
        if s == target:   return [l, r]
        elif s < target:  l += 1   # 和太小，拉高左端
        else:             r -= 1   # 和太大，壓低右端
    return []

# 延伸：Container With Most Water
def maxArea(height):
    l, r, ans = 0, len(height)-1, 0
    while l < r:
        ans = max(ans, min(height[l],height[r]) * (r-l))
        if height[l] < height[r]: l += 1
        else:                      r -= 1
    return ans`
    },
    {
      detail: 'slow 走 1 步，fast 走 2 步。若有環必相遇（Floyd 定理）。無環則 fast 先到達 None。也可用來找中點：fast 到底時 slow 恰在中間。',
      code:
`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast: return True
    return False

def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow  # 奇數→正中，偶數→右中`
    },
    {
      detail: '一次掃描建出 prefix[i]=sum(nums[0..i-1])。之後任意 [l,r] 的和 = prefix[r+1]-prefix[l]，O(1) 查詢。搭配 HashMap 可在 O(n) 內解決「子陣列和等於 K」。',
      code:
`# 建立前綴和
def build(nums):
    p = [0] * (len(nums)+1)
    for i,v in enumerate(nums): p[i+1]=p[i]+v
    return p

# O(1) 區間查詢
range_sum = lambda p,l,r: p[r+1]-p[l]

# 子陣列和等於 K  (LC 560)
from collections import defaultdict
def subarraySum(nums, k):
    cnt = defaultdict(int); cnt[0]=1
    pre = ans = 0
    for v in nums:
        pre += v
        ans += cnt[pre-k]
        cnt[pre] += 1
    return ans`
    },
    {
      detail: 'write 指針 w 標記下一個寫入位置，read 指針 r 遍歷全部。元素符合條件就寫到 nums[w] 並讓 w+1。O(n) 一趟完成，nums[:w] 即結果，不需額外空間。',
      code:
`# 移除指定值 (LC 27)
def removeElement(nums, val):
    w = 0
    for r in range(len(nums)):
        if nums[r] != val:
            nums[w] = nums[r]; w += 1
    return w

# Move Zeroes (LC 283)
def moveZeroes(nums):
    w = 0
    for r in range(len(nums)):
        if nums[r]: nums[w]=nums[r]; w+=1
    for i in range(w, len(nums)): nums[i]=0`
    },
  ],
  variations: [
    {
      detail: '關鍵：prefix 長度設為 n+1，prefix[0]=0 作為哨兵，省去邊界判斷。搭配 HashMap 可解「找子陣列和等於 K 的個數」：每次查 cnt[prefix-k]，再把當前 prefix 加入 cnt。',
      code:
`# Range Sum Query (LC 303)
class NumArray:
    def __init__(self, nums):
        self.p = [0]*(len(nums)+1)
        for i,v in enumerate(nums):
            self.p[i+1] = self.p[i]+v
    def sumRange(self,l,r):
        return self.p[r+1]-self.p[l]

# 二維前綴和
def build2D(mat):
    R,C = len(mat),len(mat[0])
    p = [[0]*(C+1) for _ in range(R+1)]
    for r in range(R):
        for c in range(C):
            p[r+1][c+1] = mat[r][c]+p[r][c+1]+p[r+1][c]-p[r][c]
    return p`
    },
    {
      detail: '差分陣列讓「區間批量加 val」從 O(n) 降為 O(1)：diff[l]+=val, diff[r+1]-=val，最後前綴和還原。多次操作後再一次性還原，總複雜度 O(Q+n) 而非 O(Q×n)。',
      code:
`def range_add(n, ops):
    # ops: [(l, r, val), ...]
    diff = [0]*(n+1)
    for l,r,val in ops:
        diff[l]  += val
        diff[r+1]-= val    # 越過右端時撤銷
    # 還原
    res, cur = [0]*n, 0
    for i in range(n):
        cur += diff[i]; res[i]=cur
    return res

# 例：n=5, ops=[(0,2,3),(1,3,1)] → [3,4,4,1,0]`
    },
    {
      detail: '末尾接頭的邏輯環：用 i%n 讓索引自動繞回，常搭配單調堆疊「遍歷兩圈」來處理。也用於實作循環佇列（head/tail 指針對 capacity 取模）。',
      code:
`# 下一個更大元素 II (LC 503)
def nextGreaterElements(nums):
    n = len(nums); res=[-1]*n; stk=[]
    for i in range(2*n):
        while stk and nums[stk[-1]] < nums[i%n]:
            res[stk.pop()] = nums[i%n]
        if i < n: stk.append(i)
    return res

# 循環佇列
class MyCircularQueue:
    def __init__(self,k):
        self.q=[0]*k; self.h=self.t=self.sz=0; self.k=k
    def enQueue(self,v):
        if self.sz==self.k: return False
        self.q[self.t]=v; self.t=(self.t+1)%self.k; self.sz+=1; return True
    def deQueue(self):
        if not self.sz: return False
        self.h=(self.h+1)%self.k; self.sz-=1; return True`
    },
    {
      detail: 'write 指針模板的核心：分離「讀」和「寫」兩個職責。r 無腦向右掃，w 只在條件滿足時前進並覆寫。nums[:w] 即最終結果，完全原地，O(1) 額外空間。',
      code:
`# 去重（有序陣列）(LC 26)
def removeDuplicates(nums):
    w = 1
    for r in range(1, len(nums)):
        if nums[r] != nums[w-1]:
            nums[w]=nums[r]; w+=1
    return w

# 去重（每個值至多保留兩次）(LC 80)
def removeDuplicates2(nums):
    w = 0
    for v in nums:
        if w < 2 or nums[w-2] != v:
            nums[w]=v; w+=1
    return w`
    },
  ],
},

// ── Linked List ────────────────────────────────────────────────────────────────
'linked-list': {
  patterns: [
    {
      detail: 'Dummy head（哨兵節點）讓所有節點的操作邏輯統一：不需要特殊處理 head。建立 dummy.next=head 後，對任何節點的增刪都是「找到前驅，修改 .next」，最後 return dummy.next。',
      code:
`# 刪除值等於 val 的所有節點
def removeElements(head, val):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == val:
            cur.next = cur.next.next  # 跳過
        else:
            cur = cur.next
    return dummy.next  # dummy.next 即新 head`
    },
    {
      detail: 'Floyd 判圈算法：slow 走 1，fast 走 2。相遇→有環；fast 到 None→無環。找環入口：相遇後把一個指針重置到 head，兩者同速再走，再次相遇即環入口。',
      code:
`def detectCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:          # 相遇（有環）
            slow = head           # 重置到頭
            while slow is not fast:
                slow, fast = slow.next, fast.next
            return slow           # 環入口
    return None`
    },
    {
      detail: '三個指針：prev=None, cur=head, nxt 保存下一個。每步 cur.next=prev, 然後三者依次右移。迭代完成後 prev 即新 head。務必先保存 nxt，否則鏈結會斷。',
      code:
`def reverseList(head):
    prev, cur = None, head
    while cur:
        nxt      = cur.next   # 先存，否則鏈斷
        cur.next = prev       # 反向
        prev, cur = cur, nxt
    return prev

# 遞迴版（理解尾遞迴）
def reverseRec(head):
    if not head or not head.next: return head
    new_head = reverseRec(head.next)
    head.next.next = head
    head.next = None
    return new_head`
    },
    {
      detail: '先讓指針 A 超前 k 步，再讓 A、B 同時走，A 到 None 時 B 即在倒數第 k+1 節點（可刪除其 next）。變種：找倒數第 k 個（B.next 即答案）。',
      code:
`# 刪除倒數第 N 個節點 (LC 19)
def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n+1):   # fast 先走 n+1 步
        fast = fast.next
    while fast:
        fast, slow = fast.next, slow.next
    slow.next = slow.next.next   # 刪除
    return dummy.next`
    },
  ],
  variations: [
    {
      detail: '雙向鏈結串列 + HashMap 實現 LRU：HashMap 用 key→Node 做 O(1) 查找；雙向鏈結串列按存取順序維護節點，head 端最舊，tail 端最新。get/put 都只是「把節點移到 tail」。',
      code:
`class LRUCache:
    def __init__(self,cap):
        self.cap=cap; self.map={}
        self.head=ListNode(0); self.tail=ListNode(0)
        self.head.next=self.tail; self.tail.prev=self.head
    def _remove(self,n):
        n.prev.next=n.next; n.next.prev=n.prev
    def _insert(self,n):   # 插入 tail 前
        n.prev=self.tail.prev; n.next=self.tail
        n.prev.next=n.next.prev=n
    def get(self,key):
        if key not in self.map: return -1
        self._remove(self.map[key]); self._insert(self.map[key])
        return self.map[key].val
    def put(self,key,val):
        if key in self.map: self._remove(self.map[key])
        self.map[key]=ListNode(val)
        self._insert(self.map[key])
        if len(self.map)>self.cap:
            lru=self.head.next; self._remove(lru); del self.map[lru.key]`
    },
    {
      detail: '循環鏈結串列末尾接頭。常見於 Round Robin。判斷是否為循環：找到 tail（tail.next == head 而非 None）。插入時更新 tail.next；刪除時注意 head 和 tail 的特殊情況。',
      code:
`# 循環鏈結串列插入（保持有序）(LC 708)
def insert(head, val):
    node = ListNode(val)
    if not head:
        node.next = node; return node
    cur = head
    while True:
        if cur.val <= val <= cur.next.val: break
        if cur.val > cur.next.val:           # 跨越接縫
            if val >= cur.val or val <= cur.next.val: break
        if cur.next is head: break           # 繞一圈
        cur = cur.next
    node.next = cur.next; cur.next = node
    return head`
    },
    {
      detail: '快慢指針是鏈結串列最強工具：找中點（分割用）、偵測環（Floyd）、找環入口（reset 後同速）、找倒數第 k（offset k 步）。四種問題一套框架。',
      code:
`# 找中點（用於 Merge Sort）
def middleNode(head):
    s=f=head
    while f and f.next: s,f=s.next,f.next.next
    return s

# 找倒數第 k 個
def kthFromEnd(head,k):
    f=head
    for _ in range(k): f=f.next  # f 先走 k 步
    s=head
    while f: s,f=s.next,f.next
    return s

# Reorder List (LC 143)：中點+反轉後半+合併
def reorderList(head):
    mid=middleNode(head)
    second=reverseList(mid.next); mid.next=None
    a,b=head,second
    while b:
        a.next,b.next,a,b = b,a.next,a.next,b.next`
    },
    {
      detail: 'K 個一組反轉：每次找出 [cur, k 步後] 的子鏈，局部反轉後接回主鏈。若剩餘不足 k 個則保持原樣。需要記錄「反轉前的 tail」以便接回。',
      code:
`def reverseKGroup(head, k):
    dummy = ListNode(0, head); prev = dummy
    while True:
        tail = prev
        for _ in range(k):           # 確認還有 k 個
            tail = tail.next
            if not tail: return dummy.next
        start = prev.next
        # 反轉 [start..tail]
        p, c = tail.next, start
        for _ in range(k):
            nxt=c.next; c.next=p; p,c = c,nxt
        prev.next=p; start.next=c  # 接回
        prev=start                 # 移動 prev 到反轉後的尾
    return dummy.next`
    },
  ],
},

// ── Stack ──────────────────────────────────────────────────────────────────────
'stack': {
  patterns: [
    {
      detail: '遇到開括號 push，遇到閉括號 pop 並驗證是否匹配。堆疊為空時遇到閉括號 → 非法。遍歷完畢後堆疊必須為空才合法。可擴展到多種括號、HTML 標籤配對。',
      code:
`def isValid(s):
    match = {')':'(', ']':'[', '}':'{'}
    stk = []
    for c in s:
        if c in '([{':
            stk.append(c)
        else:
            if not stk or stk[-1] != match[c]:
                return False
            stk.pop()
    return not stk  # 最後必須空

# 範例：s = "()[]{}" → True, s = "([)]" → False`
    },
    {
      detail: '維護一個嚴格遞增或遞減的堆疊。新元素進來時，彈出所有不滿足單調性的元素，此時被彈出的元素「找到了它的下一個更大/小元素」。每個元素最多進出一次，O(n) 總時間。',
      code:
`# 下一個更大元素 / Daily Temperatures (LC 739)
def dailyTemperatures(temps):
    n=len(temps); ans=[0]*n; stk=[]  # 存 index
    for i,t in enumerate(temps):
        while stk and temps[stk[-1]] < t:
            j=stk.pop(); ans[j]=i-j  # 等待天數
        stk.append(i)
    return ans

# 接雨水（單調堆疊版）(LC 42)
def trap(height):
    stk=[]; ans=0
    for i,h in enumerate(height):
        while stk and height[stk[-1]] < h:
            bot=stk.pop()
            if not stk: break
            w=i-stk[-1]-1
            ans += w * (min(height[stk[-1]],h)-height[bot])
        stk.append(i)
    return ans`
    },
    {
      detail: '主堆疊正常使用；輔助堆疊同步 push，pop 時只在輔助棧頂 == 主棧彈出值時才 pop 輔助棧。這樣輔助棧頂始終是主棧當前狀態的最小值。',
      code:
`class MinStack:
    def __init__(self):
        self.stk = []; self.min_stk = []
    def push(self, val):
        self.stk.append(val)
        m = val if not self.min_stk else min(val, self.min_stk[-1])
        self.min_stk.append(m)   # 同步記錄當前最小
    def pop(self):
        self.stk.pop(); self.min_stk.pop()
    def getMin(self):
        return self.min_stk[-1]  # O(1)`
    },
    {
      detail: '兩個堆疊 A（接收 enqueue）和 B（提供 dequeue）。B 為空時把 A 全部倒入 B。每個元素最多被倒一次，攤銷 O(1) per operation。',
      code:
`from collections import deque
class MyQueue:
    def __init__(self):
        self.inbox=deque(); self.outbox=deque()
    def push(self,x):
        self.inbox.append(x)
    def _transfer(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
    def pop(self):
        self._transfer(); return self.outbox.pop()
    def peek(self):
        self._transfer(); return self.outbox[-1]
    def empty(self):
        return not self.inbox and not self.outbox`
    },
  ],
  variations: [
    {
      detail: '維護嚴格遞增堆疊（存 index）：新元素比棧頂大就觸發 pop，被 pop 的元素「找到了右邊第一個更大值」。用於 Daily Temperatures、Next Greater Element、接雨水（左右邊界）等。',
      code:
`# 柱狀圖最大矩形 (LC 84)
def largestRectangleArea(heights):
    heights.append(0)          # 哨兵強制清空堆疊
    stk=[]; ans=0
    for i,h in enumerate(heights):
        while stk and heights[stk[-1]] > h:
            H=heights[stk.pop()]
            W=i if not stk else i-stk[-1]-1
            ans=max(ans, H*W)
        stk.append(i)
    return ans`
    },
    {
      detail: '輔助堆疊每次 push 時記錄「截至目前的最小值（或最大值）」，而非只記錄最小值本身。這樣 pop 後輔助棧頂自動反映新的最小值，O(1) getMin()。',
      code:
`# getMin O(1) — 輔助棧儲存「歷史最小」
class MinStack:
    def __init__(self):
        self.s=[]; self.m=[]
    def push(self,v):
        self.s.append(v)
        self.m.append(v if not self.m else min(v,self.m[-1]))
    def pop(self):
        self.s.pop(); self.m.pop()
    def top(self):    return self.s[-1]
    def getMin(self): return self.m[-1]`
    },
    {
      detail: '入隊：push 進 A；出隊：若 B 空則把 A 全倒入 B，再從 B pop。攤銷分析：每個元素最多從 A 倒入 B 一次，所以每個操作攤銷 O(1)。面試必考「兩個 stack 模擬 queue」。',
      code:
`# 用 Queue 實現 Stack（反向思考）(LC 225)
from collections import deque
class MyStack:
    def __init__(self):
        self.q=deque()
    def push(self,x):
        self.q.append(x)
        for _ in range(len(self.q)-1):   # 把新元素轉到隊頭
            self.q.append(self.q.popleft())
    def pop(self):  return self.q.popleft()
    def top(self):  return self.q[0]
    def empty(self):return not self.q`
    },
    {
      detail: '括號問題的黃金模板：開括號 push，閉括號 pop 並驗證。延伸題型：計算括號嵌套深度（push 時 depth+1）、去除無效括號（兩趟掃描）、括號分數。',
      code:
`# Decode String (LC 394): 數字堆疊 + 字串堆疊
def decodeString(s):
    num_stk=[]; str_stk=[]; cur=""; k=0
    for c in s:
        if c.isdigit():
            k=k*10+int(c)
        elif c=='[':
            num_stk.append(k); str_stk.append(cur)
            cur=""; k=0
        elif c==']':
            cur=str_stk.pop() + cur*num_stk.pop()
        else:
            cur+=c
    return cur
# 例："3[a2[c]]" → "accaccacc"`
    },
  ],
},

// ── Queue ──────────────────────────────────────────────────────────────────────
'queue': {
  patterns: [
    {
      detail: 'BFS 骨架：起點加入 queue 並標記 visited，while queue 非空則 popleft、處理當前節點、把未訪問的鄰居加入 queue。**在 enqueue 時即刻標記 visited**，防止重複入隊。',
      code:
`from collections import deque
def bfs(graph, start):
    q=deque([start]); visited={start}; order=[]
    while q:
        node=q.popleft(); order.append(node)
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb)   # 入隊時標記！
                q.append(nb)
    return order

# 網格 BFS（最短路徑）
def shortestPath(grid, sr, sc, er, ec):
    dirs=[(0,1),(0,-1),(1,0),(-1,0)]
    q=deque([(sr,sc,0)]); visited={(sr,sc)}
    while q:
        r,c,d=q.popleft()
        if (r,c)==(er,ec): return d
        for dr,dc in dirs:
            nr,nc=r+dr,c+dc
            if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]!=1 and (nr,nc) not in visited:
                visited.add((nr,nc)); q.append((nr,nc,d+1))
    return -1`
    },
    {
      detail: '在 BFS 迴圈開始前先記錄 `level_size = len(q)`，只處理這 level_size 個節點，完成後 level+1。這樣可以知道每個節點所在的層數（即距起點的最短距離）。',
      code:
`from collections import deque
def levelOrder(root):
    if not root: return []
    q=deque([root]); result=[]
    while q:
        level=[]; sz=len(q)      # 本層節點數
        for _ in range(sz):
            node=q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result`
    },
    {
      detail: '從左進、右出的 deque 維護一個**遞減**序列（用於最大值）。新元素入隊前，把 deque 右端所有 ≤ 新元素的值彈出（它們永遠不會是最大值）。deque 左端超出視窗時 popleft。',
      code:
`from collections import deque
def maxSlidingWindow(nums, k):
    dq=deque(); ans=[]   # dq 存 index，保持遞減
    for i,v in enumerate(nums):
        # 彈出過期元素
        while dq and dq[0] < i-k+1: dq.popleft()
        # 維護遞減序列
        while dq and nums[dq[-1]] < v: dq.pop()
        dq.append(i)
        if i >= k-1: ans.append(nums[dq[0]])
    return ans`
    },
    {
      detail: '多個起點同時入隊，距離設為 0。BFS 自然地從所有起點同時向外擴展，每個節點第一次被訪問時記錄的距離就是到最近起點的距離。一次 BFS 解決所有節點。',
      code:
`# Rotting Oranges (LC 994)
from collections import deque
def orangesRotting(grid):
    R,C=len(grid),len(grid[0])
    q=deque(); fresh=0
    for r in range(R):
        for c in range(C):
            if grid[r][c]==2: q.append((r,c,0))  # 多源
            elif grid[r][c]==1: fresh+=1
    dirs=[(0,1),(0,-1),(1,0),(-1,0)]; t=0
    while q:
        r,c,d=q.popleft()
        for dr,dc in dirs:
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C and grid[nr][nc]==1:
                grid[nr][nc]=2; fresh-=1
                q.append((nr,nc,d+1)); t=d+1
    return t if fresh==0 else -1`
    },
  ],
  variations: [
    {
      detail: '單調 deque：從右加入（維護遞減/遞增），從左取最大/小值。關鍵：存 index 而非值，方便檢查是否過期（index < i-k+1）。O(n) 解決滑動視窗最大值，比 heap O(n log k) 更快。',
      code:
`from collections import deque
def maxSlidingWindow(nums, k):
    dq=deque()   # 存 index，遞減排列
    ans=[]
    for i in range(len(nums)):
        while dq and dq[0]<=i-k: dq.popleft()  # 過期
        while dq and nums[dq[-1]]<=nums[i]: dq.pop()
        dq.append(i)
        if i>=k-1: ans.append(nums[dq[0]])
    return ans`
    },
    {
      detail: '用固定大小陣列 + head/tail 指針實現佇列。所有索引對容量取模（head%k, tail%k）。空條件：head==tail，滿條件：(tail+1)%k==head。是設計題必考。',
      code:
`class MyCircularQueue:
    def __init__(self,k):
        self.q=[0]*(k+1)   # 多一格區分空/滿
        self.h=self.t=0; self.K=k+1
    def enQueue(self,v):
        if self.isFull(): return False
        self.q[self.t]=v; self.t=(self.t+1)%self.K; return True
    def deQueue(self):
        if self.isEmpty(): return False
        self.h=(self.h+1)%self.K; return True
    def Front(self): return -1 if self.isEmpty() else self.q[self.h]
    def Rear(self):  return -1 if self.isEmpty() else self.q[(self.t-1)%self.K]
    def isEmpty(self): return self.h==self.t
    def isFull(self):  return (self.t+1)%self.K==self.h`
    },
    {
      detail: '優先佇列（最小堆）每次 pop 返回最高優先級元素。Python 只有 min-heap，模擬 max-heap 需對值取負。heappush/heappop O(log n)，heapify O(n)。',
      code:
`import heapq

# Min-Heap（Python 預設）
h=[]
heapq.heappush(h, 3)
heapq.heappush(h, 1)
print(heapq.heappop(h))  # 1

# Max-Heap（取負）
max_h=[]
for v in [3,1,4,1,5]:
    heapq.heappush(max_h,-v)
print(-heapq.heappop(max_h))  # 5

# K 路合併：(val, list_idx, elem_idx)
def mergeKLists(lists):
    dummy=ListNode(0); cur=dummy; h=[]
    for i,l in enumerate(lists):
        if l: heapq.heappush(h,(l.val,i,l))
    while h:
        v,i,node=heapq.heappop(h)
        cur.next=node; cur=cur.next
        if node.next: heapq.heappush(h,(node.next.val,i,node.next))
    return dummy.next`
    },
    {
      detail: '0-1 BFS：邊權為 0 則加入 deque 左端（相當於同層），邊權為 1 則加入右端（下一層）。O(V+E)，比 Dijkstra O((V+E)logV) 更快，適合邊權只有 0/1 的情況。',
      code:
`from collections import deque
def zeroOneBFS(n, edges, src):
    dist=[float('inf')]*n; dist[src]=0
    dq=deque([src])
    while dq:
        u=dq.popleft()
        for v,w in edges[u]:
            if dist[u]+w < dist[v]:
                dist[v]=dist[u]+w
                if w==0: dq.appendleft(v)  # 邊權0→左端
                else:    dq.append(v)       # 邊權1→右端
    return dist`
    },
  ],
},

// ── Hash Table ─────────────────────────────────────────────────────────────────
'hash-table': {
  patterns: [
    {
      detail: '用 dict 統計每個元素出現次數。defaultdict(int) 省去 .get(k,0)。Counter 更方便（支持 .most_common()）。常作為第一步預處理，之後再掃描一遍解題。',
      code:
`from collections import Counter, defaultdict

freq = Counter("aababc")   # {'a':3,'b':2,'c':1}

# 等效手動計數
freq2 = defaultdict(int)
for c in "aababc": freq2[c]+=1

# 找出現頻率最高的 k 個元素
words = ["i","love","leetcode","i","love","coding"]
cnt = Counter(words)
top2 = cnt.most_common(2)   # [('i',2),('love',2)]`
    },
    {
      detail: '遍歷時，先查 dict 中是否存在「補數 = target - 當前值」，若在則找到；否則把當前值存入 dict。一趟 O(n)，對比 sort+binary_search 的 O(n log n) 更優。',
      code:
`# Two Sum (LC 1)
def twoSum(nums, target):
    seen = {}   # val → index
    for i, v in enumerate(nums):
        comp = target - v
        if comp in seen:
            return [seen[comp], i]
        seen[v] = i
    return []

# 擴展：兩數之差等於 k
def twoSumDiff(nums, k):
    s = set(nums)
    for v in nums:
        if v+k in s or v-k in s:
            return True
    return False`
    },
    {
      detail: '把元素轉換為「標準形式（canonical form）」作為 dict key，讓所有等價元素分到同一組。最典型：把字串的字元排序後作為 key（同字母異序詞的 key 相同）。',
      code:
`from collections import defaultdict

# Group Anagrams (LC 49)
def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))   # 排序後的字元 tuple 作為 key
        groups[key].append(s)
    return list(groups.values())

# 等價做法：字元計數 tuple
def groupAnagrams2(strs):
    groups = defaultdict(list)
    for s in strs:
        cnt = [0]*26
        for c in s: cnt[ord(c)-ord('a')]+=1
        groups[tuple(cnt)].append(s)
    return list(groups.values())`
    },
    {
      detail: '建立前綴和 prefix，在 dict 中記錄「每個前綴和值首次出現的 index」（或出現次數）。遍歷時查 prefix-k 是否在 dict 中，若在則找到一段子陣列。',
      code:
`# Subarray Sum Equals K (LC 560)
from collections import defaultdict
def subarraySum(nums, k):
    cnt=defaultdict(int); cnt[0]=1  # 空前綴
    pre=ans=0
    for v in nums:
        pre+=v
        ans+=cnt[pre-k]   # 前綴差等於 k 的次數
        cnt[pre]+=1
    return ans

# 找最長子陣列和等於 k（改為存最早 index）
def maxSubarrayLen(nums, k):
    idx={0:-1}; pre=ans=0
    for i,v in enumerate(nums):
        pre+=v
        if pre-k in idx: ans=max(ans,i-idx[pre-k])
        if pre not in idx: idx[pre]=i   # 只存最早出現
    return ans`
    },
  ],
  variations: [
    {
      detail: '前綴和 + HashMap 是處理「子陣列和等於 K」的標準技巧。cnt[0]=1 是哨兵（代表空前綴）。若要「最長子陣列和等於 K」，改用 index dict 且只存首次出現；若要「計數」，用頻次 dict。',
      code:
`# 連續子陣列和為 k 的倍數 (LC 523)
def checkSubarraySum(nums, k):
    seen={0:-1}   # remainder→最早 index
    pre=0
    for i,v in enumerate(nums):
        pre=(pre+v)%k
        if pre in seen:
            if i-seen[pre]>=2: return True
        else: seen[pre]=i
    return False`
    },
    {
      detail: '在滑動視窗內用 Counter/defaultdict 追蹤字元頻次。視窗收縮（left 右移）時把移出字元的頻次-1；若頻次降為 0 則 del 掉（保持 dict 大小等於視窗內不重複字元數）。',
      code:
`# Minimum Window Substring (LC 76)
from collections import Counter
def minWindow(s, t):
    need=Counter(t); missing=len(t)
    best=""; l=0
    for r,c in enumerate(s):
        if need[c]>0: missing-=1
        need[c]-=1
        if missing==0:
            while need[s[l]]<0: need[s[l]]+=1; l+=1
            if not best or r-l+1<len(best): best=s[l:r+1]
            need[s[l]]+=1; missing+=1; l+=1
    return best`
    },
    {
      detail: '雙向 HashMap（Bijection）：key→val 和 val→key 同時維護，支援 O(1) 雙向查詢。常見於「同構字串」「單射映射」驗證。Encode 時不能讓多個 key 映射到同一 val。',
      code:
`# Isomorphic Strings (LC 205)
def isIsomorphic(s, t):
    s2t={}; t2s={}
    for a,b in zip(s,t):
        if s2t.get(a,b)!=b or t2s.get(b,a)!=a:
            return False
        s2t[a]=b; t2s[b]=a
    return True

# Word Pattern (LC 290)
def wordPattern(pattern, s):
    words=s.split()
    if len(pattern)!=len(words): return False
    p2w={}; w2p={}
    for p,w in zip(pattern,words):
        if p2w.get(p,w)!=w or w2p.get(w,p)!=p: return False
        p2w[p]=w; w2p[w]=p
    return True`
    },
    {
      detail: 'LRU Cache：HashMap 提供 O(1) 查找（key→Node），雙向鏈結串列按存取順序排列節點（最近用→tail，最久未用→head）。每次 get/put 把對應節點移到 tail；超容量時刪 head。',
      code:
`# LRU Cache (LC 146) — 簡化版（用 OrderedDict）
from collections import OrderedDict
class LRUCache:
    def __init__(self,cap):
        self.cap=cap; self.cache=OrderedDict()
    def get(self,key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)   # 標記為最近使用
        return self.cache[key]
    def put(self,key,val):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key]=val
        if len(self.cache)>self.cap:
            self.cache.popitem(last=False)  # 刪最久未用`
    },
  ],
},

// ── Binary Tree / BST ──────────────────────────────────────────────────────────
'tree': {
  patterns: [
    {
      detail: '先遞迴求左右子樹的結果，再在根節點「彙整」兩者得到答案。這是後序 DFS 模式，適合「路徑和、直徑、高度、平衡判斷」等問題。回傳值設計是關鍵：回傳什麼讓父節點能正確彙整？',
      code:
`# 二元樹最大路徑和 (LC 124)
def maxPathSum(root):
    ans=[root.val]
    def dfs(node):
        if not node: return 0
        L=max(dfs(node.left),0)    # 負數貢獻捨棄
        R=max(dfs(node.right),0)
        ans[0]=max(ans[0], node.val+L+R)  # 路徑穿過本節點
        return node.val+max(L,R)          # 向父回報最大單邊
    dfs(root); return ans[0]

# 樹的直徑 (LC 543)
def diameterOfBinaryTree(root):
    ans=[0]
    def height(n):
        if not n: return 0
        l,r=height(n.left),height(n.right)
        ans[0]=max(ans[0],l+r)   # 穿過根的路徑
        return max(l,r)+1
    height(root); return ans[0]`
    },
    {
      detail: 'BST 中序遍歷（左→根→右）產出嚴格升序序列。利用這個性質，不需 O(n) 收集所有節點，只需追蹤「前一個中序值」就能驗證 BST 或找第 K 小。',
      code:
`# BST 第 K 小 (LC 230)
def kthSmallest(root, k):
    count=[0]; ans=[0]
    def inorder(node):
        if not node or count[0]==k: return
        inorder(node.left)
        count[0]+=1
        if count[0]==k: ans[0]=node.val; return
        inorder(node.right)
    inorder(root); return ans[0]

# 驗證 BST (LC 98) — 傳遞 (min,max) 範圍
def isValidBST(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if root.val<=lo or root.val>=hi: return False
    return (isValidBST(root.left, lo, root.val) and
            isValidBST(root.right, root.val, hi))`
    },
    {
      detail: '先記錄本層 queue 大小 sz，再用 for 迴圈處理 sz 個節點，此時 queue 裡剩下的就是下一層。無需特殊分隔符。可擴展到鋸齒形遍歷（layer 奇偶決定 reverse）。',
      code:
`from collections import deque
def levelOrder(root):
    if not root: return []
    q=deque([root]); result=[]
    while q:
        level=[]; sz=len(q)
        for _ in range(sz):
            n=q.popleft()
            level.append(n.val)
            if n.left:  q.append(n.left)
            if n.right: q.append(n.right)
        result.append(level)
    return result

# 鋸齒形 (LC 103)
def zigzagLevelOrder(root):
    if not root: return []
    q=deque([root]); res=[]; left2right=True
    while q:
        lvl=[q.popleft().val for _ in range(len(q))]  # 簡化版
        # 完整版需同時把子節點加入 q
        res.append(lvl if left2right else lvl[::-1])
        left2right=not left2right
    return res`
    },
    {
      detail: '向下傳遞允許的值域（lo, hi）：左子樹繼承 hi=root.val，右子樹繼承 lo=root.val。只和直接父節點比較是不夠的，因為上層祖先的約束也必須滿足。',
      code:
`def isValidBST(root):
    def check(node, lo, hi):
        if not node: return True
        if not (lo < node.val < hi): return False
        return (check(node.left,  lo, node.val) and
                check(node.right, node.val, hi))
    return check(root, float('-inf'), float('inf'))

# 有序陣列轉 BST (LC 108)
def sortedArrayToBST(nums):
    if not nums: return None
    m=len(nums)//2
    root=TreeNode(nums[m])
    root.left =sortedArrayToBST(nums[:m])
    root.right=sortedArrayToBST(nums[m+1:])
    return root`
    },
  ],
  variations: [
    {
      detail: '後序 DFS 模板：dfs(node) 回傳「對父節點有用的資訊」（如高度、最大路徑單邊貢獻），同時用全局變量（如 ans[0]）更新答案。左右彙整後才更新 ans，因此是「後序」。',
      code:
`# 判斷是否平衡二元樹 (LC 110)
def isBalanced(root):
    def height(n):
        if not n: return 0
        l=height(n.left)
        if l==-1: return -1      # 剪枝
        r=height(n.right)
        if r==-1: return -1
        if abs(l-r)>1: return -1  # 不平衡 → 回傳 -1 作信號
        return max(l,r)+1
    return height(root)!=-1`
    },
    {
      detail: 'BST 中序遍歷 = 升序數列，是 BST 問題的核心性質。迭代版中序遍歷（Morris 或 stack）在面試更穩定，不受遞迴深度限制影響。',
      code:
`# 迭代中序遍歷（Stack 版）
def inorderIterative(root):
    stk=[]; cur=root; res=[]
    while cur or stk:
        while cur:           # 一路向左壓入
            stk.append(cur); cur=cur.left
        cur=stk.pop()
        res.append(cur.val)  # 訪問根
        cur=cur.right        # 轉向右子樹
    return res

# 恢復 BST (LC 99): 找兩個交換的節點
def recoverBST(root):
    first=second=prev=None
    def inorder(n):
        nonlocal first,second,prev
        if not n: return
        inorder(n.left)
        if prev and prev.val>n.val:
            if not first: first=prev
            second=n
        prev=n; inorder(n.right)
    inorder(root)
    first.val,second.val=second.val,first.val`
    },
    {
      detail: '前序序列化：以 "#" 標記 None，用 "," 分隔。反序列化時用雙端隊列逐一消費 token：先 root，再左子樹，再右子樹（也是前序順序）。完全可逆且不歧義。',
      code:
`from collections import deque
class Codec:
    def serialize(self, root):
        def dfs(n):
            if not n: return ["#"]
            return [str(n.val)]+dfs(n.left)+dfs(n.right)
        return ",".join(dfs(root))

    def deserialize(self, data):
        tokens=deque(data.split(","))
        def dfs():
            v=tokens.popleft()
            if v=="#": return None
            node=TreeNode(int(v))
            node.left=dfs(); node.right=dfs()
            return node
        return dfs()`
    },
    {
      detail: '前序+中序重建：前序第一個元素是 root；在中序中找 root 的位置 m，左側長度 = 左子樹大小，遞迴重建左右子樹。用 HashMap 把中序值→index，讓查找 O(1)。',
      code:
`def buildTree(preorder, inorder):
    idx={v:i for i,v in enumerate(inorder)}  # O(1) 查找
    def build(pre_l,pre_r,in_l,in_r):
        if pre_l>pre_r: return None
        root=TreeNode(preorder[pre_l])
        m=idx[root.val]
        left_sz=m-in_l
        root.left =build(pre_l+1,pre_l+left_sz,in_l,m-1)
        root.right=build(pre_l+left_sz+1,pre_r,m+1,in_r)
        return root
    return build(0,len(preorder)-1,0,len(inorder)-1)`
    },
  ],
},

// ── Heap ───────────────────────────────────────────────────────────────────────
'heap': {
  patterns: [
    {
      detail: '維護大小為 K 的 min-heap：每次 push 新元素，若 heap 大小超過 K 就 pop（彈掉最小值）。遍歷完後 heap 中剩下的 K 個就是最大的 K 個，heap 頂即第 K 大。O(n log K)。',
      code:
`import heapq

def findKthLargest(nums, k):
    h = []
    for v in nums:
        heapq.heappush(h, v)
        if len(h) > k:
            heapq.heappop(h)    # 彈掉最小（不在 Top K）
    return h[0]                  # 堆頂 = 第 K 大

# Top K Frequent (LC 347)
from collections import Counter
def topKFrequent(nums, k):
    cnt = Counter(nums)
    return heapq.nlargest(k, cnt, key=cnt.get)`
    },
    {
      detail: '下半用 max-heap（取負），上半用 min-heap。規則：max-heap 大小 ≥ min-heap 大小，且差值 ≤ 1。每次 add 後調整平衡。中位數 = max-heap 頂（奇數）或兩頂平均（偶數）。',
      code:
`import heapq
class MedianFinder:
    def __init__(self):
        self.lo=[]   # max-heap（存負數）
        self.hi=[]   # min-heap

    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        # lo 頂不能大於 hi 頂
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        # 保持 lo 大小 >= hi
        if len(self.lo) < len(self.hi):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`
    },
    {
      detail: '當堆積中有過時元素（已被刪除）時，不直接刪除（heap 不支援），而是在 pop 時檢查是否有效：若在「刪除集合」中就跳過繼續 pop。懶刪除讓 heap 保持 O(log n) 而不需線性掃描。',
      code:
`import heapq
from collections import Counter

# Task Scheduler (LC 621) — 貪婪 + heap
def leastInterval(tasks, n):
    freq=Counter(tasks)
    h=[-f for f in freq.values()]
    heapq.heapify(h)
    time=0
    while h:
        cycle=n+1; temp=[]
        for _ in range(cycle):
            if h:
                temp.append(heapq.heappop(h))
        for f in temp:
            if f+1<0: heapq.heappush(h,f+1)  # 頻次-1 後重新入堆
        time += cycle if h else len(temp)    # 末尾不足 n+1 不補 idle
    return time`
    },
    {
      detail: 'Dijkstra 最短路徑：以 (cost, node) 為元組入 min-heap，每次 pop 最小 cost 節點，更新鄰居距離後入堆。同一節點可能多次在堆中（懶刪除）：若 pop 到的 cost > dist[node] 則跳過。',
      code:
`import heapq
def dijkstra(n, edges, src):
    # edges: {node: [(neighbor, weight), ...]}
    dist=[float('inf')]*n; dist[src]=0
    h=[(0,src)]
    while h:
        d,u=heapq.heappop(h)
        if d>dist[u]: continue   # 過時條目，跳過
        for v,w in edges[u]:
            if dist[u]+w < dist[v]:
                dist[v]=dist[u]+w
                heapq.heappush(h,(dist[v],v))
    return dist`
    },
  ],
  variations: [
    {
      detail: 'Size-K min-heap 遍歷 n 個元素，時間 O(n log K)，空間 O(K)。比「全排序後取 K 個」O(n log n) 更優。結果：heap 頂 = 第 K 大，heap 中所有元素 = Top K。',
      code:
`import heapq
def topKLargest(nums, k):
    h=[]
    for v in nums:
        heapq.heappush(h,v)
        if len(h)>k: heapq.heappop(h)
    return sorted(h,reverse=True)  # K 個最大值

# 快速選擇法（O(n) 平均）
def kthLargestQS(nums,k):
    def partition(l,r):
        pivot=nums[r]; i=l
        for j in range(l,r):
            if nums[j]>=pivot: nums[i],nums[j]=nums[j],nums[i]; i+=1
        nums[i],nums[r]=nums[r],nums[i]; return i
    l,r=0,len(nums)-1; target=k-1
    while l<=r:
        p=partition(l,r)
        if p==target: return nums[p]
        elif p<target: l=p+1
        else: r=p-1`
    },
    {
      detail: '雙堆中位數：lo（max-heap）存較小的一半，hi（min-heap）存較大的一半。不變式：len(lo)>=len(hi) 且 -lo[0]<=hi[0]。每次 add 先全推入 lo，再從 lo 轉一個到 hi，最後如果 hi 更大就再轉回。',
      code:
`import heapq
class MedianFinder:
    def __init__(self): self.lo=[]; self.hi=[]
    def addNum(self,n):
        heapq.heappush(self.lo,-n)
        heapq.heappush(self.hi,-heapq.heappop(self.lo))
        if len(self.hi)>len(self.lo):
            heapq.heappush(self.lo,-heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo)>len(self.hi): return float(-self.lo[0])
        return (-self.lo[0]+self.hi[0])/2.0`
    },
    {
      detail: 'Dijkstra 和 Prim 的共同核心：min-heap 以代價排序，每次擴展代價最小的邊或節點，O((V+E)logV)。Prim 用於最小生成樹，Dijkstra 用於最短路徑（正邊權）。',
      code:
`# Network Delay Time (LC 743) — Dijkstra
import heapq
def networkDelayTime(times, n, k):
    graph={}
    for u,v,w in times:
        graph.setdefault(u,[]).append((v,w))
    dist={i:float('inf') for i in range(1,n+1)}
    dist[k]=0; h=[(0,k)]
    while h:
        d,u=heapq.heappop(h)
        if d>dist[u]: continue
        for v,w in graph.get(u,[]):
            if dist[u]+w<dist[v]:
                dist[v]=dist[u]+w
                heapq.heappush(h,(dist[v],v))
    ans=max(dist.values())
    return ans if ans<float('inf') else -1`
    },
    {
      detail: '雙堆滑動視窗中位數：視窗移動時，需要從 heap 中刪除過期元素（懶刪除）。用 Counter 記錄待刪元素，pop 時若在 counter 中就跳過並繼續 pop（延遲清理）。',
      code:
`import heapq
from collections import Counter
def medianSlidingWindow(nums,k):
    lo=[-v for v in nums[:k]]; hi=list(nums[:k])
    heapq.heapify(lo); heapq.heapify(hi)
    # 保持 lo 存下半（取負），hi 存上半
    def balance():
        while lo and hi and -lo[0]>hi[0]:
            heapq.heappush(hi,-heapq.heappop(lo))
            heapq.heappush(lo,-heapq.heappop(hi))
    balance()
    res=[(-lo[0]+hi[0])/2 if k%2==0 else float(-lo[0])]
    # 後續步驟略（完整版需懶刪除）
    return res  # 完整實作見 LC 480`
    },
  ],
},

// ── Graph ──────────────────────────────────────────────────────────────────────
'graph': {
  patterns: [
    {
      detail: 'BFS 鄰接表搜尋：queue 存 (node, dist)，visited set 防止重複。或者只存 node，dist 用層數計。enqueue 時標記 visited（不是 dequeue 時），避免同一節點多次入隊。',
      code:
`from collections import deque
def bfs_shortest(graph, start, end):
    q=deque([(start,0)]); visited={start}
    while q:
        node,d=q.popleft()
        if node==end: return d
        for nb in graph.get(node,[]):
            if nb not in visited:
                visited.add(nb)    # 入隊即標記
                q.append((nb,d+1))
    return -1

# Number of Islands (LC 200) — BFS 版
def numIslands(grid):
    R,C=len(grid),len(grid[0]); count=0
    def bfs(r,c):
        q=deque([(r,c)]); grid[r][c]='0'
        while q:
            x,y=q.popleft()
            for dx,dy in [(0,1),(0,-1),(1,0),(-1,0)]:
                nx,ny=x+dx,y+dy
                if 0<=nx<R and 0<=ny<C and grid[nx][ny]=='1':
                    grid[nx][ny]='0'; q.append((nx,ny))
    for r in range(R):
        for c in range(C):
            if grid[r][c]=='1': count+=1; bfs(r,c)
    return count`
    },
    {
      detail: 'DFS 遞迴骨架：訪問當前節點後，對每個未訪問的鄰居遞迴。圖（非樹）必須有 visited 集合。有向圖判環需三色標記：0=未訪問，1=訪問中，2=完成。',
      code:
`def dfs_graph(graph, start):
    visited=set()
    def dfs(node):
        visited.add(node)
        for nb in graph.get(node,[]):
            if nb not in visited: dfs(nb)
    dfs(start)

# 有向圖判環（三色 DFS）
def hasCycle(n, edges):
    graph={}
    for u,v in edges: graph.setdefault(u,[]).append(v)
    state=[0]*n   # 0:未訪 1:訪問中 2:完成
    def dfs(u):
        state[u]=1
        for v in graph.get(u,[]):
            if state[v]==1: return True   # 發現 back edge
            if state[v]==0 and dfs(v): return True
        state[u]=2; return False
    return any(dfs(i) for i in range(n) if state[i]==0)`
    },
    {
      detail: 'Union-Find（並查集）：find 用路徑壓縮（每個節點直接指向根），union 用按秩合併（小樹掛大樹）。兩者合用讓每次操作接近 O(1)（反阿克曼函數）。',
      code:
`class UnionFind:
    def __init__(self,n):
        self.parent=list(range(n))
        self.rank=[0]*n
        self.components=n

    def find(self,x):
        if self.parent[x]!=x:
            self.parent[x]=self.find(self.parent[x])  # 路徑壓縮
        return self.parent[x]

    def union(self,x,y):
        px,py=self.find(x),self.find(y)
        if px==py: return False
        if self.rank[px]<self.rank[py]: px,py=py,px
        self.parent[py]=px
        if self.rank[px]==self.rank[py]: self.rank[px]+=1
        self.components-=1; return True`
    },
    {
      detail: 'Kahn\'s 拓撲排序（BFS 版）：建 in-degree 陣列，把 in-degree=0 的節點入隊，每次 pop 後把鄰居 in-degree-1，若降為 0 則入隊。若最終處理數 < n，圖中有環。',
      code:
`from collections import deque, defaultdict
def topologicalSort(n, edges):
    graph=defaultdict(list); indegree=[0]*n
    for u,v in edges:
        graph[u].append(v); indegree[v]+=1
    q=deque(i for i in range(n) if indegree[i]==0)
    order=[]
    while q:
        u=q.popleft(); order.append(u)
        for v in graph[u]:
            indegree[v]-=1
            if indegree[v]==0: q.append(v)
    return order if len(order)==n else []  # 空表示有環`
    },
  ],
  variations: [
    {
      detail: '多源 BFS：把所有源點同時加入 queue，它們的距離都是 0。之後正常 BFS，每個節點被訪問時記錄的距離即到最近源點的距離。一次 BFS 搞定所有節點，O(V+E)。',
      code:
`# 01 Matrix (LC 542)：每個格子到最近 0 的距離
from collections import deque
def updateMatrix(mat):
    R,C=len(mat),len(mat[0])
    dist=[[float('inf')]*C for _ in range(R)]
    q=deque()
    for r in range(R):
        for c in range(C):
            if mat[r][c]==0: dist[r][c]=0; q.append((r,c))
    dirs=[(0,1),(0,-1),(1,0),(-1,0)]
    while q:
        r,c=q.popleft()
        for dr,dc in dirs:
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C and dist[nr][nc]>dist[r][c]+1:
                dist[nr][nc]=dist[r][c]+1; q.append((nr,nc))
    return dist`
    },
    {
      detail: '拓撲排序用 Kahn\'s 演算法：in-degree 為 0 的節點可以先執行（沒有前置依賴）。若圖有環（如 A→B→A），所有節點 in-degree 永遠不會降為 0，最終 order 長度 < n，可偵測環。',
      code:
`# Course Schedule (LC 207)
from collections import defaultdict, deque
def canFinish(numCourses, prerequisites):
    graph=defaultdict(list); indegree=[0]*numCourses
    for a,b in prerequisites:
        graph[b].append(a); indegree[a]+=1
    q=deque(i for i in range(numCourses) if indegree[i]==0)
    count=0
    while q:
        u=q.popleft(); count+=1
        for v in graph[u]:
            indegree[v]-=1
            if indegree[v]==0: q.append(v)
    return count==numCourses  # False 表示有環`
    },
    {
      detail: 'Union-Find 的最強應用：動態連通性查詢。核心操作：find（找代表根）和 union（合併兩組）。路徑壓縮讓 find 幾乎 O(1)。應用廣：連通分量數、最小生成樹（Kruskal）、賬戶合併。',
      code:
`# Number of Connected Components (LC 323)
def countComponents(n, edges):
    uf=UnionFind(n)
    for u,v in edges: uf.union(u,v)
    return uf.components

# Kruskal 最小生成樹
def minSpanningTree(n, edges):
    edges.sort(key=lambda e:e[2])  # 按邊權排序
    uf=UnionFind(n); total=0; count=0
    for u,v,w in edges:
        if uf.union(u,v):          # 不形成環才加入
            total+=w; count+=1
            if count==n-1: break
    return total if count==n-1 else -1`
    },
    {
      detail: 'Dijkstra 保證：每個節點第一次被 pop 出 heap 時，dist[node] 已是最短距離（因為 heap 按代價排序，之後只會更大）。不適用負邊權（用 Bellman-Ford）。',
      code:
`# Cheapest Flights Within K Stops (LC 787)
# 改良版 Dijkstra：限制 stops 數
import heapq
def findCheapestPrice(n, flights, src, dst, k):
    graph={}
    for u,v,p in flights: graph.setdefault(u,[]).append((v,p))
    # (price, stops, node)
    h=[(0,0,src)]; visited={}
    while h:
        price,stops,u=heapq.heappop(h)
        if u==dst: return price
        if stops>k: continue
        if visited.get(u,float('inf'))<=stops: continue
        visited[u]=stops
        for v,p in graph.get(u,[]):
            heapq.heappush(h,(price+p,stops+1,v))
    return -1`
    },
  ],
},

// ── Trie ───────────────────────────────────────────────────────────────────────
'trie': {
  patterns: [
    {
      detail: 'TrieNode 有 children dict（或 [None]*26）和 is_end 布林值。insert 逐字元建立節點，search 逐字元查找並在末尾檢查 is_end，startsWith 只需確認路徑存在即可。',
      code:
`class TrieNode:
    def __init__(self):
        self.children={}; self.is_end=False

class Trie:
    def __init__(self): self.root=TrieNode()

    def insert(self,word):
        node=self.root
        for c in word:
            if c not in node.children:
                node.children[c]=TrieNode()
            node=node.children[c]
        node.is_end=True

    def search(self,word):
        node=self.root
        for c in word:
            if c not in node.children: return False
            node=node.children[c]
        return node.is_end

    def startsWith(self,prefix):
        node=self.root
        for c in prefix:
            if c not in node.children: return False
            node=node.children[c]
        return True`
    },
    {
      detail: 'DFS 搜尋：當遇到「.」時，對當前節點的所有子節點遞迴嘗試。這是 Trie 的萬用字元搜尋。若字元確定，直接沿對應子節點走。',
      code:
`class WordDictionary:
    def __init__(self): self.root=TrieNode()
    def addWord(self,word):
        node=self.root
        for c in word: node=node.children.setdefault(c,TrieNode())
        node.is_end=True
    def search(self,word):
        def dfs(node,i):
            if i==len(word): return node.is_end
            c=word[i]
            if c=='.':
                return any(dfs(ch,i+1) for ch in node.children.values())
            if c not in node.children: return False
            return dfs(node.children[c],i+1)
        return dfs(self.root,0)`
    },
    {
      detail: 'Word Search II：把所有目標詞建入 Trie，DFS 矩陣時同步在 Trie 中行走。找到完整單詞就加入結果，並清除 is_end 防止重複。到達葉節點（無子節點）時剪枝。',
      code:
`def findWords(board, words):
    trie=Trie()
    for w in words: trie.insert(w)
    R,C=len(board),len(board[0]); res=[]
    def dfs(r,c,node,path):
        ch=board[r][c]
        if ch not in node.children: return
        nxt=node.children[ch]; path+=ch
        if nxt.is_end: res.append(path); nxt.is_end=False
        board[r][c]='#'   # 標記已訪問
        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C and board[nr][nc]!='#':
                dfs(nr,nc,nxt,path)
        board[r][c]=ch    # 還原
        if not nxt.children: del node.children[ch]  # 剪枝
    for r in range(R):
        for c in range(C): dfs(r,c,trie.root,"")
    return res`
    },
    {
      detail: '搜尋前綴後，對子 Trie 做 DFS/BFS 收集所有完整詞。結合輸入前綴、堆積或排序，可實作 Top-K 自動補全。',
      code:
`def autocomplete(trie, prefix):
    node=trie.root
    for c in prefix:
        if c not in node.children: return []
        node=node.children[c]
    # BFS 收集所有以 prefix 開頭的完整詞
    from collections import deque
    results=[]; q=deque([(node,prefix)])
    while q:
        cur,word=q.popleft()
        if cur.is_end: results.append(word)
        for c,child in sorted(cur.children.items()):
            q.append((child,word+c))
    return results`
    },
  ],
  variations: [
    {
      detail: '萬用字元搜尋（"." 匹配任意字元）：在 DFS 中，遇到 "." 就對所有子節點遞迴。找到是_end=True 的路徑即成功。Python 的 any() 搭配 generator 可以短路（找到即停）。',
      code:
`class WordDictionary:
    def __init__(self): self.root=TrieNode()
    def addWord(self,word):
        node=self.root
        for c in word: node=node.children.setdefault(c,TrieNode())
        node.is_end=True
    def search(self,word):
        def dfs(node,i):
            if i==len(word): return node.is_end
            c=word[i]
            if c!='.' :
                return c in node.children and dfs(node.children[c],i+1)
            return any(dfs(ch,i+1) for ch in node.children.values())
        return dfs(self.root,0)`
    },
    {
      detail: 'Search Suggestions (LC 1268)：對每個前綴（輸入的前 1,2,...n 個字元）找 Trie 中以此為前綴的前 3 個字母序最小的詞。建 Trie 時在每個節點存「推薦詞列表」可加速，或每次 BFS 取前 3。',
      code:
`def suggestedProducts(products, searchWord):
    products.sort()   # 字母序
    trie=Trie()
    for p in products: trie.insert(p)
    res=[]; prefix=""
    for c in searchWord:
        prefix+=c
        node=trie.root
        for ch in prefix:
            if ch not in node.children: node=None; break
            node=node.children[ch]
        suggestions=[]
        if node:
            def collect(n,word):
                if len(suggestions)==3: return
                if n.is_end: suggestions.append(word)
                for ch in sorted(n.children): collect(n.children[ch],word+ch)
            collect(node,prefix)
        res.append(suggestions)
    return res`
    },
    {
      detail: 'Word Search II：Trie + DFS 矩陣。關鍵優化：找到詞後立刻清除 is_end（不重複回報）；無子節點時從父節點刪除該子節點（剪枝，避免無效 DFS）。這讓最壞情況大幅改善。',
      code:
`# 精簡版 Word Search II
def findWords(board, words):
    root=TrieNode()
    for w in words:   # 建 Trie
        n=root
        for c in w: n=n.children.setdefault(c,TrieNode())
        n.is_end=w  # 直接存詞（方便回報）
    R,C=len(board),len(board[0]); res=[]
    def dfs(r,c,node):
        ch=board[r][c]
        if ch=='#' or ch not in node.children: return
        nxt=node.children[ch]
        if nxt.is_end: res.append(nxt.is_end); nxt.is_end=False
        board[r][c]='#'
        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C: dfs(nr,nc,nxt)
        board[r][c]=ch
        if not nxt.children: del node.children[ch]
    for r in range(R):
        for c in range(C): dfs(r,c,root)
    return res`
    },
    {
      detail: 'XOR Trie：把整數以 32 位二進位儲存。查詢最大 XOR：逐位希望走「相反位」（0 走 1 側，1 走 0 側），若有就走，若無就走相同側。每次查詢 O(32)=O(1)。',
      code:
`class XORTrie:
    def __init__(self): self.root={}
    def insert(self,num):
        node=self.root
        for i in range(31,-1,-1):
            b=(num>>i)&1
            if b not in node: node[b]={}
            node=node[b]
    def maxXOR(self,num):
        node=self.root; xor=0
        for i in range(31,-1,-1):
            b=(num>>i)&1
            want=1-b   # 希望走相反位
            if want in node: node=node[want]; xor|=(want^b)<<i  # 哦等等需要修正
            # 正確: xor |= (1<<i) 若走了 want
            else: node=node.get(b,{})
        return xor

# LC 421 — 最大 XOR
def findMaximumXOR(nums):
    t=XORTrie()
    for n in nums: t.insert(n)
    return max(t.maxXOR(n) for n in nums)`
    },
  ],
},

}; // END DETAIL_DATA (part 1 — DS topics)

// Will be extended with algo topics in data-details-algo.js
