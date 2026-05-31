(() => {
  const toggleBtn  = document.getElementById('generatorToggle');
  const panel      = document.getElementById('generatorPanel');
  const main       = document.getElementById('snippetsMain');
  const toast      = document.getElementById('toast');
  let toastTimer   = null;

  // ── Project Constants ─────────────────────────────────
  let projectConsts = { colors: [], fonts: [], sizes: [], images: [] };
  let propConsts = {}; // { propId: constName }
  let activeBuilderTab = 'build'; // 'build' | 'constants'

  // ── Toggle panel ─────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    const open = panel.style.display !== 'none';
    panel.style.display = open ? 'none' : 'block';
    main.style.display  = open ? 'block' : 'none';
    toggleBtn.classList.toggle('active', !open);
    if (!open) initGenerator();
  });

  // ── cv helper ─────────────────────────────────────────
  function cv(propId, rawValue, type) {
    const name = propConsts[propId];
    if (name) {
      if (type === 'color') return `AppColors.${name}`;
      if (type === 'font')  return `AppFonts.${name}`;
      if (type === 'size')  return `AppSizes.${name}`;
    }
    if (type === 'color') return `Color(hex: "${rawValue}")`;
    return rawValue;
  }

  // ── Component definitions ─────────────────────────────
  const COMPONENTS = {
    textfield: {
      label: 'TextField', icon: '✏️',
      props: [
        { id: 'placeholder',      label: 'Placeholder Text',   type: 'text',   default: 'Enter your email' },
        { id: 'textColor',        label: 'Text Color',         type: 'color',  default: '#1C1C1E' },
        { id: 'placeholderColor', label: 'Placeholder Color',  type: 'color',  default: '#8E8E93' },
        { id: 'bgColor',          label: 'Background Color',   type: 'color',  default: '#F2F2F7' },
        { id: 'borderColorOff',   label: 'Border (Unfocused)', type: 'color',  default: '#E5E5EA' },
        { id: 'borderColorOn',    label: 'Border (Focused)',   type: 'color',  default: '#007AFF' },
        { id: 'borderWidth',      label: 'Border Width',       type: 'range',  default: 1.5, min: 0, max: 4, step: 0.5 },
        { id: 'cornerRadius',     label: 'Corner Radius',      type: 'range',  default: 12,  min: 0, max: 32, step: 1 },
        { id: 'fontSize',         label: 'Font Size',          type: 'range',  default: 16,  min: 10, max: 32, step: 1 },
        { id: 'fontWeight',       label: 'Font Weight',        type: 'select', default: 'regular', options: ['ultraLight','light','regular','medium','semibold','bold','heavy','black'] },
        { id: 'paddingH',         label: 'Horizontal Padding', type: 'range',  default: 16,  min: 0, max: 40, step: 2 },
        { id: 'paddingV',         label: 'Vertical Padding',   type: 'range',  default: 14,  min: 0, max: 32, step: 2 },
        { id: 'iconName',         label: 'Leading Icon (SF)',  type: 'text',   default: 'envelope' },
        { id: 'shadowRadius',     label: 'Shadow Radius',      type: 'range',  default: 0,   min: 0, max: 20, step: 1 },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div class="cb-field-wrap">
            <div class="cb-field" style="background:${v.bgColor};border-radius:${v.cornerRadius}px;border:${v.borderWidth}px solid ${v.borderColorOn};padding:${v.paddingV}px ${v.paddingH}px;display:flex;align-items:center;gap:8px;box-shadow:${v.shadowRadius > 0 ? `0 ${v.shadowRadius/2}px ${v.shadowRadius}px rgba(0,0,0,0.12)` : 'none'};">
              ${v.iconName ? `<span style="font-size:${v.fontSize}px;opacity:0.5">📧</span>` : ''}
              <span style="font-size:${v.fontSize}px;color:${v.placeholderColor}">${v.placeholder || 'Placeholder'}</span>
            </div>
            <div style="margin-top:10px;font-size:11px;color:#8e8e93;text-align:center">↑ Focused state</div>
            <div class="cb-field" style="background:${v.bgColor};border-radius:${v.cornerRadius}px;border:${v.borderWidth}px solid ${v.borderColorOff};padding:${v.paddingV}px ${v.paddingH}px;display:flex;align-items:center;gap:8px;margin-top:6px;box-shadow:${v.shadowRadius > 0 ? `0 ${v.shadowRadius/2}px ${v.shadowRadius}px rgba(0,0,0,0.12)` : 'none'};">
              ${v.iconName ? `<span style="font-size:${v.fontSize}px;opacity:0.4">📧</span>` : ''}
              <span style="font-size:${v.fontSize}px;color:${v.textColor}">john@example.com</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:#8e8e93;text-align:center">↑ Filled state</div>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// CustomTextField.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CustomTextField</span>: <span class="ty">View</span> {
    <span class="kw">let</span> placeholder: <span class="ty">String</span>
    <span class="pa">@Binding</span> <span class="kw">var</span> text: <span class="ty">String</span>
    <span class="pa">@FocusState</span> <span class="kw">private var</span> isFocused: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {${v.iconName ? `
            <span class="ty">Image</span>(systemName: <span class="st">"${v.iconName}"</span>)
                .foregroundStyle(.secondary)` : ''}
            <span class="ty">TextField</span>(placeholder, text: $text)
                .focused($isFocused)
                .font(.system(size: <span class="nu">${v.fontSize}</span>, weight: .${v.fontWeight}))
                .foregroundStyle(${cv('textColor', v.textColor, 'color')})
        }
        .padding(.horizontal, <span class="nu">${v.paddingH}</span>)
        .padding(.vertical, <span class="nu">${v.paddingV}</span>)
        .background(${cv('bgColor', v.bgColor, 'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
        .overlay(
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>)
                .stroke(isFocused ? ${cv('borderColorOn', v.borderColorOn, 'color')} : ${cv('borderColorOff', v.borderColorOff, 'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>)
        )${v.shadowRadius > 0 ? `
        .shadow(color: .black.opacity(<span class="nu">0.08</span>), radius: <span class="nu">${v.shadowRadius}</span>, y: <span class="nu">${Math.round(v.shadowRadius/2)}</span>)` : ''}
    }
}`
    },

    button: {
      label: 'Button', icon: '🔘',
      props: [
        { id: 'label',        label: 'Button Label',       type: 'text',   default: 'Continue' },
        { id: 'bgColor',      label: 'Background Color',   type: 'color',  default: '#007AFF' },
        { id: 'bgColorPress', label: 'Pressed Color',      type: 'color',  default: '#0055D4' },
        { id: 'textColor',    label: 'Text Color',         type: 'color',  default: '#FFFFFF' },
        { id: 'fontSize',     label: 'Font Size',          type: 'range',  default: 16, min: 10, max: 28, step: 1 },
        { id: 'fontWeight',   label: 'Font Weight',        type: 'select', default: 'semibold', options: ['regular','medium','semibold','bold','heavy'] },
        { id: 'cornerRadius', label: 'Corner Radius',      type: 'range',  default: 14, min: 0, max: 40, step: 1 },
        { id: 'paddingH',     label: 'Horizontal Padding', type: 'range',  default: 24, min: 8, max: 60, step: 2 },
        { id: 'paddingV',     label: 'Vertical Padding',   type: 'range',  default: 16, min: 8, max: 40, step: 2 },
        { id: 'borderColor',  label: 'Border Color',       type: 'color',  default: '#007AFF' },
        { id: 'borderWidth',  label: 'Border Width',       type: 'range',  default: 0,  min: 0, max: 4, step: 0.5 },
        { id: 'shadowRadius', label: 'Shadow Radius',      type: 'range',  default: 8,  min: 0, max: 24, step: 1 },
        { id: 'iconName',     label: 'SF Symbol Icon',     type: 'text',   default: '' },
        { id: 'fullWidth',    label: 'Full Width',         type: 'toggle', default: true },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <button class="cb-btn" style="background:${v.bgColor};color:${v.textColor};font-size:${v.fontSize}px;font-weight:${v.fontWeight==='semibold'?600:v.fontWeight==='bold'?700:v.fontWeight==='medium'?500:v.fontWeight==='heavy'?800:400};border-radius:${v.cornerRadius}px;padding:${v.paddingV}px ${v.paddingH}px;border:${v.borderWidth>0?`${v.borderWidth}px solid ${v.borderColor}`:'none'};box-shadow:${v.shadowRadius>0?`0 ${v.shadowRadius/2}px ${v.shadowRadius}px ${v.bgColor}55`:'none'};width:${v.fullWidth?'100%':'auto'};display:flex;align-items:center;justify-content:center;gap:8px;cursor:default;">${v.iconName?`<span>→</span>`:''}${v.label||'Button'}</button>
        </div>`,
      code: (v) => `<span class="cm">// CustomButton.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CustomButtonStyle</span>: <span class="ty">ButtonStyle</span> {
    <span class="kw">func</span> <span class="fn">makeBody</span>(configuration: <span class="ty">Configuration</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        configuration.label
            .font(.system(size: <span class="nu">${v.fontSize}</span>, weight: .${v.fontWeight}))
            .foregroundStyle(${cv('textColor', v.textColor, 'color')})
            .padding(.horizontal, <span class="nu">${v.paddingH}</span>)
            .padding(.vertical, <span class="nu">${v.paddingV}</span>)${v.fullWidth ? `
            .frame(maxWidth: .infinity)` : ''}
            .background(configuration.isPressed ? ${cv('bgColorPress', v.bgColorPress, 'color')} : ${cv('bgColor', v.bgColor, 'color')})
            .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))${v.borderWidth > 0 ? `
            .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).stroke(${cv('borderColor', v.borderColor, 'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>))` : ''}${v.shadowRadius > 0 ? `
            .shadow(color: ${cv('bgColor', v.bgColor, 'color')}.opacity(<span class="nu">0.35</span>), radius: <span class="nu">${v.shadowRadius}</span>, y: <span class="nu">${Math.round(v.shadowRadius/2)}</span>)` : ''}
            .scaleEffect(configuration.isPressed ? <span class="nu">0.97</span> : <span class="nu">1</span>)
            .animation(.spring(duration: <span class="nu">0.2</span>), value: configuration.isPressed)
    }
}`
    },

    card: {
      label: 'Card', icon: '🃏',
      props: [
        { id: 'bgColor',       label: 'Card Background', type: 'color',  default: '#FFFFFF' },
        { id: 'cornerRadius',  label: 'Corner Radius',   type: 'range',  default: 16, min: 0, max: 40, step: 1 },
        { id: 'padding',       label: 'Inner Padding',   type: 'range',  default: 20, min: 0, max: 48, step: 2 },
        { id: 'borderColor',   label: 'Border Color',    type: 'color',  default: '#E5E5EA' },
        { id: 'borderWidth',   label: 'Border Width',    type: 'range',  default: 1,  min: 0, max: 4, step: 0.5 },
        { id: 'shadowColor',   label: 'Shadow Color',    type: 'color',  default: '#000000' },
        { id: 'shadowOpacity', label: 'Shadow Opacity',  type: 'range',  default: 8,  min: 0, max: 40, step: 1 },
        { id: 'shadowRadius',  label: 'Shadow Radius',   type: 'range',  default: 16, min: 0, max: 40, step: 1 },
        { id: 'shadowY',       label: 'Shadow Y Offset', type: 'range',  default: 4,  min: 0, max: 24, step: 1 },
        { id: 'titleColor',    label: 'Title Color',     type: 'color',  default: '#1C1C1E' },
        { id: 'subtitleColor', label: 'Subtitle Color',  type: 'color',  default: '#8E8E93' },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.padding}px;border:${v.borderWidth>0?`${v.borderWidth}px solid ${v.borderColor}`:'none'};box-shadow:0 ${v.shadowY}px ${v.shadowRadius}px ${v.shadowColor}${Math.round(v.shadowOpacity*2.55).toString(16).padStart(2,'0')};width:100%;">
            <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#007aff,#5856d6);margin-bottom:12px"></div>
            <div style="font-size:16px;font-weight:700;color:${v.titleColor};margin-bottom:4px">Card Title</div>
            <div style="font-size:13px;color:${v.subtitleColor};line-height:1.4">A short description about this card.</div>
            <div style="margin-top:14px;padding-top:12px;border-top:1px solid ${v.borderColor};display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:12px;color:${v.subtitleColor}">May 2026</span>
              <span style="font-size:12px;font-weight:600;color:#007aff">View →</span>
            </div>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// CustomCard.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CardModifier</span>: <span class="ty">ViewModifier</span> {
    <span class="kw">func</span> <span class="fn">body</span>(content: <span class="ty">Content</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        content
            .padding(<span class="nu">${v.padding}</span>)
            .background(${cv('bgColor', v.bgColor, 'color')})
            .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))${v.borderWidth > 0 ? `
            .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).stroke(${cv('borderColor', v.borderColor, 'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>))` : ''}${v.shadowRadius > 0 ? `
            .shadow(color: ${cv('shadowColor', v.shadowColor, 'color')}.opacity(<span class="nu">${(v.shadowOpacity/100).toFixed(2)}</span>), radius: <span class="nu">${v.shadowRadius}</span>, y: <span class="nu">${v.shadowY}</span>)` : ''}
    }
}
<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">cardStyle</span>() -> <span class="kw">some</span> <span class="ty">View</span> { modifier(<span class="ty">CardModifier</span>()) }
}`
    },

    toggle: {
      label: 'Toggle', icon: '🔀',
      props: [
        { id: 'label',        label: 'Label Text',        type: 'text',   default: 'Enable Notifications' },
        { id: 'onColor',      label: 'On Color',          type: 'color',  default: '#34C759' },
        { id: 'offColor',     label: 'Off Color',         type: 'color',  default: '#E5E5EA' },
        { id: 'thumbColor',   label: 'Thumb Color',       type: 'color',  default: '#FFFFFF' },
        { id: 'bgColor',      label: 'Row Background',    type: 'color',  default: '#FFFFFF' },
        { id: 'labelColor',   label: 'Label Color',       type: 'color',  default: '#1C1C1E' },
        { id: 'fontSize',     label: 'Font Size',         type: 'range',  default: 15, min: 11, max: 24, step: 1 },
        { id: 'cornerRadius', label: 'Row Corner Radius', type: 'range',  default: 12, min: 0, max: 24, step: 1 },
        { id: 'padding',      label: 'Row Padding',       type: 'range',  default: 14, min: 8, max: 28, step: 2 },
        { id: 'iconName',     label: 'SF Symbol Icon',    type: 'text',   default: 'bell.fill' },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.padding}px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            ${v.iconName?`<span style="font-size:${v.fontSize+2}px">🔔</span>`:''}
            <span style="flex:1;font-size:${v.fontSize}px;color:${v.labelColor};font-weight:500">${v.label}</span>
            <div style="width:51px;height:31px;border-radius:16px;background:${v.onColor};position:relative;flex-shrink:0"><div style="width:27px;height:27px;border-radius:14px;background:${v.thumbColor};position:absolute;top:2px;right:2px;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div></div>
          </div>
          <div style="margin-top:8px;background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.padding}px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            ${v.iconName?`<span style="font-size:${v.fontSize+2}px;opacity:0.4">🌙</span>`:''}
            <span style="flex:1;font-size:${v.fontSize}px;color:${v.labelColor};font-weight:500">Dark Mode</span>
            <div style="width:51px;height:31px;border-radius:16px;background:${v.offColor};position:relative;flex-shrink:0"><div style="width:27px;height:27px;border-radius:14px;background:${v.thumbColor};position:absolute;top:2px;left:2px;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div></div>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// CustomToggleRow.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CustomToggleRow</span>: <span class="ty">View</span> {
    <span class="kw">let</span> label: <span class="ty">String</span>${v.iconName?`
    <span class="kw">let</span> icon: <span class="ty">String</span>`:''}
    <span class="pa">@Binding</span> <span class="kw">var</span> isOn: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">10</span>) {${v.iconName?`
            <span class="ty">Image</span>(systemName: icon).font(.system(size: <span class="nu">${v.fontSize+2}</span>)).foregroundStyle(${cv('onColor',v.onColor,'color')})`:''}
            <span class="ty">Text</span>(label).font(.system(size: <span class="nu">${v.fontSize}</span>, weight: .medium)).foregroundStyle(${cv('labelColor',v.labelColor,'color')})
            <span class="ty">Spacer</span>()
            <span class="ty">Toggle</span>(<span class="st">""</span>, isOn: $isOn).labelsHidden().tint(${cv('onColor',v.onColor,'color')})
        }
        .padding(<span class="nu">${v.padding}</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
    }
}`
    },

    badge: {
      label: 'Badge / Tag', icon: '🏷️',
      props: [
        { id: 'text',         label: 'Badge Text',          type: 'text',   default: 'New' },
        { id: 'bgColor',      label: 'Background Color',    type: 'color',  default: '#007AFF' },
        { id: 'textColor',    label: 'Text Color',          type: 'color',  default: '#FFFFFF' },
        { id: 'fontSize',     label: 'Font Size',           type: 'range',  default: 12, min: 9, max: 20, step: 1 },
        { id: 'fontWeight',   label: 'Font Weight',         type: 'select', default: 'semibold', options: ['regular','medium','semibold','bold'] },
        { id: 'cornerRadius', label: 'Corner Radius',       type: 'range',  default: 20, min: 0, max: 40, step: 1 },
        { id: 'paddingH',     label: 'Horizontal Padding',  type: 'range',  default: 10, min: 4, max: 28, step: 2 },
        { id: 'paddingV',     label: 'Vertical Padding',    type: 'range',  default: 4,  min: 2, max: 16, step: 1 },
        { id: 'borderColor',  label: 'Border Color',        type: 'color',  default: '#007AFF' },
        { id: 'borderWidth',  label: 'Border Width',        type: 'range',  default: 0,  min: 0, max: 3, step: 0.5 },
        { id: 'iconName',     label: 'SF Symbol (optional)',type: 'text',   default: '' },
      ],
      preview: (v) => `
        <div class="cb-phone" style="gap:12px;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center">
          ${['New','Sale','Hot','Featured'].map(t=>`
          <div style="display:inline-flex;align-items:center;gap:5px;background:${v.bgColor};color:${v.textColor};font-size:${v.fontSize}px;font-weight:${v.fontWeight==='semibold'?600:v.fontWeight==='bold'?700:v.fontWeight==='medium'?500:400};border-radius:${v.cornerRadius}px;padding:${v.paddingV}px ${v.paddingH}px;border:${v.borderWidth>0?`${v.borderWidth}px solid ${v.borderColor}`:'none'};">${v.iconName?'★ ':''}${t==='New'?v.text||t:t}</div>`).join('')}
        </div>`,
      code: (v) => `<span class="cm">// BadgeView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">BadgeView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> text: <span class="ty">String</span>
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">4</span>) {${v.iconName?`
            <span class="ty">Image</span>(systemName: <span class="st">"${v.iconName}"</span>).font(.system(size: <span class="nu">${v.fontSize-1}</span>))`:''}
            <span class="ty">Text</span>(text).font(.system(size: <span class="nu">${v.fontSize}</span>, weight: .${v.fontWeight}))
        }
        .foregroundStyle(${cv('textColor',v.textColor,'color')})
        .padding(.horizontal, <span class="nu">${v.paddingH}</span>)
        .padding(.vertical, <span class="nu">${v.paddingV}</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))${v.borderWidth>0?`
        .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).stroke(${cv('borderColor',v.borderColor,'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>))`:''}
    }
}`
    },

    listrow: {
      label: 'List Row', icon: '📋',
      props: [
        { id: 'title',          label: 'Title',           type: 'text',   default: 'Inbox' },
        { id: 'subtitle',       label: 'Subtitle',        type: 'text',   default: '3 new messages' },
        { id: 'iconName',       label: 'Icon (SF Symbol)',type: 'text',   default: 'envelope.fill' },
        { id: 'showChevron',    label: 'Show Chevron',    type: 'toggle', default: true },
        { id: 'bgColor',        label: 'Background',      type: 'color',  default: '#FFFFFF' },
        { id: 'titleColor',     label: 'Title Color',     type: 'color',  default: '#1C1C1E' },
        { id: 'subtitleColor',  label: 'Subtitle Color',  type: 'color',  default: '#8E8E93' },
        { id: 'iconBgColor',    label: 'Icon Bg Color',   type: 'color',  default: '#007AFF' },
        { id: 'iconColor',      label: 'Icon Color',      type: 'color',  default: '#FFFFFF' },
        { id: 'separatorColor', label: 'Separator Color', type: 'color',  default: '#E5E5EA' },
        { id: 'height',         label: 'Row Height',      type: 'range',  default: 64, min: 44, max: 100, step: 2 },
        { id: 'cornerRadius',   label: 'Corner Radius',   type: 'range',  default: 12, min: 0, max: 24, step: 1 },
      ],
      preview: (v) => `
        <div class="cb-phone">
          ${[{t:v.title,s:v.subtitle},{t:'Drafts',s:'No drafts'},{t:'Sent',s:'12 sent'}].map((row,i)=>`
          <div style="background:${v.bgColor};${i===0?`border-radius:${v.cornerRadius}px ${v.cornerRadius}px 0 0`:i===2?`border-radius:0 0 ${v.cornerRadius}px ${v.cornerRadius}px`:''};height:${v.height}px;display:flex;align-items:center;padding:0 14px;gap:12px;${i>0?`border-top:1px solid ${v.separatorColor}`:''}">
            <div style="width:36px;height:36px;border-radius:9px;background:${v.iconBgColor};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="color:${v.iconColor};font-size:16px">✉</span>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:15px;font-weight:600;color:${v.titleColor}">${row.t}</div>
              <div style="font-size:12px;color:${v.subtitleColor};margin-top:1px">${row.s}</div>
            </div>
            ${v.showChevron?`<span style="color:#C7C7CC;font-size:14px">›</span>`:''}
          </div>`).join('')}
        </div>`,
      code: (v) => `<span class="cm">// ListRowView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">ListRowView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> subtitle: <span class="ty">String</span>
    <span class="kw">let</span> iconName: <span class="ty">String</span>
    <span class="kw">var</span> showChevron: <span class="ty">Bool</span> = ${v.showChevron}

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">12</span>) {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">9</span>)
                .fill(${cv('iconBgColor',v.iconBgColor,'color')})
                .frame(width: <span class="nu">36</span>, height: <span class="nu">36</span>)
                .overlay(<span class="ty">Image</span>(systemName: iconName).foregroundStyle(${cv('iconColor',v.iconColor,'color')}))
            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">2</span>) {
                <span class="ty">Text</span>(title).font(.system(size: <span class="nu">15</span>, weight: .semibold)).foregroundStyle(${cv('titleColor',v.titleColor,'color')})
                <span class="ty">Text</span>(subtitle).font(.system(size: <span class="nu">12</span>)).foregroundStyle(${cv('subtitleColor',v.subtitleColor,'color')})
            }
            <span class="ty">Spacer</span>()${v.showChevron?`
            <span class="ty">Image</span>(systemName: <span class="st">"chevron.right"</span>).foregroundStyle(.tertiary).font(.system(size: <span class="nu">13</span>, weight: .semibold))`:''}
        }
        .frame(height: <span class="nu">${v.height}</span>)
        .padding(.horizontal, <span class="nu">14</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
    }
}`
    },

    searchbar: {
      label: 'Search Bar', icon: '🔍',
      props: [
        { id: 'placeholder', label: 'Placeholder',       type: 'text',   default: 'Search...' },
        { id: 'bgColor',     label: 'Background Color',  type: 'color',  default: '#F2F2F7' },
        { id: 'textColor',   label: 'Text Color',        type: 'color',  default: '#1C1C1E' },
        { id: 'iconColor',   label: 'Icon Color',        type: 'color',  default: '#8E8E93' },
        { id: 'borderColor', label: 'Border Color',      type: 'color',  default: '#E5E5EA' },
        { id: 'borderWidth', label: 'Border Width',      type: 'range',  default: 0,  min: 0, max: 4, step: 0.5 },
        { id: 'cornerRadius',label: 'Corner Radius',     type: 'range',  default: 12, min: 0, max: 30, step: 1 },
        { id: 'paddingH',    label: 'Horizontal Padding',type: 'range',  default: 12, min: 6, max: 30, step: 2 },
        { id: 'paddingV',    label: 'Vertical Padding',  type: 'range',  default: 10, min: 4, max: 24, step: 2 },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.paddingV}px ${v.paddingH}px;display:flex;align-items:center;gap:8px;border:${v.borderWidth>0?`${v.borderWidth}px solid ${v.borderColor}`:'none'}">
            <span style="color:${v.iconColor};font-size:16px">🔍</span>
            <span style="font-size:15px;color:${v.iconColor}">${v.placeholder}</span>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// SearchBarView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">SearchBarView</span>: <span class="ty">View</span> {
    <span class="pa">@Binding</span> <span class="kw">var</span> text: <span class="ty">String</span>
    <span class="kw">var</span> placeholder: <span class="ty">String</span> = <span class="st">"${v.placeholder}"</span>
    <span class="pa">@FocusState</span> <span class="kw">private var</span> isFocused: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {
            <span class="ty">Image</span>(systemName: <span class="st">"magnifyingglass"</span>).foregroundStyle(${cv('iconColor',v.iconColor,'color')})
            <span class="ty">TextField</span>(placeholder, text: $text).focused($isFocused).foregroundStyle(${cv('textColor',v.textColor,'color')})
            <span class="kw">if</span> !text.isEmpty {
                <span class="ty">Button</span> { text = <span class="st">""</span> } label: { <span class="ty">Image</span>(systemName: <span class="st">"xmark.circle.fill"</span>).foregroundStyle(${cv('iconColor',v.iconColor,'color')}) }
            }
        }
        .padding(.horizontal, <span class="nu">${v.paddingH}</span>)
        .padding(.vertical, <span class="nu">${v.paddingV}</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))${v.borderWidth>0?`
        .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).stroke(${cv('borderColor',v.borderColor,'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>))`:''}
    }
}`
    },

    avatar: {
      label: 'Avatar', icon: '👤',
      props: [
        { id: 'size',              label: 'Size',                 type: 'range',  default: 56,  min: 24, max: 120, step: 4 },
        { id: 'bgColor',           label: 'Background Color',     type: 'color',  default: '#007AFF' },
        { id: 'borderColor',       label: 'Border Color',         type: 'color',  default: '#FFFFFF' },
        { id: 'borderWidth',       label: 'Border Width',         type: 'range',  default: 2,   min: 0, max: 8, step: 1 },
        { id: 'initials',          label: 'Initials',             type: 'text',   default: 'JD' },
        { id: 'textColor',         label: 'Text Color',           type: 'color',  default: '#FFFFFF' },
        { id: 'showOnlineIndicator',label: 'Show Online Dot',     type: 'toggle', default: true },
        { id: 'indicatorColor',    label: 'Online Dot Color',     type: 'color',  default: '#34C759' },
      ],
      preview: (v) => `
        <div class="cb-phone" style="align-items:center;justify-content:center;gap:20px;flex-direction:row">
          ${[v.initials,'AB','MK'].map(ini=>`
          <div style="position:relative;display:inline-block">
            <div style="width:${v.size}px;height:${v.size}px;border-radius:50%;background:${v.bgColor};border:${v.borderWidth}px solid ${v.borderColor};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
              <span style="color:${v.textColor};font-size:${Math.round(v.size*0.35)}px;font-weight:600">${ini}</span>
            </div>
            ${v.showOnlineIndicator?`<div style="position:absolute;bottom:1px;right:1px;width:${Math.round(v.size*0.25)}px;height:${Math.round(v.size*0.25)}px;border-radius:50%;background:${v.indicatorColor};border:2px solid #1c1c1f"></div>`:''}
          </div>`).join('')}
        </div>`,
      code: (v) => `<span class="cm">// AvatarView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">AvatarView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> initials: <span class="ty">String</span>
    <span class="kw">var</span> size: <span class="ty">CGFloat</span> = <span class="nu">${v.size}</span>
    <span class="kw">var</span> isOnline: <span class="ty">Bool</span> = ${v.showOnlineIndicator}

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span>(alignment: .bottomTrailing) {
            <span class="ty">Circle</span>()
                .fill(${cv('bgColor',v.bgColor,'color')})
                .frame(width: size, height: size)
                .overlay(<span class="ty">Circle</span>().stroke(${cv('borderColor',v.borderColor,'color')}, lineWidth: <span class="nu">${v.borderWidth}</span>))
                .overlay(<span class="ty">Text</span>(initials).font(.system(size: size * <span class="nu">0.35</span>, weight: .semibold)).foregroundStyle(${cv('textColor',v.textColor,'color')}))
            <span class="kw">if</span> isOnline {
                <span class="ty">Circle</span>()
                    .fill(${cv('indicatorColor',v.indicatorColor,'color')})
                    .frame(width: size * <span class="nu">0.25</span>, height: size * <span class="nu">0.25</span>)
                    .overlay(<span class="ty">Circle</span>().stroke(.background, lineWidth: <span class="nu">2</span>))
            }
        }
    }
}`
    },

    progressbar: {
      label: 'Progress Bar', icon: '📊',
      props: [
        { id: 'progress',     label: 'Progress (0-100)',  type: 'range',  default: 65,  min: 0, max: 100, step: 1 },
        { id: 'bgColor',      label: 'Track Color',       type: 'color',  default: '#E5E5EA' },
        { id: 'fillColor',    label: 'Fill Color',        type: 'color',  default: '#007AFF' },
        { id: 'height',       label: 'Height',            type: 'range',  default: 8,   min: 2, max: 24, step: 1 },
        { id: 'cornerRadius', label: 'Corner Radius',     type: 'range',  default: 4,   min: 0, max: 20, step: 1 },
        { id: 'showLabel',    label: 'Show Label',        type: 'toggle', default: true },
        { id: 'labelColor',   label: 'Label Color',       type: 'color',  default: '#1C1C1E' },
      ],
      preview: (v) => `
        <div class="cb-phone">
          ${v.showLabel?`<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:13px;color:${v.labelColor};font-weight:500">Progress</span><span style="font-size:13px;color:${v.labelColor};font-weight:600">${v.progress}%</span></div>`:''}
          <div style="height:${v.height}px;border-radius:${v.cornerRadius}px;background:${v.bgColor};width:100%;overflow:hidden">
            <div style="height:100%;width:${v.progress}%;background:${v.fillColor};border-radius:${v.cornerRadius}px"></div>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// ProgressBarView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">ProgressBarView</span>: <span class="ty">View</span> {
    <span class="kw">var</span> progress: <span class="ty">Double</span> <span class="cm">// 0.0 – 1.0</span>
    <span class="kw">var</span> showLabel: <span class="ty">Bool</span> = ${v.showLabel}

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">6</span>) {
            <span class="kw">if</span> showLabel {
                <span class="ty">HStack</span> {
                    <span class="ty">Text</span>(<span class="st">"Progress"</span>).font(.system(size: <span class="nu">13</span>, weight: .medium)).foregroundStyle(${cv('labelColor',v.labelColor,'color')})
                    <span class="ty">Spacer</span>()
                    <span class="ty">Text</span>(<span class="st">"\\(Int(progress * 100))%"</span>).font(.system(size: <span class="nu">13</span>, weight: .semibold)).foregroundStyle(${cv('labelColor',v.labelColor,'color')})
                }
            }
            <span class="ty">GeometryReader</span> { geo in
                <span class="ty">ZStack</span>(alignment: .leading) {
                    <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).fill(${cv('bgColor',v.bgColor,'color')}).frame(height: <span class="nu">${v.height}</span>)
                    <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).fill(${cv('fillColor',v.fillColor,'color')}).frame(width: geo.size.width * progress, height: <span class="nu">${v.height}</span>)
                }
            }
            .frame(height: <span class="nu">${v.height}</span>)
        }
    }
}`
    },

    segmented: {
      label: 'Segmented Control', icon: '⊞',
      props: [
        { id: 'options',       label: 'Options (comma-sep)', type: 'text',   default: 'Daily,Weekly,Monthly' },
        { id: 'bgColor',       label: 'Background Color',    type: 'color',  default: '#E5E5EA' },
        { id: 'selectedBg',    label: 'Selected Bg',         type: 'color',  default: '#FFFFFF' },
        { id: 'selectedText',  label: 'Selected Text',       type: 'color',  default: '#1C1C1E' },
        { id: 'unselectedText',label: 'Unselected Text',     type: 'color',  default: '#8E8E93' },
        { id: 'cornerRadius',  label: 'Corner Radius',       type: 'range',  default: 10, min: 0, max: 24, step: 1 },
        { id: 'fontSize',      label: 'Font Size',           type: 'range',  default: 13, min: 10, max: 20, step: 1 },
      ],
      preview: (v) => {
        const opts = (v.options||'').split(',').map(s=>s.trim()).filter(Boolean);
        return `<div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius+2}px;padding:2px;display:flex">
            ${opts.map((o,i)=>`<div style="flex:1;text-align:center;padding:7px 4px;background:${i===0?v.selectedBg:'transparent'};border-radius:${v.cornerRadius}px;font-size:${v.fontSize}px;font-weight:${i===0?600:400};color:${i===0?v.selectedText:v.unselectedText};${i===0?'box-shadow:0 1px 4px rgba(0,0,0,0.12)':''}">${o}</div>`).join('')}
          </div>
        </div>`;
      },
      code: (v) => {
        const opts = (v.options||'').split(',').map(s=>s.trim()).filter(Boolean);
        return `<span class="cm">// CustomSegmentedControl.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CustomSegmentedControl</span>: <span class="ty">View</span> {
    <span class="kw">let</span> options: [<span class="ty">String</span>] = [${opts.map(o=>`<span class="st">"${o}"</span>`).join(', ')}]
    <span class="pa">@Binding</span> <span class="kw">var</span> selected: <span class="ty">String</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">0</span>) {
            <span class="ty">ForEach</span>(options, id: \\.self) { option <span class="kw">in</span>
                <span class="ty">Button</span>(action: { <span class="kw">withAnimation</span>(.spring(duration: <span class="nu">0.2</span>)) { selected = option } }) {
                    <span class="ty">Text</span>(option)
                        .font(.system(size: <span class="nu">${v.fontSize}</span>, weight: selected == option ? .semibold : .regular))
                        .foregroundStyle(selected == option ? ${cv('selectedText',v.selectedText,'color')} : ${cv('unselectedText',v.unselectedText,'color')})
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, <span class="nu">7</span>)
                        .background(selected == option ? ${cv('selectedBg',v.selectedBg,'color')} : .clear)
                        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
                }
            }
        }
        .padding(<span class="nu">2</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius+2}</span>))
    }
}`;
      }
    },

    alertcard: {
      label: 'Alert Card', icon: '⚠️',
      props: [
        { id: 'style',        label: 'Style',          type: 'select', default: 'success', options: ['success','warning','error','info'] },
        { id: 'title',        label: 'Title',          type: 'text',   default: 'Success!' },
        { id: 'message',      label: 'Message',        type: 'text',   default: 'Your changes have been saved.' },
        { id: 'bgColor',      label: 'Background',     type: 'color',  default: '#F0FFF4' },
        { id: 'iconColor',    label: 'Icon Color',     type: 'color',  default: '#34C759' },
        { id: 'borderColor',  label: 'Border Color',   type: 'color',  default: '#34C759' },
        { id: 'cornerRadius', label: 'Corner Radius',  type: 'range',  default: 12, min: 0, max: 24, step: 1 },
        { id: 'padding',      label: 'Padding',        type: 'range',  default: 16, min: 8, max: 32, step: 2 },
      ],
      preview: (v) => {
        const icons = {success:'✅',warning:'⚠️',error:'❌',info:'ℹ️'};
        return `<div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.padding}px;border-left:4px solid ${v.borderColor};display:flex;gap:12px;align-items:flex-start">
            <span style="font-size:20px">${icons[v.style]||'ℹ️'}</span>
            <div>
              <div style="font-size:14px;font-weight:700;color:${v.iconColor};margin-bottom:3px">${v.title}</div>
              <div style="font-size:13px;color:#555;line-height:1.4">${v.message}</div>
            </div>
          </div>
        </div>`;
      },
      code: (v) => `<span class="cm">// AlertCard.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">enum</span> <span class="ty">AlertStyle</span> { <span class="kw">case</span> success, warning, error, info }

