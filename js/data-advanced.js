// ===== Advanced Topics: Sorting Methods, Design Patterns, System Design =====
const ADVANCED_TOPICS = [
{
  id:'sorting-methods', title:'排序方法完全指南', titleEn:'Sorting Methods Guide', category:'advanced', icon:'🔀', difficulty:'intermediate',
  concept:{
    summary:'排序演算法可分為比較排序（Comparison-based）與非比較排序（Non-comparison）兩大類。比較排序下界為 O(n log n)，包含 Merge Sort、Quick Sort、Heap Sort；非比較排序利用資料特性可達 O(n)，包含 Counting Sort、Radix Sort、Bucket Sort。選擇合適的排序演算法需考慮資料量、值域範圍、是否需要穩定性及記憶體限制。',
    analogy:'選排序算法就像選交通工具：小數據用 Insertion（腳踏車，靈活）；需穩定用 Merge Sort（火車，準時）；平均最快用 Quick Sort（跑車，但偶爾塞車）；記憶體受限用 Heap Sort（貨車，耗油少）；值域小用 Counting Sort（高鐵，特定路線超快）。',
    properties:[
      '穩定性（Stability）：相同值元素排序後相對順序不變，Merge Sort/Insertion/Tim Sort 是穩定的',
      '原地性（In-place）：僅需 O(1) 額外空間，Heap Sort/Quick Sort 是原地的（Merge Sort 不是）',
      '自適應性（Adaptive）：對已排序或部分排序的輸入更快，Insertion Sort/Tim Sort 具有此特性',
      '比較排序下界：任何基於比較的排序最差不可能優於 O(n log n)（決策樹理論）',
      'Python 內建 sorted()/list.sort() 使用 Tim Sort：Merge Sort + Insertion Sort 的混合，O(n log n) 且穩定',
    ],
    viz:`排序演算法完整比較表：
演算法         最佳        平均        最壞        空間      穩定  自適應
─────────────────────────────────────────────────────────────────────
Bubble Sort    O(n)      O(n²)      O(n²)      O(1)    ✓    ✓
Selection Sort O(n²)     O(n²)      O(n²)      O(1)    ✗    ✗
Insertion Sort O(n)      O(n²)      O(n²)      O(1)    ✓    ✓  ← 小資料最佳
Shell Sort     O(n log n)O(n^1.5)   O(n²)      O(1)    ✗    ✓
Merge Sort     O(n log n)O(n log n) O(n log n) O(n)    ✓    ✗  ← 穩定保證
Quick Sort     O(n log n)O(n log n) O(n²)      O(log n)✗    ✗  ← 平均最快
Heap Sort      O(n log n)O(n log n) O(n log n) O(1)    ✗    ✗  ← 記憶體最省
Tim Sort       O(n)      O(n log n) O(n log n) O(n)    ✓    ✓  ← Python 內建
Counting Sort  O(n+k)    O(n+k)     O(n+k)     O(k)    ✓    ✗  ← 值域小
Radix Sort     O(nk)     O(nk)      O(nk)      O(n+k)  ✓    ✗  ← 整數/字串
Bucket Sort    O(n+k)    O(n+k)     O(n²)      O(n)    ✓    ✗  ← 均勻分佈`,
  },
  complexity:[
    {op:'Bubble/Selection/Insertion（最壞）', time:'O(n²)',     cls:'on2',    space:'O(1)'},
    {op:'Insertion Sort（最佳，近乎排序）',  time:'O(n)',      cls:'on',     space:'O(1)'},
    {op:'Merge Sort（所有情況）',            time:'O(n log n)',cls:'onlogn', space:'O(n)'},
    {op:'Quick Sort（平均）',               time:'O(n log n)',cls:'onlogn', space:'O(log n)'},
    {op:'Quick Sort（最壞，已排序+bad pivot）',time:'O(n²)',   cls:'on2',    space:'O(n)'},
    {op:'Heap Sort（所有情況）',             time:'O(n log n)',cls:'onlogn', space:'O(1)'},
    {op:'Counting/Radix Sort',              time:'O(n+k)',    cls:'on',     space:'O(n+k)'},
  ],
  complexityNote:'k 為值域範圍；Quick Sort 用 random pivot 或 median-of-3 可避免最壞情況；Tim Sort 對已排序輸入為 O(n)',
  space:'依演算法而異，見上表',
  code:`# ── 如何選擇排序演算法 ────────────────
# 1. 直接用 Python 內建（99% 情況）
arr.sort()                    # in-place, Tim Sort
result = sorted(arr)          # 新 list, Tim Sort
arr.sort(key=lambda x: -x[1]) # 自訂 key

# ── Merge Sort（穩定，最壞 O(n log n)）──
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    L, R = merge_sort(arr[:mid]), merge_sort(arr[mid:])
    res, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: res.append(L[i]); i += 1
        else: res.append(R[j]); j += 1
    return res + L[i:] + R[j:]

# ── Quick Sort（平均最快）────────────────
import random
def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo >= hi: return
    # Random pivot 避免 O(n²) 最壞情況
    r = random.randint(lo, hi)
    arr[r], arr[hi] = arr[hi], arr[r]
    p = partition(arr, lo, hi)
    quick_sort(arr, lo, p - 1)
    quick_sort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot, i = arr[hi], lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1

# ── Counting Sort（值域小的整數）─────────
def counting_sort(arr, max_val):
    count = [0] * (max_val + 1)
    for x in arr: count[x] += 1
    result = []
    for val, cnt in enumerate(count):
        result.extend([val] * cnt)
    return result

# ── Bucket Sort（均勻分佈浮點數）─────────
def bucket_sort(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]
    for x in arr:
        idx = int(x * n)
        buckets[min(idx, n-1)].append(x)
    for b in buckets: b.sort()
    return [x for b in buckets for x in b]

# ── 面試常考：第 K 大元素（Quick Select）─
import heapq
def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]  # O(n log k)
# 或用 Quick Select O(n) 平均`,
  interview:{
    howAsked:[
      '實作 Merge Sort 或 Quick Sort（手寫程式碼）',
      '比較不同排序演算法的時間/空間複雜度與穩定性',
      '何時用哪種排序？給定條件選擇最佳排序',
      '排序相關 LeetCode：第 K 大元素、合併 K 個排序串列、最大數等',
      '非比較排序的原理：Counting/Radix/Bucket Sort 為什麼能超越 O(n log n)',
    ],
    patterns:[
      '選擇排序策略：根據資料特性（大小、值域、穩定性需求）選最佳演算法',
      'Quick Select 找第 K 大/小：O(n) 平均，比完整排序更快',
      '外部排序（External Sort）：資料超過記憶體時用 Merge Sort 分段排序再合併',
      '自訂比較鍵：sort(key=...) 處理複合條件排序，避免手寫比較函數',
    ],
    watchOut:[
      'Quick Sort 最壞 O(n²)：已排序輸入 + 固定選最後元素當 pivot，必須用 random pivot',
      '穩定性陷阱：Selection Sort 和 Heap Sort 不穩定，排序 (name, age) 時可能打亂原始順序',
      'Python sort() 的 key 是 Schwartzian Transform，不要用 cmp_to_key 除非必要',
      'Counting Sort 值域限制：若 max_val = 10⁹，count 陣列會爆記憶體',
    ],
  },
  variations:[
    {name:'Quick Select（快速選擇）', desc:'只找第 K 大/小元素，不需完整排序，平均 O(n)', ex:'LeetCode #215 Kth Largest Element'},
    {name:'外部排序（External Sort）', desc:'資料超過 RAM 時，用 k-way merge 分批排序，常見於資料庫', ex:'大型日誌文件排序'},
    {name:'並行排序（Parallel Sort）', desc:'Merge Sort 天然適合並行：左右子陣列可同時排序，多核 CPU 效能提升明顯', ex:'分散式系統大規模排序'},
    {name:'部分排序（Partial Sort）', desc:'只需要前 K 個最小/最大元素，用 Heap 維護 K 個元素，O(n log k)', ex:'Top K 熱門文章'},
  ],
  quiz:[
    {q:'下列哪種排序演算法在最壞情況下仍保證 O(n log n) 且是穩定的？', opts:['Quick Sort','Merge Sort','Heap Sort','Shell Sort'], ans:1, exp:'Merge Sort 在所有情況下都是 O(n log n)，且是穩定排序（相同元素保持原始順序）。Quick Sort 最壞 O(n²)；Heap Sort 雖 O(n log n) 但不穩定。'},
    {q:'若要對值域在 [0, 100] 的 100 萬個整數排序，最快的方法是？', opts:['Quick Sort','Merge Sort','Counting Sort','Heap Sort'], ans:2, exp:'Counting Sort 在值域 k 很小（100）而 n 很大（100萬）時效率最高，時間複雜度 O(n+k) ≈ O(n)，遠優於 O(n log n) 的比較排序。'},
    {q:'Python 的 list.sort() 使用哪種排序演算法？', opts:['Quick Sort','Merge Sort','Heap Sort','Tim Sort'], ans:3, exp:'Python 內建使用 Tim Sort，這是 Merge Sort 和 Insertion Sort 的混合，對真實世界的資料（通常部分有序）非常高效，時間 O(n log n) 且穩定。'},
    {q:'Quick Sort 使用 random pivot 的主要目的是什麼？', opts:['提升最佳情況效能','避免最壞情況 O(n²)','減少記憶體使用','讓排序更穩定'], ans:1, exp:'固定選最後元素當 pivot 在已排序輸入上會退化到 O(n²)。Random pivot 使得最壞情況機率極低，期望時間複雜度保持 O(n log n)。'},
    {q:'下列何者是「穩定排序」（Stable Sort）？', opts:['Quick Sort','Heap Sort','Selection Sort','Insertion Sort'], ans:3, exp:'Insertion Sort 是穩定排序：比較時對相等元素不交換，保持原始順序。Quick Sort、Heap Sort、Selection Sort 都不是穩定排序。'},
  ],
  leetcode:[
    {no:912, title:'Sort an Array', url:'https://leetcode.com/problems/sort-an-array/', diff:'Medium', note:'實作 Merge Sort 或 Quick Sort，面試中最常被要求手寫的兩種排序'},
    {no:215, title:'Kth Largest Element in an Array', url:'https://leetcode.com/problems/kth-largest-element-in-an-array/', diff:'Medium', note:'Quick Select O(n) 平均，或 Heap O(n log k)，面試高頻題'},
    {no:75,  title:'Sort Colors', url:'https://leetcode.com/problems/sort-colors/', diff:'Medium', note:'荷蘭國旗問題，三路分區 Quick Sort 的核心概念'},
    {no:56,  title:'Merge Intervals', url:'https://leetcode.com/problems/merge-intervals/', diff:'Medium', note:'先排序再合併，排序 + 貪婪的經典組合'},
    {no:179, title:'Largest Number', url:'https://leetcode.com/problems/largest-number/', diff:'Medium', note:'自訂比較函數，sort(key=cmp_to_key(...))'},
    {no:23,  title:'Merge K Sorted Lists', url:'https://leetcode.com/problems/merge-k-sorted-lists/', diff:'Hard', note:'K-way Merge，外部排序的核心子問題，用 min-heap'},
    {no:315, title:'Count of Smaller Numbers After Self', url:'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', diff:'Hard', note:'Merge Sort 過程中計數，分治思維'},
    {no:148, title:'Sort List', url:'https://leetcode.com/problems/sort-list/', diff:'Medium', note:'鏈結串列的 Merge Sort，O(n log n) 時間 O(1) 空間'},
    {no:493, title:'Reverse Pairs', url:'https://leetcode.com/problems/reverse-pairs/', diff:'Hard', note:'Merge Sort 變形，合併時計算反序對數量'},
    {no:164, title:'Maximum Gap', url:'https://leetcode.com/problems/maximum-gap/', diff:'Hard', note:'Bucket Sort 應用，O(n) 解法'},
  ],
  refs:[
    {title:'Visualgo — 排序演算法視覺化', url:'https://visualgo.net/en/sorting'},
    {title:'Big-O Cheat Sheet', url:'https://www.bigocheatsheet.com/'},
    {title:'Sorting Algorithms Animations', url:'https://www.toptal.com/developers/sorting-algorithms'},
  ],
  en:{
    summary:'Sorting algorithms fall into two categories: comparison-based (lower bound O(n log n)) and non-comparison (can reach O(n) by exploiting data properties). Choosing the right sort requires considering data size, value range, stability requirements, and memory constraints.',
    analogy:'Choosing a sorting algorithm is like choosing transport: Insertion Sort for small data (bicycle, flexible); Merge Sort when stability matters (train, reliable); Quick Sort for raw speed (sports car, occasionally slow); Heap Sort when memory is tight (truck, fuel-efficient); Counting Sort for small value ranges (high-speed rail, blazing fast on specific routes).',
    properties:[
      'Stability: equal elements maintain their original relative order — Merge/Insertion/Tim Sort are stable',
      'In-place: requires only O(1) extra space — Heap Sort and Quick Sort qualify (Merge Sort does not)',
      'Adaptive: faster on nearly-sorted input — Insertion Sort and Tim Sort have this property',
      'Comparison sort lower bound: no comparison-based sort can beat O(n log n) in the worst case (decision-tree theory)',
      "Python's sorted()/list.sort() uses Tim Sort: a hybrid of Merge Sort + Insertion Sort, O(n log n) and stable",
    ],
    complexityNote:'k is the value range; use random pivot or median-of-3 in Quick Sort to avoid worst case; Tim Sort achieves O(n) on already-sorted input',
    interview:{
      howAsked:[
        'Implement Merge Sort or Quick Sort from scratch (most commonly asked)',
        'Compare time/space complexity and stability across sorting algorithms',
        'Which sort would you use given these constraints? (stability, memory, value range)',
        'Sorting-based LeetCode: Kth Largest, Merge K Sorted Lists, Largest Number',
        'Explain why non-comparison sorts can break the O(n log n) barrier',
      ],
      patterns:[
        'Algorithm selection strategy: match algorithm to data properties (size, range, stability needs)',
        'Quick Select for Kth element: O(n) average — faster than full sort when you only need one rank',
        'External sort: when data exceeds RAM, use k-way merge sort to sort segments then merge',
        'Custom sort keys: sort(key=...) handles multi-condition sorting cleanly without custom comparators',
      ],
      watchOut:[
        'Quick Sort worst case O(n²): sorted input with last-element pivot — always use random pivot',
        'Stability trap: Selection and Heap Sort are unstable — can scramble (name, age) tuples',
        "Python sort() key uses Schwartzian Transform — avoid cmp_to_key unless necessary",
        'Counting Sort range limit: if max_val = 10⁹, the count array will blow memory',
      ],
    },
    variations:[
      'Quick Select: find only the Kth element without full sort — O(n) average, perfect for top-K problems',
      'External Sort: k-way merge for data exceeding RAM, the backbone of database sorting',
      'Parallel Sort: Merge Sort is naturally parallel — left/right halves can be sorted simultaneously',
      'Partial Sort: maintain a K-element heap for top-K results in O(n log k)',
    ],
    quiz:[
      {q:'Which sorting algorithm guarantees O(n log n) in the worst case AND is stable?', opts:['Quick Sort','Merge Sort','Heap Sort','Shell Sort'], exp:'Merge Sort guarantees O(n log n) in all cases and is stable. Quick Sort degrades to O(n²) worst case; Heap Sort is O(n log n) but unstable.'},
      {q:'To sort 1 million integers in range [0, 100], the fastest approach is?', opts:['Quick Sort','Merge Sort','Counting Sort','Heap Sort'], exp:'Counting Sort with small range k=100 and large n=1M is O(n+k) ≈ O(n), far faster than O(n log n) comparison sorts.'},
      {q:"What sorting algorithm does Python's list.sort() use?", opts:['Quick Sort','Merge Sort','Heap Sort','Tim Sort'], exp:'Python uses Tim Sort, a hybrid of Merge Sort and Insertion Sort, optimized for real-world data that is often partially sorted. O(n log n) and stable.'},
      {q:'What is the main benefit of using a random pivot in Quick Sort?', opts:['Improve best-case performance','Avoid O(n²) worst case','Reduce memory usage','Make the sort stable'], exp:'A fixed last-element pivot degrades to O(n²) on sorted input. Random pivot makes worst-case extremely unlikely, keeping expected time O(n log n).'},
      {q:'Which of the following is a stable sort?', opts:['Quick Sort','Heap Sort','Selection Sort','Insertion Sort'], exp:'Insertion Sort is stable: equal elements are never swapped, preserving original order. Quick Sort, Heap Sort, and Selection Sort are all unstable.'},
    ],
    lcNotes:[
      'Implement Merge Sort or Quick Sort — the most commonly hand-coded sorts in interviews',
      'Quick Select O(n) average, or Heap O(n log k) — classic high-frequency interview problem',
      'Dutch National Flag problem — three-way partition, core concept of Quick Sort',
      'Sort then merge — classic sort + greedy combination',
      'Custom comparator with cmp_to_key for multi-key sorting',
      'K-way Merge using min-heap — core of external sorting',
      'Count inversions using Merge Sort during the merge step',
      'Merge Sort on linked list — O(n log n) time, O(1) space',
      'Merge Sort variation: count reverse pairs during merge',
      'Bucket Sort application for O(n) maximum gap solution',
    ],
  },
  detail:{
    patterns:[
      {
        detail:'選排序算法的決策樹：① 需要穩定 → Merge Sort；② 記憶體受限 → Heap Sort；③ 一般情況 → Quick Sort（random pivot）；④ 值域小整數 → Counting/Radix；⑤ 已知部分有序 → Insertion/Tim Sort；⑥ 生產環境 → 直接用語言內建（Tim Sort）。',
        code:`# 決策樹示範
def choose_sort(n, k_range, needs_stable, limited_memory):
    if k_range and k_range < n:
        return "Counting Sort O(n+k)"  # 值域小
    if needs_stable and not limited_memory:
        return "Merge Sort O(n log n)"  # 穩定保證
    if limited_memory:
        return "Heap Sort O(n log n)"   # O(1) 空間
    return "Quick Sort O(n log n) avg"  # 一般最快

# Python 內建永遠是第一選擇
nums = [3, 1, 4, 1, 5, 9]
nums.sort()                          # in-place
result = sorted(nums, reverse=True)  # 降序
# 多鍵排序
students = [('Alice', 90), ('Bob', 90), ('Charlie', 85)]
students.sort(key=lambda x: (-x[1], x[0]))  # 分數降序，名字升序`,
      },
      {
        detail:'Quick Select 找第 K 大/小元素，平均 O(n) 優於排序 O(n log n)。核心：partition 後只遞迴一側，不需排好整個陣列。面試中高頻考題，要熟記。',
        code:`import random

def find_kth_largest(nums, k):
    # 第 k 大 = 第 (n-k) 小（0-indexed）
    target = len(nums) - k

    def quick_select(lo, hi):
        pivot_idx = random.randint(lo, hi)
        nums[pivot_idx], nums[hi] = nums[hi], nums[pivot_idx]

        # partition
        store = lo
        for i in range(lo, hi):
            if nums[i] <= nums[hi]:
                nums[store], nums[i] = nums[i], nums[store]
                store += 1
        nums[store], nums[hi] = nums[hi], nums[store]

        if store == target: return nums[store]
        elif store < target: return quick_select(store + 1, hi)
        else: return quick_select(lo, store - 1)

    return quick_select(0, len(nums) - 1)

# 另一種方法：heap，適合 streaming
import heapq
def top_k(nums, k):
    # Min-heap of size k → 最終堆頂就是第 k 大
    heap = nums[:k]
    heapq.heapify(heap)
    for x in nums[k:]:
        if x > heap[0]:
            heapq.heapreplace(heap, x)
    return heap[0]`,
      },
      {
        detail:'Merge K 個排序列表（K-way Merge）是 Merge Sort 的延伸，也是外部排序的核心。用 min-heap 維護每個 list 的當前最小值，每次 pop 出最小再 push 下一個，時間 O(N log K)，N 是總元素數。',
        code:`import heapq

def merge_k_sorted(lists):
    """合併 K 個已排序的 list"""
    heap = []
    result = []

    # 初始化：每個 list 的第一個元素入堆
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        next_idx = elem_idx + 1
        if next_idx < len(lists[list_idx]):
            next_val = lists[list_idx][next_idx]
            heapq.heappush(heap, (next_val, list_idx, next_idx))

    return result

# 測試
lists = [[1,4,7], [2,5,8], [3,6,9]]
print(merge_k_sorted(lists))  # [1,2,3,4,5,6,7,8,9]`,
      },
      {
        detail:'Counting Sort 和 Radix Sort 是非比較排序，可突破 O(n log n) 下界。Counting Sort 適合值域小的整數；Radix Sort 按位數排序，從最低位到最高位（LSD），可處理更大的值域。',
        code:`# Counting Sort - 整數，值域 [0, k]
def counting_sort(arr, k=None):
    if not arr: return arr
    if k is None: k = max(arr)
    count = [0] * (k + 1)
    for x in arr: count[x] += 1
    # prefix sum for stability
    for i in range(1, k + 1): count[i] += count[i-1]
    result = [0] * len(arr)
    for x in reversed(arr):  # reversed 保證穩定
        count[x] -= 1
        result[count[x]] = x
    return result

# Radix Sort - 正整數
def radix_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for x in arr: count[(x // exp) % 10] += 1
    for i in range(1, 10): count[i] += count[i-1]
    for x in reversed(arr):
        idx = (x // exp) % 10
        count[idx] -= 1
        output[count[idx]] = x
    for i in range(n): arr[i] = output[i]`,
      },
    ],
    variations:[
      {
        detail:'Quick Select 只找第 K 個元素，partition 後只遞迴一側。平均 O(n)，最壞 O(n²) 但用 random pivot 可避免。面試中常被要求在 O(n) 時間找中位數。',
        code:`def find_kth_smallest(arr, k):
    def select(lo, hi, k):
        if lo == hi: return arr[lo]
        pivot_idx = partition(lo, hi)
        rank = pivot_idx - lo + 1
        if rank == k: return arr[pivot_idx]
        elif k < rank: return select(lo, pivot_idx - 1, k)
        else: return select(pivot_idx + 1, hi, k - rank)

    def partition(lo, hi):
        import random
        r = random.randint(lo, hi)
        arr[r], arr[hi] = arr[hi], arr[r]
        pivot = arr[hi]; i = lo
        for j in range(lo, hi):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]; i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        return i

    return select(0, len(arr) - 1, k)`,
      },
      {
        detail:'自訂比較：sort() 的 key 函數比 cmp_to_key 更高效。常見場景：多欄位排序、字串數字混合排序、按自訂規則（如最大數）排序。',
        code:`from functools import cmp_to_key

# 最大數 LeetCode #179
def largest_number(nums):
    def compare(a, b):
        if a + b > b + a: return -1  # a 在前更大
        elif a + b < b + a: return 1
        return 0
    strs = list(map(str, nums))
    strs.sort(key=cmp_to_key(compare))
    result = ''.join(strs)
    return '0' if result[0] == '0' else result

# 多欄位排序（用 tuple key）
students = [{'name':'Bob','age':20,'score':90},
            {'name':'Alice','age':20,'score':85}]
# 分數降序，同分按名字升序
students.sort(key=lambda s: (-s['score'], s['name']))`,
      },
      {
        detail:'合併區間（Merge Intervals）是排序+貪婪的經典組合。先按起始點排序，再掃描合併重疊區間。面試高頻，要熟練。',
        code:`def merge_intervals(intervals):
    if not intervals: return []
    # 按起始點排序
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # 有重疊
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# 相關變形：插入區間 LeetCode #57
def insert_interval(intervals, new_interval):
    result = []
    i, n = 0, len(intervals)
    # 在新區間之前
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i]); i += 1
    # 合併重疊
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    result.extend(intervals[i:])
    return result`,
      },
      {
        detail:'反序對計數（Count Inversions）：利用 Merge Sort 的合併步驟，當右側元素比左側小時計數。這是 Merge Sort 解決分治問題的典型應用。',
        code:`def count_inversions(arr):
    """計算陣列中反序對數量，O(n log n)"""
    def merge_count(arr):
        if len(arr) <= 1: return arr, 0
        mid = len(arr) // 2
        L, lc = merge_count(arr[:mid])
        R, rc = merge_count(arr[mid:])
        merged = []
        inversions = lc + rc
        i = j = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                merged.append(L[i]); i += 1
            else:
                # L[i..end] 都比 R[j] 大，全是反序對
                inversions += len(L) - i
                merged.append(R[j]); j += 1
        merged.extend(L[i:]); merged.extend(R[j:])
        return merged, inversions

    _, total = merge_count(arr)
    return total`,
      },
    ],
  },
},

// ===== Design Patterns =====
{
  id:'design-patterns', title:'設計模式', titleEn:'Design Patterns', category:'advanced', icon:'🏗️', difficulty:'advanced',
  concept:{
    summary:'設計模式（Design Patterns）是軟體工程中解決常見問題的可重用解決方案，由 Gang of Four（GoF）在 1994 年歸納出 23 種模式，分為三大類：創建型（Creational）、結構型（Structural）、行為型（Behavioral）。設計模式不是程式碼，而是解決特定設計問題的思路框架，讓程式碼更靈活、可維護、可擴展。',
    analogy:'設計模式就像建築藍圖：Singleton 像一個城市只有一個市政府；Factory 像工廠生產線，客戶只需說要什麼產品；Observer 像訂閱 YouTube 頻道，新影片自動通知所有訂閱者；Strategy 像導航 App，可隨時切換步行/開車/搭捷運路線而不改變目的地。',
    properties:[
      '創建型（Creational）：處理物件的創建，控制如何實例化物件（Singleton, Factory, Builder, Prototype, Abstract Factory）',
      '結構型（Structural）：處理類別/物件的組合，形成更大的結構（Adapter, Decorator, Facade, Composite, Proxy, Bridge, Flyweight）',
      '行為型（Behavioral）：處理物件之間的通訊與責任分配（Observer, Strategy, Command, Iterator, Template Method, State, Chain of Responsibility...）',
      '設計原則（SOLID）：Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
      '重要：不要過度使用設計模式，簡單問題用簡單解法，設計模式解決的是特定的複雜性',
    ],
    viz:`GoF 23 種設計模式總覽：
┌─────────────────────────────────────────────┐
│ 創建型 Creational (5)                        │
│  Singleton  Factory  Abstract Factory        │
│  Builder    Prototype                        │
├─────────────────────────────────────────────┤
│ 結構型 Structural (7)                        │
│  Adapter    Decorator    Facade              │
│  Composite  Proxy        Bridge    Flyweight │
├─────────────────────────────────────────────┤
│ 行為型 Behavioral (11)                       │
│  Observer   Strategy    Command   Iterator   │
│  Template   State       Chain     Mediator   │
│  Memento    Visitor     Interpreter          │
└─────────────────────────────────────────────┘
面試最常考：Singleton、Factory、Observer、Strategy、Decorator`,
  },
  complexity:[
    {op:'Singleton — 取得實例', time:'O(1)', cls:'on', space:'O(1)'},
    {op:'Factory — 建立物件', time:'O(1)', cls:'on', space:'O(1)'},
    {op:'Observer — 通知所有訂閱者', time:'O(n)', cls:'on', space:'O(n)'},
    {op:'Decorator — 包裝呼叫', time:'O(層數)', cls:'on', space:'O(層數)'},
    {op:'Strategy — 切換策略', time:'O(1)', cls:'on', space:'O(1)'},
    {op:'Command — 執行/撤銷', time:'O(1)', cls:'on', space:'O(n) history'},
  ],
  complexityNote:'設計模式本身複雜度通常不是效能瓶頸，更重要的是正確選用模式解決設計問題',
  space:'O(1)~O(n) 依模式而異',
  code:`# ── Singleton（確保只有一個實例）────────
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.connected = False
        return cls._instance

    def connect(self, url):
        if not self.connected:
            print(f"連接到 {url}")
            self.connected = True

# 使用方式
db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(db1 is db2)  # True，同一個實例

# ── Factory Method（工廠方法）────────────
from abc import ABC, abstractmethod

class Notification(ABC):
    @abstractmethod
    def send(self, message): pass

class EmailNotification(Notification):
    def send(self, message): print(f"Email: {message}")

class SMSNotification(Notification):
    def send(self, message): print(f"SMS: {message}")

class NotificationFactory:
    @staticmethod
    def create(type_: str) -> Notification:
        if type_ == 'email': return EmailNotification()
        if type_ == 'sms': return SMSNotification()
        raise ValueError(f"Unknown type: {type_}")

# ── Observer（觀察者）────────────────────
class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def emit(self, event, *args):
        for cb in self._listeners.get(event, []):
            cb(*args)

emitter = EventEmitter()
emitter.on('login', lambda user: print(f"{user} 登入"))
emitter.emit('login', 'Alice')

# ── Strategy（策略）──────────────────────
class Sorter:
    def __init__(self, strategy):
        self._strategy = strategy

    def set_strategy(self, strategy):
        self._strategy = strategy

    def sort(self, data):
        return self._strategy(data)

sorter = Sorter(sorted)
sorter.set_strategy(lambda x: sorted(x, reverse=True))`,
  interview:{
    howAsked:[
      '實作 Singleton、Factory、Observer 等常見模式（尤其 Singleton 的線程安全）',
      'LeetCode 設計題：LRU Cache、設計 Twitter、設計停車場等',
      '面試官問「你會如何設計 X 系統」時，設計模式是回答的底層思維',
      '識別程式碼中的壞味道（Bad Smells）並說明用哪個模式重構',
      'SOLID 原則解說：開閉原則（對擴展開放、對修改關閉）',
    ],
    patterns:[
      'Singleton：確保只有一個實例，適合資料庫連接、設定管理、日誌記錄器',
      'Factory/Builder：將物件創建邏輯封裝，客戶端不需知道具體類別，適合複雜物件構建',
      'Observer（事件/訂閱）：一對多依賴，狀態改變自動通知，適合事件系統、React 的狀態管理',
      'Strategy：封裝可互換的演算法，適合排序策略、支付方式、路由策略',
    ],
    watchOut:[
      'Singleton 在多線程環境需要加鎖（或用 module-level variable，Python 天然線程安全）',
      '過度使用設計模式：簡單問題強行套用模式會造成 over-engineering',
      'Factory vs Abstract Factory：Factory 創建一種產品，Abstract Factory 創建一族相關產品',
      'Decorator 和 Inheritance 的區別：Decorator 是組合（has-a），更靈活，避免類別爆炸',
    ],
  },
  variations:[
    {name:'Singleton 線程安全版', desc:'多線程環境下 Singleton 需要加鎖，或用 Python 模組級變數天然線程安全', ex:'資料庫連接池、設定管理'},
    {name:'Abstract Factory（抽象工廠）', desc:'創建一族相關產品，如 UI 工廠可創建 Windows 風格或 Mac 風格的所有元件', ex:'跨平台 UI 框架'},
    {name:'Decorator（裝飾器）', desc:'動態添加功能，不修改原始類別，Python @decorator 語法就是此模式的實現', ex:'日誌、快取、認證中間件'},
    {name:'Command + Undo/Redo', desc:'將操作封裝為物件，可存儲、傳遞、撤銷，實現 Undo/Redo 功能', ex:'文字編輯器、交易系統'},
  ],
  quiz:[
    {q:'Singleton 模式的主要目的是什麼？', opts:['加快物件創建速度','確保類別只有一個實例','讓物件可以被複製','提供介面卡功能'], ans:1, exp:'Singleton 確保一個類別在整個程式生命週期中只有一個實例，並提供全局訪問點。適合資料庫連接、設定管理等場景。'},
    {q:'Observer 模式中，被觀察的物件稱為什麼？', opts:['Observer','Subscriber','Subject/Publisher','Listener'], ans:2, exp:'被觀察的物件稱為 Subject（主體）或 Publisher（發布者），觀察者稱為 Observer 或 Subscriber。狀態改變時，Subject 通知所有 Observer。'},
    {q:'下列哪個設計模式最適合「動態地給物件添加功能，且可以疊加多層」？', opts:['Singleton','Factory','Decorator','Adapter'], ans:2, exp:'Decorator 模式通過包裝物件（組合而非繼承）來動態添加功能，且多個 Decorator 可以層層疊加。Python 的 @functools.wraps 就是此模式。'},
    {q:'Factory Method 和 Abstract Factory 的主要區別是？', opts:['Factory Method 更快','Abstract Factory 創建一族相關產品','Factory Method 不能使用多型','Abstract Factory 只能創建一種產品'], ans:1, exp:'Factory Method 創建一種產品的不同變體；Abstract Factory 創建一整族相關產品（如 Mac 風格的 Button、Menu、Dialog 都由同一個工廠創建）。'},
    {q:'SOLID 原則中的「O」代表什麼？', opts:['Object Composition','Open/Closed Principle','Observer Pattern','Optional Dependencies'], ans:1, exp:'Open/Closed Principle（開放封閉原則）：對擴展開放，對修改關閉。新功能應該通過添加新程式碼來實現，而不是修改現有程式碼。'},
  ],
  leetcode:[
    {no:146, title:'LRU Cache', url:'https://leetcode.com/problems/lru-cache/', diff:'Medium', note:'結合 HashMap + Doubly Linked List，測試資料結構設計能力，面試必考'},
    {no:460, title:'LFU Cache', url:'https://leetcode.com/problems/lfu-cache/', diff:'Hard', note:'LFU 比 LRU 複雜，需要維護頻率計數，進階版快取設計'},
    {no:355, title:'Design Twitter', url:'https://leetcode.com/problems/design-twitter/', diff:'Medium', note:'結合 HashMap + Heap，實踐 OOP 設計，測試系統設計基礎'},
    {no:341, title:'Flatten Nested List Iterator', url:'https://leetcode.com/problems/flatten-nested-list-iterator/', diff:'Medium', note:'Iterator 模式的直接實作'},
    {no:284, title:'Peeking Iterator', url:'https://leetcode.com/problems/peeking-iterator/', diff:'Medium', note:'Decorator 模式：在現有 Iterator 上添加 peek 功能'},
    {no:1603, title:'Design Parking System', url:'https://leetcode.com/problems/design-parking-system/', diff:'Easy', note:'基礎 OOP 設計，計數器模式'},
    {no:706, title:'Design HashMap', url:'https://leetcode.com/problems/design-hashmap/', diff:'Easy', note:'從零實作 HashMap，理解底層數據結構'},
    {no:232, title:'Implement Queue using Stacks', url:'https://leetcode.com/problems/implement-queue-using-stacks/', diff:'Easy', note:'Adapter 模式：用 Stack 介面實現 Queue 功能'},
    {no:1396, title:'Design Underground System', url:'https://leetcode.com/problems/design-underground-system/', diff:'Medium', note:'多個 HashMap 組合，測試資料建模能力'},
    {no:895, title:'Maximum Frequency Stack', url:'https://leetcode.com/problems/maximum-frequency-stack/', diff:'Hard', note:'進階設計題，頻率 + 堆疊組合'},
  ],
  refs:[
    {title:'Refactoring.Guru — 設計模式視覺化解說', url:'https://refactoring.guru/design-patterns'},
    {title:'Python Design Patterns', url:'https://python-patterns.guide/'},
    {title:'Head First Design Patterns（書籍）', url:'https://www.oreilly.com/library/view/head-first-design/0596007124/'},
  ],
  en:{
    summary:'Design Patterns are reusable solutions to common software design problems, catalogued by the Gang of Four (GoF) in 1994 into 23 patterns across three categories: Creational (how objects are made), Structural (how classes/objects are composed), and Behavioral (how they communicate). Patterns are blueprints, not code — they represent a design vocabulary for discussing and solving recurring problems.',
    analogy:"Patterns are like architectural blueprints: Singleton is like a city having only one city hall; Factory is like a factory line where customers specify what they want without knowing how it's made; Observer is like YouTube subscriptions — new video auto-notifies all subscribers; Strategy is like a navigation app that can switch walking/driving/transit routes without changing the destination.",
    properties:[
      'Creational patterns: control object creation — Singleton, Factory Method, Abstract Factory, Builder, Prototype',
      'Structural patterns: compose classes/objects into larger structures — Adapter, Decorator, Facade, Composite, Proxy, Bridge, Flyweight',
      'Behavioral patterns: handle communication and responsibility between objects — Observer, Strategy, Command, Iterator, Template Method, State...',
      'SOLID principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
      "Don't over-engineer: simple problems deserve simple solutions — patterns solve specific complexity, not every problem",
    ],
    complexityNote:'Pattern complexity is rarely a performance concern — correctness of choice matters far more than time complexity',
    interview:{
      howAsked:[
        'Implement Singleton, Factory, Observer from scratch (especially thread-safe Singleton)',
        'LeetCode design problems: LRU Cache, Design Twitter, Design Parking System',
        'System design interviews use patterns as foundational vocabulary for design decisions',
        'Identify code smells and name which pattern would refactor them',
        'Explain SOLID principles, especially Open/Closed and Dependency Inversion',
      ],
      patterns:[
        'Singleton: one instance per process — databases, config managers, loggers',
        'Factory/Builder: encapsulate object creation logic — client code stays decoupled from concrete classes',
        'Observer (Event/Pub-Sub): one-to-many dependency, auto-notify on state change — event systems, React state',
        'Strategy: interchangeable algorithms — sort strategies, payment methods, routing policies',
      ],
      watchOut:[
        'Thread-safe Singleton in multi-threaded environments needs locking (Python module-level vars are naturally safe)',
        'Over-engineering: forcing patterns onto simple problems causes unnecessary complexity',
        'Factory vs Abstract Factory: Factory creates one product type; Abstract Factory creates a family of related products',
        'Decorator vs Inheritance: Decorator uses composition (has-a), avoiding class explosion from deep inheritance trees',
      ],
    },
    variations:[
      'Thread-safe Singleton: needs locking in multi-threaded environments, or use Python module-level instance',
      'Abstract Factory: creates a family of related products — e.g., UI factory that creates Windows-style or Mac-style all components',
      'Decorator: dynamically adds behavior via wrapping — Python @decorator syntax is this pattern in action',
      'Command + Undo/Redo: encapsulate operations as objects for storage, transmission, and reversal',
    ],
    quiz:[
      {q:'What is the primary purpose of the Singleton pattern?', opts:['Speed up object creation','Ensure only one instance exists','Allow object cloning','Provide an adapter interface'], exp:'Singleton ensures a class has exactly one instance throughout the program lifetime, with a global access point. Ideal for database connections, config managers, loggers.'},
      {q:'In the Observer pattern, what is the observed object called?', opts:['Observer','Subscriber','Subject/Publisher','Listener'], exp:'The observed object is called the Subject (or Publisher). Observers (Subscribers) register to be notified. When the Subject changes state, it notifies all registered Observers.'},
      {q:'Which pattern best fits "dynamically adding stackable behaviors to an object"?', opts:['Singleton','Factory','Decorator','Adapter'], exp:"Decorator wraps objects (composition over inheritance) to add behavior dynamically, and multiple decorators can be stacked. Python's @functools.wraps is this pattern."},
      {q:'What is the main difference between Factory Method and Abstract Factory?', opts:['Factory Method is faster','Abstract Factory creates a family of related products','Factory Method cannot use polymorphism','Abstract Factory only creates one product'], exp:'Factory Method creates variants of one product type; Abstract Factory creates a whole family of related products (e.g., Mac-style Button, Menu, Dialog all from the same factory).'},
      {q:'What does the "O" in SOLID principles stand for?', opts:['Object Composition','Open/Closed Principle','Observer Pattern','Optional Dependencies'], exp:'Open/Closed Principle: open for extension, closed for modification. New functionality should be added by writing new code, not changing existing code.'},
    ],
    lcNotes:[
      'Combine HashMap + Doubly Linked List — must-know interview design problem',
      'LFU is more complex than LRU, requiring frequency tracking — advanced cache design',
      'Combine HashMap + Heap — tests OOP design and system design fundamentals',
      'Direct implementation of the Iterator design pattern',
      'Decorator pattern: add peek() to an existing Iterator interface',
      'Basic OOP design, counter pattern',
      'Implement HashMap from scratch — understand the underlying data structure',
      'Adapter pattern: implement Queue interface using Stack operations',
      'Multiple HashMaps combined — tests data modeling ability',
      'Advanced design: combine frequency tracking with stack behavior',
    ],
  },
  detail:{
    patterns:[
      {
        detail:'Singleton 三種實現方式：① __new__ 覆寫（基礎）② 模組級變數（Python 推薦，天然線程安全）③ metaclass。面試中考的通常是線程安全版本，需要知道 double-checked locking。',
        code:`# 方式1: __new__ 覆寫
class Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

# 方式2: 線程安全（使用 threading.Lock）
import threading
class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            with cls._lock:  # double-checked locking
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

# 方式3: Python 最 Pythonic — 模組級變數
# config.py
class _Config:
    def __init__(self):
        self.debug = False
        self.db_url = "postgresql://localhost/db"
config = _Config()  # 模組只載入一次，天然 Singleton

# 方式4: 裝飾器版
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Logger:
    def log(self, msg): print(f"[LOG] {msg}")`,
      },
      {
        detail:'Factory Method vs Builder 的選擇：Factory 適合「一步創建物件」；Builder 適合「分步建造複雜物件」，尤其是物件有很多可選參數時。Python 中常用 dataclass + classmethod 或直接用 **kwargs。',
        code:`# Factory Method - 創建不同類型的物件
class Shape:
    def area(self): raise NotImplementedError

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h

def shape_factory(type_, **kwargs):
    shapes = {'circle': Circle, 'rectangle': Rectangle}
    if type_ not in shapes:
        raise ValueError(f"Unknown shape: {type_}")
    return shapes[type_](**kwargs)

c = shape_factory('circle', r=5)
r = shape_factory('rectangle', w=4, h=6)

# Builder - 分步建造複雜物件
class QueryBuilder:
    def __init__(self):
        self._table = None
        self._conditions = []
        self._limit = None

    def from_table(self, table):
        self._table = table; return self

    def where(self, condition):
        self._conditions.append(condition); return self

    def limit(self, n):
        self._limit = n; return self

    def build(self):
        q = f"SELECT * FROM {self._table}"
        if self._conditions:
            q += " WHERE " + " AND ".join(self._conditions)
        if self._limit:
            q += f" LIMIT {self._limit}"
        return q

query = (QueryBuilder()
    .from_table("users")
    .where("age > 18")
    .where("active = true")
    .limit(10)
    .build())`,
      },
      {
        detail:'Observer 模式是事件驅動系統的基礎。Python 中可用 callbacks list 或 weakref 避免記憶體洩漏。現代框架（React、Vue、Django signals）都基於此模式。',
        code:`# 完整 Observer 實作
from typing import Callable, List
from weakref import WeakSet

class Event:
    def __init__(self):
        self._handlers: List[Callable] = []

    def subscribe(self, handler: Callable):
        self._handlers.append(handler)
        return self  # 支援鏈式呼叫

    def unsubscribe(self, handler: Callable):
        self._handlers.remove(handler)

    def emit(self, *args, **kwargs):
        for handler in self._handlers:
            handler(*args, **kwargs)

    # 支援 += 和 -= 語法糖
    __iadd__ = subscribe
    __isub__ = unsubscribe
    __call__ = emit

# 股票價格觀察者
class Stock:
    def __init__(self, symbol, price):
        self.symbol = symbol
        self._price = price
        self.price_changed = Event()

    @property
    def price(self): return self._price

    @price.setter
    def price(self, new_price):
        old = self._price
        self._price = new_price
        self.price_changed(self.symbol, old, new_price)

apple = Stock("AAPL", 150.0)
apple.price_changed += lambda sym, old, new: print(f"{sym}: {old} → {new}")
apple.price = 155.0  # 觸發通知`,
      },
      {
        detail:'Decorator 模式用組合（composition）替代繼承（inheritance），動態添加功能。Python 的 @decorator 語法天然支援此模式。常用於中間件（logging, caching, auth）。',
        code:`import time
import functools

# Python decorator as Decorator pattern
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 耗時 {elapsed:.4f}s")
        return result
    return wrapper

def cache(func):
    memo = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    return wrapper

# 疊加多個 Decorator
@timer
@cache
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

# 類別版 Decorator（GoF 原版）
class Coffee:
    def cost(self): return 10
    def description(self): return "Coffee"

class MilkDecorator:
    def __init__(self, coffee): self._coffee = coffee
    def cost(self): return self._coffee.cost() + 5
    def description(self): return self._coffee.description() + " + Milk"

class SugarDecorator:
    def __init__(self, coffee): self._coffee = coffee
    def cost(self): return self._coffee.cost() + 2
    def description(self): return self._coffee.description() + " + Sugar"

drink = SugarDecorator(MilkDecorator(Coffee()))
print(drink.cost())         # 17
print(drink.description())  # Coffee + Milk + Sugar`,
      },
    ],
    variations:[
      {
        detail:'Strategy 模式將演算法封裝成可互換的物件。Python 中可直接傳遞函數（first-class functions）作為策略，比建立類別更簡潔。',
        code:`# Python 函數式 Strategy（最簡潔）
class DataProcessor:
    def __init__(self, sort_strategy=None, filter_strategy=None):
        self.sort_fn = sort_strategy or sorted
        self.filter_fn = filter_strategy or (lambda x: x)

    def process(self, data):
        return self.sort_fn(self.filter_fn(data))

proc = DataProcessor(
    sort_strategy=lambda d: sorted(d, reverse=True),
    filter_strategy=lambda d: [x for x in d if x > 0]
)
print(proc.process([-1, 3, -2, 5, 1]))  # [5, 3, 1]

# 支付策略（類別版更清晰）
class PaymentStrategy:
    def pay(self, amount): raise NotImplementedError

class CreditCard(PaymentStrategy):
    def pay(self, amount): print(f"Credit card: \${amount}")

class PayPal(PaymentStrategy):
    def pay(self, amount): print(f"PayPal: \${amount}")

class Checkout:
    def __init__(self, strategy: PaymentStrategy):
        self._strategy = strategy
    def process(self, amount):
        self._strategy.pay(amount)`,
      },
      {
        detail:'Command 模式將操作封裝為物件，支援 Undo/Redo、操作佇列、日誌記錄。文字編輯器的撤銷功能、資料庫的事務都是此模式的應用。',
        code:`from abc import ABC, abstractmethod
from collections import deque

class Command(ABC):
    @abstractmethod
    def execute(self): pass
    @abstractmethod
    def undo(self): pass

class TextEditor:
    def __init__(self):
        self.text = ""
        self._history = deque()  # undo stack
        self._redo = deque()     # redo stack

    def execute(self, cmd: Command):
        cmd.execute()
        self._history.append(cmd)
        self._redo.clear()  # 新操作清空 redo

    def undo(self):
        if self._history:
            cmd = self._history.pop()
            cmd.undo()
            self._redo.append(cmd)

    def redo(self):
        if self._redo:
            cmd = self._redo.pop()
            cmd.execute()
            self._history.append(cmd)

class InsertCommand(Command):
    def __init__(self, editor, text):
        self.editor = editor
        self.text = text
        self.position = None

    def execute(self):
        self.position = len(self.editor.text)
        self.editor.text += self.text

    def undo(self):
        self.editor.text = self.editor.text[:self.position]`,
      },
      {
        detail:'Adapter 模式讓不相容的介面能夠合作。常見於整合第三方程式庫、舊系統接口轉換。LeetCode #232 用 Stack 實作 Queue 就是 Adapter 模式。',
        code:`# 介面不相容：老式日誌系統 vs 新介面
class OldLogger:
    def write_log(self, msg, level):
        print(f"[{level.upper()}] {msg}")

class NewLoggerInterface:
    def info(self, msg): raise NotImplementedError
    def error(self, msg): raise NotImplementedError

# Adapter 讓 OldLogger 符合 NewLoggerInterface
class LoggerAdapter(NewLoggerInterface):
    def __init__(self, old_logger: OldLogger):
        self._logger = old_logger

    def info(self, msg):
        self._logger.write_log(msg, 'info')

    def error(self, msg):
        self._logger.write_log(msg, 'error')

# 使用新介面呼叫舊系統
logger = LoggerAdapter(OldLogger())
logger.info("系統啟動")
logger.error("連接失敗")

# LeetCode #232: Queue using Stacks (Adapter)
class MyQueue:
    def __init__(self):
        self.s1, self.s2 = [], []  # s1: push, s2: pop

    def push(self, x): self.s1.append(x)

    def pop(self):
        self._transfer()
        return self.s2.pop()

    def peek(self):
        self._transfer()
        return self.s2[-1]

    def _transfer(self):
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())`,
      },
      {
        detail:'Facade 模式提供簡化的介面給複雜的子系統。常見於 API 設計：隱藏複雜的內部實作，只暴露簡單的對外介面。Django 的 ORM 就是 Facade。',
        code:`# 複雜的影片轉換系統
class VideoFile:
    def __init__(self, filename): self.filename = filename

class CodecFactory:
    def extract(self, file):
        ext = file.filename.split('.')[-1]
        return f"{ext.upper()} Codec"

class BitrateReader:
    @staticmethod
    def read(file, codec): return f"Buffer({file.filename}, {codec})"

class AudioMixer:
    @staticmethod
    def fix(buffer): return f"FixedAudio({buffer})"

class VideoConverter:
    @staticmethod
    def convert(buffer): return f"MP4({buffer})"

# Facade - 隱藏所有複雜性
class VideoConversionFacade:
    def convert(self, filename, target_format):
        file = VideoFile(filename)
        codec = CodecFactory().extract(file)
        buffer = BitrateReader.read(file, codec)
        audio = AudioMixer.fix(buffer)
        result = VideoConverter.convert(audio)
        return result

# 客戶端只需呼叫一個方法
converter = VideoConversionFacade()
video = converter.convert("movie.avi", "mp4")
print(video)`,
      },
    ],
  },
},

// ===== System Design =====
{
  id:'system-design', title:'系統設計', titleEn:'System Design', category:'advanced', icon:'🌐', difficulty:'advanced',
  concept:{
    summary:'系統設計（System Design）是軟體工程師面試中最具挑戰性的環節，考察設計大規模分散式系統的能力。核心主題包括：可擴展性（Scalability）、可用性（Availability）、一致性（Consistency）、資料庫選擇、快取策略、負載均衡、訊息佇列和微服務架構。面試中通常要求在 45 分鐘內設計一個真實系統（如 Twitter、URL 縮短器、YouTube 等）。',
    analogy:'系統設計就像規劃一個城市：負載均衡是交通號誌分流；快取是便利商店（不用每次跑大型超市）；資料庫分片是把居民依區域分到不同戶政事務所；訊息佇列是郵局批次投遞；CDN 是在各地設立分公司；微服務是把大型政府機關拆成專業部門各司其職。',
    properties:[
      'CAP 定理：分散式系統只能同時保證 Consistency（一致性）、Availability（可用性）、Partition Tolerance（分區容錯）三者中的兩個',
      '水平擴展（Horizontal Scaling）vs 垂直擴展（Vertical Scaling）：水平加伺服器，垂直升級硬體',
      '快取策略：Cache-Aside、Write-Through、Write-Behind；快取失效（Cache Invalidation）是最難的問題',
      'SQL vs NoSQL：SQL 強一致性、ACID 交易；NoSQL 高可擴展性、靈活 Schema，分別適合不同場景',
      '面試框架 RESHADED：Requirements → Estimation → Storage → High-level design → APIs → Detailed design → Evaluate → Distinctive features',
    ],
    viz:`系統設計核心概念圖：
┌──────────────────────────────────────────────┐
│              Client (Web/Mobile)              │
└──────────────────┬───────────────────────────┘
                   │ HTTPS
┌──────────────────▼───────────────────────────┐
│           CDN (靜態資源快取)                  │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│         Load Balancer (負載均衡)              │
│      (Round Robin / Least Connections)       │
└──────┬───────────┬───────────┬───────────────┘
       │           │           │
   Server1     Server2     Server3
       │           │           │
┌──────▼───────────▼───────────▼───────────────┐
│              Cache Layer (Redis)              │
│         (讀多寫少場景，毫秒級回應)            │
└──────────────────┬───────────────────────────┘
                   │ Cache Miss
┌──────────────────▼───────────────────────────┐
│         Database (Primary + Replicas)         │
│    Primary: 寫操作  Replicas: 讀操作分流      │
│    Sharding: 按 user_id 水平分片             │
└──────────────────────────────────────────────┘`,
  },
  complexity:[
    {op:'負載均衡（Load Balancing）',   time:'O(1) per request', cls:'on', space:'無狀態'},
    {op:'快取查詢（Cache Lookup）',      time:'O(1) Redis',       cls:'on', space:'記憶體中'},
    {op:'資料庫讀取（DB Read）',         time:'O(log n) indexed', cls:'onlogn', space:'磁碟'},
    {op:'一致性 Hash 路由',             time:'O(log n)',          cls:'onlogn', space:'O(n) ring'},
    {op:'訊息佇列（Message Queue）',     time:'O(1) enqueue',     cls:'on', space:'佇列大小'},
    {op:'資料庫分片（Sharding）',        time:'O(1) route + DB',  cls:'on', space:'分佈式'},
  ],
  complexityNote:'系統設計關注吞吐量（QPS）、延遲（Latency P99）和可用性（99.99% = 52分鐘/年宕機），不只是演算法複雜度',
  space:'依規模估算：1M DAU × 1KB/request = 1 TB/day 量級',
  code:`# ── 估算框架（面試必備）────────────────
"""
系統估算 Cheat Sheet：
• 1M = 10^6, 1B = 10^9
• 1 day = 86,400s ≈ 10^5s
• 1M req/day ÷ 10^5s ≈ 10 QPS
• 1B req/day ≈ 10,000 QPS

Twitter 估算例子：
- DAU: 300M 用戶
- 每人每天發 2 推文 → 700M 推文/天 ≈ 8000 TPS（寫）
- 每人每天讀 100 推文 → 30B 讀/天 ≈ 350,000 QPS（讀）
- 讀:寫 ≈ 100:1，典型讀密集系統
- 每推文 280 bytes × 700M = ~200 GB/天 儲存
"""

# ── 快取策略（Cache Patterns）──────────
import redis
import json

cache = redis.Redis(host='localhost', port=6379)

# Cache-Aside（最常用）
def get_user(user_id: str):
    cache_key = f"user:{user_id}"

    # 1. 先查快取
    cached = cache.get(cache_key)
    if cached:
        return json.loads(cached)

    # 2. 快取未命中，查資料庫
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)

    # 3. 寫入快取（TTL 1 小時）
    cache.setex(cache_key, 3600, json.dumps(user))
    return user

# ── 一致性 Hash（Consistent Hashing）────
import hashlib

class ConsistentHash:
    def __init__(self, nodes, replicas=150):
        self.ring = {}
        self.sorted_keys = []
        for node in nodes:
            for i in range(replicas):
                key = self._hash(f"{node}:{i}")
                self.ring[key] = node
                self.sorted_keys.append(key)
        self.sorted_keys.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_node(self, key):
        h = self._hash(key)
        # 找第一個 >= h 的節點
        import bisect
        idx = bisect.bisect_right(self.sorted_keys, h) % len(self.sorted_keys)
        return self.ring[self.sorted_keys[idx]]

# ── 限流（Rate Limiting）─────────────────
class TokenBucket:
    """令牌桶限流：允許突發流量"""
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  # tokens/second
        self.last_refill = time.time()

    def consume(self, tokens=1):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity,
                         self.tokens + elapsed * self.refill_rate)
        self.last_refill = now
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True  # 允許請求
        return False  # 拒絕請求`,
  interview:{
    howAsked:[
      '設計 URL 縮短器（TinyURL）：最經典入門題，考察 hash、資料庫設計、快取',
      '設計 Twitter/Instagram：考察 Feed 生成（Fan-out on write vs read）、儲存估算',
      '設計 YouTube/Netflix：考察 CDN、影片儲存、串流、轉碼系統',
      '設計 WhatsApp/微信：考察即時訊息、WebSocket、訊息持久化',
      '設計 Uber/Lyft：考察地理位置索引（Geohash/Quadtree）、即時配對、訂閱模式',
    ],
    patterns:[
      'RESHADED 框架：Requirements → Estimation → Storage → High-level → API → Detail → Evaluate → Distinctive',
      'Read-heavy 系統：加快取（Redis）、讀寫分離（Primary/Replica）、CDN 靜態資源',
      'Write-heavy 系統：訊息佇列（Kafka）異步處理、資料庫分片（Sharding by user_id）',
      'Fan-out 策略：Push（寫時散播到 followers）vs Pull（讀時聚合）—— Twitter 用混合策略',
    ],
    watchOut:[
      'CAP 定理陷阱：網路分區（P）在分散式系統中必然存在，只能在 C 和 A 之間選一個',
      '快取一致性：Write-through 保證一致但寫慢；Cache-aside 可能有短暫不一致（Cache Stampede）',
      '資料庫選擇：不要盲目選 NoSQL，SQL 的 ACID 在金融/訂單場景必不可少',
      '單點故障（SPOF）：負載均衡器本身也要高可用（主備 Active-Passive 或 Active-Active）',
    ],
  },
  variations:[
    {name:'URL 縮短器（TinyURL）', desc:'Base62 編碼 7 位 → 62^7 = 3.5T 個短碼；資料庫選 NoSQL（key-value）；快取熱門 URL；301 vs 302 重定向', ex:'系統設計入門必做題'},
    {name:'訊息推播系統（Feed/Timeline）', desc:'Fan-out on Write：發文時推到所有 follower 的 Feed；Fan-out on Read：讀時合併；大 V 帳號用 Pull 避免寫放大', ex:'Twitter/Instagram/微博'},
    {name:'分散式鎖（Distributed Lock）', desc:'Redis SETNX 實作分散式鎖；Zookeeper 臨時節點；注意鎖過期與死鎖問題', ex:'秒殺活動、分散式交易'},
    {name:'事件溯源（Event Sourcing）', desc:'記錄所有狀態變更事件而非最終狀態，可重播所有事件到任意時間點，與 CQRS 模式結合', ex:'金融交易系統、稽核日誌'},
  ],
  quiz:[
    {q:'CAP 定理中，分散式系統在發生網路分區時必須選擇？', opts:['保留一致性和可用性','放棄分區容錯','在一致性和可用性之間二選一','三者都可以保留'], ans:2, exp:'CAP 定理指出：分散式系統中，P（分區容錯）幾乎是必然的前提。當分區發生時，系統只能在 C（強一致性）和 A（高可用性）之間選一個：CP 系統（如 HBase）犧牲可用性保一致；AP 系統（如 Cassandra）犧牲強一致性保可用。'},
    {q:'下列哪種快取策略在寫入資料庫後「同步」更新快取？', opts:['Cache-Aside','Write-Through','Write-Behind','Read-Through'], ans:1, exp:'Write-Through：每次寫入資料庫時同步更新快取，保證快取永遠是最新的，但寫入延遲稍高。Cache-Aside（最常用）是讀時才填入快取，可能有短暫不一致。Write-Behind 是非同步更新，延遲低但有丟失風險。'},
    {q:'設計 Twitter 的 Timeline，為什麼大 V（1億 followers）不使用 Fan-out on Write？', opts:['大 V 不需要 Timeline','寫放大問題：一條推文要寫 1 億個 Feed，IO 成本太高','NoSQL 不支援批次寫入','Feed 不需要即時性'], ans:1, exp:'Fan-out on Write 讓每個 follower 都預先存好 Feed，讀取 O(1) 很快。但大 V 有 1 億 followers，每發一篇要寫 1 億次，「寫放大」問題嚴重。解法：大 V 用 Fan-out on Read（讀時合併），普通帳號用 Fan-out on Write 的混合策略。'},
    {q:'URL 縮短器中使用 Base62 編碼 7 位，能生成多少個不同的短 URL？', opts:['62 億', '7^62 個', '62^7 ≈ 3.5 兆個', '7 × 62 = 434 個'], ans:2, exp:'Base62 = [a-z, A-Z, 0-9] = 62 個字元。7 位長度 → 62^7 ≈ 3.5 × 10^12（3.5 兆）個不同組合。以每秒 1000 個新 URL 計算，可用 100 年以上。'},
    {q:'下列哪個資料庫最適合儲存社交網路的「用戶關注關係」（Graph 結構）？', opts:['MySQL（關聯式）','Redis（Key-Value）','Neo4j（圖資料庫）','Cassandra（寬列）'], ans:2, exp:'圖資料庫（如 Neo4j）原生支援節點和邊的查詢，「找出 A 的朋友的朋友」在 SQL 中需要多次 JOIN，在圖資料庫中只需 1-3 跳遍歷，效能差距數量級。Facebook 使用自研圖資料庫 TAO。'},
  ],
  leetcode:[
    {no:146, title:'LRU Cache', url:'https://leetcode.com/problems/lru-cache/', diff:'Medium', note:'快取設計核心：HashMap + Doubly Linked List，O(1) get/put，系統設計必備'},
    {no:460, title:'LFU Cache', url:'https://leetcode.com/problems/lfu-cache/', diff:'Hard', note:'進階快取：Least Frequently Used，需維護頻率計數和雙層 Map'},
    {no:588, title:'Design In-Memory File System', url:'https://leetcode.com/problems/design-in-memory-file-system/', diff:'Hard', note:'Trie 結構模擬文件系統，考察 OOP 設計和樹形結構'},
    {no:1166, title:'Design File System', url:'https://leetcode.com/problems/design-file-system/', diff:'Medium', note:'路徑解析 + HashMap，文件系統輕量版'},
    {no:642, title:'Design Search Autocomplete System', url:'https://leetcode.com/problems/design-search-autocomplete-system/', diff:'Hard', note:'Trie + 頻率計數 + Top K，搜尋引擎核心'},
    {no:1483, title:'Kth Ancestor of a Tree Node', url:'https://leetcode.com/problems/kth-ancestor-of-a-tree-node/', diff:'Hard', note:'Binary Lifting 技術，分散式系統中的層次查詢'},
    {no:353, title:'Design Snake Game', url:'https://leetcode.com/problems/design-snake-game/', diff:'Medium', note:'佇列 + HashSet 模擬，狀態機設計'},
    {no:1286, title:'Iterator for Combination', url:'https://leetcode.com/problems/iterator-for-combination/', diff:'Medium', note:'Iterator 設計模式，lazy evaluation 概念'},
    {no:281, title:'Zigzag Iterator', url:'https://leetcode.com/problems/zigzag-iterator/', diff:'Medium', note:'多來源輪詢，負載均衡 Round Robin 的縮影'},
    {no:1488, title:'Avoid Flood in The City', url:'https://leetcode.com/problems/avoid-flood-in-the-city/', diff:'Medium', note:'資源排程問題，類似系統中的流量控制'},
  ],
  refs:[
    {title:'System Design Primer（GitHub 最多星的系統設計指南）', url:'https://github.com/donnemartin/system-design-primer'},
    {title:'Designing Data-Intensive Applications（必讀書）', url:'https://dataintensive.net/'},
    {title:'ByteByteGo — 系統設計圖解', url:'https://bytebytego.com/'},
    {title:'High Scalability — 真實系統架構案例', url:'http://highscalability.com/'},
  ],
  en:{
    summary:'System Design is the most challenging part of SWE interviews, testing ability to design large-scale distributed systems. Core topics include: Scalability, Availability, Consistency, database selection, caching strategies, load balancing, message queues, and microservices. Interviews typically ask you to design a real-world system (Twitter, URL shortener, YouTube) in 45 minutes.',
    analogy:'System design is like city planning: load balancers are traffic signals distributing flow; caches are convenience stores (no need to visit the big supermarket each time); database sharding is dividing residents across regional offices by zone; message queues are postal batch delivery; CDN is setting up branch offices locally; microservices is splitting a monolithic government ministry into specialized agencies.',
    properties:[
      'CAP Theorem: distributed systems can only guarantee two of: Consistency, Availability, Partition Tolerance',
      'Horizontal vs Vertical Scaling: horizontal adds more servers; vertical upgrades hardware on existing servers',
      'Cache strategies: Cache-Aside, Write-Through, Write-Behind; cache invalidation is the hardest problem',
      'SQL vs NoSQL: SQL offers strong consistency and ACID; NoSQL offers high scalability and flexible schema',
      'Interview framework RESHADED: Requirements → Estimation → Storage → High-level → API → Detail → Evaluate → Distinctive',
    ],
    complexityNote:'System design focuses on throughput (QPS), latency (P99), and availability (99.99% = 52 min/year downtime) — not just algorithmic complexity',
    interview:{
      howAsked:[
        'Design URL Shortener (TinyURL): classic starter — hashing, DB design, caching',
        'Design Twitter/Instagram: Feed generation (Fan-out on write vs read), storage estimation',
        'Design YouTube/Netflix: CDN, video storage, streaming, transcoding pipeline',
        'Design WhatsApp/Messaging: real-time messages, WebSocket, message persistence',
        'Design Uber/Lyft: geospatial indexing (Geohash/Quadtree), real-time matching',
      ],
      patterns:[
        'RESHADED framework: Requirements → Estimation → Storage → High-level → API → Detail → Evaluate → Distinctive',
        'Read-heavy systems: add cache (Redis), read replicas, CDN for static assets',
        'Write-heavy systems: message queues (Kafka) for async processing, DB sharding by user_id',
        'Fan-out strategy: Push (write-time fanout to followers) vs Pull (read-time aggregation) — Twitter uses hybrid',
      ],
      watchOut:[
        'CAP trap: Partition tolerance is unavoidable in distributed systems — you only choose between C and A',
        'Cache consistency: Write-through guarantees freshness but slows writes; Cache-aside risks Cache Stampede',
        "DB selection: don't blindly choose NoSQL — SQL's ACID is essential for financial/order systems",
        'Single Point of Failure: the load balancer itself needs HA (Active-Passive or Active-Active)',
      ],
    },
    variations:[
      'URL Shortener (TinyURL): Base62 7-char = 62^7 = 3.5T codes; NoSQL key-value store; cache hot URLs; 301 vs 302 redirect',
      'Feed/Timeline System: Fan-out on Write (push to all followers at post time) vs Fan-out on Read (aggregate at read time); celebrities use Pull to avoid write amplification',
      'Distributed Lock: Redis SETNX for distributed locking; Zookeeper ephemeral nodes; watch for lock expiry and deadlock',
      'Event Sourcing: store all state-change events rather than final state; replay events to any point in time; combine with CQRS',
    ],
    quiz:[
      {q:'In CAP theorem, when a network partition occurs, a distributed system must choose between:', opts:['Retain both consistency and availability','Give up partition tolerance','Either consistency or availability','All three can be preserved'], exp:'CAP theorem states: Partition tolerance (P) is practically unavoidable. When partition occurs, choose C (strong consistency) or A (high availability): CP systems (HBase) sacrifice availability for consistency; AP systems (Cassandra) sacrifice strong consistency for availability.'},
      {q:'Which cache strategy synchronously updates the cache after writing to the database?', opts:['Cache-Aside','Write-Through','Write-Behind','Read-Through'], exp:'Write-Through: every database write also updates the cache synchronously, guaranteeing freshness at the cost of higher write latency. Cache-Aside (most common) fills cache on reads and may have brief inconsistency. Write-Behind is async — low latency but at risk of data loss.'},
      {q:'Why does Twitter avoid Fan-out on Write for celebrity accounts with 100M followers?', opts:["Celebrities don't need timelines",'Write amplification: one tweet triggers 100M Feed writes — too costly','NoSQL does not support batch writes','Feeds do not require real-time updates'], exp:"Fan-out on Write pre-populates each follower's Feed for O(1) reads. But a celebrity with 100M followers triggers 100M writes per post — catastrophic write amplification. Solution: celebrities use Fan-out on Read (merge at read time); regular accounts use Fan-out on Write. Twitter uses this hybrid."},
      {q:'A 7-character Base62 URL shortener can generate how many unique short URLs?', opts:['6.2 billion','7^62 URLs','62^7 ≈ 3.5 trillion','7 × 62 = 434'], exp:'Base62 = [a-z, A-Z, 0-9] = 62 characters. 7 digits → 62^7 ≈ 3.5 × 10^12 (3.5 trillion) unique combinations. At 1,000 new URLs/second, this lasts over 100 years.'},
      {q:'Which database best stores social network "follow relationships" (graph structure)?', opts:['MySQL (relational)','Redis (key-value)','Neo4j (graph database)','Cassandra (wide-column)'], exp:'"Friends of friends" queries require multiple JOINs in SQL but only 1-3 hops in a graph database like Neo4j. Performance difference is orders of magnitude. Facebook uses its own graph database TAO for this exact use case.'},
    ],
    lcNotes:[
      'Cache design core: HashMap + Doubly Linked List, O(1) get/put — fundamental system design building block',
      'Advanced cache: Least Frequently Used requires frequency counting and two-level Map structure',
      'Trie structure simulating a file system, tests OOP design and tree traversal',
      'Path parsing + HashMap, lightweight file system',
      'Trie + frequency counting + Top-K, core of search engine autocomplete',
      'Binary Lifting technique for hierarchical queries in distributed systems',
      'Queue + HashSet simulation, state machine design',
      'Iterator design pattern demonstrating lazy evaluation concept',
      'Multi-source round-robin polling — a microcosm of load balancing',
      'Resource scheduling, analogous to traffic control in production systems',
    ],
  },
  detail:{
    patterns:[
      {
        detail:'RESHADED 框架是面試系統設計的黃金解題流程。每個環節都要主動說出來，讓面試官了解你的思考過程。時間分配：Requirements 5分、Estimation 5分、Storage/High-level 15分、API+Detail 15分、Evaluate 5分。',
        code:`"""
RESHADED 系統設計框架：

R - Requirements（需求釐清）
  功能需求：核心功能是什麼？（發推文、讀取 Timeline、搜尋）
  非功能需求：多少 DAU？可用性要求？延遲要求？
  範圍：什麼不在這次設計範圍內？

E - Estimation（規模估算）
  DAU × 每日操作量 → QPS（每秒查詢數）
  資料量 × 保留時間 → 儲存需求
  讀:寫比例 → 決定優化方向

S - Storage（資料庫/儲存選擇）
  SQL：強一致性、複雜 JOIN、ACID（訂單、金融）
  NoSQL：高擴展、簡單查詢、靈活 Schema（用戶資料、推文）
  Blob/Object Store：圖片、影片（S3、GCS）
  Cache：Redis（熱門資料、Session、計數器）
  Search：Elasticsearch（全文搜尋）

H - High-level Design（高層架構圖）
  Client → CDN → Load Balancer → App Servers → Cache → DB

A - APIs（介面設計）
  POST /tweets  { user_id, content } → 201 { tweet_id }
  GET  /timeline?user_id=&limit=&cursor=  → [ tweets ]

D - Detailed Design（深入細節）
  挑 1-2 個核心難點深入討論
  例：Timeline 生成、Fan-out 策略、分片鍵選擇

E - Evaluate（評估與取捨）
  瓶頸在哪裡？如何擴展？
  什麼取捨（CAP、成本、複雜度）？

D - Distinctive（亮點功能）
  Monitoring、Alerting、A/B Testing
  故障轉移（Failover）機制
"""`,
      },
      {
        detail:'快取策略深入解析：Cache-Aside 最通用；Write-Through 最一致；Write-Behind 最快（但有丟失風險）。快取穿透、快取雪崩、快取擊穿是面試必考三大問題。',
        code:`import redis
import json
import time
from threading import Lock

cache = redis.Redis()

# ── Cache-Aside（旁路快取，最常用）─────
def get_user(user_id):
    cached = cache.get(f"user:{user_id}")
    if cached: return json.loads(cached)
    user = db.find(user_id)  # 模擬 DB 查詢
    cache.setex(f"user:{user_id}", 3600, json.dumps(user))
    return user

# ── 防止快取穿透（Cache Penetration）───
# 問題：查詢不存在的資料，每次都打到 DB
# 解法1: 快取空值
def get_with_null_cache(key):
    val = cache.get(key)
    if val == b'NULL': return None   # 快取了不存在
    if val: return json.loads(val)
    result = db.find(key)
    if result is None:
        cache.setex(key, 60, 'NULL')  # 快取空值，TTL 短
    else:
        cache.setex(key, 3600, json.dumps(result))
    return result

# 解法2: Bloom Filter（布隆過濾器）
# 快取所有存在的 key，查詢前先過濾

# ── 防止快取雪崩（Cache Avalanche）─────
# 問題：大量 key 同時過期，流量都打到 DB
# 解法：TTL 加隨機抖動
import random
def set_with_jitter(key, value, base_ttl=3600):
    jitter = random.randint(0, 300)  # 0-5 分鐘隨機
    cache.setex(key, base_ttl + jitter, json.dumps(value))

# ── 防止快取擊穿（Cache Stampede）───────
# 問題：熱點 key 過期瞬間，大量請求同時打 DB
# 解法：互斥鎖（Mutex）
_locks = {}
def get_hot_data(key):
    val = cache.get(key)
    if val: return json.loads(val)

    lock_key = f"lock:{key}"
    if cache.set(lock_key, 1, ex=5, nx=True):  # 搶鎖
        try:
            result = db.find(key)
            cache.setex(key, 3600, json.dumps(result))
            return result
        finally:
            cache.delete(lock_key)
    else:
        time.sleep(0.05)  # 等待鎖釋放
        return get_hot_data(key)`,
      },
      {
        detail:'資料庫分片（Sharding）是水平擴展的關鍵。分片鍵選擇決定資料分布：按 user_id hash 分片最常用，但會有 Hot Spot 問題（大 V 用戶）。一致性 Hash 可減少 resharding 時的資料遷移量。',
        code:`# ── 資料庫分片策略 ─────────────────────
# 方法1: Hash Sharding（最常用）
def get_shard(user_id: int, num_shards: int = 8):
    return user_id % num_shards

# 方法2: Range Sharding（按範圍，適合時序資料）
SHARD_RANGES = [(0, 1000000), (1000001, 2000000), ...]

# 方法3: 一致性 Hash（節點增減時最小化遷移）
import hashlib, bisect

class ConsistentHashRing:
    def __init__(self, nodes=None, replicas=150):
        self.ring = {}
        self.keys = []
        for node in (nodes or []):
            self.add_node(node)

    def _hash(self, key):
        return int(hashlib.sha256(key.encode()).hexdigest(), 16)

    def add_node(self, node):
        for i in range(150):
            h = self._hash(f"{node}:{i}")
            self.ring[h] = node
            bisect.insort(self.keys, h)

    def remove_node(self, node):
        for i in range(150):
            h = self._hash(f"{node}:{i}")
            self.ring.pop(h, None)
            self.keys.remove(h)

    def get_node(self, key):
        if not self.ring: return None
        h = self._hash(key)
        idx = bisect.bisect_right(self.keys, h) % len(self.keys)
        return self.ring[self.keys[idx]]

ring = ConsistentHashRing(["db1", "db2", "db3"])
print(ring.get_node("user_42"))`,
      },
      {
        detail:'URL 縮短器設計：最常見的系統設計入門題。關鍵決策：① 用 MD5/Base62 還是 Counter？② 301（永久）還是 302（臨時）重定向？③ 如何處理衝突？④ 如何做讀取快取？',
        code:`import hashlib
import base64
import string
import random

# ── URL 縮短器核心 ─────────────────────
BASE62 = string.ascii_letters + string.digits  # 62 個字元

def encode_base62(num: int, length=7) -> str:
    """將整數 ID 轉為 Base62 短碼"""
    chars = []
    while num > 0:
        chars.append(BASE62[num % 62])
        num //= 62
    # 補齊到指定長度
    while len(chars) < length:
        chars.append(BASE62[0])
    return ''.join(reversed(chars))

def decode_base62(s: str) -> int:
    """短碼轉回整數"""
    result = 0
    for c in s:
        result = result * 62 + BASE62.index(c)
    return result

# ── 方案1: Counter-based（推薦）─────────
class URLShortener:
    def __init__(self):
        self.counter = 0          # 分散式時用 Redis INCR 或 Snowflake ID
        self.url_db = {}          # short_code → original_url
        self.reverse_db = {}      # original_url → short_code（去重）

    def shorten(self, url: str) -> str:
        if url in self.reverse_db:
            return self.reverse_db[url]  # 去重

        self.counter += 1
        short_code = encode_base62(self.counter)
        self.url_db[short_code] = url
        self.reverse_db[url] = short_code
        return f"https://tinyurl.com/{short_code}"

    def expand(self, short_code: str) -> str:
        # 301: 永久重定向（SEO 好但瀏覽器快取，無法統計點擊）
        # 302: 臨時重定向（每次都打到服務，可統計點擊數）
        return self.url_db.get(short_code)

# ── 方案2: Hash-based ────────────────────
def hash_shorten(url: str) -> str:
    md5 = hashlib.md5(url.encode()).hexdigest()
    # 取前 7 個字元的 Base62 表示（有衝突風險）
    return encode_base62(int(md5[:8], 16))[:7]`,
      },
    ],
    variations:[
      {
        detail:'Twitter Timeline 設計：Fan-out on Write（推模式）vs Fan-out on Read（拉模式）的取捨。寫放大問題：Lady Gaga 有 1 億 followers，每發一篇要寫 1 億次。解法：明星帳號用拉模式，普通帳號用推模式的混合策略。',
        code:`"""
Twitter Timeline 設計 - 混合 Fan-out 策略

數據：
- 300M DAU
- 8000 TPS（推文寫入）
- 350,000 QPS（Timeline 讀取）
- 讀:寫 ≈ 100:1

方案A: Fan-out on Write（推模式）
  優點：讀取 O(1)，直接讀 Redis Sorted Set
  缺點：大 V 發文 → 寫放大（1億次寫入）

方案B: Fan-out on Read（拉模式）
  優點：寫入簡單，只存一份
  缺點：讀時需聚合所有 followee 的推文，延遲高

混合策略（Twitter 實際用法）：
"""
class TimelineService:
    def __init__(self):
        self.redis = redis.Redis()
        self.db = Database()
        self.CELEB_THRESHOLD = 1_000_000  # 百萬粉絲以上為大V

    def post_tweet(self, user_id, content):
        tweet_id = self.db.save_tweet(user_id, content)
        followers = self.db.get_followers(user_id)

        if len(followers) < self.CELEB_THRESHOLD:
            # 普通用戶: Fan-out on Write
            for follower_id in followers:
                key = f"timeline:{follower_id}"
                self.redis.zadd(key, {tweet_id: time.time()})
                self.redis.zremrangebyrank(key, 0, -801)  # 只保留最新800條

    def get_timeline(self, user_id, limit=20):
        # 1. 從 Redis 取預計算的 Timeline（普通用戶的推文）
        tweet_ids = self.redis.zrevrange(f"timeline:{user_id}", 0, limit-1)

        # 2. 找出此用戶關注的大 V 列表
        celebs = self.db.get_followed_celebs(user_id)

        # 3. Fan-out on Read：即時獲取大 V 的最新推文
        celeb_tweets = []
        for celeb_id in celebs[:20]:  # 最多取 20 個大V
            tweets = self.redis.zrevrange(f"user_tweets:{celeb_id}", 0, 9)
            celeb_tweets.extend(tweets)

        # 4. 合併並排序（Merge K sorted lists）
        all_tweets = list(tweet_ids) + celeb_tweets
        return sorted(all_tweets, reverse=True)[:limit]`,
      },
      {
        detail:'限流（Rate Limiting）是 API 設計必備的防護層。常見算法：固定窗口（簡單但有邊界問題）、滑動窗口（精確）、令牌桶（允許突發）、漏桶（平滑輸出）。Redis 是分散式限流的最佳選擇。',
        code:`import time
import redis

r = redis.Redis()

# ── 固定窗口計數器（最簡單）──────────────
def fixed_window_limit(user_id, limit=100, window=60):
    key = f"ratelimit:{user_id}:{int(time.time()) // window}"
    count = r.incr(key)
    if count == 1: r.expire(key, window)
    return count <= limit

# ── 滑動窗口（精確版）────────────────────
def sliding_window_limit(user_id, limit=100, window=60):
    now = time.time()
    key = f"sliding:{user_id}"
    pipe = r.pipeline()
    # 刪除超出窗口的舊請求
    pipe.zremrangebyscore(key, 0, now - window)
    # 加入本次請求
    pipe.zadd(key, {str(now): now})
    # 計算窗口內請求數
    pipe.zcard(key)
    pipe.expire(key, window)
    results = pipe.execute()
    return results[2] <= limit  # 第3個結果是 zcard

# ── 令牌桶（Token Bucket，允許突發）──────
class RedisTokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.refill_rate = refill_rate  # tokens/second

    def consume(self, user_id, tokens=1):
        key = f"bucket:{user_id}"
        now = time.time()

        data = r.hmget(key, ['tokens', 'last_refill'])
        current_tokens = float(data[0] or self.capacity)
        last_refill = float(data[1] or now)

        # 補充令牌
        elapsed = now - last_refill
        current_tokens = min(self.capacity,
                           current_tokens + elapsed * self.refill_rate)

        if current_tokens >= tokens:
            current_tokens -= tokens
            r.hset(key, mapping={'tokens': current_tokens, 'last_refill': now})
            r.expire(key, int(self.capacity / self.refill_rate) + 1)
            return True
        return False`,
      },
      {
        detail:'分散式訊息佇列（Kafka）是處理高吞吐量異步任務的核心。Producer 寫入 Topic，Consumer Group 消費，每個 Partition 只被 Group 中一個 Consumer 消費，實現水平擴展。',
        code:`"""
Kafka 核心概念：
- Topic: 訊息的邏輯分類（如 user_events, payment_events）
- Partition: Topic 的實體分割，實現並行消費
- Consumer Group: 一組消費者共同消費 Topic，每個 Partition 只分給一個 Consumer
- Offset: 消費位置，支援重播（Replay）
- Retention: 訊息保留時間（預設7天），即使消費後不刪除

使用場景：
1. 解耦：訂單服務 → Kafka → 庫存/通知/日誌（各自獨立）
2. 削峰：秒殺活動流量 → Kafka 緩衝 → 訂單處理
3. 事件溯源：記錄所有操作事件，可重播
4. 日誌聚合：多服務日誌 → Kafka → ELK/HDFS

選型對比：
- Kafka: 高吞吐（百萬QPS），持久化，適合日誌/事件流
- RabbitMQ: 低延遲，複雜路由，適合任務佇列
- Redis Streams: 輕量，適合小規模場景
"""

# Python Kafka 示意（kafka-python）
from kafka import KafkaProducer, KafkaConsumer
import json

# Producer 生產者
producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    value_serializer=lambda v: json.dumps(v).encode()
)

def publish_event(event_type, data):
    producer.send('user-events', {
        'type': event_type,
        'data': data,
        'timestamp': time.time()
    })

# Consumer 消費者
consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['kafka:9092'],
    group_id='notification-service',
    value_deserializer=lambda v: json.loads(v.decode())
)

def process_events():
    for msg in consumer:
        event = msg.value
        if event['type'] == 'user_registered':
            send_welcome_email(event['data']['email'])
        elif event['type'] == 'purchase':
            send_receipt(event['data'])`,
      },
      {
        detail:'WebSocket 與長輪詢（Long Polling）的選擇：即時聊天用 WebSocket（雙向、低延遲）；通知系統可用 SSE（Server-Sent Events，單向、更簡單）；不支援 WebSocket 的場景用 Long Polling。',
        code:`# ── WebSocket 聊天室（FastAPI 示例）────
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict, List

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        # room_id → [websocket connections]
        self.rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, room_id: str, ws: WebSocket):
        await ws.accept()
        self.rooms.setdefault(room_id, []).append(ws)

    def disconnect(self, room_id: str, ws: WebSocket):
        if room_id in self.rooms:
            self.rooms[room_id].remove(ws)

    async def broadcast(self, room_id: str, message: str, sender: WebSocket):
        for ws in self.rooms.get(room_id, []):
            if ws != sender:
                await ws.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(ws: WebSocket, room_id: str):
    await manager.connect(room_id, ws)
    try:
        while True:
            data = await ws.receive_text()
            await manager.broadcast(room_id, data, ws)
    except WebSocketDisconnect:
        manager.disconnect(room_id, ws)

# ── 多伺服器時用 Redis Pub/Sub 同步 ──────
# 問題：用戶A在 Server1，用戶B在 Server2，如何通訊？
# 解法：Server1 publish → Redis → Server2 subscribe → ws.send`,
      },
    ],
  },
},
];
