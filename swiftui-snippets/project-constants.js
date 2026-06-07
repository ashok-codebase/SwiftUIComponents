/* ═══════════════════════════════════════════════════════════════
   PROJECT CONSTANTS — Design System Analyzer
   Parses uploaded Swift constant files and feeds the builder
═══════════════════════════════════════════════════════════════ */

window.DesignSystem = (() => {

  /* ── Parsed design system state ── */
  let ds = {
    colors:  { namespace: '', items: [] },   // [{name, hex, raw}]
    fonts:   { namespace: '', items: [] },   // [{name, family, size, raw}]
    sizes:   { namespace: '', items: [] },   // [{name, value, raw}]
    images:  { namespace: '', items: [] },   // [{name, asset, raw}]
    strings: { namespace: '', items: [] },   // [{name, value, group}]
  };

  let activeConstTab = 'colors';

  /* ══════════════════════════════
     SWIFT FILE PARSER
  ══════════════════════════════ */
  function parseSwiftFile(code, type) {
    const result = { namespace: '', items: [] };

    // 1. Extract namespace (struct / enum / class name)
    const nsMatch = code.match(/(?:struct|enum|class|extension)\s+(\w+)/);
    result.namespace = nsMatch ? nsMatch[1] : guessNamespace(type);

    // 2. Find all `static let name ...` declarations
    const staticRe = /static\s+(?:let|var)\s+(\w+)\s*(?::\s*[\w.]+)?\s*=/g;
    let m;
    while ((m = staticRe.exec(code)) !== null) {
      const name = m[1];
      const afterEq = code.slice(m.index + m[0].length, m.index + m[0].length + 300);
      const lineEnd = afterEq.indexOf('\n');
      const valueLine = (lineEnd > -1 ? afterEq.slice(0, lineEnd) : afterEq).trim();

      if (type === 'colors') {
        const hex = extractHex(valueLine);
        result.items.push({ name, hex, raw: valueLine.slice(0, 60) });
      } else if (type === 'fonts') {
        const font = extractFont(valueLine);
        result.items.push({ name, ...font, raw: valueLine.slice(0, 60) });
      } else if (type === 'sizes') {
        const val = extractSize(valueLine);
        if (val !== null) result.items.push({ name, value: val, raw: valueLine.slice(0, 60) });
      } else if (type === 'images') {
        const asset = extractImage(valueLine);
        result.items.push({ name, asset, raw: valueLine.slice(0, 60) });
      } else if (type === 'strings') {
        const str = extractString(valueLine);
        if (str) result.items.push({ name, value: str, group: result.namespace });
      }
    }

    return result;
  }

  function guessNamespace(type) {
    return { colors:'AppColors', fonts:'AppFonts', sizes:'AppSizes', images:'AppImages', strings:'Strings' }[type] || 'App';
  }

  /* Color extraction — handles multiple Swift patterns */
  function extractHex(line) {
    // Color(hex: "#007AFF")
    let m = line.match(/hex:\s*"(#[0-9a-fA-F]{3,8})"/i);
    if (m) return m[1].toUpperCase();

    // #colorLiteral(red:g:b:) → convert to hex
    m = line.match(/#colorLiteral\(red:\s*([\d.]+),\s*green:\s*([\d.]+),\s*blue:\s*([\d.]+)/);
    if (m) return rgbToHex(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));

    // UIColor(red:g:b:alpha:) / Color(red:g:b:opacity:)
    m = line.match(/(?:UI)?Color\(red:\s*([\d.]+),\s*green:\s*([\d.]+),\s*blue:\s*([\d.]+)/);
    if (m) return rgbToHex(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));

    // Color("AssetName") → no hex, use placeholder derived from name
    m = line.match(/Color\("([^"]+)"\)/);
    if (m) return assetToHex(m[1]);

    // .blue / .red / .green etc.
    const namedColors = { blue:'#007AFF', red:'#FF3B30', green:'#34C759', orange:'#FF9500',
      purple:'#AF52DE', yellow:'#FFCC00', gray:'#8E8E93', black:'#000000', white:'#FFFFFF',
      pink:'#FF2D55', teal:'#5AC8FA', indigo:'#5856D6', cyan:'#32ADE6', mint:'#00C7BE' };
    m = line.match(/\.(blue|red|green|orange|purple|yellow|gray|black|white|pink|teal|indigo|cyan|mint)/i);
    if (m) return namedColors[m[1].toLowerCase()] || '#8E8E93';

    return '#8E8E93'; // fallback
  }

  function extractFont(line) {
    // Font.custom("Inter-Bold", size: 28)
    let m = line.match(/Font\.custom\("([^"]+)",\s*size:\s*([\d.]+)/);
    if (m) return { family: m[1], size: parseFloat(m[2]) };

    // .custom("Inter-Bold", size: 28)
    m = line.match(/\.custom\("([^"]+)",\s*size:\s*([\d.]+)/);
    if (m) return { family: m[1], size: parseFloat(m[2]) };

    // Font.system(size: 17, weight: .semibold)
    m = line.match(/\.system\(size:\s*([\d.]+)/);
    if (m) return { family: 'System', size: parseFloat(m[1]) };

    // UIFont.systemFont(ofSize: 17)
    m = line.match(/systemFont\(ofSize:\s*([\d.]+)/);
    if (m) return { family: 'System', size: parseFloat(m[1]) };

    // UIFont(name: "Inter-Bold", size: 17)
    m = line.match(/UIFont\(name:\s*"([^"]+)",\s*size:\s*([\d.]+)/);
    if (m) return { family: m[1], size: parseFloat(m[2]) };

    return { family: 'System', size: 17 };
  }

  function extractSize(line) {
    // : CGFloat = 16 / = CGFloat(16) / = 16.0
    let m = line.match(/=\s*CGFloat\(([\d.]+)\)/);
    if (m) return parseFloat(m[1]);
    m = line.match(/CGFloat\s*=\s*([\d.]+)/);
    if (m) return parseFloat(m[1]);
    m = line.match(/=\s*([\d.]+)/);
    if (m && !isNaN(parseFloat(m[1]))) return parseFloat(m[1]);
    return null;
  }

  function extractImage(line) {
    // Image("hero_banner")
    const m = line.match(/Image\("([^"]+)"\)/);
    return m ? m[1] : '';
  }

  function extractString(line) {
    const m = line.match(/"([^"]+)"/);
    return m ? m[1] : null;
  }

  function rgbToHex(r, g, b) {
    const toH = n => Math.round(Math.min(255, n > 1 ? n : n * 255)).toString(16).padStart(2,'0');
    return `#${toH(r)}${toH(g)}${toH(b)}`.toUpperCase();
  }

  function assetToHex(name) {
    // deterministic color from name for visual reference
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const h = ((hash % 360) + 360) % 360;
    return hslToHex(h, 65, 55);
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h/30) % 12;
    const a = s * Math.min(l, 1-l);
    const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
    return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('').toUpperCase();
  }

  /* ══════════════════════════════
     NAMESPACE ACCESSOR (for builder)
  ══════════════════════════════ */
  function resolveConst(type, constName) {
    const ns = ds[type]?.namespace;
    return ns ? `${ns}.${constName}` : constName;
  }

  function getItems(type) { return ds[type]?.items || []; }
  function getNamespace(type) { return ds[type]?.namespace || ''; }
  function hasConsts(type) { return getItems(type).length > 0; }

  /* ══════════════════════════════
     RENDER CONSTANTS TAB
  ══════════════════════════════ */
  function renderTab(container, onUpdate) {
    container.innerHTML = buildTabHTML();
    attachTabEvents(container, onUpdate);
  }

  const CONST_TABS = [
    { id:'colors',  icon:'🎨', label:'Colors',  hint:'ColorConstants.swift, AppColors.swift, Colors.swift…' },
    { id:'fonts',   icon:'🔤', label:'Fonts',   hint:'FontConstants.swift, AppFonts.swift, Typography.swift…' },
    { id:'sizes',   icon:'📐', label:'Sizes',   hint:'Dimensions.swift, Spacing.swift, AppSizes.swift…' },
    { id:'images',  icon:'🖼',  label:'Images',  hint:'ImageConstants.swift, Assets.swift, AppImages.swift…' },
    { id:'strings', icon:'📝', label:'Strings', hint:'AppStrings.swift, Strings.swift, Localizable constants…' },
  ];

  function buildTabHTML() {
    const tabs = CONST_TABS.map(t =>
      `<button class="pc-tab${t.id===activeConstTab?' active':''}" data-pctype="${t.id}">${t.icon} ${t.label}</button>`
    ).join('');

    return `
    <div class="pc-wrap">
      <!-- Header -->
      <div class="pc-header">
        <div class="pc-title">📦 Design System Analyzer</div>
        <p class="pc-subtitle">Paste your Swift constant files — the builder will use your exact naming (e.g. <code>ColorConstants.primary</code>).</p>
      </div>

      <!-- Type tabs -->
      <div class="pc-tabs">${tabs}</div>

      <!-- Content for each type -->
      <div class="pc-content" id="pcContent"></div>

      <!-- Detected constants display -->
      <div class="pc-detected" id="pcDetected" style="display:none">
        <div class="pc-detected-header">
          <span class="pc-detected-ns" id="pcNs"></span>
          <span class="pc-detected-count" id="pcCount"></span>
          <button class="pc-clear-btn" id="pcClearBtn">Clear</button>
        </div>
        <div class="pc-const-chips" id="pcChips"></div>
      </div>

      <!-- Manual entry fallback -->
      <div class="pc-manual-toggle">
        <button class="pc-manual-btn" id="pcManualBtn">+ Add manually</button>
      </div>
      <div class="pc-manual-rows" id="pcManualRows" style="display:none"></div>

      <!-- Copy generated files -->
      <div class="pc-copy-files">
        <div class="pc-copy-label">Export generated Swift files</div>
        <div class="pc-copy-grid">
          <button class="pc-copy-file-btn" data-gen="colors">⬇ AppColors.swift</button>
          <button class="pc-copy-file-btn" data-gen="fonts">⬇ AppFonts.swift</button>
          <button class="pc-copy-file-btn" data-gen="sizes">⬇ AppSizes.swift</button>
          <button class="pc-copy-file-btn" data-gen="images">⬇ AppImages.swift</button>
        </div>
      </div>
    </div>`;
  }

  function buildContentHTML(type) {
    const t = CONST_TABS.find(x => x.id === type);
    const cur = ds[type];
    const hasParsed = cur.items.length > 0;

    return `
    <div class="pc-paste-area">
      <div class="pc-paste-label">
        ${hasParsed
          ? `<span class="pc-parsed-badge">✅ ${cur.items.length} constants from <strong>${cur.namespace}</strong></span>`
          : `Paste your <strong>${t?.label}</strong> Swift file`}
      </div>
      <textarea class="pc-textarea" id="pcTextarea" placeholder="// ${t?.hint}

struct ColorConstants {
    static let primary = Color(hex: &quot;#007AFF&quot;)
    static let background = Color(&quot;AppBackground&quot;)
    static let lightGray = Color.gray.opacity(0.2)
    ...
}">${''}</textarea>
      <div class="pc-parse-row">
        <span class="pc-parse-hint" id="pcParseHint">${hasParsed ? `Detected namespace: <code>${cur.namespace}</code>` : 'Paste code above and click Analyze'}</span>
        <button class="pc-parse-btn" id="pcParseBtn">🔍 Analyze File</button>
      </div>
    </div>`;
  }

  function renderDetected(type, container) {
    const cur = ds[type];
    const detected = container.querySelector('#pcDetected');
    const ns       = container.querySelector('#pcNs');
    const count    = container.querySelector('#pcCount');
    const chips    = container.querySelector('#pcChips');

    if (!cur.items.length) { if(detected) detected.style.display='none'; return; }

    if(detected) detected.style.display='block';
    if(ns)    ns.textContent    = cur.namespace;
    if(count) count.textContent = `${cur.items.length} constant${cur.items.length!==1?'s':''} detected`;
    if(chips) chips.innerHTML   = cur.items.map(item => buildChip(type, item)).join('');
  }

  function buildChip(type, item) {
    const swatch = type==='colors' && item.hex
      ? `<span class="pc-chip-swatch" style="background:${item.hex}"></span>`
      : '';
    const sub = type==='fonts'  ? `<small>${item.family||'System'} · ${item.size||''}pt</small>`
              : type==='sizes'  ? `<small>${item.value}</small>`
              : type==='images' ? `<small>${item.asset||''}</small>`
              : '';
    return `<div class="pc-chip" title="${item.raw||''}">${swatch}<span>${item.name}</span>${sub}</div>`;
  }

  function attachTabEvents(container, onUpdate) {
    // type tab switching
    container.querySelectorAll('.pc-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeConstTab = btn.dataset.pctype;
        container.querySelectorAll('.pc-tab').forEach(b=>b.classList.toggle('active',b===btn));
        refreshContent(container, onUpdate);
      });
    });

    refreshContent(container, onUpdate);

    // copy file buttons
    container.querySelectorAll('.pc-copy-file-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = generateSwiftFile(btn.dataset.gen);
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = '✅ Copied!';
          setTimeout(()=> btn.textContent = `⬇ ${capitalise(btn.dataset.gen)}.swift`, 2000);
        });
      });
    });

    // manual add
    container.querySelector('#pcManualBtn')?.addEventListener('click', () => {
      const rows = container.querySelector('#pcManualRows');
      if(rows) { rows.style.display = rows.style.display==='none'?'flex':'none'; }
    });
  }

  function refreshContent(container, onUpdate) {
    const content = container.querySelector('#pcContent');
    if(content) content.innerHTML = buildContentHTML(activeConstTab);
    renderDetected(activeConstTab, container);
    attachContentEvents(container, onUpdate);
  }

  function attachContentEvents(container, onUpdate) {
    const parseBtn = container.querySelector('#pcParseBtn');
    const textarea = container.querySelector('#pcTextarea');

    parseBtn?.addEventListener('click', () => {
      const code = textarea?.value?.trim();
      if(!code) return;
      const result = parseSwiftFile(code, activeConstTab);
      if(result.items.length === 0) {
        const hint = container.querySelector('#pcParseHint');
        if(hint) hint.innerHTML = `<span style="color:#ff5f56">No constants detected. Check file format.</span>`;
        return;
      }
      ds[activeConstTab] = result;
      refreshContent(container, onUpdate);
      if(onUpdate) onUpdate();
    });

    // live parse hint on typing
    textarea?.addEventListener('input', () => {
      const hint = container.querySelector('#pcParseHint');
      const code = textarea.value.trim();
      if(!code) return;
      const nsM = code.match(/(?:struct|enum|class)\s+(\w+)/);
      if(nsM && hint) hint.innerHTML = `Detected: <code>${nsM[1]}</code>`;
    });

    // clear button
    container.querySelector('#pcClearBtn')?.addEventListener('click', () => {
      ds[activeConstTab] = { namespace: '', items: [] };
      refreshContent(container, onUpdate);
      if(onUpdate) onUpdate();
    });

    // manual rows
    renderManualRows(container, onUpdate);
  }

  function renderManualRows(container, onUpdate) {
    const rows = container.querySelector('#pcManualRows');
    if(!rows) return;
    const type = activeConstTab;
    const items = ds[type].items;
    rows.innerHTML = `
      <div class="pc-manual-ns">
        <input class="cb-text-input" id="pcNsInput" placeholder="Namespace (e.g. ColorConstants)" value="${ds[type].namespace}"/>
      </div>
      ${items.map((item,i) => buildManualRow(type, item, i)).join('')}
      <button class="const-add-btn" id="pcManualAddBtn">+ Add ${CONST_TABS.find(t=>t.id===type)?.label || ''}</button>`;

    rows.querySelector('#pcNsInput')?.addEventListener('input', e => {
      ds[type].namespace = e.target.value.trim();
      if(onUpdate) onUpdate();
    });
    rows.querySelector('#pcManualAddBtn')?.addEventListener('click', () => {
      ds[type].items.push(emptyItem(type));
      renderManualRows(container, onUpdate);
    });
    rows.querySelectorAll('.pc-manual-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        ds[type].items.splice(parseInt(btn.dataset.i), 1);
        renderManualRows(container, onUpdate);
        if(onUpdate) onUpdate();
      });
    });
    rows.querySelectorAll('[data-field]').forEach(inp => {
      inp.addEventListener('input', () => {
        const i = parseInt(inp.dataset.i);
        ds[type].items[i][inp.dataset.field] = inp.value;
        if(inp.dataset.field==='hex' && type==='colors') {
          const sw = rows.querySelector(`.pc-swatch[data-i="${i}"]`);
          if(sw) sw.style.background = inp.value;
        }
        if(onUpdate) onUpdate();
      });
    });
    rows.querySelectorAll('.pc-manual-picker').forEach(pk => {
      pk.addEventListener('input', () => {
        const i = parseInt(pk.dataset.i);
        ds[type].items[i].hex = pk.value.toUpperCase();
        const sw = rows.querySelector(`.pc-swatch[data-i="${i}"]`);
        const hxInp = rows.querySelector(`[data-field="hex"][data-i="${i}"]`);
        if(sw) sw.style.background = pk.value;
        if(hxInp) hxInp.value = pk.value.toUpperCase();
        if(onUpdate) onUpdate();
      });
    });
  }

  function buildManualRow(type, item, i) {
    if(type==='colors') return `<div class="const-row">
      <input type="color" value="${item.hex||'#007AFF'}" class="cb-color-picker pc-manual-picker" data-i="${i}"/>
      <div class="cb-swatch pc-swatch" data-i="${i}" style="background:${item.hex||'#007AFF'}"></div>
      <input class="cb-text-input" placeholder="name" value="${item.name||''}" data-field="name" data-i="${i}" style="flex:1"/>
      <input class="cb-hex-input" placeholder="#hex" value="${item.hex||''}" data-field="hex" data-i="${i}" maxlength="7"/>
      <button class="remove-btn pc-manual-remove" data-i="${i}">×</button></div>`;
    if(type==='fonts') return `<div class="const-row">
      <input class="cb-text-input" placeholder="name" value="${item.name||''}" data-field="name" data-i="${i}" style="flex:1"/>
      <input class="cb-text-input" placeholder="FontFamily-Weight" value="${item.family||''}" data-field="family" data-i="${i}" style="flex:1.2"/>
      <input class="cb-hex-input" placeholder="18pt" value="${item.size||''}" data-field="size" data-i="${i}" style="width:44px"/>
      <button class="remove-btn pc-manual-remove" data-i="${i}">×</button></div>`;
    if(type==='sizes') return `<div class="const-row">
      <input class="cb-text-input" placeholder="name (e.g. spacingMD)" value="${item.name||''}" data-field="name" data-i="${i}" style="flex:1"/>
      <input class="cb-hex-input" placeholder="16" value="${item.value||''}" data-field="value" data-i="${i}" style="width:64px"/>
      <button class="remove-btn pc-manual-remove" data-i="${i}">×</button></div>`;
    if(type==='images') return `<div class="const-row">
      <input class="cb-text-input" placeholder="name" value="${item.name||''}" data-field="name" data-i="${i}" style="flex:1"/>
      <input class="cb-text-input" placeholder="asset name" value="${item.asset||''}" data-field="asset" data-i="${i}" style="flex:1.5"/>
      <button class="remove-btn pc-manual-remove" data-i="${i}">×</button></div>`;
    if(type==='strings') return `<div class="const-row">
      <input class="cb-text-input" placeholder="group" value="${item.group||''}" data-field="group" data-i="${i}" style="width:70px"/>
      <input class="cb-text-input" placeholder="name" value="${item.name||''}" data-field="name" data-i="${i}" style="flex:1"/>
      <input class="cb-text-input" placeholder="value" value="${item.value||''}" data-field="value" data-i="${i}" style="flex:1.5"/>
      <button class="remove-btn pc-manual-remove" data-i="${i}">×</button></div>`;
    return '';
  }

  function emptyItem(type) {
    if(type==='colors')  return {name:'',hex:'#007AFF'};
    if(type==='fonts')   return {name:'',family:'',size:17};
    if(type==='sizes')   return {name:'',value:16};
    if(type==='images')  return {name:'',asset:''};
    if(type==='strings') return {name:'',value:'',group:''};
    return {};
  }

  /* ══════════════════════════════
     SWIFT FILE GENERATORS
  ══════════════════════════════ */
  function generateSwiftFile(type) {
    const { namespace, items } = ds[type] || {};
    const ns = namespace || guessNamespace(type);
    const filtered = (items||[]).filter(i=>i.name);

    if(type==='colors') {
      const lines = filtered.map(c=>
        `    static let ${pad(c.name,16)} = Color(hex: "${c.hex||'#000000'}")`
      );
      return `// ${ns}.swift\nimport SwiftUI\n\nstruct ${ns} {\n${lines.join('\n')||'    // No colors defined'}\n}\n\n// Color(hex:) extension\nextension Color {\n    init(hex: String) {\n        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)\n        var int: UInt64 = 0\n        Scanner(string: hex).scanHexInt64(&int)\n        self.init(red: Double((int >> 16) & 0xFF) / 255,\n                  green: Double((int >>  8) & 0xFF) / 255,\n                  blue:  Double(int & 0xFF) / 255)\n    }\n}\n\n// Usage: Text("").foregroundStyle(${ns}.${filtered[0]?.name||'primary'})`;
    }
    if(type==='fonts') {
      const lines = filtered.map(f=>
        `    static let ${pad(f.name,14)} = ${f.family&&f.family!=='System'?`Font.custom("${f.family}", size: ${f.size||17})`:`Font.system(size: ${f.size||17})`}`
      );
      return `// ${ns}.swift\nimport SwiftUI\n\nstruct ${ns} {\n${lines.join('\n')||'    // No fonts defined'}\n}\n\n// Usage: Text("").font(${ns}.${filtered[0]?.name||'heading'})`;
    }
    if(type==='sizes') {
      const lines = filtered.map(s=>
        `    static let ${pad(s.name,16)}: CGFloat = ${s.value||0}`
      );
      return `// ${ns}.swift\nimport SwiftUI\n\nstruct ${ns} {\n${lines.join('\n')||'    // No sizes defined'}\n}\n\n// Usage: .padding(${ns}.${filtered[0]?.name||'spacingMD'})`;
    }
    if(type==='images') {
      const lines = filtered.map(i=>
        `    static let ${pad(i.name,16)} = Image("${i.asset||i.name}")`
      );
      return `// ${ns}.swift\nimport SwiftUI\n\nstruct ${ns} {\n${lines.join('\n')||'    // No images defined'}\n}\n\n// Usage: ${ns}.${filtered[0]?.name||'hero'}.resizable().scaledToFill()`;
    }
    return '';
  }

  function pad(str, len) { return String(str).padEnd(len); }
  function capitalise(s) { return s.charAt(0).toUpperCase()+s.slice(1); }

  /* ══════════════════════════════
     PUBLIC API
  ══════════════════════════════ */
  return {
    renderTab,
    resolveConst,
    getItems,
    getNamespace,
    hasConsts,
    ds,
    /** cv() — for use in component code generators */
    cv(propConsts, propId, rawVal, type) {
      const constName = propConsts[propId];
      if (constName) {
        const ns = this.getNamespace(type === 'color' ? 'colors' : type === 'size' ? 'sizes' : type);
        if (ns) return `${ns}.${constName}`;
        return constName;
      }
      if (type === 'color') return `Color(hex: "${rawVal}")`;
      return String(rawVal);
    },
    /** pills HTML for a given property */
    pillsHTML(propId, type, linkedConst) {
      const listType = type === 'color' ? 'colors' : type === 'size' ? 'sizes' : null;
      if (!listType) return '';
      const items = this.getItems(listType);
      if (!items.length) return '';
      const ns = this.getNamespace(listType);
      return `<div class="const-pills">
        ${items.map(it=>`<span class="const-pill${linkedConst===it.name?' linked':''}" data-prop="${propId}" data-const="${it.name}" data-hex="${it.hex||''}" data-val="${it.value||''}" title="${ns}.${it.name}">${it.name}</span>`).join('')}
      </div>`;
    },
    needsHexExt(propConsts, allProps) {
      return allProps.some(p => p.ctype==='color' && !propConsts[p.id]);
    },
  };
})();