<span class="kw">struct</span> <span class="ty">AlertCard</span>: <span class="ty">View</span> {
    <span class="kw">let</span> style: <span class="ty">AlertStyle</span>
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> message: <span class="ty">String</span>

    <span class="kw">private var</span> icon: <span class="ty">String</span> {
        <span class="kw">switch</span> style {
        <span class="kw">case</span> .success: <span class="st">"checkmark.circle.fill"</span>
        <span class="kw">case</span> .warning: <span class="st">"exclamationmark.triangle.fill"</span>
        <span class="kw">case</span> .error:   <span class="st">"xmark.circle.fill"</span>
        <span class="kw">case</span> .info:    <span class="st">"info.circle.fill"</span>
        }
    }

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(alignment: .top, spacing: <span class="nu">12</span>) {
            <span class="ty">Image</span>(systemName: icon).font(.title3).foregroundStyle(${cv('iconColor',v.iconColor,'color')})
            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">3</span>) {
                <span class="ty">Text</span>(title).font(.system(size: <span class="nu">14</span>, weight: .bold)).foregroundStyle(${cv('iconColor',v.iconColor,'color')})
                <span class="ty">Text</span>(message).font(.system(size: <span class="nu">13</span>)).foregroundStyle(.secondary)
            }
        }
        .padding(<span class="nu">${v.padding}</span>)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
        .overlay(alignment: .leading) {
            <span class="ty">Rectangle</span>().fill(${cv('borderColor',v.borderColor,'color')}).frame(width: <span class="nu">4</span>)
                .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
        }
    }
}`
    },

    emptystate: {
      label: 'Empty State', icon: '📭',
      props: [
        { id: 'title',        label: 'Title',          type: 'text',   default: 'Nothing here yet' },
        { id: 'subtitle',     label: 'Subtitle',       type: 'text',   default: 'Add your first item to get started.' },
        { id: 'iconName',     label: 'Icon (SF)',       type: 'text',   default: 'tray' },
        { id: 'bgColor',      label: 'Background',     type: 'color',  default: '#FFFFFF' },
        { id: 'titleColor',   label: 'Title Color',    type: 'color',  default: '#1C1C1E' },
        { id: 'subtitleColor',label: 'Subtitle Color', type: 'color',  default: '#8E8E93' },
        { id: 'btnLabel',     label: 'Button Label',   type: 'text',   default: 'Add Item' },
        { id: 'btnColor',     label: 'Button Color',   type: 'color',  default: '#007AFF' },
        { id: 'btnTextColor', label: 'Button Text',    type: 'color',  default: '#FFFFFF' },
        { id: 'cornerRadius', label: 'Corner Radius',  type: 'range',  default: 14, min: 0, max: 28, step: 1 },
      ],
      preview: (v) => `
        <div class="cb-phone" style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:30px 16px;align-items:center;text-align:center">
          <div style="font-size:48px;margin-bottom:16px">📭</div>
          <div style="font-size:17px;font-weight:700;color:${v.titleColor};margin-bottom:6px">${v.title}</div>
          <div style="font-size:13px;color:${v.subtitleColor};line-height:1.5;margin-bottom:20px">${v.subtitle}</div>
          <button style="background:${v.btnColor};color:${v.btnTextColor};border:none;border-radius:${v.cornerRadius}px;padding:10px 22px;font-size:14px;font-weight:600;cursor:default">${v.btnLabel}</button>
        </div>`,
      code: (v) => `<span class="cm">// EmptyStateView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">EmptyStateView</span>: <span class="ty">View</span> {
    <span class="kw">var</span> title: <span class="ty">String</span> = <span class="st">"${v.title}"</span>
    <span class="kw">var</span> subtitle: <span class="ty">String</span> = <span class="st">"${v.subtitle}"</span>
    <span class="kw">var</span> iconName: <span class="ty">String</span> = <span class="st">"${v.iconName}"</span>
    <span class="kw">var</span> btnLabel: <span class="ty">String</span> = <span class="st">"${v.btnLabel}"</span>
    <span class="kw">var</span> onAction: () -> <span class="ty">Void</span> = {}

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">12</span>) {
            <span class="ty">Image</span>(systemName: iconName).font(.system(size: <span class="nu">48</span>, weight: .light)).foregroundStyle(.tertiary)
            <span class="ty">Text</span>(title).font(.system(size: <span class="nu">17</span>, weight: .bold)).foregroundStyle(${cv('titleColor',v.titleColor,'color')})
            <span class="ty">Text</span>(subtitle).font(.system(size: <span class="nu">13</span>)).foregroundStyle(${cv('subtitleColor',v.subtitleColor,'color')}).multilineTextAlignment(.center)
            <span class="ty">Button</span>(btnLabel, action: onAction)
                .font(.system(size: <span class="nu">14</span>, weight: .semibold))
                .foregroundStyle(${cv('btnTextColor',v.btnTextColor,'color')})
                .padding(.horizontal, <span class="nu">22</span>).padding(.vertical, <span class="nu">10</span>)
                .background(${cv('btnColor',v.btnColor,'color')})
                .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
        }
        .padding(<span class="nu">30</span>)
        .frame(maxWidth: .infinity)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
    }
}`
    },

    otpinput: {
      label: 'OTP Input', icon: '🔐',
      props: [
        { id: 'digitCount',         label: 'Digit Count',         type: 'select', default: '6', options: ['4','5','6'] },
        { id: 'boxSize',            label: 'Box Size',            type: 'range',  default: 44, min: 32, max: 64, step: 2 },
        { id: 'bgColor',            label: 'Box Background',      type: 'color',  default: '#F2F2F7' },
        { id: 'borderColorActive',  label: 'Active Border',       type: 'color',  default: '#007AFF' },
        { id: 'borderColorInactive',label: 'Inactive Border',     type: 'color',  default: '#E5E5EA' },
        { id: 'textColor',          label: 'Text Color',          type: 'color',  default: '#1C1C1E' },
        { id: 'fontSize',           label: 'Font Size',           type: 'range',  default: 20, min: 14, max: 32, step: 1 },
        { id: 'cornerRadius',       label: 'Corner Radius',       type: 'range',  default: 10, min: 0, max: 24, step: 1 },
        { id: 'spacing',            label: 'Spacing',             type: 'range',  default: 8,  min: 2, max: 24, step: 1 },
      ],
      preview: (v) => {
        const n = parseInt(v.digitCount)||6;
        const filled = [1,2,3];
        return `<div class="cb-phone"><div style="display:flex;gap:${v.spacing}px;justify-content:center">
          ${Array.from({length:n},(_,i)=>{
            const isActive = i===filled.length;
            const isFilled = i<filled.length;
            return `<div style="width:${v.boxSize}px;height:${v.boxSize}px;border-radius:${v.cornerRadius}px;background:${v.bgColor};border:2px solid ${isActive?v.borderColorActive:v.borderColorInactive};display:flex;align-items:center;justify-content:center;font-size:${v.fontSize}px;font-weight:700;color:${v.textColor}">${isFilled?filled[i]||'':''}</div>`;
          }).join('')}
        </div></div>`;
      },
      code: (v) => `<span class="cm">// OTPInputView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">OTPInputView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> digitCount: <span class="ty">Int</span> = ${v.digitCount}
    <span class="pa">@Binding</span> <span class="kw">var</span> otp: <span class="ty">String</span>
    <span class="pa">@FocusState</span> <span class="kw">private var</span> isFocused: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span> {
            <span class="ty">TextField</span>(<span class="st">""</span>, text: $otp)
                .keyboardType(.numberPad)
                .focused($isFocused)
                .frame(width: <span class="nu">1</span>, height: <span class="nu">1</span>)
                .opacity(<span class="nu">0.01</span>)
            <span class="ty">HStack</span>(spacing: <span class="nu">${v.spacing}</span>) {
                <span class="ty">ForEach</span>(<span class="nu">0</span>..&lt;digitCount, id: \\.self) { i <span class="kw">in</span>
                    <span class="kw">let</span> char = otp.count > i ? <span class="ty">String</span>(otp[otp.index(otp.startIndex, offsetBy: i)]) : <span class="st">""</span>
                    <span class="kw">let</span> isActive = otp.count == i
                    <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>)
                        .fill(${cv('bgColor',v.bgColor,'color')})
                        .frame(width: <span class="nu">${v.boxSize}</span>, height: <span class="nu">${v.boxSize}</span>)
                        .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>).stroke(isActive ? ${cv('borderColorActive',v.borderColorActive,'color')} : ${cv('borderColorInactive',v.borderColorInactive,'color')}, lineWidth: <span class="nu">2</span>))
                        .overlay(<span class="ty">Text</span>(char).font(.system(size: <span class="nu">${v.fontSize}</span>, weight: .bold)).foregroundStyle(${cv('textColor',v.textColor,'color')}))
                }
            }
        }
        .onTapGesture { isFocused = true }
    }
}`
    },

    chip: {
      label: 'Chip / Filter', icon: '💊',
      props: [
        { id: 'label',         label: 'Label',           type: 'text',   default: 'Design' },
        { id: 'isSelected',    label: 'Selected State',  type: 'toggle', default: true },
        { id: 'selectedBg',    label: 'Selected Bg',     type: 'color',  default: '#007AFF' },
        { id: 'selectedText',  label: 'Selected Text',   type: 'color',  default: '#FFFFFF' },
        { id: 'unselectedBg',  label: 'Unselected Bg',   type: 'color',  default: '#F2F2F7' },
        { id: 'unselectedText',label: 'Unselected Text', type: 'color',  default: '#1C1C1E' },
        { id: 'borderColor',   label: 'Border Color',    type: 'color',  default: '#007AFF' },
        { id: 'cornerRadius',  label: 'Corner Radius',   type: 'range',  default: 20, min: 0, max: 30, step: 1 },
        { id: 'fontSize',      label: 'Font Size',       type: 'range',  default: 13, min: 10, max: 20, step: 1 },
        { id: 'paddingH',      label: 'Horizontal Pad',  type: 'range',  default: 14, min: 6, max: 30, step: 2 },
        { id: 'paddingV',      label: 'Vertical Pad',    type: 'range',  default: 7,  min: 3, max: 20, step: 1 },
      ],
      preview: (v) => `
        <div class="cb-phone" style="flex-direction:row;gap:10px;flex-wrap:wrap;justify-content:center">
          ${[v.label,'Swift','Xcode','iOS'].map((l,i)=>{
            const sel = i===0?v.isSelected:i===2;
            return `<div style="background:${sel?v.selectedBg:v.unselectedBg};color:${sel?v.selectedText:v.unselectedText};font-size:${v.fontSize}px;font-weight:${sel?600:400};border-radius:${v.cornerRadius}px;padding:${v.paddingV}px ${v.paddingH}px;border:1.5px solid ${sel?v.borderColor:'transparent'}">${l}</div>`;
          }).join('')}
        </div>`,
      code: (v) => `<span class="cm">// ChipView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">ChipView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> label: <span class="ty">String</span>
    <span class="pa">@Binding</span> <span class="kw">var</span> isSelected: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Button</span> { <span class="kw">withAnimation</span>(.spring(duration: <span class="nu">0.2</span>)) { isSelected.toggle() } } label: {
            <span class="ty">Text</span>(label)
                .font(.system(size: <span class="nu">${v.fontSize}</span>, weight: isSelected ? .semibold : .regular))
                .foregroundStyle(isSelected ? ${cv('selectedText',v.selectedText,'color')} : ${cv('unselectedText',v.unselectedText,'color')})
                .padding(.horizontal, <span class="nu">${v.paddingH}</span>)
                .padding(.vertical, <span class="nu">${v.paddingV}</span>)
                .background(isSelected ? ${cv('selectedBg',v.selectedBg,'color')} : ${cv('unselectedBg',v.unselectedBg,'color')})
                .clipShape(<span class="ty">Capsule</span>())
                .overlay(<span class="ty">Capsule</span>().stroke(isSelected ? ${cv('borderColor',v.borderColor,'color')} : .clear, lineWidth: <span class="nu">1.5</span>))
        }
    }
}`
    },

    statcard: {
      label: 'Stat Card', icon: '📈',
      props: [
        { id: 'title',        label: 'Title',         type: 'text',   default: 'Total Revenue' },
        { id: 'value',        label: 'Value',         type: 'text',   default: '$24,890' },
        { id: 'subtitle',     label: 'Subtitle',      type: 'text',   default: '+12% this month' },
        { id: 'iconName',     label: 'Icon (SF)',      type: 'text',   default: 'dollarsign.circle.fill' },
        { id: 'bgColor',      label: 'Background',    type: 'color',  default: '#FFFFFF' },
        { id: 'titleColor',   label: 'Title Color',   type: 'color',  default: '#8E8E93' },
        { id: 'valueColor',   label: 'Value Color',   type: 'color',  default: '#1C1C1E' },
        { id: 'subtitleColor',label: 'Subtitle Color',type: 'color',  default: '#34C759' },
        { id: 'accentColor',  label: 'Accent Color',  type: 'color',  default: '#007AFF' },
        { id: 'cornerRadius', label: 'Corner Radius', type: 'range',  default: 16, min: 0, max: 32, step: 1 },
        { id: 'padding',      label: 'Padding',       type: 'range',  default: 18, min: 8, max: 36, step: 2 },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:${v.padding}px;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <span style="font-size:13px;color:${v.titleColor};font-weight:500">${v.title}</span>
              <div style="width:32px;height:32px;border-radius:8px;background:${v.accentColor}20;display:flex;align-items:center;justify-content:center">
                <span style="color:${v.accentColor};font-size:16px">💰</span>
              </div>
            </div>
            <div style="font-size:26px;font-weight:700;color:${v.valueColor};margin-bottom:4px">${v.value}</div>
            <div style="font-size:12px;color:${v.subtitleColor};font-weight:500">${v.subtitle}</div>
          </div>
        </div>`,
      code: (v) => `<span class="cm">// StatCard.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">StatCard</span>: <span class="ty">View</span> {
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> value: <span class="ty">String</span>
    <span class="kw">let</span> subtitle: <span class="ty">String</span>
    <span class="kw">let</span> iconName: <span class="ty">String</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">8</span>) {
            <span class="ty">HStack</span> {
                <span class="ty">Text</span>(title).font(.system(size: <span class="nu">13</span>, weight: .medium)).foregroundStyle(${cv('titleColor',v.titleColor,'color')})
                <span class="ty">Spacer</span>()
                <span class="ty">Image</span>(systemName: iconName).font(.title3).foregroundStyle(${cv('accentColor',v.accentColor,'color')})
                    .padding(<span class="nu">6</span>).background(${cv('accentColor',v.accentColor,'color')}.opacity(<span class="nu">0.12</span>))
                    .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">8</span>))
            }
            <span class="ty">Text</span>(value).font(.system(size: <span class="nu">26</span>, weight: .bold)).foregroundStyle(${cv('valueColor',v.valueColor,'color')})
            <span class="ty">Text</span>(subtitle).font(.system(size: <span class="nu">12</span>, weight: .medium)).foregroundStyle(${cv('subtitleColor',v.subtitleColor,'color')})
        }
        .padding(<span class="nu">${v.padding}</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
        .shadow(color: .black.opacity(<span class="nu">0.06</span>), radius: <span class="nu">12</span>, y: <span class="nu">2</span>)
    }
}`
    },

    profileheader: {
      label: 'Profile Header', icon: '🙋',
      props: [
        { id: 'name',         label: 'Name',          type: 'text',   default: 'Sarah Johnson' },
        { id: 'role',         label: 'Role',          type: 'text',   default: 'iOS Developer' },
        { id: 'bgColor',      label: 'Background',    type: 'color',  default: '#FFFFFF' },
        { id: 'nameColor',    label: 'Name Color',    type: 'color',  default: '#1C1C1E' },
        { id: 'roleColor',    label: 'Role Color',    type: 'color',  default: '#8E8E93' },
        { id: 'avatarBg',     label: 'Avatar Bg',     type: 'color',  default: '#007AFF' },
        { id: 'avatarSize',   label: 'Avatar Size',   type: 'range',  default: 52, min: 32, max: 80, step: 4 },
        { id: 'showFollowBtn',label: 'Show Follow Btn',type: 'toggle',default: true },
        { id: 'btnColor',     label: 'Button Color',  type: 'color',  default: '#007AFF' },
        { id: 'btnText',      label: 'Button Text',   type: 'text',   default: 'Follow' },
        { id: 'btnTextColor', label: 'Btn Text Color',type: 'color',  default: '#FFFFFF' },
        { id: 'cornerRadius', label: 'Corner Radius', type: 'range',  default: 14, min: 0, max: 28, step: 1 },
      ],
      preview: (v) => `
        <div class="cb-phone">
          <div style="background:${v.bgColor};border-radius:${v.cornerRadius}px;padding:14px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 6px rgba(0,0,0,0.07)">
            <div style="width:${v.avatarSize}px;height:${v.avatarSize}px;border-radius:50%;background:${v.avatarBg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="color:#fff;font-size:${Math.round(v.avatarSize*0.36)}px;font-weight:700">SJ</span>
            </div>
            <div style="flex:1">
              <div style="font-size:16px;font-weight:700;color:${v.nameColor}">${v.name}</div>
              <div style="font-size:13px;color:${v.roleColor};margin-top:2px">${v.role}</div>
            </div>
            ${v.showFollowBtn?`<button style="background:${v.btnColor};color:${v.btnTextColor};border:none;border-radius:10px;padding:7px 14px;font-size:13px;font-weight:600;cursor:default">${v.btnText}</button>`:''}
          </div>
        </div>`,
      code: (v) => `<span class="cm">// ProfileHeaderView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">ProfileHeaderView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> name: <span class="ty">String</span>
    <span class="kw">let</span> role: <span class="ty">String</span>
    <span class="kw">let</span> initials: <span class="ty">String</span>
    <span class="kw">var</span> onFollow: (() -> <span class="ty">Void</span>)? = <span class="kw">nil</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">12</span>) {
            <span class="ty">Circle</span>().fill(${cv('avatarBg',v.avatarBg,'color')})
                .frame(width: <span class="nu">${v.avatarSize}</span>, height: <span class="nu">${v.avatarSize}</span>)
                .overlay(<span class="ty">Text</span>(initials).font(.system(size: <span class="nu">${Math.round(v.avatarSize*0.36)}</span>, weight: .bold)).foregroundStyle(.white))
            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">2</span>) {
                <span class="ty">Text</span>(name).font(.system(size: <span class="nu">16</span>, weight: .bold)).foregroundStyle(${cv('nameColor',v.nameColor,'color')})
                <span class="ty">Text</span>(role).font(.system(size: <span class="nu">13</span>)).foregroundStyle(${cv('roleColor',v.roleColor,'color')})
            }
            <span class="ty">Spacer</span>()${v.showFollowBtn?`
            <span class="ty">Button</span>(<span class="st">"${v.btnText}"</span>) { onFollow?() }
                .font(.system(size: <span class="nu">13</span>, weight: .semibold))
                .foregroundStyle(${cv('btnTextColor',v.btnTextColor,'color')})
                .padding(.horizontal, <span class="nu">14</span>).padding(.vertical, <span class="nu">7</span>)
                .background(${cv('btnColor',v.btnColor,'color')})
                .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">10</span>))`:''}
        }
        .padding(<span class="nu">14</span>)
        .background(${cv('bgColor',v.bgColor,'color')})
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">${v.cornerRadius}</span>))
    }
}`
    },

    navbar: {
      label: 'Navigation Bar', icon: '🔝',
      props: [
        { id: 'title',        label: 'Title',           type: 'text',   default: 'My App' },
        { id: 'bgColor',      label: 'Background',      type: 'color',  default: '#FFFFFF' },
        { id: 'titleColor',   label: 'Title Color',     type: 'color',  default: '#1C1C1E' },
        { id: 'showBackBtn',  label: 'Show Back Btn',   type: 'toggle', default: true },
        { id: 'showRightBtn', label: 'Show Right Btn',  type: 'toggle', default: true },
        { id: 'rightBtnIcon', label: 'Right Btn Icon',  type: 'text',   default: 'plus' },
        { id: 'accentColor',  label: 'Accent Color',    type: 'color',  default: '#007AFF' },
        { id: 'fontSize',     label: 'Font Size',       type: 'range',  default: 17, min: 13, max: 24, step: 1 },
        { id: 'fontWeight',   label: 'Font Weight',     type: 'select', default: 'semibold', options: ['regular','medium','semibold','bold'] },
      ],
      preview: (v) => `
        <div class="cb-phone" style="padding:0">
          <div style="background:${v.bgColor};padding:12px 16px;display:flex;align-items:center;border-bottom:0.5px solid #e5e5ea">
            ${v.showBackBtn?`<span style="color:${v.accentColor};font-size:15px;font-weight:400;margin-right:auto">‹ Back</span>`:'<span style="margin-right:auto"></span>'}
            <span style="font-size:${v.fontSize}px;font-weight:${v.fontWeight==='semibold'?600:v.fontWeight==='bold'?700:v.fontWeight==='medium'?500:400};color:${v.titleColor};position:absolute;left:50%;transform:translateX(-50%)">${v.title}</span>
            ${v.showRightBtn?`<span style="color:${v.accentColor};font-size:20px;margin-left:auto">+</span>`:'<span style="margin-left:auto"></span>'}
          </div>
          <div style="padding:16px;font-size:13px;color:#8e8e93;text-align:center">Screen Content</div>
        </div>`,
      code: (v) => `<span class="cm">// NavigationBarExample.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">ContentView</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationStack</span> {
            <span class="ty">Text</span>(<span class="st">"Screen Content"</span>)
                .navigationTitle(<span class="st">"${v.title}"</span>)
                .navigationBarTitleDisplayMode(.inline)
                .toolbarBackground(${cv('bgColor',v.bgColor,'color')}, for: .navigationBar)
                .toolbarColorScheme(.light, for: .navigationBar)
                .toolbar {${v.showBackBtn?`
                    <span class="ty">ToolbarItem</span>(placement: .topBarLeading) {
                        <span class="ty">Button</span>(<span class="st">"Back"</span>) { }
                            .foregroundStyle(${cv('accentColor',v.accentColor,'color')})
                    }`:''}${v.showRightBtn?`
                    <span class="ty">ToolbarItem</span>(placement: .topBarTrailing) {
                        <span class="ty">Button</span> { } label: {
                            <span class="ty">Image</span>(systemName: <span class="st">"${v.rightBtnIcon}"</span>)
                        }
                        .foregroundStyle(${cv('accentColor',v.accentColor,'color')})
                    }`:''}
                }
        }
    }
}`
    },

    tabbar: {
      label: 'Tab Bar', icon: '⬛',
      props: [
        { id: 'icons',       label: 'Icons (SF, comma)',   type: 'text',   default: 'house.fill,magnifyingglass,bell.fill,person.fill' },
        { id: 'labels',      label: 'Labels (comma)',      type: 'text',   default: 'Home,Search,Alerts,Profile' },
        { id: 'activeIndex', label: 'Active Tab Index',    type: 'range',  default: 0, min: 0, max: 3, step: 1 },
        { id: 'activeColor', label: 'Active Color',        type: 'color',  default: '#007AFF' },
        { id: 'inactiveColor',label: 'Inactive Color',     type: 'color',  default: '#8E8E93' },
        { id: 'bgColor',     label: 'Background',          type: 'color',  default: '#FFFFFF' },
        { id: 'badgeIndex',  label: 'Badge Tab Index (-1=none)', type: 'range', default: 2, min: -1, max: 3, step: 1 },
        { id: 'badgeCount',  label: 'Badge Count',         type: 'range',  default: 3, min: 1, max: 99, step: 1 },
      ],
      preview: (v) => {
        const icons = ['🏠','🔍','🔔','👤'];
        const labels = (v.labels||'').split(',').map(s=>s.trim());
        const ai = Math.round(v.activeIndex);
        const bi = Math.round(v.badgeIndex);
        return `<div class="cb-phone" style="padding:0">
          <div style="background:#f9f9f9;flex:1;height:80px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#8e8e93">App Content</div>
          <div style="background:${v.bgColor};border-top:0.5px solid #e5e5ea;padding:6px 0 0;display:flex">
            ${icons.map((ic,i)=>`
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding-bottom:6px;position:relative">
              <span style="font-size:20px;opacity:${i===ai?1:0.5}">${ic}</span>
              <span style="font-size:10px;color:${i===ai?v.activeColor:v.inactiveColor};font-weight:${i===ai?600:400}">${labels[i]||''}</span>
              ${bi>=0&&i===bi?`<div style="position:absolute;top:0;left:50%;margin-left:6px;min-width:16px;height:16px;background:#FF3B30;border-radius:8px;font-size:9px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;padding:0 4px">${v.badgeCount}</div>`:''}
            </div>`).join('')}
          </div>
        </div>`;
      },
      code: (v) => {
        const labels = (v.labels||'Home,Search,Alerts,Profile').split(',').map(s=>s.trim());
        const icons = (v.icons||'house.fill,magnifyingglass,bell.fill,person.fill').split(',').map(s=>s.trim());
        const bi = Math.round(v.badgeIndex);
        return `<span class="cm">// CustomTabView.swift</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">CustomTabView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> selected = <span class="nu">${Math.round(v.activeIndex)}</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">TabView</span>(selection: $selected) {
            ${labels.map((l,i)=>`<span class="ty">Text</span>(<span class="st">"${l}"</span>).tabItem { <span class="ty">Label</span>(<span class="st">"${l}"</span>, systemImage: <span class="st">"${icons[i]||'circle'}"</span>) }${bi>=0&&i===bi?`.badge(<span class="nu">${v.badgeCount}</span>)`:''}
                .tag(<span class="nu">${i}</span>)`).join('\n            ')}
        }
        .tint(${cv('activeColor',v.activeColor,'color')})
    }
}`;
      }
    },
  };

  // ── Init generator UI ──────────────────────────────────
  function initGenerator() {
    const inner = document.getElementById('generatorPanel');
    inner.innerHTML = buildGeneratorHTML();
    attachGeneratorEvents();
    selectComponent('textfield');
  }

  function buildGeneratorHTML() {
    const compButtons = Object.entries(COMPONENTS).map(([key, c]) =>
      `<button class="cb-comp-btn" data-comp="${key}">${c.icon} ${c.label}</button>`
    ).join('');

    return `
    <div class="gen-inner2">
      <div class="gen-left">
        <div class="gen-left-header">
          <h2 class="gen-title">Component Builder</h2>
          <p class="gen-desc">Pick a component, tweak its style, copy the Swift code.</p>
        </div>
        <div class="gen-builder-tabs">
          <button class="gen-builder-tab active" data-tab="build">Build Components</button>
          <button class="gen-builder-tab" data-tab="constants">Project Constants</button>
        </div>
        <div id="buildTab">
          <div class="cb-comp-picker" id="compPicker">${compButtons}</div>
          <div class="cb-props" id="propsPanel"></div>
        </div>
        <div id="constantsTab" style="display:none">
          ${buildConstantsTabHTML()}
        </div>
      </div>
      <div class="gen-right">
        <div class="gen-right-top" id="previewArea">
          <div class="cb-preview-label">Preview</div>
          <div id="livePreview"></div>
        </div>
        <div class="gen-right-bottom">
          <div class="gen-output-bar">
            <div class="code-dots">
              <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
            </div>
            <span class="gen-filename" id="genFilename">CustomTextField.swift</span>
            <button class="copy-btn" id="genCopyBtn">
              <svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              Copy Code
            </button>
          </div>
          <pre class="gen-code"><code id="genCodeOutput"></code></pre>
        </div>
      </div>
    </div>`;
  }

  function buildConstantsTabHTML() {
    return `
    <div class="const-tab-inner">
      <div class="const-section">
        <div class="const-section-title">AppColors</div>
        <div id="constColorsList"></div>
        <button class="const-add-btn" onclick="window._addConst('colors')">+ Add Color</button>
      </div>
      <div class="const-section">
        <div class="const-section-title">AppFonts</div>
        <div id="constFontsList"></div>
        <button class="const-add-btn" onclick="window._addConst('fonts')">+ Add Font</button>
      </div>
      <div class="const-section">
        <div class="const-section-title">AppSizes</div>
        <div id="constSizesList"></div>
        <button class="const-add-btn" onclick="window._addConst('sizes')">+ Add Size</button>
      </div>
      <div class="const-section">
        <div class="const-section-title">AppImages</div>
        <div id="constImagesList"></div>
        <button class="const-add-btn" onclick="window._addConst('images')">+ Add Image</button>
      </div>
      <div class="const-copy-btns">
        <button class="const-copy-btn" onclick="window._copySwift('colors')">Copy AppColors.swift</button>
        <button class="const-copy-btn" onclick="window._copySwift('fonts')">Copy AppFonts.swift</button>
        <button class="const-copy-btn" onclick="window._copySwift('sizes')">Copy AppSizes.swift</button>
        <button class="const-copy-btn" onclick="window._copySwift('images')">Copy AppImages.swift</button>
      </div>
    </div>`;
  }

  function renderConstList(type) {
    const listId = { colors:'constColorsList', fonts:'constFontsList', sizes:'constSizesList', images:'constImagesList' }[type];
    const el = document.getElementById(listId);
    if (!el) return;
    el.innerHTML = projectConsts[type].map((c, i) => buildConstRow(type, c, i)).join('');
    // attach change events
    el.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = parseInt(inp.dataset.idx);
        const field = inp.dataset.field;
        projectConsts[type][idx][field] = inp.value;
        renderAll();
      });
    });
    el.querySelectorAll('.const-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        projectConsts[type].splice(idx, 1);
        renderConstList(type);
        renderAll();
      });
    });
  }

  function buildConstRow(type, c, i) {
    if (type === 'colors') {
      return `<div class="const-row">
        <input class="cb-text-input" data-idx="${i}" data-field="name" value="${c.name}" placeholder="name" style="width:90px" />
        <input type="color" value="${c.hex||'#007AFF'}" data-idx="${i}" data-field="hex" style="width:36px;height:28px;border:none;border-radius:4px;cursor:pointer;padding:0" />
        <input class="cb-text-input" data-idx="${i}" data-field="hex" value="${c.hex||'#007AFF'}" placeholder="#HEX" style="width:80px" />
        <button class="const-del-btn" data-idx="${i}">×</button>
      </div>`;
    } else if (type === 'fonts') {
      return `<div class="const-row">
        <input class="cb-text-input" data-idx="${i}" data-field="name" value="${c.name}" placeholder="name" style="width:80px" />
        <input class="cb-text-input" data-idx="${i}" data-field="family" value="${c.family||''}" placeholder="Inter-Bold" style="width:100px" />
        <input class="cb-text-input" data-idx="${i}" data-field="size" value="${c.size||'17'}" placeholder="size" style="width:50px" />
        <button class="const-del-btn" data-idx="${i}">×</button>
      </div>`;
    } else if (type === 'sizes') {
      return `<div class="const-row">
        <input class="cb-text-input" data-idx="${i}" data-field="name" value="${c.name}" placeholder="name" style="width:100px" />
        <input class="cb-text-input" data-idx="${i}" data-field="value" value="${c.value||'0'}" placeholder="value" style="width:80px" />
        <button class="const-del-btn" data-idx="${i}">×</button>
      </div>`;
    } else if (type === 'images') {
      return `<div class="const-row">
        <input class="cb-text-input" data-idx="${i}" data-field="name" value="${c.name}" placeholder="name" style="width:100px" />
        <input class="cb-text-input" data-idx="${i}" data-field="asset" value="${c.asset||''}" placeholder="asset_name" style="width:110px" />
        <button class="const-del-btn" data-idx="${i}">×</button>
      </div>`;
    }
    return '';
  }

  // Swift file generators
  function genSwiftColors() {
    const colorExt = `extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >> 8)  & 0xFF) / 255
        let b = Double(int & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}`;
    const body = projectConsts.colors.map(c => `    static let ${c.name} = Color(hex: "${c.hex||'#000000'}")`).join('\n');
    return `import SwiftUI\n\n${colorExt}\n\nstruct AppColors {\n${body}\n}`;
  }

  function genSwiftFonts() {
    const body = projectConsts.fonts.map(c => `    static let ${c.name} = Font.custom("${c.family||''}", size: ${c.size||17})`).join('\n');
    return `import SwiftUI\n\nstruct AppFonts {\n${body}\n}`;
  }

  function genSwiftSizes() {
    const body = projectConsts.sizes.map(c => `    static let ${c.name}: CGFloat = ${c.value||0}`).join('\n');
    return `import Foundation\n\nstruct AppSizes {\n${body}\n}`;
  }

  function genSwiftImages() {
    const body = projectConsts.images.map(c => `    static let ${c.name} = Image("${c.asset||''}")`).join('\n');
    return `import SwiftUI\n\nstruct AppImages {\n${body}\n}`;
  }

  // expose to onclick handlers
  window._addConst = (type) => {
    const defaults = { colors:{name:'newColor',hex:'#007AFF'}, fonts:{name:'newFont',family:'Inter-Regular',size:'17'}, sizes:{name:'newSize',value:'16'}, images:{name:'newImage',asset:'image_name'} };
    projectConsts[type].push({...defaults[type]});
    renderConstList(type);
  };

  window._copySwift = (type) => {
    const code = { colors: genSwiftColors, fonts: genSwiftFonts, sizes: genSwiftSizes, images: genSwiftImages }[type]();
    navigator.clipboard.writeText(code).then(() => {
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    });
  };

  function attachGeneratorEvents() {
    document.querySelectorAll('.cb-comp-btn').forEach(btn => {
      btn.addEventListener('click', () => selectComponent(btn.dataset.comp));
    });
    document.getElementById('genCopyBtn').addEventListener('click', copyCode);

    // Tab switching
    document.querySelectorAll('.gen-builder-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeBuilderTab = tab.dataset.tab;
        document.querySelectorAll('.gen-builder-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === activeBuilderTab));
        document.getElementById('buildTab').style.display = activeBuilderTab === 'build' ? '' : 'none';
        document.getElementById('constantsTab').style.display = activeBuilderTab === 'constants' ? '' : 'none';
        if (activeBuilderTab === 'constants') {
          ['colors','fonts','sizes','images'].forEach(renderConstList);
        }
      });
    });
  }

  let currentComp = 'textfield';
  let currentVals  = {};

  function selectComponent(key) {
    currentComp = key;
    currentVals = {};
    propConsts = {};
    const comp = COMPONENTS[key];
    document.querySelectorAll('.cb-comp-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.comp === key)
    );
    document.getElementById('genFilename').textContent = `Custom${comp.label.replace(/[\s\/]/g,'')}.swift`;
    comp.props.forEach(p => { currentVals[p.id] = p.default; });
    renderProps(comp);
    renderAll();
  }

  function renderProps(comp) {
    const panel = document.getElementById('propsPanel');
    panel.innerHTML = comp.props.map(p => buildPropRow(p)).join('');

    comp.props.forEach(p => {
      if (p.type === 'color') {
        const picker = panel.querySelector(`[data-id="${p.id}"].cb-color-picker`);
        const hexIn  = panel.querySelector(`[data-id="${p.id}"].cb-hex-input`);
        const swatch = panel.querySelector(`[data-id="${p.id}"].cb-swatch`);
        picker.addEventListener('input', () => {
          currentVals[p.id] = picker.value.toUpperCase();
          hexIn.value = picker.value.toUpperCase();
          swatch.style.background = picker.value;
          renderAll();
        });
        hexIn.addEventListener('input', () => {
          const v = hexIn.value.startsWith('#') ? hexIn.value : '#' + hexIn.value;
          if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) {
            picker.value = v; swatch.style.background = v;
            currentVals[p.id] = v.toUpperCase();
            renderAll();
          }
        });
      } else if (p.type === 'range') {
        const slider = panel.querySelector(`[data-id="${p.id}"].cb-slider`);
        const valEl  = panel.querySelector(`[data-id="${p.id}"].cb-range-val`);
        slider.addEventListener('input', () => {
          currentVals[p.id] = parseFloat(slider.value);
          valEl.textContent = slider.value;
          renderAll();
        });
      } else if (p.type === 'select') {
        const sel = panel.querySelector(`[data-id="${p.id}"].cb-select`);
        sel.addEventListener('change', () => { currentVals[p.id] = sel.value; renderAll(); });
      } else if (p.type === 'text') {
        const inp = panel.querySelector(`[data-id="${p.id}"].cb-text-input`);
        inp.addEventListener('input', () => { currentVals[p.id] = inp.value; renderAll(); });
      } else if (p.type === 'toggle') {
        const chk = panel.querySelector(`[data-id="${p.id}"].cb-toggle-check`);
        chk.addEventListener('change', () => { currentVals[p.id] = chk.checked; renderAll(); });
      }
    });

    // Const pill click handlers
    panel.querySelectorAll('.const-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const pid = pill.dataset.prop;
        const cname = pill.dataset.const;
        if (propConsts[pid] === cname) {
          delete propConsts[pid];
        } else {
          propConsts[pid] = cname;
        }
        renderProps(COMPONENTS[currentComp]);
        renderAll();
      });
    });
  }

  function getConstPills(propId, type) {
    const typeMap = { color: 'colors', font: 'fonts', size: 'sizes' };
    const constType = typeMap[type];
    if (!constType) return '';
    const items = projectConsts[constType];
    if (!items || items.length === 0) return '';
    const linked = propConsts[propId];
    const pills = items.map(c => {
      const isLinked = linked === c.name;
      return `<span class="const-pill${isLinked?' linked':''}" data-prop="${propId}" data-const="${c.name}" title="${type==='color'?c.hex:type==='font'?`${c.family} ${c.size}`:c.value}">${c.name}${isLinked?' ×':''}</span>`;
    }).join('');
    return `<div class="const-pills">${pills}</div>`;
  }

  function buildPropRow(p) {
    const v = currentVals[p.id] !== undefined ? currentVals[p.id] : p.default;
    const linked = propConsts[p.id];

    if (p.type === 'color') {
      const linkedBadge = linked ? `<span class="const-pill linked" style="margin-left:6px">${linked}</span>` : '';
      return `<div class="cb-prop-row">
        <label class="cb-prop-label">${p.label}${linkedBadge}</label>
        <div class="cb-prop-control cb-color-row">
          <input type="color" value="${v}" class="cb-color-picker" data-id="${p.id}" />
          <div class="cb-swatch" data-id="${p.id}" style="background:${v}"></div>
          <input type="text" value="${v}" class="cb-hex-input" data-id="${p.id}" maxlength="7" />
        </div>
        ${getConstPills(p.id, 'color')}
      </div>`;
    } else if (p.type === 'range') {
      const linkedBadge = linked ? `<span class="const-pill linked" style="margin-left:6px">${linked}</span>` : '';
      return `<div class="cb-prop-row">
        <label class="cb-prop-label">${p.label}${linkedBadge}</label>
        <div class="cb-prop-control cb-range-row">
          <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${v}" class="cb-slider" data-id="${p.id}" />
          <span class="cb-range-val" data-id="${p.id}">${v}</span>
        </div>
        ${getConstPills(p.id, 'size')}
      </div>`;
    } else if (p.type === 'select') {
      const opts = p.options.map(o => `<option value="${o}"${o === v ? ' selected' : ''}>${o}</option>`).join('');
      return `<div class="cb-prop-row">
        <label class="cb-prop-label">${p.label}</label>
        <div class="cb-prop-control">
          <select class="cb-select" data-id="${p.id}">${opts}</select>
        </div>
      </div>`;
    } else if (p.type === 'text') {
      return `<div class="cb-prop-row">
        <label class="cb-prop-label">${p.label}</label>
        <div class="cb-prop-control">
          <input type="text" value="${v}" class="cb-text-input" data-id="${p.id}" placeholder="${p.label}" />
        </div>
      </div>`;
    } else if (p.type === 'toggle') {
      return `<div class="cb-prop-row">
        <label class="cb-prop-label">${p.label}</label>
        <div class="cb-prop-control">
          <label class="cb-toggle-label">
            <input type="checkbox" class="cb-toggle-check" data-id="${p.id}" ${v ? 'checked' : ''} />
            <span class="cb-toggle-track"><span class="cb-toggle-thumb"></span></span>
          </label>
        </div>
      </div>`;
    }
    return '';
  }

  function renderAll() {
    const comp = COMPONENTS[currentComp];
    document.getElementById('livePreview').innerHTML = comp.preview(currentVals);
    document.getElementById('genCodeOutput').innerHTML = comp.code(currentVals);
  }

  function copyCode() {
    const tmp = document.createElement('div');
    tmp.innerHTML = document.getElementById('genCodeOutput').innerHTML;
    navigator.clipboard.writeText(tmp.textContent).then(() => {
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    });
  }
})();
