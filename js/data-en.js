// English translations for all 17 DSA topics
// Structure: EN_DATA[topicId] = { summary, analogy, properties[], complexityNote,
//   interview: { howAsked[], patterns[], watchOut[] },
//   variations: [desc, ...],   // parallel to t.variations (desc only)
//   quiz: [{ q, opts[], exp }], // parallel to t.quiz (5 per topic)
//   lcNotes: [note, ...]        // parallel to t.leetcode (note only)
// }

const EN_DATA = {

// ─── Array ────────────────────────────────────────────────────────────────────
'array': {
  summary: 'An array is the most fundamental data structure — it stores elements of the same type in contiguous memory, allowing any element to be accessed directly via its index.',
  analogy: 'Think of cinema seats: every seat has a fixed number (index), so when you say "Row 3, Seat 5" the usher takes you there instantly without checking from Seat 1. Memory address = base address + index × element size.',
  properties: [
    'Elements are stored contiguously in memory — excellent CPU cache performance',
    'Random Access: retrieve any element by index in O(1)',
    'Static arrays have fixed size; dynamic arrays (Python list) grow automatically',
    'Inserting/deleting in the middle requires shifting all subsequent elements — O(n)',
    'Supports 2D and multi-dimensional arrays (matrices)',
  ],
  complexityNote: '* Dynamic array expansion is O(n) when resizing, but amortized average is still O(1) per append.',
  interview: {
    howAsked: [
      'k-Sum problems (Two Sum, Three Sum): sort + two pointers, handle duplicates',
      'Subarray problems: Maximum Subarray (Kadane), fixed/variable sliding window',
      'In-place modification: move zeroes, remove duplicates, sort colors (Dutch National Flag)',
      'Prefix Sum: range queries, subarray sum equals K',
      'Matrix traversal: spiral order, diagonal, binary search in matrix',
    ],
    patterns: [
      'Two Pointers (l/r from both ends, shrink toward center — works on sorted arrays)',
      'Fast/Slow Pointers (fast moves 2 steps — find midpoint or detect cycles)',
      'Prefix Sum (precompute to answer any range-sum query in O(1))',
      'Write Pointer (track next write position for in-place modification)',
    ],
    watchOut: [
      'Edge cases: empty array, single element, all identical elements',
      'Python slicing creates a copy (O(k)), not a reference',
      'Always initialize 2D arrays with list comprehension, not [[0]*n]*m (shared rows!)',
      'Clarify: is the input sorted? Can you modify the array in place?',
    ]
  },
  variations: [
    'Preprocess the array so any range sum can be answered in O(1). Great for repeated queries.',
    'Apply +/- to an entire range in O(1) using a difference array, then reconstruct.',
    'Last element wraps to the front; use index % n to handle boundary.',
    'Avoid O(n) extra space: use a write pointer to overwrite matching elements in place.',
  ],
  quiz: [
    { q: 'What is the amortized time complexity of appending to a dynamic array?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], exp: 'Although occasional resizing costs O(n), amortized analysis spreads that cost over all inserts — the average per append is O(1).' },
    { q: 'Which operation has the worst-case performance on a Python list?',
      opts: ['arr[i] (read)', 'arr.append(x)', 'arr.insert(0, x)', 'len(arr)'], exp: 'insert(0, x) shifts all n elements right, costing O(n). The other three are O(1).' },
    { q: 'Which code has a bug when initializing a 3×3 zero matrix?',
      opts: ['[[0]*3 for _ in range(3)]', '[[0,0,0],[0,0,0],[0,0,0]]', '[[0]*3]*3', '[([0]*3)[:] for _ in range(3)]'], exp: '[[0]*3]*3 makes all three rows the same list object! Changing matrix[0][0] also changes matrix[1][0].' },
    { q: 'Given prefix[i] = sum(nums[0..i-1]), what computes the sum of nums[2..4]?',
      opts: ['prefix[4] - prefix[2]', 'prefix[5] - prefix[2]', 'prefix[4] - prefix[1]', 'prefix[5] - prefix[3]'], exp: 'Range [l, r] sum = prefix[r+1] - prefix[l]. So nums[2..4] = prefix[5] - prefix[2].' },
    { q: 'What is the worst-case complexity of Two Pointers on a sorted array for Two Sum?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], exp: 'Both pointers advance at least once each step, traversing at most n steps total — O(n), much better than the brute-force O(n²).' },
  ],
  lcNotes: [
    'Classic hash-table + array entry problem',
    'One-pass: track minimum value seen so far on the left',
    'Use a set to detect duplicates in O(n)',
    'Write-pointer template for in-place modification',
    'Left-product × right-product; no division allowed',
    "Kadane's Algorithm classic — track current and global max",
    'Two pointers; always move the side with the smaller height',
    'Sort + two pointers + skip duplicates for zero-sum triplets',
    'Prefix sum + HashMap to count subarrays summing to k',
    'Two pointers or prefix-max arrays — high-frequency Hard interview question',
  ]
},

// ─── Linked List ──────────────────────────────────────────────────────────────
'linked-list': {
  summary: 'A linked list is a sequence of nodes where each node stores data and a pointer to the next node. Nodes do not need to be stored contiguously in memory.',
  analogy: 'Like a treasure-hunt chain: each clue tells you the current location and where the next clue is. You must follow from the start — you cannot jump directly to clue n.',
  properties: [
    'Dynamic size: insert/delete any time without pre-allocating memory',
    'Nodes are scattered in memory and linked via pointers',
    'No random access: reaching the nth element requires traversing from the head — O(n)',
    'Insert/delete at a known pointer position: O(1); finding that position: O(n)',
    'Variants: Singly, Doubly, Circular linked lists',
  ],
  complexityNote: 'Inserting/deleting with a direct pointer reference is O(1), but locating the node by value or index first costs O(n).',
  interview: {
    howAsked: [
      'Fast/slow pointer: detect cycle, find cycle entry, find midpoint',
      'Reverse a list (iteratively or recursively) — core skill',
      'Merge two sorted lists, merge K sorted lists',
      'LRU Cache: doubly linked list + HashMap for O(1) get/put',
      'Remove Nth node from end using two pointers offset by N',
    ],
    patterns: [
      'Dummy head node: avoids special-casing the head during insert/delete',
      'Fast/Slow pointers: slow moves 1 step, fast moves 2 — detect cycle or find mid',
      'Iterative reversal: maintain prev/curr/next pointers',
      'Two-pointer offset: advance the first pointer by k steps, then move both together',
    ],
    watchOut: [
      'Null pointer dereference — always check head/node is not None before accessing .next',
      'Losing the list by overwriting .next before saving it',
      'Forgetting to update the tail in doubly linked list operations',
      'Cycle detection: Floyd\'s algorithm requires understanding two loops',
    ]
  },
  variations: [
    'Each node has prev and next pointers — O(1) bidirectional traversal and deletion. Core of LRU Cache.',
    'The last node points back to the head — used in round-robin scheduling.',
    'Find midpoint, detect cycle, find cycle entry, find the kth node from the end.',
    'Reverse every k nodes; if remaining nodes < k, leave them as-is.',
  ],
  quiz: [
    { q: 'What is the time complexity of inserting a node after a given node (pointer provided)?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], exp: 'With the pointer already in hand, you only need to update two .next pointers — O(1). Finding the node by value is the O(n) part.' },
    { q: 'Which technique detects a cycle in a linked list in O(n) time and O(1) space?',
      opts: ['Use a HashSet to record visited nodes', "Floyd's fast/slow pointer", 'Reverse the list and compare', 'Count all nodes'], exp: "Floyd's algorithm uses two pointers moving at different speeds. If there's a cycle they meet inside it — O(n) time, O(1) space." },
    { q: 'What is a dummy head node used for?',
      opts: ['Saves memory', 'Avoids special-casing when the head might change', 'Makes the list circular', 'Improves search speed'], exp: 'A dummy head (sentinel) sits before the real head. Operations on every node use the same code path, eliminating edge cases around modifying the head.' },
    { q: 'To delete the Nth node from the end, how far ahead should the first pointer be?',
      opts: ['N-1 steps', 'N steps', 'N+1 steps', '2N steps'], exp: 'Advance the first pointer N steps. When the first pointer reaches the end, the second pointer is at the (N+1)th node from the end — making it easy to delete the Nth.' },
    { q: 'Which data structure implements LRU Cache with O(1) get and put?',
      opts: ['Array + Binary Search', 'Doubly Linked List + HashMap', 'Singly Linked List + Queue', 'BST + Stack'], exp: 'HashMap gives O(1) lookup; doubly linked list gives O(1) move-to-front and deletion. Together they achieve O(1) for all operations.' },
  ],
  lcNotes: [
    'Fundamental cycle detection with fast/slow pointers',
    'Classic iterative reversal — must master',
    'Merge two sorted lists with a dummy head node',
    'Two-pointer offset by N to find the node before the target',
    'Divide-and-conquer or priority queue for merging K lists',
    'Reorder by splitting at mid then interleaving',
    'LRU Cache: doubly linked list + HashMap template',
    'Find the mid with slow/fast, reverse second half, merge',
    'Find cycle entry: after Floyd meets, reset one pointer to head',
    'Reverse k nodes at a time — test of precise pointer manipulation',
  ]
},

// ─── Stack ────────────────────────────────────────────────────────────────────
'stack': {
  summary: 'A stack is a Last-In-First-Out (LIFO) data structure. Only the top element can be accessed at any time. Python uses a list as a stack.',
  analogy: 'Like a stack of plates: you always put new plates on top and take from the top. The last plate placed is the first one removed.',
  properties: [
    'LIFO order: last in, first out',
    'Only the top element is accessible — push and pop are O(1)',
    'Python list is used as a stack: append() to push, pop() to remove from top',
    'Call stack, undo/redo, browser history all use this principle',
    'Monotonic stack maintains an increasing or decreasing order for range queries',
  ],
  complexityNote: 'Push and pop are both O(1). Searching for an arbitrary element requires O(n).',
  interview: {
    howAsked: [
      'Bracket matching: push open brackets, pop and verify on closing brackets',
      'Monotonic stack: "next greater element", "daily temperatures"',
      'Min Stack / Max Stack: maintain an auxiliary stack for O(1) min/max',
      'Evaluate arithmetic expressions: convert to postfix and evaluate',
      'Simulate recursion: convert any DFS to iterative using explicit stack',
    ],
    patterns: [
      'Bracket matching: push when open, pop and validate when closed',
      'Monotonic stack: pop elements that violate the monotonic order — O(n) overall',
      'Auxiliary stack: parallel stack tracks current min/max — O(1) query',
      'Two-stack queue: one stack for push, one for pop — amortized O(1)',
    ],
    watchOut: [
      'Check if the stack is empty before calling pop() — raises IndexError',
      'Monotonic stack direction: increasing or decreasing determines which problem it solves',
      'After bracket matching, the stack must be empty at the end for full validity',
      'In two-stack queue, only transfer when the output stack is empty',
    ]
  },
  variations: [
    'Maintain a strictly increasing or decreasing stack — O(n) answers for "next greater element" type problems.',
    'A secondary stack mirrors the main stack and holds current min/max — O(1) retrieval.',
    'Two stacks simulate FIFO: push into stack A, pop from B (refill from A when B is empty) — amortized O(1).',
    'Open brackets push, close brackets pop and compare — covers nested and mixed bracket types.',
  ],
  quiz: [
    { q: 'What is the time complexity of push and pop on a stack?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], exp: 'Stack push and pop only touch the top element — no shifting needed — so both are O(1).' },
    { q: 'A monotonic stack processes n elements; what is the total time complexity?',
      opts: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'], exp: 'Each element is pushed and popped at most once, so the total work is O(n) even though there is a nested loop.' },
    { q: 'Which problem is NOT typically solved with a stack?',
      opts: ['Valid Parentheses', 'Daily Temperatures', 'Binary Search', 'Min Stack'], exp: 'Binary search works on sorted arrays or ranges — it has nothing to do with LIFO order and does not use a stack.' },
    { q: 'How do you implement a queue using two stacks?',
      opts: ['Always keep both stacks sorted', 'Push to stack A; pop from B, refilling B from A when B is empty', 'Alternate pushing between the two stacks', 'Use one stack for even and one for odd indices'], exp: 'Stack A receives all enqueues. Dequeue pops from B; if B is empty, transfer all of A into B first. Each element moves at most twice — amortized O(1).' },
    { q: 'After processing "({[]})", what should the stack contain?',
      opts: ['Empty', '(', '{', '['], exp: 'Every open bracket is matched by a close bracket in correct order, so all push operations are followed by matching pops — the stack ends up empty, confirming the string is valid.' },
  ],
  lcNotes: [
    'Essential bracket-matching template — start here',
    'O(n) with monotonic stack; naive is O(n²)',
    'Auxiliary stack holds minimum so far — O(1) getMin()',
    'Monotonic stack stores indices for width calculation',
    'Number-based stack: O(4n) total push/pop operations',
    'Classic iterative DFS to collect leaves in the right order',
    'Each character goes through at most 2 stacks — O(n)',
    'Decode nested patterns: count × stack + string stack',
    'Simulate stock span: monotonic stack of (price, span) pairs',
    'Monotonic stack finds next-smaller; then span = right_boundary - left_boundary - 1',
  ]
},

// ─── Queue ────────────────────────────────────────────────────────────────────
'queue': {
  summary: 'A queue is a First-In-First-Out (FIFO) data structure. Elements join at the back and leave from the front. Python uses collections.deque for efficient queue operations.',
  analogy: 'Like a line at a ticket counter: the first person in line is the first served. New arrivals join the back. Perfectly fair ordering.',
  properties: [
    'FIFO order: first in, first out',
    'Enqueue at the back, dequeue from the front — both O(1) with deque',
    'Python list.pop(0) is O(n); always use collections.deque for queues',
    'BFS (Breadth-First Search) relies on a queue for level-by-level expansion',
    'Priority Queue (heapq) retrieves the highest-priority element, not strictly FIFO',
  ],
  complexityNote: 'Use collections.deque for O(1) appendleft/popleft. list.pop(0) is O(n) due to element shifting.',
  interview: {
    howAsked: [
      'BFS on trees: level-order traversal, zigzag traversal',
      'BFS on graphs: shortest path in unweighted graph, number of islands',
      'Multi-source BFS: all sources enqueued at level 0 simultaneously',
      'Task scheduling: process tasks in arrival order',
      'Sliding window maximum: monotonic deque maintains max in O(1)',
    ],
    patterns: [
      'BFS skeleton: enqueue start, while queue not empty — dequeue, process, enqueue neighbors',
      'Level separator: track queue size before processing each level',
      'Monotonic deque: remove from back if new element breaks monotonicity',
      'Visited set: mark nodes when enqueued, not when dequeued, to avoid duplicates',
    ],
    watchOut: [
      'Use deque, never list, for queue operations in Python',
      'Mark nodes as visited when they are enqueued, not dequeued — avoids re-processing',
      'BFS gives shortest path only on unweighted graphs; use Dijkstra for weighted',
      'Do not modify a set/graph while iterating over it during BFS',
    ]
  },
  variations: [
    'Monotonic deque maintains window max/min — when the front falls out of the window, pop it; pop back if new element is larger/smaller.',
    'Fixed-size array queue: use (front % n) and (back % n) to wrap around.',
    'Each pop returns the element with the highest priority — implemented with heapq in Python.',
    'Edge weights 0 or 1: use deque instead of priority queue for O(V+E) performance.',
  ],
  quiz: [
    { q: 'Why use collections.deque instead of a list as a queue in Python?',
      opts: ['deque uses less memory', 'deque.popleft() is O(1) vs list.pop(0) O(n)', 'deque can hold more elements', 'deque is thread-safe'], exp: 'list.pop(0) shifts every remaining element one position left — O(n). deque.popleft() is a pointer change — O(1). Always use deque for queues.' },
    { q: 'BFS finds the shortest path on which type of graph?',
      opts: ['Weighted directed graph', 'Unweighted graph', 'Negative-weight graph', 'Complete graph'], exp: 'BFS explores nodes level by level, so the first time a node is reached it is via the fewest edges — the shortest path on unweighted graphs.' },
    { q: 'In BFS, when should you mark a node as visited?',
      opts: ['When dequeued', 'When enqueued', 'After processing all neighbors', 'Never — only track the queue'], exp: 'Mark as visited when enqueued. Marking at dequeue time can add the same node to the queue multiple times before it is processed.' },
    { q: 'What does a monotonic deque maintain?',
      opts: ['All elements in sorted order', 'A decreasing (or increasing) order, discarding stale elements', 'FIFO order', 'Fixed-size window elements only'], exp: 'A monotonic deque keeps elements in monotonic order. When a new element is added, back elements that violate the order are removed — giving O(1) window max/min.' },
    { q: 'Multi-source BFS puts multiple starting nodes in the queue at level 0. What is the result?',
      opts: ['Only finds paths from the first source', 'Finds the shortest distance from each node to its nearest source', 'Runs slower than single-source BFS', 'Can only handle trees, not graphs'], exp: 'All sources start at level 0. BFS then naturally computes the minimum distance from every node to its closest source in O(V+E).' },
  ],
  lcNotes: [
    'BFS level-order — build each level from queue size snapshot',
    'BFS with (row, col) pairs for 4-directional grid search',
    'BFS for shortest transformation path — word-to-word',
    'Simulate process execution in FIFO order',
    'Design circular queue with array + two pointers',
    'Multi-source BFS: all rotten oranges at level 0',
    'Monotonic deque to get window max in O(n)',
    'BFS with visited set to avoid revisiting states',
    'Two queues or level-size trick for zigzag BFS',
    'Multi-source BFS from all 0 cells simultaneously',
  ]
},

// ─── Hash Table ───────────────────────────────────────────────────────────────
'hash-table': {
  summary: 'A hash table maps keys to values via a hash function for O(1) average-case lookups, insertions, and deletions. Python dict and set are hash tables.',
  analogy: 'Like a library\'s card catalog: you look up a book\'s call number (hash), then go directly to that shelf. No need to scan every shelf — O(1) access.',
  properties: [
    'Average O(1) insert, delete, and lookup; worst case O(n) with hash collisions',
    'A hash function converts any key into a fixed-range bucket index',
    'Collision resolution: chaining (linked list per bucket) or open addressing (probing)',
    'Python dict preserves insertion order (since Python 3.7)',
    'Load factor > 0.75 triggers resizing to keep performance near O(1)',
  ],
  complexityNote: 'Average O(1); worst case O(n) if all keys hash to the same bucket (very rare with a good hash function).',
  interview: {
    howAsked: [
      'Counting frequency: character count, word count, element grouping',
      'Two Sum pattern: store complement/visited values in a dict for O(1) lookup',
      'Group Anagrams: use sorted-string or char-count tuple as key',
      'Sliding window + HashMap: maintain frequency counts in a window',
      'Graph / Union-Find problems that need id → list mapping',
    ],
    patterns: [
      'Counter pattern: freq[x] = freq.get(x, 0) + 1 — count occurrences',
      'Two Sum pattern: check dict for complement before inserting current element',
      'Canonical key: transform elements to a normalized form (e.g. sorted tuple) as key',
      'Prefix sum + HashMap: track prefix sums seen so far to answer subarray queries',
    ],
    watchOut: [
      'dict keys must be hashable: integers, strings, tuples — but NOT lists or dicts',
      'Use collections.defaultdict to avoid KeyError on missing keys',
      'dict.get(key, default) is safer than dict[key] for optional lookups',
      'Counter from collections is a convenient subclass for frequency counting',
    ]
  },
  variations: [
    'Store prefix sums as keys to find subarrays summing to K in O(n). Pairs with Two Sum pattern.',
    'Maintain a frequency HashMap inside a sliding window for longest/shortest substring problems.',
    'Maintain key→value and value→key simultaneously for O(1) lookup in both directions.',
    'HashMap + doubly linked list: O(1) get, put, and eviction. Core of LRU and LFU Cache.',
  ],
  quiz: [
    { q: 'What is the average time complexity of a hash table lookup?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], exp: 'A good hash function distributes keys uniformly, making average lookup O(1). Collisions are rare and kept bounded by the load factor.' },
    { q: 'Why can\'t you use a Python list as a dict key?',
      opts: ['Lists are too large', 'Lists are not hashable (mutable)', 'Lists have no comparison operator', 'Python does not support it for performance reasons'], exp: 'Dict keys must be hashable — their hash value must not change. Lists are mutable; changing an element would silently break the hash table.' },
    { q: 'Two Sum: given an unsorted array, find two indices that sum to target. Best approach?',
      opts: ['Sort + binary search O(n log n)', 'Brute force O(n²)', 'Single pass with HashMap O(n)', 'Divide and conquer O(n log n)'], exp: 'Store each element and its index in a dict. For each new element, check if (target - element) is already in the dict — one pass, O(n).' },
    { q: 'What is the key trick for "Group Anagrams"?',
      opts: ['Sort the entire list', 'Use sorted word as dict key so all anagrams share the same key', 'Count vowels only', 'Compare every pair O(n²)'], exp: 'Sorting each word produces the same string for all anagrams. Use this as a dict key to group them in O(n · k log k) total.' },
    { q: 'How does "Subarray Sum Equals K" use a hash table?',
      opts: ['Hash each element individually', 'Store prefix sums seen so far; look up (current_prefix - k)', 'Sort then use two pointers', 'Use a set to track duplicates'], exp: 'prefix_sum[i] - prefix_sum[j] = k means the subarray [j+1..i] sums to k. Store how many times each prefix sum has appeared and look up (current - k) each step.' },
  ],
  lcNotes: [
    'Hash table entry point: complement lookup in O(n)',
    'Sliding window + set: remove left char when duplicate found',
    'Sort chars → tuple as key to group anagrams together',
    'Group strings by their sorted character tuple',
    'Prefix sum + HashMap: count(prefix - k) at each step',
    'Track seen characters; detect first char with count = 1',
    'Isomorphic: map s→t and t→s simultaneously to verify bijection',
    'Rolling hash or sorted-key check for each consecutive k-length window',
    'LRU: doubly linked list + HashMap, move-to-front on access',
    'Count each character; check half-counts for palindrome property',
  ]
},

// ─── Binary Tree / BST ────────────────────────────────────────────────────────
'tree': {
  summary: 'A binary tree is a hierarchical structure where each node has at most two children (left and right). A BST adds the invariant: left < root < right, enabling O(log n) search when balanced.',
  analogy: 'Like a company org chart: the CEO is at the top, each manager has at most two direct reports. To find a specific employee, start at the CEO and follow the org structure downward.',
  properties: [
    'Each node has at most two children: left and right',
    'BST invariant: all left subtree values < root < all right subtree values',
    'Balanced BST (AVL, Red-Black) guarantees O(log n) height',
    'Unbalanced BST degrades to O(n) (essentially a linked list)',
    'Three DFS orders: preorder (root→left→right), inorder (left→root→right), postorder (left→right→root)',
  ],
  complexityNote: 'BST operations are O(log n) when balanced, O(n) worst case (skewed tree). Most interview problems assume a balanced tree.',
  interview: {
    howAsked: [
      'Tree traversal: DFS (recursive/iterative), BFS level-order',
      'BST operations: insert, delete, validate, kth smallest',
      'Path problems: max path sum, path equals target, diameter',
      'Lowest Common Ancestor (LCA) — appears in many problems',
      'Tree construction: from traversal sequences, serialize/deserialize',
    ],
    patterns: [
      'DFS with return value: compute left/right subtree info, combine at root — path sum, diameter',
      'BST inorder = sorted sequence: use for kth smallest, validate BST',
      'Level BFS: snapshot queue size before each level to group by level',
      'Pass constraints top-down: valid BST uses (min_val, max_val) bounds',
    ],
    watchOut: [
      'Null subtree is a valid tree — always handle None before accessing .left/.right',
      'BST validation requires global min/max bounds, not just parent comparison',
      'Path problems can pass through any node — not just root-to-leaf',
      'Symmetric/mirror tree: compare left.left vs right.right and left.right vs right.left',
    ]
  },
  variations: [
    'Compute left and right subtree values first, then combine at the root to update the answer. Covers path sum, diameter, and balance checking.',
    'BST inorder traversal produces a sorted sequence — solve kth smallest, validate BST, and recover BST in O(n).',
    'Preorder traversal + null markers uniquely reconstruct the tree. Use a queue of tokens to rebuild.',
    'Given preorder + inorder (or postorder + inorder), the root position in inorder splits left and right subtrees.',
  ],
  quiz: [
    { q: 'What is the time complexity of searching a balanced BST?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], exp: 'Each comparison eliminates half the remaining tree. A balanced BST has height O(log n), so search, insert, and delete are all O(log n).' },
    { q: 'Which traversal of a BST produces elements in sorted order?',
      opts: ['Preorder', 'Inorder', 'Postorder', 'Level-order'], exp: 'Inorder (left → root → right) visits BST nodes in ascending order because of the BST invariant: left < root < right.' },
    { q: 'Why is passing (min_val, max_val) bounds necessary to validate a BST?',
      opts: ['For memory efficiency', 'Comparing only with the parent misses violations inherited from ancestors', 'To handle duplicates', 'BFS requires bounds'], exp: 'A node in the left subtree must be less than ALL ancestors above it, not just its direct parent. Passing inherited bounds catches violations at any depth.' },
    { q: 'What is the time complexity of finding the Lowest Common Ancestor in a BST?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], exp: 'In a BST, follow the path: if both p and q are smaller than root, go left; if both larger, go right; otherwise the current node is the LCA. O(h) = O(log n) for balanced.' },
    { q: 'What is the diameter of a binary tree?',
      opts: ['Total number of nodes', 'Height of the tree', 'Longest path between any two nodes (in terms of edges)', 'Number of leaf nodes'], exp: 'The diameter is the longest path between any two nodes. It may not pass through the root. At each node: diameter candidate = left_height + right_height.' },
  ],
  lcNotes: [
    'Foundation: iterative or recursive inorder traversal',
    'Recursive: return max(left, right) + 1',
    'Symmetric: compare mirror image subtrees simultaneously',
    'BFS with level-size snapshot',
    'DFS with path list; backtrack after each branch',
    'BST: use inherited (min, max) bounds for validation',
    'Tree DP: left_gain + right_gain at each node for max path',
    'LCA: split condition — one in left, one in right',
    'BFS level-by-level with deque; alternate direction flag',
    'Queue with delimiters or level-size counting for right view',
  ]
},

// ─── Heap / Priority Queue ────────────────────────────────────────────────────
'heap': {
  summary: 'A heap is a complete binary tree satisfying the heap property: the parent is always ≤ (min-heap) or ≥ (max-heap) all children. It enables O(1) peek at the minimum/maximum and O(log n) insert/remove.',
  analogy: 'Like an emergency room triage system: regardless of arrival order, the most critical patient is always treated first. Internally the patients are arranged in a priority tree.',
  properties: [
    'Complete binary tree stored as an array: children of index i are at 2i+1 and 2i+2',
    'Min-heap: parent ≤ children; root is always the minimum',
    'Max-heap: parent ≥ children; root is always the maximum',
    'Python heapq implements a min-heap; negate values to simulate max-heap',
    'heapq.heappush and heapq.heappop are both O(log n)',
  ],
  complexityNote: 'heapq.heapify() builds a heap from a list in O(n) — more efficient than n individual insertions (O(n log n)).',
  interview: {
    howAsked: [
      'Top K elements: maintain a size-K min-heap; discard smallest when over K',
      'Median from data stream: two heaps — max-heap for lower half, min-heap for upper half',
      'Merge K sorted lists: push (value, list_index) into min-heap',
      'Scheduling / task allocation: sort by deadline or profit using priority queue',
      'Dijkstra shortest path: priority queue expands the lowest-cost node next',
    ],
    patterns: [
      'Fixed-size K heap: if heap exceeds K elements, pop the smallest — O(n log K)',
      'Two-heap median: balance sizes ≤ 1 apart; top of each heap gives the median',
      'Lazy deletion: mark deleted elements; skip them when popped from heap',
      'Tuple ordering: push (priority, value) tuples — Python compares lexicographically',
    ],
    watchOut: [
      'Python heapq is a min-heap only — negate values to use as max-heap',
      'heapq does not support decrease-key; use lazy deletion workaround',
      'heapq.heappush(heap, (val, obj)) requires val to be comparable',
      'heapify() is O(n), not O(n log n) — safe for large initial lists',
    ]
  },
  variations: [
    'Keep a size-K min-heap; after n elements, the K largest remain. Final heap minimum = Kth largest.',
    'Max-heap holds the lower half, min-heap holds the upper half. Keep sizes equal (or off by 1). Median is the top of the larger heap or average of both tops.',
    'Sort tasks by deadline/profit; use a priority queue to greedily pick the best available task.',
    'Dijkstra and Prim\'s MST both use a min-heap to always process the lowest-cost edge or node next.',
  ],
  quiz: [
    { q: 'What is the time complexity of heappush and heappop in Python?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], exp: 'Both operations sift elements up or down through a tree of height log n — so both are O(log n).' },
    { q: 'How do you simulate a max-heap with Python\'s heapq (min-heap)?',
      opts: ['Import heapq_max', 'Use heapq.nlargest()', 'Negate all values before pushing; negate again after popping', 'Reverse the list after each push'], exp: 'Python heapq is always a min-heap. Push negative values so the most-negative (= largest original) floats to the top. Negate again when you pop.' },
    { q: '"Find the Kth largest element" — which heap approach is correct?',
      opts: ['Max-heap of all n elements, pop K times', 'Min-heap of size K; discard the smallest when it exceeds K', 'Sort descending, return index K-1', 'Both A and C are correct; B has the wrong heap type'], exp: 'Both A and C give the right answer, but B (size-K min-heap) is the most memory-efficient at O(K) space and O(n log K) time. B keeps the K largest, and the top is the Kth largest.' },
    { q: 'Two-heap approach for median: which heap holds larger values?',
      opts: ['Max-heap', 'Min-heap', 'Both hold the same values', 'Depends on whether n is even or odd'], exp: 'The min-heap holds the larger half. Its top (the smallest of the large half) and the max-heap\'s top (the largest of the small half) give the median directly.' },
    { q: 'What is the time complexity of heapify() on a list of n elements?',
      opts: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'], exp: 'heapify() uses a bottom-up sift-down approach. The math sums to O(n) total work — more efficient than inserting elements one by one (O(n log n)).' },
  ],
  lcNotes: [
    'Size-K min-heap; top is the Kth largest',
    'Two heaps (max + min) to find the running median',
    'Sort by end time, use min-heap to track end times of active intervals',
    'Merge sorted arrays using (val, list_idx, elem_idx) in min-heap',
    'Min-heap of (freq, task_id) to pick lowest-frequency task',
    'Priority queue; map city → cost for lazy deletion',
    'Two heaps (lower max, upper min) with balance invariant',
    'Sort by profit desc; for each job, try to use latest available slot',
    'Dijkstra with min-heap: (cost, node) pairs',
    'Keep cumulative sum; greedily undo the most expensive project with max-heap',
  ]
},

// ─── Graph ────────────────────────────────────────────────────────────────────
'graph': {
  summary: 'A graph is a set of nodes (vertices) connected by edges. Graphs model networks, maps, dependencies, and many real-world relationships. Key variants: directed/undirected, weighted/unweighted, cyclic/acyclic.',
  analogy: 'Like an airline route map: airports are nodes, flights are edges. Finding the cheapest route from city A to B is a shortest-path problem on a weighted graph.',
  properties: [
    'G = (V, E): V vertices and E edges; can be directed or undirected',
    'Adjacency list: dict/array of neighbor lists — O(V+E) space, preferred for sparse graphs',
    'Adjacency matrix: V×V boolean matrix — O(V²) space, fast edge lookup O(1)',
    'Connected graph: there is a path between every pair of nodes',
    'DAG (Directed Acyclic Graph): no cycles; enables topological sorting',
  ],
  complexityNote: 'BFS/DFS on an adjacency list is O(V+E). Dijkstra is O((V+E) log V) with a priority queue.',
  interview: {
    howAsked: [
      'Grid DFS/BFS: number of islands, flood fill, shortest path in maze',
      'Cycle detection: in directed graphs (DFS with 3-color), undirected (Union-Find)',
      'Topological sort: course schedule, alien dictionary (Kahn\'s or DFS)',
      'Shortest path: BFS (unweighted), Dijkstra (positive weights)',
      'Connected components: Union-Find or DFS to count/label components',
    ],
    patterns: [
      'BFS skeleton: queue + visited set; enqueue start, expand level by level',
      'DFS skeleton: recursion or explicit stack; mark visited before exploring',
      'Union-Find: path compression + rank union for near O(1) merge/find',
      'Topological sort (Kahn\'s): in-degree array + zero-in-degree queue',
    ],
    watchOut: [
      'Always maintain a visited set to prevent infinite loops in cyclic graphs',
      'Grid problems: 4-directional (up/down/left/right) vs 8-directional',
      'Directed graph cycle detection needs 3 states: unvisited / in-progress / done',
      'Topological sort is only possible on a DAG — detect cycles simultaneously',
    ]
  },
  variations: [
    'All sources start at distance 0 in the queue — computes minimum distance from each node to its nearest source in O(V+E).',
    'Detect a cycle or linearize a DAG: in-degree queue processes nodes with no dependencies first. If not all nodes are processed, a cycle exists.',
    'Near O(1) merge and find operations via path compression and union by rank. Use for dynamic connectivity.',
    'Min-heap always expands the lowest-cost node. Guarantees shortest path in graphs with positive edge weights.',
  ],
  quiz: [
    { q: 'For a sparse graph (E << V²), which representation is more efficient?',
      opts: ['Adjacency matrix', 'Adjacency list', 'Edge list', 'Adjacency matrix is always preferred'], exp: 'An adjacency list uses O(V+E) space — proportional to actual edges. An adjacency matrix always uses O(V²), which is wasteful when E is small.' },
    { q: 'BFS on an unweighted graph guarantees what property?',
      opts: ['Visits all nodes in sorted order', 'Finds the shortest path (fewest edges) to all reachable nodes', 'Detects cycles', 'Produces a topological ordering'], exp: 'BFS expands nodes level by level. The first time a node is reached is always via the minimum number of edges — the shortest path.' },
    { q: 'Topological sort is only valid for which type of graph?',
      opts: ['Undirected graph', 'Complete graph', 'DAG (Directed Acyclic Graph)', 'Any directed graph'], exp: 'A topological ordering requires no cycles — so only DAGs (Directed Acyclic Graphs) can be topologically sorted. Kahn\'s algorithm detects a cycle if not all nodes are processed.' },
    { q: 'Which algorithm finds the shortest path in a weighted graph with positive edge weights?',
      opts: ['BFS', 'DFS', 'Dijkstra', 'Topological Sort'], exp: "Dijkstra's algorithm uses a priority queue to greedily expand the lowest-cost unvisited node, guaranteeing the shortest path for positive edge weights." },
    { q: 'Union-Find: what does path compression do?',
      opts: ['Deletes old edges', 'Makes every node in the find path point directly to the root', 'Sorts nodes by rank', 'Splits components'], exp: 'Path compression flattens the tree during find() — all traversed nodes point directly to the root. Future finds on the same path are near O(1).' },
  ],
  lcNotes: [
    'Grid DFS/BFS to count and flood-fill islands',
    'BFS from all rotten oranges simultaneously (multi-source)',
    'BFS on state graph for fewest-transformation path',
    'DFS with visited/in-progress states for directed cycle detection',
    'Kahn\'s BFS topological sort; detect cycle if count < n',
    'Union-Find or DFS to count connected components',
    'Dijkstra with min-heap for minimum delay path',
    'Reverse adjacency list + DFS for strongly connected components',
    'Union-Find with rank + path compression',
    'Union-Find to merge accounts; sort emails per component',
  ]
},

// ─── Trie ─────────────────────────────────────────────────────────────────────
'trie': {
  summary: 'A Trie (prefix tree) is a tree where each node represents one character. Paths from root to a node spell out a prefix. Enables O(L) insert and lookup, where L is the word length.',
  analogy: 'Like a dictionary where words sharing a prefix share a common physical path. "cat" and "car" follow the same path C→A before diverging at T and R.',
  properties: [
    'Each path from root spells a prefix or complete word',
    'O(L) insert, search, and prefix check, independent of dictionary size',
    'Nodes often store: children dict (or array of 26), is_end_of_word flag',
    'Space: O(total characters across all words) — can be large',
    'Ideal for autocomplete, spell-checking, and IP routing prefix matching',
  ],
  complexityNote: 'All operations are O(L) where L = word length — unaffected by the number of words in the trie.',
  interview: {
    howAsked: [
      'Implement a Trie with insert, search, and startsWith methods',
      'Autocomplete: find all words with a given prefix',
      'Word Search II: build a Trie of target words, DFS the matrix',
      'Replace words in a sentence with their shortest prefix from a dictionary',
      'XOR Trie: find two numbers with maximum XOR using binary trie',
    ],
    patterns: [
      'TrieNode class: children = {} (or [None]*26), is_end = False',
      'Insert: walk characters, create nodes if missing, set is_end = True at the last node',
      'Search: walk characters, return False if any node is missing, check is_end',
      'DFS on Trie: explore child nodes while matching grid cells',
    ],
    watchOut: [
      'startsWith returns True even if the prefix is not a complete word — do not confuse with search',
      'In Word Search II, delete words from the Trie after finding them to avoid duplicates',
      'Memory usage can be high — use a dict for children rather than a fixed array when the alphabet is large',
      'Case sensitivity: lowercase letters → array of 26; otherwise use a dict',
    ]
  },
  variations: [
    '"." matches any character — during search, recursively try all children when encountering ".".',
    'Find all words with a given prefix, then BFS/DFS the sub-trie to collect complete words.',
    'Build a Trie from all target words. DFS the matrix while simultaneously traversing the Trie — found word triggers backtrack to prune.',
    'Store integers as 32-bit binary strings. For each number, traverse the Trie choosing the opposite bit to maximize XOR.',
  ],
  quiz: [
    { q: 'What is the time complexity of inserting a word of length L into a Trie?',
      opts: ['O(1)', 'O(L)', 'O(n) where n = number of words', 'O(L × n)'], exp: 'Insertion traverses or creates exactly L nodes — one per character. The number of words in the Trie does not affect this.' },
    { q: 'What is the difference between search() and startsWith() in a Trie?',
      opts: ['No difference — both check for a complete word', 'search() requires is_end=True at the last node; startsWith() only requires the path to exist', 'startsWith() is slower', 'search() checks prefixes; startsWith() checks full words'], exp: 'search() confirms the word is complete (is_end = True). startsWith() only checks that a valid path exists, regardless of is_end.' },
    { q: 'How can you avoid duplicate results in Word Search II?',
      opts: ['Use a set to deduplicate results', 'Delete found words from the Trie immediately', 'Sort results afterward', 'Both A and B work'], exp: 'Deleting the word from the Trie (clearing is_end and pruning empty nodes) prevents re-finding the same word. Combined with a result set, both approaches are safe.' },
    { q: 'Why is a Trie more efficient than a HashSet for prefix queries?',
      opts: ['HashSet has O(n) lookup', 'Trie stores all prefixes implicitly by structure; HashSet cannot answer "startsWith" directly', 'Trie uses less memory', 'Trie allows integer keys'], exp: 'A HashSet can find exact matches in O(L) but cannot answer "does any word start with this prefix?" without scanning all words. A Trie answers prefix queries in O(prefix_length).' },
    { q: 'XOR Trie: to maximize XOR with a query number, at each bit level you should:',
      opts: ['Always go to the child matching the query bit', 'Prefer the child with the OPPOSITE bit from the query bit', 'Choose the child with more descendants', 'Always go left (0 bit)'], exp: 'To maximize XOR, each bit should differ from the query. Choose the opposite-bit child when it exists — this maximizes the contribution of each bit position.' },
  ],
  lcNotes: [
    'Classic Trie implementation — start here',
    'Prefix match in Trie to replace with shortest dictionary word',
    '\'.\' wildcard: DFS all children at dot positions',
    'Trie of all words + DFS matrix with simultaneous traversal',
    'Search suggestions: walk prefix then collect subtree words',
    'Trie insert each word; search returns is_end for each prefix',
    'XOR Trie: walk bits from MSB to LSB, prefer opposite bit',
    'Trie node deletion after finding words prevents duplicates',
    'Binary Trie for O(32) per-number XOR queries',
    'Build Trie from dictionary; match sentence words to shortest prefixes',
  ]
},

// ─── Sorting ──────────────────────────────────────────────────────────────────
'sorting': {
  summary: 'Sorting algorithms rearrange elements into a defined order. Python\'s built-in sort uses Timsort (O(n log n), stable). Understanding sort internals is essential for many interview problems.',
  analogy: 'Like organizing a messy bookshelf: different strategies (alphabetical, by size, by genre) suit different shelf arrangements. Merge Sort divides and conquers; Quick Sort picks a pivot and partitions.',
  properties: [
    'Comparison sorts lower bound: Ω(n log n) — cannot beat this without exploiting structure',
    'Merge Sort: O(n log n) stable, O(n) extra space',
    'Quick Sort: O(n log n) average, O(n²) worst, O(log n) space (in-place)',
    'Counting/Radix/Bucket Sort: O(n+k) — beats O(n log n) when key range k is small',
    'Python list.sort() and sorted() are stable Timsort — safe for multi-key sorting',
  ],
  complexityNote: 'Python\'s built-in sort is O(n log n) and stable — use it confidently. Understand internals for interview discussions.',
  interview: {
    howAsked: [
      'Custom sort key: sort by frequency, then by value; sort intervals by start time',
      'Quick Select: O(n) average to find the Kth largest without full sort',
      'Merge Sort for counting inversions or merging sorted halves',
      'When sorting alone does not solve the problem: combine with two pointers or binary search',
      '"Sort then sweep" pattern: sort intervals/events, then scan linearly',
    ],
    patterns: [
      'sorted(arr, key=lambda x: ...) — custom sort without writing a sort algorithm',
      'Quick Select: partition like Quick Sort but recurse only into the relevant half',
      'Counting Sort: O(n+k) for bounded integer ranges',
      'Merge Sort template: divide in half, recursively sort, merge sorted halves',
    ],
    watchOut: [
      'Stability matters when secondary keys must be preserved — use Timsort (stable)',
      'Quick Sort worst case O(n²) on sorted input — use random pivot to mitigate',
      'Counting Sort requires knowing the value range in advance',
      'In-place sort vs sorted() — know which one modifies the original list',
    ]
  },
  variations: [
    'Use Quick Sort partitioning, but recurse only into the side containing the target index. O(n) average.',
    'Values map 1-to-1 to buckets — O(n) sort when the range is bounded.',
    'Count occurrences, then reconstruct. Stable and O(n+k) when range k is small.',
    'During the merge step, count how many right-half elements are inserted before each left-half element — that count is the number of inversions.',
  ],
  quiz: [
    { q: 'What is the theoretical lower bound for comparison-based sorting?',
      opts: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'], exp: 'Any comparison-based sort must make at least log₂(n!) comparisons, which is Θ(n log n) by Stirling\'s approximation. You cannot do better without exploiting non-comparison information.' },
    { q: 'Which sort is stable by default in Python?',
      opts: ['Quick Sort', 'Heap Sort', 'Timsort (list.sort() and sorted())', 'Counting Sort'], exp: 'Python uses Timsort — a hybrid of Merge Sort and Insertion Sort that is stable. Elements with equal keys maintain their original relative order.' },
    { q: 'Quick Select finds the Kth largest element with what average complexity?',
      opts: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'], exp: 'Quick Select partitions the array around a pivot. On average each partition reduces the problem by half — summing the geometric series gives O(n) average.' },
    { q: 'When is Counting Sort more efficient than Merge Sort?',
      opts: ['Always', 'When input values are in a small bounded range [0, k] with k = O(n)', 'When n > 10⁶', 'When the array is nearly sorted'], exp: 'Counting Sort is O(n+k). When k = O(n), this is O(n) — faster than O(n log n). But when k >> n (large range), it wastes space and time.' },
    { q: 'Why does Quick Sort degrade to O(n²) on already-sorted input (with fixed pivot)?',
      opts: ['Recursion stack overflows', 'Every partition picks the smallest/largest element, creating partitions of size 1 and n-1', 'The merge step is unbalanced', 'Python\'s recursion limit is too low'], exp: 'When you always pick the first element as pivot on a sorted array, one partition has 0 elements and the other has n-1. This repeats n times — O(n²) total.' },
  ],
  lcNotes: [
    'Sort then two-pointer for three values',
    'Merge Sort to count inversions while merging',
    'Quick Select for O(n) average Kth element',
    'Sort by frequency desc, then char asc — custom key',
    'Sort intervals by start; merge overlapping ones',
    'Sort intervals by end; greedy non-overlapping selection',
    'Radix/Counting sort or bucket sort for O(n) integer sort',
    'Sort by first element, then merge overlapping intervals',
    'Sort by price; greedy largest-gap approach',
    'Custom sort: group by frequency and index',
  ]
},

// ─── Binary Search ────────────────────────────────────────────────────────────
'binary-search': {
  summary: 'Binary search halves the search space each step to find a target in O(log n). It applies not only to sorted arrays but to any monotonic condition — "binary search on the answer."',
  analogy: 'Like guessing a number 1-100: always guess the midpoint. "Too high" → lower half; "too low" → upper half. After 7 guesses you\'ve narrowed 128 possibilities to 1.',
  properties: [
    'Requires a sorted (or monotonic) structure',
    'Each iteration halves the search space — O(log n) total',
    'Three templates: find exact value, find leftmost insertion point, find rightmost insertion point',
    'Python bisect_left / bisect_right implement binary search on sorted lists',
    '"Binary search on the answer": define a feasibility function and search the answer space',
  ],
  complexityNote: 'O(log n) time, O(1) space (iterative). Recursive version uses O(log n) stack space.',
  interview: {
    howAsked: [
      'Classic: target in sorted array, find first/last occurrence',
      'Rotated sorted array: determine which half is sorted, decide which side target is on',
      '"Search on answer": minimize/maximize a value — check feasibility with a function',
      'Find peak element, square root, smallest divisor',
      'Binary search on matrix: treat as 1D array with mid → (mid//n, mid%n)',
    ],
    patterns: [
      'Closed interval [lo, hi]: while lo <= hi; at exit lo > hi',
      'Half-open [lo, hi): while lo < hi; at exit lo == hi == answer',
      'Feasibility function: binary search the answer space, validate with check(mid)',
      'Left boundary: when found, continue searching left (hi = mid - 1)',
    ],
    watchOut: [
      'Off-by-one errors are common — choose your template and stick to it',
      'mid = lo + (hi - lo) // 2 avoids integer overflow (critical in other languages)',
      'Infinite loop risk when lo = hi-1 and mid == lo — ensure the boundary advances',
      'Clarify: is the array sorted? Are there duplicates? Find any occurrence or first/last?',
    ]
  },
  variations: [
    'Determine which half is sorted; check if target falls in that half, then search accordingly.',
    'Search the answer (not an array element): define check(mid) as feasibility, minimize the smallest valid mid.',
    'Compare f(mid) to f(mid-1): stop when f(mid) ≈ f(mid-1) (within 1e-6 tolerance).',
    'Treat the m×n matrix as a 1D array: mid → row = mid//n, col = mid%n.',
  ],
  quiz: [
    { q: 'What is the time complexity of binary search on a sorted array of n elements?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], exp: 'Each iteration halves the search space. Starting from n, after k steps we have n/2^k elements. Setting this to 1 gives k = log₂n iterations.' },
    { q: 'Why use mid = lo + (hi - lo) // 2 instead of mid = (lo + hi) // 2?',
      opts: ['Same result, just style preference', 'Avoids integer overflow when lo + hi exceeds the max int', 'Runs faster', 'Needed for floating-point searches'], exp: 'In languages with fixed-width integers (Java, C++), lo + hi can overflow. lo + (hi - lo) // 2 is mathematically equivalent but overflow-safe.' },
    { q: 'Search in Rotated Sorted Array: how do you determine which half to search?',
      opts: ['Always search the left half', 'Check if nums[lo] <= nums[mid] to identify the sorted half, then check if target is in it', 'Use linear scan for the pivot, then binary search', 'Binary search both halves independently'], exp: 'One half is always sorted. Compare nums[lo] with nums[mid]: if ≤, left half is sorted. Check if target ∈ [nums[lo], nums[mid]]; if yes, search left; otherwise search right.' },
    { q: '"Koko Eating Bananas" uses binary search on what?',
      opts: ['The banana array index', 'The eating speed (answer space from 1 to max(piles))', 'The number of hours', 'The pile sizes after sorting'], exp: '"Binary search on answer": the eating speed ranges from 1 to max(piles). For each candidate speed mid, check if it finishes all piles within h hours. Find the minimum valid speed.' },
    { q: 'bisect_left(arr, x) returns what?',
      opts: ['Index of x (raises error if not found)', 'Leftmost index where x can be inserted to keep arr sorted', 'Index after the last x', 'Middle of arr'], exp: 'bisect_left returns the leftmost valid insertion position for x in sorted arr. If x exists, it returns the index of the first occurrence. If not found, the position where it would be inserted.' },
  ],
  lcNotes: [
    'Classic template: exact target in sorted array',
    'Return -1 for not found; bisect_left variant for floor/ceil',
    'Identify sorted half, check if target is in it',
    'Find peak: go toward the larger neighbor',
    'Binary search on answer: check(speed) = sum(ceil(p/speed))',
    'Binary search on capacity: check(cap) = sum(ceil(w/cap)) <= days',
    'Search on answer: total_time vs D ships',
    'Binary search mid → (mid//n, mid%n) for 2D matrix',
    'Binary search on eating speed with feasibility check',
    'bisect_left on sorted array gives O(log n) lookup',
  ]
},

// ─── BFS / DFS ────────────────────────────────────────────────────────────────
'bfs-dfs': {
  summary: 'BFS and DFS are the two fundamental graph/tree traversal strategies. BFS explores level by level (uses a queue) and finds shortest paths. DFS explores as deep as possible first (uses recursion or a stack).',
  analogy: 'BFS is like ripples on a pond — spreading outward one ring at a time. DFS is like exploring a maze — keep going straight until you hit a dead end, then backtrack.',
  properties: [
    'BFS: queue-based, processes all nodes at distance k before distance k+1',
    'DFS: recursive (call stack) or explicit stack, explores one branch fully before backtracking',
    'Both visit all V vertices and E edges: O(V+E) time complexity',
    'BFS guarantees shortest path on unweighted graphs',
    'DFS is better for connectivity, cycle detection, and topological sort',
  ],
  complexityNote: 'Both are O(V+E) for adjacency lists. Grid graphs: O(m×n) where m and n are dimensions.',
  interview: {
    howAsked: [
      'Number of islands / connected components (DFS flood-fill)',
      'Shortest path in unweighted graph or grid (BFS)',
      'Cycle detection (DFS with visited/in-progress states)',
      'Topological sort (DFS postorder or BFS Kahn\'s)',
      'Tree traversal: preorder, inorder, postorder (DFS); level-order (BFS)',
    ],
    patterns: [
      'BFS: deque + visited set; expand layer by layer; level-size for level tracking',
      'DFS recursion: base case, mark visited, recurse on neighbors, unmark (backtrack)',
      'DFS iterative: explicit stack avoids recursion depth limits',
      'Kahn\'s topological sort: in-degree array + zero-in-degree queue (BFS variant)',
    ],
    watchOut: [
      'Always mark nodes as visited BEFORE enqueuing (BFS) to prevent duplicates',
      'DFS on directed graphs needs 3 states: unvisited(0), in-progress(1), done(2)',
      'Recursion depth limit in Python (~1000): convert to iterative for deep trees',
      'Grid problems: check bounds (0 ≤ r < rows, 0 ≤ c < cols) before each move',
    ]
  },
  variations: [
    'All source nodes start at level 0 — computes distance to nearest source for every node in one pass.',
    'Expand from both source and destination simultaneously — search space shrinks exponentially. Useful for word ladder.',
    'Use an explicit stack instead of system recursion — avoids Python\'s recursion depth limit.',
    'Kahn\'s algorithm: in-degree BFS. Processes a node once all its prerequisites are done. Detects cycles if not all nodes are processed.',
  ],
  quiz: [
    { q: 'Which traversal guarantees the shortest path on an unweighted graph?',
      opts: ['DFS', 'BFS', 'Both equally', 'Neither — use Dijkstra'], exp: 'BFS explores nodes in non-decreasing distance order. The first time a node is reached, it is via the shortest path (fewest edges).' },
    { q: 'What is the time complexity of BFS/DFS on a graph with V vertices and E edges?',
      opts: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'], exp: 'Each vertex is visited once (O(V)) and each edge is processed once (O(E)) — total O(V+E). For grids, this is O(rows × cols).' },
    { q: 'Cycle detection in a DIRECTED graph using DFS: what 3 states are needed?',
      opts: ['Visited / not visited', 'White / Gray / Black (unvisited / in-progress / done)', 'Queued / processed', 'Open / closed'], exp: 'Gray (in-progress) identifies back edges — a cycle exists if DFS reaches a Gray node. Black (done) means the node is fully processed. Two states are insufficient for directed graphs.' },
    { q: 'Multi-source BFS starts with multiple nodes in the queue at level 0. What does this compute?',
      opts: ['All-pairs shortest paths', 'Shortest distance from each node to its nearest source', 'Total number of paths', 'DFS traversal order'], exp: 'All sources start at distance 0. BFS naturally propagates outward, and each node records the distance to the closest source in a single O(V+E) pass.' },
    { q: 'DFS on a tree computes: left_depth = dfs(root.left), right_depth = dfs(root.right). When should you use postorder (process root AFTER children)?',
      opts: ['When you only need the root value', 'When the answer at a node depends on results from both subtrees', 'Only for BST problems', 'Never — always use preorder'], exp: 'Postorder (compute children first, then combine at root) is needed when the node\'s answer depends on left and right subtree results, such as height, diameter, and path sum.' },
  ],
  lcNotes: [
    'DFS flood-fill to mark each island',
    'BFS from each gate simultaneously (multi-source)',
    'BFS on (row, col) grid with visited set',
    'BFS: each level = one mutation; count levels',
    'BFS layer count for minimum level reach',
    'DFS with 3 states for directed cycle detection',
    'Kahn\'s BFS: process zero-in-degree nodes first',
    'DFS on grid, mark \'#\' as visited, restore after',
    'Multi-source BFS from all rotten cells at time 0',
    'BFS in disguise: level = number of words used so far',
  ]
},

// ─── Dynamic Programming ──────────────────────────────────────────────────────
'dynamic-programming': {
  summary: 'Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems, storing results to avoid recomputation. Applies when a problem has optimal substructure and overlapping subproblems.',
  analogy: 'Like climbing stairs with a notebook: before climbing to step n, you first know how many ways to reach steps n-1 and n-2 (written in your notebook). No recounting — just look it up.',
  properties: [
    'Optimal substructure: the optimal solution uses optimal solutions to subproblems',
    'Overlapping subproblems: the same subproblems appear repeatedly',
    'Memoization (top-down): recursion + cache (Python @lru_cache or dict)',
    'Tabulation (bottom-up): fill a DP table iteratively from base cases',
    'Space optimization: 1D DP can often be reduced to O(1) space using variables',
  ],
  complexityNote: 'DP trades time for space. Common: O(n²) time + O(n) or O(n²) space. Many 2D DP problems can be space-optimized to O(n).',
  interview: {
    howAsked: [
      'Identify if the problem has overlapping subproblems and optimal substructure',
      'Define state: dp[i] or dp[i][j] — what does this value represent?',
      'Write the recurrence relation: dp[i] = f(dp[i-1], dp[i-2], ...)',
      'Determine base cases and order of computation',
      'Classic types: 1D, 2D, knapsack, interval, string DP',
    ],
    patterns: [
      '1D DP: dp[i] depends on dp[i-1] and dp[i-2] — optimize to two variables',
      '2D DP: dp[i][j] for string matching (LCS, edit distance) or grid paths',
      'Knapsack: for each item, decide to include or skip — dp[j] or dp[i][j]',
      'Interval DP: dp[i][j] = optimal solution on interval [i, j]; fill by length',
    ],
    watchOut: [
      'State definition is the hardest part — spend time getting it right before coding',
      'Knapsack 0/1 vs unlimited: 0/1 iterates weights backwards; unlimited iterates forwards',
      'String DP: dp usually has length+1 to accommodate the empty string base case',
      'Path problems: sum of digits along a path is NOT always a standard DP — check if greedy works',
    ]
  },
  variations: [
    'State only depends on the previous one or two entries — replace the array with two variables: prev and curr.',
    '2D dp[i][j] where i and j index into two strings or a grid. Rows often be compressed to a single row.',
    'Each item can be taken 0 or 1 times (0/1 knapsack) or unlimited times (complete/unbounded knapsack).',
    'dp[i][j] = best answer for the subarray/substring [i..j]. Fill diagonally, starting from length 1.',
  ],
  quiz: [
    { q: 'Fibonacci sequence using naive recursion has what time complexity?',
      opts: ['O(n)', 'O(n log n)', 'O(2ⁿ)', 'O(n²)'], exp: 'Each call branches into two recursive calls (fib(n-1) and fib(n-2)). Without memoization, the recursion tree has ~2ⁿ nodes. Memoization reduces this to O(n).' },
    { q: 'What are the two necessary conditions for a DP solution?',
      opts: ['Sorted input and recursion', 'Optimal substructure and overlapping subproblems', 'Greedy choice and independence', 'Two pointers and a hash table'], exp: 'DP requires (1) optimal substructure: the global optimal uses sub-optimal solutions, and (2) overlapping subproblems: the same sub-answers are needed multiple times.' },
    { q: '"Coin Change": find minimum coins to make amount n. Why is greedy wrong?',
      opts: ['Greedy gives the maximum, not minimum', 'Greedy always picks the largest coin, which can fail with certain denominations', 'Greedy is correct for this problem', 'Greedy only works on sorted arrays'], exp: 'Example: coins = [1, 3, 4], amount = 6. Greedy picks 4+1+1 = 3 coins. DP finds 3+3 = 2 coins. Greedy fails because a local optimal choice (largest coin) can miss a globally better solution.' },
    { q: 'What is the space-optimized Fibonacci recurrence?',
      opts: ['dp = [0] * (n+1)', 'a, b = 0, 1; a, b = b, a+b each step', 'Use a 2D table', 'Recursion with @lru_cache'], exp: 'Fibonacci only needs the last two values. Track them as a and b, updating each step: a, b = b, a+b. This uses O(1) space instead of O(n).' },
    { q: 'Longest Common Subsequence (LCS) of two strings of length m and n: what is the complexity?',
      opts: ['O(m+n)', 'O(m×n)', 'O(m²×n²)', 'O(2^(m+n))'], exp: 'Fill an (m+1)×(n+1) DP table where dp[i][j] = LCS length of the first i and j characters. Each cell takes O(1) — total O(m×n) time and O(m×n) or O(n) space.' },
  ],
  lcNotes: [
    'Foundation: dp[i] = dp[i-1] + dp[i-2] with 2 variables',
    'Choose max(dp[i-1], dp[i-2] + nums[i]) at each house',
    'Max gain forward; need to track if jump is possible too',
    'dp[i][j]: delete/insert/replace chars; classic 2D DP',
    'dp[j] = min(dp[j], dp[j-coins[i]] + 1); complete knapsack',
    'dp[i] = max path ending at i; track overall max separately',
    'dp[i][j] counts distinct ways through grid with obstacles',
    'dp[i][j]: char match extends dp[i-1][j-1] by 1',
    '0/1 knapsack: dp[j] = max(dp[j], dp[j-wt] + val)',
    'Interval DP: dp[i][j] = max balloons burst last in [i..j]',
  ]
},

// ─── Greedy ───────────────────────────────────────────────────────────────────
'greedy': {
  summary: 'Greedy algorithms make the locally optimal choice at each step, hoping to reach a globally optimal solution. They are faster than DP (often O(n log n)) but require a proof that local choices lead to a global optimum.',
  analogy: 'Like picking the most valuable item first when filling a backpack with no weight limit — always grab the biggest payoff now. This works when choices are independent, but fails if early grabs block better future options.',
  properties: [
    'Greedy choice property: a locally optimal choice leads to a globally optimal solution',
    'Optimal substructure: optimal solution uses optimal sub-solutions (shared with DP)',
    'No need to try all combinations — one pass or after sorting',
    'Typical pattern: sort by some criterion, then greedily process in order',
    'Classic problems: interval scheduling, Huffman coding, jump game, activity selection',
  ],
  complexityNote: 'Greedy algorithms are often O(n log n) (dominated by sorting) or O(n) with a linear scan.',
  interview: {
    howAsked: [
      'Interval problems: sort by end time, greedily select non-overlapping intervals',
      'Jump Game: track the maximum reachable index as you scan left to right',
      'Assignment: sort both arrays, match greedily (smallest-to-smallest or largest-to-largest)',
      'Prefix-free coding: Huffman encoding using a priority queue',
      'Resource allocation: minimize cost by always choosing the cheapest available option',
    ],
    patterns: [
      'Sort by end time: pick the interval with earliest end that does not overlap the previous pick',
      'Maintain max_reach: at each index i, update max_reach = max(max_reach, i + nums[i])',
      'Sort + compare: two sorted arrays, match greedily',
      'Priority queue: always pick the minimum/maximum cost option available',
    ],
    watchOut: [
      'Greedy is not always correct — prove the exchange argument or use DP as a fallback',
      'Sorting direction matters: end-time sort for interval scheduling, start-time for merge intervals',
      '"Jump Game" greedy fails if modified to count exact steps — then use BFS',
      'Fractional Knapsack (take fractions) works with greedy; 0/1 Knapsack requires DP',
    ]
  },
  variations: [
    'Sort intervals by end time, greedily select those that don\'t overlap. Maximum non-overlapping count = n - removed.',
    'Track max_reach: if current index exceeds max_reach, you cannot proceed. Jump count increments at each level boundary.',
    'Sort cookies and appetites, match smallest sufficient cookie to smallest appetite.',
    'Repeatedly merge the two lowest-frequency items using a min-heap — gives the optimal prefix-free code.',
  ],
  quiz: [
    { q: 'Why is Greedy often NOT correct for 0/1 Knapsack?',
      opts: ['0/1 Knapsack does not have optimal substructure', 'Taking the highest value-per-weight item might prevent a globally better combination', 'Greedy always works but is slower', 'You cannot sort items by value/weight ratio'], exp: 'Greedy picks items by value/weight ratio. But taking item A might prevent fitting items B+C together, which have higher total value. DP explores all combinations and guarantees optimality.' },
    { q: 'Interval scheduling (maximize non-overlapping intervals): sort by what?',
      opts: ['Start time', 'Duration', 'End time (earliest end first)', 'Value/weight ratio'], exp: 'Sorting by end time is the key insight. Choosing the earliest-ending interval leaves maximum room for future intervals — the greedy exchange argument proves this is globally optimal.' },
    { q: 'Jump Game I: can you reach the last index? What is the O(n) greedy approach?',
      opts: ['DFS all possible paths', 'DP with dp[i] = can reach index i', 'Track max_reach = max(max_reach, i + nums[i]); return max_reach >= n-1', 'BFS level by level'], exp: 'max_reach represents the furthest index reachable so far. If at any point i > max_reach, you are stuck. Otherwise, after scanning all reachable indices, check if max_reach ≥ last index.' },
    { q: 'Which problem can be solved greedily but NOT with a simple greedy on 0/1 Knapsack?',
      opts: ['Fractional Knapsack', 'Activity Selection', 'Minimum Spanning Tree', 'All of the above are greedily solvable'], exp: 'All three (Fractional Knapsack, Activity Selection, MST) have greedy solutions. 0/1 Knapsack does NOT have a greedy solution — it requires DP or branch and bound.' },
    { q: 'Assign cookies: children with appetite g[], cookie sizes s[]. Greedy: satisfy most children. Sort both arrays, then:',
      opts: ['Match largest cookie to smallest appetite', 'Match smallest sufficient cookie to smallest appetite', 'Give each child the average-size cookie', 'Give larger cookies first to all children'], exp: 'Sort both arrays. Match the smallest available cookie that satisfies the smallest unsatisfied child. This ensures no cookie is "wasted" on a child who could be satisfied with a smaller one.' },
  ],
  lcNotes: [
    'Track max_reach; false if i > max_reach at any point',
    'BFS-level approach: count jumps when crossing level boundary',
    'Sort by end time; select non-overlapping with earliest ends',
    'Sort by end time; min-heap tracks active meeting room end times',
    'Sort children and cookies; match smallest sufficient',
    'Max-heap on profit; use latest available slot per deadline',
    'Greedy: always pick the most frequent remaining task',
    'Sort stocks; keep all positive-difference consecutive gains',
    'Sort + priority queue for Huffman-style cost minimization',
    'Sort piles; cumulative XOR determines greedy winner',
  ]
},

// ─── Backtracking ─────────────────────────────────────────────────────────────
'backtracking': {
  summary: 'Backtracking is a systematic brute-force technique that explores all solutions by incrementally building candidates and abandoning (backtracking) when a partial solution cannot lead to a valid complete solution.',
  analogy: 'Like solving a maze: go down a path, hit a dead end, retrace your steps to the last junction, try the next fork. Systematically exhausts all possibilities, but prunes dead ends early.',
  properties: [
    'Exhaustive search with pruning — explores the "decision tree" of choices',
    'Template: choose → explore → unchoose (restore state)',
    'Time complexity: often exponential O(2ⁿ), O(n!), or O(k^n) — but pruning dramatically cuts runtime',
    'Used for: permutations, combinations, subsets, N-Queens, Sudoku, word search',
    'Key optimization: prune branches early when constraints are violated',
  ],
  complexityNote: 'Worst case is exponential, but effective pruning often makes it fast enough for n ≤ 20 in practice.',
  interview: {
    howAsked: [
      'Subsets / combinations: choose k elements from n, with or without repetition',
      'Permutations: all orderings of n elements, with or without duplicates',
      'N-Queens / Sudoku: constraint satisfaction with early pruning',
      'Word Search: DFS on a grid with in-place marking and restoration',
      'Partition problems: divide a string into valid segments (palindromes, IP addresses)',
    ],
    patterns: [
      'Backtracking template: base case, for each choice: add → recurse → remove',
      'Combinations: start loop from `start` index to avoid reuse',
      'Permutations: use a `used[]` boolean array to track picked elements',
      'Deduplicate: sort first, then skip i > start when nums[i] == nums[i-1]',
    ],
    watchOut: [
      'Append a copy (path[:]) to results — not a reference that will change',
      'Deduplicate permutations: sort + skip same element at same depth level',
      'Grid word search: restore cell value after DFS (cell = \'#\' → restore → original)',
      'N-Queens prune: check column, \\ diagonal (r-c), and / diagonal (r+c) sets',
    ]
  },
  variations: [
    'Sort input, skip candidates where i > start and nums[i] == nums[i-1] — prevents duplicate subsets/combinations.',
    'Mark cells with \'#\' during DFS, restore afterward. Ensures no cell is reused in a single path.',
    'Track which column, \\ diagonal (r-c), and / diagonal (r+c) are occupied — O(1) pruning per placement.',
    'Try each split point; check if the segment is valid (palindrome, valid IP octet) before recursing.',
  ],
  quiz: [
    { q: 'What is the standard backtracking template structure?',
      opts: ['Greedy choose, no undo', 'Choose → Recurse → Unchoose (restore state)', 'BFS with visited set', 'Memoized recursion'], exp: 'Backtracking\'s core is the "choose → explore → unchoose" cycle. After exploring a branch, you restore all state changes so the next branch starts from the same clean state.' },
    { q: 'How many subsets does a set of n distinct elements have?',
      opts: ['n!', 'n²', '2ⁿ', 'n log n'], exp: 'Each element is either included or excluded — 2 choices per element, n elements → 2ⁿ total subsets. For n=20 that\'s about 1 million, still manageable.' },
    { q: 'To avoid duplicate subsets when input has duplicates (e.g. [1,1,2]), you should:',
      opts: ['Use a set to deduplicate results at the end', 'Sort input; skip nums[i] == nums[i-1] when i > start in the loop', 'Allow duplicates and filter afterward', 'Use indices instead of values'], exp: 'Sorting groups duplicates. In the for loop, if nums[i] == nums[i-1] and i > start (not the first pick at this level), skip it to avoid generating the same subset again.' },
    { q: 'In Word Search, why do you mark the current cell before recursing and restore it afterward?',
      opts: ['To count visited cells', 'To prevent the path from reusing the same cell, then restore for other paths', 'Grid modification is required', 'To speed up the DFS'], exp: 'Marking prevents the current path from revisiting a cell (no word uses a cell twice). Restoring afterward lets other paths (at sibling branches) still use that cell.' },
    { q: 'N-Queens: for a queen at (row, col), which values uniquely identify its diagonals?',
      opts: ['row + col and row - col', 'col only', 'row only', '2*row + col'], exp: 'All squares on the same \\ diagonal share the same (row - col) value; all squares on the same / diagonal share the same (row + col) value. Track both sets to prune invalid placements.' },
  ],
  lcNotes: [
    'Basic subset generation — template for all backtracking',
    'Sum target with repetition allowed — prune when sum > target',
    'No repetition allowed — start index advances each level',
    'Deduplicate: sort + skip same element at same depth',
    'All n! orderings — used[] array to track taken elements',
    'Sort + skip same adjacent at same depth for deduplicated perms',
    'N-Queens: track column and both diagonal sets',
    'Grid DFS with in-place marking + Trie for multi-word search',
    'Split into valid palindromes — check with is_palindrome()',
    'Split into valid IP octets — prune invalid values early',
  ]
},

// ─── Two Pointers ─────────────────────────────────────────────────────────────
'two-pointers': {
  summary: 'Two Pointers uses two indices moving through data simultaneously to reduce O(n²) brute force to O(n). Common patterns: opposite ends (converging), same direction (fast/slow), and offset pointers.',
  analogy: 'Like two people searching a sorted shelf from both ends: one from the left, one from the right. Together they cover the whole shelf in half the passes a single searcher would need.',
  properties: [
    'Typically O(n) time — each pointer moves at most n steps total',
    'Usually O(1) extra space — no additional data structures needed',
    'Works best on sorted arrays or linked lists',
    'Three main patterns: opposite ends (l/r), fast/slow (cycle), offset/distance (window)',
    'Can extend to 3-Sum (fix one element, use two pointers on the rest)',
  ],
  complexityNote: 'Each pointer traverses the array at most once — O(n) total even with nested loops, because the total pointer steps are bounded by n.',
  interview: {
    howAsked: [
      'Two Sum on sorted array: converge l and r toward each other',
      '3Sum: fix one element, two pointers on the remaining sorted portion',
      'Remove duplicates / move zeroes in-place: read/write pointer',
      'Linked list: fast/slow for cycle detection, midpoint, Nth-from-end',
      'Container With Most Water: always move the shorter side inward',
    ],
    patterns: [
      'Opposite ends: l=0, r=n-1; advance l or retreat r based on comparison',
      'Write pointer: r scans all elements; w points to next valid write position',
      'Fast/Slow: slow advances 1, fast advances 2 — useful for cycle and midpoint',
      'Offset: pointer1 advances k steps first, then both move together',
    ],
    watchOut: [
      'Two pointers on sorted array — always check if sorting is needed first',
      '3Sum deduplication: after fixing nums[i], skip duplicate nums[i]; inside loop skip duplicate l and r',
      'Write pointer: the order of increment matters — write, then advance, or advance then write',
      'Linked list: null check before every .next access',
    ]
  },
  variations: [
    'Fix nums[i], then use l=i+1 and r=n-1 converging. Skip duplicates at all three levels.',
    'r (read) scans the array; w (write) overwrites. When done, arr[:w] is the modified result.',
    'Sort first, then match smallest with largest element using opposite-end pointers.',
    'Slow/fast pointer on linked list: midpoint (slow stops at mid), cycle detection (they meet), Nth from end (offset approach).',
  ],
  quiz: [
    { q: 'Two Sum II (sorted array): what is the time complexity of the two-pointer approach?',
      opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], exp: 'l and r each move at most n steps in total. Each step either l increases or r decreases — the loop runs at most n iterations, O(n).' },
    { q: 'In "Remove Duplicates from Sorted Array", what does the write pointer track?',
      opts: ['Current read position', 'Next position to write a unique element', 'Count of duplicates removed', 'Previous unique element position'], exp: 'The write pointer w points to the next free slot for a unique element. The read pointer r scans all elements; when arr[r] ≠ arr[w-1], we write arr[r] to position w and advance w.' },
    { q: '3Sum: after sorting, why skip nums[i] == nums[i-1] when i > 0?',
      opts: ['To speed up sorting', 'To avoid duplicate triplets when the same value is fixed again as the outer element', 'Sorted arrays have no duplicates', 'Two pointers cannot handle duplicates'], exp: 'Fixing the same outer value twice generates all the same triplets again. Skipping equal adjacent values at the outer level prevents outputting duplicate triplets.' },
    { q: 'Fast/slow pointer: slow moves 1 step, fast moves 2 steps. In a cycle-free linked list, when does fast stop?',
      opts: ['When fast == slow', 'When fast or fast.next is None', 'When slow reaches the tail', 'When the list length is odd'], exp: 'Without a cycle, fast reaches the end (None) first. When fast or fast.next is None, the traversal stops. If fast catches slow, a cycle exists.' },
    { q: '"Container With Most Water": why always move the pointer with the shorter height?',
      opts: ['To maximize width', 'Moving the shorter side might find a taller wall and increase area; the taller side can never improve', 'Both pointers move simultaneously', 'The taller side determines volume'], exp: 'Area = min(h[l], h[r]) × (r-l). Moving the taller side keeps the minimum the same or worse (width decreases). Only by moving the shorter side can we potentially find a taller wall that increases the minimum.' },
  ],
  lcNotes: [
    'Converging two pointers on sorted array — classic template',
    'Sort + two pointers; skip duplicate outer and inner elements',
    'Write pointer: w tracks next valid write slot',
    'Write pointer: r moves all, w only advances on non-zero',
    'Opposite ends: move side with smaller height inward',
    'Sort first; then converge to find closest-to-zero triplet',
    'Offset: advance first pointer n+1 steps ahead',
    'Fast/slow: they meet at cycle entry after reset',
    'Slow/fast: slow stops at midpoint when fast reaches end',
    'Merge in-place: read from ends, write from the back',
  ]
},

// ─── Sliding Window ───────────────────────────────────────────────────────────
'sliding-window': {
  summary: 'Sliding Window efficiently processes all contiguous subarrays or substrings of fixed or variable size. By expanding right and shrinking left, it reduces O(n²) or O(n³) brute force to O(n).',
  analogy: 'Like a camera panning across a panorama: you always see a fixed-width (or adjustable-width) slice of the scene. Rather than taking a new photo from scratch each time, you slide the frame to add what\'s ahead and drop what\'s behind.',
  properties: [
    'Maintain a window [l, r]; expand right unconditionally, shrink left when constraint violated',
    'O(n) time: each element enters and exits the window at most once',
    'Two subtypes: fixed-size window (k fixed) and variable-size window (l can move)',
    'Window state maintained in a HashMap / Counter or deque',
    'Variables tracked: window sum, max, character counts, etc.',
  ],
  complexityNote: 'O(n) time because every element is added and removed from the window at most once. O(k) or O(|Σ|) space for the window state.',
  interview: {
    howAsked: [
      'Fixed window: max average subarray, permutation in string, anagram in string',
      'Longest valid window: longest substring without repeating characters',
      'Shortest valid window: minimum window substring (contains all target chars)',
      'At-most-K constraint: longest subarray with at most K distinct elements',
      'Sliding window maximum: monotonic deque for O(n) window max',
    ],
    patterns: [
      'Fixed window: slide 1 step — add right element, remove left element',
      'Longest window: expand right; shrink left only when window becomes invalid',
      'Shortest window: expand right until valid; then shrink left to minimize length',
      'Monotonic deque: popleft when out of window; pop right when new element is bigger',
    ],
    watchOut: [
      'The window is valid until you violate the constraint — know exactly when to shrink',
      'At-most-K problems: longest(exactly K) = longest(at-most-K) - longest(at-most-K-1)',
      'Monotonic deque stores indices, not values — to check if front is out of the window',
      'Update answer BEFORE shrinking (longest) or AFTER shrinking (shortest)',
    ]
  },
  variations: [
    'Each step: add nums[r], remove nums[r-k]. Maintain count/sum for the window. Answer is a sliding aggregate.',
    'Expand r freely; when invalid (e.g. duplicate found), advance l until valid again. Track longest window seen.',
    'Expand r until all requirements met; then advance l to find the minimal valid window. Track shortest window seen.',
    'deque stores indices of candidates for window max. Pop left when front index < l. Pop right when nums[back] ≤ nums[r].',
  ],
  quiz: [
    { q: 'Why is Sliding Window O(n) even though it appears to use nested loops?',
      opts: ['The inner loop is O(log n)', 'Each element enters the window once and exits once — total work is O(2n) = O(n)', 'The window shrinks exponentially', 'Only valid for fixed-size windows'], exp: 'Each element is added (r advances) at most once and removed (l advances) at most once. The total number of pointer movements is ≤ 2n, giving O(n) overall.' },
    { q: 'For "Longest Substring Without Repeating Characters", when should the left pointer advance?',
      opts: ['Every step', 'When window size exceeds k', 'When a duplicate character enters the window', 'When the right pointer reaches the end'], exp: 'When a duplicate enters (e.g., \'a\' appears twice), advance l until the first \'a\' is removed. The window is now valid again, and we can continue expanding r.' },
    { q: 'Fixed-size window of size k: after the window is full, each slide step does what?',
      opts: ['Rebuilds the window from scratch', 'Removes element at l, adds element at r, advances both by 1', 'Only advances r', 'Only advances l'], exp: 'Slide one step: add nums[r] to the window, remove nums[r-k] (which was at position l = r-k+1 before the slide). Both l and r advance by 1 each step.' },
    { q: 'Monotonic deque in Sliding Window Maximum: what is stored in the deque?',
      opts: ['Window maximum values only', 'Indices of candidate maximum elements in decreasing order of their values', 'All window elements', 'Count of each value in the window'], exp: 'The deque stores indices. The front always holds the index of the current window maximum. When r advances, pop from the back any index whose value ≤ nums[r] — they can never be a future maximum.' },
    { q: '"Minimum Window Substring": when is the answer updated?',
      opts: ['Every time r advances', 'Every time l advances', 'When the window becomes valid (contains all required chars), before shrinking l', 'When the window size equals the target length'], exp: 'After the window becomes valid (all target chars present), record the current window as a candidate minimum. Then advance l to try shrinking. Repeat: if still valid, record again; if invalid, expand r.' },
  ],
  lcNotes: [
    'Expand right; track seen chars in set; move left on duplicate',
    'Fixed window: slide 1 step — add right char, subtract left char',
    'Char frequency match count; shrink when all matched',
    'Monotonic deque of indices; front is window max',
    'Fixed window: slide and check if sorted window is valid',
    'Expand r; shrink l when more than 2 distinct chars',
    'At-most-2 distinct — track freq map size in window',
    'Expand r; when invalid, advance l; track max length',
    'Sliding window on char frequency; expand and contract',
    'Fixed window: count each char; slide and check match',
  ]
},

}; // END EN_DATA
