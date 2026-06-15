// ===== Combine all topic data =====
const ALL_TOPICS = [
  ...DS_TOPICS_1,
  ...DS_TOPICS_2,
  ...ALGO_TOPICS_1,
  ...ALGO_TOPICS_2,
];

// ===== Merge English data =====
ALL_TOPICS.forEach(t => {
  if (EN_DATA && EN_DATA[t.id]) t.en = EN_DATA[t.id];
});

// ===== State =====
let currentTopic = null;
let currentTab   = 'concept';
let quizState    = {};  // topicId → { answered: Set, score: number }
let done         = JSON.parse(localStorage.getItem('dsa-done') || '[]');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildHome();
  renderProgressChip();

  document.getElementById('search-input').addEventListener('input', e => {
    const q = e.target.value.trim();
    if (q.length >= 1) showSearchResults(q);
    else showPage('home');
  });

  document.querySelector('.menu-btn').addEventListener('click', toggleSidebar);
  document.querySelector('.sidebar-overlay').addEventListener('click', closeSidebar);
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);

  if (localStorage.getItem('dsa-theme') === 'dark')
    document.documentElement.setAttribute('data-theme', 'dark');

  hljs.highlightAll();
});

// ===== Sidebar =====
function buildSidebar() {
  const dsItems   = ALL_TOPICS.filter(t => t.category === 'ds');
  const algoItems = ALL_TOPICS.filter(t => t.category === 'algo');

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-group">
      <div class="sidebar-group-label">📦 資料結構</div>
      ${dsItems.map(t => navItem(t)).join('')}
    </div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">⚙️ 演算法</div>
      ${algoItems.map(t => navItem(t)).join('')}
    </div>`;
}

function navItem(t) {
  const isDone = done.includes(t.id);
  const diffLabel = {beginner:'基礎', intermediate:'進階', advanced:'困難'}[t.difficulty] || '';
  const diffCls   = {beginner:'diff-b', intermediate:'diff-i', advanced:'diff-a'}[t.difficulty] || '';
  return `<button class="nav-item" id="nav-${t.id}" onclick="showTopic('${t.id}')">
    <span class="nav-icon">${t.icon}</span>
    <span>${t.title}</span>
    ${isDone ? '<span class="nav-check">✓</span>' : `<span class="nav-diff ${diffCls}">${diffLabel}</span>`}
  </button>`;
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('nav-' + id);
  if (el) el.classList.add('active');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.sidebar-overlay').classList.remove('show');
}

// ===== Progress =====
function renderProgressChip() {
  const pct = Math.round((done.length / ALL_TOPICS.length) * 100);
  document.getElementById('progress-chip').textContent = `📈 ${done.length}/${ALL_TOPICS.length} (${pct}%)`;
}

function markDone(id) {
  const btn = document.getElementById('mark-done-btn');
  if (done.includes(id)) {
    done = done.filter(x => x !== id);
    btn.textContent = '☐ 標記為已學習';
    btn.classList.remove('done');
  } else {
    done.push(id);
    btn.textContent = '✓ 已學習';
    btn.classList.add('done');
  }
  localStorage.setItem('dsa-done', JSON.stringify(done));
  renderProgressChip();
  buildSidebar();
  setActiveNav(id);
  buildHome();
}

// ===== Theme =====
function toggleTheme() {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('dsa-theme', dark ? 'light' : 'dark');
}

// ===== Pages =====
function showPage(name) {
  document.getElementById('home-page').style.display  = name === 'home' ? 'block' : 'none';
  document.getElementById('topic-page').style.display = name === 'topic' ? 'block' : 'none';
  document.getElementById('search-page').style.display= name === 'search' ? 'block' : 'none';
}

// ===== Home =====
function buildHome() {
  const dsItems   = ALL_TOPICS.filter(t => t.category === 'ds');
  const algoItems = ALL_TOPICS.filter(t => t.category === 'algo');

  document.getElementById('ds-grid').innerHTML   = dsItems.map(topicCard).join('');
  document.getElementById('algo-grid').innerHTML = algoItems.map(topicCard).join('');
}

function topicCard(t) {
  const isDone = done.includes(t.id);
  return `<div class="topic-card ${isDone?'done':''}" onclick="showTopic('${t.id}')">
    <span class="card-icon">${t.icon}</span>
    <div class="card-title">${t.title}</div>
    <div class="card-en">${t.titleEn}</div>
    ${isDone ? '<span class="card-done">✓</span>' : ''}
    <span class="card-cat ${t.category==='ds'?'cat-ds':'cat-algo'}">${t.category==='ds'?'資料結構':'演算法'}</span>
  </div>`;
}

// ===== Topic Page =====
function showTopic(id) {
  const t = ALL_TOPICS.find(x => x.id === id);
  if (!t) return;
  currentTopic = t;
  currentTab   = 'concept';
  closeSidebar();
  showPage('topic');
  setActiveNav(id);

  if (!quizState[id]) quizState[id] = { answered: new Set(), score: 0 };

  const diffTag  = {beginner:'tag-beg 基礎',intermediate:'tag-int 進階',advanced:'tag-adv 困難'}[t.difficulty] || '';
  const catTag   = t.category === 'ds' ? 'tag-ds 資料結構' : 'tag-algo 演算法';
  const isDone   = done.includes(id);

  document.getElementById('topic-page').innerHTML = `
    <div class="topic-breadcrumb">
      <span class="bc-link" onclick="goHome()">首頁</span> › ${t.category==='ds'?'資料結構':'演算法'} › ${t.title}
    </div>
    <div class="topic-header-row">
      <div class="topic-big-icon">${t.icon}</div>
      <div class="topic-title-block">
        <h1>${t.title} <span class="title-en">${t.titleEn}</span></h1>
        <div class="topic-tags">
          <span class="tag ${catTag.split(' ')[0]}">${catTag.split(' ').slice(1).join(' ')}</span>
          <span class="tag ${diffTag.split(' ')[0]}">${diffTag.split(' ').slice(1).join(' ')}</span>
        </div>
      </div>
      <div class="mark-done-wrap">
        <button id="mark-done-btn" class="mark-done-btn ${isDone?'done':''}" onclick="markDone('${id}')">
          ${isDone ? '✓ 已學習' : '☐ 標記為已學習'}
        </button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('concept',this)">📖 概念解說</button>
      <button class="tab-btn" onclick="switchTab('code',this)">💻 程式碼</button>
      <button class="tab-btn" onclick="switchTab('interview',this)">🎯 面試重點</button>
      <button class="tab-btn" onclick="switchTab('variations',this)">🔀 常見變形</button>
      <button class="tab-btn" onclick="switchTab('quiz',this)">✏️ 小測試</button>
      <button class="tab-btn" onclick="switchTab('leetcode',this)">🟠 LeetCode</button>
      <button class="tab-btn" onclick="switchTab('refs',this)">📚 參考資源</button>
    </div>

    <div id="tab-concept"   class="tab-pane active">${renderConcept(t)}</div>
    <div id="tab-code"      class="tab-pane">${renderCode(t)}</div>
    <div id="tab-interview" class="tab-pane">${renderInterview(t)}</div>
    <div id="tab-variations"class="tab-pane">${renderVariations(t)}</div>
    <div id="tab-quiz"      class="tab-pane">${renderQuiz(t)}</div>
    <div id="tab-leetcode"  class="tab-pane">${renderLeetcode(t)}</div>
    <div id="tab-refs"      class="tab-pane">${renderRefs(t)}</div>
  `;

  // Highlight code blocks
  document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  window.scrollTo(0, 0);
}

function switchTab(name, btn) {
  currentTab = name;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}

function goHome() {
  showPage('home');
  buildHome();
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('search-input').value = '';
}

// ===== Render Functions =====
function renderConcept(t) {
  const c = t.concept;
  const en = t.en || {};
  const props = c.properties.map((p, i) => `
    <li>
      <span class="bi-zh">${p}</span>
      ${en.properties && en.properties[i] ? `<span class="bi-en">${en.properties[i]}</span>` : ''}
    </li>`).join('');
  return `
    <div class="block">
      <div class="block-title">💬 核心概念 <span class="section-en-label">Core Concept</span></div>
      <div class="callout callout-blue bi-block">
        <div class="bi-zh">${c.summary}</div>
        ${en.summary ? `<div class="bi-en">${en.summary}</div>` : ''}
      </div>
    </div>
    <div class="block">
      <div class="block-title">💡 直觀比喻 <span class="section-en-label">Analogy</span></div>
      <div class="analogy-box bi-block">
        <div class="analogy-emoji">🎯</div>
        <div class="analogy-text">
          <span class="bi-zh">${c.analogy}</span>
          ${en.analogy ? `<span class="bi-en">${en.analogy}</span>` : ''}
        </div>
      </div>
    </div>
    ${c.visualization ? `<div class="block">
      <div class="block-title">📊 視覺化 <span class="section-en-label">Visualization</span></div>
      <div class="viz-pre">${escHtml(c.visualization)}</div>
    </div>` : ''}
    <div class="block">
      <div class="block-title">📌 重要特性 <span class="section-en-label">Key Properties</span></div>
      <ul class="prop-list bilingual-list">${props}</ul>
    </div>
    <div class="block">
      <div class="block-title">⏱ 時間 & 空間複雜度 <span class="section-en-label">Time & Space Complexity</span></div>
      <table class="cx-table">
        <thead><tr><th>操作 / Operation</th><th>時間複雜度 / Time</th><th>空間複雜度 / Space</th></tr></thead>
        <tbody>
          ${t.complexity.map(row => `<tr>
            <td>${row.op}</td>
            <td class="${row.cls}">${row.time}</td>
            <td>${row.space || t.space}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      ${t.complexityNote ? `<p class="cx-note">
        <span class="bi-zh">* ${t.complexityNote}</span>
        ${en.complexityNote ? `<span class="bi-en">* ${en.complexityNote}</span>` : ''}
      </p>` : ''}
    </div>`;
}

function renderCode(t) {
  return `
    <div class="block">
      <div class="block-title">🐍 Python 實作</div>
      <div class="code-wrap">
        <div class="code-header">
          <span class="lang-label">Python</span>
          <button class="copy-btn" onclick="copyCode(this)">複製</button>
        </div>
        <pre><code class="language-python">${escHtml(t.code)}</code></pre>
      </div>
    </div>
    <div class="callout callout-purple">
      <b>💡 面試提示 / Interview Tips</b><br>
      <span class="bi-zh">Python 中背熟這些核心操作的寫法，面試時能快速寫出乾淨的程式碼。不需死記所有細節，理解邏輯更重要。</span>
      <span class="bi-en">Memorize the core Python operations shown here so you can write clean code quickly during interviews. Understanding the logic matters more than memorizing every detail.</span>
    </div>`;
}

function renderInterview(t) {
  const iv = t.interview;
  const en = t.en ? t.en.interview : null;
  const biItem = (zh, enArr, i) => `
    <li>
      <span class="bi-zh">${zh}</span>
      ${enArr && enArr[i] ? `<span class="bi-en">${enArr[i]}</span>` : ''}
    </li>`;
  return `
    <div class="tip-cards">
      <div class="tip-card">
        <h4>🎯 面試通常怎麼考？ <span class="card-en-label">How It's Tested</span></h4>
        <ul class="bilingual-list">${iv.howAsked.map((x,i) => biItem(x, en && en.howAsked, i)).join('')}</ul>
      </div>
      <div class="tip-card">
        <h4>🔑 核心解題模式 <span class="card-en-label">Key Patterns</span></h4>
        <ul class="bilingual-list">${iv.patterns.map((x,i) => biItem(x, en && en.patterns, i)).join('')}</ul>
      </div>
      <div class="tip-card">
        <h4>⚠️ 常見陷阱 & 注意事項 <span class="card-en-label">Watch Out</span></h4>
        <ul class="bilingual-list">${iv.watchOut.map((x,i) => biItem(x, en && en.watchOut, i)).join('')}</ul>
      </div>
    </div>
    <div class="callout callout-green" style="margin-top:16px">
      <b>🗣️ 面試溝通技巧 / Communication Tips</b><br>
      <span class="bi-zh">面試時先大聲說出思路：「我想用 ${t.titleEn} 來解這道題，因為…」讓面試官了解你的思考過程，比沉默 coding 更好。</span>
      <span class="bi-en">Always verbalize your reasoning: "I'm thinking of using ${t.titleEn} here because…" — letting the interviewer follow your thought process is far better than silent coding.</span>
    </div>`;
}

function renderVariations(t) {
  const enVars = t.en && t.en.variations;
  return `
    <div class="block">
      <div class="block-title">🔀 常見變形與延伸 <span class="section-en-label">Common Variations</span></div>
      <div class="var-list">
        ${t.variations.map((v, i) => `
          <div class="var-item">
            <h4>${v.name}</h4>
            <p class="bi-zh">${v.desc}</p>
            ${enVars && enVars[i] ? `<p class="bi-en">${enVars[i]}</p>` : ''}
            <span class="var-ex">📎 例：${v.ex}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="callout callout-orange">
      <b>💡 學習建議 / Study Tips</b><br>
      <span class="bi-zh">先掌握基本版本，再學習各種變形。面試時很少直接考基礎版，但熟悉基礎才能靈活應對變形題。</span>
      <span class="bi-en">Master the base version first, then explore variations. Interviews rarely test the pure basics — but solid fundamentals let you adapt to any variation.</span>
    </div>`;
}

function renderQuiz(t) {
  const state = quizState[t.id];
  const total = t.quiz.length;
  const answered = state.answered.size;

  return `
    <div id="quiz-score-${t.id}" class="quiz-score ${answered===total?'show':''}">
      <div class="score-big">${state.score} / ${total}</div>
      <div class="score-msg">${scoreMsg(state.score, total)}</div>
      <button class="reset-quiz-btn" onclick="resetQuiz('${t.id}')">🔄 重新測試</button>
    </div>
    <div class="quiz-list">
      ${t.quiz.map((q, qi) => renderQuizItem(t.id, q, qi, state)).join('')}
    </div>`;
}

function renderQuizItem(topicId, q, qi, state) {
  const t = ALL_TOPICS.find(x => x.id === topicId);
  const enQ = t && t.en && t.en.quiz && t.en.quiz[qi];
  const isAnswered = state.answered.has(qi);
  const labels = ['A','B','C','D'];
  return `
    <div class="quiz-card" id="quiz-card-${topicId}-${qi}">
      <div class="quiz-q-text">
        <span class="qnum">${qi+1}</span>
        <span class="bi-zh">${q.q}</span>
        ${enQ ? `<span class="bi-en quiz-q-en">${enQ.q}</span>` : ''}
      </div>
      <div class="quiz-opts">
        ${q.opts.map((opt, oi) => {
          let cls = '';
          if (isAnswered) {
            if (oi === q.ans) cls = 'correct';
            else if (state[`picked_${qi}`] === oi) cls = 'wrong';
          }
          return `<button class="quiz-opt ${cls} ${isAnswered?'disabled':''}"
            onclick="${isAnswered?'':'`answerQuiz(\''+topicId+'\','+qi+','+oi+')`'}">
            <span class="opt-label">${labels[oi]}</span>
            <span class="bi-zh">${opt}</span>
            ${enQ && enQ.opts && enQ.opts[oi] ? `<span class="bi-en">${enQ.opts[oi]}</span>` : ''}
          </button>`;
        }).join('')}
      </div>
      <div id="quiz-exp-${topicId}-${qi}" class="quiz-exp ${isAnswered?'show':''}">
        💡 <span class="bi-zh">${q.exp}</span>
        ${enQ ? `<span class="bi-en">${enQ.exp}</span>` : ''}
      </div>
    </div>`;
}

function answerQuiz(topicId, qi, picked) {
  const t = ALL_TOPICS.find(x => x.id === topicId);
  const state = quizState[topicId];
  if (state.answered.has(qi)) return;

  state.answered.add(qi);
  state[`picked_${qi}`] = picked;
  const correct = picked === t.quiz[qi].ans;
  if (correct) state.score++;

  // Update UI for this question
  const card = document.getElementById(`quiz-card-${topicId}-${qi}`);
  const btns = card.querySelectorAll('.quiz-opt');
  btns.forEach((btn, oi) => {
    btn.classList.add('disabled');
    if (oi === t.quiz[qi].ans) btn.classList.add('correct');
    else if (oi === picked) btn.classList.add('wrong');
    btn.onclick = null;
  });
  document.getElementById(`quiz-exp-${topicId}-${qi}`).classList.add('show');

  // Show score when all answered
  if (state.answered.size === t.quiz.length) {
    const scoreEl = document.getElementById(`quiz-score-${topicId}`);
    scoreEl.querySelector('.score-big').textContent = `${state.score} / ${t.quiz.length}`;
    scoreEl.querySelector('.score-msg').textContent = scoreMsg(state.score, t.quiz.length);
    scoreEl.classList.add('show');
    scoreEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function resetQuiz(topicId) {
  quizState[topicId] = { answered: new Set(), score: 0 };
  const t = ALL_TOPICS.find(x => x.id === topicId);
  document.getElementById('tab-quiz').innerHTML = renderQuiz(t);
}

function scoreMsg(score, total) {
  const pct = score / total;
  if (pct === 1)   return '🏆 完美！全部答對，準備好面試了！';
  if (pct >= 0.8)  return '🌟 非常好！小地方再複習一下。';
  if (pct >= 0.6)  return '💪 不錯！繼續加油，再看看錯的題目。';
  if (pct >= 0.4)  return '📚 還需要多練習，再讀一遍概念吧！';
  return '🔄 建議重新學習這個主題。';
}

function renderLeetcode(t) {
  const enNotes = t.en && t.en.lcNotes;
  return `
    <div class="block">
      <div class="block-title">🟠 LeetCode 精選 ${t.leetcode.length} 題 <span class="section-en-label">Curated Problems</span></div>
      <div class="lc-list">
        ${t.leetcode.map((p, i) => `
          <div class="lc-item">
            <div class="lc-no">#${p.no}</div>
            <div class="lc-info">
              <div class="lc-title"><a href="${p.url}" target="_blank" rel="noopener">${p.title} ↗</a></div>
              <div class="lc-note">
                <span class="bi-zh">${p.note}</span>
                ${enNotes && enNotes[i] ? `<span class="bi-en">${enNotes[i]}</span>` : ''}
              </div>
            </div>
            <span class="lc-diff d-${p.diff}">${p.diff}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="callout callout-orange">
      <b>📋 刷題建議 / Study Strategy</b><br>
      <span class="bi-zh">先把 Easy 全部做完，理解解法後再挑 Medium。Hard 題在理解前面概念後自然會有思路。建議搭配 NeetCode 的解題影片，效果更好！</span>
      <span class="bi-en">Complete all Easy problems first, then tackle Medium once you understand the patterns. Hard problems become approachable after mastering the fundamentals. Pair with NeetCode videos for best results!</span>
    </div>`;
}

function renderRefs(t) {
  return `
    <div class="block">
      <div class="block-title">📚 學習資源</div>
      <div class="ref-list">
        ${t.refs.map(r => `
          <a class="ref-item" href="${r.url}" target="_blank" rel="noopener">
            <span>🔗</span>
            <span>${r.title}</span>
          </a>`).join('')}
        <a class="ref-item" href="https://neetcode.io/practice" target="_blank" rel="noopener">
          <span>🎬</span>
          <span>NeetCode.io — 影片解題平台（強力推薦）</span>
        </a>
        <a class="ref-item" href="https://www.techinterviewhandbook.org/" target="_blank" rel="noopener">
          <span>📖</span>
          <span>Tech Interview Handbook — 系統化面試準備</span>
        </a>
      </div>
    </div>
    <div class="callout callout-purple">
      <b>🗓️ 學習路線建議</b>
      Array → Linked List → Stack/Queue → Hash Table → Tree → Graph → 排序/搜尋 → DP → Backtracking
      每個主題刷完 LeetCode 題單再繼續，保持 2-3 個月的刷題節奏準備 SWE 面試。
    </div>`;
}

// ===== Search =====
function showSearchResults(query) {
  showPage('search');
  const q = query.toLowerCase();
  const results = ALL_TOPICS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.titleEn.toLowerCase().includes(q) ||
    t.concept.summary.toLowerCase().includes(q) ||
    t.concept.properties.some(p => p.toLowerCase().includes(q)) ||
    (t.interview.howAsked || []).some(x => x.toLowerCase().includes(q))
  );

  const highlight = (str, q) => str.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi'), m => `<mark>${m}</mark>`);

  document.getElementById('search-page').innerHTML = `
    <div class="block-title">搜尋「${escHtml(query)}」的結果（${results.length} 個）</div>
    <div class="search-res">
      ${results.length === 0 ? '<div class="callout callout-orange">找不到相關主題，試試其他關鍵字。</div>' :
        results.map(t => `
          <div class="search-res-item" onclick="showTopic('${t.id}')">
            <h4>${t.icon} ${highlight(t.title, query)} <small style="color:var(--text3)">${t.titleEn}</small></h4>
            <p>${highlight(t.concept.summary.substring(0, 120), query)}…</p>
          </div>`).join('')}
    </div>`;
}

// ===== Utilities =====
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function copyCode(btn) {
  const code = btn.closest('.code-wrap').querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ 已複製';
    setTimeout(() => btn.textContent = '複製', 2000);
  });
}
