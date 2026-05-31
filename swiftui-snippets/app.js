(() => {
  const grid = document.getElementById('snippetGrid');
  const emptyState = document.getElementById('emptyState');
  const totalCount = document.getElementById('totalCount');
  const searchInput = document.getElementById('searchInput');
  const navLinks = document.querySelectorAll('.nav-link');
  const toast = document.getElementById('toast');

  let activeFilter = 'all';
  let searchQuery = '';
  let toastTimer = null;

  totalCount.textContent = SNIPPETS.length;

  function buildCard(snippet) {
    const card = document.createElement('div');
    card.className = `card cat-${snippet.category}`;
    card.dataset.category = snippet.category;

    const tags = snippet.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const isConst = snippet.category === 'constants';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${snippet.icon}</div>
        <div class="card-meta">
          <div class="card-title">${snippet.title}</div>
          <div class="card-desc">${snippet.desc}</div>
        </div>
      </div>
      <div class="card-tags">${tags}</div>

      <div class="card-tabs">
        <button class="tab-btn active" data-tab="preview">
          <svg viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 6h4M6 4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          Preview
        </button>
        <button class="tab-btn" data-tab="code">
          <svg viewBox="0 0 12 12" fill="none"><path d="M4 3L1 6l3 3M8 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Code
        </button>
      </div>

      <div class="preview-pane">${snippet.preview}</div>

      <div class="code-wrap hidden">
        <div class="code-bar">
          <div class="code-dots">
            <span class="dot dot-r"></span>
            <span class="dot dot-y"></span>
            <span class="dot dot-g"></span>
          </div>
          <span class="code-lang">${isConst ? 'Swift · Export' : 'Swift'}</span>
          <button class="copy-btn" aria-label="Copy code">
            <svg viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            Copy
          </button>
        </div>
        <pre><code>${snippet.code}</code></pre>
      </div>
    `;

    // Tab switching
    const tabs = card.querySelectorAll('.tab-btn');
    const previewPane = card.querySelector('.preview-pane');
    const codeWrap = card.querySelector('.code-wrap');

    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.stopPropagation();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.tab === 'preview') {
          previewPane.classList.remove('hidden');
          codeWrap.classList.add('hidden');
        } else {
          previewPane.classList.add('hidden');
          codeWrap.classList.remove('hidden');
        }
      });
    });

    // Copy button
    card.querySelector('.copy-btn').addEventListener('click', e => {
      e.stopPropagation();
      copySnippet(snippet);
    });

    return card;
  }

  function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
  }

  function copySnippet(snippet) {
    const plain = stripHTML(snippet.code);
    navigator.clipboard.writeText(plain).then(() => showToast());
  }

  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function render() {
    const q = searchQuery.toLowerCase();
    const visible = SNIPPETS.filter(s => {
      const matchCat = activeFilter === 'all' || s.category === activeFilter;
      const matchQ = !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    grid.innerHTML = '';
    visible.forEach(s => grid.appendChild(buildCard(s)));
    emptyState.style.display = visible.length ? 'none' : 'block';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeFilter = link.dataset.filter;
      render();
    });
  });

  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    render();
  });

  render();
})();
