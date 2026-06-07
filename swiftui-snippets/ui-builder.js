window.UIBuilder = (() => {
  /* ── State ── */
  let S = {
    controls: [], selectedId: null, nextId: 1,
    saved: {}, draggingType: null,
  };

  /* ── Control icons ── */
  const ICONS = {
    Text:'𝐓', TextField:'✏️', SecureField:'🔒', Button:'🔘',
    Image:'🖼', Label:'🏷', Toggle:'🔀', Picker:'🔽',
    VStack:'⬜', HStack:'▬', ZStack:'◫', Divider:'—',
    Spacer:'↔', ScrollView:'📜', LazyVGrid:'⊞', LazyHGrid:'⊟',
    CustomComponent:'⭐',
  };

  /* ── Palette groups ── */
  const GROUPS = [
    { title:'Layout', icon:'📐', items:['VStack','HStack','ZStack','ScrollView','LazyVGrid','LazyHGrid','Divider','Spacer'] },
    { title:'Text',   icon:'📝', items:['Text','Label'] },
    { title:'Input',  icon:'✏️', items:['TextField','SecureField','Toggle','Picker'] },
    { title:'Controls',icon:'🔘',items:['Button','Image'] },
    { title:'Custom', icon:'⭐', items:['CustomComponent'] },
  ];

  /* ── Defaults ── */
  const D = {
    Text:       { text:'Hello, World!', fontSize:16, fontWeight:'regular', textColor:'#1C1C1E', textAlignment:'leading', lineLimit:0, italic:false, underline:false },
    TextField:  { placeholder:'Enter text', textColor:'#1C1C1E', placeholderColor:'#8E8E93', bgColor:'#F2F2F7', borderColorOff:'#E5E5EA', borderColorOn:'#007AFF', borderWidth:2, cornerRadius:12, fontSize:16, fontWeight:'regular', paddingH:16, paddingV:14, leadingIcon:'', trailingIcon:'', keyboardType:'default', shadowRadius:0 },
    SecureField:{ placeholder:'Password', textColor:'#1C1C1E', bgColor:'#F2F2F7', borderColorOff:'#E5E5EA', borderColorOn:'#007AFF', borderWidth:2, cornerRadius:12, fontSize:16, paddingH:16, paddingV:14, showToggle:true },
    Button:     { label:'Button', bgColor:'#007AFF', textColor:'#FFFFFF', fontSize:16, fontWeight:'semibold', cornerRadius:14, paddingH:24, paddingV:14, borderWidth:0, borderColor:'#007AFF', shadowRadius:0, fullWidth:false, iconName:'' },
    Image:      { imageName:'photo', contentMode:'fit', width:100, height:100, cornerRadius:0, bgColor:'#E5E5EA' },
    Label:      { text:'Label', iconName:'star.fill', fontSize:16, fontWeight:'regular', textColor:'#1C1C1E', iconColor:'#007AFF' },
    Toggle:     { label:'Toggle', onColor:'#34C759', bgColor:'#FFFFFF', labelColor:'#1C1C1E', fontSize:15, cornerRadius:12, padding:14, iconName:'' },
    Picker:     { label:'Select', options:'Option 1,Option 2,Option 3', style:'menu', tintColor:'#007AFF', bgColor:'#F2F2F7', cornerRadius:10 },
    VStack:     { spacing:16, alignment:'center', padding:16, bgColor:'transparent', cornerRadius:0 },
    HStack:     { spacing:12, alignment:'center', padding:0, bgColor:'transparent', cornerRadius:0 },
    ZStack:     { alignment:'center', padding:0, bgColor:'transparent', cornerRadius:0 },
    Divider:    { color:'#E5E5EA', thickness:1 },
    Spacer:     { minLength:8 },
    ScrollView: { axis:'vertical', showsIndicators:true, spacing:16, padding:16, bgColor:'transparent' },
    LazyVGrid:  { columns:2, spacing:16, padding:16, bgColor:'transparent' },
    LazyHGrid:  { rows:2, spacing:16, padding:16, bgColor:'transparent' },
    CustomComponent: { name:'MyCustomView', width:200, height:80, bgColor:'#F2F2F7', cornerRadius:12, code:'' },
  };

  const CONTAINERS = ['VStack','HStack','ZStack','ScrollView','LazyVGrid','LazyHGrid'];
  const isContainer = t => CONTAINERS.includes(t);

  /* ── Helpers ── */
  const fw = w => ({ultraLight:100,light:200,regular:400,medium:500,semibold:600,bold:700,heavy:800,black:900}[w]||400);
  const esc = s => String(s).replace(/"/g,'\\"');
  const escH = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const uid = () => 'c'+(S.nextId++);
  const ind = (s,n) => s.split('\n').map(l=>l?'    '.repeat(n)+l:l).join('\n');

  function makeCtrl(type, x=60, y=60) {
    return { id:uid(), type, x, y, w:'auto', children: isContainer(type)?[]:undefined,
             props: { ...D[type] } };
  }

  function find(id, list=S.controls) {
    for(const c of list){ if(c.id===id) return c; if(c.children){ const f=find(id,c.children); if(f) return f; } } return null;
  }

  function remove(id, list=S.controls) {
    const i = list.findIndex(c=>c.id===id);
    if(i>-1){ list.splice(i,1); return true; }
    for(const c of list) if(c.children && remove(id,c.children)) return true;
    return false;
  }

  /* ── HTML Previews ── */
  function previewHTML(ctrl) {
    const p = ctrl.props;
    switch(ctrl.type){
      case 'Text':
        return `<span style="font-size:${p.fontSize}px;font-weight:${fw(p.fontWeight)};color:${p.textColor};font-style:${p.italic?'italic':'normal'};text-decoration:${p.underline?'underline':'none'};display:block;white-space:pre-wrap">${escH(p.text||'Text')}</span>`;

      case 'TextField':
        return `<div style="display:flex;align-items:center;gap:8px;background:${p.bgColor};border:${p.borderWidth}px solid ${p.borderColorOn};border-radius:${p.cornerRadius}px;padding:${p.paddingV}px ${p.paddingH}px;box-shadow:${p.shadowRadius>0?`0 ${Math.ceil(p.shadowRadius/2)}px ${p.shadowRadius}px rgba(0,0,0,.1)`:'none'}">
          ${p.leadingIcon?`<span style="font-size:${p.fontSize-2}px;opacity:.5">📧</span>`:''}
          <span style="font-size:${p.fontSize}px;color:${p.placeholderColor};flex:1">${escH(p.placeholder)}</span>
          ${p.trailingIcon?`<span style="font-size:${p.fontSize-2}px;opacity:.5">✕</span>`:''}
        </div>`;

      case 'SecureField':
        return `<div style="display:flex;align-items:center;gap:8px;background:${p.bgColor};border:${p.borderWidth}px solid ${p.borderColorOn};border-radius:${p.cornerRadius}px;padding:${p.paddingV}px ${p.paddingH}px">
          <span style="font-size:${p.fontSize}px;flex:1;letter-spacing:4px;color:${p.textColor}">••••••••</span>
          ${p.showToggle?`<span style="font-size:14px;color:#007aff">👁</span>`:''}
        </div>`;

      case 'Button':
        return `<div style="display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${fw(p.fontWeight)};border-radius:${p.cornerRadius}px;padding:${p.paddingV}px ${p.paddingH}px;border:${p.borderWidth>0?`${p.borderWidth}px solid ${p.borderColor}`:'none'};${p.fullWidth?'width:100%':''}">
          ${p.iconName?'→ ':''} ${escH(p.label||'Button')}
        </div>`;

      case 'Image':
        return `<div style="width:${p.width}px;height:${p.height}px;background:${p.bgColor};border-radius:${p.cornerRadius}px;display:flex;align-items:center;justify-content:center;overflow:hidden"><span style="font-size:28px;opacity:.4">🖼</span></div>`;

      case 'Label':
        return `<div style="display:inline-flex;align-items:center;gap:6px"><span style="font-size:${p.fontSize}px;color:${p.iconColor}">⭐</span><span style="font-size:${p.fontSize}px;font-weight:${fw(p.fontWeight)};color:${p.textColor}">${escH(p.text)}</span></div>`;

      case 'Toggle':
        return `<div style="display:flex;align-items:center;gap:10px;background:${p.bgColor};border-radius:${p.cornerRadius}px;padding:${p.padding}px;box-shadow:0 1px 4px rgba(0,0,0,.06)">
          ${p.iconName?`<span style="font-size:${p.fontSize+2}px">🔔</span>`:''}
          <span style="flex:1;font-size:${p.fontSize}px;font-weight:500;color:${p.labelColor}">${escH(p.label)}</span>
          <div style="width:51px;height:31px;border-radius:16px;background:${p.onColor};position:relative;flex-shrink:0"><div style="width:27px;height:27px;border-radius:14px;background:#fff;position:absolute;top:2px;right:2px;box-shadow:0 1px 4px rgba(0,0,0,.25)"></div></div>
        </div>`;

      case 'Picker': {
        const opts=(p.options||'').split(',').map(s=>s.trim());
        if(p.style==='segmented') return `<div style="display:flex;background:#e5e5ea;border-radius:10px;padding:3px;gap:2px">${opts.map((o,i)=>`<div style="flex:1;text-align:center;padding:6px 4px;border-radius:8px;background:${i===0?'#fff':'transparent'};font-size:13px;font-weight:600;color:${i===0?'#1c1c1e':'#8e8e93'}">${escH(o)}</div>`).join('')}</div>`;
        return `<div style="display:flex;align-items:center;justify-content:space-between;background:${p.bgColor};border-radius:${p.cornerRadius}px;padding:12px 16px"><span style="font-size:15px;color:#1c1c1e">${escH(opts[0]||'Select')}</span><span style="color:${p.tintColor}">▾</span></div>`;
      }

      case 'VStack': case 'HStack': case 'ZStack': case 'ScrollView':
      case 'LazyVGrid': case 'LazyHGrid':
        return containerHTML(ctrl);

      case 'Divider':
        return `<div style="width:100%;height:${p.thickness}px;background:${p.color}"></div>`;

      case 'Spacer':
        return `<div style="min-width:${p.minLength}px;min-height:${p.minLength}px;background:rgba(0,0,0,.03);border:1px dashed rgba(0,0,0,.1);border-radius:4px;display:flex;align-items:center;justify-content:center"><span style="font-size:10px;color:#8e8e93">Spacer</span></div>`;

      case 'CustomComponent':
        return `<div style="background:${p.bgColor};border-radius:${p.cornerRadius}px;width:${p.width}px;height:${p.height}px;display:flex;align-items:center;justify-content:center;border:2px dashed #ccc"><div style="text-align:center"><div style="font-size:20px">⭐</div><div style="font-size:12px;font-weight:600;color:#8e8e93;margin-top:4px">${escH(p.name||'CustomView')}</div></div></div>`;

      default: return `<div style="padding:10px;background:#f2f2f7;border-radius:8px;font-size:12px;color:#8e8e93">${ctrl.type}</div>`;
    }
  }

  function containerHTML(ctrl) {
    const p = ctrl.props;
    const ch = ctrl.children||[];
    const labels = {VStack:'🔷 VSTACK',HStack:'🟠 HSTACK',ZStack:'🟣 ZSTACK',ScrollView:'🟢 SCROLL',LazyVGrid:'🟡 LAZYVGRID',LazyHGrid:'🩷 LAZYHGRID'};
    const colors = {VStack:'#007aff',HStack:'#ff9500',ZStack:'#a78bfa',ScrollView:'#43e097',LazyVGrid:'#fbbf24',LazyHGrid:'#f472b6'};
    const cl = colors[ctrl.type]||'#ccc';
    const isH = ctrl.type==='HStack' || (ctrl.type==='ScrollView' && p.axis==='horizontal') || ctrl.type==='LazyHGrid';
    const isGrid = ctrl.type==='LazyVGrid'||ctrl.type==='LazyHGrid';
    const childrenHTML = ch.length
      ? ch.map(c=>`<div class="container-child" data-childid="${c.id}" style="pointer-events:all">${previewHTML(c)}</div>`).join('')
      : `<div class="container-empty-hint">Drop controls here</div>`;

    let innerStyle = `display:flex;flex-direction:${isH?'row':'column'};gap:${p.spacing||12}px;padding:${p.padding||12}px;`;
    if(isGrid) innerStyle = `display:grid;grid-template-columns:repeat(${p.columns||p.rows||2},1fr);gap:${p.spacing||12}px;padding:${p.padding||12}px;`;

    return `<div class="uib-container-ctrl" style="position:relative;border:1.5px dashed ${cl}44;border-radius:${p.cornerRadius||0}px;background:${p.bgColor!=='transparent'?p.bgColor:'rgba(0,0,0,.02)'};min-width:200px;min-height:60px">
      <div class="container-badge" style="position:absolute;top:-10px;left:8px;background:${cl};color:${ctrl.type==='ScrollView'||ctrl.type==='LazyVGrid'?'#000':'#fff'};font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:.5px;z-index:5">${labels[ctrl.type]}</div>
      <div style="${innerStyle}">${childrenHTML}</div>
    </div>`;
  }

  /* ── Canvas render ── */
  function renderCanvas() {
    const canvas = document.getElementById('uibCanvas');
    if(!canvas) return;
    document.getElementById('uibEmpty').style.display = S.controls.length?'none':'flex';
    canvas.querySelectorAll('.uib-wrap').forEach(el=>el.remove());

    S.controls.forEach(ctrl=>{
      const wrap = document.createElement('div');
      wrap.className = 'uib-wrap' + (ctrl.id===S.selectedId?' selected':'');
      wrap.dataset.id = ctrl.id;
      wrap.style.cssText = `position:absolute;left:${ctrl.x}px;top:${ctrl.y}px;${ctrl.w!=='auto'?`width:${ctrl.w}px`:''}`;
      wrap.innerHTML = `<div class="uib-ctrl-inner">${previewHTML(ctrl)}</div>
        ${ctrl.id===S.selectedId?`<div class="uib-mini-toolbar">
          <button class="uib-mini-btn" data-action="del">🗑</button>
          <button class="uib-mini-btn" data-action="dup">⎘</button>
          ${isContainer(ctrl.type)?`<button class="uib-mini-btn" data-action="addch">+Child</button>`:''}
        </div>`:''}`;

      wrap.addEventListener('mousedown', e=>{
        if(e.target.classList.contains('uib-mini-btn')) return;
        e.stopPropagation(); selectCtrl(ctrl.id); startDrag(e, ctrl, canvas);
      });

      wrap.querySelectorAll('.uib-mini-btn').forEach(btn=>btn.addEventListener('click', e=>{
        e.stopPropagation();
        if(btn.dataset.action==='del'){ remove(ctrl.id); S.selectedId=null; refresh(); }
        if(btn.dataset.action==='dup'){ S.selectedId=ctrl.id; duplicateSelected(); }
        if(btn.dataset.action==='addch') addChildPrompt(ctrl);
      }));

      // Container drop support
      if(isContainer(ctrl.type)){
        wrap.addEventListener('dragover', e=>{ e.preventDefault(); e.stopPropagation(); wrap.classList.add('drop-over'); });
        wrap.addEventListener('dragleave', ()=>wrap.classList.remove('drop-over'));
        wrap.addEventListener('drop', e=>{
          e.preventDefault(); e.stopPropagation(); wrap.classList.remove('drop-over');
          if(S.draggingType){ const child=makeCtrl(S.draggingType); ctrl.children.push(child); selectCtrl(child.id); refresh(); }
        });

        // Child click to select
        wrap.querySelectorAll('.container-child').forEach(ch=>{
          ch.addEventListener('mousedown', e=>{ e.stopPropagation(); selectCtrl(ch.dataset.childid); });
        });
      }

      canvas.appendChild(wrap);
    });
  }

  function startDrag(e, ctrl, canvas) {
    const ox=e.clientX-ctrl.x, oy=e.clientY-ctrl.y;
    const rect=canvas.getBoundingClientRect();
    const onMove=me=>{ ctrl.x=Math.max(0,me.clientX-ox); ctrl.y=Math.max(0,me.clientY-oy);
      const w=canvas.querySelector(`.uib-wrap[data-id="${ctrl.id}"]`);
      if(w){w.style.left=ctrl.x+'px';w.style.top=ctrl.y+'px';} };
    const onUp=()=>{ document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp); updateCode(); };
    document.addEventListener('mousemove',onMove); document.addEventListener('mouseup',onUp);
  }

  function selectCtrl(id) {
    S.selectedId=id; renderCanvas(); renderProps();
    const lbl=document.getElementById('uibSelLabel');
    if(lbl) lbl.textContent = id ? `Selected: ${find(id)?.type}` : 'SwiftUI Canvas';
  }

  function refresh() { renderCanvas(); renderProps(); updateCode(); }

  function addChildPrompt(ctrl) {
    const types = 'Text, TextField, Button, Image, Label, Toggle, Divider, Spacer, VStack, HStack';
    const type = prompt(`Add child control:\n${types}`);
    if(!type||!D[type.trim()]) return;
    ctrl.children.push(makeCtrl(type.trim())); refresh();
  }

  /* ── Actions ── */
  function deleteSelected() { if(!S.selectedId) return; remove(S.selectedId); S.selectedId=null; refresh(); }
  function duplicateSelected() {
    if(!S.selectedId) return;
    const orig=find(S.selectedId); if(!orig) return;
    const copy=JSON.parse(JSON.stringify(orig));
    copy.id=uid(); copy.x+=20; copy.y+=20;
    if(copy.children) copy.children=copy.children.map(c=>({...c,id:uid()}));
    S.controls.push(copy); selectCtrl(copy.id); refresh();
  }
  function moveUp() { const i=S.controls.findIndex(c=>c.id===S.selectedId); if(i>0){[S.controls[i-1],S.controls[i]]=[S.controls[i],S.controls[i-1]]; refresh();} }
  function moveDown() { const i=S.controls.findIndex(c=>c.id===S.selectedId); if(i<S.controls.length-1){[S.controls[i],S.controls[i+1]]=[S.controls[i+1],S.controls[i]]; refresh();} }
  function clearCanvas() { if(!S.controls.length||confirm('Clear all?')){S.controls=[];S.selectedId=null;refresh();} }

  /* ── Code Generation ── */
  function genCode() {
    if(!S.controls.length) return '// Drop controls onto the canvas to generate SwiftUI code';
    const body = S.controls.map(c=>genCtrl(c)).join('\n');
    const wrapped = S.controls.length===1 && isContainer(S.controls[0].type) ? body
      : `VStack(spacing: 16) {\n${ind(body,1)}\n}`;
    const hasHex = JSON.stringify(S.controls).includes('#');
    return `import SwiftUI\n\nstruct GeneratedView: View {\n${ind(wrapped,1)}\n}\n${hasHex?'\n'+colorExt:''}`;
  }

  function genCtrl(ctrl) {
    const p = ctrl.props;
    switch(ctrl.type) {
      case 'Text':
        return `Text("${esc(p.text||'')}")
    .font(.system(size: ${p.fontSize}, weight: .${p.fontWeight}))
    .foregroundStyle(Color(hex: "${p.textColor}"))${p.lineLimit>0?`\n    .lineLimit(${p.lineLimit})`:''}${p.italic?'\n    .italic()':''}${p.underline?'\n    .underline()':''}`;

      case 'TextField':
        return `HStack(spacing: 8) {${p.leadingIcon?`\n    Image(systemName: "${p.leadingIcon}").foregroundStyle(.secondary)`:''}
    TextField("${esc(p.placeholder)}", text: $text)
        .focused($focused)
        .font(.system(size: ${p.fontSize}, weight: .${p.fontWeight}))
        .foregroundStyle(Color(hex: "${p.textColor}"))${p.trailingIcon?`\n    Image(systemName: "${p.trailingIcon}").foregroundStyle(.secondary)`:''}
}
.padding(.horizontal, ${p.paddingH}).padding(.vertical, ${p.paddingV})
.background(Color(hex: "${p.bgColor}"))
.clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))
.overlay(RoundedRectangle(cornerRadius: ${p.cornerRadius})
    .stroke(focused ? Color(hex: "${p.borderColorOn}") : Color(hex: "${p.borderColorOff}"), lineWidth: ${p.borderWidth}))${p.shadowRadius>0?`\n.shadow(color: .black.opacity(0.08), radius: ${p.shadowRadius})`:'' }`;

      case 'SecureField':
        return `SecureField("${esc(p.placeholder)}", text: $password)
    .font(.system(size: ${p.fontSize}))
    .padding(.horizontal, ${p.paddingH}).padding(.vertical, ${p.paddingV})
    .background(Color(hex: "${p.bgColor}"))
    .clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))
    .overlay(RoundedRectangle(cornerRadius: ${p.cornerRadius})
        .stroke(Color(hex: "${p.borderColorOff}"), lineWidth: ${p.borderWidth}))`;

      case 'Button':
        return `Button { /* action */ } label: {
    ${p.iconName?`Label("${esc(p.label)}", systemImage: "${p.iconName}")`:`Text("${esc(p.label)}")`}
}
.font(.system(size: ${p.fontSize}, weight: .${p.fontWeight}))
.foregroundStyle(Color(hex: "${p.textColor}"))
.padding(.horizontal, ${p.paddingH}).padding(.vertical, ${p.paddingV})${p.fullWidth?'\n.frame(maxWidth: .infinity)':''}
.background(Color(hex: "${p.bgColor}"))
.clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))${p.borderWidth>0?`\n.overlay(RoundedRectangle(cornerRadius: ${p.cornerRadius}).stroke(Color(hex: "${p.borderColor}"), lineWidth: ${p.borderWidth}))` :''}${p.shadowRadius>0?`\n.shadow(color: Color(hex: "${p.bgColor}").opacity(0.35), radius: ${p.shadowRadius})`:''}`;

      case 'Image':
        return `Image("${esc(p.imageName)}")
    .resizable()
    .scaledTo${p.contentMode==='fill'?'Fill':'Fit'}()
    .frame(width: ${p.width}, height: ${p.height})
    .clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))`;

      case 'Label':
        return `Label("${esc(p.text)}", systemImage: "${esc(p.iconName)}")
    .font(.system(size: ${p.fontSize}, weight: .${p.fontWeight}))
    .foregroundStyle(Color(hex: "${p.textColor}"))`;

      case 'Toggle':
        return `HStack(spacing: 10) {${p.iconName?`\n    Image(systemName: "${p.iconName}")`:''}`
        +`\n    Text("${esc(p.label)}")\n        .font(.system(size: ${p.fontSize}, weight: .medium))\n        .foregroundStyle(Color(hex: "${p.labelColor}"))`
        +`\n    Spacer()\n    Toggle("", isOn: $isOn).labelsHidden().tint(Color(hex: "${p.onColor}"))`
        +`\n}\n.padding(${p.padding})\n.background(Color(hex: "${p.bgColor}"))\n.clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))`;

      case 'Picker': {
        const opts=(p.options||'').split(',').map(s=>s.trim());
        const style=p.style==='segmented'?'SegmentedPickerStyle()':p.style==='wheel'?'WheelPickerStyle()':'MenuPickerStyle()';
        return `Picker("${esc(p.label)}", selection: $selection) {\n${opts.map((o,i)=>`    Text("${esc(o)}").tag(${i})`).join('\n')}\n}\n.pickerStyle(${style})\n.tint(Color(hex: "${p.tintColor}"))`;
      }

      case 'VStack': case 'HStack': case 'ZStack': case 'ScrollView':
      case 'LazyVGrid': case 'LazyHGrid':
        return genContainer(ctrl);

      case 'Divider':
        return `Divider()${p.color!=='#E5E5EA'?`\n    .overlay(Color(hex: "${p.color}"))` :''}`;

      case 'Spacer':
        return `Spacer()${p.minLength>0?`\n    .frame(minLength: ${p.minLength})`:''}`;

      case 'CustomComponent':
        return `${esc(p.name||'CustomView')}()\n    .frame(width: ${p.width}, height: ${p.height})`;

      default: return `// ${ctrl.type}`;
    }
  }

  function genContainer(ctrl) {
    const p=ctrl.props;
    const ch=(ctrl.children||[]).map(c=>genCtrl(c)).join('\n');
    const inner = ch ? ind(ch,1) : '    // drop controls here';
    switch(ctrl.type){
      case 'VStack':
        return `VStack(alignment: .${p.alignment==='leading'?'leading':p.alignment==='trailing'?'trailing':'center'}, spacing: ${p.spacing}) {\n${inner}\n}${p.padding?`\n.padding(${p.padding})`:''}${p.bgColor!=='transparent'?`\n.background(Color(hex: "${p.bgColor}"))` :''}${p.cornerRadius>0?`\n.clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))`:''}`;
      case 'HStack':
        return `HStack(alignment: .${p.alignment==='top'?'top':p.alignment==='bottom'?'bottom':'center'}, spacing: ${p.spacing}) {\n${inner}\n}${p.padding?`\n.padding(${p.padding})`:''}${p.bgColor!=='transparent'?`\n.background(Color(hex: "${p.bgColor}"))` :''}`;
      case 'ZStack':
        return `ZStack(alignment: .${p.alignment}) {\n${inner}\n}${p.cornerRadius>0?`\n.clipShape(RoundedRectangle(cornerRadius: ${p.cornerRadius}))`:''}`;
      case 'ScrollView':
        return `ScrollView(${p.axis==='horizontal'?'[.horizontal]':'[.vertical]'}${!p.showsIndicators?', showsIndicators: false':''}) {\n    ${p.axis==='horizontal'?'HStack':'VStack'}(spacing: ${p.spacing}) {\n${ind(inner,2)}\n    }\n    .padding(${p.padding})\n}`;
      case 'LazyVGrid':
        return `LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: ${p.columns}), spacing: ${p.spacing}) {\n${inner}\n}\n.padding(${p.padding})`;
      case 'LazyHGrid':
        return `LazyHGrid(rows: Array(repeating: GridItem(.flexible()), count: ${p.rows}), spacing: ${p.spacing}) {\n${inner}\n}\n.padding(${p.padding})`;
    }
    return `// ${ctrl.type}`;
  }

  const colorExt = `// Color(hex:) — add once to your project
extension Color {
    init(hex: String) {
        let h = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var n: UInt64 = 0; Scanner(string: h).scanHexInt64(&n)
        self.init(red: Double((n>>16)&0xFF)/255, green: Double((n>>8)&0xFF)/255, blue: Double(n&0xFF)/255)
    }
}`;

  function updateCode() {
    const el=document.getElementById('uibCode'); if(el) el.textContent=genCode();
  }

  /* ── Properties Panel ── */
  const SCHEMA = {
    Text:[
      {id:'text',label:'Text',t:'text'},{id:'textColor',label:'Text Color',t:'color'},
      {id:'fontSize',label:'Font Size',t:'range',min:8,max:72},{id:'fontWeight',label:'Font Weight',t:'select',opts:['ultraLight','light','regular','medium','semibold','bold','heavy','black']},
      {id:'textAlignment',label:'Alignment',t:'select',opts:['leading','center','trailing']},
      {id:'lineLimit',label:'Line Limit',t:'range',min:0,max:20},{id:'italic',label:'Italic',t:'toggle'},{id:'underline',label:'Underline',t:'toggle'},
    ],
    TextField:[
      {id:'placeholder',label:'Placeholder',t:'text'},{id:'textColor',label:'Text Color',t:'color'},
      {id:'placeholderColor',label:'Placeholder Color',t:'color'},{id:'bgColor',label:'Background',t:'color'},
      {id:'borderColorOff',label:'Border Unfocused',t:'color'},{id:'borderColorOn',label:'Border Focused',t:'color'},
      {id:'borderWidth',label:'Border Width',t:'range',min:0,max:6,step:.5},{id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:32},
      {id:'fontSize',label:'Font Size',t:'range',min:8,max:32},{id:'fontWeight',label:'Font Weight',t:'select',opts:['ultraLight','light','regular','medium','semibold','bold']},
      {id:'paddingH',label:'Padding H',t:'range',min:0,max:48,step:2},{id:'paddingV',label:'Padding V',t:'range',min:0,max:32,step:2},
      {id:'leadingIcon',label:'Leading SF Icon',t:'text'},{id:'trailingIcon',label:'Trailing SF Icon',t:'text'},
      {id:'keyboardType',label:'Keyboard Type',t:'select',opts:['default','emailAddress','phonePad','numberPad','decimalPad','URL']},
      {id:'shadowRadius',label:'Shadow Radius',t:'range',min:0,max:24},
    ],
    SecureField:[
      {id:'placeholder',label:'Placeholder',t:'text'},{id:'textColor',label:'Text Color',t:'color'},
      {id:'bgColor',label:'Background',t:'color'},{id:'borderColorOff',label:'Border Unfocused',t:'color'},
      {id:'borderColorOn',label:'Border Focused',t:'color'},{id:'borderWidth',label:'Border Width',t:'range',min:0,max:6,step:.5},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:32},{id:'fontSize',label:'Font Size',t:'range',min:8,max:32},
      {id:'paddingH',label:'Padding H',t:'range',min:0,max:48,step:2},{id:'paddingV',label:'Padding V',t:'range',min:0,max:32,step:2},
      {id:'showToggle',label:'Show Toggle',t:'toggle'},
    ],
    Button:[
      {id:'label',label:'Label',t:'text'},{id:'iconName',label:'SF Symbol',t:'text'},
      {id:'bgColor',label:'Background',t:'color'},{id:'textColor',label:'Text Color',t:'color'},
      {id:'fontSize',label:'Font Size',t:'range',min:8,max:32},{id:'fontWeight',label:'Font Weight',t:'select',opts:['regular','medium','semibold','bold','heavy']},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:40},{id:'paddingH',label:'Padding H',t:'range',min:4,max:60,step:2},
      {id:'paddingV',label:'Padding V',t:'range',min:4,max:40,step:2},{id:'borderWidth',label:'Border Width',t:'range',min:0,max:4,step:.5},
      {id:'borderColor',label:'Border Color',t:'color'},{id:'shadowRadius',label:'Shadow Radius',t:'range',min:0,max:24},
      {id:'fullWidth',label:'Full Width',t:'toggle'},
    ],
    Image:[
      {id:'imageName',label:'Asset Name',t:'text'},{id:'contentMode',label:'Content Mode',t:'select',opts:['fit','fill']},
      {id:'width',label:'Width',t:'number',min:20,max:400},{id:'height',label:'Height',t:'number',min:20,max:400},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:80},{id:'bgColor',label:'BG Color',t:'color'},
    ],
    Label:[
      {id:'text',label:'Text',t:'text'},{id:'iconName',label:'SF Symbol',t:'text'},
      {id:'textColor',label:'Text Color',t:'color'},{id:'iconColor',label:'Icon Color',t:'color'},
      {id:'fontSize',label:'Font Size',t:'range',min:8,max:32},{id:'fontWeight',label:'Font Weight',t:'select',opts:['regular','medium','semibold','bold']},
    ],
    Toggle:[
      {id:'label',label:'Label',t:'text'},{id:'iconName',label:'SF Symbol',t:'text'},
      {id:'onColor',label:'On Color',t:'color'},{id:'bgColor',label:'Background',t:'color'},
      {id:'labelColor',label:'Label Color',t:'color'},{id:'fontSize',label:'Font Size',t:'range',min:8,max:28},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:24},{id:'padding',label:'Padding',t:'range',min:4,max:32,step:2},
    ],
    Picker:[
      {id:'label',label:'Label',t:'text'},{id:'options',label:'Options (comma)',t:'text'},
      {id:'style',label:'Style',t:'select',opts:['menu','segmented','wheel']},
      {id:'tintColor',label:'Tint Color',t:'color'},{id:'bgColor',label:'Background',t:'color'},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:24},
    ],
    VStack:[
      {id:'spacing',label:'Spacing',t:'range',min:0,max:60,step:2},{id:'alignment',label:'Alignment',t:'select',opts:['leading','center','trailing']},
      {id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},{id:'bgColor',label:'Background',t:'color'},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:32},
    ],
    HStack:[
      {id:'spacing',label:'Spacing',t:'range',min:0,max:60,step:2},{id:'alignment',label:'Alignment',t:'select',opts:['top','center','bottom']},
      {id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},{id:'bgColor',label:'Background',t:'color'},
    ],
    ZStack:[
      {id:'alignment',label:'Alignment',t:'select',opts:['center','topLeading','top','topTrailing','leading','trailing','bottomLeading','bottom','bottomTrailing']},
      {id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},{id:'bgColor',label:'Background',t:'color'},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:32},
    ],
    Divider:[{id:'color',label:'Color',t:'color'},{id:'thickness',label:'Thickness',t:'range',min:.5,max:8,step:.5}],
    Spacer:[{id:'minLength',label:'Min Length',t:'range',min:0,max:120,step:4}],
    ScrollView:[
      {id:'axis',label:'Axis',t:'select',opts:['vertical','horizontal']},{id:'showsIndicators',label:'Show Indicators',t:'toggle'},
      {id:'spacing',label:'Spacing',t:'range',min:0,max:48,step:4},{id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},
      {id:'bgColor',label:'Background',t:'color'},
    ],
    LazyVGrid:[
      {id:'columns',label:'Columns',t:'range',min:1,max:6},{id:'spacing',label:'Spacing',t:'range',min:0,max:48,step:4},
      {id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},{id:'bgColor',label:'Background',t:'color'},
    ],
    LazyHGrid:[
      {id:'rows',label:'Rows',t:'range',min:1,max:6},{id:'spacing',label:'Spacing',t:'range',min:0,max:48,step:4},
      {id:'padding',label:'Padding',t:'range',min:0,max:48,step:4},{id:'bgColor',label:'Background',t:'color'},
    ],
    CustomComponent:[
      {id:'name',label:'Component Name',t:'text'},{id:'width',label:'Width',t:'number',min:40,max:600},
      {id:'height',label:'Height',t:'number',min:20,max:400},{id:'bgColor',label:'Background',t:'color'},
      {id:'cornerRadius',label:'Corner Radius',t:'range',min:0,max:40},{id:'code',label:'Custom Code',t:'textarea'},
    ],
  };

  function renderProps() {
    const panel=document.getElementById('uibProps'); if(!panel) return;
    if(!S.selectedId){ panel.innerHTML=`<div class="uib-props-empty"><div style="font-size:32px;margin-bottom:10px">👆</div><p>Select a control<br/>to edit properties</p></div>`; return; }
    const ctrl=find(S.selectedId); if(!ctrl) return;
    const schema=SCHEMA[ctrl.type]||[];

    const posRow=(label,prop,val,isRoot)=>`<div class="uib-prop-row"><label>${label}</label><input type="number" class="uib-prop-num" data-prop="${prop}" ${isRoot?'data-root':'data-props'} value="${Math.round(val)||0}"/></div>`;

    let html=`<div class="uib-props-header"><span class="uib-props-icon">${ICONS[ctrl.type]||'◻'}</span><span class="uib-props-type">${ctrl.type}</span></div>
    <div class="uib-props-scroll">
    <div class="uib-props-section">
      <div class="uib-section-title">📍 Position</div>
      ${posRow('X','x',ctrl.x,true)} ${posRow('Y','y',ctrl.y,true)}
    </div>
    <div class="uib-props-section">
      <div class="uib-section-title">⚙️ Properties</div>
      ${schema.map(prop=>buildInput(prop, ctrl.props[prop.id])).join('')}
    </div>`;

    if(ctrl.children!==undefined){
      html+=`<div class="uib-props-section">
        <div class="uib-section-title">👶 Children (${ctrl.children.length})</div>
        ${ctrl.children.map(c=>`<div class="uib-child-row"><span>${ICONS[c.type]||'◻'} ${c.type}</span>
          <button class="uib-child-sel" data-cid="${c.id}">Select</button>
          <button class="uib-child-del" data-pid="${ctrl.id}" data-cid="${c.id}">×</button>
        </div>`).join('')}
        <button class="uib-add-ch-btn" data-pid="${ctrl.id}">+ Add Child</button>
      </div>`;
    }
    html+=`</div>`;
    panel.innerHTML=html;

    // Color sync
    panel.querySelectorAll('input[type=color]').forEach(pk=>{
      const hex=panel.querySelector(`.hex-inp[data-prop="${pk.dataset.prop}"]`);
      const sw=panel.querySelector(`.sw[data-prop="${pk.dataset.prop}"]`);
      pk.addEventListener('input',()=>{ if(hex)hex.value=pk.value.toUpperCase(); if(sw)sw.style.background=pk.value; setProp(ctrl,pk.dataset.prop,pk.value.toUpperCase(),pk.hasAttribute('data-root')); });
      if(hex)hex.addEventListener('input',()=>{ const v=hex.value.startsWith('#')?hex.value:'#'+hex.value; if(/^#[0-9a-fA-F]{6}$/.test(v)){pk.value=v;if(sw)sw.style.background=v;setProp(ctrl,hex.dataset.prop,v.toUpperCase(),false);} });
    });

    panel.querySelectorAll('[data-prop]').forEach(inp=>{
      if(inp.type==='color'||inp.classList.contains('hex-inp')) return;
      const ev = inp.type==='range'?'input':'change';
      inp.addEventListener(ev,()=>{
        let v=inp.type==='checkbox'?inp.checked:inp.value;
        if(inp.type==='range'||inp.type==='number') v=parseFloat(v);
        const isRoot=inp.hasAttribute('data-root');
        setProp(ctrl,inp.dataset.prop,v,isRoot);
        if(inp.type==='range'){const d=inp.parentElement.querySelector('.rv'); if(d)d.textContent=v;}
      });
    });

    panel.querySelectorAll('.uib-child-sel').forEach(b=>b.addEventListener('click',()=>selectCtrl(b.dataset.cid)));
    panel.querySelectorAll('.uib-child-del').forEach(b=>b.addEventListener('click',()=>{
      const par=find(b.dataset.pid); if(par?.children){par.children=par.children.filter(c=>c.id!==b.dataset.cid);refresh();}
    }));
    panel.querySelectorAll('.uib-add-ch-btn').forEach(b=>b.addEventListener('click',()=>addChildPrompt(find(b.dataset.pid))));
  }

  function buildInput(prop, val) {
    const v = val!==undefined?val:'';
    if(prop.t==='color') return `<div class="uib-prop-row"><label>${prop.label}</label>
      <div class="color-ctrl"><input type="color" value="${v||'#000000'}" class="cb-color-picker" data-prop="${prop.id}"/>
      <div class="sw cb-swatch" data-prop="${prop.id}" style="background:${v}"></div>
      <input type="text" value="${v}" class="cb-hex-input hex-inp" data-prop="${prop.id}" maxlength="7"/></div></div>`;
    if(prop.t==='range') return `<div class="uib-prop-row"><label>${prop.label}</label>
      <div class="range-ctrl"><input type="range" min="${prop.min||0}" max="${prop.max||100}" step="${prop.step||1}" value="${v}" data-prop="${prop.id}" class="cb-slider"/>
      <span class="rv">${v}</span></div></div>`;
    if(prop.t==='select') return `<div class="uib-prop-row"><label>${prop.label}</label>
      <select class="cb-select" data-prop="${prop.id}">${(prop.opts||[]).map(o=>`<option${o===String(v)?' selected':''}>${o}</option>`).join('')}</select></div>`;
    if(prop.t==='toggle') return `<div class="uib-prop-row"><label>${prop.label}</label>
      <label class="cb-toggle-label"><input type="checkbox" class="cb-toggle-check" data-prop="${prop.id}" ${v?' checked':''}/>
      <span class="cb-toggle-track"><span class="cb-toggle-thumb"></span></span></label></div>`;
    if(prop.t==='number') return `<div class="uib-prop-row"><label>${prop.label}</label>
      <input type="number" class="uib-prop-num" data-prop="${prop.id}" value="${v}" min="${prop.min||0}" max="${prop.max||9999}"/></div>`;
    if(prop.t==='textarea') return `<div class="uib-prop-col"><label>${prop.label}</label>
      <textarea class="uib-prop-ta" data-prop="${prop.id}" rows="4">${escH(String(v))}</textarea></div>`;
    return `<div class="uib-prop-row"><label>${prop.label}</label>
      <input type="text" class="uib-prop-text" data-prop="${prop.id}" value="${escH(String(v))}" placeholder="${prop.label}"/></div>`;
  }

  function setProp(ctrl, prop, val, isRoot) {
    if(isRoot) ctrl[prop]=val; else ctrl.props[prop]=val;
    renderCanvas(); updateCode();
  }

  /* ── Save / Load ── */
  function saveTemplate(container) {
    const name=prompt('Template name:'); if(!name) return;
    S.saved[name]={controls:JSON.parse(JSON.stringify(S.controls)),date:new Date().toLocaleDateString()};
    try{localStorage.setItem('swiftui_builder',JSON.stringify(S.saved));}catch(e){}
    renderSaved(container);
  }

  function renderSaved(container) {
    const list=container.querySelector('#savedList'); if(!list) return;
    try{const r=localStorage.getItem('swiftui_builder');if(r)S.saved=JSON.parse(r);}catch(e){}
    const entries=Object.entries(S.saved);
    if(!entries.length){list.innerHTML='<div class="saved-empty">No saved templates</div>';return;}
    list.innerHTML=entries.map(([name,tpl])=>`<div class="saved-item">
      <div class="saved-name">${escH(name)}</div>
      <div class="saved-meta">${tpl.controls?.length||0} ctrls · ${tpl.date||''}</div>
      <div class="saved-actions">
        <button class="uib-mini-btn2" data-load="${escH(name)}">Load</button>
        <button class="uib-mini-btn2 danger" data-del="${escH(name)}">×</button>
      </div>
    </div>`).join('');
    list.querySelectorAll('[data-load]').forEach(b=>b.addEventListener('click',()=>{
      const tpl=S.saved[b.dataset.load]; if(!tpl) return;
      S.controls=JSON.parse(JSON.stringify(tpl.controls));
      S.nextId=Date.now()%100000; S.selectedId=null; refresh();
    }));
    list.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{
      delete S.saved[b.dataset.del];
      try{localStorage.setItem('swiftui_builder',JSON.stringify(S.saved));}catch(e){}
      renderSaved(container);
    }));
  }

  /* ── Init ── */
  function initBuilder(container) {
    try{const r=localStorage.getItem('swiftui_builder');if(r)S.saved=JSON.parse(r);}catch(e){}
    container.innerHTML=shellHTML();
    attachEvents(container);
    renderCanvas(); renderProps(); updateCode(); renderSaved(container);
  }

  function shellHTML() {
    return `<div class="uib-shell">
      <!-- Palette -->
      <div class="uib-palette">
        <div class="uib-palette-hdr">Controls</div>
        <div class="uib-palette-scroll">
          ${GROUPS.map(g=>`<div class="uib-group">
            <div class="uib-group-title">${g.icon} ${g.title}</div>
            <div class="uib-group-items">
              ${g.items.map(type=>`<div class="uib-item" draggable="true" data-type="${type}" title="Click or drag to add">
                <span class="uib-item-ic">${ICONS[type]||'◻'}</span>
                <span class="uib-item-lbl">${type}</span>
              </div>`).join('')}
            </div>
          </div>`).join('')}
        </div>
        <div class="uib-saved-hdr">💾 Saved</div>
        <div id="savedList" class="uib-saved-list"></div>
      </div>

      <!-- Center -->
      <div class="uib-center">
        <div class="uib-toolbar">
          <div class="uib-tb-left">
            <button class="uib-tool" id="uibDel" title="Delete (⌫)">🗑</button>
            <button class="uib-tool" id="uibDup" title="Duplicate (⌘D)">⎘</button>
            <span class="uib-sep"></span>
            <button class="uib-tool" id="uibUp" title="Move up">↑</button>
            <button class="uib-tool" id="uibDown" title="Move down">↓</button>
          </div>
          <span class="uib-tb-label" id="uibSelLabel">SwiftUI Canvas</span>
          <div class="uib-tb-right">
            <button class="uib-tool" id="uibSave">💾 Save</button>
            <button class="uib-tool danger" id="uibClear">⊗ Clear</button>
          </div>
        </div>
        <div class="uib-canvas-wrap">
          <div class="uib-canvas" id="uibCanvas">
            <div id="uibEmpty" class="uib-empty">
              <div style="font-size:40px">⬛</div>
              <div class="uib-empty-title">Start building</div>
              <div class="uib-empty-sub">Drag or click controls from the left panel</div>
            </div>
          </div>
        </div>
        <div class="uib-code-panel">
          <div class="uib-code-bar">
            <div class="code-dots"><span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span></div>
            <span class="uib-code-file">GeneratedView.swift</span>
            <button class="copy-btn" id="uibCopy">
              <svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              Copy Code
            </button>
          </div>
          <pre class="uib-code"><code id="uibCode"></code></pre>
        </div>
      </div>

      <!-- Properties -->
      <div class="uib-props" id="uibProps"></div>
    </div>`;
  }

  function attachEvents(container) {
    container.querySelectorAll('.uib-item').forEach(item=>{
      item.addEventListener('dragstart',e=>{ S.draggingType=item.dataset.type; e.dataTransfer.effectAllowed='copy'; });
      item.addEventListener('dragend',()=>S.draggingType=null);
      item.addEventListener('click',()=>{ const ctrl=makeCtrl(item.dataset.type, 60, 60+S.controls.length*90); S.controls.push(ctrl); selectCtrl(ctrl.id); refresh(); });
    });

    const canvas=container.querySelector('#uibCanvas');
    canvas.addEventListener('dragover',e=>{e.preventDefault();canvas.classList.add('drag-over');});
    canvas.addEventListener('dragleave',e=>{if(!canvas.contains(e.relatedTarget))canvas.classList.remove('drag-over');});
    canvas.addEventListener('drop',e=>{
      e.preventDefault(); canvas.classList.remove('drag-over');
      if(!S.draggingType) return;
      const r=canvas.getBoundingClientRect();
      const ctrl=makeCtrl(S.draggingType, e.clientX-r.left-10, e.clientY-r.top-10);
      S.controls.push(ctrl); selectCtrl(ctrl.id); refresh();
    });
    canvas.addEventListener('mousedown',e=>{ if(e.target===canvas||e.target.id==='uibEmpty') selectCtrl(null); });

    container.querySelector('#uibDel')?.addEventListener('click',deleteSelected);
    container.querySelector('#uibDup')?.addEventListener('click',duplicateSelected);
    container.querySelector('#uibUp')?.addEventListener('click',moveUp);
    container.querySelector('#uibDown')?.addEventListener('click',moveDown);
    container.querySelector('#uibClear')?.addEventListener('click',clearCanvas);
    container.querySelector('#uibSave')?.addEventListener('click',()=>saveTemplate(container));
    container.querySelector('#uibCopy')?.addEventListener('click',()=>{
      const el=document.getElementById('uibCode'); if(!el) return;
      navigator.clipboard.writeText(el.textContent).then(()=>{
        const b=container.querySelector('#uibCopy'); b.textContent='✅ Copied!';
        setTimeout(()=>b.innerHTML=`<svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Copy Code`,2000);
      });
    });

    document.addEventListener('keydown',e=>{
      if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      if(!S.selectedId) return;
      if(e.key==='Delete'||e.key==='Backspace') deleteSelected();
      if((e.metaKey||e.ctrlKey)&&e.key==='d'){e.preventDefault();duplicateSelected();}
    });
  }

  return { initBuilder };
})();
