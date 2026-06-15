// Data Structures Part 1: Array, Linked List, Stack, Queue, Hash Table
const DS_TOPICS_1 = [
{
  id:'array', title:'陣列', titleEn:'Array', category:'ds', icon:'📋', difficulty:'beginner',
  concept:{
    summary:'陣列是最基礎的資料結構，將同類型元素以連續的記憶體空間儲存，每個元素可透過索引（index）直接存取。',
    analogy:'就像電影院的座位——每個座位都有固定編號（索引），你說「第3排第5號」，工作人員立刻帶你去，不用從第1個找起。記憶體位址 = 起始位址 + 索引 × 元素大小。',
    properties:[
      '元素在記憶體中連續排列，CPU 快取效能優異',
      '隨機存取（Random Access）：透過索引取得任意元素，O(1)',
      '靜態陣列大小固定；動態陣列（如 Python list）可自動擴容',
      '插入/刪除中間元素需移動後方所有元素，O(n)',
      '支援二維、多維陣列（矩陣）',
    ],
    viz:`Index:  [0]   [1]   [2]   [3]   [4]
Value: [10]  [20]  [30]  [40]  [50]
Addr:  1000  1004  1008  1012  1016   (int = 4 bytes)

存取 arr[3] → 1000 + 3×4 = 1012  ✓ O(1)

插入 25 到 index 2（需右移後方元素）：
Before: [10][20][30][40][50]
After:  [10][20][25][30][40][50]  ← 30,40,50 都往右移 O(n)`
  },
  complexity:[
    {op:'Random Access（隨機存取）', time:'O(1)',    cls:'o1',    space:'O(1)'},
    {op:'Search（線性搜尋）',        time:'O(n)',    cls:'on',    space:'O(1)'},
    {op:'Append（末尾插入）',        time:'O(1)*',  cls:'o1',    space:'O(1)'},
    {op:'Insert at index（中間插入）',time:'O(n)',   cls:'on',    space:'O(1)'},
    {op:'Delete at end（末尾刪除）', time:'O(1)',    cls:'o1',    space:'O(1)'},
    {op:'Delete at index（中間刪除）',time:'O(n)',   cls:'on',    space:'O(1)'},
  ],
  complexityNote:'* 動態陣列擴容時為 O(n)，但攤銷（amortized）平均仍為 O(1)',
  space:'O(n)',
  code:`# Python list 即動態陣列
arr = [10, 20, 30, 40, 50]

# ── 基本操作 ──────────────────────────
print(arr[2])        # 隨機存取 O(1) → 30
arr.append(60)       # 末尾插入 O(1) 攤銷
arr.insert(2, 25)    # 中間插入 O(n)
arr.pop()            # 末尾刪除 O(1)
arr.pop(2)           # 指定位置刪除 O(n)
print(len(arr))      # 長度 O(1)

# ── 常用技巧 ──────────────────────────
sub = arr[1:4]       # 切片（建立新 list）O(k)
arr.sort()           # 原地排序 O(n log n)
arr.reverse()        # 原地反轉 O(n)
idx = arr.index(40)  # 線性搜尋 O(n)

# ── 前綴和 Prefix Sum ─────────────────
nums = [1, 2, 3, 4, 5]
prefix = [0] * (len(nums) + 1)
for i, v in enumerate(nums):
    prefix[i+1] = prefix[i] + v
# 區間 [l, r] 的總和（O(1) 查詢）
def range_sum(l, r):
    return prefix[r+1] - prefix[l]
print(range_sum(1, 3))  # nums[1]+nums[2]+nums[3] = 9

# ── 2D 陣列初始化 ─────────────────────
# ✅ 正確：list comprehension
matrix = [[0]*3 for _ in range(3)]
# ❌ 陷阱：三列共用同一個物件！
# wrong = [[0]*3] * 3

# ── 雙指針模板 ────────────────────────
def two_sum_sorted(nums, target):
    l, r = 0, len(nums) - 1
    while l < r:
        s = nums[l] + nums[r]
        if s == target: return [l, r]
        elif s < target: l += 1
        else: r -= 1
    return []`,
  interview:{
    howAsked:[
      '兩數/三數之和（k-sum）：排序 + 雙指針，注意去重複',
      '子陣列問題：最大子陣列和（Kadane）、固定/可變視窗',
      '原地修改：移動零、去重複、排序顏色（Dutch National Flag）',
      '前綴和：區間查詢、子陣列和等於 K',
      '矩陣遍歷：螺旋順序、對角線、搜尋矩陣',
    ],
    patterns:[
      '雙指針（Two Pointers）：l/r 從兩端收縮，適合已排序陣列',
      '快慢指針（Fast/Slow）：fast 每次走兩步，找中點或偵測循環',
      '前綴和（Prefix Sum）：O(1) 計算任意區間和',
      'write 指針：原地修改時用一個指針追蹤下一個寫入位置',
    ],
    watchOut:[
      '空陣列、單元素、全相同元素的邊界條件',
      'Python 切片是複製（O(k)），不是引用',
      '2D 陣列請用 list comprehension 初始化，避免淺複製',
      '問清楚輸入是否已排序、是否可以修改原陣列',
    ]
  },
  variations:[
    {name:'前綴和 Prefix Sum', desc:'預處理陣列，O(1) 計算任意區間總和。適合多次查詢。', ex:'Range Sum Query, Subarray Sum Equals K (#560)'},
    {name:'差分陣列 Difference Array', desc:'O(1) 對區間批量加減值，最後還原。', ex:'Car Pooling (#1094), Corporate Flight Bookings (#1109)'},
    {name:'循環陣列 Circular Array', desc:'末尾接頭，用 index % n 處理邊界。', ex:'Next Greater Element II (#503)'},
    {name:'原地修改 In-place', desc:'不使用額外 O(n) 空間，用 write 指針覆寫。', ex:'Remove Duplicates (#26), Move Zeroes (#283)'},
  ],
  quiz:[
    {q:'動態陣列末尾插入（append）的攤銷時間複雜度是？',
     opts:['O(1)','O(log n)','O(n)','O(n²)'], ans:0,
     exp:'雖然偶爾擴容需 O(n) 複製，但用攤銷分析（amortized analysis），每次插入的平均成本仍是 O(1)。'},
    {q:'以下哪個操作最慢（worst case）？',
     opts:['arr[i]（讀取）','arr.append(x)','arr.insert(0, x)','len(arr)'], ans:2,
     exp:'insert(0, x) 在開頭插入，需把所有 n 個元素右移，時間複雜度 O(n)。其他三個都是 O(1)。'},
    {q:'初始化 3×3 零矩陣，下列哪種有 bug？',
     opts:['[[0]*3 for _ in range(3)]','[[0,0,0],[0,0,0],[0,0,0]]','[[0]*3]*3','[([0]*3)[:] for _ in range(3)]'], ans:2,
     exp:'[[0]*3]*3 讓三列共用同一個 list！改 matrix[0][0] 會同時影響 matrix[1][0] 和 matrix[2][0]。'},
    {q:'前綴和陣列 prefix 定義為 prefix[i] = sum(nums[0..i-1])，計算 nums[2..4] 的和？',
     opts:['prefix[4] - prefix[2]','prefix[5] - prefix[2]','prefix[4] - prefix[1]','prefix[5] - prefix[3]'], ans:1,
     exp:'區間 [l, r] 的和 = prefix[r+1] - prefix[l]。所以 nums[2..4] = prefix[5] - prefix[2]。'},
    {q:'Two Pointers 雙指針解 Two Sum II（已排序），最壞情況時間複雜度？',
     opts:['O(1)','O(log n)','O(n)','O(n²)'], ans:2,
     exp:'雙指針從兩端向中間移動，每步至少一個指針前進，最多走 n 步，時間複雜度 O(n)，優於暴力 O(n²)。'},
  ],
  leetcode:[
    {no:1,   title:'Two Sum',                     diff:'Easy',   url:'https://leetcode.com/problems/two-sum/',                              note:'雜湊表配合陣列的必刷入門題'},
    {no:121, title:'Best Time to Buy and Sell Stock', diff:'Easy', url:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',   note:'一次遍歷，維護左側最小值'},
    {no:217, title:'Contains Duplicate',          diff:'Easy',   url:'https://leetcode.com/problems/contains-duplicate/',                   note:'set 去重複，O(n)'},
    {no:283, title:'Move Zeroes',                 diff:'Easy',   url:'https://leetcode.com/problems/move-zeroes/',                          note:'write 指針原地修改模板'},
    {no:238, title:'Product of Array Except Self',diff:'Medium', url:'https://leetcode.com/problems/product-of-array-except-self/',         note:'前綴積 × 後綴積，不能用除法'},
    {no:53,  title:'Maximum Subarray',            diff:'Medium', url:'https://leetcode.com/problems/maximum-subarray/',                     note:'Kadane\'s Algorithm 經典'},
    {no:11,  title:'Container With Most Water',   diff:'Medium', url:'https://leetcode.com/problems/container-with-most-water/',            note:'雙指針，移動較小的那側'},
    {no:15,  title:'3Sum',                        diff:'Medium', url:'https://leetcode.com/problems/3sum/',                                 note:'排序 + 雙指針 + 去重複'},
    {no:560, title:'Subarray Sum Equals K',       diff:'Medium', url:'https://leetcode.com/problems/subarray-sum-equals-k/',               note:'前綴和 + HashMap 的完美組合'},
    {no:42,  title:'Trapping Rain Water',         diff:'Hard',   url:'https://leetcode.com/problems/trapping-rain-water/',                  note:'雙指針 or 前綴最大值，面試高頻 Hard'},
  ],
  refs:[
    {title:'NeetCode 75 — Array 解題影片',       url:'https://neetcode.io/practice'},
    {title:'Visualgo — 陣列視覺化',               url:'https://visualgo.net/en/array'},
    {title:'GeeksforGeeks — Array DS',            url:'https://www.geeksforgeeks.org/array-data-structure/'},
  ]
},
{
  id:'linked-list', title:'鏈結串列', titleEn:'Linked List', category:'ds', icon:'🔗', difficulty:'beginner',
  concept:{
    summary:'鏈結串列由一連串「節點（Node）」組成，每個節點存放資料與指向下一個節點的指標（pointer）。元素不需連續存放在記憶體中。',
    analogy:'像一串尋寶地圖——每張地圖上寫著當前的寶藏位置，以及「下一張地圖在哪裡」。你必須從頭一張一張跟著走，無法直接跳到第 n 張。',
    properties:[
      '動態大小：隨時插入/刪除，不需預先配置記憶體',
      '節點在記憶體中不連續，透過指標串接',
      '無法隨機存取：找第 n 個元素需從頭遍歷，O(n)',
      '插入/刪除已知位置：只需改指標，O(1)；但先找到位置需 O(n)',
      '種類：單向（Singly）、雙向（Doubly）、循環（Circular）',
    ],
    viz:`單向鏈結串列（Singly Linked List）：
[10|→] → [20|→] → [30|→] → [40|→] → None
  ↑
 head

雙向鏈結串列（Doubly Linked List）：
None ← [←|10|→] ⟷ [←|20|→] ⟷ [←|30|→] → None
         ↑                                    ↑
        head                                 tail

在 20 和 30 之間插入 25（只改指標，O(1)）：
[←|20|→] → [←|25|→] → [←|30|→]`
  },
  complexity:[
    {op:'Access by index（索引存取）', time:'O(n)', cls:'on', space:'O(1)'},
    {op:'Search（搜尋）',              time:'O(n)', cls:'on', space:'O(1)'},
    {op:'Insert at head（頭部插入）',  time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Insert at tail（尾部插入）',  time:'O(1)*',cls:'o1', space:'O(1)'},
    {op:'Insert at middle（中間插入）',time:'O(n)', cls:'on', space:'O(1)'},
    {op:'Delete at head（頭部刪除）',  time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Delete at middle（中間刪除）',time:'O(n)', cls:'on', space:'O(1)'},
  ],
  complexityNote:'* 維護 tail 指標時尾部插入為 O(1)',
  space:'O(n)',
  code:`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# ── 建立鏈結串列 ──────────────────────
def build(vals):
    dummy = ListNode(0)
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

head = build([1, 2, 3, 4, 5])

# ── 遍歷 ─────────────────────────────
def traverse(head):
    cur = head
    while cur:
        print(cur.val, end=' -> ')
        cur = cur.next
    print('None')

# ── 反轉（Reverse）- 面試最高頻 ──────
def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next   # 1. 存下一個
        cur.next = prev  # 2. 反轉指標
        prev = cur       # 3. prev 前進
        cur = nxt        # 4. cur 前進
    return prev

# ── 找中點（Fast/Slow Pointer）────────
def find_mid(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # 偶數個節點時回傳右中點

# ── 偵測環（Floyd's Cycle Detection）─
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

# ── 刪除倒數第 n 個節點 ───────────────
def remove_nth(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):   # fast 先走 n+1 步
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
  interview:{
    howAsked:[
      '反轉鏈結串列（全部 or 區間 k 個一組）',
      '快慢指針：找中點、偵測環、找環的入口',
      '合併兩個（或 k 個）有序鏈結串列',
      '刪除倒數第 n 個節點（雙指針間距法）',
      'LRU Cache（雙向鏈結串列 + HashMap）',
    ],
    patterns:[
      'Dummy Node：在 head 前加虛擬節點，簡化頭部操作邊界',
      'Fast/Slow Pointer：快指針走兩步，慢指針走一步',
      '雙指針間距：先讓一個指針超前 n 步，再同步前進',
      '遞迴反轉：理解遞迴思維，但注意 stack overflow 風險',
    ],
    watchOut:[
      '操作前先存 next 指標，避免丟失節點',
      'dummy node 讓 head 操作統一，避免特判',
      '環偵測後找入口：slow 回 head，fast 留在交點，同步走',
      '刪除節點時要確認前一個節點的 next 正確更新',
    ]
  },
  variations:[
    {name:'雙向鏈結串列', desc:'每個節點有 prev/next 兩個指標，支援 O(1) 雙向遍歷與刪除。', ex:'LRU Cache (#146), Design Browser History (#1472)'},
    {name:'循環鏈結串列', desc:'最後一個節點指回頭部，常見於 Round Robin 調度。', ex:'Circular Array Loop (#457)'},
    {name:'快慢指針變形', desc:'找中點、偵測環、找環入口、找倒數第 k 個節點。', ex:'Linked List Cycle II (#142), Middle of Linked List (#876)'},
    {name:'K 個一組反轉', desc:'每 k 個節點反轉一次，剩餘不足 k 個保持原樣。', ex:'Reverse Nodes in k-Group (#25)'},
  ],
  quiz:[
    {q:'使用快慢指針找單向鏈結串列中點，fast 走兩步 slow 走一步，5個節點時 slow 最終停在？',
     opts:['第1個','第2個','第3個（中點）','第4個'], ans:2,
     exp:'5個節點：slow 走 2 步到達第3個，fast 走 4 步到第5個後，fast.next=None，迴圈結束。slow 即中點。'},
    {q:'刪除鏈結串列中倒數第 n 個節點，最優解的時間複雜度？',
     opts:['O(1)','O(n)','O(n²)','O(log n)'], ans:1,
     exp:'用雙指針：fast 先走 n+1 步，然後 fast/slow 同步走到 fast=None，此時 slow.next 就是目標節點。總共遍歷一次，O(n)。'},
    {q:'以下哪種操作，鏈結串列比陣列更有優勢？',
     opts:['隨機存取第 k 個元素','在已知位置插入元素','二元搜尋','排序'], ans:1,
     exp:'在已知節點後插入只需改兩個指標，O(1)。而陣列需要移動後方所有元素 O(n)。其他三個陣列更有優勢。'},
    {q:'Floyd\'s Cycle Detection（龜兔賽跑）中，若有環，慢指針和快指針一定會相遇，原因是？',
     opts:['快指針追上慢指針，距離每步縮小 1','快指針速度是慢指針的 2 倍','鏈結串列長度有限','以上皆非'], ans:0,
     exp:'在環中，快/慢每走一步，兩者相對距離縮小 1。由於環長有限，最終一定會相遇。'},
    {q:'為什麼建議在鏈結串列操作時使用 dummy node（虛擬頭節點）？',
     opts:['提升時間複雜度','讓頭節點的操作與其他節點統一，避免特判','節省記憶體','加快搜尋速度'], ans:1,
     exp:'加了 dummy.next = head 後，刪除頭節點和刪除中間節點的程式碼完全一樣，不需要 if head == target 的特殊判斷。'},
  ],
  leetcode:[
    {no:206, title:'Reverse Linked List',          diff:'Easy',   url:'https://leetcode.com/problems/reverse-linked-list/',           note:'反轉基本功，迭代 + 遞迴都要會'},
    {no:21,  title:'Merge Two Sorted Lists',       diff:'Easy',   url:'https://leetcode.com/problems/merge-two-sorted-lists/',        note:'dummy node 模板，歸併排序基礎'},
    {no:141, title:'Linked List Cycle',            diff:'Easy',   url:'https://leetcode.com/problems/linked-list-cycle/',             note:'Floyd 快慢指針偵測環'},
    {no:876, title:'Middle of the Linked List',    diff:'Easy',   url:'https://leetcode.com/problems/middle-of-the-linked-list/',     note:'快慢指針找中點'},
    {no:19,  title:'Remove Nth Node From End of List', diff:'Medium', url:'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', note:'雙指針間距法'},
    {no:2,   title:'Add Two Numbers',              diff:'Medium', url:'https://leetcode.com/problems/add-two-numbers/',               note:'進位處理，dummy node'},
    {no:146, title:'LRU Cache',                    diff:'Medium', url:'https://leetcode.com/problems/lru-cache/',                     note:'雙向鏈結串列 + HashMap 設計題'},
    {no:142, title:'Linked List Cycle II',         diff:'Medium', url:'https://leetcode.com/problems/linked-list-cycle-ii/',          note:'找環的入口節點'},
    {no:24,  title:'Swap Nodes in Pairs',          diff:'Medium', url:'https://leetcode.com/problems/swap-nodes-in-pairs/',           note:'指標操作練習'},
    {no:25,  title:'Reverse Nodes in k-Group',     diff:'Hard',   url:'https://leetcode.com/problems/reverse-nodes-in-k-group/',      note:'K 個一組反轉，高頻 Hard'},
  ],
  refs:[
    {title:'NeetCode — Linked List Playlist', url:'https://www.youtube.com/playlist?list=PLot-Xpze53leU0Ec0VkBhnf4npMRFiNcB'},
    {title:'Visualgo — 鏈結串列視覺化',       url:'https://visualgo.net/en/list'},
    {title:'LeetCode Explore — Linked List',  url:'https://leetcode.com/explore/learn/card/linked-list/'},
  ]
},
{
  id:'stack', title:'堆疊', titleEn:'Stack', category:'ds', icon:'📚', difficulty:'beginner',
  concept:{
    summary:'堆疊是一種後進先出（LIFO: Last In, First Out）的資料結構，只能從一端（頂部）進行插入（push）和刪除（pop）。',
    analogy:'就像一疊盤子——你只能從最頂端放上或拿走盤子。最後放上去的盤子，第一個被拿走。電腦的函式呼叫堆疊（call stack）就是這個原理。',
    properties:[
      'LIFO（後進先出）：最後 push 的元素最先 pop',
      '只能操作頂端（top），不能存取中間元素',
      'push（入堆）、pop（出堆）、peek/top（查看頂端）都是 O(1)',
      '常見應用：函式呼叫、括號匹配、撤銷操作（Undo）、DFS',
      'Python 用 list 實現，用 append/pop(-1)（效率 O(1)）',
    ],
    viz:`push(10) → push(20) → push(30) → pop()

TOP  ┌──────┐
     │  30  │ ← push/pop 在這裡
     │  20  │
BOTTOM│  10  │
     └──────┘

函式呼叫堆疊（Call Stack）：
main() → foo() → bar()
 [main]
 [foo ]   ← 呼叫 bar 時 push
 [bar ]   ← 執行完後 pop，回到 foo`
  },
  complexity:[
    {op:'Push（入堆）', time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Pop（出堆）',  time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Peek/Top',    time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Search',      time:'O(n)', cls:'on', space:'O(1)'},
    {op:'Size',        time:'O(1)', cls:'o1', space:'O(1)'},
  ],
  complexityNote:'所有核心操作均為 O(1)，空間複雜度 O(n)',
  space:'O(n)',
  code:`# Python 用 list 當 stack（append/pop 都是 O(1)）
stack = []
stack.append(10)   # push
stack.append(20)
stack.append(30)
top = stack[-1]    # peek O(1)
val = stack.pop()  # pop O(1) → 30
print(stack)       # [10, 20]

# ── 括號匹配 Valid Parentheses ────────
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{':
            stack.append(c)
        else:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0

# ── 單調堆疊 Monotonic Stack ──────────
# 找每個元素右側第一個更大的元素
def next_greater(nums):
    n = len(nums)
    res = [-1] * n
    stack = []   # 儲存 index，保持遞減單調
    for i, v in enumerate(nums):
        while stack and nums[stack[-1]] < v:
            idx = stack.pop()
            res[idx] = v   # v 是 nums[idx] 的下一個更大值
        stack.append(i)
    return res

# ── Min Stack ─────────────────────────
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # 同步維護最小值
    def push(self, val):
        self.stack.append(val)
        m = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(m)
    def pop(self):
        self.stack.pop()
        self.min_stack.pop()
    def top(self):    return self.stack[-1]
    def getMin(self): return self.min_stack[-1]`,
  interview:{
    howAsked:[
      '括號匹配：Valid Parentheses 系列，用 stack 配對',
      '單調堆疊（Monotonic Stack）：下一個更大/更小元素，柱狀圖最大矩形',
      'Min/Max Stack：O(1) 取得最小/最大值的特殊 stack',
      '逆波蘭式計算（RPN Evaluator）：運算子/運算元分離',
      '括號生成、字串解碼（遞迴展開）',
    ],
    patterns:[
      '單調堆疊：維護遞增或遞減的堆疊，遇到破壞單調性的元素時 pop 並處理',
      '雙 Stack 模擬 Queue：一個 stack 輸入，另一個輸出',
      '遞迴 → 迭代：幾乎所有遞迴都可以用顯式 stack 改寫',
    ],
    watchOut:[
      'pop 前檢查 stack 是否為空（IndexError）',
      '單調堆疊儲存 index 還是 value 要根據題目決定',
      'Min Stack 要同步 push/pop，維護輔助 stack',
    ]
  },
  variations:[
    {name:'單調堆疊 Monotonic Stack', desc:'維護一個嚴格遞增/遞減的堆疊，O(n) 解決「下一個更大元素」類問題。', ex:'Daily Temperatures (#739), Next Greater Element (#496)'},
    {name:'Min/Max Stack', desc:'額外維護一個輔助 stack，O(1) 取得當前最小/最大值。', ex:'Min Stack (#155), Maximum Frequency Stack (#895)'},
    {name:'Stack 模擬 Queue', desc:'兩個 stack 互倒模擬 FIFO，攤銷 O(1)。', ex:'Implement Queue using Stacks (#232)'},
    {name:'括號/配對問題', desc:'開括號 push，閉括號 pop 並驗證配對。', ex:'Valid Parentheses (#20), Decode String (#394)'},
  ],
  quiz:[
    {q:'Stack 的核心特性是？',
     opts:['FIFO（先進先出）','LIFO（後進先出）','隨機存取','雙端操作'], ans:1,
     exp:'Stack 是 LIFO（Last In First Out），最後 push 的元素最先 pop。Queue 才是 FIFO。'},
    {q:'用 Python list 實現 Stack，peek（查看頂端但不移除）的正確寫法？',
     opts:['stack[0]','stack.pop()','stack[-1]','stack.top()'], ans:2,
     exp:'stack[-1] 取最後一個元素（頂端）且不移除，O(1)。stack.pop() 會移除元素。stack[0] 是底部。'},
    {q:'Valid Parentheses 括號匹配，遇到 ) 時 stack 為空，應該？',
     opts:['繼續執行','return False（無效）','push 進 stack','等待下一個括號'], ans:1,
     exp:'遇到閉括號時 stack 為空，表示沒有對應的開括號，直接 return False。'},
    {q:'單調遞增堆疊（Monotonic Increasing Stack）中，若 push 的新值比 top 大，應該？',
     opts:['直接 push','先 pop top 再 push','丟棄新值','重建整個 stack'], ans:0,
     exp:'單調遞增 stack 中，新值 ≥ top 時直接 push（維持遞增）。只有新值 < top 時才 pop。'},
    {q:'Min Stack 設計：push(5), push(3), push(7), getMin() 回傳？',
     opts:['7','5','3','無法確定'], ans:2,
     exp:'3 是目前 stack 中最小值。Min Stack 用輔助 stack 同步記錄每個時刻的最小值，getMin() 直接讀輔助 stack 頂端 O(1)。'},
  ],
  leetcode:[
    {no:20,  title:'Valid Parentheses',                diff:'Easy',   url:'https://leetcode.com/problems/valid-parentheses/',                note:'Stack 最經典入門題'},
    {no:155, title:'Min Stack',                        diff:'Medium', url:'https://leetcode.com/problems/min-stack/',                        note:'雙 stack 設計，O(1) getMin'},
    {no:225, title:'Implement Stack using Queues',     diff:'Easy',   url:'https://leetcode.com/problems/implement-stack-using-queues/',     note:'理解 Stack vs Queue 差異'},
    {no:739, title:'Daily Temperatures',               diff:'Medium', url:'https://leetcode.com/problems/daily-temperatures/',               note:'單調堆疊模板題，必刷'},
    {no:150, title:'Evaluate Reverse Polish Notation', diff:'Medium', url:'https://leetcode.com/problems/evaluate-reverse-polish-notation/', note:'逆波蘭計算機'},
    {no:394, title:'Decode String',                    diff:'Medium', url:'https://leetcode.com/problems/decode-string/',                    note:'Stack 處理巢狀字串'},
    {no:503, title:'Next Greater Element II',          diff:'Medium', url:'https://leetcode.com/problems/next-greater-element-ii/',          note:'循環陣列 + 單調堆疊'},
    {no:84,  title:'Largest Rectangle in Histogram',   diff:'Hard',   url:'https://leetcode.com/problems/largest-rectangle-in-histogram/',   note:'單調堆疊 Hard 名題'},
    {no:85,  title:'Maximal Rectangle',                diff:'Hard',   url:'https://leetcode.com/problems/maximal-rectangle/',                note:'#84 的 2D 延伸'},
    {no:224, title:'Basic Calculator',                 diff:'Hard',   url:'https://leetcode.com/problems/basic-calculator/',                 note:'Stack 模擬計算機，細節多'},
  ],
  refs:[
    {title:'NeetCode — Stack 解題影片', url:'https://neetcode.io/practice'},
    {title:'單調堆疊詳解 by labuladong', url:'https://labuladong.online/algo/data-structure/monotonic-stack/'},
    {title:'LeetCode Explore — Stack & Queue', url:'https://leetcode.com/explore/learn/card/queue-stack/'},
  ]
},
{
  id:'queue', title:'佇列', titleEn:'Queue', category:'ds', icon:'🚶', difficulty:'beginner',
  concept:{
    summary:'佇列是先進先出（FIFO: First In, First Out）的資料結構，從尾端加入（enqueue），從頭端移除（dequeue）。雙端佇列（Deque）兩端都可操作。',
    analogy:'就像排隊買票——先來的人先買到票（FIFO）。BFS 廣度優先搜尋的核心工具，確保「距離近的節點先被處理」。',
    properties:[
      'FIFO（先進先出）：最早 enqueue 的元素最先 dequeue',
      'enqueue 加到尾端、dequeue 從頭端移除，都是 O(1)',
      'Deque（雙端佇列）：頭尾兩端皆可 O(1) 插入/刪除',
      'Python 用 collections.deque，左右端操作均為 O(1)',
      '應用：BFS、滑動視窗最大值、任務排程',
    ],
    viz:`Queue（FIFO）：
              enqueue →
FRONT [10][20][30][40] BACK
← dequeue

Deque（雙端佇列）：
appendleft ← [10][20][30][40] → append
   popleft →                  ← pop

BFS 中的佇列（層序遍歷）：
初始: [A]         → 處理 A，加入 B,C
第1層: [B][C]     → 處理 B（加 D,E），處理 C（加 F）
第2層: [D][E][F]  → 層層展開`
  },
  complexity:[
    {op:'Enqueue（加入尾端）',   time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Dequeue（移除頭端）',   time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Peek Front（查看頭端）',time:'O(1)', cls:'o1', space:'O(1)'},
    {op:'Search',                time:'O(n)', cls:'on', space:'O(1)'},
    {op:'Deque 兩端操作',        time:'O(1)', cls:'o1', space:'O(1)'},
  ],
  complexityNote:'Python list 的 pop(0) 是 O(n)，請務必用 collections.deque',
  space:'O(n)',
  code:`from collections import deque

# ── 基本佇列操作 ─────────────────────
q = deque()
q.append(10)        # enqueue（右端加入）
q.append(20)
q.append(30)
front = q[0]        # peek O(1) → 10
val = q.popleft()   # dequeue（左端移除）O(1) → 10

# ── Deque 雙端操作 ────────────────────
dq = deque([1, 2, 3])
dq.appendleft(0)    # 頭部加入 [0,1,2,3]
dq.append(4)        # 尾部加入 [0,1,2,3,4]
dq.popleft()        # 頭部移除 → 0
dq.pop()            # 尾部移除 → 4

# ── BFS 模板（最短路徑）──────────────
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    level = 0
    while queue:
        for _ in range(len(queue)):   # 逐層處理
            node = queue.popleft()
            print(f"Level {level}: {node}")
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        level += 1

# ── 滑動視窗最大值（單調雙端佇列）────
def max_sliding_window(nums, k):
    dq = deque()   # 儲存 index，保持遞減
    result = []
    for i, v in enumerate(nums):
        # 移除不在視窗內的元素
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # 移除比當前值小的元素（維持遞減）
        while dq and nums[dq[-1]] < v:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
  interview:{
    howAsked:[
      'BFS 最短路徑：迷宮、圖的最短距離、層序遍歷',
      '滑動視窗最大值（Sliding Window Maximum）：單調雙端佇列',
      '設計題：循環佇列、LRU Cache、任務排程',
      '樹的層序遍歷（Level Order Traversal）',
    ],
    patterns:[
      'BFS 層序：用 len(queue) 固定當層大小，逐層處理',
      '單調 Deque：解滑動視窗最值問題，維護遞增/遞減',
      '0-1 BFS：邊權只有 0 或 1 時，用 deque 代替優先佇列',
    ],
    watchOut:[
      '用 deque 而非 list，避免 popleft() O(n) 的效能問題',
      'BFS 必須標記 visited，否則可能無限迴圈',
      '滑動視窗 deque 中儲存 index 而非值，方便判斷是否超出視窗',
    ]
  },
  variations:[
    {name:'單調雙端佇列', desc:'維護遞增/遞減的 deque，O(n) 解決滑動視窗最值問題。', ex:'Sliding Window Maximum (#239)'},
    {name:'循環佇列', desc:'用固定大小陣列實現佇列，取模運算處理環形邊界。', ex:'Design Circular Queue (#622)'},
    {name:'優先佇列/堆積', desc:'每次取出優先級最高的元素，Python 用 heapq。', ex:'見 Heap 章節'},
    {name:'0-1 BFS', desc:'邊權為 0 或 1 時，用 deque 替代優先佇列，更快。', ex:'Minimum Cost to Make Array Equal (#2499)'},
  ],
  quiz:[
    {q:'佇列（Queue）的核心特性是？',
     opts:['LIFO','FIFO','隨機存取','優先級排序'], ans:1,
     exp:'Queue 是 FIFO（First In First Out），最早加入的元素最先被移除。Stack 才是 LIFO。'},
    {q:'Python 中用 list 的 pop(0) 模擬 dequeue，時間複雜度是？',
     opts:['O(1)','O(log n)','O(n)','O(n²)'], ans:2,
     exp:'list 的 pop(0) 需要把後方所有元素左移，是 O(n)。應使用 collections.deque 的 popleft()，它是 O(1)。'},
    {q:'BFS 為什麼能保證找到最短路徑（無權圖）？',
     opts:['因為它用 stack','因為它按距離從近到遠展開','因為它訪問所有節點','因為它用遞迴'], ans:1,
     exp:'BFS 用 Queue 確保「距離為 1 的節點」先於「距離為 2 的節點」被處理，因此第一次到達目標節點時的路徑必然最短。'},
    {q:'滑動視窗最大值用單調 Deque，Deque 中維護的是？',
     opts:['所有元素的值','遞增的 index','遞減的 index（對應的值遞減）','堆積結構'], ans:2,
     exp:'Deque 保持 index 序列，使對應值遞減。頭端 index 對應的值即是當前視窗最大值。加入新元素前，先從尾端移除所有值比它小的 index。'},
    {q:'BFS 層序遍歷時，用 for _ in range(len(queue)) 的目的是？',
     opts:['防止無限迴圈','固定當前層的節點數，確保逐層處理','提升效率','方便計數'], ans:1,
     exp:'在內層 for 迴圈開始時，len(queue) 就是當前層的節點數。用這個長度控制迴圈，確保只處理同一層的節點，之後再進入下一層。'},
  ],
  leetcode:[
    {no:232, title:'Implement Queue using Stacks',    diff:'Easy',   url:'https://leetcode.com/problems/implement-queue-using-stacks/',    note:'理解 Stack vs Queue 互相模擬'},
    {no:933, title:'Number of Recent Calls',          diff:'Easy',   url:'https://leetcode.com/problems/number-of-recent-calls/',          note:'Queue 基本操作'},
    {no:622, title:'Design Circular Queue',           diff:'Medium', url:'https://leetcode.com/problems/design-circular-queue/',           note:'取模運算實現循環'},
    {no:102, title:'Binary Tree Level Order Traversal',diff:'Medium',url:'https://leetcode.com/problems/binary-tree-level-order-traversal/',note:'BFS 層序遍歷標準模板'},
    {no:200, title:'Number of Islands',               diff:'Medium', url:'https://leetcode.com/problems/number-of-islands/',               note:'BFS/DFS 二選一，經典島嶼題'},
    {no:542, title:'01 Matrix',                       diff:'Medium', url:'https://leetcode.com/problems/01-matrix/',                       note:'多源 BFS，所有 0 同時出發'},
    {no:994, title:'Rotting Oranges',                 diff:'Medium', url:'https://leetcode.com/problems/rotting-oranges/',                 note:'多源 BFS 模板'},
    {no:207, title:'Course Schedule',                 diff:'Medium', url:'https://leetcode.com/problems/course-schedule/',                 note:'拓撲排序（BFS Kahn\'s）'},
    {no:239, title:'Sliding Window Maximum',          diff:'Hard',   url:'https://leetcode.com/problems/sliding-window-maximum/',          note:'單調 Deque 必刷 Hard'},
    {no:127, title:'Word Ladder',                     diff:'Hard',   url:'https://leetcode.com/problems/word-ladder/',                     note:'BFS 最短路徑，字串圖'},
  ],
  refs:[
    {title:'LeetCode Explore — Queue & Stack', url:'https://leetcode.com/explore/learn/card/queue-stack/'},
    {title:'Visualgo — Queue', url:'https://visualgo.net/en/list'},
    {title:'單調佇列詳解', url:'https://labuladong.online/algo/data-structure/monotonic-queue/'},
  ]
},
{
  id:'hash-table', title:'雜湊表', titleEn:'Hash Table', category:'ds', icon:'#️⃣', difficulty:'intermediate',
  concept:{
    summary:'雜湊表（Hash Table）透過雜湊函數（Hash Function）將鍵（key）映射到陣列的特定位置（bucket），達到接近 O(1) 的存取、插入、刪除。',
    analogy:'像圖書館的索引卡片——你要找「Python 程式設計」這本書，不用一本一本掃，直接查索引卡找到對應的書架編號。雜湊函數就是計算書架編號的規則。',
    properties:[
      '雜湊函數：將任意 key 轉換成陣列 index（bucket）',
      '碰撞處理：鏈結法（Chaining）或開放定址法（Open Addressing）',
      '負載因子（Load Factor）：元素數 / 桶數，影響效能',
      '平均 O(1) 存取/插入/刪除；最壞 O(n)（全碰撞）',
      'Python dict/set 都是雜湊表，key 必須是 hashable（不可變）',
    ],
    viz:`key="apple"  →  hash("apple") % 7  =  3
key="cat"    →  hash("cat")   % 7  =  6
key="dog"    →  hash("dog")   % 7  =  3  ← 碰撞！

Bucket 0: []
Bucket 1: []
Bucket 2: []
Bucket 3: [("apple", 5), ("dog", 3)]  ← 鏈結法處理碰撞
Bucket 4: []
Bucket 5: []
Bucket 6: [("cat", "meow")]

碰撞處理 — 鏈結法（Python dict 採用）：
同一個 bucket 用 linked list 串接所有碰撞的 key-value 對`
  },
  complexity:[
    {op:'Access/Search（存取/搜尋）', time:'O(1) avg', cls:'o1', space:'O(1)'},
    {op:'Insert（插入）',             time:'O(1) avg', cls:'o1', space:'O(1)'},
    {op:'Delete（刪除）',             time:'O(1) avg', cls:'o1', space:'O(1)'},
    {op:'Worst case（全碰撞）',       time:'O(n)',     cls:'on', space:'O(n)'},
  ],
  complexityNote:'Python dict 使用開放定址法，負載因子超過 2/3 時自動擴容（rehash）',
  space:'O(n)',
  code:`# Python dict 和 set 都是雜湊表
# ── dict 基本操作 ────────────────────
d = {}
d['apple'] = 5         # 插入/更新 O(1)
val = d.get('apple', 0)# 安全讀取（附預設值）
del d['apple']         # 刪除 O(1)
'apple' in d           # 查詢 key O(1)

# ── set 基本操作 ─────────────────────
s = set()
s.add(10)              # O(1)
s.remove(10)           # O(1)，不存在時 raise KeyError
s.discard(10)          # O(1)，不存在不報錯
10 in s                # O(1) 查詢

# ── Counter（頻次計數）───────────────
from collections import Counter
freq = Counter([1,2,2,3,3,3])
# Counter({3:3, 2:2, 1:1})
print(freq.most_common(2))  # [(3,3),(2,2)]

# ── defaultdict ──────────────────────
from collections import defaultdict
graph = defaultdict(list)  # 預設值為空 list
graph['A'].append('B')     # 不需預先初始化

# ── Two Sum（O(n) 解法）──────────────
def two_sum(nums, target):
    seen = {}   # {value: index}
    for i, v in enumerate(nums):
        complement = target - v
        if complement in seen:
            return [seen[complement], i]
        seen[v] = i
    return []

# ── 群組同字母異序詞 ──────────────────
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # 排序後作為 key
        groups[key].append(s)
    return list(groups.values())

# ── 最長連續序列 O(n) ─────────────────
def longest_consecutive(nums):
    num_set = set(nums)
    best = 0
    for n in num_set:
        if n - 1 not in num_set:   # 只從序列起點開始
            cur, length = n, 1
            while cur + 1 in num_set:
                cur += 1; length += 1
            best = max(best, length)
    return best`,
  interview:{
    howAsked:[
      'Two Sum / k-Sum：用 HashMap 記錄已見過的數，O(n) 解',
      '群組問題：Group Anagrams、按頻率分群',
      '頻次統計：Top K Frequent、找眾數',
      '子陣列和：Subarray Sum Equals K（前綴和 + HashMap）',
      '去重複與存在查詢：Contains Duplicate、Longest Consecutive',
    ],
    patterns:[
      '補數查找：target - current 是否存在，Two Sum 模板',
      '排序特徵作為 key：同字母異序詞分組，sorted(s) 作 key',
      '前綴和 + HashMap：O(n) 計算子陣列和等於 K 的個數',
      'Sliding Window + HashMap：最長無重複子字串',
    ],
    watchOut:[
      'Python 中 list 不可作為 dict key（unhashable），用 tuple',
      'defaultdict vs dict.get：defaultdict 在第一次存取時自動建立預設值',
      '雜湊碰撞最壞 O(n)，實際中幾乎不發生（競賽中有 hack 題）',
      'OrderedDict 保持插入順序（Python 3.7+ dict 也已保序）',
    ]
  },
  variations:[
    {name:'前綴和 + HashMap', desc:'prefix_sum 作為 key，O(n) 找「子陣列和等於 K」的次數。', ex:'Subarray Sum Equals K (#560), Continuous Subarray Sum (#523)'},
    {name:'Sliding Window + Set/Map', desc:'維護視窗內的 HashMap 統計頻次，解最長/最短子字串問題。', ex:'Longest Substring Without Repeating Characters (#3)'},
    {name:'雙向 HashMap', desc:'同時維護 key→value 和 value→key，支援 O(1) 雙向查詢。', ex:'Two Sum III (#170), Isomorphic Strings (#205)'},
    {name:'LRU / LFU Cache', desc:'HashMap + Doubly Linked List，O(1) 完成所有操作。', ex:'LRU Cache (#146), LFU Cache (#460)'},
  ],
  quiz:[
    {q:'雜湊表平均查詢時間複雜度為 O(1) 的原因？',
     opts:['使用二分搜尋','雜湊函數直接計算位置，無需比較','元素已排序','使用樹狀結構'], ans:1,
     exp:'雜湊函數將 key 映射到陣列索引，直接存取對應位置，平均不需要比較其他元素，故 O(1)。'},
    {q:'Python 中哪個物件不能作為 dict 的 key？',
     opts:['int','string','tuple','list'], ans:3,
     exp:'dict 的 key 必須是 hashable（可雜湊的）。list 是可變物件（mutable），不能被雜湊，使用會拋出 TypeError。'},
    {q:'用雜湊表解 Two Sum，時間複雜度從 O(n²) 降到 O(n) 的關鍵是？',
     opts:['排序輸入','用 seen[target-v] 直接查詢補數，O(1)','雙指針','二分搜尋'], ans:1,
     exp:'每次遍歷時，用 O(1) 查詢 target-v 是否在 HashMap 中，整體 O(n)。而暴力雙層迴圈是 O(n²)。'},
    {q:'Counter([1,2,2,3,3,3]).most_common(2) 回傳？',
     opts:['[1, 2]','[(3,3),(2,2)]','[(3,2,1)]','{3:3, 2:2}'], ans:1,
     exp:'most_common(k) 回傳前 k 個最高頻次的 (元素, 次數) tuple 串列。結果是 [(3,3),(2,2)]。'},
    {q:'Subarray Sum Equals K 為什麼需要 seen = {0: 1} 初始化？',
     opts:['防止除以零','處理子陣列從 index 0 開始的情況','避免 Key Error','提升效率'], ans:1,
     exp:'prefix_sum - k == 0 時表示子陣列從 index 0 開始。若不初始化 {0:1}，這種情況會被漏掉。'},
  ],
  leetcode:[
    {no:1,   title:'Two Sum',                         diff:'Easy',   url:'https://leetcode.com/problems/two-sum/',                              note:'HashMap 補數查找，入門必刷'},
    {no:217, title:'Contains Duplicate',              diff:'Easy',   url:'https://leetcode.com/problems/contains-duplicate/',                   note:'set O(n) 去重'},
    {no:242, title:'Valid Anagram',                   diff:'Easy',   url:'https://leetcode.com/problems/valid-anagram/',                        note:'Counter 計頻次'},
    {no:387, title:'First Unique Character in String',diff:'Easy',   url:'https://leetcode.com/problems/first-unique-character-in-a-string/',  note:'兩次遍歷 + Counter'},
    {no:49,  title:'Group Anagrams',                  diff:'Medium', url:'https://leetcode.com/problems/group-anagrams/',                       note:'sorted key + defaultdict'},
    {no:347, title:'Top K Frequent Elements',         diff:'Medium', url:'https://leetcode.com/problems/top-k-frequent-elements/',              note:'Counter + heap 或 bucket sort'},
    {no:560, title:'Subarray Sum Equals K',           diff:'Medium', url:'https://leetcode.com/problems/subarray-sum-equals-k/',               note:'前綴和 + HashMap 精典組合'},
    {no:128, title:'Longest Consecutive Sequence',    diff:'Medium', url:'https://leetcode.com/problems/longest-consecutive-sequence/',         note:'set + 只從起點出發，O(n)'},
    {no:3,   title:'Longest Substring Without Repeating Characters', diff:'Medium', url:'https://leetcode.com/problems/longest-substring-without-repeating-characters/', note:'滑動視窗 + HashMap'},
    {no:76,  title:'Minimum Window Substring',        diff:'Hard',   url:'https://leetcode.com/problems/minimum-window-substring/',             note:'滑動視窗 Hard，HashMap 計數'},
  ],
  refs:[
    {title:'Python dict 實作原理', url:'https://realpython.com/python-dicts/'},
    {title:'Hash Table Visualgo',  url:'https://visualgo.net/en/hashtable'},
    {title:'NeetCode HashMap 系列', url:'https://neetcode.io/practice'},
  ]
},
];
