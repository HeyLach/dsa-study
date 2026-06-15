// Data Structures Part 2: Tree, Heap, Graph, Trie
const DS_TOPICS_2 = [
{
  id:'tree', title:'二元樹 / BST', titleEn:'Binary Tree / BST', category:'ds', icon:'🌳', difficulty:'intermediate',
  concept:{
    summary:'二元樹（Binary Tree）是每個節點最多有兩個子節點（左/右）的樹狀結構。二元搜尋樹（BST）額外保證：左子樹所有值 < 根值 < 右子樹所有值。',
    analogy:'二元樹像家譜——每個人（節點）最多有兩個孩子（左右子節點）。BST 像字典——按字母序排列，往左走值更小、往右走值更大，讓你能快速找到任何單字。',
    properties:[
      '節點（Node）：含 val、left、right 三個屬性',
      '根（Root）：最頂端的節點，無父節點',
      '葉（Leaf）：左右子節點皆為 None 的節點',
      'BST 特性：中序遍歷（Inorder）結果為遞增排序',
      '平衡 BST（如 AVL、Red-Black Tree）搜尋 O(log n)；退化鏈時 O(n)',
      '樹高 h：最佳 O(log n)，最壞 O(n)',
    ],
    viz:`二元樹（Binary Tree）：
          1         ← 根 Root
         / \\
        2   3
       / \\    \\
      4   5    6   ← 葉 Leaf

BST（二元搜尋樹）：
          8
         / \\
        3   10
       / \\    \\
      1   6    14
         / \\   /
        4   7  13

BST 中序遍歷（Inorder: L→Root→R）→ [1,3,4,6,7,8,10,13,14] ← 遞增！`
  },
  complexity:[
    {op:'BST Search（搜尋）',  time:'O(h)',    cls:'ologn', space:'O(h)'},
    {op:'BST Insert（插入）',  time:'O(h)',    cls:'ologn', space:'O(h)'},
    {op:'BST Delete（刪除）',  time:'O(h)',    cls:'ologn', space:'O(h)'},
    {op:'BFS/DFS 遍歷',        time:'O(n)',    cls:'on',    space:'O(n)'},
    {op:'平衡 BST（AVL 等）',  time:'O(log n)',cls:'ologn', space:'O(log n)'},
  ],
  complexityNote:'h = 樹高，平衡時 h = O(log n)，退化（skewed）時 h = O(n)',
  space:'O(n)',
  code:`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# ── 四種遍歷 ─────────────────────────
def inorder(root):    # 中序：左→根→右（BST 遞增）
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

def preorder(root):   # 前序：根→左→右（序列化樹）
    return [root.val] + preorder(root.left) + preorder(root.right) if root else []

def postorder(root):  # 後序：左→右→根（刪除樹）
    return postorder(root.left) + postorder(root.right) + [root.val] if root else []

def level_order(root):   # 層序：BFS
    from collections import deque
    if not root: return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res

# ── 最大深度 ─────────────────────────
def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# ── 驗證 BST ─────────────────────────
def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if not (lo < root.val < hi): return False
    return (is_valid_bst(root.left,  lo, root.val) and
            is_valid_bst(root.right, root.val, hi))

# ── 最低公共祖先 LCA ─────────────────
def lca(root, p, q):
    if not root or root == p or root == q:
        return root
    left  = lca(root.left,  p, q)
    right = lca(root.right, p, q)
    return root if left and right else left or right

# ── 二元樹最大路徑和 ─────────────────
def max_path_sum(root):
    res = [float('-inf')]
    def dfs(node):
        if not node: return 0
        l = max(dfs(node.left),  0)  # 負貢獻不取
        r = max(dfs(node.right), 0)
        res[0] = max(res[0], node.val + l + r)
        return node.val + max(l, r)  # 向上只能選一側
    dfs(root)
    return res[0]`,
  interview:{
    howAsked:[
      '遞迴 DFS：大量樹問題可用「根 → 左 → 右」模板',
      'BST 性質題：驗證、搜尋、插入、刪除、找第 K 小',
      'LCA（最低公共祖先）：路由、組織架構類問題',
      '樹的序列化與反序列化：OA 設計題常見',
      '樹的直徑、路徑和、平衡判斷',
    ],
    patterns:[
      '後序 DFS + 全域變數：需要同時用左右子樹資訊更新答案',
      '傳遞邊界值：驗證 BST 傳 [min, max] 範圍',
      'BFS 層序：需要按層處理、找最短路徑',
      '中序遍歷 BST = 排序結果，可驗證 BST 或找第 K 小',
    ],
    watchOut:[
      '遞迴時 root=None 的 base case 不能漏',
      'BST 刪除有三種情況：葉節點、一個子節點、兩個子節點',
      '路徑和問題：向上傳遞只能選左或右，但更新答案時可左+根+右',
      '樹高 vs 深度：有些題用 depth（從根往下），有些用 height（從葉往上）',
    ]
  },
  variations:[
    {name:'後序 DFS 收集資訊', desc:'先算左右子樹，再結合根節點更新答案。路徑和、直徑、平衡判斷都用此模式。', ex:'Binary Tree Maximum Path Sum (#124), Diameter (#543)'},
    {name:'BST 中序遍歷', desc:'BST 中序 = 有序序列，可 O(n) 解決第 K 小、驗證 BST 等問題。', ex:'Kth Smallest in BST (#230), Validate BST (#98)'},
    {name:'序列化/反序列化', desc:'前序遍歷 + None 標記可唯一重建樹。', ex:'Serialize and Deserialize Binary Tree (#297)'},
    {name:'從遍歷序列重建', desc:'給前序+中序（或後序+中序），重建唯一二元樹。', ex:'Construct Binary Tree (#105, #106)'},
  ],
  quiz:[
    {q:'BST 的中序遍歷（Inorder）結果特性？',
     opts:['遞減排序','遞增排序','隨機順序','與輸入相同'], ans:1,
     exp:'BST 保證左子樹 < 根 < 右子樹。中序遍歷（左→根→右）按照從小到大的順序訪問，結果為遞增排序。'},
    {q:'max_depth(root) 的遞迴公式是？',
     opts:['max(left, right)','1 + max(left_depth, right_depth)','left_depth + right_depth','min(left, right) + 1'], ans:1,
     exp:'當前節點的高度 = 1（自身）+ max(左子樹高度, 右子樹高度)。base case：root=None 時回傳 0。'},
    {q:'二元樹「最大路徑和」的 DFS，向上傳遞時為什麼只回傳一側？',
     opts:['減少計算量','從父節點看，子樹只能選左或右延伸路徑','左側一定比右側大','避免重複計算'], ans:1,
     exp:'「路徑」必須是連續的。一個節點向父節點延伸時，只能選擇左或右其中一條路，否則會形成分叉（不構成合法路徑）。'},
    {q:'尋找最低公共祖先（LCA），root == p 或 root == q 時直接回傳 root，為什麼正確？',
     opts:['效能優化','p 或 q 本身可以是另一個的祖先，這種情況 LCA 就是較高的那個','BST 特性','避免重複訪問'], ans:1,
     exp:'若 p 是 q 的祖先（或反之），那麼 LCA 就是 p（或 q）。當遞迴遇到其中一個時，直接回傳，不需繼續往下搜尋。'},
    {q:'驗證 BST，傳遞 (lo, hi) 邊界的目的是？',
     opts:['記錄路徑','確保每個節點值都在其所有祖先節點決定的合法範圍內','提升效率','避免無限遞迴'], ans:1,
     exp:'僅比較父子關係不夠。例如根的右子樹的左節點，必須同時 > 根值（上界）且 < 直接父節點值（下界）。傳遞 (lo, hi) 確保整棵子樹都在合法範圍。'},
  ],
  leetcode:[
    {no:104, title:'Maximum Depth of Binary Tree',     diff:'Easy',   url:'https://leetcode.com/problems/maximum-depth-of-binary-tree/',     note:'遞迴 DFS 基礎題'},
    {no:226, title:'Invert Binary Tree',               diff:'Easy',   url:'https://leetcode.com/problems/invert-binary-tree/',               note:'遞迴翻轉，直覺練習'},
    {no:101, title:'Symmetric Tree',                   diff:'Easy',   url:'https://leetcode.com/problems/symmetric-tree/',                   note:'雙指針遞迴'},
    {no:112, title:'Path Sum',                         diff:'Easy',   url:'https://leetcode.com/problems/path-sum/',                         note:'DFS 路徑追蹤'},
    {no:102, title:'Binary Tree Level Order Traversal',diff:'Medium', url:'https://leetcode.com/problems/binary-tree-level-order-traversal/',note:'BFS 層序標準模板'},
    {no:98,  title:'Validate Binary Search Tree',      diff:'Medium', url:'https://leetcode.com/problems/validate-binary-search-tree/',      note:'傳遞 min/max 邊界'},
    {no:236, title:'Lowest Common Ancestor of BT',     diff:'Medium', url:'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', note:'LCA 高頻面試題'},
    {no:105, title:'Construct Binary Tree from Preorder and Inorder', diff:'Medium', url:'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', note:'重建樹的思路'},
    {no:543, title:'Diameter of Binary Tree',          diff:'Easy',   url:'https://leetcode.com/problems/diameter-of-binary-tree/',          note:'後序 DFS，更新全域最大'},
    {no:124, title:'Binary Tree Maximum Path Sum',     diff:'Hard',   url:'https://leetcode.com/problems/binary-tree-maximum-path-sum/',     note:'後序 DFS Hard 名題'},
  ],
  refs:[
    {title:'NeetCode — Trees 解題影片', url:'https://neetcode.io/practice'},
    {title:'Visualgo — BST 視覺化',     url:'https://visualgo.net/en/bst'},
    {title:'LeetCode Explore — Trees',  url:'https://leetcode.com/explore/learn/card/data-structure-tree/'},
  ]
},
{
  id:'heap', title:'堆積 / 優先佇列', titleEn:'Heap / Priority Queue', category:'ds', icon:'⛰️', difficulty:'intermediate',
  concept:{
    summary:'堆積（Heap）是一種完全二元樹，Min-Heap 保證父節點 ≤ 子節點（根是最小值），Max-Heap 相反。支援 O(log n) 插入/刪除，O(1) 取得最小/最大值，是優先佇列（Priority Queue）的最常見實作。',
    analogy:'像急診室分診——不管何時來，最緊急（優先級最高）的病患永遠最先被處理。不是先到先得（Queue），而是最緊急先到（Priority Queue）。',
    properties:[
      'Min-Heap：根節點是最小值，每個父節點 ≤ 子節點',
      'Max-Heap：根節點是最大值，每個父節點 ≥ 子節點',
      '完全二元樹，用陣列實作：parent(i)=(i-1)//2, left=2i+1, right=2i+2',
      'Python heapq 模組：預設 Min-Heap，Max-Heap 用負值模擬',
      'Push/Pop 後透過 heapify-up/down 維持堆性質，O(log n)',
    ],
    viz:`Min-Heap（陣列表示）：
          1         ← 根 = 最小值
         / \\
        3   2
       / \\ / \\
      7  4 5  6

Array: [1, 3, 2, 7, 4, 5, 6]
         0  1  2  3  4  5  6
parent(3) = (3-1)//2 = 1  → 值 3 ✓ (3 ≤ 7)

Pop 最小值（1）後的 heapify-down：
把最後元素（6）移到根 → [6,3,2,7,4,5]
與較小子節點交換直到符合堆性質 → [2,3,6,7,4,5]`
  },
  complexity:[
    {op:'Get Min/Max（取最值）',  time:'O(1)',    cls:'o1',    space:'O(1)'},
    {op:'Push（插入）',           time:'O(log n)',cls:'ologn', space:'O(1)'},
    {op:'Pop（移除最值）',        time:'O(log n)',cls:'ologn', space:'O(1)'},
    {op:'Heapify（建堆）',        time:'O(n)',    cls:'on',    space:'O(1)'},
    {op:'Search',                 time:'O(n)',    cls:'on',    space:'O(1)'},
  ],
  complexityNote:'heapq.heapify() 線性時間建堆（而非 n 次 push 的 O(n log n)）',
  space:'O(n)',
  code:`import heapq

# ── Min-Heap 基本操作 ─────────────────
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
print(heap[0])           # 查看最小值 O(1) → 1
min_val = heapq.heappop(heap)  # 取出最小值 O(log n)

# ── 從 list 建堆 O(n) ─────────────────
nums = [3, 1, 4, 1, 5, 9]
heapq.heapify(nums)       # 原地建堆
print(heapq.heappop(nums))# → 1

# ── Max-Heap：用負值模擬 ─────────────
max_heap = []
for v in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -v)
max_val = -heapq.heappop(max_heap)  # → 5

# ── Top K 最大元素 ────────────────────
def top_k(nums, k):
    # 法1：排序 O(n log n)
    # 法2：Min-Heap 維護 k 個最大值 O(n log k)
    heap = []
    for v in nums:
        heapq.heappush(heap, v)
        if len(heap) > k:
            heapq.heappop(heap)   # 踢掉最小的
    return list(heap)

# ── 第 K 大元素 ───────────────────────
def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]  # O(n log k)

# ── 合併 K 個有序串列 ─────────────────
def merge_k_sorted(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    result = []
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][j+1], i, j+1))
    return result

# ── Find Median from Data Stream ──────
class MedianFinder:
    def __init__(self):
        self.lo = []   # Max-Heap（較小的一半，存負值）
        self.hi = []   # Min-Heap（較大的一半）
    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo) > len(self.hi): return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`,
  interview:{
    howAsked:[
      'Top K 問題：K 個最大/最小/最頻繁元素，Min-Heap 維護大小為 K 的視窗',
      '合併 K 個有序串列：每個 list 頭部進 heap，逐一取最小',
      '動態中位數：用兩個 heap（大根堆 + 小根堆）維護左右兩半',
      '任務排程：按截止時間或處理時間優先',
      'Dijkstra 最短路徑、Prim MST 都用優先佇列',
    ],
    patterns:[
      'K 個最大值用 size-K Min-Heap：pop 掉比最小值小的，保留 K 個最大',
      '雙 Heap 維護中位數：lo（max-heap）和 hi（min-heap）大小差不超過 1',
      '合併有序序列：heap 存 (值, 列表編號, 列表內索引) 的 tuple',
    ],
    watchOut:[
      'Python heapq 是 Min-Heap，Max-Heap 要儲存負值',
      'heap 中 tuple 比較按第一個元素排序；若第一個相同則比第二個（需確保可比較）',
      'heapq.heapify() 是 O(n)，n 次 push 是 O(n log n)，建大堆用 heapify',
      '不能 O(1) 更新 heap 中某個元素（需 pop+push 或用 lazy deletion）',
    ]
  },
  variations:[
    {name:'Top K 元素', desc:'Min-Heap 維護大小為 K 的窗口，最終 heap 中就是 K 個最大值。', ex:'Top K Frequent Elements (#347), Kth Largest (#215)'},
    {name:'雙 Heap 中位數', desc:'左半用 Max-Heap，右半用 Min-Heap，保持大小平衡。', ex:'Find Median from Data Stream (#295)'},
    {name:'排程/貪婪', desc:'按優先級（截止時間、利潤）決定處理順序。', ex:'Task Scheduler (#621), IPO (#502)'},
    {name:'圖演算法', desc:'Dijkstra 最短路徑、Prim MST 都依賴 Min-Heap/Priority Queue。', ex:'Network Delay Time (#743), Min Cost to Connect (#1584)'},
  ],
  quiz:[
    {q:'Min-Heap 中，哪個位置保存最小值？',
     opts:['最後一個元素','第一個元素（根）','中間元素','隨機位置'], ans:1,
     exp:'Min-Heap 保證根節點（index 0，陣列第一個元素）是整個堆中最小的值，O(1) 存取。'},
    {q:'Python heapq 預設是哪種堆？如何模擬 Max-Heap？',
     opts:['Max-Heap，無需模擬','Min-Heap，push 時存負值','Max-Heap，push 時存負值','Min-Heap，無法模擬 Max-Heap'], ans:1,
     exp:'Python heapq 是 Min-Heap。模擬 Max-Heap 的方法：push 時存入負值，pop 時取出再取負。'},
    {q:'找「前 K 個最大元素」，用 Min-Heap 的原因是？',
     opts:['Min-Heap 更快','維護一個大小為 K 的 Min-Heap，確保比堆頂小的值被淘汰，最後剩下 K 個最大值','Max-Heap 無法解此題','節省記憶體'], ans:1,
     exp:'用 Min-Heap 保留 K 個元素，每次新元素進來：若比堆頂（K 個中最小）大，就 pop 堆頂、push 新值。最終 heap 中留下的就是 K 個最大值。'},
    {q:'heapq.heapify(lst) 的時間複雜度？',
     opts:['O(1)','O(log n)','O(n)','O(n log n)'], ans:2,
     exp:'heapify 使用 Floyd 演算法，從最後一個非葉節點往上 sift-down，時間複雜度 O(n)，比 n 次 push 的 O(n log n) 更快。'},
    {q:'雙 Heap 維護動態中位數：lo（max-heap）和 hi（min-heap）的大小關係應保持？',
     opts:['lo 永遠比 hi 大 1','|lo| - |hi| ≤ 1，且 lo 的最大值 ≤ hi 的最小值','兩者大小相等','hi 永遠比 lo 大 1'], ans:1,
     exp:'兩個 heap 大小差不超過 1，且 lo（較小的一半）最大值 ≤ hi（較大的一半）最小值。中位數取決於總數是奇數還是偶數。'},
  ],
  leetcode:[
    {no:703,  title:'Kth Largest Element in a Stream', diff:'Easy',   url:'https://leetcode.com/problems/kth-largest-element-in-a-stream/',  note:'Min-Heap 維護大小 K'},
    {no:1046, title:'Last Stone Weight',               diff:'Easy',   url:'https://leetcode.com/problems/last-stone-weight/',                note:'Max-Heap 模擬'},
    {no:215,  title:'Kth Largest Element in an Array', diff:'Medium', url:'https://leetcode.com/problems/kth-largest-element-in-an-array/', note:'heap 或 quickselect'},
    {no:347,  title:'Top K Frequent Elements',         diff:'Medium', url:'https://leetcode.com/problems/top-k-frequent-elements/',          note:'Counter + heap'},
    {no:621,  title:'Task Scheduler',                  diff:'Medium', url:'https://leetcode.com/problems/task-scheduler/',                   note:'貪婪 + Max-Heap'},
    {no:973,  title:'K Closest Points to Origin',      diff:'Medium', url:'https://leetcode.com/problems/k-closest-points-to-origin/',      note:'Max-Heap 保留 K 個最近'},
    {no:295,  title:'Find Median from Data Stream',    diff:'Hard',   url:'https://leetcode.com/problems/find-median-from-data-stream/',     note:'雙 Heap 中位數，設計題精典'},
    {no:378,  title:'Kth Smallest Element in Sorted Matrix', diff:'Medium', url:'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', note:'heap 多路合併'},
    {no:23,   title:'Merge k Sorted Lists',            diff:'Hard',   url:'https://leetcode.com/problems/merge-k-sorted-lists/',             note:'heap 合併 K 有序串列'},
    {no:502,  title:'IPO',                             diff:'Hard',   url:'https://leetcode.com/problems/ipo/',                              note:'雙 Heap 貪婪排程'},
  ],
  refs:[
    {title:'Heap 視覺化 — Visualgo',    url:'https://visualgo.net/en/heap'},
    {title:'Python heapq 官方文件',     url:'https://docs.python.org/3/library/heapq.html'},
    {title:'NeetCode — Heap / Priority Queue', url:'https://neetcode.io/practice'},
  ]
},
{
  id:'graph', title:'圖', titleEn:'Graph', category:'ds', icon:'🕸️', difficulty:'advanced',
  concept:{
    summary:'圖（Graph）由頂點（Vertex/Node）和邊（Edge）組成，能表示任意關係網絡。分有向圖（Directed）和無向圖（Undirected），邊可帶權重（Weighted）。',
    analogy:'就像社交網路——每個人是節點，「追蹤」關係是有向邊，「好友」關係是無向邊。地圖的城市和道路也是圖，道路距離就是邊的權重。',
    properties:[
      '鄰接串列（Adjacency List）：空間 O(V+E)，稀疏圖首選',
      '鄰接矩陣（Adjacency Matrix）：空間 O(V²)，O(1) 查詢兩點是否相連',
      '有向 vs 無向；有權 vs 無權',
      '環（Cycle）偵測：有向圖用 DFS 著色，無向圖用 Union-Find 或 DFS',
      'BFS：最短路徑（無權）；Dijkstra：最短路徑（有權正邊）',
      '拓撲排序（Topological Sort）：有向無環圖（DAG）的任務排序',
    ],
    viz:`無向圖：          有向圖（DAG）：
  A -- B            A → B → D
  |  \\ |            ↓       ↑
  C -- D            C ────→─┘

鄰接串列（Adjacency List）：
{A: [B, C], B: [A, D], C: [A, D], D: [B, C]}

拓撲排序（課程依賴）：
0→1, 0→2, 1→3, 2→3
合法學習順序: [0, 1, 2, 3] 或 [0, 2, 1, 3]`
  },
  complexity:[
    {op:'BFS/DFS 遍歷',           time:'O(V+E)',    cls:'on', space:'O(V)'},
    {op:'Dijkstra（堆積優化）',   time:'O(E log V)',cls:'onlogn',space:'O(V)'},
    {op:'Topological Sort（BFS）', time:'O(V+E)',   cls:'on', space:'O(V)'},
    {op:'Union-Find（路徑壓縮）', time:'O(α(n))≈O(1)',cls:'o1',space:'O(V)'},
    {op:'Bellman-Ford（負邊）',   time:'O(VE)',     cls:'on2',space:'O(V)'},
  ],
  complexityNote:'V = 頂點數，E = 邊數。α 是反阿克曼函數，實際上接近 O(1)',
  space:'O(V+E)',
  code:`from collections import defaultdict, deque

# ── 建圖（鄰接串列）─────────────────
graph = defaultdict(list)
edges = [[0,1],[0,2],[1,3],[2,3]]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)   # 無向圖雙向加邊

# ── BFS（最短路徑，無權圖）───────────
def bfs(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == end: return path
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb)
                queue.append((nb, path + [nb]))
    return []

# ── DFS（找連通分量）────────────────
def dfs(graph, node, visited):
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited:
            dfs(graph, nb, visited)

def count_components(n, edges):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v); graph[v].append(u)
    visited, count = set(), 0
    for node in range(n):
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count

# ── 拓撲排序（BFS Kahn's 演算法）─────
def topo_sort(n, prerequisites):
    in_degree = [0] * n
    graph = defaultdict(list)
    for u, v in prerequisites:   # v → u（v 是 u 的先修）
        graph[v].append(u)
        in_degree[u] += 1
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nb in graph[node]:
            in_degree[nb] -= 1
            if in_degree[nb] == 0:
                queue.append(nb)
    return order if len(order) == n else []  # 長度 < n 表示有環

# ── Union-Find（並查集）──────────────
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # 路徑壓縮
        return self.parent[x]
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False   # 已在同一集合（有環）
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        return True`,
  interview:{
    howAsked:[
      '島嶼問題：DFS/BFS 找連通分量，Number of Islands 系列',
      '課程排程：拓撲排序，偵測有向圖的環',
      '最短路徑：無權用 BFS，有權正邊用 Dijkstra',
      '判斷二分圖（Bipartite）：BFS 染色，兩色不能相鄰',
      'Union-Find：動態連通性、Minimum Spanning Tree（Kruskal）',
    ],
    patterns:[
      'BFS 多源：所有起點同時加入 queue，求到最近來源的距離',
      '拓撲排序 = in-degree 為 0 的節點依序處理',
      'DFS 三色標記：白/灰/黑，偵測有向圖的環',
      'Union-Find：find 加路徑壓縮，union 加 rank，幾乎 O(1)',
    ],
    watchOut:[
      '一定要標記 visited，否則 BFS/DFS 可能無限迴圈',
      '有向圖和無向圖的建圖不同（單向/雙向加邊）',
      '拓撲排序不存在的情況 = 有環（len(order) < n）',
      'Dijkstra 不適用負邊，負邊用 Bellman-Ford',
    ]
  },
  variations:[
    {name:'多源 BFS', desc:'所有起點同時放入 queue，求每個節點到最近起點的距離。', ex:'01 Matrix (#542), Rotting Oranges (#994)'},
    {name:'拓撲排序', desc:'偵測 DAG 的排序，也能判斷是否有環。BFS Kahn\'s 或 DFS 後序。', ex:'Course Schedule (#207, #210)'},
    {name:'Union-Find 並查集', desc:'動態維護連通分量，接近 O(1) 合併/查詢。', ex:'Number of Connected Components (#323), Accounts Merge (#721)'},
    {name:'Dijkstra 最短路徑', desc:'帶權有向圖（正邊），Priority Queue 貪婪擴展。', ex:'Network Delay Time (#743), Cheapest Flights (#787)'},
  ],
  quiz:[
    {q:'BFS 和 DFS 在「找最短路徑（無權圖）」上的差別？',
     opts:['DFS 更快','BFS 保證最短，DFS 不保證','兩者等價','取決於圖的形狀'], ans:1,
     exp:'BFS 按距離由近到遠擴展，第一次到達目的地時的路徑必是最短。DFS 可能先探索一條很長的路徑，不保證最短。'},
    {q:'拓撲排序完成後，若 order 長度 < n，代表？',
     opts:['圖不連通','圖中存在環（無法拓撲排序）','有孤立節點','邊太多'], ans:1,
     exp:'拓撲排序只對 DAG（有向無環圖）有效。若有環，有些節點的 in-degree 永遠不會降到 0，不會被加入 order，因此 len(order) < n。'},
    {q:'Union-Find 的「路徑壓縮」（Path Compression）目的是？',
     opts:['減少記憶體使用','讓 find 操作更快（壓平樹）','支援撤銷操作','偵測環'], ans:1,
     exp:'路徑壓縮讓 find(x) 遞迴時，沿途所有節點直接指向根，使樹幾乎扁平，後續 find 操作接近 O(1)。'},
    {q:'Dijkstra 演算法為何不適用負邊？',
     opts:['程式碼複雜','貪婪策略假設已探索的最短路徑不會因後來的邊而變短，但負邊可以','記憶體不夠','不支援有向圖'], ans:1,
     exp:'Dijkstra 是貪婪演算法，一旦節點被標記為「已確定最短路徑」就不再更新。負邊可能讓「已確定」的路徑透過負邊變得更短，違反貪婪假設。'},
    {q:'Number of Islands 問題，DFS 的遞迴做什麼？',
     opts:['計算島嶼面積','將已訪問的陸地標記為 0（海），避免重複計算','找最短路徑','排序節點'], ans:1,
     exp:'遇到 \'1\'（陸地）時，執行 DFS 把整座島嶼的所有格子改為 \'0\'，表示已訪問。外層迴圈每次找到 \'1\' 就是一座新島嶼，count 加一。'},
  ],
  leetcode:[
    {no:200,  title:'Number of Islands',              diff:'Medium', url:'https://leetcode.com/problems/number-of-islands/',              note:'DFS/BFS 連通分量，必刷'},
    {no:133,  title:'Clone Graph',                    diff:'Medium', url:'https://leetcode.com/problems/clone-graph/',                    note:'DFS + HashMap 圖的複製'},
    {no:207,  title:'Course Schedule',                diff:'Medium', url:'https://leetcode.com/problems/course-schedule/',                note:'拓撲排序偵測環'},
    {no:210,  title:'Course Schedule II',             diff:'Medium', url:'https://leetcode.com/problems/course-schedule-ii/',             note:'拓撲排序回傳順序'},
    {no:323,  title:'Number of Connected Components', diff:'Medium', url:'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', note:'Union-Find 或 DFS'},
    {no:417,  title:'Pacific Atlantic Water Flow',    diff:'Medium', url:'https://leetcode.com/problems/pacific-atlantic-water-flow/',    note:'多源 DFS/BFS，反向思考'},
    {no:695,  title:'Max Area of Island',             diff:'Medium', url:'https://leetcode.com/problems/max-area-of-island/',             note:'DFS 計算連通分量大小'},
    {no:743,  title:'Network Delay Time',             diff:'Medium', url:'https://leetcode.com/problems/network-delay-time/',             note:'Dijkstra 最短路徑模板'},
    {no:127,  title:'Word Ladder',                    diff:'Hard',   url:'https://leetcode.com/problems/word-ladder/',                    note:'BFS 最短路徑，隱式圖'},
    {no:1192, title:'Critical Connections in Network',diff:'Hard',   url:'https://leetcode.com/problems/critical-connections-in-a-network/', note:'Tarjan 橋算法'},
  ],
  refs:[
    {title:'NeetCode — Graph 解題影片',    url:'https://neetcode.io/practice'},
    {title:'Visualgo — 圖演算法視覺化',   url:'https://visualgo.net/en/graphds'},
    {title:'CP-algorithms — Graph Theory', url:'https://cp-algorithms.com/graph/'},
  ]
},
{
  id:'trie', title:'前綴樹', titleEn:'Trie', category:'ds', icon:'🌿', difficulty:'advanced',
  concept:{
    summary:'前綴樹（Trie，又稱字典樹）是專為字串設計的樹狀結構，每個節點代表一個字元。從根到某節點的路徑構成一個字串前綴，支援高效的前綴搜尋和字串插入。',
    analogy:'像手機鍵盤的自動補全——你輸入「ca」，手機能列出「cat」、「car」、「card」…這正是 Trie 的功能。所有「ca」開頭的單字共用同一條前綴路徑，不浪費空間重複儲存。',
    properties:[
      '每個節點最多 26 個子節點（英文小寫字母）',
      '從根到標記了 is_end=True 的節點，路徑代表一個完整單字',
      'Insert/Search/StartsWith 時間複雜度 O(L)，L = 字串長度',
      '空間：最壞 O(alphabet_size × L × N)，N 為單字數',
      '優勢：O(L) 前綴搜尋；劣勢：空間使用大',
    ],
    viz:`插入 "cat", "car", "card", "apple" 後：

        root
       /    \\
      a      c
      |      |
      p      a
      |     / \\
      p    t   r
      |    *   | \\
      l        *  d
      |            *
      e
      *

* = is_end = True（完整單字）
查詢前綴 "car" → 路徑 root→c→a→r，存在！
查詢單字 "car" → 路徑 root→c→a→r，is_end=True → 是單字！`
  },
  complexity:[
    {op:'Insert（插入）',      time:'O(L)', cls:'on', space:'O(L)'},
    {op:'Search（搜尋單字）',  time:'O(L)', cls:'on', space:'O(1)'},
    {op:'StartsWith（前綴）',  time:'O(L)', cls:'on', space:'O(1)'},
    {op:'Delete（刪除）',      time:'O(L)', cls:'on', space:'O(1)'},
  ],
  complexityNote:'L = 字串長度；Trie 的優勢是前綴搜尋，比 HashSet 多一個「所有前綴單字」的能力',
  space:'O(N×L×Σ)',
  code:`class TrieNode:
    def __init__(self):
        self.children = {}   # char → TrieNode
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end   # 必須是完整單字

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True   # 只要前綴存在即可

# ── 支援萬用字元 '.' 的搜尋 ──────────
def search_with_dot(root, word):
    def dfs(node, i):
        if i == len(word): return node.is_end
        ch = word[i]
        if ch == '.':
            return any(dfs(child, i+1) for child in node.children.values())
        if ch not in node.children:
            return False
        return dfs(node.children[ch], i+1)
    return dfs(root, 0)

# ── 找最長公共前綴 ────────────────────
def longest_common_prefix(strs):
    trie = Trie()
    for s in strs:
        trie.insert(s)
    # 從根往下走，直到分叉或 is_end
    node, prefix = trie.root, []
    while len(node.children) == 1 and not node.is_end:
        ch = next(iter(node.children))
        prefix.append(ch)
        node = node.children[ch]
    return ''.join(prefix)`,
  interview:{
    howAsked:[
      '實作 Trie（Insert/Search/StartsWith）：設計題首選',
      '萬用字元匹配：. 可代表任意字元，DFS + Trie',
      '搜尋自動補全（Search Suggestions）：前綴 → 列出所有單字',
      '單字替換（Replace Words）：Trie 快速找最短前綴',
      'Word Search II：在矩陣中找 Trie 裡的所有單字（DFS + Trie 剪枝）',
    ],
    patterns:[
      '用 dict 而非固定大小陣列存 children，更靈活',
      '萬用字元/模式匹配：DFS + 遞迴，遇 \'.\' 嘗試所有子節點',
      'Word Search II：把所有單字建入 Trie，DFS 矩陣時實時查詢，在 Trie 中剪枝',
    ],
    watchOut:[
      'search() 最後要確認 is_end=True，不能只確認節點存在',
      'starts_with() 不需要 is_end，只要路徑存在即可',
      '刪除單字時要注意不能刪除共用前綴的節點',
      '空間可能很大，有時 CompressedTrie/Radix Tree 更優',
    ]
  },
  variations:[
    {name:'萬用字元搜尋', desc:'\'.\' 可代表任意字元，在搜尋時對所有子節點遞迴 DFS。', ex:'Design Add and Search Words Data Structure (#211)'},
    {name:'自動補全', desc:'找前綴後，BFS/DFS 收集所有以此前綴開頭的單字（按字母序）。', ex:'Search Suggestions System (#1268)'},
    {name:'Word Search II', desc:'把所有目標單字建入 Trie，DFS 矩陣時與 Trie 同步搜尋，找到即刪節點剪枝。', ex:'Word Search II (#212)'},
    {name:'XOR Trie（位元 Trie）', desc:'儲存整數的二進位表示，O(32) 查詢最大 XOR 值。', ex:'Maximum XOR of Two Numbers in an Array (#421)'},
  ],
  quiz:[
    {q:'Trie 中 search("cat") 和 startsWith("cat") 的差別？',
     opts:['沒有差別','search 需要 is_end=True，startsWith 只需路徑存在','startsWith 更慢','search 不需要遍歷所有字元'], ans:1,
     exp:'search 要確認到達最後一個字元的節點時 is_end=True（是完整單字）。startsWith 只要路徑存在即可，不管是否是完整單字。'},
    {q:'Trie 相比 HashSet 的最大優勢是？',
     opts:['更省記憶體','O(1) 搜尋','高效前綴搜尋：可列出所有以某前綴開頭的單字','插入更快'], ans:2,
     exp:'HashSet 的 in 操作是 O(L)，Trie 的 search 也是 O(L)，速度相近。但 Trie 能高效處理前綴查詢（startsWith、autocomplete），這是 HashSet 做不到的。'},
    {q:'實作支援 \'.\' 萬用字元的 search，遇到 \'.\' 時應該？',
     opts:['回傳 True','跳過這個字元','遞迴嘗試所有子節點','回傳 False'], ans:2,
     exp:'\'.\'可代表任意字元，所以需要對當前節點的所有子節點都嘗試遞迴搜尋，只要任一條路徑成功即回傳 True。'},
    {q:'在 Word Search II 中，Trie 的作用是？',
     opts:['排序單字','DFS 矩陣時快速確認當前路徑是否是目標單字前綴，提前剪枝','儲存矩陣','計算最短路徑'], ans:1,
     exp:'把所有目標單字建入 Trie，DFS 矩陣時同步在 Trie 中走。若當前路徑不是任何目標單字的前綴，立即停止（剪枝）。找到完整單字則記錄並移除，避免重複加入。'},
    {q:'Trie 插入 n 個平均長度 L 的單字，空間複雜度？',
     opts:['O(n)','O(L)','O(n×L)（最壞）','O(n²)'], ans:2,
     exp:'最壞情況下（所有單字無公共前綴），每個單字佔 L 個節點，n 個單字共 O(n×L) 個節點。若有大量共用前綴，實際空間遠小於此。'},
  ],
  leetcode:[
    {no:208,  title:'Implement Trie (Prefix Tree)',         diff:'Medium', url:'https://leetcode.com/problems/implement-trie-prefix-tree/',         note:'Trie 最基礎實作，必寫'},
    {no:211,  title:'Design Add and Search Words Data Structure', diff:'Medium', url:'https://leetcode.com/problems/design-add-and-search-words-data-structure/', note:'萬用字元 . 的 DFS'},
    {no:648,  title:'Replace Words',                        diff:'Medium', url:'https://leetcode.com/problems/replace-words/',                       note:'Trie 找最短前綴替換'},
    {no:1268, title:'Search Suggestions System',            diff:'Medium', url:'https://leetcode.com/problems/search-suggestions-system/',           note:'前綴搜尋 + 排序'},
    {no:14,   title:'Longest Common Prefix',                diff:'Easy',   url:'https://leetcode.com/problems/longest-common-prefix/',               note:'Trie 或直接水平掃描'},
    {no:677,  title:'Map Sum Pairs',                        diff:'Medium', url:'https://leetcode.com/problems/map-sum-pairs/',                       note:'Trie 節點存 val，前綴求和'},
    {no:212,  title:'Word Search II',                       diff:'Hard',   url:'https://leetcode.com/problems/word-search-ii/',                      note:'Trie + DFS 矩陣，剪枝'},
    {no:336,  title:'Palindrome Pairs',                     diff:'Hard',   url:'https://leetcode.com/problems/palindrome-pairs/',                    note:'Trie + 迴文判斷，Hard'},
    {no:421,  title:'Maximum XOR of Two Numbers',           diff:'Medium', url:'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', note:'二進位 XOR Trie'},
    {no:745,  title:'Prefix and Suffix Search',             diff:'Hard',   url:'https://leetcode.com/problems/prefix-and-suffix-search/',            note:'雙向 Trie 設計題'},
  ],
  refs:[
    {title:'Trie 視覺化 — Visualgo',          url:'https://visualgo.net/en/suffixtree'},
    {title:'NeetCode — Tries 解題',           url:'https://neetcode.io/practice'},
    {title:'LeetCode Explore — Trie',         url:'https://leetcode.com/explore/learn/card/trie/'},
  ]
},
];
