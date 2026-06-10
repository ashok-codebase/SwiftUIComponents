(() => {
  // ── DOM refs ──
  const body        = document.body;   // id="portal", class="platform-ios"
  const grid        = document.getElementById('snippetGrid');
  const emptyState  = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const toast       = document.getElementById('toast');

  // ── State ──
  let activeFilter   = 'all';
  let searchQuery    = '';
  let activePlatform = 'ios';
  let activeSection  = 'overview';
  let toastTimer     = null;

  // ── Helpers ──
  function currentSnippets() {
    return activePlatform === 'android' ? ANDROID_SNIPPETS : SNIPPETS;
  }

  // ──────────────────────────────────────────────────────
  // PLATFORM SWITCHING
  // ──────────────────────────────────────────────────────
  document.querySelectorAll('.ptoggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activePlatform = btn.dataset.platform;
      const isIos = activePlatform === 'ios';

      document.querySelectorAll('.ptoggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      body.className = isIos ? 'platform-ios' : 'platform-android';
      document.title = isIos ? 'DevCraft · SwiftUI Snippets' : 'DevCraft · Compose Snippets';

      applyPlatformContent(isIos);

      if (activeSection === 'snippets') {
        activeFilter = 'all';
        searchQuery  = '';
        searchInput.value = '';
        updateSnippetsMeta('all');
        render();
      }
    });
  });

  function applyPlatformContent(isIos) {
    // Logo mark bg colour is driven by CSS --accent, just update text
    document.getElementById('sb-track-label').textContent =
      isIos ? 'SwiftUI Track' : 'Compose Track';
    document.getElementById('sb-arch-link').textContent =
      isIos ? 'iOS Architecture' : 'Android Architecture';

    // Hero badge
    document.getElementById('hero-badge').textContent =
      isIos ? 'DEVCRAFT · iOS TRACK' : 'DEVCRAFT · ANDROID TRACK';

    // Featured card text
    document.getElementById('feat-title').textContent  = isIos ? 'SwiftUI' : 'Jetpack Compose';
    document.getElementById('feat-body').textContent   = isIos
      ? "Master SwiftUI's declarative model: views & state, layout system, animations, navigation stacks, and composable view modifiers — 57 annotated examples."
      : "Master Jetpack Compose's declarative model: composables, state hoisting, animations, navigation graphs, and Material 3 components — 57 annotated examples.";
    document.getElementById('ced-filename').textContent =
      isIos ? 'TRANSACTIONROW.SWIFT' : 'FEEDSCREEN.KT';
    // swap code panels
    document.getElementById('ced-ios').style.display     = isIos ? '' : 'none';
    document.getElementById('ced-android').style.display = isIos ? 'none' : '';
    // ced-copy-btn target
    const cedCopy = document.querySelector('.ced-copy-btn');
    if (cedCopy) cedCopy.dataset.target = isIos ? 'ced-ios' : 'ced-android';

    // Standards subtitle
    document.getElementById('standards-sub').textContent = isIos
      ? 'Naming conventions, file structure & DRY principles — SwiftUI edition'
      : 'Naming conventions, file structure & DRY principles — Compose edition';

    // Architecture title
    document.getElementById('arch-title').textContent =
      isIos ? 'MVVM — SwiftUI' : 'MVVM — Jetpack Compose';

    // Platform-specific content blocks
    document.querySelectorAll('.ios-only').forEach(el => { el.style.display = isIos ? '' : 'none'; });
    document.querySelectorAll('.android-only').forEach(el => { el.style.display = isIos ? 'none' : ''; });

    // Review platform text
    document.getElementById('review-perf').textContent = isIos
      ? 'No unnecessary redraws. Heavy work off the main thread. Pagination for lists > 50 items.'
      : 'Use stable keys for LazyColumn items. Heavy work in ViewModel. Pagination with Paging 3.';
    document.getElementById('review-test').textContent = isIos
      ? 'At minimum, ViewModel unit tests for happy path + error path. UI tests for critical flows.'
      : 'ViewModel unit tests with Turbine for StateFlow. UI tests with Compose Testing APIs.';
    document.getElementById('chk-1').textContent = isIos
      ? 'No @State for server data — use @Published in ViewModel'
      : 'No remember for server data — use StateFlow in ViewModel';
    document.getElementById('chk-2').textContent = isIos
      ? 'No business logic in View body'
      : 'No business logic in @Composable body';
    document.getElementById('chk-3').textContent = isIos
      ? 'async/await used for all network calls'
      : 'viewModelScope.launch used for all async calls';
    document.getElementById('chk-4').textContent = isIos
      ? 'ViewModel unit tested with @MainActor'
      : 'ViewModel unit tested with TestCoroutineDispatcher';
    document.getElementById('reject-1').textContent = isIos
      ? 'Force-unwrap (!) on optional that could be nil in production'
      : 'Non-null assertion (!!) on nullable that could throw NPE';
    document.getElementById('reject-2-desc').innerHTML = isIos
      ? 'Move to <code class="ic ic-accent">.task</code> modifier or ViewModel\'s <code class="ic ic-accent">fetchOnLoad()</code>'
      : 'Move to <code class="ic ic-accent">LaunchedEffect</code> or ViewModel\'s <code class="ic ic-accent">init { fetch() }</code>';
    document.getElementById('reject-3-desc').innerHTML = isIos
      ? 'Use env variables, <code class="ic ic-accent">.xcconfig</code>, or a secrets manager'
      : 'Use env variables, <code class="ic ic-accent">BuildConfig</code>, or a secrets manager';

    // Snippets sub
    const count = currentSnippets().length;
    document.getElementById('snippets-sub').textContent =
      `${count} copy-ready ${isIos ? 'SwiftUI' : 'Jetpack Compose'} examples with live preview`;
  }

  // ──────────────────────────────────────────────────────
  // SECTION NAVIGATION
  // ──────────────────────────────────────────────────────
  const ALL_SECTIONS = ['overview', 'snippets', 'standards', 'arch', 'review'];

  function showSection(sectionId, filter) {
    activeSection = sectionId;

    ALL_SECTIONS.forEach(id => {
      const el = document.getElementById('section-' + id);
      if (el) el.style.display = 'none';
    });

    const target = document.getElementById('section-' + sectionId);
    if (target) target.style.display = 'block';

    // Update sidebar active
    document.querySelectorAll('.sb-item').forEach(item => item.classList.remove('active'));
    let sbMatch = null;
    if (sectionId === 'snippets' && filter) {
      sbMatch = [...document.querySelectorAll('.sb-item')].find(
        item => item.dataset.section === 'snippets' && item.dataset.filter === filter
      );
    }
    if (!sbMatch) {
      sbMatch = [...document.querySelectorAll('.sb-item')].find(
        item => item.dataset.section === sectionId && !item.dataset.filter
      );
    }
    if (sbMatch) sbMatch.classList.add('active');

    // Update topnav active
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const navMatch = [...document.querySelectorAll('.nav-link')].find(
      l => l.dataset.section === sectionId
    );
    if (navMatch) navMatch.classList.add('active');

    if (sectionId === 'snippets') {
      activeFilter = filter || 'all';
      searchQuery  = '';
      searchInput.value = '';
      updateSnippetsMeta(activeFilter);
      render();
    }

    // Scroll to top
    const mc = document.getElementById('mainContent');
    if (mc) mc.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // Expose for onclick= in HTML
  window.showSection = showSection;

  // Sidebar items
  document.querySelectorAll('.sb-item').forEach(item => {
    item.addEventListener('click', () => showSection(item.dataset.section, item.dataset.filter || null));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSection(item.dataset.section, item.dataset.filter || null);
      }
    });
  });

  // Topnav links
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', () => showSection(link.dataset.section, link.dataset.filter || null));
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSection(link.dataset.section, link.dataset.filter || null);
      }
    });
  });

  // Logo → overview
  document.querySelector('.nav-logo').addEventListener('click', () => showSection('overview'));

  function updateSnippetsMeta(filter) {
    const labels = {
      all: 'All Snippets', layout: 'Layout', controls: 'Controls',
      animation: 'Animation', navigation: 'Navigation', styling: 'Styling', constants: 'Constants'
    };
    const label   = labels[filter] || 'All Snippets';
    const count   = currentSnippets().filter(s => filter === 'all' || s.category === filter).length;
    const platform = activePlatform === 'ios' ? 'SwiftUI' : 'Compose';

    document.getElementById('snippets-eyebrow').textContent = label;
    document.getElementById('snippets-title').textContent   = label;
    document.getElementById('snippets-sub').textContent     =
      `${count} copy-ready ${platform} examples with live preview`;
  }

  // ──────────────────────────────────────────────────────
  // SEARCH
  // ──────────────────────────────────────────────────────
  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    if (searchQuery && activeSection !== 'snippets') {
      showSection('snippets', 'all');
    }
    if (activeSection === 'snippets') render();
  });

  // ⌘K focuses search
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // ──────────────────────────────────────────────────────
  // SNIPPET RENDERING
  // ──────────────────────────────────────────────────────
  function buildCard(snippet) {
    const card = document.createElement('div');
    card.className = `card cat-${snippet.category}`;
    card.dataset.category = snippet.category;

    const tags      = snippet.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const isConst   = snippet.category === 'constants';
    const isAndroid = activePlatform === 'android';
    const langLabel = isAndroid
      ? (isConst ? 'Kotlin · Export' : 'Kotlin')
      : (isConst ? 'Swift · Export' : 'Swift');

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
          <svg viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/>
            <path d="M4 6h4M6 4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          Preview
        </button>
        <button class="tab-btn" data-tab="code">
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M4 3L1 6l3 3M8 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
          <span class="code-lang">${langLabel}</span>
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

    const tabs        = card.querySelectorAll('.tab-btn');
    const previewPane = card.querySelector('.preview-pane');
    const codeWrap    = card.querySelector('.code-wrap');

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

    card.querySelector('.copy-btn').addEventListener('click', e => {
      e.stopPropagation();
      const text = stripHTML(snippet.code);
      navigator.clipboard.writeText(text).then(showToast);
    });

    return card;
  }

  function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
  }

  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function render() {
    const q = searchQuery.toLowerCase();
    const snippets = currentSnippets();
    const visible = snippets.filter(s => {
      const matchCat = activeFilter === 'all' || s.category === activeFilter;
      const matchQ   = !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    grid.innerHTML = '';
    visible.forEach(s => grid.appendChild(buildCard(s)));
    emptyState.style.display = visible.length ? 'none' : 'block';
  }

  // ──────────────────────────────────────────────────────
  // ARCH + FEATURED COPY BUTTONS
  // ──────────────────────────────────────────────────────
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-arch-btn, .ced-copy-btn');
    if (!btn) return;
    const el = document.getElementById(btn.dataset.target);
    if (el) navigator.clipboard.writeText(el.textContent).then(showToast);
  });

  // ──────────────────────────────────────────────────────
  // INIT
  // ──────────────────────────────────────────────────────
  applyPlatformContent(true); // default iOS
})();
