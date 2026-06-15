// Algorithms Part 2: Greedy, Backtracking, Two Pointers, Sliding Window
const ALGO_TOPICS_2 = [
{
  id:'greedy', title:'貪婪演算法', titleEn:'Greedy Algorithm', category:'algo', icon:'🤑', difficulty:'intermediate',
  concept:{
    summary:'貪婪演算法在每個步驟都選擇當下最優的選項，期望局部最優能帶來全局最優。不是所有問題都能用貪婪解，必須能證明「不會後悔」——當前的選擇不會因後來的選擇而變差。',
    analogy:'像哈利波特在三岔路口選一條路——不回頭，每次選看起來最近的出口。貪婪的風險：眼前的路可能繞遠。成功的關鍵：問題結構保證「局部最優 = 全局最優」。',
    properties:[
      '貪婪選擇性（Greedy Choice Property）：局部最優選擇能導向全局最優',
      '最優子結構（Optimal Substructure）：問題的最優解包含子問題的最優解',
      '通常需要先排序，讓貪婪選擇有意義的順序',
      '不能用貪婪時，改用 DP（DP 考慮所有可能，貪婪只取一種）',
      '常見：區間排程、任務排程、霍夫曼編碼、最小生成樹',
    ],
    viz:`例：區間排程（最多不重疊區間數）
區間：[1,3], [2,4], [3,5], [4,6]

貪婪策略：按結束時間排序，每次選結束最早且不與已選衝突的
排序後：[1,3], [2,4], [3,5], [4,6]
選 [1,3] → 選 [3,5] → [4,6] 衝突，跳過
結果：2 個不重疊區間 ✓

反例：跳躍遊戲 [2,3,1,1,4]
從 index 0（值 2）→ 可到 1 或 2
每次選最遠：0→2→3→4 ✓ (貪婪有效)

失效例：[3,2,1,0,4]（貪婪無效，需 DP）`
  },
  complexity:[
    {op:'排序（常見前置步驟）',  time:'O(n log n)', cls:'onlogn', space:'O(1)'},
    {op:'貪婪遍歷',              time:'O(n)',        cls:'on',     space:'O(1)'},
    {op:'總體（含排序）',        time:'O(n log n)', cls:'onlogn', space:'O(1)'},
  ],
  complexityNote:'貪婪本身通常 O(n)，但常需 O(n log n) 排序',
  space:'O(1)（通常）',
  code:`# ── 跳躍遊戲 Jump Game ────────────────
def can_jump(nums):
    max_reach = 0
    for i, v in enumerate(nums):
        if i > max_reach: return False   # 已無法到達 i
        max_reach = max(max_reach, i + v)
    return True

# ── 跳躍遊戲 II（最少跳次）───────────
def jump(nums):
    jumps = cur_end = cur_far = 0
    for i in range(len(nums) - 1):
        cur_far = max(cur_far, i + nums[i])
        if i == cur_end:          # 到達當前可達邊界
            jumps += 1
            cur_end = cur_far     # 擴展到最遠
    return jumps

# ── 區間排程（最多不重疊）────────────
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])   # 按結束時間排序
    count, prev_end = 0, float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            count += 1    # 需移除這個區間（與前一個衝突）
    return count

# ── 加油站 Gas Station ────────────────
def can_complete_circuit(gas, cost):
    total, tank, start = 0, 0, 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank  += diff
        if tank < 0:      # 從 start 出發無法到達 i+1
            start = i + 1
            tank = 0
    return start if total >= 0 else -1

# ── 分配餅乾 Assign Cookies ───────────
def find_content_children(g, s):
    g.sort(); s.sort()
    child = cookie = 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:   # 餅乾能滿足孩子
            child += 1
        cookie += 1   # 無論如何都用掉這塊餅乾
    return child`,
  interview:{
    howAsked:[
      '區間問題：合併區間、最少會議室、最多不重疊區間',
      '跳躍問題：Jump Game 系列（I: 能否到達、II: 最少跳次）',
      '任務排程：Task Scheduler、IPO（資本最大化）',
      '分配問題：Assign Cookies、Candy 分糖',
      '加油站：Gas Station（環形路線）',
    ],
    patterns:[
      '排序後貪婪：先排序，再用一次遍歷貪婪選擇',
      '維護「目前可達最遠」：Jump Game 模板',
      '「按終點排序」解區間調度：選終點最早的不衝突區間',
      '兩次遍歷（正向+反向）：Candy、Trapping Rain Water',
    ],
    watchOut:[
      '必須能證明貪婪選擇性，不能憑直覺用貪婪',
      '排序的 key 決定一切，選錯 key 答案錯誤',
      '貪婪無效時考慮 DP（如 0/1 背包、Edit Distance）',
    ]
  },
  variations:[
    {name:'區間排程', desc:'按結束時間排序，貪婪選取不重疊的最多區間。', ex:'Non-overlapping Intervals (#435), Meeting Rooms II (#253)'},
    {name:'跳躍遊戲', desc:'維護 max_reach，或維護當前層邊界做 BFS 式跳躍。', ex:'Jump Game (#55), Jump Game II (#45)'},
    {name:'分配/公平', desc:'按大小排序，對應分配（大配大、小配小）。', ex:'Assign Cookies (#455), Candy (#135)'},
    {name:'霍夫曼編碼', desc:'頻率最小的兩個字元合併，優先佇列實現。', ex:'Minimum Cost to Connect Sticks (#1167)'},
  ],
  quiz:[
    {q:'貪婪演算法和動態規劃的根本差別是？',
     opts:['時間複雜度不同','貪婪每步選局部最優（不回頭）；DP 考慮所有可能性再取最優','貪婪只能解圖問題','DP 不需要最優子結構'], ans:1,
     exp:'貪婪做出的選擇是「當下看起來最好的」，之後不會改變（不回頭）。DP 則是考慮所有子問題的最優解，再組合成全局最優解，保證正確但通常更慢。'},
    {q:'Jump Game II（最少跳次），貪婪策略是？',
     opts:['每次跳最少格','每次跳最多格','在當前可達範圍內，選能讓下次到達最遠的起跳點','用 BFS 層序遍歷'], ans:2,
     exp:'「層」= 當前跳可到達的所有格子。在這一層中，找到能讓下一跳到達最遠的格子。當走到當前層的末尾時，跳數 +1，進入下一層。這等效於 BFS 的層數。'},
    {q:'區間排程問題，為什麼按「結束時間」而非「開始時間」排序？',
     opts:['開始時間也可以','按結束時間貪婪，讓每次選完後剩餘時間最多，能容納更多後續區間','結束時間計算更簡單','按長度排序更好'], ans:1,
     exp:'選結束最早的有效區間，能讓「剩餘可用時間」最大化，從而能容納更多不重疊的後續區間。這是可以被數學證明的貪婪選擇性。'},
    {q:'Gas Station 問題，當 tank < 0 時，把 start 設為 i+1 的理由是？',
     opts:['優化速度','從任何位置出發，到達 i 時 tank < 0，說明從 [start..i] 任一點出發都不能到達 i+1','i 是最佳起點','i+1 一定有足夠油'], ans:1,
     exp:'如果從 start 出發到 i 時油箱虧空，那麼從 [start, i] 之間任何一個點出發，油箱只會更少（前幾站的補充沒了）。所以最有希望的下一個起點是 i+1。'},
    {q:'貪婪演算法解 0/1 背包問題（每個物品最多選一次）有效嗎？',
     opts:['有效，按性價比排序即可','無效，必須用 DP','取決於物品數量','取決於背包容量'], ans:1,
     exp:'0/1 背包貪婪無效。反例：容量 10，物品 [重 6 值 7, 重 5 值 5, 重 5 值 5]。按性價比貪婪選重 6 的（性價比最高），剩 4 容量什麼都放不下，總值 7。但選兩個重 5 的總值 10 更好。'},
  ],
  leetcode:[
    {no:455, title:'Assign Cookies',           diff:'Easy',   url:'https://leetcode.com/problems/assign-cookies/',           note:'排序後雙指針，貪婪入門'},
    {no:860, title:'Lemonade Change',          diff:'Easy',   url:'https://leetcode.com/problems/lemonade-change/',          note:'貪婪找零'},
    {no:55,  title:'Jump Game',                diff:'Medium', url:'https://leetcode.com/problems/jump-game/',                note:'維護 max_reach'},
    {no:45,  title:'Jump Game II',             diff:'Medium', url:'https://leetcode.com/problems/jump-game-ii/',             note:'貪婪跳層，BFS 思維'},
    {no:134, title:'Gas Station',              diff:'Medium', url:'https://leetcode.com/problems/gas-station/',              note:'環形問題，貪婪找起點'},
    {no:435, title:'Non-overlapping Intervals',diff:'Medium', url:'https://leetcode.com/problems/non-overlapping-intervals/',note:'按結束時間排序，必刷'},
    {no:621, title:'Task Scheduler',           diff:'Medium', url:'https://leetcode.com/problems/task-scheduler/',           note:'最高頻任務決定下限'},
    {no:763, title:'Partition Labels',         diff:'Medium', url:'https://leetcode.com/problems/partition-labels/',         note:'記錄每個字元最後出現位置'},
    {no:135, title:'Candy',                    diff:'Hard',   url:'https://leetcode.com/problems/candy/',                    note:'兩次貪婪掃描（左→右，右→左）'},
    {no:402, title:'Remove K Digits',          diff:'Medium', url:'https://leetcode.com/problems/remove-k-digits/',          note:'單調堆疊 + 貪婪'},
  ],
  refs:[
    {title:'Greedy Algorithm 介紹 — GFG', url:'https://www.geeksforgeeks.org/greedy-algorithms/'},
    {title:'NeetCode — Greedy 解題',      url:'https://neetcode.io/practice'},
    {title:'活動選擇問題詳解',             url:'https://en.wikipedia.org/wiki/Activity_selection_problem'},
  ]
},
{
  id:'backtracking', title:'回溯法', titleEn:'Backtracking', category:'algo', icon:'🔄', difficulty:'advanced',
  concept:{
    summary:'回溯法是 DFS 的延伸，在遞迴探索所有可能的「決策樹」時，一旦發現當前路徑不可能得到有效解，就「剪枝」（Prune）並回退到上一步，試探其他選擇。',
    analogy:'像解 Sudoku——在格子填入數字，若違反規則就擦掉（回溯），試下一個數字。如果所有數字都不行，就回到上一格重新選擇。回溯 = 有系統地嘗試所有可能，不重複不遺漏。',
    properties:[
      '本質是 DFS + 剪枝：遞迴建立決策樹，剪去不可能的分支',
      '通用框架：選擇 → 遞迴 → 撤銷選擇（三部曲）',
      '適合問題：全排列、全子集、組合和、括號生成、N-Queens',
      '時間複雜度通常是指數級（但剪枝大幅降低實際執行時間）',
      '與 DP 的差別：回溯枚舉所有解；DP 找最優解',
    ],
    viz:`全排列 [1,2,3] 的決策樹：
                []
          /      |      \\
        [1]     [2]     [3]
       /   \\   /   \\   /   \\
     [1,2] [1,3]...
      |       |
   [1,2,3] [1,3,2]  ← 葉節點 = 一個完整排列

每次：選一個數字 → 遞迴 → 撤銷（回溯）
剪枝：數字已在 path 中 → 跳過`
  },
  complexity:[
    {op:'全排列（Permutations）',     time:'O(n × n!)', cls:'on2', space:'O(n)'},
    {op:'全子集（Subsets）',          time:'O(2^n)',    cls:'on2', space:'O(n)'},
    {op:'組合和（Combination Sum）',  time:'O(2^n)',    cls:'on2', space:'O(n)'},
    {op:'N-Queens',                   time:'O(n!)',     cls:'on2', space:'O(n)'},
  ],
  complexityNote:'回溯通常是指數級，但良好的剪枝可大幅縮短實際時間',
  space:'O(n)（遞迴深度/path 長度）',
  code:`# ── 通用回溯模板 ─────────────────────
def backtrack(candidates, path, start, result, **kwargs):
    if 滿足結束條件:
        result.append(path[:])   # 記錄結果（注意複製！）
        return
    for i in range(start, len(candidates)):
        if 剪枝條件: continue
        path.append(candidates[i])   # 選擇
        backtrack(candidates, path, 下一個start, result)
        path.pop()                   # 撤銷選擇

# ── 1. 全排列 Permutations ────────────
def permute(nums):
    result, used = [], [False] * len(nums)
    def bt(path):
        if len(path) == len(nums):
            result.append(path[:]); return
        for i in range(len(nums)):
            if used[i]: continue
            used[i] = True
            path.append(nums[i])
            bt(path)
            path.pop()
            used[i] = False
    bt([])
    return result

# ── 2. 組合和 Combination Sum ─────────
def combination_sum(candidates, target):
    result = []
    candidates.sort()
    def bt(start, path, remain):
        if remain == 0:
            result.append(path[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > remain: break  # 剪枝
            path.append(candidates[i])
            bt(i, path, remain - candidates[i])  # i 可重複用
            path.pop()
    bt(0, [], target)
    return result

# ── 3. 括號生成 Generate Parentheses ──
def generate_parenthesis(n):
    result = []
    def bt(path, open_cnt, close_cnt):
        if len(path) == 2 * n:
            result.append(''.join(path)); return
        if open_cnt < n:
            path.append('(')
            bt(path, open_cnt+1, close_cnt)
            path.pop()
        if close_cnt < open_cnt:
            path.append(')')
            bt(path, open_cnt, close_cnt+1)
            path.pop()
    bt([], 0, 0)
    return result

# ── 4. 全子集 Subsets ─────────────────
def subsets(nums):
    result = []
    def bt(start, path):
        result.append(path[:])   # 每個節點都是一個子集
        for i in range(start, len(nums)):
            path.append(nums[i])
            bt(i+1, path)
            path.pop()
    bt(0, [])
    return result`,
  interview:{
    howAsked:[
      '全排列（含/不含重複元素）：used 陣列或排序去重',
      '全子集/組合：start 指針避免重複，排序後剪枝',
      '括號生成：限制條件剪枝（open≤n, close≤open）',
      'N-Queens / Sudoku Solver：約束條件剪枝',
      '矩陣中找單字（Word Search）：DFS + 回溯標記已訪問',
    ],
    patterns:[
      '三部曲：選擇 → 遞迴 → 撤銷，每次遞迴後復原狀態',
      '去重：含重複元素時，先排序，相鄰重複跳過（i>start && nums[i]==nums[i-1]）',
      '剪枝提前終止：累積和超過 target、矩陣越界等',
      'path 複製：result.append(path[:]) 而非 result.append(path)',
    ],
    watchOut:[
      'result.append(path) 加的是引用，後續修改會影響！要用 path[:]',
      '回溯一定要撤銷所有「選擇」的副作用（pop、visited[i]=False）',
      '去重排列比去重組合難：需要額外處理「相同數字不能在同位置被選兩次」',
    ]
  },
  variations:[
    {name:'去重排列/組合', desc:'輸入有重複元素時，排序後跳過 i>start 且 nums[i]==nums[i-1] 的元素。', ex:'Permutations II (#47), Combination Sum II (#40)'},
    {name:'矩陣 DFS 回溯', desc:'在矩陣 DFS 時標記已訪問（grid[r][c]=\'#\'），遞迴後還原。', ex:'Word Search (#79), Path with Maximum Gold (#1219)'},
    {name:'約束滿足問題', desc:'每步選擇要滿足所有約束，剪枝大幅縮短時間。', ex:'N-Queens (#51), Sudoku Solver (#37)'},
    {name:'分割問題', desc:'決定字串/陣列的分割點，每段需滿足條件。', ex:'Palindrome Partitioning (#131), Restore IP Addresses (#93)'},
  ],
  quiz:[
    {q:'回溯法的「三部曲」是？',
     opts:['BFS → DFS → 剪枝','選擇 → 遞迴 → 撤銷選擇','排序 → 搜尋 → 儲存','初始化 → 遞迴 → 返回'], ans:1,
     exp:'回溯的核心操作：(1) 選擇：把當前候選加入 path；(2) 遞迴：進入下一層決策；(3) 撤銷：遞迴返回後，把選擇從 path 移除，恢復狀態，讓迴圈試下一個候選。'},
    {q:'result.append(path) 和 result.append(path[:]) 的差別？',
     opts:['沒有差別','前者加入引用（後續修改會影響）；後者加入複製','前者更快','path[:] 會排序'], ans:1,
     exp:'Python 中 list 是可變物件，append(path) 加的是 path 的引用。後續 path.pop() 會改變已加入 result 的那份資料！必須用 path[:] 或 path.copy() 加入一份當前快照。'},
    {q:'全子集問題，每個遞迴層的 start 為什麼要從 i+1 開始？',
     opts:['避免選到自己','確保子集中元素不重複且保持順序（不回頭選更小 index 的元素）','提升速度','記憶體限制'], ans:1,
     exp:'子集不需要順序，但為了避免重複（如 [1,2] 和 [2,1] 是同一子集），每次遞迴只從 i+1 往後選。這樣保證每個子集的元素 index 嚴格遞增，自動去重。'},
    {q:'含重複元素的全排列去重，為什麼需要先排序？',
     opts:['提升速度','讓相同的元素相鄰，便於跳過 nums[i]==nums[i-1] 的重複選擇','減少記憶體','排序後可二元搜尋'], ans:1,
     exp:'排序後，相同的數字相鄰。跳過條件：i>0 && nums[i]==nums[i-1] && !used[i-1]——表示同一個數字在當前遞迴層已被試過，跳過相同的，避免產生重複排列。'},
    {q:'N-Queens 中，「同一列不能有兩個皇后」如何在回溯中實現？',
     opts:['每次隨機選列','每個遞迴層代表一列，只在當前列放置一個皇后','用 visited 陣列','只放在對角線上'], ans:1,
     exp:'N-Queens 的決策樹每層代表一列（row）。遞迴到第 r 列時，嘗試將皇后放在 r 列的每一欄（col）。因為每層只放一個，同一列不可能出現兩個皇后。同欄和對角線的衝突需要另外檢查。'},
  ],
  leetcode:[
    {no:46,  title:'Permutations',              diff:'Medium', url:'https://leetcode.com/problems/permutations/',              note:'回溯模板，used 陣列'},
    {no:78,  title:'Subsets',                   diff:'Medium', url:'https://leetcode.com/problems/subsets/',                   note:'全子集，start 指針'},
    {no:39,  title:'Combination Sum',           diff:'Medium', url:'https://leetcode.com/problems/combination-sum/',           note:'可重複選，剪枝'},
    {no:22,  title:'Generate Parentheses',      diff:'Medium', url:'https://leetcode.com/problems/generate-parentheses/',      note:'括號生成，限制條件剪枝'},
    {no:79,  title:'Word Search',               diff:'Medium', url:'https://leetcode.com/problems/word-search/',               note:'矩陣 DFS 回溯，標記再還原'},
    {no:131, title:'Palindrome Partitioning',   diff:'Medium', url:'https://leetcode.com/problems/palindrome-partitioning/',   note:'分割回文子字串'},
    {no:40,  title:'Combination Sum II',        diff:'Medium', url:'https://leetcode.com/problems/combination-sum-ii/',        note:'去重：排序後跳過相鄰重複'},
    {no:47,  title:'Permutations II',           diff:'Medium', url:'https://leetcode.com/problems/permutations-ii/',           note:'含重複元素的全排列'},
    {no:51,  title:'N-Queens',                  diff:'Hard',   url:'https://leetcode.com/problems/n-queens/',                  note:'約束滿足，剪枝'},
    {no:37,  title:'Sudoku Solver',             diff:'Hard',   url:'https://leetcode.com/problems/sudoku-solver/',             note:'數獨求解，剪枝藝術'},
  ],
  refs:[
    {title:'labuladong — 回溯框架',           url:'https://labuladong.online/algo/essential-technique/backtrack-framework/'},
    {title:'NeetCode — Backtracking 解題',    url:'https://neetcode.io/practice'},
    {title:'回溯 vs DP 詳解',                 url:'https://www.geeksforgeeks.org/difference-between-backtracking-and-dynamic-programming/'},
  ]
},
{
  id:'two-pointers', title:'雙指針', titleEn:'Two Pointers', category:'algo', icon:'👆', difficulty:'intermediate',
  concept:{
    summary:'雙指針技術用兩個指針（通常從兩端或同向）遍歷陣列/字串，常能將 O(n²) 的暴力解優化成 O(n)。核心思想：兩個指針協同移動，縮小搜尋空間。',
    analogy:'像兩個人從書的兩端一起往中間翻——一個從第一頁往後，另一個從最後一頁往前。他們比較的頁面不重複，各翻 n/2 頁就能找到對稱位置，總共只翻 n 頁。',
    properties:[
      '對向雙指針：l 從左、r 從右，向中間靠攏，適合已排序陣列',
      '同向雙指針（快慢指針）：fast/slow 速度不同，適合原地修改或找中點',
      '通常要求輸入已排序（或可排序）',
      '一般只需一次遍歷 O(n)，空間 O(1)',
      '也用於鏈結串列（見鏈結串列章節）',
    ],
    viz:`對向雙指針（Two Sum II，已排序）：
arr = [1, 3, 5, 7, 9]，target = 8
      l              r
step1: 1+9=10>8  → r--
      l         r
step2: 1+7=8==8  → 找到！[0, 3]

同向雙指針（去除重複元素）：
nums = [1,1,2,3,3,4]
          w  r            w=write指針，r=read指針
保留不重複元素：
r掃描：1,1(跳過),2,3,3(跳過),4
w寫入：1,        2,3,        4
結果：[1, 2, 3, 4]，長度 4`
  },
  complexity:[
    {op:'對向雙指針（已排序）',    time:'O(n)',    cls:'on',    space:'O(1)'},
    {op:'同向雙指針（原地修改）',  time:'O(n)',    cls:'on',    space:'O(1)'},
    {op:'前置排序（如需）',        time:'O(n log n)', cls:'onlogn', space:'O(1)'},
  ],
  complexityNote:'雙指針通常把暴力 O(n²) 優化到 O(n)，是陣列/字串的必備技巧',
  space:'O(1)',
  code:`# ── 對向雙指針：Two Sum II（已排序）──
def two_sum_sorted(nums, target):
    l, r = 0, len(nums) - 1
    while l < r:
        s = nums[l] + nums[r]
        if   s == target: return [l+1, r+1]  # 1-indexed
        elif s < target:  l += 1
        else:             r -= 1
    return []

# ── 三數之和 3Sum ─────────────────────
def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if nums[i] > 0: break       # 剪枝
        if i > 0 and nums[i] == nums[i-1]: continue  # 去重
        l, r = i+1, len(nums)-1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                result.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l+=1  # 去重
                while l < r and nums[r] == nums[r-1]: r-=1  # 去重
                l += 1; r -= 1
            elif s < 0: l += 1
            else:       r -= 1
    return result

# ── 同向：去除重複元素（原地）─────────
def remove_duplicates(nums):
    if not nums: return 0
    w = 1   # write 指針
    for r in range(1, len(nums)):
        if nums[r] != nums[r-1]:
            nums[w] = nums[r]
            w += 1
    return w   # 不重複的元素個數

# ── 反轉字串 ──────────────────────────
def reverse_string(s):
    l, r = 0, len(s) - 1
    while l < r:
        s[l], s[r] = s[r], s[l]
        l += 1; r -= 1

# ── 驗證迴文 Valid Palindrome ─────────
def is_palindrome(s):
    s = [c.lower() for c in s if c.isalnum()]
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]: return False
        l += 1; r -= 1
    return True

# ── 有序陣列平方 Squares of Sorted Array
def sorted_squares(nums):
    n = len(nums)
    res = [0] * n
    l, r, pos = 0, n-1, n-1   # 從最大的開始填入
    while l <= r:
        if abs(nums[l]) > abs(nums[r]):
            res[pos] = nums[l]**2; l += 1
        else:
            res[pos] = nums[r]**2; r -= 1
        pos -= 1
    return res`,
  interview:{
    howAsked:[
      '兩數/三數之和：排序後對向雙指針，注意去重',
      '原地修改：remove duplicates、move zeroes（write 指針模板）',
      '迴文判斷：對向雙指針，跳過非字母數字',
      '有序陣列平方、合併有序陣列',
      '盛水最多（Container With Most Water）：雙指針貪婪移動',
    ],
    patterns:[
      '對向（Opposite Direction）：l=0, r=n-1，while l<r，依據條件移動一個',
      'write 指針（In-place Modify）：read 掃描，write 覆寫符合條件的',
      '去重技巧：排序後 i>0 && nums[i]==nums[i-1] 跳過',
      '移動哪個指針：通常移動「讓條件更容易滿足」的那個',
    ],
    watchOut:[
      '三數之和去重需要在找到答案後繼續移動指針並跳過相同值',
      '對向雙指針前提：通常需要排序',
      'write 指針從 1 開始（保留第一個元素），或從 0 開始（看題目要求）',
    ]
  },
  variations:[
    {name:'三數之和 3Sum', desc:'固定一個數，剩下兩個用對向雙指針，排序去重。', ex:'3Sum (#15), 3Sum Closest (#16)'},
    {name:'write 指針原地修改', desc:'一個 read 指針掃描，一個 write 指針覆寫符合條件的元素。', ex:'Remove Duplicates (#26), Move Zeroes (#283)'},
    {name:'有序陣列操作', desc:'對向或同向指針，利用已排序的性質加速。', ex:'Squares of Sorted Array (#977), Merge Sorted Array (#88)'},
    {name:'鏈結串列快慢指針', desc:'找中點、偵測環、找倒數第 K 個（見鏈結串列章節）', ex:'Linked List Cycle (#141), Middle of LL (#876)'},
  ],
  quiz:[
    {q:'對向雙指針（兩端向中間）的前提條件通常是？',
     opts:['陣列長度為偶數','陣列已排序（或可推導出單調性）','元素不重複','使用 set'], ans:1,
     exp:'對向雙指針移動依賴「若 sum 太小則移動左指針（值增大），若 sum 太大則移動右指針（值減小）」的邏輯，這需要陣列有序才能確定移動方向。'},
    {q:'3Sum 為什麼先排序再雙指針，而不是三層暴力迴圈？',
     opts:['排序後三層仍需 O(n³)','排序後固定一個數 O(n)，剩下兩個用雙指針 O(n)，總共 O(n²)，優於 O(n³)','排序後才能去重','為了使用 HashMap'], ans:1,
     exp:'暴力三層迴圈 O(n³)。排序後，外層固定 nums[i] 是 O(n)，內層用雙指針找 nums[l]+nums[r]==-nums[i] 是 O(n)，整體降至 O(n²)。排序也讓去重邏輯更簡單。'},
    {q:'write 指針（原地去重）的核心邏輯是？',
     opts:['用 set 去重再填回','read 掃描找到非重複元素就用 write 覆寫當前位置，write 前進','兩個指針同速前進','只移動 write 指針'], ans:1,
     exp:'write 指針是「下一個有效元素的寫入位置」。read 掃描整個陣列，遇到符合條件的元素（非重複/非零/...）就寫入 nums[write] 並讓 write 前進，最終 write 就是有效長度。'},
    {q:'Container With Most Water 雙指針，每次移動「較短那側」的指針，理由是？',
     opts:['移動較長的更快','移動較短的：因為容積由短板決定，移動較長的只會讓容積更小或不變，移動較短的才有機會增大','隨機選擇','先左後右'], ans:1,
     exp:'容積 = min(h[l], h[r]) × (r-l)。若移動較長側，min(h[l],h[r]) 不可能增大（最多持平），寬度還減小，容積只會更小或不變。移動較短側則有機會找到更長的板，增大 min，可能增大容積。'},
    {q:'有序陣列平方（Squares of Sorted Array），為什麼用對向雙指針從後往前填入結果？',
     opts:['填入更簡單','負數平方後可能比正數大。最大的平方值在兩端，從兩端比較向中間收縮，逆序填入確保結果有序','只能從後往前','避免覆蓋'], ans:1,
     exp:'有序陣列（含負數）平方後，最大值來自兩端（絕對值最大的）。對向指針比較 |nums[l]| 和 |nums[r]|，取較大者從結果陣列後面（pos）往前填，保證填入順序是從大到小，最終結果就是升序。'},
  ],
  leetcode:[
    {no:167, title:'Two Sum II - Input Array Is Sorted', diff:'Medium', url:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', note:'對向雙指針標準模板'},
    {no:125, title:'Valid Palindrome',                   diff:'Easy',   url:'https://leetcode.com/problems/valid-palindrome/',                 note:'對向雙指針 + 字元過濾'},
    {no:344, title:'Reverse String',                     diff:'Easy',   url:'https://leetcode.com/problems/reverse-string/',                  note:'最簡雙指針'},
    {no:26,  title:'Remove Duplicates from Sorted Array',diff:'Easy',   url:'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', note:'write 指針模板'},
    {no:977, title:'Squares of a Sorted Array',          diff:'Easy',   url:'https://leetcode.com/problems/squares-of-a-sorted-array/',       note:'對向從後填入'},
    {no:15,  title:'3Sum',                               diff:'Medium', url:'https://leetcode.com/problems/3sum/',                            note:'排序+雙指針+去重，必刷'},
    {no:11,  title:'Container With Most Water',          diff:'Medium', url:'https://leetcode.com/problems/container-with-most-water/',       note:'移動短板的貪婪雙指針'},
    {no:75,  title:'Sort Colors',                        diff:'Medium', url:'https://leetcode.com/problems/sort-colors/',                     note:'三指針荷蘭國旗'},
    {no:42,  title:'Trapping Rain Water',                diff:'Hard',   url:'https://leetcode.com/problems/trapping-rain-water/',             note:'對向雙指針，維護左右最大高度'},
    {no:76,  title:'Minimum Window Substring',           diff:'Hard',   url:'https://leetcode.com/problems/minimum-window-substring/',        note:'滑動視窗變形 Hard'},
  ],
  refs:[
    {title:'Two Pointers 詳解 — GFG', url:'https://www.geeksforgeeks.org/two-pointers-technique/'},
    {title:'NeetCode — Two Pointers',  url:'https://neetcode.io/practice'},
    {title:'雙指針詳解 labuladong',    url:'https://labuladong.online/algo/essential-technique/array-two-pointers-summary/'},
  ]
},
{
  id:'sliding-window', title:'滑動視窗', titleEn:'Sliding Window', category:'algo', icon:'🪟', difficulty:'intermediate',
  concept:{
    summary:'滑動視窗（Sliding Window）用兩個指針（l/r）維護一個視窗（子陣列/子字串），右端擴張找到有效視窗後，左端收縮找到最優解。可將 O(n²) 或 O(n³) 的暴力解優化至 O(n)。',
    analogy:'像在一條河流上放一個可伸縮的網——右邊持續撒網擴大捕魚範圍，當魚的種類達標（滿足條件），就從左邊縮短網子找最小的滿足網段；若還沒達標就繼續往右撒。',
    properties:[
      '固定視窗：視窗大小 k 固定，每次滑動一格（最大子陣列平均值等）',
      '可變視窗：視窗大小動態調整，找滿足條件的最長/最短子陣列',
      '右端先擴（加元素），條件不滿足時左端縮（移除元素）',
      '視窗內的統計用 HashMap 或計數器，O(1) 更新',
      '時間 O(n)：r 最多走 n 步，l 也最多走 n 步',
    ],
    viz:`最長無重複子字串 "abcabcbb"：
l=0 r=0: [a]       seen={a:0}
l=0 r=1: [a,b]     seen={a:0,b:1}
l=0 r=2: [a,b,c]   seen={a:0,b:1,c:2}  max=3
l=0 r=3: a重複！   → l 跳到 seen[a]+1=1
l=1 r=3: [b,c,a]   seen={a:3,b:1,c:2}
l=1 r=4: b重複！   → l 跳到 seen[b]+1=2
l=2 r=4: [c,a,b]   ...
最終答案：3

固定視窗（大小 k=3）滑過 [1,3,2,6,4]：
[1,3,2] → [3,2,6] → [2,6,4]  每次加右移左`
  },
  complexity:[
    {op:'固定視窗',     time:'O(n)', cls:'on', space:'O(k)'},
    {op:'可變視窗',     time:'O(n)', cls:'on', space:'O(字母集大小)'},
    {op:'單調 Deque 視窗', time:'O(n)', cls:'on', space:'O(k)'},
  ],
  complexityNote:'r 和 l 各最多走 n 步，總操作 O(n)，比暴力 O(n²) 快',
  space:'O(k) 或 O(字母集大小)',
  code:`from collections import defaultdict

# ── 固定視窗：最大子陣列平均值 ────────
def find_max_average(nums, k):
    window_sum = sum(nums[:k])
    max_avg = window_sum / k
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i-k]   # 加右端、去左端
        max_avg = max(max_avg, window_sum / k)
    return max_avg

# ── 可變視窗：最長無重複子字串 ────────
def length_of_longest_substring(s):
    seen = {}    # char → 最近出現的 index
    l = max_len = 0
    for r, ch in enumerate(s):
        if ch in seen and seen[ch] >= l:
            l = seen[ch] + 1   # 左端跳過重複字元
        seen[ch] = r
        max_len = max(max_len, r - l + 1)
    return max_len

# ── 可變視窗：最小子陣列和 >= target ──
def min_subarray_len(target, nums):
    l = window_sum = 0
    min_len = float('inf')
    for r in range(len(nums)):
        window_sum += nums[r]
        while window_sum >= target:
            min_len = min(min_len, r - l + 1)
            window_sum -= nums[l]
            l += 1
    return min_len if min_len != float('inf') else 0

# ── Minimum Window Substring ──────────
def min_window(s, t):
    need = defaultdict(int)
    for c in t: need[c] += 1
    missing = len(t)     # 還需要多少字元
    l = best_l = 0
    best_len = float('inf')
    for r, ch in enumerate(s, 1):   # r 是 exclusive 右端
        if need[ch] > 0: missing -= 1
        need[ch] -= 1
        if missing == 0:    # 視窗包含所有 t 的字元
            while need[s[l]] < 0:  # 縮左端
                need[s[l]] += 1; l += 1
            if r - l < best_len:
                best_len = r - l; best_l = l
            need[s[l]] += 1; missing += 1; l += 1
    return s[best_l:best_l+best_len] if best_len < float('inf') else ''

# ── 字串排列：Permutation in String ───
def check_inclusion(s1, s2):
    count = defaultdict(int)
    for c in s1: count[c] += 1
    window = defaultdict(int)
    l, match = 0, 0
    for r, ch in enumerate(s2):
        window[ch] += 1
        if window[ch] == count[ch]: match += 1
        if r - l + 1 > len(s1):
            if window[s2[l]] == count[s2[l]]: match -= 1
            window[s2[l]] -= 1; l += 1
        if match == len(count): return True
    return False`,
  interview:{
    howAsked:[
      '最長/最短子字串：無重複、含至多 k 個不同字元',
      '固定大小視窗：最大平均值、字串排列判斷',
      '最小視窗：包含所有目標字元的最短子字串（Hard）',
      '水果放入籃子（至多 2 種水果）、替換 K 次後最長連續字元',
      '滑動視窗最大值（Deque 題，見佇列章節）',
    ],
    patterns:[
      '固定視窗：r 超過 k 時，左端固定移一格（nums[i] - nums[i-k]）',
      '可變視窗：右端加入後，若不滿足條件，左端持續縮',
      '計數器追蹤：need/window 兩個計數器，match 計滿足的字元數',
      '「最短」：滿足條件時縮左端更新答案；「最長」：不滿足時縮左端',
    ],
    watchOut:[
      '更新 l 之前先把 s[l] 從視窗統計中移除',
      '注意何時更新答案：「找最長」在右端擴張後；「找最短」在滿足條件後縮左端時',
      'need 的字元集：若字元不在 need 中，不影響 match 計數',
    ]
  },
  variations:[
    {name:'固定大小視窗', desc:'視窗固定為 k，每步移除最左、加入最右，維護視窗統計。', ex:'Maximum Average Subarray I (#643), Permutation in String (#567)'},
    {name:'最長可變視窗', desc:'右端擴張，不滿足時左端縮，維護「最長滿足視窗」。', ex:'Longest Substring Without Repeating (#3), Longest Repeating Character Replacement (#424)'},
    {name:'最短可變視窗', desc:'滿足條件時縮左更新最小，不滿足時擴右。', ex:'Minimum Window Substring (#76), Min Size Subarray Sum (#209)'},
    {name:'單調 Deque 視窗', desc:'結合單調雙端佇列，O(n) 取得視窗最大/最小值。', ex:'Sliding Window Maximum (#239)'},
  ],
  quiz:[
    {q:'滑動視窗的時間複雜度為什麼是 O(n) 而非 O(n²)？',
     opts:['視窗大小固定為常數','r 最多走 n 步，l 最多走 n 步，總操作 2n 次，O(n)','使用了 HashMap 加速','每次只移動一格'], ans:1,
     exp:'雖然有兩層（外層 r 移動，內層 while l 縮），但 l 不會超過 r，且每個元素最多被 r 加入一次、被 l 移除一次。兩個指針的操作總次數是 2n，整體 O(n)。'},
    {q:'最長無重複子字串，為什麼可以用 seen[ch]+1 直接跳躍左端？',
     opts:['提升速度','若 ch 已出現且在視窗內，左端跳到 ch 上次位置的下一格，確保視窗內無重複','只有在視窗滿時才跳','避免重複計算'], ans:1,
     exp:'若 ch 已在視窗內（seen[ch] >= l），當前視窗不合法。左端直接跳到 seen[ch]+1（排除重複的 ch），比逐格右移 l 更高效，但同樣正確。'},
    {q:'「找最短滿足條件的子陣列」和「找最長」在視窗操作上的差別？',
     opts:['沒有差別','最短：滿足條件時縮左端更新答案；最長：不滿足時縮左端（滿足時更新答案）','最短只移動右端','最長只移動左端'], ans:1,
     exp:'找最短：右端先擴直到滿足，然後盡量縮左端，每次縮後若仍滿足就更新最短長度。找最長：若不滿足再縮左端，滿足時更新最長長度。方向相反。'},
    {q:'Minimum Window Substring 中 missing 變數的意義是？',
     opts:['視窗的總長度','still need 的字元總數（未被視窗滿足的字元數）','t 的長度','左端的 index'], ans:1,
     exp:'missing 追蹤「視窗還缺多少個字元才能包含 t 所有字元」。每加入一個 t 中需要的字元（need[ch]>0），missing--。missing==0 時視窗滿足條件。'},
    {q:'固定視窗（大小 k）的關鍵更新公式是？',
     opts:['sum = sum + nums[r]','sum = sum + nums[r] - nums[r-k]','sum = sum - nums[l]','每次重新計算'], ans:1,
     exp:'固定視窗每次右移一格：加入右端新元素 nums[r]，同時移除左端舊元素 nums[r-k]（即 nums[l]）。整個操作 O(1)，避免重新加總 O(k)。'},
  ],
  leetcode:[
    {no:643,  title:'Maximum Average Subarray I',                    diff:'Easy',   url:'https://leetcode.com/problems/maximum-average-subarray-i/',                    note:'固定視窗最基礎'},
    {no:3,    title:'Longest Substring Without Repeating Characters',diff:'Medium', url:'https://leetcode.com/problems/longest-substring-without-repeating-characters/',note:'可變視窗必刷'},
    {no:209,  title:'Minimum Size Subarray Sum',                     diff:'Medium', url:'https://leetcode.com/problems/minimum-size-subarray-sum/',                     note:'最短可變視窗'},
    {no:567,  title:'Permutation in String',                         diff:'Medium', url:'https://leetcode.com/problems/permutation-in-string/',                         note:'固定視窗 + 字頻比較'},
    {no:904,  title:'Fruit Into Baskets',                            diff:'Medium', url:'https://leetcode.com/problems/fruit-into-baskets/',                            note:'至多 2 種字元的最長視窗'},
    {no:424,  title:'Longest Repeating Character Replacement',       diff:'Medium', url:'https://leetcode.com/problems/longest-repeating-character-replacement/',       note:'替換 K 次，最長連續字元'},
    {no:438,  title:'Find All Anagrams in a String',                 diff:'Medium', url:'https://leetcode.com/problems/find-all-anagrams-in-a-string/',                 note:'固定視窗找所有位置'},
    {no:159,  title:'Longest Substring with At Most Two Distinct Characters', diff:'Medium', url:'https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/', note:'至多 k 種字元系列'},
    {no:76,   title:'Minimum Window Substring',                      diff:'Hard',   url:'https://leetcode.com/problems/minimum-window-substring/',                      note:'最短視窗 Hard，must do'},
    {no:239,  title:'Sliding Window Maximum',                        diff:'Hard',   url:'https://leetcode.com/problems/sliding-window-maximum/',                        note:'單調 Deque，Hard'},
  ],
  refs:[
    {title:'Sliding Window 詳解 — labuladong', url:'https://labuladong.online/algo/essential-technique/sliding-window-framework/'},
    {title:'NeetCode — Sliding Window',         url:'https://neetcode.io/practice'},
    {title:'Sliding Window 模板整理',            url:'https://www.geeksforgeeks.org/window-sliding-technique/'},
  ]
},
];
