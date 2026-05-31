const SNIPPETS = [
  // ── LAYOUT ──────────────────────────────────────────────────────────
  {
    id: 1, category: "layout", icon: "⬛",
    title: "HStack & VStack",
    desc: "Horizontal and vertical stack containers with alignment and spacing.",
    tags: ["HStack", "VStack", "Spacing"],
    preview: `<div class="ios-canvas"><div class="p-vstack" style="max-width:260px"><div class="p-text headline">Title</div><div class="p-hstack"><span class="p-icon">⭐</span><div class="p-text">Starred item</div><div class="p-spacer"></div><div class="p-text subhead">4.9</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">StackExample</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">16</span>) {
            <span class="ty">Text</span>(<span class="st">"Title"</span>)
                .font(.headline)
            <span class="ty">HStack</span>(spacing: <span class="nu">12</span>) {
                <span class="ty">Image</span>(systemName: <span class="st">"star.fill"</span>)
                <span class="ty">Text</span>(<span class="st">"Starred item"</span>)
                <span class="ty">Spacer</span>()
                <span class="ty">Text</span>(<span class="st">"4.9"</span>)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
    }
}`
  },
  {
    id: 2, category: "layout", icon: "⬛",
    title: "LazyVGrid",
    desc: "Adaptive grid layout that lazily renders items as they appear.",
    tags: ["Grid", "Lazy", "Adaptive"],
    preview: `<div class="ios-canvas"><div class="p-grid"><div class="p-grid-cell">1</div><div class="p-grid-cell">2</div><div class="p-grid-cell">3</div><div class="p-grid-cell">4</div><div class="p-grid-cell">5</div><div class="p-grid-cell">6</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">GridExample</span>: <span class="ty">View</span> {
    <span class="kw">let</span> columns = [
        <span class="ty">GridItem</span>(.adaptive(minimum: <span class="nu">120</span>), spacing: <span class="nu">16</span>)
    ]
    <span class="kw">let</span> items = <span class="ty">Array</span>(<span class="nu">1</span>...<span class="nu">20</span>)

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ScrollView</span> {
            <span class="ty">LazyVGrid</span>(columns: columns, spacing: <span class="nu">16</span>) {
                <span class="ty">ForEach</span>(items, id: \\.self) { i <span class="kw">in</span>
                    <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>)
                        .fill(.blue.opacity(<span class="nu">0.2</span>))
                        .frame(height: <span class="nu">100</span>)
                        .overlay { <span class="ty">Text</span>(<span class="st">"\\(i)"</span>) }
                }
            }
            .padding()
        }
    }
}`
  },
  {
    id: 3, category: "layout", icon: "⬛",
    title: "ZStack Overlay",
    desc: "Layer views on top of each other with ZStack for overlay effects.",
    tags: ["ZStack", "Overlay", "Layer"],
    preview: `<div class="ios-canvas" style="padding:12px"><div class="p-zstack"><div class="p-zstack-img"></div><div class="p-zstack-grad"></div><div class="p-zstack-text"><div class="p-text bold white" style="font-size:15px">Grand Canyon</div><div class="p-text white" style="font-size:11px;opacity:0.8">Arizona, USA</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">OverlayCard</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span>(alignment: .bottomLeading) {
            <span class="ty">Image</span>(<span class="st">"landscape"</span>)
                .resizable().scaledToFill()
                .frame(height: <span class="nu">220</span>).clipped()
            <span class="ty">LinearGradient</span>(
                colors: [.clear, .black.opacity(<span class="nu">0.7</span>)],
                startPoint: .top, endPoint: .bottom)
            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">4</span>) {
                <span class="ty">Text</span>(<span class="st">"Grand Canyon"</span>).font(.title3.bold())
                <span class="ty">Text</span>(<span class="st">"Arizona, USA"</span>).font(.subheadline)
            }
            .foregroundStyle(.white).padding()
        }
        .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">16</span>))
    }
}`
  },
  {
    id: 4, category: "layout", icon: "⬛",
    title: "GeometryReader",
    desc: "Read parent geometry to build dynamic, size-aware layouts.",
    tags: ["GeometryReader", "Dynamic", "Size"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-geo"><div class="p-geo-a">60%</div><div class="p-geo-b">40%</div></div><div class="p-text caption" style="margin-top:8px">Dynamic split based on parent width</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">DynamicBanner</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">GeometryReader</span> { proxy <span class="kw">in</span>
            <span class="ty">HStack</span>(spacing: <span class="nu">0</span>) {
                <span class="ty">Color</span>.blue
                    .frame(width: proxy.size.width * <span class="nu">0.6</span>)
                <span class="ty">Color</span>.orange
            }
            .frame(height: <span class="nu">80</span>)
            .clipShape(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>))
        }
        .frame(height: <span class="nu">80</span>).padding()
    }
}`
  },

  // ── CONTROLS ─────────────────────────────────────────────────────────
  {
    id: 5, category: "controls", icon: "🎛️",
    title: "Custom Button Style",
    desc: "Create a reusable pressed-state button style with scale animation.",
    tags: ["Button", "ButtonStyle", "Custom"],
    preview: `<div class="ios-canvas" style="gap:12px"><button class="p-btn primary">Tap Me</button><button class="p-btn destructive">Delete</button><button class="p-btn secondary">Cancel</button></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ScaleButtonStyle</span>: <span class="ty">ButtonStyle</span> {
    <span class="kw">func</span> <span class="fn">makeBody</span>(configuration: <span class="ty">Configuration</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        configuration.label
            .padding(.horizontal, <span class="nu">20</span>)
            .padding(.vertical, <span class="nu">12</span>)
            .background(.blue)
            .foregroundStyle(.white)
            .clipShape(<span class="ty">Capsule</span>())
            .scaleEffect(configuration.isPressed ? <span class="nu">0.94</span> : <span class="nu">1</span>)
            .animation(.spring(duration: <span class="nu">0.2</span>), value: configuration.isPressed)
    }
}
<span class="cm">// Usage</span>
<span class="ty">Button</span>(<span class="st">"Tap Me"</span>) { <span class="kw">print</span>(<span class="st">"tapped"</span>) }
    .buttonStyle(<span class="ty">ScaleButtonStyle</span>())`
  },
  {
    id: 6, category: "controls", icon: "🎛️",
    title: "Toggle with Binding",
    desc: "Toggle switch wired to @State and styled with a custom tint.",
    tags: ["Toggle", "@State", "Binding"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-toggle"><div class="p-label"><span>🔔</span> Notifications</div><div class="p-toggle-track"><div class="p-toggle-thumb"></div></div></div><div class="p-toggle off" style="margin-top:8px"><div class="p-label"><span>🌙</span> Dark Mode</div><div class="p-toggle-track"><div class="p-toggle-thumb"></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SettingsRow</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> isEnabled = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span> {
            <span class="ty">Label</span>(<span class="st">"Notifications"</span>, systemImage: <span class="st">"bell.fill"</span>)
            <span class="ty">Spacer</span>()
            <span class="ty">Toggle</span>(<span class="st">""</span>, isOn: $isEnabled)
                .labelsHidden()
                .tint(.orange)
        }
        .padding()
        .background(.quaternary, in: <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>))
    }
}`
  },
  {
    id: 7, category: "controls", icon: "🎛️",
    title: "Stepper & Slider",
    desc: "Numeric input controls with live value binding and range limits.",
    tags: ["Stepper", "Slider", "Numeric"],
    preview: `<div class="ios-canvas" style="padding:16px;gap:14px"><div class="p-row"><div class="p-text" style="flex:1">Quantity: 3</div><div class="p-stepper"><span class="p-step-btn">−</span><span class="p-step-val">3</span><span class="p-step-btn">+</span></div></div><div class="p-slider"><div class="p-text" style="font-size:13px;color:#1c1c1e">Brightness: 65%</div><div class="p-slider-track"><div class="p-slider-fill"></div><div class="p-slider-thumb"></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">NumericControls</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> quantity = <span class="nu">1</span>
    <span class="pa">@State</span> <span class="kw">private var</span> brightness = <span class="nu">0.5</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">20</span>) {
            <span class="ty">Stepper</span>(<span class="st">"Quantity: \\(quantity)"</span>,
                    value: $quantity, in: <span class="nu">1</span>...<span class="nu">99</span>)
            <span class="ty">VStack</span>(alignment: .leading) {
                <span class="ty">Text</span>(<span class="st">"Brightness"</span>)
                <span class="ty">Slider</span>(value: $brightness, in: <span class="nu">0</span>...<span class="nu">1</span>)
                    .tint(.yellow)
            }
        }
        .padding()
    }
}`
  },
  {
    id: 8, category: "controls", icon: "🎛️",
    title: "SearchBar with Focus",
    desc: "TextField styled as a search bar using @FocusState.",
    tags: ["TextField", "FocusState", "Search"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-searchbar"><span style="font-size:14px;color:#8e8e93">🔍</span><input placeholder="Search…" readonly /><span style="font-size:14px;color:#c7c7cc">✕</span></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SearchBar</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> query = <span class="st">""</span>
    <span class="pa">@FocusState</span> <span class="kw">private var</span> focused: <span class="ty">Bool</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {
            <span class="ty">Image</span>(systemName: <span class="st">"magnifyingglass"</span>)
                .foregroundStyle(.secondary)
            <span class="ty">TextField</span>(<span class="st">"Search…"</span>, text: $query)
                .focused($focused)
                .submitLabel(.search)
            <span class="kw">if</span> !query.isEmpty {
                <span class="ty">Button</span> { query = <span class="st">""</span> } label: {
                    <span class="ty">Image</span>(systemName: <span class="st">"xmark.circle.fill"</span>)
                }
            }
        }
        .padding(<span class="nu">10</span>)
        .background(.quaternary, in: <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">10</span>))
    }
}`
  },

  // ── ANIMATION ────────────────────────────────────────────────────────
  {
    id: 9, category: "animation", icon: "✨",
    title: "Spring Animation",
    desc: "Bouncy spring-based animation triggered by state change.",
    tags: ["Animation", "Spring", "withAnimation"],
    preview: `<div class="ios-canvas" style="padding:16px;gap:8px"><div class="p-spring-box">Tap to expand ↕</div><div class="p-text caption" style="text-align:center">spring(response: 0.45, dampingFraction: 0.7)</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SpringCard</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> expanded = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span> {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">16</span>)
                .fill(.purple.gradient)
                .frame(height: expanded ? <span class="nu">240</span> : <span class="nu">80</span>)
                .animation(.spring(response: <span class="nu">0.45</span>,
                                   dampingFraction: <span class="nu">0.7</span>),
                           value: expanded)
                .onTapGesture { expanded.toggle() }
            <span class="ty">Text</span>(expanded ? <span class="st">"Tap to collapse"</span> : <span class="st">"Tap to expand"</span>)
                .font(.caption).foregroundStyle(.secondary)
        }
        .padding()
    }
}`
  },
  {
    id: 10, category: "animation", icon: "✨",
    title: "Pulsing Shimmer",
    desc: "Skeleton loading shimmer using phase animation.",
    tags: ["PhaseAnimator", "Shimmer", "Loading"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-shimmer"><div class="p-shimmer-line"></div><div class="p-shimmer-line medium"></div><div class="p-shimmer-line short"></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ShimmerView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> phase: <span class="ty">CGFloat</span> = <span class="nu">-1</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">8</span>)
            .fill(<span class="ty">LinearGradient</span>(
                stops: [
                    .init(color: .gray.opacity(<span class="nu">0.2</span>), location: phase - <span class="nu">0.3</span>),
                    .init(color: .gray.opacity(<span class="nu">0.5</span>), location: phase),
                    .init(color: .gray.opacity(<span class="nu">0.2</span>), location: phase + <span class="nu">0.3</span>)
                ],
                startPoint: .leading, endPoint: .trailing))
            .frame(height: <span class="nu">20</span>)
            .onAppear {
                <span class="ty">withAnimation</span>(.linear(duration: <span class="nu">1.2</span>)
                    .repeatForever(autoreverses: <span class="kw">false</span>)) {
                    phase = <span class="nu">2</span>
                }
            }
    }
}`
  },
  {
    id: 11, category: "animation", icon: "✨",
    title: "Matched Geometry Effect",
    desc: "Hero transition between views using matchedGeometryEffect.",
    tags: ["MatchedGeometry", "Hero", "Namespace"],
    preview: `<div class="ios-canvas" style="gap:16px"><div class="p-hero-pair"><div class="p-hero-small"></div><span style="font-size:22px;color:#8e8e93">→</span><div class="p-hero-large"></div></div><div class="p-text caption" style="text-align:center">matchedGeometryEffect hero transition</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">HeroTransition</span>: <span class="ty">View</span> {
    <span class="pa">@Namespace</span> <span class="kw">private var</span> ns
    <span class="pa">@State</span> <span class="kw">private var</span> isExpanded = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="kw">if</span> isExpanded {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">20</span>)
                .fill(.blue.gradient)
                .matchedGeometryEffect(id: <span class="st">"card"</span>, <span class="kw">in</span>: ns)
                .frame(maxWidth: .infinity, maxHeight: <span class="nu">300</span>)
                .onTapGesture { <span class="ty">withAnimation</span>(.spring()) { isExpanded = <span class="kw">false</span> } }
        } <span class="kw">else</span> {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>)
                .fill(.blue.gradient)
                .matchedGeometryEffect(id: <span class="st">"card"</span>, <span class="kw">in</span>: ns)
                .frame(width: <span class="nu">80</span>, height: <span class="nu">80</span>)
                .onTapGesture { <span class="ty">withAnimation</span>(.spring()) { isExpanded = <span class="kw">true</span> } }
        }
    }
}`
  },
  {
    id: 12, category: "animation", icon: "✨",
    title: "Rotating Loader",
    desc: "Infinite rotation animation for a custom activity indicator.",
    tags: ["rotationEffect", "Infinite", "Loader"],
    preview: `<div class="ios-canvas" style="gap:12px"><div class="p-spinner"></div><div class="p-text caption">Custom arc spinner</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SpinnerView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> rotation: <span class="ty">Double</span> = <span class="nu">0</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Circle</span>()
            .trim(from: <span class="nu">0.1</span>, to: <span class="nu">0.9</span>)
            .stroke(style: <span class="ty">StrokeStyle</span>(lineWidth: <span class="nu">4</span>, lineCap: .round))
            .foregroundStyle(.angularGradient(
                colors: [.blue, .purple], center: .center,
                startAngle: .zero, endAngle: .degrees(<span class="nu">360</span>)))
            .frame(width: <span class="nu">44</span>, height: <span class="nu">44</span>)
            .rotationEffect(.degrees(rotation))
            .onAppear {
                <span class="ty">withAnimation</span>(.linear(duration: <span class="nu">1</span>)
                    .repeatForever(autoreverses: <span class="kw">false</span>)) {
                    rotation = <span class="nu">360</span>
                }
            }
    }
}`
  },

  // ── NAVIGATION ───────────────────────────────────────────────────────
  {
    id: 13, category: "navigation", icon: "🗺️",
    title: "NavigationStack",
    desc: "Modern NavigationStack with typed navigation path.",
    tags: ["NavigationStack", "NavigationLink", "Path"],
    preview: `<div class="ios-canvas" style="padding:0;align-items:stretch"><div class="p-navstack" style="width:100%"><div class="p-navbar"><span class="p-navbar-title">Home</span><span class="p-navbar-btn">Root</span></div><div class="p-list-row">Item 1 <span class="p-chevron">›</span></div><div class="p-list-row">Item 2 <span class="p-chevron">›</span></div><div class="p-list-row">Item 3 <span class="p-chevron">›</span></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ContentView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> path = <span class="ty">NavigationPath</span>()

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationStack</span>(path: $path) {
            <span class="ty">List</span>(<span class="nu">1</span>...<span class="nu">5</span>, id: \\.self) { n <span class="kw">in</span>
                <span class="ty">NavigationLink</span>(<span class="st">"Item \\(n)"</span>, value: n)
            }
            .navigationTitle(<span class="st">"Home"</span>)
            .navigationDestination(for: <span class="ty">Int</span>.self) { n <span class="kw">in</span>
                <span class="ty">Text</span>(<span class="st">"Detail for \\(n)"</span>)
                    .navigationTitle(<span class="st">"Item \\(n)"</span>)
            }
            .toolbar {
                <span class="ty">Button</span>(<span class="st">"Root"</span>) { path = .init() }
            }
        }
    }
}`
  },
  {
    id: 14, category: "navigation", icon: "🗺️",
    title: "Tab View",
    desc: "Bottom tab bar with SF Symbol icons and badge support.",
    tags: ["TabView", "TabItem", "Badge"],
    preview: `<div class="ios-canvas" style="padding:0;gap:0;align-items:stretch"><div style="background:#fff;padding:20px 16px;flex:1;display:flex;align-items:center;justify-content:center"><div class="p-text" style="color:#8e8e93;font-size:13px">Home Content</div></div><div class="p-tabbar"><div class="p-tab active"><span class="tab-icon">🏠</span>Home</div><div class="p-tab"><span class="tab-icon">🔍</span>Search</div><div class="p-tab" style="position:relative"><span class="tab-icon">✉️</span>Inbox<span style="position:absolute;top:2px;right:18px;background:#ff3b30;color:#fff;border-radius:10px;font-size:9px;padding:1px 5px;font-weight:700">3</span></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">RootTabView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> selection = <span class="nu">0</span>
    <span class="pa">@State</span> <span class="kw">private var</span> unread = <span class="nu">3</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">TabView</span>(selection: $selection) {
            <span class="ty">HomeView</span>()
                .tabItem { <span class="ty">Label</span>(<span class="st">"Home"</span>, systemImage: <span class="st">"house.fill"</span>) }
                .tag(<span class="nu">0</span>)
            <span class="ty">SearchView</span>()
                .tabItem { <span class="ty">Label</span>(<span class="st">"Search"</span>, systemImage: <span class="st">"magnifyingglass"</span>) }
                .tag(<span class="nu">1</span>)
            <span class="ty">InboxView</span>()
                .tabItem { <span class="ty">Label</span>(<span class="st">"Inbox"</span>, systemImage: <span class="st">"envelope.fill"</span>) }
                .badge(unread).tag(<span class="nu">2</span>)
        }
    }
}`
  },
  {
    id: 15, category: "navigation", icon: "🗺️",
    title: "Sheet & fullScreenCover",
    desc: "Present modal sheets and full-screen covers with custom detents.",
    tags: ["Sheet", "Modal", "Detents"],
    preview: `<div class="ios-canvas" style="padding:0;gap:0;align-items:stretch"><div style="background:#f2f2f7;flex:1;display:flex;align-items:flex-end"><div class="p-sheet" style="width:100%"><div class="p-sheet-handle"><div class="p-sheet-grip"></div></div><div class="p-sheet-content"><div class="p-text bold" style="font-size:17px;margin-bottom:6px">Sheet Content</div><div class="p-text subhead">presentationDetents([.medium, .large])</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SheetExample</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> showSheet = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Button</span>(<span class="st">"Open Sheet"</span>) { showSheet = <span class="kw">true</span> }
            .sheet(isPresented: $showSheet) {
                <span class="ty">VStack</span> {
                    <span class="ty">Capsule</span>()
                        .fill(.quaternary)
                        .frame(width: <span class="nu">36</span>, height: <span class="nu">5</span>)
                        .padding(.top, <span class="nu">8</span>)
                    <span class="ty">Text</span>(<span class="st">"Sheet Content"</span>)
                        .font(.title2.bold()).padding()
                    <span class="ty">Spacer</span>()
                }
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
                .presentationCornerRadius(<span class="nu">24</span>)
            }
    }
}`
  },
  {
    id: 16, category: "navigation", icon: "🗺️",
    title: "Toolbar Items",
    desc: "Add toolbar buttons with placement control in NavigationStack.",
    tags: ["Toolbar", "ToolbarItem", "Menu"],
    preview: `<div class="ios-canvas" style="padding:0;align-items:stretch"><div class="p-toolbar"><span class="p-toolbar-btn">Edit</span><span class="p-toolbar-title">Details</span><div class="p-toolbar-actions"><span class="p-toolbar-menu">⋯</span></div></div><div style="background:#f9f9f9;flex:1;padding:16px;display:flex;align-items:center;justify-content:center"><div class="p-text subhead">Content area</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">DetailView</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Text</span>(<span class="st">"Content"</span>)
            .navigationTitle(<span class="st">"Details"</span>)
            .toolbar {
                <span class="ty">ToolbarItem</span>(placement: .topBarLeading) {
                    <span class="ty">Button</span>(<span class="st">"Edit"</span>) {}
                }
                <span class="ty">ToolbarItem</span>(placement: .topBarTrailing) {
                    <span class="ty">Menu</span> {
                        <span class="ty">Button</span>(<span class="st">"Share"</span>, systemImage: <span class="st">"square.and.arrow.up"</span>) {}
                        <span class="ty">Button</span>(<span class="st">"Duplicate"</span>, systemImage: <span class="st">"doc.on.doc"</span>) {}
                        <span class="ty">Divider</span>()
                        <span class="ty">Button</span>(<span class="st">"Delete"</span>, systemImage: <span class="st">"trash"</span>, role: .destructive) {}
                    } label: {
                        <span class="ty">Image</span>(systemName: <span class="st">"ellipsis.circle"</span>)
                    }
                }
            }
    }
}`
  },

  // ── STYLING ──────────────────────────────────────────────────────────
  {
    id: 17, category: "styling", icon: "🎨",
    title: "Gradient Backgrounds",
    desc: "Linear, radial, and angular gradient fills.",
    tags: ["Gradient", "LinearGradient", "Background"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-gradient-stack"><div class="p-grad p-grad-linear"></div><div class="p-grad p-grad-radial"></div><div class="p-grad p-grad-angular"></div></div><div class="p-hstack" style="margin-top:6px;justify-content:space-around;width:100%"><div class="p-text caption">Linear</div><div class="p-text caption">Radial</div><div class="p-text caption">Angular</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">GradientShowcase</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">16</span>) {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">16</span>)
                .fill(.linearGradient(
                    colors: [.purple, .blue, .cyan],
                    startPoint: .topLeading, endPoint: .bottomTrailing))
                .frame(height: <span class="nu">80</span>)
            <span class="ty">Circle</span>()
                .fill(.radialGradient(
                    colors: [.orange, .red], center: .center,
                    startRadius: <span class="nu">0</span>, endRadius: <span class="nu">60</span>))
                .frame(width: <span class="nu">120</span>, height: <span class="nu">120</span>)
            <span class="ty">Capsule</span>()
                .fill(.angularGradient(
                    colors: [.red, .yellow, .green, .blue, .red],
                    center: .center,
                    startAngle: .zero, endAngle: .degrees(<span class="nu">360</span>)))
                .frame(height: <span class="nu">60</span>)
        }
        .padding()
    }
}`
  },
  {
    id: 18, category: "styling", icon: "🎨",
    title: "ViewModifier",
    desc: "Encapsulate reusable styling logic in a custom ViewModifier.",
    tags: ["ViewModifier", "Modifier", "Reusable"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-modifier-card"><div class="p-text bold" style="margin-bottom:4px">Card Title</div><div class="p-text subhead">Reusable card style via .cardStyle() modifier</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">CardModifier</span>: <span class="ty">ViewModifier</span> {
    <span class="kw">var</span> color: <span class="ty">Color</span> = .primary

    <span class="kw">func</span> <span class="fn">body</span>(content: <span class="ty">Content</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        content
            .padding(<span class="nu">16</span>)
            .background(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">14</span>)
                .fill(.background)
                .shadow(color: color.opacity(<span class="nu">0.15</span>), radius: <span class="nu">10</span>, y: <span class="nu">4</span>))
            .overlay(<span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">14</span>)
                .stroke(color.opacity(<span class="nu">0.1</span>)))
    }
}
<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">cardStyle</span>(color: <span class="ty">Color</span> = .primary) -> <span class="kw">some</span> <span class="ty">View</span> {
        modifier(<span class="ty">CardModifier</span>(color: color))
    }
}
<span class="cm">// Usage</span>
<span class="ty">Text</span>(<span class="st">"Hello"</span>).cardStyle(color: .blue)`
  },
  {
    id: 19, category: "styling", icon: "🎨",
    title: "SF Symbols + Colors",
    desc: "Use SF Symbols with rendering modes and palette colors.",
    tags: ["SFSymbols", "Palette", "RenderingMode"],
    preview: `<div class="ios-canvas"><div class="p-symbols"><span class="p-sym">⭐</span><span class="p-sym">❤️</span><span class="p-sym">⚡</span><span class="p-sym">🌧️</span></div><div class="p-text caption">symbolRenderingMode(.palette)</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SymbolGrid</span>: <span class="ty">View</span> {
    <span class="kw">let</span> symbols = [
        (<span class="st">"star.fill"</span>, <span class="ty">Color</span>.yellow),
        (<span class="st">"heart.fill"</span>, .red),
        (<span class="st">"bolt.fill"</span>, .orange),
        (<span class="st">"cloud.rain.fill"</span>, .blue)
    ]
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">20</span>) {
            <span class="ty">ForEach</span>(symbols, id: \\.0) { name, color <span class="kw">in</span>
                <span class="ty">Image</span>(systemName: name)
                    .symbolRenderingMode(.palette)
                    .foregroundStyle(color, color.opacity(<span class="nu">0.3</span>))
                    .font(.system(size: <span class="nu">32</span>))
                    .symbolEffect(.bounce, value: <span class="kw">true</span>)
            }
        }
    }
}`
  },
  {
    id: 20, category: "styling", icon: "🎨",
    title: "Custom Shape",
    desc: "Draw a custom Shape using Path for unique clip regions.",
    tags: ["Shape", "Path", "Custom"],
    preview: `<div class="ios-canvas" style="padding:16px"><div class="p-wave"></div><div class="p-text caption" style="margin-top:8px;text-align:center">Wave clipped with custom Path</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">WaveShape</span>: <span class="ty">Shape</span> {
    <span class="kw">var</span> amplitude: <span class="ty">CGFloat</span> = <span class="nu">20</span>

    <span class="kw">func</span> <span class="fn">path</span>(<span class="kw">in</span> rect: <span class="ty">CGRect</span>) -> <span class="ty">Path</span> {
        <span class="ty">Path</span> { p <span class="kw">in</span>
            p.move(to: .init(x: <span class="nu">0</span>, y: rect.midY))
            <span class="kw">for</span> x <span class="kw">in</span> stride(from: <span class="nu">0</span>, through: rect.width, by: <span class="nu">1</span>) {
                <span class="kw">let</span> y = rect.midY + amplitude *
                    sin((<span class="ty">CGFloat</span>(x) / rect.width) * .pi * <span class="nu">4</span>)
                p.addLine(to: .init(x: x, y: y))
            }
            p.addLine(to: .init(x: rect.maxX, y: rect.maxY))
            p.addLine(to: .init(x: <span class="nu">0</span>, y: rect.maxY))
            p.closeSubpath()
        }
    }
}
<span class="cm">// Usage</span>
<span class="ty">WaveShape</span>().fill(.blue.gradient).frame(height: <span class="nu">100</span>)`
  },

  // ── CONSTANTS ────────────────────────────────────────────────────────
  {
    id: 21, category: "constants", icon: "🎨",
    title: "Color Constants",
    desc: "Central AppColors file — drop into your project and use everywhere.",
    tags: ["Colors", "AppColors", "Export"],
    preview: `<div class="ios-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppColors.swift</span></div><div class="p-const-line"><span class="p-const-kw">struct</span> AppColors {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">static let</span> primary = <span class="p-const-val">Color("Primary")</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">static let</span> accent = <span class="p-const-val">Color("Accent")</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">static let</span> success = <span class="p-const-val">Color(...)</span></div><div class="p-const-line">}</div><div class="p-color-swatches"><div class="p-swatch" style="background:#007aff"></div><div class="p-swatch" style="background:#ff9500"></div><div class="p-swatch" style="background:#34c759"></div><div class="p-swatch" style="background:#ff3b30"></div><div class="p-swatch" style="background:#af52de"></div><div class="p-swatch" style="background:#f2f2f7"></div></div></div><div class="p-export-badge">⬇ Drop into Xcode project</div></div>`,
    code: `<span class="cm">// AppColors.swift — add to your project</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">AppColors</span> {
    <span class="cm">// Brand</span>
    <span class="kw">static let</span> primary     = <span class="ty">Color</span>(<span class="st">"Primary"</span>)     <span class="cm">// Assets.xcassets</span>
    <span class="kw">static let</span> accent      = <span class="ty">Color</span>(<span class="st">"Accent"</span>)
    <span class="kw">static let</span> secondary   = <span class="ty">Color</span>(<span class="st">"Secondary"</span>)

    <span class="cm">// Backgrounds</span>
    <span class="kw">static let</span> background  = <span class="ty">Color</span>(<span class="st">"AppBackground"</span>)
    <span class="kw">static let</span> surface     = <span class="ty">Color</span>(<span class="st">"Surface"</span>)
    <span class="kw">static let</span> cardBg      = <span class="ty">Color</span>(<span class="st">"CardBackground"</span>)

    <span class="cm">// Text</span>
    <span class="kw">static let</span> textPrimary = <span class="ty">Color</span>(<span class="st">"TextPrimary"</span>)
    <span class="kw">static let</span> textMuted   = <span class="ty">Color</span>(<span class="st">"TextMuted"</span>)

    <span class="cm">// Semantic</span>
    <span class="kw">static let</span> success = <span class="ty">Color</span>(<span class="nu">#colorLiteral</span>(red: <span class="nu">0.20</span>, green: <span class="nu">0.78</span>, blue: <span class="nu">0.35</span>, alpha: <span class="nu">1</span>))
    <span class="kw">static let</span> warning = <span class="ty">Color</span>(<span class="nu">#colorLiteral</span>(red: <span class="nu">1.00</span>, green: <span class="nu">0.58</span>, blue: <span class="nu">0.00</span>, alpha: <span class="nu">1</span>))
    <span class="kw">static let</span> error   = <span class="ty">Color</span>(<span class="nu">#colorLiteral</span>(red: <span class="nu">1.00</span>, green: <span class="nu">0.23</span>, blue: <span class="nu">0.19</span>, alpha: <span class="nu">1</span>))
    <span class="kw">static let</span> info    = <span class="ty">Color</span>(<span class="nu">#colorLiteral</span>(red: <span class="nu">0.00</span>, green: <span class="nu">0.48</span>, blue: <span class="nu">1.00</span>, alpha: <span class="nu">1</span>))

    <span class="cm">// Borders</span>
    <span class="kw">static let</span> separator = <span class="ty">Color</span>(.separator)
    <span class="kw">static let</span> border    = <span class="ty">Color</span>(.opaqueSeparator)
}

<span class="cm">// Usage</span>
<span class="cm">// Text("Hello").foregroundStyle(AppColors.primary)</span>
<span class="cm">// view.background(AppColors.surface)</span>`
  },
  {
    id: 22, category: "constants", icon: "📝",
    title: "String Constants",
    desc: "Type-safe string constants for copy, keys, and routes.",
    tags: ["Strings", "AppStrings", "Export"],
    preview: `<div class="ios-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppStrings.swift</span></div><div class="p-const-line"><span class="p-const-kw">enum</span> Strings {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">enum</span> Auth {</div><div class="p-const-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="p-const-kw">static let</span> signIn = <span class="p-const-str">"Sign In"</span></div><div class="p-const-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="p-const-kw">static let</span> cta = <span class="p-const-str">"Continue"</span></div><div class="p-const-line">&nbsp;&nbsp;}</div><div class="p-const-line">}</div></div><div class="p-export-badge">⬇ Drop into Xcode project</div></div>`,
    code: `<span class="cm">// AppStrings.swift — add to your project</span>
<span class="kw">import</span> <span class="ty">Foundation</span>

<span class="kw">enum</span> <span class="ty">Strings</span> {

    <span class="kw">enum</span> <span class="ty">General</span> {
        <span class="kw">static let</span> ok       = <span class="st">"OK"</span>
        <span class="kw">static let</span> cancel   = <span class="st">"Cancel"</span>
        <span class="kw">static let</span> save     = <span class="st">"Save"</span>
        <span class="kw">static let</span> delete   = <span class="st">"Delete"</span>
        <span class="kw">static let</span> done     = <span class="st">"Done"</span>
        <span class="kw">static let</span> loading  = <span class="st">"Loading…"</span>
        <span class="kw">static let</span> retry    = <span class="st">"Try Again"</span>
    }

    <span class="kw">enum</span> <span class="ty">Auth</span> {
        <span class="kw">static let</span> signIn      = <span class="st">"Sign In"</span>
        <span class="kw">static let</span> signUp      = <span class="st">"Create Account"</span>
        <span class="kw">static let</span> signOut     = <span class="st">"Sign Out"</span>
        <span class="kw">static let</span> emailPH     = <span class="st">"Enter your email"</span>
        <span class="kw">static let</span> passwordPH  = <span class="st">"Enter your password"</span>
        <span class="kw">static let</span> forgotPwd   = <span class="st">"Forgot Password?"</span>
    }

    <span class="kw">enum</span> <span class="ty">Errors</span> {
        <span class="kw">static let</span> generic  = <span class="st">"Something went wrong."</span>
        <span class="kw">static let</span> network  = <span class="st">"No internet connection."</span>
        <span class="kw">static let</span> timeout  = <span class="st">"Request timed out."</span>
        <span class="kw">static let</span> notFound = <span class="st">"Content not found."</span>
    }

    <span class="kw">enum</span> <span class="ty">Tabs</span> {
        <span class="kw">static let</span> home     = <span class="st">"Home"</span>
        <span class="kw">static let</span> search   = <span class="st">"Search"</span>
        <span class="kw">static let</span> profile  = <span class="st">"Profile"</span>
        <span class="kw">static let</span> settings = <span class="st">"Settings"</span>
    }
}

<span class="cm">// Usage: Text(Strings.Auth.signIn)</span>`
  },
  {
    id: 23, category: "constants", icon: "🔤",
    title: "Font Constants",
    desc: "Centralised font scale — custom or system fonts, drop-in ready.",
    tags: ["Fonts", "AppFonts", "Typography"],
    preview: `<div class="ios-canvas" style="padding:14px;align-items:flex-start;gap:5px"><div style="font-size:22px;font-weight:800;color:#1c1c1e;letter-spacing:-0.5px">Large Title · 34pt</div><div style="font-size:17px;font-weight:600;color:#1c1c1e">Headline · 17pt</div><div style="font-size:15px;font-weight:400;color:#1c1c1e">Body · 17pt</div><div style="font-size:13px;font-weight:400;color:#8e8e93">Subheadline · 15pt</div><div style="font-size:11px;font-weight:400;color:#8e8e93">Caption · 12pt</div><div class="p-export-badge" style="margin-top:4px">⬇ Drop into Xcode project</div></div>`,
    code: `<span class="cm">// AppFonts.swift — add to your project</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">AppFonts</span> {
    <span class="cm">// ── System Scale ───────────────────────────</span>
    <span class="kw">static let</span> largeTitle  = <span class="ty">Font</span>.system(size: <span class="nu">34</span>, weight: .bold)
    <span class="kw">static let</span> title1      = <span class="ty">Font</span>.system(size: <span class="nu">28</span>, weight: .bold)
    <span class="kw">static let</span> title2      = <span class="ty">Font</span>.system(size: <span class="nu">22</span>, weight: .semibold)
    <span class="kw">static let</span> title3      = <span class="ty">Font</span>.system(size: <span class="nu">20</span>, weight: .semibold)
    <span class="kw">static let</span> headline    = <span class="ty">Font</span>.system(size: <span class="nu">17</span>, weight: .semibold)
    <span class="kw">static let</span> body        = <span class="ty">Font</span>.system(size: <span class="nu">17</span>, weight: .regular)
    <span class="kw">static let</span> callout     = <span class="ty">Font</span>.system(size: <span class="nu">16</span>, weight: .regular)
    <span class="kw">static let</span> subheadline = <span class="ty">Font</span>.system(size: <span class="nu">15</span>, weight: .regular)
    <span class="kw">static let</span> footnote    = <span class="ty">Font</span>.system(size: <span class="nu">13</span>, weight: .regular)
    <span class="kw">static let</span> caption1    = <span class="ty">Font</span>.system(size: <span class="nu">12</span>, weight: .regular)
    <span class="kw">static let</span> caption2    = <span class="ty">Font</span>.system(size: <span class="nu">11</span>, weight: .regular)

    <span class="cm">// ── Custom Font Helpers ────────────────────</span>
    <span class="kw">static func</span> <span class="fn">custom</span>(_ name: <span class="ty">String</span>, size: <span class="ty">CGFloat</span>) -> <span class="ty">Font</span> {
        .custom(name, size: size)
    }
    <span class="kw">static func</span> <span class="fn">customScaled</span>(_ name: <span class="ty">String</span>, size: <span class="ty">CGFloat</span>,
        relativeTo style: <span class="ty">Font</span>.<span class="ty">TextStyle</span> = .body) -> <span class="ty">Font</span> {
        .custom(name, size: size, relativeTo: style)
    }
}

<span class="cm">// Usage: Text("Hello").font(AppFonts.headline)</span>`
  },
  {
    id: 24, category: "constants", icon: "📐",
    title: "Size & Spacing Constants",
    desc: "8-pt spacing grid, corner radii, icon sizes — all in one file.",
    tags: ["Sizes", "Spacing", "AppSizes"],
    preview: `<div class="ios-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// 8-pt spacing grid</span></div><div class="p-const-line"><span class="p-const-kw">static let</span> xs  = <span class="p-const-val">4.0</span>&nbsp;&nbsp;<span class="p-const-comment">// 4pt</span></div><div class="p-const-line"><span class="p-const-kw">static let</span> sm  = <span class="p-const-val">8.0</span>&nbsp;&nbsp;<span class="p-const-comment">// 8pt</span></div><div class="p-const-line"><span class="p-const-kw">static let</span> md  = <span class="p-const-val">16.0</span>&nbsp;<span class="p-const-comment">// 16pt</span></div><div class="p-const-line"><span class="p-const-kw">static let</span> lg  = <span class="p-const-val">24.0</span>&nbsp;<span class="p-const-comment">// 24pt</span></div><div class="p-const-line"><span class="p-const-kw">static let</span> xl  = <span class="p-const-val">32.0</span>&nbsp;<span class="p-const-comment">// 32pt</span></div></div><div class="p-export-badge">⬇ Drop into Xcode project</div></div>`,
    code: `<span class="cm">// AppSizes.swift — add to your project</span>
<span class="kw">import</span> <span class="ty">SwiftUI</span>

<span class="kw">struct</span> <span class="ty">AppSizes</span> {

    <span class="cm">// ── Spacing (8-pt grid) ────────────────────</span>
    <span class="kw">struct</span> <span class="ty">Spacing</span> {
        <span class="kw">static let</span> xxs: <span class="ty">CGFloat</span> = <span class="nu">2</span>
        <span class="kw">static let</span> xs:  <span class="ty">CGFloat</span> = <span class="nu">4</span>
        <span class="kw">static let</span> sm:  <span class="ty">CGFloat</span> = <span class="nu">8</span>
        <span class="kw">static let</span> md:  <span class="ty">CGFloat</span> = <span class="nu">16</span>
        <span class="kw">static let</span> lg:  <span class="ty">CGFloat</span> = <span class="nu">24</span>
        <span class="kw">static let</span> xl:  <span class="ty">CGFloat</span> = <span class="nu">32</span>
        <span class="kw">static let</span> xxl: <span class="ty">CGFloat</span> = <span class="nu">48</span>
        <span class="kw">static let</span> huge:<span class="ty">CGFloat</span> = <span class="nu">64</span>
    }

    <span class="cm">// ── Corner Radii ───────────────────────────</span>
    <span class="kw">struct</span> <span class="ty">Radius</span> {
        <span class="kw">static let</span> xs:   <span class="ty">CGFloat</span> = <span class="nu">4</span>
        <span class="kw">static let</span> sm:   <span class="ty">CGFloat</span> = <span class="nu">8</span>
        <span class="kw">static let</span> md:   <span class="ty">CGFloat</span> = <span class="nu">12</span>
        <span class="kw">static let</span> lg:   <span class="ty">CGFloat</span> = <span class="nu">16</span>
        <span class="kw">static let</span> xl:   <span class="ty">CGFloat</span> = <span class="nu">20</span>
        <span class="kw">static let</span> full: <span class="ty">CGFloat</span> = <span class="nu">999</span>
    }

    <span class="cm">// ── Icon Sizes ─────────────────────────────</span>
    <span class="kw">struct</span> <span class="ty">Icon</span> {
        <span class="kw">static let</span> xs:  <span class="ty">CGFloat</span> = <span class="nu">12</span>
        <span class="kw">static let</span> sm:  <span class="ty">CGFloat</span> = <span class="nu">16</span>
        <span class="kw">static let</span> md:  <span class="ty">CGFloat</span> = <span class="nu">24</span>
        <span class="kw">static let</span> lg:  <span class="ty">CGFloat</span> = <span class="nu">32</span>
        <span class="kw">static let</span> xl:  <span class="ty">CGFloat</span> = <span class="nu">44</span>
        <span class="kw">static let</span> xxl: <span class="ty">CGFloat</span> = <span class="nu">56</span>
    }

    <span class="cm">// ── Component Heights ──────────────────────</span>
    <span class="kw">struct</span> <span class="ty">Height</span> {
        <span class="kw">static let</span> button:     <span class="ty">CGFloat</span> = <span class="nu">50</span>
        <span class="kw">static let</span> textField:  <span class="ty">CGFloat</span> = <span class="nu">48</span>
        <span class="kw">static let</span> listRow:    <span class="ty">CGFloat</span> = <span class="nu">44</span>
        <span class="kw">static let</span> tabBar:     <span class="ty">CGFloat</span> = <span class="nu">83</span>
        <span class="kw">static let</span> navBar:     <span class="ty">CGFloat</span> = <span class="nu">44</span>
        <span class="kw">static let</span> card:       <span class="ty">CGFloat</span> = <span class="nu">160</span>
        <span class="kw">static let</span> heroBanner: <span class="ty">CGFloat</span> = <span class="nu">220</span>
    }

    <span class="cm">// ── Shadow Presets ─────────────────────────</span>
    <span class="kw">struct</span> <span class="ty">Shadow</span> {
        <span class="kw">static let</span> sm = (radius: <span class="ty">CGFloat</span>(<span class="nu">4</span>),  y: <span class="ty">CGFloat</span>(<span class="nu">2</span>), opacity: <span class="ty">Float</span>(<span class="nu">0.08</span>))
        <span class="kw">static let</span> md = (radius: <span class="ty">CGFloat</span>(<span class="nu">12</span>), y: <span class="ty">CGFloat</span>(<span class="nu">4</span>), opacity: <span class="ty">Float</span>(<span class="nu">0.12</span>))
        <span class="kw">static let</span> lg = (radius: <span class="ty">CGFloat</span>(<span class="nu">24</span>), y: <span class="ty">CGFloat</span>(<span class="nu">8</span>), opacity: <span class="ty">Float</span>(<span class="nu">0.16</span>))
    }
}

<span class="cm">// Usage</span>
<span class="cm">// .padding(AppSizes.Spacing.md)</span>
<span class="cm">// .cornerRadius(AppSizes.Radius.lg)</span>`
  },
  {
    id: 25, category: "constants", icon: "⚙️",
    title: "App Constants",
    desc: "API config, feature flags, environment switching — one central file.",
    tags: ["Config", "FeatureFlags", "Environment"],
    preview: `<div class="ios-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppConstants.swift</span></div><div class="p-const-line"><span class="p-const-kw">enum</span> Env { <span class="p-const-kw">case</span> dev, staging, prod }</div><div class="p-const-line" style="margin-top:4px"><span class="p-const-kw">enum</span> Feature {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">static let</span> darkMode = <span class="p-const-val">true</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">static let</span> analytics = <span class="p-const-val">false</span></div><div class="p-const-line">}</div></div><div class="p-export-badge">⬇ Drop into Xcode project</div></div>`,
    code: `<span class="cm">// AppConstants.swift — add to your project</span>
<span class="kw">import</span> <span class="ty">Foundation</span>

<span class="kw">enum</span> <span class="ty">AppEnvironment</span> {
    <span class="kw">case</span> development, staging, production

    <span class="kw">static var</span> current: <span class="ty">AppEnvironment</span> {
<span class="cm">#if DEBUG</span>
        <span class="kw">return</span> .development
<span class="cm">#elseif STAGING</span>
        <span class="kw">return</span> .staging
<span class="cm">#else</span>
        <span class="kw">return</span> .production
<span class="cm">#endif</span>
    }
}

<span class="kw">enum</span> <span class="ty">API</span> {
    <span class="kw">static let</span> baseURL: <span class="ty">String</span> = {
        <span class="kw">switch</span> <span class="ty">AppEnvironment</span>.current {
        <span class="kw">case</span> .development: <span class="kw">return</span> <span class="st">"https://dev-api.example.com"</span>
        <span class="kw">case</span> .staging:     <span class="kw">return</span> <span class="st">"https://staging-api.example.com"</span>
        <span class="kw">case</span> .production:  <span class="kw">return</span> <span class="st">"https://api.example.com"</span>
        }
    }()
    <span class="kw">static let</span> timeout: <span class="ty">TimeInterval</span> = <span class="nu">30</span>
    <span class="kw">static let</span> version = <span class="st">"v1"</span>
}

<span class="kw">enum</span> <span class="ty">Feature</span> {
    <span class="kw">static let</span> darkModeEnabled   = <span class="kw">true</span>
    <span class="kw">static let</span> analyticsEnabled  = <span class="ty">AppEnvironment</span>.current == .production
    <span class="kw">static let</span> biometricLogin    = <span class="kw">true</span>
    <span class="kw">static let</span> pushNotifications = <span class="kw">true</span>
    <span class="kw">static let</span> onboardingV2      = <span class="kw">false</span>
}

<span class="kw">enum</span> <span class="ty">AppInfo</span> {
    <span class="kw">static let</span> name     = <span class="ty">Bundle</span>.main.infoDictionary?[<span class="st">"CFBundleName"</span>] <span class="kw">as</span>? <span class="ty">String</span> ?? <span class="st">"App"</span>
    <span class="kw">static let</span> version  = <span class="ty">Bundle</span>.main.infoDictionary?[<span class="st">"CFBundleShortVersionString"</span>] <span class="kw">as</span>? <span class="ty">String</span> ?? <span class="st">"1.0"</span>
    <span class="kw">static let</span> build    = <span class="ty">Bundle</span>.main.infoDictionary?[<span class="st">"CFBundleVersion"</span>] <span class="kw">as</span>? <span class="ty">String</span> ?? <span class="st">"1"</span>
    <span class="kw">static let</span> bundleID = <span class="ty">Bundle</span>.main.bundleIdentifier ?? <span class="st">""</span>
}

<span class="kw">enum</span> <span class="ty">UserDefaultsKey</span> {
    <span class="kw">static let</span> hasSeenOnboarding = <span class="st">"hasSeenOnboarding"</span>
    <span class="kw">static let</span> selectedTheme     = <span class="st">"selectedTheme"</span>
    <span class="kw">static let</span> lastSyncDate      = <span class="st">"lastSyncDate"</span>
    <span class="kw">static let</span> authToken         = <span class="st">"authToken"</span>
}

<span class="cm">// Usage: API.baseURL  |  Feature.analyticsEnabled</span>`
  }
];
