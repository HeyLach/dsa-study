// Algorithms Part 1: Sorting, Binary Search, BFS/DFS, Dynamic Programming
const ALGO_TOPICS_1 = [
{
  id:'sorting', title:'排序演算法', titleEn:'Sorting Algorithms', category:'algo', icon:'🔢', difficulty:'intermediate',
  concept:{
    summary:'排序是將元素依特定順序（通常是升序/降序）重新排列的過程。不同排序演算法在時間複雜度、空間複雜度、穩定性上各有取捨，面試中常考 Merge Sort 和 Quick Sort 的原理。',
    analogy:'想像整理書架：氣泡排序像每次比較相鄰兩本書；合併排序像先把書分堆、各堆內排好、再合併；快速排序像找一本「樞紐」書，把比它輕的放左邊、重的放右邊，遞迴下去。',
    properties:[
      'Stable（穩定）：相同值的元素，排序後相對順序不變',
      'In-place（原地）：不需要 O(n) 額外空間',
      'Comparison-based（比較排序）：下界 O(n log n)；非比較排序可達 O(n)',
      'Python sorted()/list.sort() 使用 Timsort（O(n log n)，穩定）',
      'Quick Sort 平均最快（常數小），Merge Sort 保證 O(n log n) 且穩定',
    ],
    viz:`各排序複雜度比較：
演算法        最佳      平均      最壞      空間    穩定
──────────────────────────────────────────────────────
Bubble Sort   O(n)    O(n²)    O(n²)    O(1)    ✓
Selection     O(n²)   O(n²)    O(n²)    O(1)    ✗
Insertion     O(n)    O(n²)    O(n²)    O(1)    ✓
Merge Sort    O(nlogn)O(nlogn) O(nlogn) O(n)    ✓ ← 穩定且最壞O(nlogn)
Quick Sort    O(nlogn)O(nlogn) O(n²)   O(logn)  ✗ ← 平均最快
Heap Sort     O(nlogn)O(nlogn) O(nlogn) O(1)    ✗
Tim Sort      O(n)    O(nlogn) O(nlogn) O(n)    ✓ ← Python 內建`
  },
  complexity:[
    {op:'Bubble / Selection / Insertion', time:'O(n²)',    cls:'on2',    space:'O(1)'},
    {op:'Merge Sort',                     time:'O(n log n)',cls:'onlogn', space:'O(n)'},
    {op:'Quick Sort（平均）',             time:'O(n log n)',cls:'onlogn', space:'O(log n)'},
    {op:'Quick Sort（最壞）',             time:'O(n²)',    cls:'on2',    space:'O(n)'},
    {op:'Heap Sort',                      time:'O(n log n)',cls:'onlogn', space:'O(1)'},
    {op:'Counting / Radix（特殊）',       time:'O(n+k)',   cls:'on',     space:'O(n+k)'},
  ],
  complexityNote:'比較排序的下界為 O(n log n)；Counting/Radix Sort 是非比較排序，可突破此限制',
  space:'O(n) Merge / O(log n) Quick / O(1) Heap',
  code:`# ── Python 內建排序（Timsort）────────
nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.sort()             # 原地，O(n log n)
result = sorted(nums)   # 回傳新 list
# 自訂排序
pairs = [(3,'c'),(1,'a'),(2,'b')]
pairs.sort(key=lambda x: x[0])        # 按第一個元素
words = ['banana','apple','cherry']
words.sort(key=lambda x: (-len(x),x)) # 先長度降序，再字母升序

# ── Merge Sort O(n log n) 穩定 ───────
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    res = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:   # ≤ 保證穩定
            res.append(left[i]); i += 1
        else:
            res.append(right[j]); j += 1
    return res + left[i:] + right[j:]

# ── Quick Sort O(n log n) 平均 ────────
def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo >= hi: return
    pivot_idx = partition(arr, lo, hi)
    quick_sort(arr, lo, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1

# ── 荷蘭國旗（Dutch National Flag）───
# 三路分區：0,1,2 分別排到左中右
def sort_colors(nums):
    lo, mid, hi = 0, 0, len(nums) - 1
    while mid <= hi:
        if   nums[mid] == 0: nums[lo],nums[mid]=nums[mid],nums[lo]; lo+=1; mid+=1
        elif nums[mid] == 1: mid += 1
        else:                nums[mid],nums[hi]=nums[hi],nums[mid]; hi -= 1`,
  interview:{
    howAsked:[
      '原理解說：Merge Sort vs Quick Sort 差別、穩定性、最壞情況',
      '自訂排序：按多個條件排序、排序含複雜物件的陣列',
      '計數排序 / 桶排序：利用值域有限的特性 O(n)',
      '荷蘭國旗問題（三路分區）：Sort Colors (#75)',
      '部分排序：Top K 元素（Quick Select）、K Closest Points',
    ],
    patterns:[
      'Merge Sort 分治：先 divide 到底，再 conquer 合併，同時可解「逆序對數」',
      'Quick Select：找第 K 大/小，平均 O(n)，不需完整排序',
      '自訂 key：Python sort(key=...) 比自己寫比較函數清晰',
      '桶排序（Bucket Sort）：值域有限時 O(n)，如 Top K Frequent Elements',
    ],
    watchOut:[
      'Quick Sort 選 pivot 不好會退化 O(n²)，隨機選或三數取中',
      'Merge Sort 需要 O(n) 額外空間，in-place 版本複雜度較高',
      '穩定排序必要時：如先按年齡排序、再按姓名排序，保持年齡排序結果',
      'Python sort() 是原地操作，sorted() 回傳新 list',
    ]
  },
  variations:[
    {name:'Quick Select', desc:'Quick Sort 分區後只遞迴含第 K 個元素的那側，平均 O(n)。', ex:'Kth Largest Element in an Array (#215)'},
    {name:'桶排序 Bucket Sort', desc:'值域 [0, max] 時，每個值一個桶，O(n) 排序。', ex:'Top K Frequent (#347 bucket sort 解), Maximum Gap (#164)'},
    {name:'計數排序 Counting Sort', desc:'值域有限（如 0-k），計算每個值出現次數再重建。', ex:'Sort Colors (#75), Rank Transform (#1632)'},
    {name:'逆序對 Inversion Count', desc:'Merge Sort 合併時統計右側比左側小的元素個數。', ex:'Count of Smaller Numbers After Self (#315)'},
  ],
  quiz:[
    {q:'下列哪種排序演算法是穩定且最壞情況 O(n log n)？',
     opts:['Quick Sort','Heap Sort','Merge Sort','Selection Sort'], ans:2,
     exp:'Merge Sort 在所有情況下都是 O(n log n)，且是穩定排序（相同元素保持相對順序）。Quick Sort 最壞 O(n²)，Heap Sort 不穩定。'},
    {q:'Quick Sort 最壞情況 O(n²) 通常發生在？',
     opts:['陣列完全隨機','陣列已排序（選最後元素為 pivot）','所有元素相同','陣列很短'], ans:1,
     exp:'若每次都選最後元素為 pivot，且陣列已排序（升序或降序），partition 每次只能分出 0 vs n-1，退化成 O(n²)。解法：隨機選 pivot。'},
    {q:'Python list.sort() 和 sorted() 的差別？',
     opts:['速度不同','sort() 原地修改 list；sorted() 回傳新 list','sorted() 不穩定','sort() 不接受 key 參數'], ans:1,
     exp:'list.sort() 原地修改，回傳 None；sorted(iterable) 接受任何可迭代物件，回傳新的排序好的 list。兩者都使用 Timsort，都穩定。'},
    {q:'荷蘭國旗問題（Sort Colors）的核心技術？',
     opts:['合併排序','三路分區（Three-way Partition）：維護 lo/mid/hi 三個指針','計數排序','快速排序'], ans:1,
     exp:'用三個指針：lo（0 的右界）、mid（當前）、hi（2 的左界）。mid ≤ hi 時：遇 0 與 lo 換並前進，遇 1 只前進 mid，遇 2 與 hi 換並後退 hi。O(n) 時間 O(1) 空間。'},
    {q:'Quick Select 找第 K 大元素，平均時間複雜度？',
     opts:['O(1)','O(log n)','O(n)','O(n log n)'], ans:2,
     exp:'Quick Select 每次 partition 後，只遞迴含第 K 個元素的那一側（約一半），T(n)=T(n/2)+O(n)，平均 O(n)。最壞 O(n²)（隨機 pivot 可避免）。'},
  ],
  leetcode:[
    {no:75,  title:'Sort Colors',                       diff:'Medium', url:'https://leetcode.com/problems/sort-colors/',                       note:'荷蘭國旗三路分區模板'},
    {no:88,  title:'Merge Sorted Array',                diff:'Easy',   url:'https://leetcode.com/problems/merge-sorted-array/',                note:'從後往前合併，避免覆蓋'},
    {no:912, title:'Sort an Array',                     diff:'Medium', url:'https://leetcode.com/problems/sort-an-array/',                     note:'手寫 Merge / Quick Sort'},
    {no:215, title:'Kth Largest Element in an Array',   diff:'Medium', url:'https://leetcode.com/problems/kth-largest-element-in-an-array/', note:'Quick Select O(n) 或 Heap'},
    {no:148, title:'Sort List',                         diff:'Medium', url:'https://leetcode.com/problems/sort-list/',                         note:'鏈結串列 Merge Sort'},
    {no:56,  title:'Merge Intervals',                   diff:'Medium', url:'https://leetcode.com/problems/merge-intervals/',                   note:'排序後貪婪合併區間'},
    {no:179, title:'Largest Number',                    diff:'Medium', url:'https://leetcode.com/problems/largest-number/',                   note:'自訂比較：b+a vs a+b'},
    {no:347, title:'Top K Frequent Elements',           diff:'Medium', url:'https://leetcode.com/problems/top-k-frequent-elements/',          note:'桶排序 O(n) 解'},
    {no:315, title:'Count of Smaller Numbers After Self', diff:'Hard', url:'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', note:'Merge Sort 計逆序對'},
    {no:164, title:'Maximum Gap',                       diff:'Hard',   url:'https://leetcode.com/problems/maximum-gap/',                       note:'桶排序保證 O(n)'},
  ],
  refs:[
    {title:'Sorting Visualizations — VisuAlgo', url:'https://visualgo.net/en/sorting'},
    {title:'Timsort 詳解',                      url:'https://en.wikipedia.org/wiki/Timsort'},
    {title:'Quick Select 算法',                  url:'https://en.wikipedia.org/wiki/Quickselect'},
  ]
},
{
  id:'binary-search', title:'二元搜尋', titleEn:'Binary Search', category:'algo', icon:'🔍', difficulty:'intermediate',
  concept:{
    summary:'二元搜尋在已排序的陣列中，每次比較中間元素，將搜尋範圍減半，O(log n) 內找到目標。看似簡單，但邊界條件細節繁多，是面試中「看起來簡單但容易出 bug」的代表。',
    analogy:'像猜數字遊戲：1 到 100，猜 50，被告知「太大」，就知道是 1-49；再猜 25，每次砍半。100 個數字最多猜 7 次（log₂100 ≈ 7）。這就是 O(log n) 的力量。',
    properties:[
      '前提：陣列必須已排序（或具有單調性）',
      '每次比較後搜尋空間減半，T(n) = T(n/2) + O(1) → O(log n)',
      '三種模板：標準（找確切值）、左邊界（第一個 ≥ target）、右邊界（最後一個 ≤ target）',
      '應用廣泛：不只是在陣列找數，任何「單調可判斷」的問題都可二元搜尋「答案」',
      '終止條件：lo > hi（標準）或 lo == hi（左/右邊界）',
    ],
    viz:`在 [1, 3, 5, 7, 9, 11] 中搜尋 7：

Step 1: lo=0 hi=5 mid=2 → arr[2]=5 < 7 → lo=3
        [1, 3, 5, | 7, 9, 11]
Step 2: lo=3 hi=5 mid=4 → arr[4]=9 > 7 → hi=3
                     [7, | 9, 11]
Step 3: lo=3 hi=3 mid=3 → arr[3]=7 == 7 → 找到！

左邊界（第一個 ≥ target）vs 標準：
arr = [1, 3, 3, 3, 5]，target = 3
標準：找到任一個 3 的位置（通常是 mid）
左邊界：找 index 1（第一個 3）
右邊界：找 index 3（最後一個 3）`
  },
  complexity:[
    {op:'標準二元搜尋', time:'O(log n)', cls:'ologn', space:'O(1)'},
    {op:'左/右邊界搜尋',time:'O(log n)', cls:'ologn', space:'O(1)'},
    {op:'二元搜尋答案', time:'O(log(range) × check)', cls:'ologn', space:'O(1)'},
  ],
  complexityNote:'log₂(10⁹) ≈ 30，所以即使 n = 10億，二元搜尋只需 ~30 次',
  space:'O(1)',
  code:`# ── 標準二元搜尋 ─────────────────────
def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2    # 避免整數溢位
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# ── 左邊界（第一個 >= target）─────────
def lower_bound(nums, target):
    lo, hi = 0, len(nums)   # hi 可以是 len，表示「沒找到時插入末尾」
    while lo < hi:           # 注意：lo < hi，不是 lo <= hi
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid         # 找到也不停，繼續往左縮
    return lo   # lo == hi，即第一個 >= target 的位置

# ── 右邊界（最後一個 <= target）───────
def upper_bound(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= target:
            lo = mid + 1   # 繼續往右
        else:
            hi = mid
    return lo - 1  # 最後一個 <= target 的位置

# ── 旋轉排序陣列中搜尋 ───────────────
def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:     # 左半段有序
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                          # 右半段有序
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

# ── 二元搜尋「答案」模板 ─────────────
# 問題：最小化某個滿足條件的值
def binary_search_answer(lo, hi, check):
    while lo < hi:
        mid = (lo + hi) // 2
        if check(mid):
            hi = mid      # mid 可能是答案，往左縮
        else:
            lo = mid + 1
    return lo`,
  interview:{
    howAsked:[
      '旋轉排序陣列搜尋：判斷哪半段有序，再決定往哪走',
      '找峰值（Peak Element）：二元搜尋單調性',
      '二元搜尋答案：「最小化最大值」「最大化最小值」類問題',
      '搜尋矩陣：每列有序且下一列首尾相接，視為一維陣列',
      '浮點數二元搜尋：找平方根、立方根等',
    ],
    patterns:[
      '二元搜尋「答案」：check(mid) 驗證 mid 是否滿足條件，O(log(range)×O(check))',
      '旋轉陣列：先確定哪半段是有序的，再判斷 target 在哪側',
      '找第一個滿足條件的：用左邊界模板，check 為條件函數',
      'bisect 模組：Python 內建 bisect_left/bisect_right 即左/右邊界',
    ],
    watchOut:[
      'mid 計算用 lo+(hi-lo)//2 避免整數溢位（Python 無此問題，但好習慣）',
      '終止條件：lo<=hi（找確切值）vs lo<hi（邊界搜尋）',
      '左邊界返回 lo，檢查是否 < len(nums) 且 nums[lo] == target',
      '注意 hi 的初始值：len(nums)-1（閉區間）vs len(nums)（半開區間）',
    ]
  },
  variations:[
    {name:'旋轉排序陣列', desc:'判斷左右哪半段有序，再決定 target 在哪側。', ex:'Search in Rotated Sorted Array (#33), Find Minimum in Rotated (#153)'},
    {name:'二元搜尋答案', desc:'對「答案」的值域二元搜尋，check() 驗證可行性。', ex:'Koko Eating Bananas (#875), Capacity To Ship (#1011)'},
    {name:'浮點數二元搜尋', desc:'搜尋實數解，精度達到 1e-6 即停止。', ex:'Sqrt(x) (#69), Find the Smallest Divisor (#1283)'},
    {name:'二維矩陣搜尋', desc:'將矩陣視為一維有序陣列，mid 轉換為 (mid//n, mid%n)。', ex:'Search a 2D Matrix (#74)'},
  ],
  quiz:[
    {q:'二元搜尋的前提條件是？',
     opts:['陣列不能有重複元素','陣列必須已排序（或具有單調性）','陣列長度必須是 2 的冪次','陣列必須儲存整數'], ans:1,
     exp:'二元搜尋依賴「單調性」——能透過比較中間值來判斷目標在左半還是右半。最常見的條件是陣列已排序，但廣義上，只要問題具有單調可判斷性即可。'},
    {q:'在 1 到 10^9 的範圍內二元搜尋，最多需要幾次比較？',
     opts:['約 10 次','約 30 次','約 100 次','約 1000 次'], ans:1,
     exp:'log₂(10⁹) ≈ 30。這就是二元搜尋的威力：10 億個選項，只需約 30 次比較。'},
    {q:'左邊界搜尋（找第一個 ≥ target）的終止條件是？',
     opts:['lo <= hi','lo < hi','lo == hi','lo > hi'], ans:1,
     exp:'左邊界搜尋用 lo < hi 終止（閉合時 lo == hi 即為答案）。不同於標準二元搜尋的 lo <= hi，因為找到時也不直接返回，而是繼續往左縮小範圍。'},
    {q:'二元搜尋「答案」模板中，check(mid) 回傳 True 時，為什麼令 hi = mid 而非 hi = mid-1？',
     opts:['避免溢位','mid 本身可能是答案，不能排除','提升效率','避免死循環'], ans:1,
     exp:'找「最小滿足條件的值」：check(mid)=True 表示 mid 滿足條件，但還要看有沒有更小的，所以令 hi=mid（保留 mid）；check(mid)=False 表示太小，lo=mid+1。'},
    {q:'搜尋旋轉排序陣列，如何判斷左半段有序？',
     opts:['nums[lo] < nums[hi]','nums[lo] <= nums[mid]','nums[mid] < nums[hi]','nums[lo] < nums[mid]'], ans:1,
     exp:'若 nums[lo] <= nums[mid]，表示 [lo..mid] 這段沒有旋轉點（是有序的）。注意用 ≤ 處理重複元素和只剩兩個元素的邊界情況。'},
  ],
  leetcode:[
    {no:704, title:'Binary Search',                         diff:'Easy',   url:'https://leetcode.com/problems/binary-search/',                         note:'標準模板'},
    {no:278, title:'First Bad Version',                     diff:'Easy',   url:'https://leetcode.com/problems/first-bad-version/',                     note:'左邊界模板'},
    {no:35,  title:'Search Insert Position',                diff:'Easy',   url:'https://leetcode.com/problems/search-insert-position/',                note:'lower_bound 模板'},
    {no:69,  title:'Sqrt(x)',                               diff:'Easy',   url:'https://leetcode.com/problems/sqrtx/',                                 note:'浮點數/整數二元搜尋'},
    {no:33,  title:'Search in Rotated Sorted Array',        diff:'Medium', url:'https://leetcode.com/problems/search-in-rotated-sorted-array/',        note:'旋轉陣列判斷有序半段'},
    {no:153, title:'Find Minimum in Rotated Sorted Array',  diff:'Medium', url:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', note:'旋轉陣列找最小'},
    {no:162, title:'Find Peak Element',                     diff:'Medium', url:'https://leetcode.com/problems/find-peak-element/',                     note:'單調性二元搜尋'},
    {no:74,  title:'Search a 2D Matrix',                    diff:'Medium', url:'https://leetcode.com/problems/search-a-2d-matrix/',                   note:'2D → 1D 映射'},
    {no:875, title:'Koko Eating Bananas',                   diff:'Medium', url:'https://leetcode.com/problems/koko-eating-bananas/',                   note:'二元搜尋答案，必刷'},
    {no:4,   title:'Median of Two Sorted Arrays',           diff:'Hard',   url:'https://leetcode.com/problems/median-of-two-sorted-arrays/',           note:'Hard 二元搜尋，O(log(m+n))'},
  ],
  refs:[
    {title:'labuladong — 二元搜尋詳解',    url:'https://labuladong.online/algo/essential-technique/binary-search-framework/'},
    {title:'CP-algorithms — Binary Search', url:'https://cp-algorithms.com/num_methods/binary_search.html'},
    {title:'Python bisect 模組文件',        url:'https://docs.python.org/3/library/bisect.html'},
  ]
},
{
  id:'bfs-dfs', title:'BFS / DFS', titleEn:'Breadth-First & Depth-First Search', category:'algo', icon:'🗺️', difficulty:'intermediate',
  concept:{
    summary:'BFS（廣度優先搜尋）用 Queue 逐層擴展，保證最短路徑；DFS（深度優先搜尋）用 Stack（或遞迴）深入一條路徑到底再回溯，適合探索所有可能性。兩者是圖/樹問題的兩大核心工具。',
    analogy:'BFS 像漣漪——石頭丟入水中，波紋由中心向外一圈一圈擴散。DFS 像走迷宮——選一條路走到死胡同，再回頭試另一條，直到走出迷宮。',
    properties:[
      'BFS：Queue、逐層、最短路徑（無權圖）、適合「最近距離」類問題',
      'DFS：Stack（遞迴）、一條路走到底、適合「所有路徑」「連通性」類問題',
      '兩者時間複雜度均為 O(V+E)（V=節點，E=邊）',
      'BFS 空間 O(width)（最寬那層）；DFS 空間 O(depth)（最深路徑）',
      '樹的前/中/後序遍歷是 DFS；層序遍歷是 BFS',
    ],
    viz:`圖：A-B-C-D-E，A-D 有邊，B-E 有邊

BFS（從 A 出發）：
Level 0: A
Level 1: B, D        （A 的鄰居）
Level 2: C, E        （B,D 的鄰居）
Queue 演變：[A] → [B,D] → [D,C,E] → [C,E] → ...

DFS（從 A 出發）：
A → B → C → 回溯 → E → 回溯 → 回溯 → D
訪問順序：A, B, C, E, D

比較：BFS 找 A→E 最短路: A→B→E（2步）
      DFS 可能先找: A→B→C→（C沒路） → backtrack → E（繞路）`
  },
  complexity:[
    {op:'BFS（圖）',    time:'O(V+E)', cls:'on', space:'O(V)'},
    {op:'DFS（圖）',    time:'O(V+E)', cls:'on', space:'O(V)'},
    {op:'BFS（樹）',    time:'O(n)',   cls:'on', space:'O(w) 最寬層'},
    {op:'DFS（樹）遞迴',time:'O(n)',   cls:'on', space:'O(h) 樹高'},
  ],
  complexityNote:'BFS 適合找最短路徑；DFS 的空間是遞迴深度（樹高 h），平衡樹 h=O(log n)，退化時 h=O(n)',
  space:'O(V) 或 O(h)',
  code:`from collections import deque

# ── BFS 模板（最短路徑）──────────────
def bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start, 0)])   # (座標, 距離)
    visited = {start}
    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == end: return dist
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0<=nr<rows and 0<=nc<cols and (nr,nc) not in visited and grid[nr][nc]!=1:
                visited.add((nr,nc))
                queue.append(((nr,nc), dist+1))
    return -1

# ── DFS 模板（遞迴，找所有路徑）──────
def dfs_recursive(graph, node, visited, path, result):
    visited.add(node)
    path.append(node)
    if not graph[node]:    # 葉節點 or 無鄰居
        result.append(path[:])
    for nb in graph[node]:
        if nb not in visited:
            dfs_recursive(graph, nb, visited, path, result)
    path.pop()             # 回溯
    visited.discard(node)  # 如需允許重訪

# ── DFS 迭代（顯式 Stack）───────────
def dfs_iterative(graph, start):
    stack = [start]
    visited = set()
    order = []
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        order.append(node)
        for nb in graph[node]:
            if nb not in visited:
                stack.append(nb)
    return order

# ── BFS 層序遍歷（樹）────────────────
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level_vals = []
        for _ in range(len(queue)):   # 固定當層大小
            node = queue.popleft()
            level_vals.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level_vals)
    return result

# ── 多源 BFS（Rotting Oranges）───────
def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: queue.append((r, c, 0))  # 所有爛橘一起
            elif grid[r][c] == 1: fresh += 1
    time = 0
    while queue:
        r, c, t = queue.popleft()
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, t+1))
                time = t + 1
    return time if fresh == 0 else -1`,
  interview:{
    howAsked:[
      'BFS 最短路徑：迷宮、單詞接龍、最少步驟達成某狀態',
      'DFS 連通性：島嶼數量、連通分量、淹水問題',
      '多源 BFS：多個起點同時出發（腐爛橘子、距離最近的 0）',
      '雙向 BFS：從起點和終點同時 BFS，在中間相遇，搜尋空間從 O(b^d) 降至 O(b^(d/2))',
      'DFS + 回溯：全排列、全子集（見回溯章節）',
    ],
    patterns:[
      'BFS 四方向：dr,dc = [(0,1),(0,-1),(1,0),(-1,0)]',
      '邊界檢查：0<=r<rows and 0<=c<cols',
      'visited 集合：圖 BFS/DFS 必備，樹可省略',
      '多源 BFS：把所有起點一次性加入 queue，再開始 BFS',
    ],
    watchOut:[
      'BFS 必須標記 visited（加入 queue 時就標記，而非 pop 時）',
      'DFS 遞迴深度可能超過 Python 預設限制（1000），可用 sys.setrecursionlimit 或改迭代',
      '找最短路徑一定要用 BFS，DFS 不保證最短',
      '有向圖 vs 無向圖建圖方式不同',
    ]
  },
  variations:[
    {name:'多源 BFS', desc:'多個起點同時加入初始 queue，求所有節點到最近起點的距離。', ex:'Rotting Oranges (#994), 01 Matrix (#542)'},
    {name:'雙向 BFS', desc:'從頭尾同時展開 BFS，搜尋空間指數級縮小。', ex:'Word Ladder (#127)'},
    {name:'迭代 DFS', desc:'用顯式 Stack 代替遞迴，避免 stack overflow。', ex:'任何 DFS 題都可改寫'},
    {name:'拓撲排序（BFS）', desc:'In-degree 為 0 的節點先入 queue，依序 pop 並降低鄰居的 in-degree。', ex:'Course Schedule (#207), Alien Dictionary (#269)'},
  ],
  quiz:[
    {q:'為什麼 BFS 能保證找到最短路徑（無權圖）？',
     opts:['因為用了 Queue','按距離由近到遠擴展，第一次到達即最短','因為訪問所有節點','遞迴保證最短'], ans:1,
     exp:'BFS 用 Queue（FIFO）確保「距離 k 的節點」全部處理完後，才開始處理「距離 k+1 的節點」。第一次到達目標時，走過的步數必然是最短路徑長度。'},
    {q:'DFS 遞迴的時間複雜度與什麼有關？',
     opts:['節點數 V','邊數 E','V + E','只與樹高有關'], ans:2,
     exp:'DFS 訪問每個節點（V 次）和每條邊（E 次），時間複雜度 O(V+E)。對樹來說，E=V-1，所以是 O(V)。'},
    {q:'多源 BFS（Multi-source BFS）的關鍵做法是？',
     opts:['先找所有起點再逐一 BFS','所有起點同時加入初始 queue，一起展開','用 DFS 代替','用優先佇列'], ans:1,
     exp:'多源 BFS 把所有起點同時放入 queue，等效於有一個「超級源點」連接到所有起點。這樣每個節點到最近起點的距離能一次性全部計算出來。'},
    {q:'BFS 中，visited 應該在何時標記節點為已訪問？',
     opts:['pop 出 queue 時','加入 queue 時','訪問鄰居後','迴圈開始時'], ans:1,
     exp:'必須在「加入 queue 時」就標記為 visited。若在 pop 時才標記，同一個節點可能被多次加入 queue，導致重複處理甚至無限迴圈。'},
    {q:'在 Python 中，DFS 遞迴深度超過限制怎麼辦？',
     opts:['無法解決','用 sys.setrecursionlimit() 增加限制，或改用迭代+顯式 Stack','改用 BFS','用 try/except 捕捉'], ans:1,
     exp:'Python 預設遞迴限制是 1000。解法1：sys.setrecursionlimit(10000)；解法2（推薦）：用 while loop + 顯式 Stack 模擬遞迴，避免系統 stack overflow 風險。'},
  ],
  leetcode:[
    {no:200,  title:'Number of Islands',               diff:'Medium', url:'https://leetcode.com/problems/number-of-islands/',              note:'DFS/BFS 最經典起點'},
    {no:733,  title:'Flood Fill',                      diff:'Easy',   url:'https://leetcode.com/problems/flood-fill/',                    note:'DFS 四方向模板'},
    {no:542,  title:'01 Matrix',                       diff:'Medium', url:'https://leetcode.com/problems/01-matrix/',                     note:'多源 BFS，所有 0 同時出發'},
    {no:994,  title:'Rotting Oranges',                 diff:'Medium', url:'https://leetcode.com/problems/rotting-oranges/',               note:'多源 BFS 模板題'},
    {no:207,  title:'Course Schedule',                 diff:'Medium', url:'https://leetcode.com/problems/course-schedule/',               note:'BFS 拓撲排序偵測環'},
    {no:417,  title:'Pacific Atlantic Water Flow',     diff:'Medium', url:'https://leetcode.com/problems/pacific-atlantic-water-flow/',   note:'反向多源 DFS/BFS'},
    {no:695,  title:'Max Area of Island',              diff:'Medium', url:'https://leetcode.com/problems/max-area-of-island/',            note:'DFS 計算連通分量大小'},
    {no:286,  title:'Walls and Gates',                 diff:'Medium', url:'https://leetcode.com/problems/walls-and-gates/',               note:'多源 BFS'},
    {no:127,  title:'Word Ladder',                     diff:'Hard',   url:'https://leetcode.com/problems/word-ladder/',                   note:'BFS 最短路徑，隱式圖'},
    {no:126,  title:'Word Ladder II',                  diff:'Hard',   url:'https://leetcode.com/problems/word-ladder-ii/',                note:'BFS + DFS 回溯所有最短路徑'},
  ],
  refs:[
    {title:'BFS/DFS 視覺化 — VisuAlgo', url:'https://visualgo.net/en/dfsbfs'},
    {title:'NeetCode — Graphs 系列',    url:'https://neetcode.io/practice'},
    {title:'BFS vs DFS 詳解',           url:'https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/'},
  ]
},
{
  id:'dynamic-programming', title:'動態規劃', titleEn:'Dynamic Programming', category:'algo', icon:'💡', difficulty:'advanced',
  concept:{
    summary:'動態規劃（DP）是將問題拆解為重疊子問題（Overlapping Subproblems），並儲存子問題解（Memoization/Tabulation），避免重複計算。關鍵是找到「狀態定義」和「狀態轉移方程式」。',
    analogy:'爬樓梯問題：爬到第 n 階的方法數 = 爬到第 n-1 階的方法數 + 爬到第 n-2 階的方法數。你已知 f(1)=1, f(2)=2，往上推即可。DP 就是「把大問題分成小問題，小問題只算一次」。',
    properties:[
      '最優子結構：問題的最優解包含子問題的最優解',
      '重疊子問題：同一個子問題會被重複計算',
      'Memoization（Top-down）：遞迴 + 快取，自然地只算必要的子問題',
      'Tabulation（Bottom-up）：迴圈填表，通常空間效率更好',
      'DP 的關鍵：定義 dp[i] 的意義 + 推導 dp[i] 與 dp[i-1] 的關係',
    ],
    viz:`爬樓梯 f(5) 的遞迴樹（無 memo，重複計算）：
                f(5)
               /    \\
           f(4)      f(3)
           /  \\      /  \\
        f(3) f(2) f(2) f(1)   ← f(3) f(2) 重複！
        ...

加 Memoization 後，每個 f(i) 只算一次：
f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=8

Bottom-up Tabulation：
dp = [0, 1, 2, 3, 5, 8]
idx:  0  1  2  3  4  5
dp[i] = dp[i-1] + dp[i-2]`
  },
  complexity:[
    {op:'1D DP（爬樓梯、打家劫舍）',    time:'O(n)',   cls:'on',  space:'O(n) 或 O(1)'},
    {op:'2D DP（LCS、Edit Distance）',   time:'O(m×n)', cls:'on2', space:'O(m×n) 或 O(n)'},
    {op:'背包問題（0/1 Knapsack）',      time:'O(n×W)', cls:'on2', space:'O(W)'},
    {op:'LIS（Patience Sorting）',       time:'O(n log n)', cls:'onlogn', space:'O(n)'},
  ],
  complexityNote:'DP 的空間通常可優化：只需前幾行/幾個狀態時，用「滾動陣列」降維',
  space:'視題目而定，通常可優化至 O(n) 或 O(1)',
  code:`# ── 1. 爬樓梯（Climbing Stairs）─────
# dp[i] = 到達第 i 階的方法數
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2     # 空間優化到 O(1)
    for _ in range(3, n+1):
        a, b = b, a + b
    return b

# ── 2. 打家劫舍（House Robber）────────
def rob(nums):
    prev2, prev1 = 0, 0
    for v in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + v)
    return prev1

# ── 3. 最長遞增子序列 LIS O(n log n) ─
from bisect import bisect_left
def length_of_lis(nums):
    tails = []   # tails[i] = 長度 i+1 的 LIS 最小末尾
    for v in nums:
        pos = bisect_left(tails, v)
        if pos == len(tails): tails.append(v)
        else: tails[pos] = v
    return len(tails)

# ── 4. 零錢兌換（Coin Change）─────────
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i:
                dp[i] = min(dp[i], dp[i-c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# ── 5. 最短編輯距離（Edit Distance）──
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = list(range(n + 1))   # 空間優化，只用一行
    for i in range(1, m + 1):
        prev = dp[0]
        dp[0] = i
        for j in range(1, n + 1):
            temp = dp[j]
            if word1[i-1] == word2[j-1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(prev, dp[j], dp[j-1])
            prev = temp
    return dp[n]

# ── 6. 唯一路徑（Unique Paths）────────
def unique_paths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[-1]`,
  interview:{
    howAsked:[
      '一維 DP：爬樓梯、打家劫舍、跳躍遊戲（系列）',
      '二維 DP：唯一路徑、最短編輯距離、LCS（最長公共子序列）',
      '背包問題：零錢兌換（完全背包）、0/1 背包',
      '字串 DP：Word Break、Regular Expression Matching',
      '區間 DP：Burst Balloons、Matrix Chain Multiplication',
    ],
    patterns:[
      '框架：定義狀態 → 找轉移方程式 → 確認初始值 → 確認計算順序',
      '從遞迴 + memo 出發，再改成 Bottom-up 表格',
      '空間優化：若 dp[i] 只用到 dp[i-1]，可改成兩個變數',
      '子陣列 vs 子序列：子陣列連續（Subarray），子序列可跳格（Subsequence）',
    ],
    watchOut:[
      '仔細定義 dp[i] 的含義（含/不含 i？ 以 i 結尾？ 以 i 開頭？）',
      'Bottom-up 填表順序必須保證計算 dp[i] 時，所有依賴的 dp[j] 都已計算',
      '初始值（base case）錯誤是最常見的 bug',
      '注意 dp 陣列大小（0-indexed vs 1-indexed）',
    ]
  },
  variations:[
    {name:'一維 DP', desc:'狀態只依賴前幾個狀態，可優化到 O(1) 空間。', ex:'Climbing Stairs (#70), House Robber (#198), Jump Game (#55)'},
    {name:'二維 DP', desc:'狀態由兩個維度決定，常見於字串比對、矩陣問題。', ex:'Edit Distance (#72), Unique Paths (#62), LCS'},
    {name:'背包 DP', desc:'每個物品選或不選（0/1 背包），或可重複選（完全背包）。', ex:'Coin Change (#322), Partition Equal Subset (#416)'},
    {name:'區間 DP', desc:'dp[i][j] 表示區間 [i,j] 的最優解，由更小的區間推導。', ex:'Burst Balloons (#312), Palindrome Partitioning II (#132)'},
  ],
  quiz:[
    {q:'動態規劃適用的兩個必要條件是？',
     opts:['貪婪性質 + 有序輸入','最優子結構 + 重疊子問題','遞迴 + 回溯','排序 + 二元搜尋'], ans:1,
     exp:'DP 需要：(1) 最優子結構——大問題的最優解能由子問題最優解組合；(2) 重疊子問題——同一子問題多次出現。如果子問題不重疊（如分治的 Merge Sort），就不需要 DP。'},
    {q:'Memoization（Top-down）和 Tabulation（Bottom-up）的主要差別？',
     opts:['時間複雜度不同','Memoization 用遞迴+快取（只算需要的）；Tabulation 用迴圈填表（算所有子問題）','Tabulation 更難實作','只有 Memoization 能優化空間'], ans:1,
     exp:'Memoization（備忘錄法）：遞迴+cache，自然只算需要的子問題。Tabulation（制表法）：Bottom-up 迴圈，通常效率更高（無遞迴開銷），但需要確定填表順序。'},
    {q:'Coin Change 問題，dp[i] 代表？',
     opts:['第 i 枚硬幣的面值','湊成金額 i 所需的最少硬幣數','第 i 種組合方式','硬幣 i 是否使用'], ans:1,
     exp:'dp[i] = 湊成金額 i 所需的最少硬幣數。轉移：dp[i] = min(dp[i], dp[i - coin] + 1)，對所有 coin ≤ i 的硬幣。初始：dp[0] = 0，其餘 ∞。'},
    {q:'LIS（最長遞增子序列）O(n log n) 解法的關鍵資料結構？',
     opts:['Stack','tails 陣列 + 二元搜尋','DP 表格','Priority Queue'], ans:1,
     exp:'維護 tails 陣列，tails[i] 是長度 i+1 的 LIS 的最小末尾元素。對每個新元素 v，用 bisect_left 找 v 在 tails 中的位置並替換（或追加）。最終 len(tails) 就是 LIS 長度。'},
    {q:'二維 DP 的空間能優化成 O(n) 嗎？',
     opts:['不能，必須 O(m×n)','能，若計算 dp[i][j] 只依賴 dp[i-1][j] 和 dp[i][j-1]（上方和左方），可用滾動陣列','能，但時間複雜度會增加','只有某些題目可以'], ans:1,
     exp:'許多 2D DP 問題（如 Unique Paths, Coin Change 2D, Edit Distance）計算 dp[i][j] 時只需要上一列（i-1）的值和當前列的前一個（j-1）。這時可用一維滾動陣列，空間從 O(m×n) 降至 O(n)。'},
  ],
  leetcode:[
    {no:70,  title:'Climbing Stairs',              diff:'Easy',   url:'https://leetcode.com/problems/climbing-stairs/',              note:'DP 最入門：dp[i]=dp[i-1]+dp[i-2]'},
    {no:198, title:'House Robber',                 diff:'Medium', url:'https://leetcode.com/problems/house-robber/',                 note:'一維 DP，相鄰不能選'},
    {no:53,  title:'Maximum Subarray',             diff:'Medium', url:'https://leetcode.com/problems/maximum-subarray/',            note:'Kadane，O(1) 空間 DP'},
    {no:322, title:'Coin Change',                  diff:'Medium', url:'https://leetcode.com/problems/coin-change/',                 note:'完全背包問題，必刷'},
    {no:300, title:'Longest Increasing Subsequence', diff:'Medium', url:'https://leetcode.com/problems/longest-increasing-subsequence/', note:'O(n log n) tails 陣列'},
    {no:62,  title:'Unique Paths',                 diff:'Medium', url:'https://leetcode.com/problems/unique-paths/',                note:'二維 DP 基礎'},
    {no:139, title:'Word Break',                   diff:'Medium', url:'https://leetcode.com/problems/word-break/',                  note:'字串 DP'},
    {no:55,  title:'Jump Game',                    diff:'Medium', url:'https://leetcode.com/problems/jump-game/',                   note:'貪婪或 DP'},
    {no:1143,title:'Longest Common Subsequence',   diff:'Medium', url:'https://leetcode.com/problems/longest-common-subsequence/', note:'二維 DP 標準題'},
    {no:72,  title:'Edit Distance',                diff:'Hard',   url:'https://leetcode.com/problems/edit-distance/',               note:'二維 DP Hard，面試常考'},
  ],
  refs:[
    {title:'labuladong — DP 框架',       url:'https://labuladong.online/algo/essential-technique/dynamic-programming-framework/'},
    {title:'NeetCode — DP 解題系列',     url:'https://neetcode.io/practice'},
    {title:'DP 可視化工具',              url:'https://algorithm-visualizer.org/dynamic-programming/fibonacci-sequence'},
  ]
},
];
