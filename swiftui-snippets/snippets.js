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
  },

  // ── CONTROLS (continued) ─────────────────────────────────────────────
  {
    id: 26, category: "controls", icon: "⚠️",
    title: "Custom Alert Dialog",
    desc: "Fully custom alert popup with dimmed backdrop, icon, message, and destructive action.",
    tags: ["Alert", "Popup", "Dialog", "Modal"],
    preview: `<div class="ios-canvas" style="padding:0;position:relative;min-height:180px;background:#f2f2f7;border-radius:8px;overflow:hidden"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.32);display:flex;align-items:center;justify-content:center"><div style="background:#fff;border-radius:14px;width:80%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.22)"><div style="padding:20px 16px 16px;text-align:center"><div style="font-size:26px;margin-bottom:8px">⚠️</div><div style="font-size:15px;font-weight:700;color:#1c1c1e;margin-bottom:6px">Delete Item?</div><div style="font-size:12px;color:#8e8e93;line-height:1.5">This action cannot be undone and the item will be permanently removed.</div></div><div style="display:flex;border-top:1px solid #e5e5ea"><div style="flex:1;padding:12px;font-size:14px;color:#007aff;text-align:center">Cancel</div><div style="flex:1;padding:12px;font-size:14px;font-weight:700;color:#ff3b30;text-align:center;border-left:1px solid #e5e5ea">Delete</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">CustomAlertView</span>: <span class="ty">View</span> {
    <span class="pa">@Binding</span> <span class="kw">var</span> isPresented: <span class="ty">Bool</span>
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> message: <span class="ty">String</span>
    <span class="kw">var</span> onConfirm: () -> <span class="ty">Void</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span> {
            <span class="ty">Color</span>.black.opacity(<span class="nu">0.4</span>)
                .ignoresSafeArea()
                .onTapGesture { isPresented = <span class="kw">false</span> }

            <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
                <span class="ty">VStack</span>(spacing: <span class="nu">8</span>) {
                    <span class="ty">Image</span>(systemName: <span class="st">"exclamationmark.triangle.fill"</span>)
                        .font(.system(size: <span class="nu">28</span>))
                        .foregroundColor(.orange)
                    <span class="ty">Text</span>(title)
                        .font(.headline)
                        .multilineTextAlignment(.center)
                    <span class="ty">Text</span>(message)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.horizontal, <span class="nu">20</span>)
                .padding(.top, <span class="nu">24</span>).padding(.bottom, <span class="nu">20</span>)

                <span class="ty">Divider</span>()

                <span class="ty">HStack</span>(spacing: <span class="nu">0</span>) {
                    <span class="ty">Button</span>(<span class="st">"Cancel"</span>) { isPresented = <span class="kw">false</span> }
                        .frame(maxWidth: .infinity).padding(.vertical, <span class="nu">12</span>)
                        .foregroundColor(.primary)

                    <span class="ty">Divider</span>().frame(height: <span class="nu">44</span>)

                    <span class="ty">Button</span>(<span class="st">"Delete"</span>) { onConfirm(); isPresented = <span class="kw">false</span> }
                        .frame(maxWidth: .infinity).padding(.vertical, <span class="nu">12</span>)
                        .foregroundColor(.red).fontWeight(.semibold)
                }
            }
            .background(.regularMaterial)
            .cornerRadius(<span class="nu">14</span>)
            .frame(maxWidth: <span class="nu">270</span>)
            .shadow(radius: <span class="nu">20</span>)
        }
    }
}

<span class="cm">// Usage</span>
<span class="pa">@State</span> <span class="kw">private var</span> showAlert = <span class="kw">false</span>

<span class="ty">Button</span>(<span class="st">"Delete"</span>) { showAlert = <span class="kw">true</span> }
.fullScreenCover(isPresented: $showAlert) {
    <span class="ty">CustomAlertView</span>(
        isPresented: $showAlert,
        title: <span class="st">"Delete Item?"</span>,
        message: <span class="st">"This action cannot be undone."</span>
    ) { <span class="fn">deleteItem</span>() }
}`
  },
  {
    id: 27, category: "controls", icon: "💬",
    title: "Toast Notification",
    desc: "Slide-up toast banner with success / error / warning styles and auto-dismiss.",
    tags: ["Toast", "Snackbar", "Notification", "ViewModifier"],
    preview: `<div class="ios-canvas" style="align-items:flex-end;padding-bottom:12px;min-height:160px;position:relative;background:#f2f2f7"><div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);width:80%;background:#f2f2f7;border-radius:8px;height:90px;display:flex;align-items:center;justify-content:center;color:#8e8e93;font-size:12px;">Your content</div><div style="background:#1c1c1e;color:#fff;border-radius:100px;padding:10px 16px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 24px rgba(0,0,0,0.28);width:auto;white-space:nowrap"><span style="color:#34c759;font-size:15px">✓</span><span style="font-size:13px;font-weight:500">Changes saved successfully!</span></div></div>`,
    code: `<span class="kw">enum</span> <span class="ty">ToastStyle</span> {
    <span class="kw">case</span> success, error, warning, info
    <span class="kw">var</span> color: <span class="ty">Color</span> {
        <span class="kw">switch self</span> {
        <span class="kw">case</span> .success: <span class="kw">return</span> .green
        <span class="kw">case</span> .error:   <span class="kw">return</span> .red
        <span class="kw">case</span> .warning: <span class="kw">return</span> .orange
        <span class="kw">case</span> .info:    <span class="kw">return</span> .blue
        }
    }
    <span class="kw">var</span> icon: <span class="ty">String</span> {
        <span class="kw">switch self</span> {
        <span class="kw">case</span> .success: <span class="kw">return</span> <span class="st">"checkmark.circle.fill"</span>
        <span class="kw">case</span> .error:   <span class="kw">return</span> <span class="st">"xmark.circle.fill"</span>
        <span class="kw">case</span> .warning: <span class="kw">return</span> <span class="st">"exclamationmark.triangle.fill"</span>
        <span class="kw">case</span> .info:    <span class="kw">return</span> <span class="st">"info.circle.fill"</span>
        }
    }
}

<span class="kw">struct</span> <span class="ty">ToastModifier</span>: <span class="ty">ViewModifier</span> {
    <span class="pa">@Binding</span> <span class="kw">var</span> isShowing: <span class="ty">Bool</span>
    <span class="kw">let</span> message: <span class="ty">String</span>
    <span class="kw">let</span> style: <span class="ty">ToastStyle</span>

    <span class="kw">func</span> <span class="fn">body</span>(content: <span class="ty">Content</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        content.overlay(alignment: .bottom) {
            <span class="kw">if</span> isShowing {
                <span class="ty">HStack</span>(spacing: <span class="nu">10</span>) {
                    <span class="ty">Image</span>(systemName: style.icon).foregroundColor(style.color)
                    <span class="ty">Text</span>(message).font(.subheadline).fontWeight(.medium)
                }
                .padding(.horizontal, <span class="nu">20</span>).padding(.vertical, <span class="nu">12</span>)
                .background(.regularMaterial)
                .cornerRadius(<span class="nu">100</span>)
                .shadow(radius: <span class="nu">10</span>)
                .padding(.bottom, <span class="nu">40</span>)
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .task {
                    <span class="kw">try</span>? <span class="kw">await</span> <span class="ty">Task</span>.sleep(for: .seconds(<span class="nu">2.5</span>))
                    withAnimation { isShowing = <span class="kw">false</span> }
                }
            }
        }
        .animation(.spring(response: <span class="nu">0.4</span>, dampingFraction: <span class="nu">0.75</span>), value: isShowing)
    }
}

<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">toast</span>(isShowing: <span class="ty">Binding</span>&lt;<span class="ty">Bool</span>&gt;, message: <span class="ty">String</span>, style: <span class="ty">ToastStyle</span> = .success) -> <span class="kw">some</span> <span class="ty">View</span> {
        modifier(<span class="ty">ToastModifier</span>(isShowing: isShowing, message: message, style: style))
    }
}

<span class="cm">// Usage</span>
<span class="ty">ContentView</span>()
    .toast(isShowing: $showToast, message: <span class="st">"Saved!"</span>, style: .success)`
  },
  {
    id: 28, category: "controls", icon: "🔢",
    title: "OTP / PIN Input",
    desc: "Six-digit one-time-password field with blinking cursor and auto-focus.",
    tags: ["OTP", "PIN", "Input", "Authentication"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;gap:12px"><div style="font-size:13px;font-weight:600;color:#1c1c1e">Enter verification code</div><div style="display:flex;gap:8px;justify-content:center"><div style="width:42px;height:50px;border-radius:10px;border:2px solid #007aff;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#1c1c1e">4</div><div style="width:42px;height:50px;border-radius:10px;border:2px solid #007aff;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#1c1c1e">8</div><div style="width:42px;height:50px;border-radius:10px;border:2px solid #007aff;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#1c1c1e">3</div><div style="width:42px;height:50px;border-radius:10px;border:2px solid #007aff;background:#fff;display:flex;align-items:center;justify-content:center"><div style="width:2px;height:24px;background:#007aff;border-radius:1px"></div></div><div style="width:42px;height:50px;border-radius:10px;border:2px solid #e5e5ea;background:#fff"></div><div style="width:42px;height:50px;border-radius:10px;border:2px solid #e5e5ea;background:#fff"></div></div><div style="font-size:11px;color:#8e8e93">Resend code in 0:42</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">OTPInputView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> digitCount: <span class="ty">Int</span> = <span class="nu">6</span>
    <span class="pa">@Binding</span> <span class="kw">var</span> otp: <span class="ty">String</span>
    <span class="pa">@FocusState</span> <span class="kw">private var</span> isFocused: <span class="ty">Bool</span>

    <span class="kw">private var</span> digits: [<span class="ty">String</span>] {
        <span class="kw">var</span> r = <span class="ty">Array</span>(otp.prefix(digitCount)).map(<span class="ty">String</span>.init)
        <span class="kw">while</span> r.count &lt; digitCount { r.append(<span class="st">""</span>) }
        <span class="kw">return</span> r
    }

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span> {
            <span class="ty">TextField</span>(<span class="st">""</span>, text: $otp)
                .keyboardType(.numberPad)
                .textContentType(.oneTimeCode)
                .focused($isFocused)
                .opacity(<span class="nu">0</span>).frame(width: <span class="nu">0</span>, height: <span class="nu">0</span>)

            <span class="ty">HStack</span>(spacing: <span class="nu">12</span>) {
                <span class="ty">ForEach</span>(<span class="nu">0</span>..&lt;digitCount, id: \.<span class="kw">self</span>) { index <span class="kw">in</span>
                    <span class="ty">ZStack</span> {
                        <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>)
                            .stroke(index &lt; otp.count ? <span class="ty">Color</span>.blue : <span class="ty">Color</span>(.systemGray4), lineWidth: <span class="nu">2</span>)
                            .background(
                                <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">12</span>)
                                    .fill(<span class="ty">Color</span>(.systemBackground))
                            )

                        <span class="kw">if</span> !digits[index].isEmpty {
                            <span class="ty">Text</span>(digits[index])
                                .font(.title).fontWeight(.semibold)
                        } <span class="kw">else if</span> index == otp.count {
                            <span class="ty">Rectangle</span>()
                                .frame(width: <span class="nu">2</span>, height: <span class="nu">24</span>)
                                .foregroundColor(.blue)
                                .opacity(isFocused ? <span class="nu">1</span> : <span class="nu">0</span>)
                                .animation(.easeInOut(duration: <span class="nu">0.6</span>).repeatForever(), value: isFocused)
                        }
                    }
                    .frame(width: <span class="nu">48</span>, height: <span class="nu">56</span>)
                    .onTapGesture { isFocused = <span class="kw">true</span> }
                }
            }
        }
        .onAppear { isFocused = <span class="kw">true</span> }
        .onChange(of: otp) { _, new <span class="kw">in</span>
            otp = <span class="ty">String</span>(new.filter(\.isNumber).prefix(digitCount))
        }
    }
}`
  },
  {
    id: 29, category: "controls", icon: "👆",
    title: "Context Menu",
    desc: "Long-press context menu with share, copy, favorite, and destructive delete actions plus rich preview.",
    tags: ["ContextMenu", "LongPress", "Menu", "Gesture"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;padding:10px"><div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5ea;width:100%"><div style="padding:12px 14px;font-size:13px;color:#1c1c1e;font-weight:500;border-bottom:1px solid #f2f2f7">Design System Tokens</div><div style="padding:12px 14px;display:flex;flex-direction:column;gap:2px"><div style="font-size:12px;color:#8e8e93;margin-bottom:6px;font-weight:500">Long press for options:</div><div style="display:flex;gap:8px;flex-wrap:wrap"><div style="display:flex;align-items:center;gap:5px;background:#f2f2f7;padding:6px 10px;border-radius:8px;font-size:12px;color:#007aff"><span>↗</span> Share</div><div style="display:flex;align-items:center;gap:5px;background:#f2f2f7;padding:6px 10px;border-radius:8px;font-size:12px;color:#1c1c1e"><span>📋</span> Copy</div><div style="display:flex;align-items:center;gap:5px;background:#f2f2f7;padding:6px 10px;border-radius:8px;font-size:12px;color:#ff2d55"><span>🗑</span> Delete</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ContextMenuRow</span>: <span class="ty">View</span> {
    <span class="kw">let</span> item: <span class="ty">Item</span>
    <span class="kw">var</span> onDelete: () -> <span class="ty">Void</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ItemRow</span>(item: item)
            .contextMenu {
                <span class="ty">Button</span> {
                    <span class="fn">shareItem</span>(item)
                } label: {
                    <span class="ty">Label</span>(<span class="st">"Share"</span>, systemImage: <span class="st">"square.and.arrow.up"</span>)
                }
                <span class="ty">Button</span> {
                    <span class="ty">UIPasteboard</span>.general.string = item.title
                } label: {
                    <span class="ty">Label</span>(<span class="st">"Copy"</span>, systemImage: <span class="st">"doc.on.doc"</span>)
                }
                <span class="ty">Button</span> {
                    <span class="fn">toggleFavorite</span>(item)
                } label: {
                    <span class="ty">Label</span>(item.isFavorite ? <span class="st">"Unfavorite"</span> : <span class="st">"Favorite"</span>,
                          systemImage: item.isFavorite ? <span class="st">"heart.slash"</span> : <span class="st">"heart"</span>)
                }
                <span class="ty">Divider</span>()
                <span class="ty">Button</span>(role: .destructive, action: onDelete) {
                    <span class="ty">Label</span>(<span class="st">"Delete"</span>, systemImage: <span class="st">"trash"</span>)
                }
            } preview: {
                <span class="ty">ItemDetailPreview</span>(item: item)
                    .frame(width: <span class="nu">300</span>, height: <span class="nu">200</span>)
            }
    }
}`
  },
  {
    id: 30, category: "controls", icon: "↔️",
    title: "Swipe Actions",
    desc: "Leading and trailing swipe actions on List rows with full-swipe support.",
    tags: ["SwipeActions", "List", "Delete", "Gesture"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;padding:10px"><div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5ea;width:100%"><div style="display:flex;align-items:center;overflow:hidden;border-bottom:1px solid #f2f2f7"><div style="background:#34c759;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;flex-shrink:0">♥</div><div style="flex:1;padding:12px 14px;font-size:13px;color:#1c1c1e">Design System</div><div style="background:#ff9500;width:54px;height:44px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:600;flex-shrink:0">Archive</div><div style="background:#ff3b30;width:54px;height:44px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:600;flex-shrink:0">Delete</div></div><div style="padding:12px 14px;font-size:13px;color:#1c1c1e;border-bottom:1px solid #f2f2f7">Component Tokens</div><div style="padding:12px 14px;font-size:13px;color:#1c1c1e">Dark Mode Guide</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SwipeActionsView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> items = [<span class="st">"Design System"</span>, <span class="st">"Component Tokens"</span>, <span class="st">"Dark Mode"</span>]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">List</span> {
            <span class="ty">ForEach</span>(items, id: \.<span class="kw">self</span>) { item <span class="kw">in</span>
                <span class="ty">Text</span>(item)
                    .swipeActions(edge: .trailing, allowsFullSwipe: <span class="kw">true</span>) {
                        <span class="ty">Button</span>(role: .destructive) {
                            items.removeAll { $0 == item }
                        } label: {
                            <span class="ty">Label</span>(<span class="st">"Delete"</span>, systemImage: <span class="st">"trash"</span>)
                        }
                        <span class="ty">Button</span> {
                            <span class="fn">archiveItem</span>(item)
                        } label: {
                            <span class="ty">Label</span>(<span class="st">"Archive"</span>, systemImage: <span class="st">"archivebox"</span>)
                        }
                        .tint(.orange)
                    }
                    .swipeActions(edge: .leading) {
                        <span class="ty">Button</span> {
                            <span class="fn">toggleFavorite</span>(item)
                        } label: {
                            <span class="ty">Label</span>(<span class="st">"Favorite"</span>, systemImage: <span class="st">"heart.fill"</span>)
                        }
                        .tint(.pink)
                    }
            }
        }
    }
}`
  },
  {
    id: 31, category: "controls", icon: "🔄",
    title: "Pull to Refresh",
    desc: "Refreshable list with async data loading and loading overlay.",
    tags: ["Refreshable", "PullToRefresh", "Async", "List"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;padding:10px"><div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5ea;width:100%"><div style="background:rgba(249,249,249,0.94);border-bottom:1px solid #e5e5ea;padding:10px 14px;display:flex;align-items:center;justify-content:space-between"><div style="font-size:15px;font-weight:700;color:#1c1c1e">Feed</div><div style="width:20px;height:20px;border-radius:50%;border:2px solid transparent;border-top-color:#007aff;border-right-color:#5856d6;animation:spin 0.9s linear infinite"></div></div><div style="padding:12px 14px;font-size:13px;color:#1c1c1e;border-bottom:1px solid #f2f2f7;display:flex;align-items:center;gap:8px"><span style="color:#007aff">📄</span>New Post</div><div style="padding:12px 14px;font-size:13px;color:#1c1c1e;border-bottom:1px solid #f2f2f7;display:flex;align-items:center;gap:8px"><span style="color:#007aff">📄</span>Post #1</div><div style="padding:12px 14px;font-size:13px;color:#1c1c1e;display:flex;align-items:center;gap:8px"><span style="color:#007aff">📄</span>Post #2</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">RefreshableListView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> items: [<span class="ty">String</span>] = [<span class="st">"Post #1"</span>, <span class="st">"Post #2"</span>, <span class="st">"Post #3"</span>]
    <span class="pa">@State</span> <span class="kw">private var</span> isLoading = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationStack</span> {
            <span class="ty">List</span>(items, id: \.<span class="kw">self</span>) { item <span class="kw">in</span>
                <span class="ty">HStack</span> {
                    <span class="ty">Image</span>(systemName: <span class="st">"doc.text.fill"</span>)
                        .foregroundColor(.blue)
                    <span class="ty">Text</span>(item)
                }
                .padding(.vertical, <span class="nu">4</span>)
            }
            .refreshable { <span class="kw">await</span> <span class="fn">loadData</span>() }
            .navigationTitle(<span class="st">"Feed"</span>)
            .overlay {
                <span class="kw">if</span> isLoading { <span class="ty">ProgressView</span>().tint(.blue) }
            }
        }
    }

    <span class="kw">func</span> <span class="fn">loadData</span>() <span class="kw">async</span> {
        isLoading = <span class="kw">true</span>
        <span class="kw">try</span>? <span class="kw">await</span> <span class="ty">Task</span>.sleep(for: .seconds(<span class="nu">1.5</span>))
        items = [<span class="st">"New Post"</span>, <span class="st">"Post #1"</span>, <span class="st">"Post #2"</span>]
        isLoading = <span class="kw">false</span>
    }
}`
  },
  {
    id: 32, category: "controls", icon: "⊕",
    title: "Floating Action Button",
    desc: "Expandable FAB with sub-action buttons and spring animation.",
    tags: ["FAB", "FloatingButton", "Animation", "ZStack"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;position:relative;min-height:170px;padding:0;border-radius:8px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#c7c7cc;font-size:13px">Content area</div><div style="position:absolute;bottom:14px;right:14px;display:flex;flex-direction:column;align-items:flex-end;gap:8px"><div style="display:flex;align-items:center;gap:8px"><div style="font-size:11px;font-weight:600;background:rgba(0,0,0,0.6);color:#fff;padding:4px 8px;border-radius:6px">Photo</div><div style="width:36px;height:36px;border-radius:18px;background:#a855f7;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;box-shadow:0 2px 8px rgba(168,85,247,0.4)">📷</div></div><div style="display:flex;align-items:center;gap:8px"><div style="font-size:11px;font-weight:600;background:rgba(0,0,0,0.6);color:#fff;padding:4px 8px;border-radius:6px">Document</div><div style="width:36px;height:36px;border-radius:18px;background:#f97316;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;box-shadow:0 2px 8px rgba(249,115,22,0.4)">📄</div></div><div style="width:52px;height:52px;border-radius:26px;background:#007aff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;box-shadow:0 4px 16px rgba(0,122,255,0.45)">✕</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">FABView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> isExpanded = <span class="kw">false</span>

    <span class="kw">let</span> actions: [(icon: <span class="ty">String</span>, label: <span class="ty">String</span>, color: <span class="ty">Color</span>)] = [
        (<span class="st">"camera.fill"</span>,   <span class="st">"Photo"</span>,    .purple),
        (<span class="st">"doc.fill"</span>,      <span class="st">"Document"</span>, .orange),
        (<span class="st">"link"</span>,          <span class="st">"Link"</span>,     .blue)
    ]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span>(alignment: .bottomTrailing) {
            <span class="ty">Color</span>(.systemGroupedBackground).ignoresSafeArea()

            <span class="ty">VStack</span>(alignment: .trailing, spacing: <span class="nu">12</span>) {
                <span class="kw">if</span> isExpanded {
                    <span class="ty">ForEach</span>(actions, id: \.icon) { action <span class="kw">in</span>
                        <span class="ty">HStack</span> {
                            <span class="ty">Text</span>(action.label)
                                .font(.subheadline).fontWeight(.medium)
                                .padding(.horizontal, <span class="nu">12</span>).padding(.vertical, <span class="nu">6</span>)
                                .background(.regularMaterial).cornerRadius(<span class="nu">8</span>)
                            <span class="ty">Button</span> {} label: {
                                <span class="ty">Image</span>(systemName: action.icon)
                                    .frame(width: <span class="nu">44</span>, height: <span class="nu">44</span>)
                                    .background(action.color)
                                    .foregroundColor(.white)
                                    .clipShape(<span class="ty">Circle</span>())
                            }
                        }
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                    }
                }

                <span class="ty">Button</span> {
                    withAnimation(.spring(response: <span class="nu">0.4</span>, dampingFraction: <span class="nu">0.7</span>)) {
                        isExpanded.toggle()
                    }
                } label: {
                    <span class="ty">Image</span>(systemName: isExpanded ? <span class="st">"xmark"</span> : <span class="st">"plus"</span>)
                        .font(.title2).fontWeight(.semibold)
                        .foregroundColor(.white)
                        .frame(width: <span class="nu">60</span>, height: <span class="nu">60</span>)
                        .background(<span class="ty">Color</span>.blue)
                        .clipShape(<span class="ty">Circle</span>())
                        .shadow(radius: <span class="nu">8</span>)
                        .rotationEffect(.degrees(isExpanded ? <span class="nu">45</span> : <span class="nu">0</span>))
                }
            }
            .padding(<span class="nu">24</span>)
        }
    }
}`
  },
  {
    id: 33, category: "controls", icon: "🏷",
    title: "Chip / Tag Selector",
    desc: "Horizontally scrollable multi-select chip picker with spring animation.",
    tags: ["Chip", "Tag", "MultiSelect", "Filter"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;align-items:flex-start;gap:12px"><div style="font-size:13px;font-weight:600;color:#1c1c1e">Filter by category</div><div style="display:flex;gap:8px;flex-wrap:wrap"><div style="padding:7px 14px;border-radius:20px;background:#007aff;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:10px">✓</span> Design</div><div style="padding:7px 14px;border-radius:20px;background:#f2f2f7;border:1.5px solid #e5e5ea;color:#3c3c43;font-size:12px;font-weight:600">Swift</div><div style="padding:7px 14px;border-radius:20px;background:#007aff;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:10px">✓</span> iOS</div><div style="padding:7px 14px;border-radius:20px;background:#f2f2f7;border:1.5px solid #e5e5ea;color:#3c3c43;font-size:12px;font-weight:600">macOS</div><div style="padding:7px 14px;border-radius:20px;background:#f2f2f7;border:1.5px solid #e5e5ea;color:#3c3c43;font-size:12px;font-weight:600">UIKit</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ChipSelectorView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> options: [<span class="ty">String</span>]
    <span class="pa">@Binding</span> <span class="kw">var</span> selected: <span class="ty">Set</span>&lt;<span class="ty">String</span>&gt;

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ScrollView</span>(.horizontal, showsIndicators: <span class="kw">false</span>) {
            <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {
                <span class="ty">ForEach</span>(options, id: \.<span class="kw">self</span>) { option <span class="kw">in</span>
                    <span class="ty">ChipView</span>(label: option, isSelected: selected.contains(option)) {
                        withAnimation(.spring(response: <span class="nu">0.3</span>, dampingFraction: <span class="nu">0.7</span>)) {
                            <span class="kw">if</span> selected.contains(option) { selected.remove(option) }
                            <span class="kw">else</span> { selected.insert(option) }
                        }
                    }
                }
            }
            .padding(.horizontal, <span class="nu">16</span>)
        }
    }
}

<span class="kw">struct</span> <span class="ty">ChipView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> label: <span class="ty">String</span>
    <span class="kw">let</span> isSelected: <span class="ty">Bool</span>
    <span class="kw">let</span> onTap: () -> <span class="ty">Void</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Button</span>(action: onTap) {
            <span class="ty">HStack</span>(spacing: <span class="nu">6</span>) {
                <span class="kw">if</span> isSelected {
                    <span class="ty">Image</span>(systemName: <span class="st">"checkmark"</span>).font(.caption).fontWeight(.bold)
                }
                <span class="ty">Text</span>(label).font(.subheadline).fontWeight(.medium)
            }
            .padding(.horizontal, <span class="nu">14</span>).padding(.vertical, <span class="nu">8</span>)
            .background(isSelected ? <span class="ty">Color</span>.blue : <span class="ty">Color</span>(.systemGray6))
            .foregroundColor(isSelected ? .white : .primary)
            .cornerRadius(<span class="nu">20</span>)
        }
        .buttonStyle(.plain)
    }
}`
  },

  // ── LAYOUT (continued) ────────────────────────────────────────────────
  {
    id: 34, category: "layout", icon: "👤",
    title: "Profile Header",
    desc: "Cover photo, circular avatar, name, bio, follower stats, and follow button.",
    tags: ["Profile", "Avatar", "Header", "Social"],
    preview: `<div class="ios-canvas" style="padding:0;background:#f2f2f7"><div style="width:100%;background:#fff;border-radius:10px;overflow:hidden"><div style="height:72px;background:linear-gradient(135deg,#007aff,#5856d6);position:relative"><div style="width:52px;height:52px;border-radius:26px;background:linear-gradient(135deg,#ff9500,#ff3b30);border:3px solid #fff;position:absolute;bottom:-26px;left:14px;display:flex;align-items:center;justify-content:center;font-size:22px">👤</div><div style="position:absolute;right:12px;bottom:-18px;background:#007aff;color:#fff;font-size:11px;font-weight:600;padding:5px 14px;border-radius:20px">Follow</div></div><div style="padding:36px 14px 14px"><div style="font-size:15px;font-weight:700;color:#1c1c1e">Sarah Johnson</div><div style="font-size:12px;color:#8e8e93;margin-bottom:10px">@sarahj · iOS Developer</div><div style="display:flex;gap:20px"><div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#1c1c1e">248</div><div style="font-size:10px;color:#8e8e93">Posts</div></div><div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#1c1c1e">12.4k</div><div style="font-size:10px;color:#8e8e93">Followers</div></div><div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#1c1c1e">891</div><div style="font-size:10px;color:#8e8e93">Following</div></div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ProfileHeaderView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> name: <span class="ty">String</span>
    <span class="kw">let</span> username: <span class="ty">String</span>
    <span class="kw">let</span> avatarURL: <span class="ty">URL</span>?
    <span class="kw">let</span> stats: [(value: <span class="ty">String</span>, label: <span class="ty">String</span>)]
    <span class="kw">var</span> onFollow: () -> <span class="ty">Void</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
            <span class="ty">ZStack</span>(alignment: .bottomLeading) {
                <span class="ty">LinearGradient</span>(
                    colors: [.blue, .purple],
                    startPoint: .topLeading, endPoint: .bottomTrailing
                )
                .frame(height: <span class="nu">120</span>)

                <span class="ty">AsyncImage</span>(url: avatarURL) { img <span class="kw">in</span>
                    img.resizable().scaledToFill()
                } placeholder: {
                    <span class="ty">Image</span>(systemName: <span class="st">"person.fill"</span>).font(.system(size: <span class="nu">36</span>))
                }
                .frame(width: <span class="nu">80</span>, height: <span class="nu">80</span>)
                .background(<span class="ty">Color</span>(.systemBackground))
                .clipShape(<span class="ty">Circle</span>())
                .overlay(<span class="ty">Circle</span>().stroke(<span class="ty">Color</span>(.systemBackground), lineWidth: <span class="nu">3</span>))
                .offset(x: <span class="nu">16</span>, y: <span class="nu">40</span>)
            }

            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">12</span>) {
                <span class="ty">HStack</span> {
                    <span class="ty">Spacer</span>()
                    <span class="ty">Button</span>(<span class="st">"Follow"</span>, action: onFollow)
                        .buttonStyle(.borderedProminent).controlSize(.small)
                }
                .padding(.bottom, <span class="nu">32</span>)

                <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">4</span>) {
                    <span class="ty">Text</span>(name).font(.title2).fontWeight(.bold)
                    <span class="ty">Text</span>(<span class="st">"@\(username)"</span>).font(.subheadline).foregroundColor(.secondary)
                }

                <span class="ty">HStack</span>(spacing: <span class="nu">24</span>) {
                    <span class="ty">ForEach</span>(stats, id: \.label) { stat <span class="kw">in</span>
                        <span class="ty">VStack</span>(spacing: <span class="nu">2</span>) {
                            <span class="ty">Text</span>(stat.value).font(.headline).fontWeight(.bold)
                            <span class="ty">Text</span>(stat.label).font(.caption).foregroundColor(.secondary)
                        }
                    }
                }
            }
            .padding(.horizontal, <span class="nu">16</span>).padding(.bottom, <span class="nu">16</span>)
        }
        .background(<span class="ty">Color</span>(.systemBackground))
    }
}`
  },
  {
    id: 35, category: "layout", icon: "📊",
    title: "Stat Card",
    desc: "Metric card with icon, value, label, and positive/negative change indicator.",
    tags: ["Stats", "Metrics", "Card", "Dashboard"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;gap:8px"><div style="background:#fff;border-radius:14px;padding:14px 16px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.06)"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div style="width:32px;height:32px;border-radius:8px;background:rgba(0,122,255,0.12);display:flex;align-items:center;justify-content:center;font-size:14px">👥</div><div style="font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;background:rgba(52,199,89,0.12);color:#1a9c41;display:flex;align-items:center;gap:3px">↑ +12.4%</div></div><div style="font-size:26px;font-weight:800;color:#1c1c1e;letter-spacing:-0.5px">24,891</div><div style="font-size:12px;color:#8e8e93;margin-top:2px">Total Users</div></div><div style="background:#fff;border-radius:14px;padding:14px 16px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.06)"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div style="width:32px;height:32px;border-radius:8px;background:rgba(255,59,48,0.12);display:flex;align-items:center;justify-content:center;font-size:14px">📉</div><div style="font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;background:rgba(255,59,48,0.12);color:#d73026;display:flex;align-items:center;gap:3px">↓ -3.1%</div></div><div style="font-size:26px;font-weight:800;color:#1c1c1e;letter-spacing:-0.5px">$8,240</div><div style="font-size:12px;color:#8e8e93;margin-top:2px">Monthly Revenue</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">StatCardView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> value: <span class="ty">String</span>
    <span class="kw">let</span> change: <span class="ty">String</span>
    <span class="kw">let</span> isPositive: <span class="ty">Bool</span>
    <span class="kw">let</span> icon: <span class="ty">String</span>
    <span class="kw">let</span> color: <span class="ty">Color</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">12</span>) {
            <span class="ty">HStack</span> {
                <span class="ty">Image</span>(systemName: icon)
                    .font(.system(size: <span class="nu">16</span>))
                    .foregroundColor(color)
                    .frame(width: <span class="nu">32</span>, height: <span class="nu">32</span>)
                    .background(color.opacity(<span class="nu">0.12</span>))
                    .cornerRadius(<span class="nu">8</span>)

                <span class="ty">Spacer</span>()

                <span class="ty">Label</span>(change, systemImage: isPositive ? <span class="st">"arrow.up.right"</span> : <span class="st">"arrow.down.right"</span>)
                    .font(.caption).fontWeight(.semibold)
                    .foregroundColor(isPositive ? .green : .red)
                    .padding(.horizontal, <span class="nu">8</span>).padding(.vertical, <span class="nu">4</span>)
                    .background((isPositive ? <span class="ty">Color</span>.green : <span class="ty">Color</span>.red).opacity(<span class="nu">0.1</span>))
                    .cornerRadius(<span class="nu">6</span>)
            }

            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">2</span>) {
                <span class="ty">Text</span>(value)
                    .font(.system(size: <span class="nu">28</span>, weight: .bold, design: .rounded))
                <span class="ty">Text</span>(title)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
        .padding(<span class="nu">16</span>)
        .background(<span class="ty">Color</span>(.secondarySystemBackground))
        .cornerRadius(<span class="nu">16</span>)
    }
}`
  },
  {
    id: 36, category: "layout", icon: "📭",
    title: "Empty State View",
    desc: "Full-screen illustrated empty state with icon, title, subtitle, and action button.",
    tags: ["EmptyState", "Placeholder", "Illustration"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;gap:10px;padding:16px"><div style="width:72px;height:72px;border-radius:36px;background:#e5e5ea;display:flex;align-items:center;justify-content:center;font-size:30px">📭</div><div style="font-size:15px;font-weight:600;color:#1c1c1e;text-align:center">No Messages Yet</div><div style="font-size:12px;color:#8e8e93;text-align:center;max-width:180px;line-height:1.5">When you receive messages they will appear here. Start a conversation now!</div><div style="background:#007aff;color:#fff;padding:10px 22px;border-radius:22px;font-size:14px;font-weight:600;margin-top:4px">Start Conversation</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">EmptyStateView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> icon: <span class="ty">String</span>
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> subtitle: <span class="ty">String</span>
    <span class="kw">let</span> actionTitle: <span class="ty">String</span>
    <span class="kw">var</span> onAction: () -> <span class="ty">Void</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">20</span>) {
            <span class="ty">Spacer</span>()

            <span class="ty">ZStack</span> {
                <span class="ty">Circle</span>()
                    .fill(<span class="ty">Color</span>(.systemGray6))
                    .frame(width: <span class="nu">100</span>, height: <span class="nu">100</span>)
                <span class="ty">Image</span>(systemName: icon)
                    .font(.system(size: <span class="nu">40</span>))
                    .foregroundStyle(.secondary)
            }

            <span class="ty">VStack</span>(spacing: <span class="nu">8</span>) {
                <span class="ty">Text</span>(title)
                    .font(.title3).fontWeight(.semibold)
                <span class="ty">Text</span>(subtitle)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, <span class="nu">32</span>)
            }

            <span class="ty">Button</span>(actionTitle, action: onAction)
                .buttonStyle(.borderedProminent)
                .controlSize(.large)

            <span class="ty">Spacer</span>()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}`
  },

  // ── NAVIGATION (continued) ────────────────────────────────────────────
  {
    id: 37, category: "navigation", icon: "🎠",
    title: "Onboarding Carousel",
    desc: "Tab-pager onboarding with animated page dots, emoji slides, and Get Started button.",
    tags: ["Onboarding", "TabView", "PageControl", "AppStorage"],
    preview: `<div class="ios-canvas" style="background:#fff;flex-direction:column;gap:12px;padding:20px"><div style="font-size:44px;text-align:center">🎨</div><div style="font-size:17px;font-weight:700;color:#1c1c1e;text-align:center">Design Beautiful UIs</div><div style="font-size:12px;color:#8e8e93;text-align:center;max-width:200px;line-height:1.5">Build stunning interfaces with SwiftUI's declarative syntax.</div><div style="display:flex;gap:6px;justify-content:center;margin-top:4px"><div style="width:20px;height:8px;border-radius:4px;background:#007aff"></div><div style="width:8px;height:8px;border-radius:4px;background:#c7c7cc"></div><div style="width:8px;height:8px;border-radius:4px;background:#c7c7cc"></div></div><div style="background:#007aff;color:#fff;padding:12px;border-radius:14px;font-size:14px;font-weight:600;text-align:center;width:100%;margin-top:4px">Continue</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">OnboardingView</span>: <span class="ty">View</span> {
    <span class="pa">@AppStorage</span>(<span class="st">"hasSeenOnboarding"</span>) <span class="kw">private var</span> hasSeenOnboarding = <span class="kw">false</span>
    <span class="pa">@State</span> <span class="kw">private var</span> currentPage = <span class="nu">0</span>

    <span class="kw">let</span> pages: [<span class="ty">Page</span>] = [
        <span class="ty">Page</span>(icon: <span class="st">"🎨"</span>, title: <span class="st">"Design Beautiful UIs"</span>,   subtitle: <span class="st">"Build stunning interfaces with SwiftUI."</span>),
        <span class="ty">Page</span>(icon: <span class="st">"⚡️"</span>, title: <span class="st">"Blazing Fast"</span>,            subtitle: <span class="st">"Native performance on all Apple platforms."</span>),
        <span class="ty">Page</span>(icon: <span class="st">"🔄"</span>, title: <span class="st">"Live Previews"</span>,          subtitle: <span class="st">"See changes in real-time with canvas preview."</span>)
    ]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
            <span class="ty">TabView</span>(selection: $currentPage) {
                <span class="ty">ForEach</span>(pages.indices, id: \.<span class="kw">self</span>) { i <span class="kw">in</span>
                    <span class="ty">PageView</span>(page: pages[i]).tag(i)
                }
            }
            .tabViewStyle(.page(indexDisplayMode: .never))

            <span class="ty">VStack</span>(spacing: <span class="nu">20</span>) {
                <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {
                    <span class="ty">ForEach</span>(pages.indices, id: \.<span class="kw">self</span>) { i <span class="kw">in</span>
                        <span class="ty">Capsule</span>()
                            .frame(width: currentPage == i ? <span class="nu">24</span> : <span class="nu">8</span>, height: <span class="nu">8</span>)
                            .foregroundColor(currentPage == i ? .blue : .secondary.opacity(<span class="nu">0.4</span>))
                            .animation(.spring(response: <span class="nu">0.3</span>), value: currentPage)
                    }
                }
                <span class="ty">Button</span> {
                    withAnimation {
                        <span class="kw">if</span> currentPage &lt; pages.count - <span class="nu">1</span> { currentPage += <span class="nu">1</span> }
                        <span class="kw">else</span> { hasSeenOnboarding = <span class="kw">true</span> }
                    }
                } label: {
                    <span class="ty">Text</span>(currentPage &lt; pages.count - <span class="nu">1</span> ? <span class="st">"Continue"</span> : <span class="st">"Get Started"</span>)
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity).padding()
                        .background(<span class="ty">Color</span>.blue).foregroundColor(.white)
                        .cornerRadius(<span class="nu">16</span>)
                }
                .padding(.horizontal, <span class="nu">24</span>)
            }
            .padding(.bottom, <span class="nu">48</span>)
        }
    }
}

<span class="kw">struct</span> <span class="ty">Page</span>: <span class="ty">Identifiable</span> {
    <span class="kw">let</span> id = <span class="ty">UUID</span>()
    <span class="kw">let</span> icon: <span class="ty">String</span>, title: <span class="ty">String</span>, subtitle: <span class="ty">String</span>
}`
  },

  // ── CONTROLS (more) ───────────────────────────────────────────────────
  {
    id: 38, category: "controls", icon: "⚠️",
    title: "Alert — Vertical Buttons",
    desc: "Custom alert with vertically stacked action buttons — ideal for 3+ options.",
    tags: ["Alert", "Popup", "Dialog", "Vertical"],
    preview: `<div class="ios-canvas" style="padding:0;position:relative;min-height:200px;background:#f2f2f7;border-radius:8px;overflow:hidden"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.32);display:flex;align-items:center;justify-content:center"><div style="background:#fff;border-radius:14px;width:80%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.22)"><div style="padding:20px 16px 14px;text-align:center;border-bottom:1px solid #e5e5ea"><div style="font-size:26px;margin-bottom:8px">📁</div><div style="font-size:15px;font-weight:700;color:#1c1c1e;margin-bottom:5px">Move Document</div><div style="font-size:12px;color:#8e8e93;line-height:1.5">Choose where to move this item</div></div><div style="display:flex;flex-direction:column"><div style="padding:13px 16px;font-size:14px;color:#007aff;text-align:center;border-bottom:1px solid #e5e5ea">Move to Favourites</div><div style="padding:13px 16px;font-size:14px;color:#007aff;text-align:center;border-bottom:1px solid #e5e5ea">Move to Archive</div><div style="padding:13px 16px;font-size:14px;font-weight:600;color:#ff3b30;text-align:center;border-bottom:1px solid #e5e5ea">Delete</div><div style="padding:13px 16px;font-size:14px;color:#8e8e93;text-align:center">Cancel</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">VerticalAlertView</span>: <span class="ty">View</span> {
    <span class="pa">@Binding</span> <span class="kw">var</span> isPresented: <span class="ty">Bool</span>
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> message: <span class="ty">String</span>
    <span class="kw">let</span> actions: [<span class="ty">AlertAction</span>]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span> {
            <span class="ty">Color</span>.black.opacity(<span class="nu">0.4</span>).ignoresSafeArea()
                .onTapGesture { isPresented = <span class="kw">false</span> }

            <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
                <span class="ty">VStack</span>(spacing: <span class="nu">6</span>) {
                    <span class="ty">Image</span>(systemName: <span class="st">"folder.fill"</span>)
                        .font(.system(size: <span class="nu">28</span>)).foregroundColor(.blue)
                    <span class="ty">Text</span>(title).font(.headline)
                    <span class="ty">Text</span>(message).font(.subheadline)
                        .foregroundColor(.secondary).multilineTextAlignment(.center)
                }
                .padding(<span class="nu">20</span>)

                <span class="ty">Divider</span>()

                <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
                    <span class="ty">ForEach</span>(actions) { action <span class="kw">in</span>
                        <span class="ty">Button</span> {
                            action.handler()
                            isPresented = <span class="kw">false</span>
                        } label: {
                            <span class="ty">Text</span>(action.label)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, <span class="nu">14</span>)
                                .foregroundColor(action.role == .destructive ? .red : .blue)
                                .fontWeight(action.role == .cancel ? .regular : .medium)
                        }
                        <span class="ty">Divider</span>()
                    }
                }
            }
            .background(.regularMaterial)
            .cornerRadius(<span class="nu">14</span>)
            .frame(maxWidth: <span class="nu">280</span>)
            .shadow(radius: <span class="nu">20</span>)
        }
    }
}

<span class="kw">struct</span> <span class="ty">AlertAction</span>: <span class="ty">Identifiable</span> {
    <span class="kw">let</span> id = <span class="ty">UUID</span>()
    <span class="kw">let</span> label: <span class="ty">String</span>
    <span class="kw">var</span> role: <span class="ty">ButtonRole</span>? = <span class="kw">nil</span>
    <span class="kw">let</span> handler: () -> <span class="ty">Void</span>
}`
  },
  {
    id: 39, category: "controls", icon: "📋",
    title: "Action Sheet",
    desc: "iOS-style bottom action sheet with option list and a separate cancel button.",
    tags: ["ActionSheet", "ConfirmationDialog", "Sheet", "Menu"],
    preview: `<div class="ios-canvas" style="padding:0;background:#f2f2f7;position:relative;min-height:200px;overflow:hidden;border-radius:8px"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.2)"></div><div style="position:absolute;bottom:0;left:0;right:0;padding:10px"><div style="background:rgba(255,255,255,0.95);border-radius:14px;overflow:hidden;margin-bottom:8px"><div style="padding:13px 16px;text-align:center;border-bottom:1px solid #e5e5ea"><div style="font-size:11px;color:#8e8e93;margin-bottom:2px">Share Options</div><div style="font-size:12px;font-weight:600;color:#1c1c1e">Choose how to share</div></div><div style="padding:13px 16px;font-size:14px;color:#007aff;border-bottom:1px solid #e5e5ea;display:flex;align-items:center;gap:10px"><span>↗</span> Share via AirDrop</div><div style="padding:13px 16px;font-size:14px;color:#007aff;border-bottom:1px solid #e5e5ea;display:flex;align-items:center;gap:10px"><span>🔗</span> Copy Link</div><div style="padding:13px 16px;font-size:14px;color:#ff3b30;display:flex;align-items:center;gap:10px"><span>🗑</span> Delete</div></div><div style="background:rgba(255,255,255,0.95);border-radius:14px;padding:13px 16px;font-size:15px;font-weight:600;color:#007aff;text-align:center">Cancel</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ContentView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> showSheet = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Button</span>(<span class="st">"Share"</span>) { showSheet = <span class="kw">true</span> }
            .confirmationDialog(
                <span class="st">"Choose how to share"</span>,
                isPresented: $showSheet,
                titleVisibility: .visible
            ) {
                <span class="ty">Button</span>(<span class="st">"Share via AirDrop"</span>) { <span class="fn">shareAirDrop</span>() }
                <span class="ty">Button</span>(<span class="st">"Copy Link"</span>)         { <span class="fn">copyLink</span>() }
                <span class="ty">Button</span>(<span class="st">"Save to Files"</span>)     { <span class="fn">saveToFiles</span>() }
                <span class="ty">Button</span>(<span class="st">"Delete"</span>, role: .destructive) { <span class="fn">deleteItem</span>() }
                <span class="ty">Button</span>(<span class="st">"Cancel"</span>, role: .cancel) {}
            } message: {
                <span class="ty">Text</span>(<span class="st">"Select a sharing option for this document"</span>)
            }
    }
}`
  },
  {
    id: 40, category: "controls", icon: "⬆️",
    title: "Bottom Sheet with Detents",
    desc: "Resizable sheet with .medium and .large detents and grab handle.",
    tags: ["BottomSheet", "Sheet", "Detents", "presentationDetents"],
    preview: `<div class="ios-canvas" style="padding:0;background:#f2f2f7;position:relative;min-height:200px;overflow:hidden;border-radius:8px"><div style="position:absolute;bottom:0;left:0;right:0;height:150px;background:#fff;border-radius:18px 18px 0 0;box-shadow:0 -4px 24px rgba(0,0,0,0.1)"><div style="display:flex;justify-content:center;padding:10px"><div style="width:36px;height:4px;background:#c7c7cc;border-radius:2px"></div></div><div style="padding:8px 16px 16px"><div style="font-size:15px;font-weight:700;color:#1c1c1e;margin-bottom:8px">Quick Actions</div><div style="display:flex;gap:10px"><div style="flex:1;padding:10px;background:#f2f2f7;border-radius:10px;text-align:center;font-size:12px;color:#007aff;font-weight:500">📤 Share</div><div style="flex:1;padding:10px;background:#f2f2f7;border-radius:10px;text-align:center;font-size:12px;color:#34c759;font-weight:500">💾 Save</div><div style="flex:1;padding:10px;background:#f2f2f7;border-radius:10px;text-align:center;font-size:12px;color:#ff3b30;font-weight:500">🗑 Delete</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ContentView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> showSheet = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">Button</span>(<span class="st">"Show Sheet"</span>) { showSheet = <span class="kw">true</span> }
            .sheet(isPresented: $showSheet) {
                <span class="ty">SheetContent</span>()
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)
                    .presentationCornerRadius(<span class="nu">20</span>)
                    .presentationBackground(.regularMaterial)
            }
    }
}

<span class="kw">struct</span> <span class="ty">SheetContent</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationStack</span> {
            <span class="ty">List</span> {
                <span class="ty">Section</span>(<span class="st">"Quick Actions"</span>) {
                    <span class="ty">Label</span>(<span class="st">"Share"</span>,  systemImage: <span class="st">"square.and.arrow.up"</span>)
                    <span class="ty">Label</span>(<span class="st">"Save"</span>,   systemImage: <span class="st">"square.and.arrow.down"</span>)
                    <span class="ty">Label</span>(<span class="st">"Delete"</span>, systemImage: <span class="st">"trash"</span>).foregroundColor(.red)
                }
            }
            .navigationTitle(<span class="st">"Options"</span>)
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}`
  },
  {
    id: 41, category: "controls", icon: "⏳",
    title: "Loading Overlay",
    desc: "Full-screen blurred loading overlay with spinner and customisable message.",
    tags: ["Loading", "Overlay", "Spinner", "ProgressView"],
    preview: `<div class="ios-canvas" style="padding:0;background:#f2f2f7;position:relative;min-height:170px;overflow:hidden;border-radius:8px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8e8e93;font-size:12px">Content beneath</div><div style="position:absolute;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;border-radius:8px"><div style="background:rgba(30,30,30,0.9);border-radius:16px;padding:24px 28px;display:flex;flex-direction:column;align-items:center;gap:12px"><div style="width:32px;height:32px;border-radius:50%;border:3px solid rgba(255,255,255,0.2);border-top-color:#fff;border-right-color:rgba(255,255,255,0.6);animation:spin 0.9s linear infinite"></div><div style="color:#fff;font-size:13px;font-weight:500">Loading…</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">LoadingOverlay</span>: <span class="ty">ViewModifier</span> {
    <span class="kw">let</span> isLoading: <span class="ty">Bool</span>
    <span class="kw">let</span> message: <span class="ty">String</span>

    <span class="kw">func</span> <span class="fn">body</span>(content: <span class="ty">Content</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        content
            .disabled(isLoading)
            .overlay {
                <span class="kw">if</span> isLoading {
                    <span class="ty">ZStack</span> {
                        <span class="ty">Color</span>.black.opacity(<span class="nu">0.45</span>)
                            .ignoresSafeArea()
                        <span class="ty">VStack</span>(spacing: <span class="nu">14</span>) {
                            <span class="ty">ProgressView</span>()
                                .progressViewStyle(.circular)
                                .scaleEffect(<span class="nu">1.4</span>)
                                .tint(.white)
                            <span class="ty">Text</span>(message)
                                .font(.subheadline).fontWeight(.medium)
                                .foregroundColor(.white)
                        }
                        .padding(<span class="nu">28</span>)
                        .background(.regularMaterial)
                        .cornerRadius(<span class="nu">16</span>)
                        .shadow(radius: <span class="nu">20</span>)
                    }
                    .transition(.opacity.animation(.easeInOut(duration: <span class="nu">0.2</span>)))
                }
            }
    }
}

<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">loadingOverlay</span>(_ isLoading: <span class="ty">Bool</span>, message: <span class="ty">String</span> = <span class="st">"Loading…"</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        modifier(<span class="ty">LoadingOverlay</span>(isLoading: isLoading, message: message))
    }
}

<span class="cm">// Usage</span>
<span class="ty">ContentView</span>().loadingOverlay(isLoading, message: <span class="st">"Saving…"</span>)`
  },
  {
    id: 42, category: "controls", icon: "✅",
    title: "Success Confirmation",
    desc: "Animated success checkmark view with title and subtitle for completed actions.",
    tags: ["Success", "Confirmation", "Animation", "Checkmark"],
    preview: `<div class="ios-canvas" style="background:#fff;flex-direction:column;gap:10px;padding:20px"><div style="width:72px;height:72px;border-radius:36px;background:rgba(52,199,89,0.12);display:flex;align-items:center;justify-content:center"><div style="width:52px;height:52px;border-radius:26px;background:#34c759;display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700">✓</div></div><div style="font-size:17px;font-weight:700;color:#1c1c1e;text-align:center">Payment Successful!</div><div style="font-size:13px;color:#8e8e93;text-align:center;max-width:200px;line-height:1.5">Your order has been placed and a receipt was sent to your email.</div><div style="background:#007aff;color:#fff;padding:11px 28px;border-radius:22px;font-size:14px;font-weight:600;margin-top:6px">Done</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SuccessView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> subtitle: <span class="ty">String</span>
    <span class="kw">var</span> onDone: () -> <span class="ty">Void</span>

    <span class="pa">@State</span> <span class="kw">private var</span> scale: <span class="ty">CGFloat</span> = <span class="nu">0</span>
    <span class="pa">@State</span> <span class="kw">private var</span> opacity: <span class="ty">Double</span> = <span class="nu">0</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">20</span>) {
            <span class="ty">ZStack</span> {
                <span class="ty">Circle</span>().fill(<span class="ty">Color</span>.green.opacity(<span class="nu">0.12</span>))
                    .frame(width: <span class="nu">100</span>, height: <span class="nu">100</span>)
                <span class="ty">Circle</span>().fill(<span class="ty">Color</span>.green)
                    .frame(width: <span class="nu">72</span>, height: <span class="nu">72</span>)
                <span class="ty">Image</span>(systemName: <span class="st">"checkmark"</span>)
                    .font(.system(size: <span class="nu">32</span>, weight: .bold))
                    .foregroundColor(.white)
            }
            .scaleEffect(scale)
            .onAppear {
                withAnimation(.spring(response: <span class="nu">0.5</span>, dampingFraction: <span class="nu">0.6</span>)) { scale = <span class="nu">1</span> }
            }

            <span class="ty">VStack</span>(spacing: <span class="nu">8</span>) {
                <span class="ty">Text</span>(title).font(.title2).fontWeight(.bold)
                <span class="ty">Text</span>(subtitle).font(.subheadline).foregroundColor(.secondary)
                    .multilineTextAlignment(.center).padding(.horizontal, <span class="nu">32</span>)
            }
            .opacity(opacity)
            .onAppear {
                withAnimation(.easeIn(duration: <span class="nu">0.3</span>).delay(<span class="nu">0.2</span>)) { opacity = <span class="nu">1</span> }
            }

            <span class="ty">Button</span>(<span class="st">"Done"</span>, action: onDone)
                .buttonStyle(.borderedProminent).controlSize(.large)
        }
        .padding(<span class="nu">32</span>)
    }
}`
  },
  {
    id: 43, category: "controls", icon: "⭐",
    title: "Star Rating",
    desc: "Interactive tappable star rating with half-star and integer modes.",
    tags: ["Rating", "Stars", "Review", "Interactive"],
    preview: `<div class="ios-canvas" style="background:#fff;flex-direction:column;gap:12px;padding:20px"><div style="font-size:14px;font-weight:600;color:#1c1c1e">Rate your experience</div><div style="display:flex;gap:6px"><span style="font-size:36px;color:#ff9500">★</span><span style="font-size:36px;color:#ff9500">★</span><span style="font-size:36px;color:#ff9500">★</span><span style="font-size:36px;color:#ff9500">★</span><span style="font-size:36px;color:#e5e5ea">★</span></div><div style="font-size:13px;color:#8e8e93">4 out of 5 • 248 ratings</div><div style="background:#007aff;color:#fff;padding:10px 24px;border-radius:22px;font-size:14px;font-weight:600;margin-top:4px">Submit Review</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">StarRatingView</span>: <span class="ty">View</span> {
    <span class="pa">@Binding</span> <span class="kw">var</span> rating: <span class="ty">Int</span>
    <span class="kw">let</span> maxRating: <span class="ty">Int</span> = <span class="nu">5</span>
    <span class="kw">var</span> starColor: <span class="ty">Color</span> = .orange

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">4</span>) {
            <span class="ty">ForEach</span>(<span class="nu">1</span>...maxRating, id: \.<span class="kw">self</span>) { star <span class="kw">in</span>
                <span class="ty">Image</span>(systemName: star &lt;= rating ? <span class="st">"star.fill"</span> : <span class="st">"star"</span>)
                    .font(.system(size: <span class="nu">32</span>))
                    .foregroundColor(star &lt;= rating ? starColor : <span class="ty">Color</span>(.systemGray4))
                    .onTapGesture {
                        withAnimation(.spring(response: <span class="nu">0.3</span>)) {
                            rating = star == rating ? <span class="nu">0</span> : star
                        }
                    }
                    .scaleEffect(star &lt;= rating ? <span class="nu">1.1</span> : <span class="nu">1.0</span>)
                    .animation(.spring(response: <span class="nu">0.3</span>), value: rating)
            }
        }
        .sensoryFeedback(.selection, trigger: rating)
    }
}

<span class="cm">// Usage</span>
<span class="pa">@State</span> <span class="kw">private var</span> rating = <span class="nu">0</span>

<span class="ty">VStack</span> {
    <span class="ty">StarRatingView</span>(rating: $rating)
    <span class="ty">Text</span>(rating == <span class="nu">0</span> ? <span class="st">"Tap to rate"</span> : <span class="st">"\(rating) of 5 stars"</span>)
        .foregroundColor(.secondary)
}`
  },
  {
    id: 44, category: "controls", icon: "🔀",
    title: "Segmented Picker",
    desc: "Custom-styled segmented control with smooth sliding indicator animation.",
    tags: ["Segmented", "Picker", "Tab", "Control"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;gap:14px"><div style="background:#e5e5ea;border-radius:10px;padding:3px;display:flex;width:100%"><div style="flex:1;background:#fff;border-radius:8px;padding:7px;font-size:13px;font-weight:600;color:#1c1c1e;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.1)">Day</div><div style="flex:1;padding:7px;font-size:13px;color:#8e8e93;text-align:center">Week</div><div style="flex:1;padding:7px;font-size:13px;color:#8e8e93;text-align:center">Month</div></div><div style="background:#fff;border-radius:10px;padding:14px;width:100%;display:flex;flex-direction:column;gap:6px"><div style="height:8px;background:rgba(0,122,255,0.15);border-radius:4px;width:100%"></div><div style="height:8px;background:rgba(0,122,255,0.08);border-radius:4px;width:75%"></div><div style="height:8px;background:rgba(0,122,255,0.05);border-radius:4px;width:55%"></div></div></div>`,
    code: `<span class="kw">enum</span> <span class="ty">TimeRange</span>: <span class="ty">String</span>, <span class="ty">CaseIterable</span> {
    <span class="kw">case</span> day = <span class="st">"Day"</span>, week = <span class="st">"Week"</span>, month = <span class="st">"Month"</span>, year = <span class="st">"Year"</span>
}

<span class="kw">struct</span> <span class="ty">SegmentedPickerView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> selected: <span class="ty">TimeRange</span> = .day
    <span class="pa">@Namespace</span> <span class="kw">private var</span> animation

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(spacing: <span class="nu">0</span>) {
            <span class="ty">ForEach</span>(<span class="ty">TimeRange</span>.allCases, id: \.<span class="kw">self</span>) { range <span class="kw">in</span>
                <span class="ty">Button</span> {
                    withAnimation(.spring(response: <span class="nu">0.3</span>, dampingFraction: <span class="nu">0.8</span>)) {
                        selected = range
                    }
                } label: {
                    <span class="ty">Text</span>(range.rawValue)
                        .font(.subheadline).fontWeight(.medium)
                        .frame(maxWidth: .infinity).padding(.vertical, <span class="nu">8</span>)
                        .background {
                            <span class="kw">if</span> selected == range {
                                <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">8</span>)
                                    .fill(<span class="ty">Color</span>(.systemBackground))
                                    .shadow(color: .black.opacity(<span class="nu">0.12</span>), radius: <span class="nu">4</span>)
                                    .matchedGeometryEffect(id: <span class="st">"tab"</span>, in: animation)
                            }
                        }
                        .foregroundColor(selected == range ? .primary : .secondary)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(<span class="nu">3</span>)
        .background(<span class="ty">Color</span>(.systemGray5))
        .cornerRadius(<span class="nu">11</span>)
    }
}`
  },
  {
    id: 45, category: "controls", icon: "🪜",
    title: "Step Progress Indicator",
    desc: "Numbered horizontal progress bar showing current step in a multi-step flow.",
    tags: ["Progress", "Steps", "Wizard", "Onboarding"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;gap:14px;padding:20px"><div style="display:flex;align-items:center;width:100%"><div style="width:32px;height:32px;border-radius:16px;background:#007aff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;flex-shrink:0">1</div><div style="flex:1;height:3px;background:#007aff"></div><div style="width:32px;height:32px;border-radius:16px;background:#007aff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;flex-shrink:0">2</div><div style="flex:1;height:3px;background:#e5e5ea"></div><div style="width:32px;height:32px;border-radius:16px;background:#e5e5ea;display:flex;align-items:center;justify-content:center;color:#8e8e93;font-size:13px;font-weight:700;flex-shrink:0">3</div><div style="flex:1;height:3px;background:#e5e5ea"></div><div style="width:32px;height:32px;border-radius:16px;background:#e5e5ea;display:flex;align-items:center;justify-content:center;color:#8e8e93;font-size:13px;font-weight:700;flex-shrink:0">4</div></div><div style="display:flex;justify-content:space-between;width:100%;padding:0 4px"><div style="font-size:10px;color:#007aff;font-weight:500;text-align:center;width:32px">Info</div><div style="font-size:10px;color:#007aff;font-weight:500;text-align:center;width:32px">Photo</div><div style="font-size:10px;color:#8e8e93;text-align:center;width:32px">Plan</div><div style="font-size:10px;color:#8e8e93;text-align:center;width:32px">Done</div></div><div style="background:#fff;border-radius:12px;padding:14px;width:100%;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:600;color:#1c1c1e">Step 2 of 4: Upload Photo</div><div style="font-size:12px;color:#8e8e93">Add a profile picture to personalise your account</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">StepProgressView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> steps: [<span class="ty">String</span>]
    <span class="kw">let</span> currentStep: <span class="ty">Int</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(spacing: <span class="nu">8</span>) {
            <span class="ty">HStack</span>(spacing: <span class="nu">0</span>) {
                <span class="ty">ForEach</span>(steps.indices, id: \.<span class="kw">self</span>) { index <span class="kw">in</span>
                    <span class="ty">ZStack</span> {
                        <span class="ty">Circle</span>()
                            .fill(index &lt; currentStep ? <span class="ty">Color</span>.blue : <span class="ty">Color</span>(.systemGray5))
                            .frame(width: <span class="nu">32</span>, height: <span class="nu">32</span>)
                        <span class="kw">if</span> index &lt; currentStep - <span class="nu">1</span> {
                            <span class="ty">Image</span>(systemName: <span class="st">"checkmark"</span>)
                                .font(.caption).fontWeight(.bold).foregroundColor(.white)
                        } <span class="kw">else</span> {
                            <span class="ty">Text</span>(<span class="st">"\(index + 1)"</span>)
                                .font(.caption).fontWeight(.bold)
                                .foregroundColor(index &lt; currentStep ? .white : .secondary)
                        }
                    }
                    <span class="kw">if</span> index &lt; steps.count - <span class="nu">1</span> {
                        <span class="ty">Rectangle</span>()
                            .frame(height: <span class="nu">3</span>)
                            .foregroundColor(index &lt; currentStep - <span class="nu">1</span> ? .blue : <span class="ty">Color</span>(.systemGray5))
                    }
                }
            }

            <span class="ty">HStack</span> {
                <span class="ty">ForEach</span>(steps.indices, id: \.<span class="kw">self</span>) { index <span class="kw">in</span>
                    <span class="ty">Text</span>(steps[index])
                        .font(.caption2)
                        .foregroundColor(index &lt; currentStep ? .blue : .secondary)
                        .frame(maxWidth: .infinity)
                }
            }
        }
    }
}

<span class="cm">// Usage</span>
<span class="ty">StepProgressView</span>(
    steps: [<span class="st">"Info"</span>, <span class="st">"Photo"</span>, <span class="st">"Plan"</span>, <span class="st">"Done"</span>],
    currentStep: <span class="nu">2</span>
)`
  },
  {
    id: 46, category: "controls", icon: "🔍",
    title: "Search with Suggestions",
    desc: "Searchable list with recent searches, live suggestions, and token filters.",
    tags: ["Search", "Searchable", "Suggestions", "Filter"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;padding:10px;flex-direction:column;gap:0"><div style="background:#fff;border-radius:12px;overflow:hidden;width:100%"><div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:rgba(142,142,147,0.12);margin:10px;border-radius:10px"><span style="color:#8e8e93;font-size:14px">🔍</span><span style="font-size:13px;color:#8e8e93">Search snippets…</span></div><div style="padding:4px 12px 6px;font-size:11px;font-weight:600;color:#8e8e93;text-transform:uppercase;letter-spacing:0.5px">Recent</div><div style="padding:10px 14px;font-size:13px;color:#1c1c1e;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f2f2f7"><span style="color:#8e8e93">🕐</span> HStack Layout</div><div style="padding:10px 14px;font-size:13px;color:#1c1c1e;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f2f2f7"><span style="color:#8e8e93">🕐</span> Custom Button</div><div style="padding:10px 14px;font-size:13px;color:#007aff;display:flex;align-items:center;gap:10px"><span style="color:#007aff">🔍</span> SwiftUI animations</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SearchableView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> query = <span class="st">""</span>
    <span class="pa">@State</span> <span class="kw">private var</span> recent: [<span class="ty">String</span>] = [<span class="st">"HStack Layout"</span>, <span class="st">"Custom Button"</span>]
    <span class="kw">let</span> items: [<span class="ty">String</span>]

    <span class="kw">var</span> filtered: [<span class="ty">String</span>] {
        query.isEmpty ? items : items.filter { $0.localizedCaseInsensitiveContains(query) }
    }

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">List</span>(filtered, id: \.<span class="kw">self</span>) { item <span class="kw">in</span>
            <span class="ty">Text</span>(item)
        }
        .searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always))
        .searchSuggestions {
            <span class="kw">if</span> query.isEmpty {
                <span class="ty">Section</span>(<span class="st">"Recent"</span>) {
                    <span class="ty">ForEach</span>(recent, id: \.<span class="kw">self</span>) { term <span class="kw">in</span>
                        <span class="ty">Label</span>(term, systemImage: <span class="st">"clock"</span>)
                            .searchCompletion(term)
                    }
                }
            } <span class="kw">else</span> {
                <span class="ty">Label</span>(<span class="st">"Search for \"\(query)\""</span>, systemImage: <span class="st">"magnifyingglass"</span>)
                    .searchCompletion(query)
            }
        }
        .onSubmit(of: .search) {
            <span class="kw">if</span> !query.isEmpty { recent.insert(query, at: <span class="nu">0</span>) }
        }
    }
}`
  },

  // ── LAYOUT (more) ─────────────────────────────────────────────────────
  {
    id: 47, category: "layout", icon: "📰",
    title: "Article Card",
    desc: "Editorial card with cover image, category badge, title, author row, and read time.",
    tags: ["Article", "Card", "Blog", "Media"],
    preview: `<div class="ios-canvas" style="padding:10px;background:#f2f2f7"><div style="background:#fff;border-radius:14px;overflow:hidden;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.06)"><div style="height:90px;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);display:flex;align-items:flex-end;padding:10px"><span style="background:#007aff;color:#fff;font-size:10px;font-weight:600;padding:3px 8px;border-radius:6px;text-transform:uppercase;letter-spacing:0.3px">SwiftUI</span></div><div style="padding:12px 14px"><div style="font-size:14px;font-weight:700;color:#1c1c1e;line-height:1.3;margin-bottom:10px">Building Smooth Animations with SwiftUI's new Phase Animator</div><div style="display:flex;align-items:center;gap:8px"><div style="width:24px;height:24px;border-radius:12px;background:linear-gradient(135deg,#007aff,#5856d6)"></div><div style="flex:1;font-size:11px;color:#8e8e93">Alex Kim · 5 min read</div><div style="font-size:11px;color:#8e8e93">3h ago</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ArticleCardView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> article: <span class="ty">Article</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">0</span>) {
            <span class="ty">AsyncImage</span>(url: article.coverURL) { image <span class="kw">in</span>
                image.resizable().scaledToFill()
            } placeholder: {
                <span class="ty">Rectangle</span>().fill(<span class="ty">Color</span>(.systemGray5))
            }
            .frame(height: <span class="nu">180</span>)
            .clipped()
            .overlay(alignment: .bottomLeading) {
                <span class="ty">Text</span>(article.category.uppercased())
                    .font(.caption2).fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.horizontal, <span class="nu">8</span>).padding(.vertical, <span class="nu">4</span>)
                    .background(<span class="ty">Color</span>.blue)
                    .cornerRadius(<span class="nu">6</span>)
                    .padding(<span class="nu">12</span>)
            }

            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">10</span>) {
                <span class="ty">Text</span>(article.title)
                    .font(.headline).lineLimit(<span class="nu">2</span>)

                <span class="ty">HStack</span>(spacing: <span class="nu">8</span>) {
                    <span class="ty">AsyncImage</span>(url: article.authorAvatarURL) { img <span class="kw">in</span>
                        img.resizable().scaledToFill()
                    } placeholder: {
                        <span class="ty">Circle</span>().fill(<span class="ty">Color</span>(.systemGray4))
                    }
                    .frame(width: <span class="nu">24</span>, height: <span class="nu">24</span>).clipShape(<span class="ty">Circle</span>())

                    <span class="ty">Text</span>(article.author)
                        .font(.caption).foregroundColor(.secondary)
                    <span class="ty">Spacer</span>()
                    <span class="ty">Label</span>(<span class="st">"\(article.readMinutes) min"</span>, systemImage: <span class="st">"clock"</span>)
                        .font(.caption2).foregroundColor(.secondary)
                }
            }
            .padding(<span class="nu">14</span>)
        }
        .background(<span class="ty">Color</span>(.systemBackground))
        .cornerRadius(<span class="nu">14</span>)
        .shadow(color: .black.opacity(<span class="nu">0.08</span>), radius: <span class="nu">10</span>)
    }
}`
  },
  {
    id: 48, category: "layout", icon: "🛍",
    title: "Product Card",
    desc: "E-commerce card with image, name, star rating, price, and add-to-cart button.",
    tags: ["Product", "Ecommerce", "Card", "Shop"],
    preview: `<div class="ios-canvas" style="padding:10px;background:#f2f2f7"><div style="background:#fff;border-radius:14px;overflow:hidden;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.06)"><div style="height:100px;background:linear-gradient(135deg,#f0f0f0,#e0e0e0);display:flex;align-items:center;justify-content:center;font-size:40px">🎧</div><div style="padding:12px 14px"><div style="font-size:11px;color:#8e8e93;margin-bottom:3px">Sony · Wireless</div><div style="font-size:14px;font-weight:700;color:#1c1c1e;margin-bottom:6px">WH-1000XM5 Headphones</div><div style="display:flex;align-items:center;gap:4px;margin-bottom:10px"><span style="color:#ff9500;font-size:13px">★★★★</span><span style="color:#e5e5ea;font-size:13px">★</span><span style="font-size:11px;color:#8e8e93;margin-left:2px">4.0 (1.2k)</span></div><div style="display:flex;align-items:center;justify-content:space-between"><div><span style="font-size:17px;font-weight:800;color:#1c1c1e">$349</span><span style="font-size:12px;color:#8e8e93;text-decoration:line-through;margin-left:6px">$399</span></div><div style="background:#007aff;color:#fff;padding:8px 14px;border-radius:10px;font-size:12px;font-weight:600">Add to Cart</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ProductCardView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> product: <span class="ty">Product</span>
    <span class="pa">@State</span> <span class="kw">private var</span> inCart = <span class="kw">false</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">0</span>) {
            <span class="ty">AsyncImage</span>(url: product.imageURL) { img <span class="kw">in</span>
                img.resizable().scaledToFit()
            } placeholder: {
                <span class="ty">Color</span>(.systemGray6)
            }
            .frame(height: <span class="nu">180</span>).frame(maxWidth: .infinity)
            .background(<span class="ty">Color</span>(.systemGray6))

            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">6</span>) {
                <span class="ty">Text</span>(product.brand).font(.caption).foregroundColor(.secondary)
                <span class="ty">Text</span>(product.name).font(.headline).lineLimit(<span class="nu">2</span>)

                <span class="ty">HStack</span>(spacing: <span class="nu">2</span>) {
                    <span class="ty">ForEach</span>(<span class="nu">1</span>...<span class="nu">5</span>, id: \.<span class="kw">self</span>) { i <span class="kw">in</span>
                        <span class="ty">Image</span>(systemName: <span class="ty">Double</span>(i) &lt;= product.rating ? <span class="st">"star.fill"</span> : <span class="st">"star"</span>)
                            .font(.caption2).foregroundColor(.orange)
                    }
                    <span class="ty">Text</span>(<span class="st">"(\(product.reviewCount))"</span>)
                        .font(.caption2).foregroundColor(.secondary)
                }

                <span class="ty">HStack</span> {
                    <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">2</span>) {
                        <span class="ty">Text</span>(<span class="st">"$\(product.price, specifier: "%.0f")"</span>)
                            .font(.title3).fontWeight(.bold)
                        <span class="kw">if let</span> original = product.originalPrice {
                            <span class="ty">Text</span>(<span class="st">"$\(original, specifier: "%.0f")"</span>)
                                .font(.caption).strikethrough().foregroundColor(.secondary)
                        }
                    }
                    <span class="ty">Spacer</span>()
                    <span class="ty">Button</span>(inCart ? <span class="st">"Added ✓"</span> : <span class="st">"Add to Cart"</span>) {
                        withAnimation(.spring()) { inCart.toggle() }
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(inCart ? .green : .blue)
                }
            }
            .padding(<span class="nu">14</span>)
        }
        .background(<span class="ty">Color</span>(.systemBackground))
        .cornerRadius(<span class="nu">14</span>)
        .shadow(color: .black.opacity(<span class="nu">0.08</span>), radius: <span class="nu">10</span>)
    }
}`
  },
  {
    id: 49, category: "layout", icon: "📅",
    title: "Timeline View",
    desc: "Vertical timeline with connector lines, event dots, date stamps, and descriptions.",
    tags: ["Timeline", "Events", "History", "List"],
    preview: `<div class="ios-canvas" style="padding:14px;background:#fff;flex-direction:column;gap:0;align-items:flex-start"><div style="display:flex;gap:12px;width:100%;margin-bottom:12px"><div style="display:flex;flex-direction:column;align-items:center"><div style="width:12px;height:12px;border-radius:6px;background:#34c759;margin-top:3px;flex-shrink:0"></div><div style="width:2px;flex:1;background:#e5e5ea;margin-top:4px;min-height:30px"></div></div><div style="flex:1;padding-bottom:12px"><div style="font-size:11px;color:#8e8e93;margin-bottom:2px">Today, 2:30 PM</div><div style="font-size:13px;font-weight:600;color:#1c1c1e">PR merged to main</div><div style="font-size:11px;color:#8e8e93">SwiftUI component library v2.0</div></div></div><div style="display:flex;gap:12px;width:100%;margin-bottom:12px"><div style="display:flex;flex-direction:column;align-items:center"><div style="width:12px;height:12px;border-radius:6px;background:#007aff;margin-top:3px;flex-shrink:0"></div><div style="width:2px;flex:1;background:#e5e5ea;margin-top:4px;min-height:30px"></div></div><div style="flex:1;padding-bottom:12px"><div style="font-size:11px;color:#8e8e93;margin-bottom:2px">Yesterday, 10:00 AM</div><div style="font-size:13px;font-weight:600;color:#1c1c1e">Code review completed</div><div style="font-size:11px;color:#8e8e93">4 approvals · 2 comments</div></div></div><div style="display:flex;gap:12px;width:100%"><div style="display:flex;flex-direction:column;align-items:center"><div style="width:12px;height:12px;border-radius:6px;background:#ff9500;margin-top:3px;flex-shrink:0"></div></div><div style="flex:1"><div style="font-size:11px;color:#8e8e93;margin-bottom:2px">Mon, 9:15 AM</div><div style="font-size:13px;font-weight:600;color:#1c1c1e">Branch created</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">TimelineView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> events: [<span class="ty">TimelineEvent</span>]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">0</span>) {
            <span class="ty">ForEach</span>(Array(events.enumerated()), id: \.element.id) { idx, event <span class="kw">in</span>
                <span class="ty">HStack</span>(alignment: .top, spacing: <span class="nu">16</span>) {
                    <span class="ty">VStack</span>(spacing: <span class="nu">0</span>) {
                        <span class="ty">Circle</span>()
                            .fill(event.color)
                            .frame(width: <span class="nu">12</span>, height: <span class="nu">12</span>)
                            .padding(.top, <span class="nu">4</span>)
                        <span class="kw">if</span> idx &lt; events.count - <span class="nu">1</span> {
                            <span class="ty">Rectangle</span>()
                                .fill(<span class="ty">Color</span>(.systemGray5))
                                .frame(width: <span class="nu">2</span>)
                                .padding(.top, <span class="nu">4</span>)
                        }
                    }
                    .frame(width: <span class="nu">12</span>)

                    <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">4</span>) {
                        <span class="ty">Text</span>(event.dateLabel)
                            .font(.caption).foregroundColor(.secondary)
                        <span class="ty">Text</span>(event.title)
                            .font(.subheadline).fontWeight(.semibold)
                        <span class="kw">if let</span> detail = event.detail {
                            <span class="ty">Text</span>(detail).font(.caption).foregroundColor(.secondary)
                        }
                    }
                    .padding(.bottom, <span class="nu">20</span>)
                }
            }
        }
    }
}

<span class="kw">struct</span> <span class="ty">TimelineEvent</span>: <span class="ty">Identifiable</span> {
    <span class="kw">let</span> id = <span class="ty">UUID</span>()
    <span class="kw">let</span> title: <span class="ty">String</span>
    <span class="kw">let</span> dateLabel: <span class="ty">String</span>
    <span class="kw">let</span> color: <span class="ty">Color</span>
    <span class="kw">var</span> detail: <span class="ty">String</span>? = <span class="kw">nil</span>
}`
  },
  {
    id: 50, category: "layout", icon: "🔔",
    title: "Notification Row",
    desc: "Rich notification list row with app icon, title, preview text, and relative timestamp.",
    tags: ["Notification", "Row", "List", "Badge"],
    preview: `<div class="ios-canvas" style="padding:10px;background:#f2f2f7;gap:0"><div style="background:#fff;border-radius:12px;overflow:hidden;width:100%"><div style="padding:12px 14px;display:flex;align-items:flex-start;gap:10px;border-bottom:1px solid #f2f2f7"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#007aff,#5856d6);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">📱</div><div style="flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px"><div style="font-size:13px;font-weight:600;color:#1c1c1e">SwiftUI Snippets</div><div style="font-size:11px;color:#8e8e93">2m ago</div></div><div style="font-size:13px;font-weight:600;color:#1c1c1e;margin-bottom:2px">New component added</div><div style="font-size:12px;color:#8e8e93;line-height:1.4">Custom Alert Dialog is now available in the Controls section</div></div><div style="width:8px;height:8px;border-radius:4px;background:#007aff;flex-shrink:0;margin-top:6px"></div></div><div style="padding:12px 14px;display:flex;align-items:flex-start;gap:10px"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#34c759,#30d158);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">✅</div><div style="flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px"><div style="font-size:13px;font-weight:600;color:#1c1c1e">Build Succeeded</div><div style="font-size:11px;color:#8e8e93">1h ago</div></div><div style="font-size:12px;color:#8e8e93">Release build 2.0.1 passed all checks</div></div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">NotificationRowView</span>: <span class="ty">View</span> {
    <span class="kw">let</span> notification: <span class="ty">AppNotification</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(alignment: .top, spacing: <span class="nu">12</span>) {
            <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">10</span>)
                .fill(notification.color.gradient)
                .frame(width: <span class="nu">44</span>, height: <span class="nu">44</span>)
                .overlay {
                    <span class="ty">Image</span>(systemName: notification.icon)
                        .font(.system(size: <span class="nu">20</span>)).foregroundColor(.white)
                }

            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">3</span>) {
                <span class="ty">HStack</span> {
                    <span class="ty">Text</span>(notification.appName)
                        .font(.footnote).fontWeight(.semibold)
                    <span class="ty">Spacer</span>()
                    <span class="ty">Text</span>(notification.timestamp, style: .relative)
                        .font(.caption2).foregroundColor(.secondary)
                }
                <span class="ty">Text</span>(notification.title)
                    .font(.subheadline).fontWeight(.semibold).lineLimit(<span class="nu">1</span>)
                <span class="ty">Text</span>(notification.body)
                    .font(.footnote).foregroundColor(.secondary).lineLimit(<span class="nu">2</span>)
            }

            <span class="kw">if</span> !notification.isRead {
                <span class="ty">Circle</span>().fill(<span class="ty">Color</span>.blue)
                    .frame(width: <span class="nu">8</span>, height: <span class="nu">8</span>)
                    .padding(.top, <span class="nu">6</span>)
            }
        }
        .padding(<span class="nu">14</span>)
    }
}`
  },
  {
    id: 51, category: "layout", icon: "⚙️",
    title: "Settings Section",
    desc: "Grouped settings list with toggle, navigation, and info rows — reusable across apps.",
    tags: ["Settings", "Preferences", "List", "Toggle"],
    preview: `<div class="ios-canvas" style="padding:10px;background:#f2f2f7;gap:8px;flex-direction:column"><div style="background:#fff;border-radius:12px;overflow:hidden;width:100%"><div style="padding:7px 14px;font-size:11px;font-weight:600;color:#8e8e93;text-transform:uppercase;letter-spacing:0.4px;background:#f2f2f7">Account</div><div style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f2f2f7"><span style="width:28px;height:28px;border-radius:6px;background:#007aff;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">👤</span><div style="flex:1;font-size:14px;color:#1c1c1e">Profile</div><div style="font-size:14px;color:#c7c7cc">›</div></div><div style="padding:12px 14px;display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:6px;background:#ff9500;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🔔</span><div style="flex:1;font-size:14px;color:#1c1c1e">Notifications</div><div style="width:40px;height:24px;border-radius:12px;background:#34c759;position:relative"><div style="width:20px;height:20px;border-radius:10px;background:#fff;position:absolute;top:2px;right:2px;box-shadow:0 1px 3px rgba(0,0,0,0.2)"></div></div></div></div><div style="background:#fff;border-radius:12px;overflow:hidden;width:100%"><div style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f2f2f7"><span style="width:28px;height:28px;border-radius:6px;background:#ff3b30;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🔒</span><div style="flex:1;font-size:14px;color:#1c1c1e">Privacy</div><div style="font-size:14px;color:#c7c7cc">›</div></div><div style="padding:12px 14px;display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:6px;background:#8e8e93;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">ℹ️</span><div style="flex:1;font-size:14px;color:#1c1c1e">Version</div><div style="font-size:13px;color:#8e8e93">2.0.1</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SettingsSection</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> notificationsOn = <span class="kw">true</span>
    <span class="pa">@State</span> <span class="kw">private var</span> faceIDOn = <span class="kw">true</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">List</span> {
            <span class="ty">Section</span>(<span class="st">"Account"</span>) {
                <span class="ty">SettingsNavRow</span>(icon: <span class="st">"person.fill"</span>, color: .blue, label: <span class="st">"Profile"</span>)
                <span class="ty">SettingsToggleRow</span>(icon: <span class="st">"bell.fill"</span>, color: .orange,
                                   label: <span class="st">"Notifications"</span>, value: $notificationsOn)
            }
            <span class="ty">Section</span>(<span class="st">"Privacy"</span>) {
                <span class="ty">SettingsNavRow</span>(icon: <span class="st">"lock.fill"</span>, color: .red, label: <span class="st">"Privacy"</span>)
                <span class="ty">SettingsToggleRow</span>(icon: <span class="st">"faceid"</span>, color: .green,
                                   label: <span class="st">"Face ID"</span>, value: $faceIDOn)
            }
            <span class="ty">Section</span> {
                <span class="ty">SettingsInfoRow</span>(icon: <span class="st">"info.circle.fill"</span>, color: .secondary,
                                  label: <span class="st">"Version"</span>, value: <span class="st">"2.0.1"</span>)
            }
        }
        .listStyle(.insetGrouped)
    }
}

<span class="kw">struct</span> <span class="ty">SettingsNavRow</span>: <span class="ty">View</span> {
    <span class="kw">let</span> icon: <span class="ty">String</span>; <span class="kw">let</span> color: <span class="ty">Color</span>; <span class="kw">let</span> label: <span class="ty">String</span>
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationLink</span> {
            <span class="ty">Text</span>(label)
        } label: {
            <span class="ty">Label</span>(label, systemImage: icon).labelStyle(.iconOnly)
                .imageScale(.medium).padding(<span class="nu">6</span>)
                .background(color).foregroundColor(.white).cornerRadius(<span class="nu">7</span>)
            <span class="ty">Text</span>(label)
        }
    }
}`
  },

  // ── NAVIGATION (more) ─────────────────────────────────────────────────
  {
    id: 52, category: "navigation", icon: "🪟",
    title: "NavigationSplitView",
    desc: "Three-column or two-column adaptive sidebar layout for iPad and Mac.",
    tags: ["SplitView", "Sidebar", "iPad", "Mac"],
    preview: `<div class="ios-canvas" style="padding:0;background:#f5f5f5;overflow:hidden;border-radius:8px"><div style="display:flex;height:170px;width:100%"><div style="width:110px;background:#f2f2f7;border-right:1px solid #e5e5ea;display:flex;flex-direction:column"><div style="padding:12px 10px;font-size:11px;font-weight:700;color:#1c1c1e;border-bottom:1px solid #e5e5ea">LIBRARY</div><div style="padding:9px 10px;font-size:12px;color:#007aff;font-weight:500;background:rgba(0,122,255,0.08);display:flex;align-items:center;gap:6px"><span>📱</span>Controls</div><div style="padding:9px 10px;font-size:12px;color:#1c1c1e;display:flex;align-items:center;gap:6px"><span>🎨</span>Styling</div><div style="padding:9px 10px;font-size:12px;color:#1c1c1e;display:flex;align-items:center;gap:6px"><span>🔀</span>Animation</div></div><div style="flex:1;display:flex;flex-direction:column"><div style="padding:10px 12px;font-size:11px;font-weight:700;color:#1c1c1e;border-bottom:1px solid #e5e5ea">CONTROLS</div><div style="padding:8px 12px;font-size:12px;color:#007aff;font-weight:500;border-bottom:1px solid #f2f2f7">Button Styles</div><div style="padding:8px 12px;font-size:12px;color:#1c1c1e;border-bottom:1px solid #f2f2f7">Toggle</div><div style="padding:8px 12px;font-size:12px;color:#1c1c1e">Slider</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">SidebarApp</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> selectedCategory: <span class="ty">Category</span>? = .controls
    <span class="pa">@State</span> <span class="kw">private var</span> selectedItem: <span class="ty">Item</span>?

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">NavigationSplitView</span> {
            <span class="cm">// Sidebar</span>
            <span class="ty">List</span>(<span class="ty">Category</span>.allCases, selection: $selectedCategory) { category <span class="kw">in</span>
                <span class="ty">Label</span>(category.name, systemImage: category.icon)
                    .tag(category)
            }
            .navigationTitle(<span class="st">"Library"</span>)

        } content: {
            <span class="cm">// Middle column</span>
            <span class="kw">if let</span> category = selectedCategory {
                <span class="ty">List</span>(category.items, selection: $selectedItem) { item <span class="kw">in</span>
                    <span class="ty">Text</span>(item.name).tag(item)
                }
                .navigationTitle(category.name)
            } <span class="kw">else</span> {
                <span class="ty">Text</span>(<span class="st">"Select a category"</span>).foregroundColor(.secondary)
            }

        } detail: {
            <span class="cm">// Detail</span>
            <span class="kw">if let</span> item = selectedItem {
                <span class="ty">ItemDetailView</span>(item: item)
            } <span class="kw">else</span> {
                <span class="ty">ContentUnavailableView</span>(<span class="st">"Select an item"</span>, systemImage: <span class="st">"sidebar.right"</span>)
            }
        }
        .navigationSplitViewStyle(.balanced)
    }
}`
  },

  // ── ANIMATION (more) ──────────────────────────────────────────────────
  {
    id: 53, category: "animation", icon: "✍️",
    title: "Typewriter Text Effect",
    desc: "Characters appear one-by-one with a customisable speed and optional cursor blink.",
    tags: ["Animation", "Text", "Typewriter", "Effect"],
    preview: `<div class="ios-canvas" style="background:#1c1c1e;border-radius:8px;padding:20px;flex-direction:column;gap:8px;align-items:flex-start"><div style="font-size:11px;color:#8be9fd;font-family:monospace;letter-spacing:0.5px">TYPEWRITER</div><div style="font-size:16px;font-weight:600;color:#f8f8f2;font-family:monospace;line-height:1.5">Building beautiful<br>SwiftUI components<span style="border-right:2px solid #50fa7b;margin-left:1px;animation:blink 1s infinite">  </span></div><div style="margin-top:6px;display:flex;gap:6px"><div style="width:50px;height:4px;border-radius:2px;background:#50fa7b;opacity:0.4"></div><div style="width:30px;height:4px;border-radius:2px;background:#50fa7b;opacity:0.2"></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">TypewriterText</span>: <span class="ty">View</span> {
    <span class="kw">let</span> fullText: <span class="ty">String</span>
    <span class="kw">var</span> speed: <span class="ty">TimeInterval</span> = <span class="nu">0.05</span>
    <span class="pa">@State</span> <span class="kw">private var</span> displayed = <span class="st">""</span>
    <span class="pa">@State</span> <span class="kw">private var</span> showCursor = <span class="kw">true</span>

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">HStack</span>(alignment: .bottom, spacing: <span class="nu">0</span>) {
            <span class="ty">Text</span>(displayed).font(.body)
            <span class="ty">Rectangle</span>()
                .frame(width: <span class="nu">2</span>, height: <span class="nu">18</span>)
                .foregroundColor(.green)
                .opacity(showCursor ? <span class="nu">1</span> : <span class="nu">0</span>)
        }
        .onAppear { <span class="fn">startTyping</span>() }
    }

    <span class="kw">private func</span> <span class="fn">startTyping</span>() {
        displayed = <span class="st">""</span>
        <span class="kw">let</span> chars = <span class="ty">Array</span>(fullText)

        <span class="ty">Task</span> {
            <span class="kw">for</span> (i, char) <span class="kw">in</span> chars.enumerated() {
                <span class="kw">try</span>? <span class="kw">await</span> <span class="ty">Task</span>.sleep(nanoseconds: <span class="ty">UInt64</span>(speed * <span class="nu">1_000_000_000</span>))
                <span class="kw">await</span> <span class="ty">MainActor</span>.run { displayed.append(char) }
            }
            <span class="cm">// Blink cursor after done</span>
            withAnimation(.easeInOut(duration: <span class="nu">0.5</span>).repeatForever()) {
                showCursor = <span class="kw">false</span>
            }
        }
    }
}

<span class="cm">// Usage</span>
<span class="ty">TypewriterText</span>(fullText: <span class="st">"Hello, SwiftUI!"</span>, speed: <span class="nu">0.06</span>)`
  },
  {
    id: 54, category: "animation", icon: "💥",
    title: "Shake Animation",
    desc: "ViewModifier that applies a horizontal shake effect — great for validation errors.",
    tags: ["Shake", "Animation", "Error", "ViewModifier"],
    preview: `<div class="ios-canvas" style="background:#f2f2f7;flex-direction:column;gap:14px"><div style="background:#fff;border-radius:10px;width:100%;padding:0;overflow:hidden;border:2px solid #ff3b30"><div style="display:flex;align-items:center;padding:10px 12px;gap:8px"><span style="font-size:14px;color:#8e8e93">📧</span><span style="font-size:13px;color:#1c1c1e">wrong@email</span></div></div><div style="display:flex;align-items:center;gap:6px;padding:0 4px"><span style="color:#ff3b30;font-size:14px">⚠️</span><span style="font-size:12px;color:#ff3b30">Please enter a valid email address</span></div><div style="background:#007aff;color:#fff;padding:11px;border-radius:10px;font-size:14px;font-weight:600;text-align:center;width:100%">Sign In</div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">ShakeModifier</span>: <span class="ty">AnimatableModifier</span> {
    <span class="kw">var</span> shakes: <span class="ty">Int</span>
    <span class="kw">var</span> animatableData: <span class="ty">Int</span> {
        <span class="kw">get</span> { shakes }
        <span class="kw">set</span> { shakes = newValue }
    }

    <span class="kw">func</span> <span class="fn">body</span>(content: <span class="ty">Content</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        content.offset(x: <span class="fn">offset</span>())
    }

    <span class="kw">private func</span> <span class="fn">offset</span>() -> <span class="ty">CGFloat</span> {
        <span class="kw">let</span> cycle = <span class="ty">Double</span>(shakes)
        <span class="kw">let</span> amplitude: <span class="ty">CGFloat</span> = <span class="nu">8</span>
        <span class="kw">return</span> amplitude * <span class="ty">CGFloat</span>(sin(cycle * .pi * <span class="nu">2</span>))
    }
}

<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">shake</span>(trigger: <span class="ty">Bool</span>) -> <span class="kw">some</span> <span class="ty">View</span> {
        modifier(<span class="ty">ShakeModifier</span>(shakes: trigger ? <span class="nu">1</span> : <span class="nu">0</span>))
            .animation(
                trigger ? .spring(response: <span class="nu">0.3</span>, dampingFraction: <span class="nu">0.3</span>).repeatCount(<span class="nu">3</span>) : .default,
                value: trigger
            )
    }
}

<span class="cm">// Usage</span>
<span class="pa">@State</span> <span class="kw">private var</span> shakeField = <span class="kw">false</span>

<span class="ty">TextField</span>(<span class="st">"Email"</span>, text: $email)
    .shake(trigger: shakeField)

<span class="ty">Button</span>(<span class="st">"Sign In"</span>) {
    <span class="kw">guard</span> <span class="fn">isValidEmail</span>(email) <span class="kw">else</span> {
        shakeField = <span class="kw">true</span>
        <span class="ty">DispatchQueue</span>.main.asyncAfter(deadline: .now() + <span class="nu">0.5</span>) { shakeField = <span class="kw">false</span> }
        <span class="kw">return</span>
    }
    <span class="fn">signIn</span>()
}`
  },
  {
    id: 55, category: "animation", icon: "🌈",
    title: "Animated Gradient Background",
    desc: "Smoothly shifting colour gradient background using animatable colour interpolation.",
    tags: ["Gradient", "Background", "Animation", "Color"],
    preview: `<div class="ios-canvas" style="padding:0;overflow:hidden;border-radius:8px"><div style="width:100%;min-height:160px;background:linear-gradient(135deg,#667eea 0%,#764ba2 30%,#f093fb 60%,#f5576c 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px"><div style="color:rgba(255,255,255,0.9);font-size:16px;font-weight:700;text-align:center;text-shadow:0 1px 4px rgba(0,0,0,0.2)">Live Gradient</div><div style="color:rgba(255,255,255,0.7);font-size:12px">Animating colours smoothly</div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">AnimatedGradientView</span>: <span class="ty">View</span> {
    <span class="pa">@State</span> <span class="kw">private var</span> start = <span class="ty">UnitPoint</span>(x: <span class="nu">0</span>, y: <span class="nu">0</span>)
    <span class="pa">@State</span> <span class="kw">private var</span> end   = <span class="ty">UnitPoint</span>(x: <span class="nu">1</span>, y: <span class="nu">1</span>)
    <span class="pa">@State</span> <span class="kw">private var</span> colorIndex = <span class="nu">0</span>

    <span class="kw">let</span> palettes: [[<span class="ty">Color</span>]] = [
        [.purple, .blue, .cyan],
        [.orange, .pink, .red],
        [.green,  .teal, .blue],
        [.yellow, .orange, .pink]
    ]

    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">LinearGradient</span>(colors: palettes[colorIndex], startPoint: start, endPoint: end)
            .ignoresSafeArea()
            .onAppear {
                withAnimation(.easeInOut(duration: <span class="nu">3</span>).repeatForever(autoreverses: <span class="kw">true</span>)) {
                    start = <span class="ty">UnitPoint</span>(x: <span class="nu">1</span>, y: <span class="nu">0</span>)
                    end   = <span class="ty">UnitPoint</span>(x: <span class="nu">0</span>, y: <span class="nu">1</span>)
                }
                <span class="ty">Timer</span>.scheduledTimer(withTimeInterval: <span class="nu">3</span>, repeats: <span class="kw">true</span>) { _ <span class="kw">in</span>
                    withAnimation(.easeInOut(duration: <span class="nu">2</span>)) {
                        colorIndex = (colorIndex + <span class="nu">1</span>) % palettes.count
                    }
                }
            }
    }
}`
  },

  // ── STYLING (more) ────────────────────────────────────────────────────
  {
    id: 56, category: "styling", icon: "🪟",
    title: "Glassmorphism Card",
    desc: "Frosted glass card with blur material, translucent border, and gradient background.",
    tags: ["Glass", "Blur", "Material", "Design"],
    preview: `<div class="ios-canvas" style="padding:0;overflow:hidden;border-radius:8px"><div style="width:100%;min-height:160px;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);position:relative;display:flex;align-items:center;justify-content:center"><div style="position:absolute;width:80px;height:80px;border-radius:40px;background:rgba(100,100,255,0.3);top:10px;left:20px;filter:blur(20px)"></div><div style="position:absolute;width:60px;height:60px;border-radius:30px;background:rgba(255,100,100,0.3);bottom:15px;right:30px;filter:blur(15px)"></div><div style="background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.18);border-radius:16px;padding:18px 22px;width:75%"><div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:6px">Premium Plan</div><div style="font-size:12px;color:rgba(255,255,255,0.7);margin-bottom:12px">All features unlocked</div><div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:7px 14px;font-size:12px;font-weight:600;color:#fff;display:inline-block">Upgrade Now</div></div></div></div>`,
    code: `<span class="kw">struct</span> <span class="ty">GlassCard</span>: <span class="ty">View</span> {
    <span class="kw">var</span> body: <span class="kw">some</span> <span class="ty">View</span> {
        <span class="ty">ZStack</span> {
            <span class="cm">// Gradient background</span>
            <span class="ty">LinearGradient</span>(
                colors: [<span class="ty">Color</span>(hex: <span class="st">"1a1a2e"</span>), <span class="ty">Color</span>(hex: <span class="st">"0f3460"</span>)],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )

            <span class="cm">// Blurred blobs</span>
            <span class="ty">Circle</span>().fill(<span class="ty">Color</span>.blue.opacity(<span class="nu">0.3</span>))
                .frame(width: <span class="nu">120</span>).blur(radius: <span class="nu">40</span>).offset(x: -<span class="nu">60</span>, y: -<span class="nu">40</span>)
            <span class="ty">Circle</span>().fill(<span class="ty">Color</span>.pink.opacity(<span class="nu">0.3</span>))
                .frame(width: <span class="nu">100</span>).blur(radius: <span class="nu">30</span>).offset(x: <span class="nu">70</span>, y: <span class="nu">60</span>)

            <span class="cm">// Glass card</span>
            <span class="ty">VStack</span>(alignment: .leading, spacing: <span class="nu">12</span>) {
                <span class="ty">HStack</span> {
                    <span class="ty">Image</span>(systemName: <span class="st">"star.fill"</span>).foregroundColor(.yellow)
                    <span class="ty">Text</span>(<span class="st">"Premium"</span>).fontWeight(.bold).foregroundColor(.white)
                }
                <span class="ty">Text</span>(<span class="st">"Unlock all features and remove ads."</span>)
                    .font(.subheadline).foregroundColor(.white.opacity(<span class="nu">0.8</span>))
                <span class="ty">Button</span>(<span class="st">"Upgrade Now"</span>) {}
                    .padding(.horizontal, <span class="nu">16</span>).padding(.vertical, <span class="nu">8</span>)
                    .background(.white.opacity(<span class="nu">0.2</span>))
                    .foregroundColor(.white).cornerRadius(<span class="nu">10</span>)
            }
            .padding(<span class="nu">20</span>)
            .background(.ultraThinMaterial)
            .cornerRadius(<span class="nu">20</span>)
            .overlay(
                <span class="ty">RoundedRectangle</span>(cornerRadius: <span class="nu">20</span>)
                    .stroke(.white.opacity(<span class="nu">0.2</span>), lineWidth: <span class="nu">1</span>)
            )
            .padding(<span class="nu">32</span>)
        }
        .cornerRadius(<span class="nu">20</span>)
    }
}`
  },
  {
    id: 57, category: "styling", icon: "🌈",
    title: "Gradient Text",
    desc: "Text with a linear gradient fill using mask and background-clip technique.",
    tags: ["Gradient", "Text", "Color", "Typography"],
    preview: `<div class="ios-canvas" style="background:#1c1c1e;flex-direction:column;gap:10px;align-items:flex-start;padding:20px"><div style="font-size:24px;font-weight:800;background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.5px">SwiftUI Magic</div><div style="font-size:16px;font-weight:700;background:linear-gradient(135deg,#f093fb,#f5576c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Design System</div><div style="font-size:14px;font-weight:600;background:linear-gradient(135deg,#4facfe,#00f2fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Build beautiful apps</div></div>`,
    code: `<span class="kw">extension</span> <span class="ty">View</span> {
    <span class="kw">func</span> <span class="fn">gradientForeground</span>(colors: [<span class="ty">Color</span>], startPoint: <span class="ty">UnitPoint</span> = .leading, endPoint: <span class="ty">UnitPoint</span> = .trailing) -> <span class="kw">some</span> <span class="ty">View</span> {
        <span class="kw">self</span>.overlay(
            <span class="ty">LinearGradient</span>(colors: colors, startPoint: startPoint, endPoint: endPoint)
        )
        .mask(<span class="kw">self</span>)
    }
}

<span class="cm">// Usage</span>
<span class="ty">Text</span>(<span class="st">"SwiftUI Magic"</span>)
    .font(.largeTitle).fontWeight(.bold)
    .gradientForeground(
        colors: [.purple, .blue, .cyan],
        startPoint: .leading,
        endPoint: .trailing
    )

<span class="ty">Text</span>(<span class="st">"Design System"</span>)
    .font(.title).fontWeight(.bold)
    .gradientForeground(colors: [.pink, .red])

<span class="cm">// iOS 17+ — direct gradient fill</span>
<span class="ty">Text</span>(<span class="st">"Modern Approach"</span>)
    .foregroundStyle(
        <span class="ty">LinearGradient</span>(
            colors: [.blue, .purple],
            startPoint: .leading,
            endPoint: .trailing
        )
    )`
  }
];
