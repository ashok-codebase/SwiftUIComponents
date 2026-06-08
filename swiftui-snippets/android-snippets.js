const ANDROID_SNIPPETS = [
  // ── LAYOUT ──────────────────────────────────────────────────────────
  {
    id: 101, category: "layout", icon: "⬛",
    title: "Row & Column",
    desc: "Vertical Column and horizontal Row composables with Arrangement spacing.",
    tags: ["Row", "Column", "Arrangement"],
    preview: `<div class="android-canvas"><div style="display:flex;flex-direction:column;gap:10px;max-width:260px;width:100%"><div style="font-size:16px;font-weight:500;color:#1C1B1F;letter-spacing:0.15px">Title</div><div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px">⭐</span><div style="font-size:14px;color:#1C1B1F">Starred item</div><div style="flex:1"></div><div style="font-size:12px;color:#49454F">4.9</div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">StackExample</span>() {
    <span class="ty">Column</span>(
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp),
        modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp)
    ) {
        <span class="ty">Text</span>(
            text = <span class="st">"Title"</span>,
            style = <span class="ty">MaterialTheme</span>.typography.headlineSmall
        )
        <span class="ty">Row</span>(
            horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp),
            verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
        ) {
            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Star, contentDescription = <span class="kw">null</span>)
            <span class="ty">Text</span>(<span class="st">"Starred item"</span>)
            <span class="ty">Spacer</span>(modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>))
            <span class="ty">Text</span>(
                text = <span class="st">"4.9"</span>,
                color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant
            )
        }
    }
}`
  },
  {
    id: 102, category: "layout", icon: "⬛",
    title: "LazyVerticalGrid",
    desc: "Adaptive lazy grid that renders items on demand as they scroll into view.",
    tags: ["LazyVerticalGrid", "GridCells", "Adaptive"],
    preview: `<div class="android-canvas"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%"><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">1</div><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">2</div><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">3</div><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">4</div><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">5</div><div style="background:rgba(103,80,164,0.15);border-radius:12px;height:52px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#6750A4">6</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">GridExample</span>() {
    <span class="ty">LazyVerticalGrid</span>(
        columns = <span class="ty">GridCells</span>.Adaptive(minSize = <span class="nu">120</span>.dp),
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp),
        horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp),
        contentPadding = <span class="ty">PaddingValues</span>(<span class="nu">16</span>.dp)
    ) {
        items(<span class="nu">20</span>) { i ->
            <span class="ty">Box</span>(
                contentAlignment = <span class="ty">Alignment</span>.Center,
                modifier = <span class="ty">Modifier</span>
                    .background(
                        <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer,
                        <span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp)
                    )
                    .height(<span class="nu">100</span>.dp)
            ) {
                <span class="ty">Text</span>(<span class="st">"$i"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
            }
        }
    }
}`
  },
  {
    id: 103, category: "layout", icon: "⬛",
    title: "Box Overlay",
    desc: "Layer composables on top of each other with Box for overlay and gradient effects.",
    tags: ["Box", "Overlay", "Brush", "Gradient"],
    preview: `<div class="android-canvas" style="padding:12px"><div style="position:relative;width:100%;height:130px;border-radius:16px;overflow:hidden"><div style="position:absolute;inset:0;background:linear-gradient(135deg,#667eea,#764ba2)"></div><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)"></div><div style="position:absolute;bottom:10px;left:12px"><div style="font-size:15px;font-weight:500;color:#fff">Grand Canyon</div><div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:2px">Arizona, USA</div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">OverlayCard</span>() {
    <span class="ty">Box</span>(
        modifier = <span class="ty">Modifier</span>
            .fillMaxWidth()
            .height(<span class="nu">220</span>.dp)
            .clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">16</span>.dp))
    ) {
        <span class="ty">Image</span>(
            painter = painterResource(<span class="ty">R</span>.drawable.landscape),
            contentDescription = <span class="kw">null</span>,
            contentScale = <span class="ty">ContentScale</span>.Crop,
            modifier = <span class="ty">Modifier</span>.fillMaxSize()
        )
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>
                .fillMaxSize()
                .background(
                    <span class="ty">Brush</span>.verticalGradient(
                        colors = listOf(
                            <span class="ty">Color</span>.Transparent,
                            <span class="ty">Color</span>.Black.copy(alpha = <span class="nu">0.7f</span>)
                        )
                    )
                )
        )
        <span class="ty">Column</span>(
            modifier = <span class="ty">Modifier</span>.align(<span class="ty">Alignment</span>.BottomStart).padding(<span class="nu">16</span>.dp)
        ) {
            <span class="ty">Text</span>(<span class="st">"Grand Canyon"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium, color = <span class="ty">Color</span>.White)
            <span class="ty">Text</span>(<span class="st">"Arizona, USA"</span>, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium, color = <span class="ty">Color</span>.White.copy(alpha = <span class="nu">0.8f</span>))
        }
    }
}`
  },
  {
    id: 104, category: "layout", icon: "⬛",
    title: "BoxWithConstraints",
    desc: "Read parent constraints to build dynamic, size-aware layouts in Compose.",
    tags: ["BoxWithConstraints", "Dynamic", "Constraints"],
    preview: `<div class="android-canvas" style="padding:16px"><div style="display:flex;width:100%;height:52px;border-radius:12px;overflow:hidden"><div style="background:#6750A4;flex:0 0 60%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:600">60%</div><div style="background:#FF9800;flex:1;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:600">40%</div></div><div style="font-size:11px;color:#49454F;margin-top:8px;text-align:center">Dynamic split based on parent width</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">DynamicBanner</span>() {
    <span class="ty">BoxWithConstraints</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth()) {
        <span class="kw">val</span> totalWidth = maxWidth
        <span class="ty">Row</span>(modifier = <span class="ty">Modifier</span>.height(<span class="nu">80</span>.dp)) {
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>
                    .width(totalWidth * <span class="nu">0.6f</span>)
                    .fillMaxHeight()
                    .background(
                        <span class="ty">MaterialTheme</span>.colorScheme.primary,
                        <span class="ty">RoundedCornerShape</span>(topStart = <span class="nu">12</span>.dp, bottomStart = <span class="nu">12</span>.dp)
                    ),
                contentAlignment = <span class="ty">Alignment</span>.Center
            ) { <span class="ty">Text</span>(<span class="st">"60%"</span>, color = <span class="ty">Color</span>.White) }

            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>
                    .fillMaxSize()
                    .background(
                        <span class="ty">Color</span>(<span class="nu">0xFFFF9800</span>.toInt()),
                        <span class="ty">RoundedCornerShape</span>(topEnd = <span class="nu">12</span>.dp, bottomEnd = <span class="nu">12</span>.dp)
                    ),
                contentAlignment = <span class="ty">Alignment</span>.Center
            ) { <span class="ty">Text</span>(<span class="st">"40%"</span>, color = <span class="ty">Color</span>.White) }
        }
    }
}`
  },

  // ── CONTROLS ─────────────────────────────────────────────────────────
  {
    id: 105, category: "controls", icon: "🎛️",
    title: "Button Styles",
    desc: "Material 3 Filled, Outlined, and Text button variants with icon support.",
    tags: ["Button", "OutlinedButton", "TextButton"],
    preview: `<div class="android-canvas" style="gap:10px"><button class="md-btn filled">Tap Me</button><button class="md-btn outlined">Cancel</button><button class="md-btn textbtn">Learn More</button></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ButtonShowcase</span>() {
    <span class="ty">Column</span>(
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp),
        horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally
    ) {
        <span class="cm">// Filled — primary action</span>
        <span class="ty">Button</span>(onClick = {}) {
            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Add, contentDescription = <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">18</span>.dp))
            <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.width(<span class="nu">8</span>.dp))
            <span class="ty">Text</span>(<span class="st">"Tap Me"</span>)
        }

        <span class="cm">// Outlined — secondary action</span>
        <span class="ty">OutlinedButton</span>(onClick = {}) {
            <span class="ty">Text</span>(<span class="st">"Cancel"</span>)
        }

        <span class="cm">// Text — tertiary / low emphasis</span>
        <span class="ty">TextButton</span>(onClick = {}) {
            <span class="ty">Text</span>(<span class="st">"Learn More"</span>)
        }

        <span class="cm">// Elevated — with shadow</span>
        <span class="ty">ElevatedButton</span>(onClick = {}) {
            <span class="ty">Text</span>(<span class="st">"Elevated"</span>)
        }
    }
}`
  },
  {
    id: 106, category: "controls", icon: "🎛️",
    title: "Switch & Checkbox",
    desc: "Toggle Switch and Checkbox wired to remember state.",
    tags: ["Switch", "Checkbox", "remember", "State"],
    preview: `<div class="android-canvas" style="padding:16px;gap:10px"><div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:12px;padding:12px 14px;width:100%;box-shadow:0 1px 3px rgba(0,0,0,0.08)"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:14px">🔔</span><span style="font-size:14px;color:#1C1B1F">Notifications</span></div><div style="width:52px;height:32px;border-radius:16px;background:#6750A4;position:relative"><div style="width:24px;height:24px;border-radius:12px;background:#fff;position:absolute;top:4px;right:4px;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div></div></div><div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:12px;padding:12px 14px;width:100%;box-shadow:0 1px 3px rgba(0,0,0,0.08)"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:14px">🌙</span><span style="font-size:14px;color:#1C1B1F">Dark Mode</span></div><div style="width:52px;height:32px;border-radius:16px;background:#E7E0EC;position:relative"><div style="width:24px;height:24px;border-radius:12px;background:#49454F;position:absolute;top:4px;left:4px"></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SettingsRow</span>() {
    <span class="kw">var</span> notificationsEnabled <span class="kw">by</span> remember { mutableStateOf(<span class="kw">true</span>) }
    <span class="kw">var</span> darkModeEnabled <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Column</span>(verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
        <span class="ty">Surface</span>(tonalElevation = <span class="nu">1</span>.dp, shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp)) {
            <span class="ty">Row</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().padding(<span class="nu">16</span>.dp),
                verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
            ) {
                <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Notifications, contentDescription = <span class="kw">null</span>)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.width(<span class="nu">12</span>.dp))
                <span class="ty">Text</span>(<span class="st">"Notifications"</span>, modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>))
                <span class="ty">Switch</span>(checked = notificationsEnabled, onCheckedChange = { notificationsEnabled = it })
            }
        }

        <span class="ty">Surface</span>(tonalElevation = <span class="nu">1</span>.dp, shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp)) {
            <span class="ty">Row</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().padding(<span class="nu">16</span>.dp),
                verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
            ) {
                <span class="ty">Checkbox</span>(checked = darkModeEnabled, onCheckedChange = { darkModeEnabled = it })
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.width(<span class="nu">8</span>.dp))
                <span class="ty">Text</span>(<span class="st">"Dark Mode"</span>)
            }
        }
    }
}`
  },
  {
    id: 107, category: "controls", icon: "🎛️",
    title: "Slider & Number Input",
    desc: "Numeric input controls — Slider with value binding and range constraints.",
    tags: ["Slider", "remember", "Numeric", "State"],
    preview: `<div class="android-canvas" style="padding:16px;gap:14px"><div style="display:flex;align-items:center;width:100%;gap:8px"><span style="font-size:13px;color:#1C1B1F;white-space:nowrap">Quantity: 3</span><div style="flex:1"></div><div style="display:flex;align-items:center;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #CAC4D0"><span style="padding:6px 12px;font-size:18px;color:#6750A4">−</span><span style="padding:6px 14px;font-size:14px;font-weight:500;color:#1C1B1F;border-left:1px solid #CAC4D0;border-right:1px solid #CAC4D0">3</span><span style="padding:6px 12px;font-size:18px;color:#6750A4">+</span></div></div><div style="width:100%"><div style="font-size:13px;color:#1C1B1F;margin-bottom:6px">Brightness: 65%</div><div style="position:relative;height:4px;background:#E7E0EC;border-radius:2px;width:100%;margin-top:10px;margin-bottom:10px"><div style="height:100%;border-radius:2px;background:#6750A4;width:65%"></div><div style="width:20px;height:20px;background:#6750A4;border-radius:10px;position:absolute;top:50%;left:65%;transform:translate(-50%,-50%);box-shadow:0 1px 6px rgba(0,0,0,0.2)"></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">NumericControls</span>() {
    <span class="kw">var</span> quantity <span class="kw">by</span> remember { mutableIntStateOf(<span class="nu">1</span>) }
    <span class="kw">var</span> brightness <span class="kw">by</span> remember { mutableFloatStateOf(<span class="nu">0.5f</span>) }

    <span class="ty">Column</span>(
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">20</span>.dp),
        modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp)
    ) {
        <span class="ty">Row</span>(verticalAlignment = <span class="ty">Alignment</span>.CenterVertically) {
            <span class="ty">Text</span>(<span class="st">"Quantity: $quantity"</span>, modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>))
            <span class="ty">Row</span>(verticalAlignment = <span class="ty">Alignment</span>.CenterVertically) {
                <span class="ty">IconButton</span>(onClick = { <span class="kw">if</span> (quantity > <span class="nu">1</span>) quantity-- }) {
                    <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Remove, contentDescription = <span class="st">"Decrease"</span>)
                }
                <span class="ty">Text</span>(<span class="st">"$quantity"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
                <span class="ty">IconButton</span>(onClick = { <span class="kw">if</span> (quantity < <span class="nu">99</span>) quantity++ }) {
                    <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Add, contentDescription = <span class="st">"Increase"</span>)
                }
            }
        }

        <span class="ty">Column</span> {
            <span class="ty">Text</span>(<span class="st">"Brightness: \${(brightness * 100).toInt()}%"</span>)
            <span class="ty">Slider</span>(
                value = brightness,
                onValueChange = { brightness = it },
                valueRange = <span class="nu">0f</span>..<span class="nu">1f</span>
            )
        }
    }
}`
  },
  {
    id: 108, category: "controls", icon: "🎛️",
    title: "OutlinedTextField",
    desc: "TextField with label, placeholder, leading/trailing icons and keyboard focus.",
    tags: ["OutlinedTextField", "FocusRequester", "KeyboardOptions"],
    preview: `<div class="android-canvas" style="padding:16px"><div style="position:relative;width:100%"><div style="border:2px solid #6750A4;border-radius:4px;padding:8px 12px 8px 40px;display:flex;align-items:center;background:#fff"><span style="position:absolute;left:12px;font-size:14px;color:#6750A4">🔍</span><input placeholder="Search…" readonly style="border:none;background:none;font-size:14px;color:#1C1B1F;outline:none;width:100%;"/></div><div style="position:absolute;top:-9px;left:10px;background:#fff;padding:0 4px;font-size:12px;color:#6750A4;font-weight:500">Search</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SearchTextField</span>() {
    <span class="kw">var</span> query <span class="kw">by</span> remember { mutableStateOf(<span class="st">""</span>) }
    <span class="kw">val</span> focusRequester = remember { <span class="ty">FocusRequester</span>() }

    <span class="ty">OutlinedTextField</span>(
        value = query,
        onValueChange = { query = it },
        label = { <span class="ty">Text</span>(<span class="st">"Search"</span>) },
        placeholder = { <span class="ty">Text</span>(<span class="st">"Search…"</span>) },
        leadingIcon = {
            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Search, contentDescription = <span class="kw">null</span>)
        },
        trailingIcon = {
            <span class="kw">if</span> (query.isNotEmpty()) {
                <span class="ty">IconButton</span>(onClick = { query = <span class="st">""</span> }) {
                    <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Clear, contentDescription = <span class="st">"Clear"</span>)
                }
            }
        },
        singleLine = <span class="kw">true</span>,
        keyboardOptions = <span class="ty">KeyboardOptions</span>(imeAction = <span class="ty">ImeAction</span>.Search),
        keyboardActions = <span class="ty">KeyboardActions</span>(onSearch = { <span class="cm">/* handle */</span> }),
        modifier = <span class="ty">Modifier</span>
            .fillMaxWidth()
            .focusRequester(focusRequester)
    )
}`
  },

  // ── ANIMATION ────────────────────────────────────────────────────────
  {
    id: 109, category: "animation", icon: "✨",
    title: "Spring Animation",
    desc: "Bouncy spring animation using animateDpAsState triggered by state change.",
    tags: ["animateDpAsState", "Spring", "State"],
    preview: `<div class="android-canvas" style="padding:16px;gap:8px"><div style="width:100%;background:linear-gradient(135deg,#6750A4,#9C4ADB);border-radius:16px;height:80px;display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(255,255,255,0.8);font-weight:500">Tap to expand ↕</div><div style="font-size:11px;color:#49454F;text-align:center">spring(dampingRatio=0.4, stiffness=300)</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SpringCard</span>() {
    <span class="kw">var</span> expanded <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="kw">val</span> height <span class="kw">by</span> animateDpAsState(
        targetValue = <span class="kw">if</span> (expanded) <span class="nu">240</span>.dp <span class="kw">else</span> <span class="nu">80</span>.dp,
        animationSpec = spring(
            dampingRatio = <span class="ty">Spring</span>.DampingRatioMediumBouncy,
            stiffness = <span class="ty">Spring</span>.StiffnessLow
        ),
        label = <span class="st">"height"</span>
    )

    <span class="ty">Box</span>(
        contentAlignment = <span class="ty">Alignment</span>.Center,
        modifier = <span class="ty">Modifier</span>
            .fillMaxWidth()
            .height(height)
            .clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">16</span>.dp))
            .background(
                <span class="ty">Brush</span>.linearGradient(
                    colors = listOf(
                        <span class="ty">MaterialTheme</span>.colorScheme.primary,
                        <span class="ty">MaterialTheme</span>.colorScheme.tertiary
                    )
                )
            )
            .clickable { expanded = !expanded }
    ) {
        <span class="ty">Text</span>(
            <span class="kw">if</span> (expanded) <span class="st">"Tap to collapse"</span> <span class="kw">else</span> <span class="st">"Tap to expand"</span>,
            color = <span class="ty">Color</span>.White,
            style = <span class="ty">MaterialTheme</span>.typography.labelLarge
        )
    }
}`
  },
  {
    id: 110, category: "animation", icon: "✨",
    title: "Shimmer Loading",
    desc: "Skeleton shimmer effect using InfiniteTransition for loading placeholders.",
    tags: ["InfiniteTransition", "Shimmer", "Skeleton"],
    preview: `<div class="android-canvas" style="padding:16px"><div style="display:flex;flex-direction:column;gap:8px;width:100%"><div style="border-radius:6px;height:14px;background:linear-gradient(90deg,#E7E0EC 25%,#F3EFF7 50%,#E7E0EC 75%);background-size:200% 100%;animation:shimmer 1.4s infinite"></div><div style="border-radius:6px;height:14px;width:80%;background:linear-gradient(90deg,#E7E0EC 25%,#F3EFF7 50%,#E7E0EC 75%);background-size:200% 100%;animation:shimmer 1.4s infinite"></div><div style="border-radius:6px;height:14px;width:60%;background:linear-gradient(90deg,#E7E0EC 25%,#F3EFF7 50%,#E7E0EC 75%);background-size:200% 100%;animation:shimmer 1.4s infinite"></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ShimmerBox</span>(modifier: <span class="ty">Modifier</span> = <span class="ty">Modifier</span>) {
    <span class="kw">val</span> transition = rememberInfiniteTransition(label = <span class="st">"shimmer"</span>)
    <span class="kw">val</span> translateX <span class="kw">by</span> transition.animateFloat(
        initialValue = -<span class="nu">300f</span>, targetValue = <span class="nu">300f</span>,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = <span class="nu">1200</span>, easing = <span class="ty">LinearEasing</span>),
            repeatMode = <span class="ty">RepeatMode</span>.Restart
        ),
        label = <span class="st">"translateX"</span>
    )

    <span class="kw">val</span> shimmerBrush = <span class="ty">Brush</span>.linearGradient(
        colors = listOf(
            <span class="ty">Color</span>(<span class="nu">0xFFE7E0EC</span>.toInt()),
            <span class="ty">Color</span>(<span class="nu">0xFFF3EFF7</span>.toInt()),
            <span class="ty">Color</span>(<span class="nu">0xFFE7E0EC</span>.toInt())
        ),
        start = <span class="ty">Offset</span>(translateX, <span class="nu">0f</span>),
        end = <span class="ty">Offset</span>(translateX + <span class="nu">300f</span>, <span class="nu">0f</span>)
    )

    <span class="ty">Box</span>(modifier = modifier.background(shimmerBrush, <span class="ty">RoundedCornerShape</span>(<span class="nu">8</span>.dp)))
}

<span class="cm">// Usage</span>
<span class="ty">Column</span>(verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
    <span class="ty">ShimmerBox</span>(<span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">20</span>.dp))
    <span class="ty">ShimmerBox</span>(<span class="ty">Modifier</span>.fillMaxWidth(<span class="nu">0.8f</span>).height(<span class="nu">20</span>.dp))
    <span class="ty">ShimmerBox</span>(<span class="ty">Modifier</span>.fillMaxWidth(<span class="nu">0.6f</span>).height(<span class="nu">20</span>.dp))
}`
  },
  {
    id: 111, category: "animation", icon: "✨",
    title: "AnimatedVisibility",
    desc: "Enter/exit transitions — fade, slide, expand — via AnimatedVisibility.",
    tags: ["AnimatedVisibility", "EnterTransition", "ExitTransition"],
    preview: `<div class="android-canvas" style="gap:16px"><div style="display:flex;align-items:center;gap:16px;width:100%;justify-content:center"><div style="width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,#6750A4,#9C4ADB)"></div><span style="font-size:22px;color:#49454F">→</span><div style="width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#6750A4,#9C4ADB)"></div></div><div style="font-size:11px;color:#49454F;text-align:center">AnimatedVisibility + expandIn/shrinkOut</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">HeroTransition</span>() {
    <span class="kw">var</span> isExpanded <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Box</span>(
        modifier = <span class="ty">Modifier</span>
            .clickable { isExpanded = !isExpanded }
            .padding(<span class="nu">16</span>.dp),
        contentAlignment = <span class="ty">Alignment</span>.Center
    ) {
        <span class="ty">AnimatedVisibility</span>(
            visible = !isExpanded,
            enter = expandIn() + fadeIn(),
            exit = shrinkOut() + fadeOut()
        ) {
            <span class="ty">Box</span>(
                <span class="ty">Modifier</span>.size(<span class="nu">80</span>.dp).clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp))
                    .background(<span class="ty">MaterialTheme</span>.colorScheme.primary)
            )
        }

        <span class="ty">AnimatedVisibility</span>(
            visible = isExpanded,
            enter = expandIn(expandFrom = <span class="ty">Alignment</span>.Center) + fadeIn(),
            exit = shrinkOut(shrinkTowards = <span class="ty">Alignment</span>.Center) + fadeOut()
        ) {
            <span class="ty">Box</span>(
                <span class="ty">Modifier</span>.size(<span class="nu">200</span>.dp).clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">20</span>.dp))
                    .background(<span class="ty">MaterialTheme</span>.colorScheme.primary)
            )
        }
    }
}`
  },
  {
    id: 112, category: "animation", icon: "✨",
    title: "Infinite Rotation",
    desc: "Continuous rotation animation using rememberInfiniteTransition.",
    tags: ["InfiniteTransition", "Rotation", "Loader"],
    preview: `<div class="android-canvas" style="gap:12px"><div class="p-spinner" style="border-top-color:#6750A4;border-right-color:#9C4ADB"></div><div style="font-size:11px;color:#49454F">Custom arc spinner</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SpinnerView</span>() {
    <span class="kw">val</span> transition = rememberInfiniteTransition(label = <span class="st">"rotation"</span>)
    <span class="kw">val</span> angle <span class="kw">by</span> transition.animateFloat(
        initialValue = <span class="nu">0f</span>, targetValue = <span class="nu">360f</span>,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = <span class="nu">1000</span>, easing = <span class="ty">LinearEasing</span>),
            repeatMode = <span class="ty">RepeatMode</span>.Restart
        ),
        label = <span class="st">"angle"</span>
    )

    <span class="ty">Canvas</span>(modifier = <span class="ty">Modifier</span>.size(<span class="nu">44</span>.dp).rotate(angle)) {
        drawArc(
            brush = <span class="ty">Brush</span>.sweepGradient(
                colors = listOf(<span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF9C4ADB</span>.toInt()))
            ),
            startAngle = <span class="nu">36f</span>,
            sweepAngle = <span class="nu">288f</span>,
            useCenter = <span class="kw">false</span>,
            style = <span class="ty">Stroke</span>(width = <span class="nu">4</span>.dp.toPx(), cap = <span class="ty">StrokeCap</span>.Round)
        )
    }
}`
  },

  // ── NAVIGATION ───────────────────────────────────────────────────────
  {
    id: 113, category: "navigation", icon: "🗺️",
    title: "NavHost & NavController",
    desc: "Type-safe navigation graph with NavHost, NavController and routes.",
    tags: ["NavHost", "NavController", "Composable"],
    preview: `<div class="android-canvas" style="padding:0;align-items:stretch"><div style="background:#FFFBFE;border-radius:10px;overflow:hidden;border:1px solid #CAC4D0;width:100%"><div style="background:#F7F2FA;border-bottom:1px solid #CAC4D0;padding:10px 14px;display:flex;align-items:center;justify-content:space-between"><span style="font-size:15px;font-weight:500;color:#1C1B1F">Home</span><span style="font-size:13px;color:#6750A4">Back</span></div><div style="padding:10px 14px;border-bottom:1px solid #F7F2FA;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#1C1B1F">Item 1<span style="color:#CAC4D0;font-size:11px">›</span></div><div style="padding:10px 14px;border-bottom:1px solid #F7F2FA;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#1C1B1F">Item 2<span style="color:#CAC4D0;font-size:11px">›</span></div><div style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#1C1B1F">Item 3<span style="color:#CAC4D0;font-size:11px">›</span></div></div></div>`,
    code: `<span class="kw">sealed class</span> <span class="ty">Screen</span>(val route: <span class="ty">String</span>) {
    <span class="kw">data object</span> <span class="ty">Home</span>   : <span class="ty">Screen</span>(<span class="st">"home"</span>)
    <span class="kw">data object</span> <span class="ty">Detail</span> : <span class="ty">Screen</span>(<span class="st">"detail/{id}"</span>) {
        <span class="kw">fun</span> <span class="fn">route</span>(id: <span class="ty">Int</span>) = <span class="st">"detail/$id"</span>
    }
}

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">AppNavGraph</span>() {
    <span class="kw">val</span> navController = rememberNavController()

    <span class="ty">NavHost</span>(navController = navController, startDestination = <span class="ty">Screen</span>.Home.route) {
        composable(<span class="ty">Screen</span>.Home.route) {
            <span class="ty">HomeScreen</span>(
                onItemClick = { id -> navController.navigate(<span class="ty">Screen</span>.Detail.route(id)) }
            )
        }
        composable(
            route = <span class="ty">Screen</span>.Detail.route,
            arguments = listOf(navArgument(<span class="st">"id"</span>) { type = <span class="ty">NavType</span>.IntType })
        ) { backStackEntry ->
            <span class="kw">val</span> id = backStackEntry.arguments?.getInt(<span class="st">"id"</span>) ?: <span class="kw">return</span><span class="pa">@composable</span>
            <span class="ty">DetailScreen</span>(id = id, onBack = { navController.navigateUp() })
        }
    }
}`
  },
  {
    id: 114, category: "navigation", icon: "🗺️",
    title: "NavigationBar",
    desc: "Material 3 bottom NavigationBar with icons, labels and badge support.",
    tags: ["NavigationBar", "NavigationBarItem", "Badge"],
    preview: `<div class="android-canvas" style="padding:0;gap:0;align-items:stretch"><div style="background:#FFFBFE;padding:20px 16px;flex:1;display:flex;align-items:center;justify-content:center"><div style="font-size:12px;color:#49454F">Home Content</div></div><div style="display:flex;border-top:1px solid #CAC4D0;background:#F7F2FA;width:100%"><div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;gap:2px;font-size:9px;color:#6750A4"><div style="width:64px;height:32px;border-radius:16px;background:#EADDFF;display:flex;align-items:center;justify-content:center">🏠</div>Home</div><div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;gap:2px;font-size:9px;color:#49454F"><span style="font-size:20px">🔍</span>Search</div><div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;gap:2px;font-size:9px;color:#49454F;position:relative"><span style="font-size:20px">✉️</span><span style="position:absolute;top:2px;right:14px;background:#B3261E;color:#fff;border-radius:10px;font-size:9px;padding:1px 5px;font-weight:700">3</span>Inbox</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">AppBottomBar</span>() {
    <span class="kw">var</span> selectedTab <span class="kw">by</span> remember { mutableIntStateOf(<span class="nu">0</span>) }

    <span class="kw">val</span> tabs = listOf(
        <span class="ty">Triple</span>(<span class="st">"Home"</span>,   <span class="ty">Icons</span>.Default.Home,         <span class="kw">null</span>),
        <span class="ty">Triple</span>(<span class="st">"Search"</span>, <span class="ty">Icons</span>.Default.Search,       <span class="kw">null</span>),
        <span class="ty">Triple</span>(<span class="st">"Inbox"</span>,  <span class="ty">Icons</span>.Default.Email,        <span class="nu">3</span>)
    )

    <span class="ty">NavigationBar</span> {
        tabs.forEachIndexed { index, (label, icon, badge) ->
            <span class="ty">NavigationBarItem</span>(
                selected = selectedTab == index,
                onClick = { selectedTab = index },
                label = { <span class="ty">Text</span>(label) },
                icon = {
                    <span class="ty">BadgedBox</span>(
                        badge = {
                            <span class="kw">if</span> (badge != <span class="kw">null</span>) {
                                <span class="ty">Badge</span> { <span class="ty">Text</span>(<span class="st">"$badge"</span>) }
                            }
                        }
                    ) {
                        <span class="ty">Icon</span>(icon, contentDescription = label)
                    }
                }
            )
        }
    }
}`
  },
  {
    id: 115, category: "navigation", icon: "🗺️",
    title: "ModalBottomSheet",
    desc: "Present a Modal Bottom Sheet with content and drag-to-dismiss support.",
    tags: ["ModalBottomSheet", "SheetState", "rememberModalBottomSheetState"],
    preview: `<div class="android-canvas" style="padding:0;gap:0;align-items:stretch"><div style="background:#F6F0FF;flex:1;display:flex;align-items:flex-end"><div style="background:#FFFBFE;border-radius:16px 16px 0 0;width:100%;padding:0 0 12px"><div style="display:flex;justify-content:center;padding:8px"><div style="width:32px;height:4px;background:#CAC4D0;border-radius:2px"></div></div><div style="padding:4px 16px 12px"><div style="font-size:15px;font-weight:500;color:#1C1B1F;margin-bottom:6px">Sheet Content</div><div style="font-size:12px;color:#49454F">SheetValue.Expanded / PartiallyExpanded</div></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">BottomSheetExample</span>() {
    <span class="kw">var</span> showSheet <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }
    <span class="kw">val</span> sheetState = rememberModalBottomSheetState(
        skipPartiallyExpanded = <span class="kw">false</span>
    )

    <span class="ty">Button</span>(onClick = { showSheet = <span class="kw">true</span> }) {
        <span class="ty">Text</span>(<span class="st">"Open Sheet"</span>)
    }

    <span class="kw">if</span> (showSheet) {
        <span class="ty">ModalBottomSheet</span>(
            onDismissRequest = { showSheet = <span class="kw">false</span> },
            sheetState = sheetState
        ) {
            <span class="ty">Column</span>(
                modifier = <span class="ty">Modifier</span>
                    .fillMaxWidth()
                    .padding(horizontal = <span class="nu">24</span>.dp)
                    .navigationBarsPadding()
            ) {
                <span class="ty">Text</span>(
                    <span class="st">"Sheet Content"</span>,
                    style = <span class="ty">MaterialTheme</span>.typography.titleLarge
                )
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">8</span>.dp))
                <span class="ty">Text</span>(
                    <span class="st">"Drag down or tap outside to dismiss."</span>,
                    style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
                    color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant
                )
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">24</span>.dp))
            }
        }
    }
}`
  },
  {
    id: 116, category: "navigation", icon: "🗺️",
    title: "TopAppBar",
    desc: "CenterAlignedTopAppBar with navigation icon, title and action menu.",
    tags: ["TopAppBar", "CenterAligned", "DropdownMenu"],
    preview: `<div class="android-canvas" style="padding:0;align-items:stretch"><div style="background:#F7F2FA;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-radius:10px 10px 0 0;width:100%"><span style="font-size:15px;font-weight:500;color:#1C1B1F">← Edit</span><span style="font-size:15px;font-weight:500;color:#1C1B1F">Details</span><span style="font-size:18px;color:#6750A4">⋮</span></div><div style="background:#FFFBFE;flex:1;padding:16px;display:flex;align-items:center;justify-content:center"><div style="font-size:12px;color:#49454F">Content area</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">DetailScreen</span>(onBack: () -> <span class="ty">Unit</span>) {
    <span class="kw">var</span> menuExpanded <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Scaffold</span>(
        topBar = {
            <span class="ty">CenterAlignedTopAppBar</span>(
                title = { <span class="ty">Text</span>(<span class="st">"Details"</span>) },
                navigationIcon = {
                    <span class="ty">IconButton</span>(onClick = onBack) {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.AutoMirrored.Default.ArrowBack, contentDescription = <span class="st">"Back"</span>)
                    }
                },
                actions = {
                    <span class="ty">IconButton</span>(onClick = { menuExpanded = <span class="kw">true</span> }) {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.MoreVert, contentDescription = <span class="st">"More"</span>)
                    }
                    <span class="ty">DropdownMenu</span>(expanded = menuExpanded, onDismissRequest = { menuExpanded = <span class="kw">false</span> }) {
                        <span class="ty">DropdownMenuItem</span>(text = { <span class="ty">Text</span>(<span class="st">"Share"</span>) }, onClick = { menuExpanded = <span class="kw">false</span> })
                        <span class="ty">DropdownMenuItem</span>(text = { <span class="ty">Text</span>(<span class="st">"Duplicate"</span>) }, onClick = { menuExpanded = <span class="kw">false</span> })
                        <span class="ty">HorizontalDivider</span>()
                        <span class="ty">DropdownMenuItem</span>(
                            text = { <span class="ty">Text</span>(<span class="st">"Delete"</span>, color = <span class="ty">MaterialTheme</span>.colorScheme.error) },
                            onClick = {}
                        )
                    }
                }
            )
        }
    ) { padding -> <span class="ty">Box</span>(<span class="ty">Modifier</span>.padding(padding)) { <span class="cm">/* content */</span> } }
}`
  },

  // ── STYLING ──────────────────────────────────────────────────────────
  {
    id: 117, category: "styling", icon: "🎨",
    title: "Gradient Backgrounds",
    desc: "Linear, radial, and sweep gradient fills using Brush in Compose.",
    tags: ["Brush", "linearGradient", "radialGradient"],
    preview: `<div class="android-canvas" style="padding:16px"><div style="display:flex;flex-direction:column;gap:8px;width:100%"><div style="height:36px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#2563eb,#06b6d4)"></div><div style="width:80px;height:80px;border-radius:40px;background:radial-gradient(circle at center,#f97316,#ef4444);align-self:center"></div><div style="height:36px;border-radius:8px;background:conic-gradient(#ef4444,#f59e0b,#22c55e,#3b82f6,#ef4444)"></div></div><div style="display:flex;justify-content:space-around;width:100%;margin-top:6px"><span style="font-size:11px;color:#49454F">Linear</span><span style="font-size:11px;color:#49454F">Radial</span><span style="font-size:11px;color:#49454F">Sweep</span></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">GradientShowcase</span>() {
    <span class="ty">Column</span>(
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp),
        modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp)
    ) {
        <span class="cm">// Linear gradient</span>
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>
                .fillMaxWidth().height(<span class="nu">80</span>.dp)
                .clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">16</span>.dp))
                .background(
                    <span class="ty">Brush</span>.linearGradient(
                        colors = listOf(<span class="ty">Color</span>(<span class="nu">0xFF7C3AED</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF2563EB</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF06B6D4</span>.toInt()))
                    )
                )
        )

        <span class="cm">// Radial gradient</span>
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>
                .size(<span class="nu">120</span>.dp).clip(<span class="ty">CircleShape</span>)
                .background(
                    <span class="ty">Brush</span>.radialGradient(
                        colors = listOf(<span class="ty">Color</span>(<span class="nu">0xFFF97316</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFFEF4444</span>.toInt()))
                    )
                ).align(<span class="ty">Alignment</span>.CenterHorizontally)
        )

        <span class="cm">// Sweep gradient</span>
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>
                .fillMaxWidth().height(<span class="nu">60</span>.dp)
                .clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">50</span>.dp))
                .background(
                    <span class="ty">Brush</span>.sweepGradient(
                        colors = listOf(<span class="ty">Color</span>.Red, <span class="ty">Color</span>.Yellow, <span class="ty">Color</span>.Green, <span class="ty">Color</span>.Blue, <span class="ty">Color</span>.Red)
                    )
                )
        )
    }
}`
  },
  {
    id: 118, category: "styling", icon: "🎨",
    title: "Custom Modifier",
    desc: "Encapsulate reusable styling logic in a Modifier extension function.",
    tags: ["Modifier", "Extension", "Reusable"],
    preview: `<div class="android-canvas" style="padding:16px"><div style="background:#FFFBFE;border-radius:14px;padding:14px 16px;width:100%;box-shadow:0 4px 16px rgba(103,80,164,0.15),0 1px 4px rgba(0,0,0,0.06);border:1px solid rgba(103,80,164,0.12)"><div style="font-size:14px;font-weight:500;color:#1C1B1F;margin-bottom:4px">Card Title</div><div style="font-size:12px;color:#49454F">Reusable card style via cardStyle() modifier</div></div></div>`,
    code: `<span class="kw">fun</span> <span class="ty">Modifier</span>.<span class="fn">cardStyle</span>(
    color: <span class="ty">Color</span> = <span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>.toInt()),
    shape: <span class="ty">Shape</span> = <span class="ty">RoundedCornerShape</span>(<span class="nu">14</span>.dp)
): <span class="ty">Modifier</span> = this
    .shadow(elevation = <span class="nu">4</span>.dp, shape = shape)
    .background(color = <span class="ty">Color</span>.White, shape = shape)
    .border(
        width = <span class="nu">1</span>.dp,
        color = color.copy(alpha = <span class="nu">0.12f</span>),
        shape = shape
    )
    .padding(<span class="nu">16</span>.dp)

<span class="kw">fun</span> <span class="ty">Modifier</span>.<span class="fn">rippleClick</span>(
    onClick: () -> <span class="ty">Unit</span>,
    shape: <span class="ty">Shape</span> = <span class="ty">RoundedCornerShape</span>(<span class="nu">8</span>.dp)
): <span class="ty">Modifier</span> = this
    .clip(shape)
    .clickable(
        interactionSource = remember { <span class="ty">MutableInteractionSource</span>() },
        indication = ripple(),
        onClick = onClick
    )

<span class="cm">// Usage</span>
<span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.cardStyle()) {
    <span class="ty">Text</span>(<span class="st">"Card Title"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
    <span class="ty">Text</span>(<span class="st">"Reusable card style"</span>, style = <span class="ty">MaterialTheme</span>.typography.bodySmall)
}`
  },
  {
    id: 119, category: "styling", icon: "🎨",
    title: "Material Icons + Colors",
    desc: "Use Material Icons with tint colors and IconButton for interactive icons.",
    tags: ["Icon", "IconButton", "Tint", "MaterialIcons"],
    preview: `<div class="android-canvas"><div style="display:flex;gap:16px;justify-content:center;align-items:center"><div style="width:48px;height:48px;border-radius:24px;background:rgba(251,191,36,0.15);display:flex;align-items:center;justify-content:center;font-size:22px">⭐</div><div style="width:48px;height:48px;border-radius:24px;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;font-size:22px">❤️</div><div style="width:48px;height:48px;border-radius:24px;background:rgba(249,115,22,0.15);display:flex;align-items:center;justify-content:center;font-size:22px">⚡</div><div style="width:48px;height:48px;border-radius:24px;background:rgba(59,130,246,0.15);display:flex;align-items:center;justify-content:center;font-size:22px">🌧️</div></div><div style="font-size:11px;color:#49454F;text-align:center">Icon with containerColor tint</div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">IconItem</span>(<span class="kw">val</span> icon: <span class="ty">ImageVector</span>, <span class="kw">val</span> tint: <span class="ty">Color</span>, <span class="kw">val</span> label: <span class="ty">String</span>)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">IconShowcase</span>() {
    <span class="kw">val</span> icons = listOf(
        <span class="ty">IconItem</span>(<span class="ty">Icons</span>.Default.Star,      <span class="ty">Color</span>(<span class="nu">0xFFFBBF24</span>.toInt()), <span class="st">"Star"</span>),
        <span class="ty">IconItem</span>(<span class="ty">Icons</span>.Default.Favorite,  <span class="ty">Color</span>(<span class="nu">0xFFEF4444</span>.toInt()), <span class="st">"Heart"</span>),
        <span class="ty">IconItem</span>(<span class="ty">Icons</span>.Default.Bolt,      <span class="ty">Color</span>(<span class="nu">0xFFF97316</span>.toInt()), <span class="st">"Bolt"</span>),
        <span class="ty">IconItem</span>(<span class="ty">Icons</span>.Default.WaterDrop, <span class="ty">Color</span>(<span class="nu">0xFF3B82F6</span>.toInt()), <span class="st">"Rain"</span>)
    )

    <span class="ty">Row</span>(
        horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp),
        verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
    ) {
        icons.forEach { item ->
            <span class="ty">FilledTonalIconButton</span>(
                onClick = {},
                colors = <span class="ty">IconButtonDefaults</span>.filledTonalIconButtonColors(
                    containerColor = item.tint.copy(alpha = <span class="nu">0.15f</span>),
                    contentColor = item.tint
                )
            ) {
                <span class="ty">Icon</span>(item.icon, contentDescription = item.label, modifier = <span class="ty">Modifier</span>.size(<span class="nu">24</span>.dp))
            }
        }
    }
}`
  },
  {
    id: 120, category: "styling", icon: "🎨",
    title: "Custom Shape (Canvas)",
    desc: "Draw custom shapes with Canvas and Path for unique clip regions.",
    tags: ["Canvas", "Path", "drawPath", "Shape"],
    preview: `<div class="android-canvas" style="padding:16px"><div class="p-wave"></div><div style="font-size:11px;color:#49454F;margin-top:8px;text-align:center">Wave drawn with Canvas + Path</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">WaveShape</span>(amplitude: <span class="ty">Float</span> = <span class="nu">20f</span>) {
    <span class="ty">Canvas</span>(
        modifier = <span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">100</span>.dp)
    ) {
        <span class="kw">val</span> path = <span class="ty">Path</span>().apply {
            moveTo(<span class="nu">0f</span>, size.height / <span class="nu">2</span>)
            <span class="kw">for</span> (x <span class="kw">in</span> <span class="nu">0</span>..size.width.toInt()) {
                <span class="kw">val</span> y = size.height / <span class="nu">2</span> + amplitude *
                    sin(x.toFloat() / size.width * <span class="ty">PI</span>.toFloat() * <span class="nu">4</span>)
                lineTo(x.toFloat(), y)
            }
            lineTo(size.width, size.height)
            lineTo(<span class="nu">0f</span>, size.height)
            close()
        }

        drawPath(
            path = path,
            brush = <span class="ty">Brush</span>.linearGradient(
                colors = listOf(
                    <span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>.toInt()),
                    <span class="ty">Color</span>(<span class="nu">0xFF9C4ADB</span>.toInt())
                )
            )
        )
    }
}

<span class="cm">// Custom clip shape</span>
<span class="kw">class</span> <span class="ty">WaveClipShape</span>(private val amplitude: <span class="ty">Float</span>) : <span class="ty">Shape</span> {
    <span class="kw">override fun</span> <span class="fn">createOutline</span>(size: <span class="ty">Size</span>, ...) = <span class="ty">Outline</span>.Generic(/* path */)
}`
  },

  // ── CONSTANTS ────────────────────────────────────────────────────────
  {
    id: 121, category: "constants", icon: "🎨",
    title: "Color Constants",
    desc: "Central AppColors object — drop into your project and use everywhere.",
    tags: ["Colors", "AppColors", "Export"],
    preview: `<div class="android-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppColors.kt</span></div><div class="p-const-line"><span class="p-const-kw">object</span> AppColors {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">val</span> primary = <span class="p-const-val">Color(0xFF6750A4)</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">val</span> accent  = <span class="p-const-val">Color(0xFF3DDC84)</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">val</span> surface = <span class="p-const-val">Color(...)</span></div><div class="p-const-line">}</div><div class="p-color-swatches"><div class="p-swatch" style="background:#6750A4"></div><div class="p-swatch" style="background:#3DDC84"></div><div class="p-swatch" style="background:#EADDFF"></div><div class="p-swatch" style="background:#FF5449"></div><div class="p-swatch" style="background:#49454F"></div><div class="p-swatch" style="background:#FFFBFE"></div></div></div><div class="p-export-badge">⬇ Drop into Android project</div></div>`,
    code: `<span class="cm">// AppColors.kt — add to your project</span>
<span class="kw">import</span> androidx.compose.ui.graphics.<span class="ty">Color</span>

<span class="kw">object</span> <span class="ty">AppColors</span> {
    <span class="cm">// ── Material 3 Brand ───────────────────────</span>
    <span class="kw">val</span> primary          = <span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>)
    <span class="kw">val</span> onPrimary        = <span class="ty">Color</span>(<span class="nu">0xFFFFFFFF</span>)
    <span class="kw">val</span> primaryContainer = <span class="ty">Color</span>(<span class="nu">0xFFEADDFF</span>)
    <span class="kw">val</span> secondary        = <span class="ty">Color</span>(<span class="nu">0xFF625B71</span>)
    <span class="kw">val</span> tertiary         = <span class="ty">Color</span>(<span class="nu">0xFF7D5260</span>)

    <span class="cm">// ── Surfaces ───────────────────────────────</span>
    <span class="kw">val</span> background      = <span class="ty">Color</span>(<span class="nu">0xFFFFFBFE</span>)
    <span class="kw">val</span> surface         = <span class="ty">Color</span>(<span class="nu">0xFFFFFBFE</span>)
    <span class="kw">val</span> surfaceVariant  = <span class="ty">Color</span>(<span class="nu">0xFFE7E0EC</span>)
    <span class="kw">val</span> surfaceContainer= <span class="ty">Color</span>(<span class="nu">0xFFF3EFF7</span>)

    <span class="cm">// ── Text ───────────────────────────────────</span>
    <span class="kw">val</span> onSurface        = <span class="ty">Color</span>(<span class="nu">0xFF1C1B1F</span>)
    <span class="kw">val</span> onSurfaceVariant = <span class="ty">Color</span>(<span class="nu">0xFF49454F</span>)
    <span class="kw">val</span> outline          = <span class="ty">Color</span>(<span class="nu">0xFF79747E</span>)

    <span class="cm">// ── Semantic ───────────────────────────────</span>
    <span class="kw">val</span> success = <span class="ty">Color</span>(<span class="nu">0xFF3DDC84</span>)   <span class="cm">// Android green</span>
    <span class="kw">val</span> warning = <span class="ty">Color</span>(<span class="nu">0xFFFFA726</span>)
    <span class="kw">val</span> error   = <span class="ty">Color</span>(<span class="nu">0xFFFF5449</span>)
    <span class="kw">val</span> info    = <span class="ty">Color</span>(<span class="nu">0xFF4FC3F7</span>)
}

<span class="cm">// Usage: Text("Hello", color = AppColors.primary)</span>
<span class="cm">// view.background(color = AppColors.surface)</span>`
  },
  {
    id: 122, category: "constants", icon: "📝",
    title: "String Constants",
    desc: "Type-safe string constants for copy, keys, and routes.",
    tags: ["Strings", "AppStrings", "Export"],
    preview: `<div class="android-canvas" style="padding:14px;align-items:flex-start"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppStrings.kt</span></div><div class="p-const-line"><span class="p-const-kw">object</span> Strings {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">object</span> Auth {</div><div class="p-const-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="p-const-kw">const val</span> signIn = <span class="p-const-str">"Sign In"</span></div><div class="p-const-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="p-const-kw">const val</span> cta = <span class="p-const-str">"Continue"</span></div><div class="p-const-line">&nbsp;&nbsp;}</div><div class="p-const-line">}</div></div><div class="p-export-badge">⬇ Drop into Android project</div></div>`,
    code: `<span class="cm">// AppStrings.kt — add to your project</span>

<span class="kw">object</span> <span class="ty">Strings</span> {

    <span class="kw">object</span> <span class="ty">General</span> {
        <span class="kw">const val</span> ok      = <span class="st">"OK"</span>
        <span class="kw">const val</span> cancel  = <span class="st">"Cancel"</span>
        <span class="kw">const val</span> save    = <span class="st">"Save"</span>
        <span class="kw">const val</span> delete  = <span class="st">"Delete"</span>
        <span class="kw">const val</span> done    = <span class="st">"Done"</span>
        <span class="kw">const val</span> loading = <span class="st">"Loading…"</span>
        <span class="kw">const val</span> retry   = <span class="st">"Try Again"</span>
    }

    <span class="kw">object</span> <span class="ty">Auth</span> {
        <span class="kw">const val</span> signIn      = <span class="st">"Sign In"</span>
        <span class="kw">const val</span> signUp      = <span class="st">"Create Account"</span>
        <span class="kw">const val</span> signOut     = <span class="st">"Sign Out"</span>
        <span class="kw">const val</span> emailHint   = <span class="st">"Enter your email"</span>
        <span class="kw">const val</span> passwordHint= <span class="st">"Enter your password"</span>
        <span class="kw">const val</span> forgotPwd   = <span class="st">"Forgot Password?"</span>
    }

    <span class="kw">object</span> <span class="ty">Errors</span> {
        <span class="kw">const val</span> generic  = <span class="st">"Something went wrong."</span>
        <span class="kw">const val</span> network  = <span class="st">"No internet connection."</span>
        <span class="kw">const val</span> timeout  = <span class="st">"Request timed out."</span>
        <span class="kw">const val</span> notFound = <span class="st">"Content not found."</span>
    }

    <span class="kw">object</span> <span class="ty">Nav</span> {
        <span class="kw">const val</span> home     = <span class="st">"Home"</span>
        <span class="kw">const val</span> search   = <span class="st">"Search"</span>
        <span class="kw">const val</span> profile  = <span class="st">"Profile"</span>
        <span class="kw">const val</span> settings = <span class="st">"Settings"</span>
    }
}

<span class="cm">// Usage: Text(Strings.Auth.signIn)</span>`
  },
  {
    id: 123, category: "constants", icon: "🔤",
    title: "Typography Constants",
    desc: "Centralised Material 3 type scale — custom or system fonts, drop-in ready.",
    tags: ["Typography", "TextStyle", "AppTypography"],
    preview: `<div class="android-canvas" style="padding:14px;align-items:flex-start;gap:5px;background:#FFFBFE"><div style="font-size:22px;font-weight:400;color:#1C1B1F;letter-spacing:-0.5px">Display · 57sp</div><div style="font-size:17px;font-weight:400;color:#1C1B1F">Headline · 32sp</div><div style="font-size:15px;font-weight:400;color:#1C1B1F">Title · 22sp</div><div style="font-size:13px;font-weight:400;color:#49454F">Body · 16sp</div><div style="font-size:11px;font-weight:400;color:#49454F">Label · 12sp</div><div class="p-export-badge" style="margin-top:4px">⬇ Drop into Android project</div></div>`,
    code: `<span class="cm">// AppTypography.kt — add to your project</span>
<span class="kw">import</span> androidx.compose.material3.<span class="ty">Typography</span>
<span class="kw">import</span> androidx.compose.ui.text.<span class="ty">TextStyle</span>
<span class="kw">import</span> androidx.compose.ui.text.font.<span class="ty">FontFamily</span>
<span class="kw">import</span> androidx.compose.ui.unit.sp

<span class="kw">val</span> <span class="ty">AppTypography</span> = <span class="ty">Typography</span>(
    displayLarge  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">57</span>.sp, lineHeight = <span class="nu">64</span>.sp),
    displayMedium = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">45</span>.sp, lineHeight = <span class="nu">52</span>.sp),
    displaySmall  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">36</span>.sp, lineHeight = <span class="nu">44</span>.sp),

    headlineLarge  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">32</span>.sp, lineHeight = <span class="nu">40</span>.sp),
    headlineMedium = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">28</span>.sp, lineHeight = <span class="nu">36</span>.sp),
    headlineSmall  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">24</span>.sp, lineHeight = <span class="nu">32</span>.sp),

    titleLarge   = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">22</span>.sp, lineHeight = <span class="nu">28</span>.sp),
    titleMedium  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">16</span>.sp, lineHeight = <span class="nu">24</span>.sp),
    titleSmall   = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">14</span>.sp, lineHeight = <span class="nu">20</span>.sp),

    bodyLarge    = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">16</span>.sp, lineHeight = <span class="nu">24</span>.sp),
    bodyMedium   = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">14</span>.sp, lineHeight = <span class="nu">20</span>.sp),
    bodySmall    = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">12</span>.sp, lineHeight = <span class="nu">16</span>.sp),

    labelLarge   = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">14</span>.sp, lineHeight = <span class="nu">20</span>.sp),
    labelMedium  = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">12</span>.sp, lineHeight = <span class="nu">16</span>.sp),
    labelSmall   = <span class="ty">TextStyle</span>(fontFamily = <span class="ty">FontFamily</span>.Default, fontSize = <span class="nu">11</span>.sp, lineHeight = <span class="nu">16</span>.sp)
)

<span class="cm">// Usage: Text("Hello", style = MaterialTheme.typography.headlineSmall)</span>`
  },
  {
    id: 124, category: "constants", icon: "📐",
    title: "Dimensions & Spacing",
    desc: "8-dp spacing grid, corner radii, icon sizes — all in one file.",
    tags: ["Dimensions", "Spacing", "AppDimens"],
    preview: `<div class="android-canvas" style="padding:14px;align-items:flex-start;background:#FFFBFE"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// 8-dp spacing grid</span></div><div class="p-const-line"><span class="p-const-kw">val</span> xs  = <span class="p-const-val">4.dp</span>&nbsp;&nbsp;<span class="p-const-comment">// 4dp</span></div><div class="p-const-line"><span class="p-const-kw">val</span> sm  = <span class="p-const-val">8.dp</span>&nbsp;&nbsp;<span class="p-const-comment">// 8dp</span></div><div class="p-const-line"><span class="p-const-kw">val</span> md  = <span class="p-const-val">16.dp</span>&nbsp;<span class="p-const-comment">// 16dp</span></div><div class="p-const-line"><span class="p-const-kw">val</span> lg  = <span class="p-const-val">24.dp</span>&nbsp;<span class="p-const-comment">// 24dp</span></div><div class="p-const-line"><span class="p-const-kw">val</span> xl  = <span class="p-const-val">32.dp</span>&nbsp;<span class="p-const-comment">// 32dp</span></div></div><div class="p-export-badge">⬇ Drop into Android project</div></div>`,
    code: `<span class="cm">// AppDimens.kt — add to your project</span>
<span class="kw">import</span> androidx.compose.ui.unit.dp

<span class="kw">object</span> <span class="ty">AppDimens</span> {

    <span class="cm">// ── Spacing (8-dp grid) ────────────────────</span>
    <span class="kw">object</span> <span class="ty">Spacing</span> {
        <span class="kw">val</span> xxs = <span class="nu">2</span>.dp
        <span class="kw">val</span> xs  = <span class="nu">4</span>.dp
        <span class="kw">val</span> sm  = <span class="nu">8</span>.dp
        <span class="kw">val</span> md  = <span class="nu">16</span>.dp
        <span class="kw">val</span> lg  = <span class="nu">24</span>.dp
        <span class="kw">val</span> xl  = <span class="nu">32</span>.dp
        <span class="kw">val</span> xxl = <span class="nu">48</span>.dp
        <span class="kw">val</span> huge= <span class="nu">64</span>.dp
    }

    <span class="cm">// ── Corner Radii ───────────────────────────</span>
    <span class="kw">object</span> <span class="ty">Radius</span> {
        <span class="kw">val</span> xs   = <span class="nu">4</span>.dp
        <span class="kw">val</span> sm   = <span class="nu">8</span>.dp
        <span class="kw">val</span> md   = <span class="nu">12</span>.dp
        <span class="kw">val</span> lg   = <span class="nu">16</span>.dp
        <span class="kw">val</span> xl   = <span class="nu">20</span>.dp
        <span class="kw">val</span> full = <span class="nu">50</span>.dp   <span class="cm">// capsule</span>
    }

    <span class="cm">// ── Icon Sizes ─────────────────────────────</span>
    <span class="kw">object</span> <span class="ty">Icon</span> {
        <span class="kw">val</span> xs  = <span class="nu">12</span>.dp
        <span class="kw">val</span> sm  = <span class="nu">16</span>.dp
        <span class="kw">val</span> md  = <span class="nu">24</span>.dp
        <span class="kw">val</span> lg  = <span class="nu">32</span>.dp
        <span class="kw">val</span> xl  = <span class="nu">48</span>.dp
    }

    <span class="cm">// ── Component Heights ──────────────────────</span>
    <span class="kw">object</span> <span class="ty">Height</span> {
        <span class="kw">val</span> button     = <span class="nu">48</span>.dp
        <span class="kw">val</span> textField  = <span class="nu">56</span>.dp
        <span class="kw">val</span> listItem   = <span class="nu">48</span>.dp
        <span class="kw">val</span> navBar     = <span class="nu">80</span>.dp
        <span class="kw">val</span> appBar     = <span class="nu">64</span>.dp
        <span class="kw">val</span> card       = <span class="nu">160</span>.dp
        <span class="kw">val</span> heroBanner = <span class="nu">220</span>.dp
    }
}

<span class="cm">// Usage</span>
<span class="cm">// .padding(AppDimens.Spacing.md)</span>
<span class="cm">// .clip(RoundedCornerShape(AppDimens.Radius.lg))</span>`
  },
  // ── LAYOUT (continued) ──────────────────────────────────────────────
  {
    id: 126, category: "layout", icon: "👤",
    title: "Profile Header",
    desc: "Cover photo, circular avatar, name, bio, follower stats and follow button.",
    tags: ["Profile", "Avatar", "Header", "Social"],
    preview: `<div class="android-canvas" style="padding:0;background:#FFFBFE;align-items:stretch"><div style="width:100%;border-radius:10px;overflow:hidden"><div style="height:72px;background:linear-gradient(135deg,#6750A4,#9C4ADB);position:relative"><div style="width:52px;height:52px;border-radius:26px;background:linear-gradient(135deg,#FF9800,#FF5449);border:3px solid #fff;position:absolute;bottom:-26px;left:14px;display:flex;align-items:center;justify-content:center;font-size:22px">👤</div><div style="position:absolute;right:12px;bottom:-18px;background:#6750A4;color:#fff;font-size:11px;font-weight:500;padding:5px 14px;border-radius:50px">Follow</div></div><div style="padding:36px 14px 14px"><div style="font-size:15px;font-weight:500;color:#1C1B1F">Sarah Johnson</div><div style="font-size:12px;color:#49454F;margin-bottom:10px">@sarahj · Android Dev</div><div style="display:flex;gap:20px"><div style="text-align:center"><div style="font-size:14px;font-weight:700;color:#1C1B1F">248</div><div style="font-size:10px;color:#49454F">Posts</div></div><div style="text-align:center"><div style="font-size:14px;font-weight:700;color:#1C1B1F">12.4k</div><div style="font-size:10px;color:#49454F">Followers</div></div><div style="text-align:center"><div style="font-size:14px;font-weight:700;color:#1C1B1F">891</div><div style="font-size:10px;color:#49454F">Following</div></div></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ProfileHeader</span>(name: <span class="ty">String</span>, username: <span class="ty">String</span>, onFollow: () -> <span class="ty">Unit</span>) {
    <span class="ty">Column</span> {
        <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth()) {
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">120</span>.dp)
                    .background(<span class="ty">Brush</span>.linearGradient(
                        colors = listOf(<span class="ty">MaterialTheme</span>.colorScheme.primary, <span class="ty">MaterialTheme</span>.colorScheme.tertiary)
                    ))
            )
            <span class="ty">Row</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().align(<span class="ty">Alignment</span>.BottomStart)
                    .padding(horizontal = <span class="nu">16</span>.dp).offset(y = <span class="nu">28</span>.dp),
                horizontalArrangement = <span class="ty">Arrangement</span>.SpaceBetween,
                verticalAlignment = <span class="ty">Alignment</span>.Bottom
            ) {
                <span class="ty">Box</span>(
                    modifier = <span class="ty">Modifier</span>.size(<span class="nu">72</span>.dp).clip(<span class="ty">CircleShape</span>)
                        .background(<span class="ty">MaterialTheme</span>.colorScheme.primaryContainer)
                        .border(<span class="nu">3</span>.dp, <span class="ty">Color</span>.White, <span class="ty">CircleShape</span>),
                    contentAlignment = <span class="ty">Alignment</span>.Center
                ) {
                    <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Person, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">40</span>.dp))
                }
                <span class="ty">Button</span>(onClick = onFollow) { <span class="ty">Text</span>(<span class="st">"Follow"</span>) }
            }
        }
        <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(start = <span class="nu">16</span>.dp, end = <span class="nu">16</span>.dp, top = <span class="nu">36</span>.dp, bottom = <span class="nu">16</span>.dp)) {
            <span class="ty">Text</span>(name, style = <span class="ty">MaterialTheme</span>.typography.titleLarge)
            <span class="ty">Text</span>(<span class="st">"@$username"</span>, color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
            <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">16</span>.dp))
            <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">24</span>.dp)) {
                listOf(<span class="st">"248"</span> to <span class="st">"Posts"</span>, <span class="st">"12.4k"</span> to <span class="st">"Followers"</span>, <span class="st">"891"</span> to <span class="st">"Following"</span>).forEach { (v, l) ->
                    <span class="ty">Column</span>(horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally) {
                        <span class="ty">Text</span>(v, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
                        <span class="ty">Text</span>(l, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                            color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}`
  },
  {
    id: 127, category: "layout", icon: "📊",
    title: "Stat Card",
    desc: "Metric card with icon, value, label, and positive/negative change badge.",
    tags: ["Stats", "Metrics", "Card", "Dashboard"],
    preview: `<div class="android-canvas" style="gap:8px;flex-direction:column"><div style="background:#FFFBFE;border-radius:12px;padding:14px;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="width:32px;height:32px;border-radius:8px;background:rgba(103,80,164,0.12);display:flex;align-items:center;justify-content:center;font-size:14px">👥</div><div style="font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;background:rgba(61,220,132,0.15);color:#1a7a4a">↑ +12.4%</div></div><div style="font-size:24px;font-weight:800;color:#1C1B1F">24,891</div><div style="font-size:12px;color:#49454F;margin-top:2px">Total Users</div></div><div style="background:#FFFBFE;border-radius:12px;padding:14px;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="width:32px;height:32px;border-radius:8px;background:rgba(255,84,73,0.12);display:flex;align-items:center;justify-content:center;font-size:14px">📉</div><div style="font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;background:rgba(255,84,73,0.12);color:#B3261E">↓ -3.1%</div></div><div style="font-size:24px;font-weight:800;color:#1C1B1F">$8,240</div><div style="font-size:12px;color:#49454F;margin-top:2px">Monthly Revenue</div></div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">StatData</span>(
    <span class="kw">val</span> title: <span class="ty">String</span>, <span class="kw">val</span> value: <span class="ty">String</span>,
    <span class="kw">val</span> change: <span class="ty">String</span>, <span class="kw">val</span> isPositive: <span class="ty">Boolean</span>
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">StatCard</span>(stat: <span class="ty">StatData</span>) {
    <span class="ty">ElevatedCard</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth()) {
        <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp)) {
            <span class="ty">Row</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth(),
                horizontalArrangement = <span class="ty">Arrangement</span>.SpaceBetween,
                verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
            ) {
                <span class="ty">Surface</span>(
                    shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">8</span>.dp),
                    color = <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer,
                    modifier = <span class="ty">Modifier</span>.size(<span class="nu">36</span>.dp)
                ) {
                    <span class="ty">Box</span>(contentAlignment = <span class="ty">Alignment</span>.Center) {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Group, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">20</span>.dp))
                    }
                }
                <span class="kw">val</span> changeColor = <span class="kw">if</span> (stat.isPositive) <span class="ty">Color</span>(<span class="nu">0xFF1B873E</span>.toInt()) <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.error
                <span class="ty">Surface</span>(color = changeColor.copy(alpha = <span class="nu">0.12f</span>), shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">6</span>.dp)) {
                    <span class="ty">Text</span>(
                        text = stat.change,
                        color = changeColor,
                        style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                        modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">8</span>.dp, vertical = <span class="nu">4</span>.dp)
                    )
                }
            }
            <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">12</span>.dp))
            <span class="ty">Text</span>(stat.value, style = <span class="ty">MaterialTheme</span>.typography.headlineMedium)
            <span class="ty">Text</span>(stat.title, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
                color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
        }
    }
}`
  },
  {
    id: 128, category: "layout", icon: "📭",
    title: "Empty State View",
    desc: "Full-screen illustrated empty state with icon, title, subtitle, and action button.",
    tags: ["EmptyState", "Placeholder", "Illustration"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:10px;padding:16px"><div style="width:72px;height:72px;border-radius:36px;background:#E8DEF8;display:flex;align-items:center;justify-content:center;font-size:30px">📭</div><div style="font-size:15px;font-weight:500;color:#1C1B1F;text-align:center">No Messages Yet</div><div style="font-size:12px;color:#49454F;text-align:center;max-width:180px;line-height:1.5">When you receive messages they will appear here.</div><button class="md-btn filled" style="margin-top:4px">Start Conversation</button></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">EmptyStateView</span>(
    icon: <span class="ty">ImageVector</span>,
    title: <span class="ty">String</span>,
    subtitle: <span class="ty">String</span>,
    actionLabel: <span class="ty">String</span>,
    onAction: () -> <span class="ty">Unit</span>
) {
    <span class="ty">Column</span>(
        modifier = <span class="ty">Modifier</span>.fillMaxSize().padding(<span class="nu">32</span>.dp),
        horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally,
        verticalArrangement = <span class="ty">Arrangement</span>.Center
    ) {
        <span class="ty">Surface</span>(
            shape = <span class="ty">CircleShape</span>,
            color = <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer,
            modifier = <span class="ty">Modifier</span>.size(<span class="nu">96</span>.dp)
        ) {
            <span class="ty">Box</span>(contentAlignment = <span class="ty">Alignment</span>.Center) {
                <span class="ty">Icon</span>(icon, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">48</span>.dp),
                    tint = <span class="ty">MaterialTheme</span>.colorScheme.onPrimaryContainer)
            }
        }
        <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">24</span>.dp))
        <span class="ty">Text</span>(title, style = <span class="ty">MaterialTheme</span>.typography.titleLarge)
        <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">8</span>.dp))
        <span class="ty">Text</span>(
            text = subtitle,
            style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
            color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant,
            textAlign = <span class="ty">TextAlign</span>.Center
        )
        <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">32</span>.dp))
        <span class="ty">Button</span>(onClick = onAction) { <span class="ty">Text</span>(actionLabel) }
    }
}`
  },
  {
    id: 129, category: "layout", icon: "📰",
    title: "Article Card",
    desc: "Editorial card with cover image, category badge, title, author row, and read time.",
    tags: ["Article", "Card", "Blog", "Media"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="height:80px;background:linear-gradient(135deg,#1a1a2e,#6750A4);display:flex;align-items:flex-end;padding:10px"><span style="background:#6750A4;color:#fff;font-size:10px;font-weight:500;padding:3px 8px;border-radius:6px">Compose</span></div><div style="padding:12px 14px"><div style="font-size:13px;font-weight:500;color:#1C1B1F;line-height:1.4;margin-bottom:10px">Building Smooth Animations with Compose's Motion APIs</div><div style="display:flex;align-items:center;gap:8px"><div style="width:22px;height:22px;border-radius:11px;background:linear-gradient(135deg,#6750A4,#9C4ADB)"></div><div style="flex:1;font-size:11px;color:#49454F">Alex Kim · 5 min read</div><div style="font-size:11px;color:#49454F">3h ago</div></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ArticleCard</span>(
    title: <span class="ty">String</span>,
    category: <span class="ty">String</span>,
    author: <span class="ty">String</span>,
    readMinutes: <span class="ty">Int</span>,
    timeAgo: <span class="ty">String</span>,
    onClick: () -> <span class="ty">Unit</span>
) {
    <span class="ty">Card</span>(
        onClick = onClick,
        modifier = <span class="ty">Modifier</span>.fillMaxWidth(),
        shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp)
    ) {
        <span class="ty">Column</span> {
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">180</span>.dp)
                    .background(<span class="ty">MaterialTheme</span>.colorScheme.surfaceVariant)
            ) {
                <span class="ty">AsyncImage</span>(
                    model = imageUrl,
                    contentDescription = <span class="kw">null</span>,
                    contentScale = <span class="ty">ContentScale</span>.Crop,
                    modifier = <span class="ty">Modifier</span>.fillMaxSize()
                )
                <span class="ty">Surface</span>(
                    modifier = <span class="ty">Modifier</span>.align(<span class="ty">Alignment</span>.BottomStart).padding(<span class="nu">12</span>.dp),
                    color = <span class="ty">MaterialTheme</span>.colorScheme.primary,
                    shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">6</span>.dp)
                ) {
                    <span class="ty">Text</span>(category.uppercase(), style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                        color = <span class="ty">Color</span>.White, modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">8</span>.dp, vertical = <span class="nu">4</span>.dp))
                }
            }
            <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(<span class="nu">14</span>.dp)) {
                <span class="ty">Text</span>(title, style = <span class="ty">MaterialTheme</span>.typography.titleSmall, maxLines = <span class="nu">2</span>)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">8</span>.dp))
                <span class="ty">Row</span>(
                    verticalAlignment = <span class="ty">Alignment</span>.CenterVertically,
                    horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)
                ) {
                    <span class="ty">Text</span>(author, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                        color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant, modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>))
                    <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Schedule, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">12</span>.dp))
                    <span class="ty">Text</span>(<span class="st">"$readMinutes min"</span>, style = <span class="ty">MaterialTheme</span>.typography.labelSmall)
                }
            }
        }
    }
}`
  },
  {
    id: 130, category: "layout", icon: "🛍",
    title: "Product Card",
    desc: "E-commerce card with image, name, star rating, price, and add-to-cart button.",
    tags: ["Product", "Ecommerce", "Card", "Shop"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="height:90px;background:#F3EFF7;display:flex;align-items:center;justify-content:center;font-size:40px">🎧</div><div style="padding:12px 14px"><div style="font-size:11px;color:#49454F;margin-bottom:3px">Sony · Wireless</div><div style="font-size:13px;font-weight:500;color:#1C1B1F;margin-bottom:6px">WH-1000XM5 Headphones</div><div style="display:flex;align-items:center;gap:3px;margin-bottom:10px"><span style="color:#FF9800;font-size:12px">★★★★</span><span style="color:#CAC4D0;font-size:12px">★</span><span style="font-size:11px;color:#49454F;margin-left:2px">4.0</span></div><div style="display:flex;align-items:center;justify-content:space-between"><div><span style="font-size:16px;font-weight:700;color:#1C1B1F">$349</span><span style="font-size:11px;color:#49454F;text-decoration:line-through;margin-left:6px">$399</span></div><button class="md-btn filled" style="font-size:11px;padding:7px 12px">Add to Cart</button></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ProductCard</span>(product: <span class="ty">Product</span>) {
    <span class="kw">var</span> inCart <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Card</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth(), shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">12</span>.dp)) {
        <span class="ty">Column</span> {
            <span class="ty">AsyncImage</span>(
                model = product.imageUrl,
                contentDescription = <span class="kw">null</span>,
                contentScale = <span class="ty">ContentScale</span>.Fit,
                modifier = <span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">180</span>.dp)
                    .background(<span class="ty">MaterialTheme</span>.colorScheme.surfaceVariant)
            )
            <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(<span class="nu">14</span>.dp), verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">6</span>.dp)) {
                <span class="ty">Text</span>(product.brand, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                    color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                <span class="ty">Text</span>(product.name, style = <span class="ty">MaterialTheme</span>.typography.titleSmall, maxLines = <span class="nu">2</span>)
                <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">2</span>.dp)) {
                    repeat(<span class="nu">5</span>) { i ->
                        <span class="ty">Icon</span>(
                            imageVector = <span class="kw">if</span> (i < product.rating) <span class="ty">Icons</span>.Default.Star <span class="kw">else</span> <span class="ty">Icons</span>.Default.StarBorder,
                            contentDescription = <span class="kw">null</span>,
                            tint = <span class="ty">Color</span>(<span class="nu">0xFFFF9800</span>.toInt()),
                            modifier = <span class="ty">Modifier</span>.size(<span class="nu">14</span>.dp)
                        )
                    }
                    <span class="ty">Text</span>(<span class="st">"\${product.reviewCount} reviews"</span>,
                        style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                        color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                }
                <span class="ty">Row</span>(
                    modifier = <span class="ty">Modifier</span>.fillMaxWidth(),
                    horizontalArrangement = <span class="ty">Arrangement</span>.SpaceBetween,
                    verticalAlignment = <span class="ty">Alignment</span>.CenterVertically
                ) {
                    <span class="ty">Column</span> {
                        <span class="ty">Text</span>(<span class="st">"\$\${product.price}"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
                        product.originalPrice?.<span class="fn">let</span> {
                            <span class="ty">Text</span>(<span class="st">"\$\$it"</span>, style = <span class="ty">MaterialTheme</span>.typography.labelSmall.copy(textDecoration = <span class="ty">TextDecoration</span>.LineThrough))
                        }
                    }
                    <span class="ty">Button</span>(
                        onClick = { inCart = !inCart },
                        colors = <span class="ty">ButtonDefaults</span>.buttonColors(
                            containerColor = <span class="kw">if</span> (inCart) <span class="ty">MaterialTheme</span>.colorScheme.secondary <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.primary
                        )
                    ) { <span class="ty">Text</span>(<span class="kw">if</span> (inCart) <span class="st">"Added ✓"</span> <span class="kw">else</span> <span class="st">"Add to Cart"</span>) }
                }
            }
        }
    }
}`
  },
  {
    id: 131, category: "layout", icon: "📅",
    title: "Timeline View",
    desc: "Vertical timeline with connector lines, event dots, date stamps, and descriptions.",
    tags: ["Timeline", "Events", "History", "List"],
    preview: `<div class="android-canvas" style="padding:14px;flex-direction:column;gap:0;align-items:flex-start"><div style="display:flex;gap:12px;width:100%;margin-bottom:12px"><div style="display:flex;flex-direction:column;align-items:center"><div style="width:12px;height:12px;border-radius:6px;background:#3DDC84;margin-top:3px;flex-shrink:0"></div><div style="width:2px;flex:1;background:#CAC4D0;margin-top:4px;min-height:28px"></div></div><div style="flex:1"><div style="font-size:11px;color:#49454F">Today, 2:30 PM</div><div style="font-size:13px;font-weight:500;color:#1C1B1F">PR merged to main</div><div style="font-size:11px;color:#49454F">Compose lib v2.0</div></div></div><div style="display:flex;gap:12px;width:100%;margin-bottom:12px"><div style="display:flex;flex-direction:column;align-items:center"><div style="width:12px;height:12px;border-radius:6px;background:#6750A4;margin-top:3px;flex-shrink:0"></div><div style="width:2px;flex:1;background:#CAC4D0;margin-top:4px;min-height:28px"></div></div><div style="flex:1"><div style="font-size:11px;color:#49454F">Yesterday, 10:00 AM</div><div style="font-size:13px;font-weight:500;color:#1C1B1F">Code review done</div></div></div><div style="display:flex;gap:12px;width:100%"><div style="width:12px;height:12px;border-radius:6px;background:#FF9800;margin-top:3px;flex-shrink:0"></div><div style="flex:1"><div style="font-size:11px;color:#49454F">Mon, 9:15 AM</div><div style="font-size:13px;font-weight:500;color:#1C1B1F">Branch created</div></div></div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">TimelineEvent</span>(
    <span class="kw">val</span> title: <span class="ty">String</span>, <span class="kw">val</span> dateLabel: <span class="ty">String</span>,
    <span class="kw">val</span> color: <span class="ty">Color</span>, <span class="kw">val</span> detail: <span class="ty">String</span>? = <span class="kw">null</span>
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">TimelineView</span>(events: <span class="ty">List</span>&lt;<span class="ty">TimelineEvent</span>&gt;) {
    <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth()) {
        events.forEachIndexed { idx, event ->
            <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp)) {
                <span class="ty">Column</span>(horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally) {
                    <span class="ty">Box</span>(
                        modifier = <span class="ty">Modifier</span>.size(<span class="nu">12</span>.dp).padding(top = <span class="nu">4</span>.dp)
                            .background(event.color, <span class="ty">CircleShape</span>)
                    )
                    <span class="kw">if</span> (idx < events.lastIndex) {
                        <span class="ty">Spacer</span>(
                            modifier = <span class="ty">Modifier</span>.width(<span class="nu">2</span>.dp).weight(<span class="nu">1f</span>).padding(top = <span class="nu">4</span>.dp)
                                .background(<span class="ty">MaterialTheme</span>.colorScheme.outlineVariant)
                        )
                    }
                }
                <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(bottom = <span class="nu">20</span>.dp)) {
                    <span class="ty">Text</span>(event.dateLabel, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                        color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                    <span class="ty">Text</span>(event.title, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium)
                    event.detail?.<span class="fn">let</span> {
                        <span class="ty">Text</span>(it, style = <span class="ty">MaterialTheme</span>.typography.bodySmall,
                            color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}`
  },
  {
    id: 132, category: "layout", icon: "🔔",
    title: "Notification Row",
    desc: "Rich notification list row with app icon, title, preview text, and relative timestamp.",
    tags: ["Notification", "Row", "List", "Badge"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%"><div style="padding:12px 14px;display:flex;align-items:flex-start;gap:10px;border-bottom:1px solid #F7F2FA"><div style="width:40px;height:40px;border-radius:20px;background:linear-gradient(135deg,#6750A4,#9C4ADB);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">📱</div><div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><div style="font-size:12px;font-weight:500;color:#1C1B1F">Compose Snippets</div><div style="font-size:11px;color:#49454F">2m ago</div></div><div style="font-size:12px;font-weight:500;color:#1C1B1F;margin-bottom:2px">New component added</div><div style="font-size:11px;color:#49454F;line-height:1.4">Custom Alert Dialog is now available</div></div><div style="width:8px;height:8px;border-radius:4px;background:#6750A4;flex-shrink:0;margin-top:6px"></div></div><div style="padding:12px 14px;display:flex;align-items:flex-start;gap:10px"><div style="width:40px;height:40px;border-radius:20px;background:linear-gradient(135deg,#3DDC84,#00C853);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">✅</div><div style="flex:1"><div style="font-size:12px;font-weight:500;color:#1C1B1F;margin-bottom:2px">Build Succeeded</div><div style="font-size:11px;color:#49454F">Release build 2.0.1 passed all checks</div></div></div></div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">AppNotification</span>(
    <span class="kw">val</span> appName: <span class="ty">String</span>, <span class="kw">val</span> title: <span class="ty">String</span>,
    <span class="kw">val</span> body: <span class="ty">String</span>, <span class="kw">val</span> timeLabel: <span class="ty">String</span>,
    <span class="kw">val</span> isUnread: <span class="ty">Boolean</span> = <span class="kw">false</span>
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">NotificationRow</span>(notification: <span class="ty">AppNotification</span>) {
    <span class="ty">Row</span>(
        modifier = <span class="ty">Modifier</span>.fillMaxWidth().padding(<span class="nu">14</span>.dp),
        horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp)
    ) {
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>.size(<span class="nu">44</span>.dp).clip(<span class="ty">CircleShape</span>)
                .background(<span class="ty">MaterialTheme</span>.colorScheme.primaryContainer),
            contentAlignment = <span class="ty">Alignment</span>.Center
        ) {
            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Notifications, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="nu">24</span>.dp),
                tint = <span class="ty">MaterialTheme</span>.colorScheme.onPrimaryContainer)
        }
        <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>)) {
            <span class="ty">Row</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth(), horizontalArrangement = <span class="ty">Arrangement</span>.SpaceBetween) {
                <span class="ty">Text</span>(notification.appName, style = <span class="ty">MaterialTheme</span>.typography.labelMedium)
                <span class="ty">Text</span>(notification.timeLabel, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                    color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
            }
            <span class="ty">Text</span>(notification.title, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium, maxLines = <span class="nu">1</span>)
            <span class="ty">Text</span>(notification.body, style = <span class="ty">MaterialTheme</span>.typography.bodySmall,
                color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant, maxLines = <span class="nu">2</span>)
        }
        <span class="kw">if</span> (notification.isUnread) {
            <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.size(<span class="nu">8</span>.dp).padding(top = <span class="nu">6</span>.dp)
                .background(<span class="ty">MaterialTheme</span>.colorScheme.primary, <span class="ty">CircleShape</span>))
        }
    }
}`
  },
  {
    id: 133, category: "layout", icon: "⚙️",
    title: "Settings Section",
    desc: "Grouped settings list with toggle, navigation-link, and info rows — reusable across apps.",
    tags: ["Settings", "Preferences", "List", "Toggle"],
    preview: `<div class="android-canvas" style="padding:10px;gap:8px;flex-direction:column"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;border:1px solid #CAC4D0"><div style="padding:6px 14px;font-size:11px;font-weight:500;color:#49454F;background:#F7F2FA;letter-spacing:0.3px">ACCOUNT</div><div style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F7F2FA"><span style="width:28px;height:28px;border-radius:6px;background:#6750A4;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">👤</span><div style="flex:1;font-size:13px;color:#1C1B1F">Profile</div><div style="font-size:13px;color:#CAC4D0">›</div></div><div style="padding:12px 14px;display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:6px;background:#FF9800;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">🔔</span><div style="flex:1;font-size:13px;color:#1C1B1F">Notifications</div><div style="width:40px;height:24px;border-radius:12px;background:#6750A4;position:relative"><div style="width:18px;height:18px;border-radius:9px;background:#fff;position:absolute;top:3px;right:3px"></div></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SettingsSection</span>() {
    <span class="kw">var</span> notificationsOn <span class="kw">by</span> remember { mutableStateOf(<span class="kw">true</span>) }
    <span class="kw">var</span> biometricOn <span class="kw">by</span> remember { mutableStateOf(<span class="kw">true</span>) }

    <span class="ty">LazyColumn</span>(contentPadding = <span class="ty">PaddingValues</span>(<span class="nu">16</span>.dp), verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
        item {
            <span class="ty">Text</span>(<span class="st">"Account"</span>, style = <span class="ty">MaterialTheme</span>.typography.labelMedium,
                color = <span class="ty">MaterialTheme</span>.colorScheme.primary, modifier = <span class="ty">Modifier</span>.padding(start = <span class="nu">4</span>.dp, bottom = <span class="nu">4</span>.dp))
            <span class="ty">ElevatedCard</span> {
                <span class="ty">SettingsNavRow</span>(icon = <span class="ty">Icons</span>.Default.Person, label = <span class="st">"Profile"</span>, iconColor = <span class="ty">MaterialTheme</span>.colorScheme.primary) {}
                <span class="ty">HorizontalDivider</span>()
                <span class="ty">SettingsToggleRow</span>(icon = <span class="ty">Icons</span>.Default.Notifications, label = <span class="st">"Notifications"</span>,
                    checked = notificationsOn, onCheckedChange = { notificationsOn = it })
            }
        }
        item {
            <span class="ty">Text</span>(<span class="st">"Privacy"</span>, style = <span class="ty">MaterialTheme</span>.typography.labelMedium,
                color = <span class="ty">MaterialTheme</span>.colorScheme.primary, modifier = <span class="ty">Modifier</span>.padding(start = <span class="nu">4</span>.dp, bottom = <span class="nu">4</span>.dp))
            <span class="ty">ElevatedCard</span> {
                <span class="ty">SettingsNavRow</span>(icon = <span class="ty">Icons</span>.Default.Lock, label = <span class="st">"Privacy"</span>, iconColor = <span class="ty">MaterialTheme</span>.colorScheme.error) {}
                <span class="ty">HorizontalDivider</span>()
                <span class="ty">SettingsToggleRow</span>(icon = <span class="ty">Icons</span>.Default.Fingerprint, label = <span class="st">"Biometric Login"</span>,
                    checked = biometricOn, onCheckedChange = { biometricOn = it })
                <span class="ty">HorizontalDivider</span>()
                <span class="ty">SettingsInfoRow</span>(icon = <span class="ty">Icons</span>.Default.Info, label = <span class="st">"Version"</span>, value = <span class="st">"2.0.1"</span>)
            }
        }
    }
}`
  },

  {
    id: 125, category: "constants", icon: "⚙️",
    title: "App Constants & Config",
    desc: "BuildConfig wrappers, feature flags, environment switching — one central file.",
    tags: ["BuildConfig", "FeatureFlags", "Environment"],
    preview: `<div class="android-canvas" style="padding:14px;align-items:flex-start;background:#FFFBFE"><div class="p-const-file"><div class="p-const-line"><span class="p-const-comment">// AppConfig.kt</span></div><div class="p-const-line"><span class="p-const-kw">enum class</span> Env { DEV, STAGING, PROD }</div><div class="p-const-line" style="margin-top:4px"><span class="p-const-kw">object</span> Feature {</div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">const val</span> darkMode = <span class="p-const-val">true</span></div><div class="p-const-line">&nbsp;&nbsp;<span class="p-const-kw">const val</span> analytics = <span class="p-const-val">false</span></div><div class="p-const-line">}</div></div><div class="p-export-badge">⬇ Drop into Android project</div></div>`,
    code: `<span class="cm">// AppConfig.kt — add to your project</span>
<span class="kw">import</span> com.example.app.<span class="ty">BuildConfig</span>

<span class="kw">enum class</span> <span class="ty">AppEnvironment</span> { DEVELOPMENT, STAGING, PRODUCTION }

<span class="kw">object</span> <span class="ty">AppConfig</span> {
    <span class="kw">val</span> environment: <span class="ty">AppEnvironment</span> = <span class="kw">when</span> {
        <span class="ty">BuildConfig</span>.DEBUG            -> <span class="ty">AppEnvironment</span>.DEVELOPMENT
        <span class="ty">BuildConfig</span>.FLAVOR == <span class="st">"staging"</span> -> <span class="ty">AppEnvironment</span>.STAGING
        <span class="kw">else</span>                          -> <span class="ty">AppEnvironment</span>.PRODUCTION
    }
}

<span class="kw">object</span> <span class="ty">API</span> {
    <span class="kw">val</span> baseUrl: <span class="ty">String</span> = <span class="kw">when</span> (<span class="ty">AppConfig</span>.environment) {
        <span class="ty">AppEnvironment</span>.DEVELOPMENT  -> <span class="st">"https://dev-api.example.com"</span>
        <span class="ty">AppEnvironment</span>.STAGING      -> <span class="st">"https://staging-api.example.com"</span>
        <span class="ty">AppEnvironment</span>.PRODUCTION   -> <span class="st">"https://api.example.com"</span>
    }
    <span class="kw">const val</span> timeout = <span class="nu">30_000L</span>   <span class="cm">// ms</span>
    <span class="kw">const val</span> version = <span class="st">"v1"</span>
}

<span class="kw">object</span> <span class="ty">Feature</span> {
    <span class="kw">val</span> darkModeEnabled    = <span class="kw">true</span>
    <span class="kw">val</span> analyticsEnabled   = <span class="ty">AppConfig</span>.environment == <span class="ty">AppEnvironment</span>.PRODUCTION
    <span class="kw">val</span> biometricLogin     = <span class="kw">true</span>
    <span class="kw">val</span> pushNotifications  = <span class="kw">true</span>
    <span class="kw">val</span> onboardingV2       = <span class="kw">false</span>
}

<span class="kw">object</span> <span class="ty">PrefsKey</span> {
    <span class="kw">const val</span> hasSeenOnboarding = <span class="st">"has_seen_onboarding"</span>
    <span class="kw">const val</span> selectedTheme     = <span class="st">"selected_theme"</span>
    <span class="kw">const val</span> authToken         = <span class="st">"auth_token"</span>
    <span class="kw">const val</span> lastSyncDate      = <span class="st">"last_sync_date"</span>
}

<span class="cm">// Usage: API.baseUrl  |  Feature.analyticsEnabled</span>`
  },

  // ── CONTROLS (continued) ─────────────────────────────────────────────
  {
    id: 134, category: "controls", icon: "⚠️",
    title: "Custom Alert Dialog",
    desc: "Fully custom alert dialog with icon, message and destructive/cancel actions.",
    tags: ["AlertDialog", "Dialog", "Popup", "Modal"],
    preview: `<div class="android-canvas" style="padding:0;position:relative;min-height:180px;border-radius:8px;overflow:hidden"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.32);display:flex;align-items:center;justify-content:center"><div style="background:#FFFBFE;border-radius:28px;width:82%;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.22);padding:24px 20px 16px"><div style="text-align:center"><div style="font-size:26px;margin-bottom:12px">⚠️</div><div style="font-size:15px;font-weight:500;color:#1C1B1F;margin-bottom:8px">Delete Item?</div><div style="font-size:12px;color:#49454F;line-height:1.5">This action cannot be undone and the item will be permanently removed.</div></div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px"><div style="padding:8px 16px;font-size:13px;color:#6750A4;font-weight:500;cursor:pointer">Cancel</div><div style="padding:8px 16px;font-size:13px;font-weight:500;color:#B3261E;cursor:pointer">Delete</div></div></div></div></div>`,
    code: `<span class="kw">var</span> showDialog <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

<span class="kw">if</span> (showDialog) {
    <span class="ty">AlertDialog</span>(
        onDismissRequest = { showDialog = <span class="kw">false</span> },
        icon = {
            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Warning, <span class="kw">null</span>,
                tint = <span class="ty">MaterialTheme</span>.colorScheme.error)
        },
        title = { <span class="ty">Text</span>(<span class="st">"Delete Item?"</span>) },
        text = {
            <span class="ty">Text</span>(<span class="st">"This action cannot be undone and the item will be permanently removed."</span>)
        },
        confirmButton = {
            <span class="ty">TextButton</span>(
                onClick = { showDialog = <span class="kw">false</span>; <span class="fn">deleteItem</span>() },
                colors = <span class="ty">ButtonDefaults</span>.textButtonColors(contentColor = <span class="ty">MaterialTheme</span>.colorScheme.error)
            ) { <span class="ty">Text</span>(<span class="st">"Delete"</span>) }
        },
        dismissButton = {
            <span class="ty">TextButton</span>(onClick = { showDialog = <span class="kw">false</span> }) { <span class="ty">Text</span>(<span class="st">"Cancel"</span>) }
        }
    )
}

<span class="cm">// Usage</span>
<span class="ty">Button</span>(onClick = { showDialog = <span class="kw">true</span> }) { <span class="ty">Text</span>(<span class="st">"Delete"</span>) }`
  },
  {
    id: 135, category: "controls", icon: "💬",
    title: "Snackbar / Toast",
    desc: "Snackbar with success/error styles, action button, and auto-dismiss via SnackbarHost.",
    tags: ["Snackbar", "Toast", "Notification", "SnackbarHost"],
    preview: `<div class="android-canvas" style="align-items:flex-end;padding-bottom:12px;min-height:160px;position:relative"><div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);width:80%;font-size:12px;color:#49454F;text-align:center">Content area</div><div style="background:#1C1B1F;color:#E6E1E5;border-radius:4px;padding:12px 16px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.25);width:calc(100% - 24px)"><span style="color:#3DDC84;font-size:14px">✓</span><span style="font-size:13px;font-weight:400;flex:1">Changes saved successfully!</span><span style="font-size:13px;font-weight:500;color:#D0BCFF;cursor:pointer">Undo</span></div></div>`,
    code: `<span class="kw">enum class</span> <span class="ty">SnackbarStyle</span> { SUCCESS, ERROR, WARNING, INFO }

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">AppScaffold</span>() {
    <span class="kw">val</span> snackbarHostState = remember { <span class="ty">SnackbarHostState</span>() }
    <span class="kw">val</span> scope = rememberCoroutineScope()

    <span class="ty">Scaffold</span>(
        snackbarHost = {
            <span class="ty">SnackbarHost</span>(snackbarHostState) { data ->
                <span class="ty">Snackbar</span>(
                    snackbarData = data,
                    containerColor = <span class="ty">Color</span>(<span class="nu">0xFF1C1B1F</span>.toInt()),
                    contentColor = <span class="ty">Color</span>(<span class="nu">0xFFE6E1E5</span>.toInt()),
                    actionColor = <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer
                )
            }
        }
    ) { padding ->
        <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(padding)) {
            <span class="ty">Button</span>(onClick = {
                scope.launch {
                    snackbarHostState.showSnackbar(
                        message = <span class="st">"Changes saved!"</span>,
                        actionLabel = <span class="st">"Undo"</span>,
                        duration = <span class="ty">SnackbarDuration</span>.Short
                    )
                }
            }) { <span class="ty">Text</span>(<span class="st">"Save"</span>) }
        }
    }
}`
  },
  {
    id: 136, category: "controls", icon: "🔢",
    title: "OTP / PIN Input",
    desc: "Six-digit one-time-password field with auto-focus and visual digit boxes.",
    tags: ["OTP", "PIN", "Input", "Authentication"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:12px"><div style="font-size:13px;font-weight:500;color:#1C1B1F">Enter verification code</div><div style="display:flex;gap:8px;justify-content:center"><div style="width:40px;height:48px;border-radius:4px;border:2px solid #6750A4;background:#FFFBFE;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:500;color:#1C1B1F">4</div><div style="width:40px;height:48px;border-radius:4px;border:2px solid #6750A4;background:#FFFBFE;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:500;color:#1C1B1F">8</div><div style="width:40px;height:48px;border-radius:4px;border:2px solid #6750A4;background:#FFFBFE;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:500;color:#1C1B1F">3</div><div style="width:40px;height:48px;border-radius:4px;border:2px solid #6750A4;background:#FFFBFE;display:flex;align-items:center;justify-content:center"><div style="width:2px;height:22px;background:#6750A4;border-radius:1px"></div></div><div style="width:40px;height:48px;border-radius:4px;border:2px solid #CAC4D0;background:#FFFBFE"></div><div style="width:40px;height:48px;border-radius:4px;border:2px solid #CAC4D0;background:#FFFBFE"></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">OTPInputView</span>(
    otpLength: <span class="ty">Int</span> = <span class="nu">6</span>,
    onOtpComplete: (<span class="ty">String</span>) -> <span class="ty">Unit</span>
) {
    <span class="kw">var</span> otp <span class="kw">by</span> remember { mutableStateOf(<span class="st">""</span>) }
    <span class="kw">val</span> focusRequester = remember { <span class="ty">FocusRequester</span>() }

    <span class="ty">Box</span> {
        <span class="ty">BasicTextField</span>(
            value = otp,
            onValueChange = { <span class="kw">if</span> (it.length <= otpLength) { otp = it.filter(Char::isDigit) } },
            keyboardOptions = <span class="ty">KeyboardOptions</span>(keyboardType = <span class="ty">KeyboardType</span>.Number),
            modifier = <span class="ty">Modifier</span>.size(<span class="nu">1</span>.dp).focusRequester(focusRequester).alpha(<span class="nu">0f</span>)
        )
        <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">10</span>.dp)) {
            repeat(otpLength) { idx ->
                <span class="kw">val</span> char = otp.getOrNull(idx)
                <span class="kw">val</span> isCurrent = idx == otp.length
                <span class="ty">Box</span>(
                    modifier = <span class="ty">Modifier</span>.size(width = <span class="nu">44</span>.dp, height = <span class="nu">56</span>.dp)
                        .border(
                            width = <span class="nu">2</span>.dp,
                            color = <span class="kw">if</span> (char != <span class="kw">null</span> || isCurrent) <span class="ty">MaterialTheme</span>.colorScheme.primary
                                    <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.outline,
                            shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">4</span>.dp)
                        )
                        .clickable { focusRequester.requestFocus() },
                    contentAlignment = <span class="ty">Alignment</span>.Center
                ) {
                    <span class="kw">if</span> (char != <span class="kw">null</span>) {
                        <span class="ty">Text</span>(char.toString(), style = <span class="ty">MaterialTheme</span>.typography.titleLarge)
                    } <span class="kw">else if</span> (isCurrent) {
                        <span class="ty">Box</span>(<span class="ty">Modifier</span>.width(<span class="nu">2</span>.dp).height(<span class="nu">24</span>.dp)
                            .background(<span class="ty">MaterialTheme</span>.colorScheme.primary))
                    }
                }
            }
        }
    }
    <span class="ty">LaunchedEffect</span>(<span class="ty">Unit</span>) { focusRequester.requestFocus() }
    <span class="ty">LaunchedEffect</span>(otp) { <span class="kw">if</span> (otp.length == otpLength) onOtpComplete(otp) }
}`
  },
  {
    id: 137, category: "controls", icon: "👆",
    title: "Long-Press Context Menu",
    desc: "Long-press context menu using DropdownMenu with share, copy and delete actions.",
    tags: ["ContextMenu", "LongPress", "DropdownMenu", "Gesture"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;border:1px solid #CAC4D0"><div style="padding:12px 14px;font-size:13px;color:#1C1B1F;font-weight:500;border-bottom:1px solid #F7F2FA">Design System Tokens</div><div style="padding:12px 14px;display:flex;flex-direction:column;gap:8px"><div style="font-size:11px;color:#49454F;font-weight:500">Long press for options:</div><div style="display:flex;gap:8px;flex-wrap:wrap"><div style="display:flex;align-items:center;gap:5px;background:#F3EFF7;padding:6px 10px;border-radius:8px;font-size:12px;color:#6750A4"><span>↗</span> Share</div><div style="display:flex;align-items:center;gap:5px;background:#F3EFF7;padding:6px 10px;border-radius:8px;font-size:12px;color:#1C1B1F"><span>📋</span> Copy</div><div style="display:flex;align-items:center;gap:5px;background:#FCE8E6;padding:6px 10px;border-radius:8px;font-size:12px;color:#B3261E"><span>🗑</span> Delete</div></div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ContextMenuRow</span>(item: <span class="ty">Item</span>, onDelete: () -> <span class="ty">Unit</span>) {
    <span class="kw">var</span> expanded <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.combinedClickable(
        onClick = {},
        onLongClick = { expanded = <span class="kw">true</span> }
    )) {
        <span class="ty">ListItem</span>(
            headlineContent = { <span class="ty">Text</span>(item.title) },
            supportingContent = { <span class="ty">Text</span>(item.subtitle) }
        )
        <span class="ty">DropdownMenu</span>(expanded = expanded, onDismissRequest = { expanded = <span class="kw">false</span> }) {
            <span class="ty">DropdownMenuItem</span>(
                text = { <span class="ty">Text</span>(<span class="st">"Share"</span>) },
                leadingIcon = { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Share, <span class="kw">null</span>) },
                onClick = { expanded = <span class="kw">false</span>; <span class="fn">shareItem</span>(item) }
            )
            <span class="ty">DropdownMenuItem</span>(
                text = { <span class="ty">Text</span>(<span class="st">"Copy"</span>) },
                leadingIcon = { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.ContentCopy, <span class="kw">null</span>) },
                onClick = { expanded = <span class="kw">false</span>; <span class="fn">copyToClipboard</span>(item.title) }
            )
            <span class="ty">HorizontalDivider</span>()
            <span class="ty">DropdownMenuItem</span>(
                text = { <span class="ty">Text</span>(<span class="st">"Delete"</span>, color = <span class="ty">MaterialTheme</span>.colorScheme.error) },
                leadingIcon = { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Delete, <span class="kw">null</span>, tint = <span class="ty">MaterialTheme</span>.colorScheme.error) },
                onClick = { expanded = <span class="kw">false</span>; onDelete() }
            )
        }
    }
}`
  },
  {
    id: 138, category: "controls", icon: "↔️",
    title: "Swipe to Dismiss",
    desc: "Swipe-to-delete and swipe-to-archive list items using SwipeToDismissBox.",
    tags: ["SwipeToDismiss", "LazyColumn", "Gesture", "Delete"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;border:1px solid #CAC4D0"><div style="display:flex;align-items:center;overflow:hidden;border-bottom:1px solid #F7F2FA"><div style="background:#3DDC84;width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff;flex-shrink:0">♥</div><div style="flex:1;padding:12px 14px;font-size:13px;color:#1C1B1F">Design System</div><div style="background:#FF9800;width:54px;height:48px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:500;flex-shrink:0">Archive</div><div style="background:#B3261E;width:54px;height:48px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:500;flex-shrink:0">Delete</div></div><div style="padding:12px 14px;font-size:13px;color:#1C1B1F;border-bottom:1px solid #F7F2FA">Component Tokens</div><div style="padding:12px 14px;font-size:13px;color:#1C1B1F">Dark Mode Guide</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SwipeableList</span>() {
    <span class="kw">var</span> items <span class="kw">by</span> remember { mutableStateOf(listOf(<span class="st">"Design System"</span>, <span class="st">"Component Tokens"</span>, <span class="st">"Dark Mode"</span>)) }

    <span class="ty">LazyColumn</span> {
        items(items, key = { it }) { item ->
            <span class="kw">val</span> state = rememberSwipeToDismissBoxState(
                confirmValueChange = { value ->
                    <span class="kw">when</span> (value) {
                        <span class="ty">SwipeToDismissBoxValue</span>.EndToStart -> { items = items - item; <span class="kw">true</span> }
                        <span class="ty">SwipeToDismissBoxValue</span>.StartToEnd -> { <span class="fn">archiveItem</span>(item); <span class="kw">true</span> }
                        <span class="kw">else</span> -> <span class="kw">false</span>
                    }
                }
            )
            <span class="ty">SwipeToDismissBox</span>(
                state = state,
                backgroundContent = {
                    <span class="kw">val</span> color = <span class="kw">when</span> (state.targetValue) {
                        <span class="ty">SwipeToDismissBoxValue</span>.EndToStart -> <span class="ty">MaterialTheme</span>.colorScheme.error
                        <span class="ty">SwipeToDismissBoxValue</span>.StartToEnd -> <span class="ty">Color</span>(<span class="nu">0xFF4CAF50</span>.toInt())
                        <span class="kw">else</span> -> <span class="ty">Color</span>.Transparent
                    }
                    <span class="ty">Box</span>(<span class="ty">Modifier</span>.fillMaxSize().background(color).padding(<span class="nu">16</span>.dp),
                        contentAlignment = <span class="ty">Alignment</span>.CenterEnd) {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Delete, <span class="kw">null</span>, tint = <span class="ty">Color</span>.White)
                    }
                }
            ) {
                <span class="ty">ListItem</span>(headlineContent = { <span class="ty">Text</span>(item) },
                    modifier = <span class="ty">Modifier</span>.background(<span class="ty">MaterialTheme</span>.colorScheme.surface))
            }
            <span class="ty">HorizontalDivider</span>()
        }
    }
}`
  },
  {
    id: 139, category: "controls", icon: "🔄",
    title: "Pull to Refresh",
    desc: "Refreshable list with async loading using PullToRefreshBox.",
    tags: ["PullToRefresh", "PullToRefreshBox", "Async", "LazyColumn"],
    preview: `<div class="android-canvas" style="padding:10px"><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;width:100%;border:1px solid #CAC4D0"><div style="background:#F7F2FA;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #CAC4D0"><div style="font-size:14px;font-weight:500;color:#1C1B1F">Feed</div><div style="width:20px;height:20px;border-radius:50%;border:2px solid transparent;border-top-color:#6750A4;animation:spin 0.9s linear infinite"></div></div><div style="padding:12px 14px;font-size:13px;color:#1C1B1F;border-bottom:1px solid #F7F2FA;display:flex;align-items:center;gap:8px"><span style="color:#6750A4">📄</span>New Post</div><div style="padding:12px 14px;font-size:13px;color:#1C1B1F;border-bottom:1px solid #F7F2FA;display:flex;align-items:center;gap:8px"><span style="color:#6750A4">📄</span>Post #1</div><div style="padding:12px 14px;font-size:13px;color:#1C1B1F;display:flex;align-items:center;gap:8px"><span style="color:#6750A4">📄</span>Post #2</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">RefreshableListView</span>() {
    <span class="kw">var</span> items <span class="kw">by</span> remember { mutableStateOf(listOf(<span class="st">"Post #1"</span>, <span class="st">"Post #2"</span>, <span class="st">"Post #3"</span>)) }
    <span class="kw">var</span> isRefreshing <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }
    <span class="kw">val</span> scope = rememberCoroutineScope()

    <span class="ty">PullToRefreshBox</span>(
        isRefreshing = isRefreshing,
        onRefresh = {
            isRefreshing = <span class="kw">true</span>
            scope.launch {
                delay(<span class="nu">1500</span>)
                items = listOf(<span class="st">"New Post"</span>) + items
                isRefreshing = <span class="kw">false</span>
            }
        }
    ) {
        <span class="ty">LazyColumn</span>(modifier = <span class="ty">Modifier</span>.fillMaxSize()) {
            items(items) { item ->
                <span class="ty">ListItem</span>(
                    headlineContent = { <span class="ty">Text</span>(item) },
                    leadingContent = {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Article, <span class="kw">null</span>,
                            tint = <span class="ty">MaterialTheme</span>.colorScheme.primary)
                    }
                )
                <span class="ty">HorizontalDivider</span>()
            }
        }
    }
}`
  },
  {
    id: 140, category: "controls", icon: "⊕",
    title: "Extended FAB",
    desc: "Expandable FloatingActionButton with sub-action buttons and spring animation.",
    tags: ["FAB", "FloatingButton", "Animation", "ExtendedFAB"],
    preview: `<div class="android-canvas" style="position:relative;min-height:170px;padding:0;border-radius:8px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#49454F;font-size:12px">Content area</div><div style="position:absolute;bottom:14px;right:14px;display:flex;flex-direction:column;align-items:flex-end;gap:8px"><div style="display:flex;align-items:center;gap:8px"><div style="font-size:11px;font-weight:500;background:#E8DEF8;color:#6750A4;padding:4px 8px;border-radius:6px">Photo</div><div style="width:36px;height:36px;border-radius:18px;background:#7C3AED;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;box-shadow:0 2px 8px rgba(103,80,164,0.4)">📷</div></div><div style="display:flex;align-items:center;gap:8px"><div style="font-size:11px;font-weight:500;background:#E8DEF8;color:#6750A4;padding:4px 8px;border-radius:6px">Document</div><div style="width:36px;height:36px;border-radius:18px;background:#FF9800;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;box-shadow:0 2px 8px rgba(249,115,22,0.4)">📄</div></div><div style="width:52px;height:52px;border-radius:26px;background:#6750A4;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;box-shadow:0 4px 12px rgba(103,80,164,0.5)">✕</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ExpandableFAB</span>() {
    <span class="kw">var</span> expanded <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }

    <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.fillMaxSize().padding(<span class="nu">24</span>.dp), contentAlignment = <span class="ty">Alignment</span>.BottomEnd) {
        <span class="ty">Column</span>(horizontalAlignment = <span class="ty">Alignment</span>.End, verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp)) {
            <span class="ty">AnimatedVisibility</span>(
                visible = expanded,
                enter = fadeIn() + slideInVertically { it },
                exit = fadeOut() + slideOutVertically { it }
            ) {
                <span class="ty">Column</span>(horizontalAlignment = <span class="ty">Alignment</span>.End, verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
                    listOf(<span class="st">"Photo"</span> to <span class="ty">Icons</span>.Default.CameraAlt, <span class="st">"Document"</span> to <span class="ty">Icons</span>.Default.AttachFile).forEach { (label, icon) ->
                        <span class="ty">Row</span>(verticalAlignment = <span class="ty">Alignment</span>.CenterVertically, horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
                            <span class="ty">Surface</span>(color = <span class="ty">MaterialTheme</span>.colorScheme.secondaryContainer, shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">6</span>.dp)) {
                                <span class="ty">Text</span>(label, modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">8</span>.dp, vertical = <span class="nu">4</span>.dp))
                            }
                            <span class="ty">SmallFloatingActionButton</span>(onClick = { expanded = <span class="kw">false</span> }) {
                                <span class="ty">Icon</span>(icon, <span class="kw">null</span>)
                            }
                        }
                    }
                }
            }
            <span class="ty">FloatingActionButton</span>(onClick = { expanded = !expanded }) {
                <span class="ty">Icon</span>(<span class="kw">if</span> (expanded) <span class="ty">Icons</span>.Default.Close <span class="kw">else</span> <span class="ty">Icons</span>.Default.Add, <span class="kw">null</span>)
            }
        }
    }
}`
  },
  {
    id: 141, category: "controls", icon: "🏷",
    title: "FilterChip Selector",
    desc: "Horizontally scrollable multi-select FilterChip picker with animated selection.",
    tags: ["FilterChip", "MultiSelect", "Chip", "Filter"],
    preview: `<div class="android-canvas" style="flex-direction:column;align-items:flex-start;gap:12px"><div style="font-size:13px;font-weight:500;color:#1C1B1F">Filter by category</div><div style="display:flex;gap:8px;flex-wrap:wrap"><div style="padding:6px 12px;border-radius:8px;background:#6750A4;color:#fff;font-size:12px;font-weight:500;display:flex;align-items:center;gap:4px"><span style="font-size:10px">✓</span> Compose</div><div style="padding:6px 12px;border-radius:8px;border:1px solid #CAC4D0;color:#1C1B1F;font-size:12px;font-weight:500">Kotlin</div><div style="padding:6px 12px;border-radius:8px;background:#6750A4;color:#fff;font-size:12px;font-weight:500;display:flex;align-items:center;gap:4px"><span style="font-size:10px">✓</span> Android 14</div><div style="padding:6px 12px;border-radius:8px;border:1px solid #CAC4D0;color:#1C1B1F;font-size:12px;font-weight:500">Material 3</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">FilterChipSelector</span>(
    options: <span class="ty">List</span>&lt;<span class="ty">String</span>&gt;,
    selected: <span class="ty">Set</span>&lt;<span class="ty">String</span>&gt;,
    onSelectionChange: (<span class="ty">Set</span>&lt;<span class="ty">String</span>&gt;) -> <span class="ty">Unit</span>
) {
    <span class="ty">Row</span>(
        modifier = <span class="ty">Modifier</span>.horizontalScroll(rememberScrollState()),
        horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)
    ) {
        options.forEach { option ->
            <span class="kw">val</span> isSelected = option <span class="kw">in</span> selected
            <span class="ty">FilterChip</span>(
                selected = isSelected,
                onClick = {
                    onSelectionChange(
                        <span class="kw">if</span> (isSelected) selected - option <span class="kw">else</span> selected + option
                    )
                },
                label = { <span class="ty">Text</span>(option) },
                leadingIcon = <span class="kw">if</span> (isSelected) {
                    { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Check, <span class="kw">null</span>, modifier = <span class="ty">Modifier</span>.size(<span class="ty">FilterChipDefaults</span>.IconSize)) }
                } <span class="kw">else null</span>
            )
        }
    }
}

<span class="cm">// Usage</span>
<span class="kw">var</span> selected <span class="kw">by</span> remember { mutableStateOf(emptySet&lt;<span class="ty">String</span>&gt;()) }
<span class="ty">FilterChipSelector</span>(
    options = listOf(<span class="st">"Compose"</span>, <span class="st">"Kotlin"</span>, <span class="st">"Android 14"</span>, <span class="st">"Material 3"</span>),
    selected = selected,
    onSelectionChange = { selected = it }
)`
  },
  {
    id: 142, category: "controls", icon: "📋",
    title: "Alert Dialog — Multiple Options",
    desc: "Alert dialog with vertically stacked option list — ideal for 3+ choices.",
    tags: ["AlertDialog", "Popup", "Dialog", "Options"],
    preview: `<div class="android-canvas" style="padding:0;position:relative;min-height:200px;overflow:hidden;border-radius:8px"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.32);display:flex;align-items:center;justify-content:center"><div style="background:#FFFBFE;border-radius:28px;width:82%;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.22);padding:24px 20px 8px"><div style="font-size:14px;font-weight:500;color:#1C1B1F;margin-bottom:4px">Move Document</div><div style="font-size:12px;color:#49454F;margin-bottom:16px">Choose where to move this item</div><div style="margin:0 -20px"><div style="padding:12px 20px;font-size:13px;color:#6750A4;border-top:1px solid #F7F2FA">Move to Favourites</div><div style="padding:12px 20px;font-size:13px;color:#6750A4;border-top:1px solid #F7F2FA">Move to Archive</div><div style="padding:12px 20px;font-size:13px;font-weight:500;color:#B3261E;border-top:1px solid #F7F2FA">Delete</div><div style="padding:12px 20px;font-size:13px;color:#49454F;border-top:1px solid #F7F2FA">Cancel</div></div></div></div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">DialogOption</span>(
    <span class="kw">val</span> label: <span class="ty">String</span>,
    <span class="kw">val</span> isDestructive: <span class="ty">Boolean</span> = <span class="kw">false</span>,
    <span class="kw">val</span> isCancel: <span class="ty">Boolean</span> = <span class="kw">false</span>,
    <span class="kw">val</span> onClick: () -> <span class="ty">Unit</span>
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">MultiOptionDialog</span>(
    title: <span class="ty">String</span>,
    message: <span class="ty">String</span>,
    options: <span class="ty">List</span>&lt;<span class="ty">DialogOption</span>&gt;,
    onDismiss: () -> <span class="ty">Unit</span>
) {
    <span class="ty">AlertDialog</span>(
        onDismissRequest = onDismiss,
        title = { <span class="ty">Text</span>(title) },
        text = {
            <span class="ty">Column</span> {
                <span class="ty">Text</span>(message, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
                    color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">12</span>.dp))
                options.forEach { option ->
                    <span class="ty">TextButton</span>(
                        onClick = { option.onClick(); onDismiss() },
                        modifier = <span class="ty">Modifier</span>.fillMaxWidth(),
                        colors = <span class="ty">ButtonDefaults</span>.textButtonColors(
                            contentColor = <span class="kw">when</span> {
                                option.isDestructive -> <span class="ty">MaterialTheme</span>.colorScheme.error
                                option.isCancel -> <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant
                                <span class="kw">else</span> -> <span class="ty">MaterialTheme</span>.colorScheme.primary
                            }
                        )
                    ) { <span class="ty">Text</span>(option.label, modifier = <span class="ty">Modifier</span>.fillMaxWidth()) }
                    <span class="ty">HorizontalDivider</span>()
                }
            }
        },
        confirmButton = {}
    )
}`
  },
  {
    id: 143, category: "controls", icon: "📤",
    title: "Bottom Sheet Options",
    desc: "iOS-style action sheet options using ModalBottomSheet with icon rows.",
    tags: ["BottomSheet", "ActionSheet", "Options", "Menu"],
    preview: `<div class="android-canvas" style="padding:0;position:relative;min-height:200px;overflow:hidden;border-radius:8px"><div style="position:absolute;bottom:0;left:0;right:0;background:#FFFBFE;border-radius:16px 16px 0 0;padding:0 0 12px"><div style="display:flex;justify-content:center;padding:10px"><div style="width:32px;height:4px;background:#CAC4D0;border-radius:2px"></div></div><div style="padding:4px 16px 10px;font-size:14px;font-weight:500;color:#1C1B1F">Share Options</div><div style="padding:10px 20px;display:flex;align-items:center;gap:14px;border-top:1px solid #F7F2FA"><span>↗</span><span style="font-size:13px;color:#1C1B1F">Share via AirDrop</span></div><div style="padding:10px 20px;display:flex;align-items:center;gap:14px;border-top:1px solid #F7F2FA"><span>🔗</span><span style="font-size:13px;color:#1C1B1F">Copy Link</span></div><div style="padding:10px 20px;display:flex;align-items:center;gap:14px;border-top:1px solid #F7F2FA"><span style="color:#B3261E">🗑</span><span style="font-size:13px;color:#B3261E">Delete</span></div></div></div>`,
    code: `<span class="kw">data class</span> <span class="ty">SheetAction</span>(
    <span class="kw">val</span> label: <span class="ty">String</span>,
    <span class="kw">val</span> icon: <span class="ty">ImageVector</span>,
    <span class="kw">val</span> isDestructive: <span class="ty">Boolean</span> = <span class="kw">false</span>
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">ActionSheetBottomSheet</span>(
    title: <span class="ty">String</span>,
    actions: <span class="ty">List</span>&lt;<span class="ty">SheetAction</span>&gt;,
    onDismiss: () -> <span class="ty">Unit</span>
) {
    <span class="kw">val</span> sheetState = rememberModalBottomSheetState()

    <span class="ty">ModalBottomSheet</span>(onDismissRequest = onDismiss, sheetState = sheetState) {
        <span class="ty">Text</span>(
            title,
            style = <span class="ty">MaterialTheme</span>.typography.titleMedium,
            modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">20</span>.dp, vertical = <span class="nu">8</span>.dp)
        )
        <span class="ty">HorizontalDivider</span>()
        actions.forEach { action ->
            <span class="kw">val</span> color = <span class="kw">if</span> (action.isDestructive) <span class="ty">MaterialTheme</span>.colorScheme.error
                        <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.onSurface
            <span class="ty">ListItem</span>(
                headlineContent = { <span class="ty">Text</span>(action.label, color = color) },
                leadingContent = { <span class="ty">Icon</span>(action.icon, <span class="kw">null</span>, tint = color) },
                modifier = <span class="ty">Modifier</span>.clickable { onDismiss() }
            )
        }
        <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.navigationBarsPadding())
    }
}`
  },
  {
    id: 144, category: "controls", icon: "⬆️",
    title: "Persistent Bottom Sheet",
    desc: "Scaffold with BottomSheetScaffold showing a persistent resizable sheet.",
    tags: ["BottomSheetScaffold", "PersistentSheet", "Scaffold"],
    preview: `<div class="android-canvas" style="padding:0;position:relative;min-height:200px;overflow:hidden;border-radius:8px"><div style="position:absolute;bottom:0;left:0;right:0;height:150px;background:#FFFBFE;border-radius:16px 16px 0 0;box-shadow:0 -2px 12px rgba(0,0,0,0.08)"><div style="display:flex;justify-content:center;padding:10px"><div style="width:32px;height:4px;background:#CAC4D0;border-radius:2px"></div></div><div style="padding:8px 16px 16px"><div style="font-size:14px;font-weight:500;color:#1C1B1F;margin-bottom:8px">Quick Actions</div><div style="display:flex;gap:10px"><div style="flex:1;padding:10px;background:#F3EFF7;border-radius:10px;text-align:center;font-size:12px;color:#6750A4;font-weight:500">📤 Share</div><div style="flex:1;padding:10px;background:#F3EFF7;border-radius:10px;text-align:center;font-size:12px;color:#3DDC84;font-weight:500">💾 Save</div><div style="flex:1;padding:10px;background:#FCE8E6;border-radius:10px;text-align:center;font-size:12px;color:#B3261E;font-weight:500">🗑 Delete</div></div></div></div><div style="position:absolute;top:20px;left:50%;transform:translateX(-50%);font-size:12px;color:#49454F">Main content</div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">PersistentSheetScreen</span>() {
    <span class="kw">val</span> sheetState = rememberBottomSheetScaffoldState(
        bottomSheetState = rememberStandardBottomSheetState(
            initialValue = <span class="ty">SheetValue</span>.PartiallyExpanded
        )
    )

    <span class="ty">BottomSheetScaffold</span>(
        scaffoldState = sheetState,
        sheetContent = {
            <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth().padding(horizontal = <span class="nu">24</span>.dp)) {
                <span class="ty">Text</span>(<span class="st">"Quick Actions"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">12</span>.dp))
                <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">12</span>.dp)) {
                    listOf(<span class="st">"📤 Share"</span>, <span class="st">"💾 Save"</span>, <span class="st">"🗑 Delete"</span>).forEach { label ->
                        <span class="ty">OutlinedButton</span>(
                            onClick = {},
                            modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>)
                        ) { <span class="ty">Text</span>(label, style = <span class="ty">MaterialTheme</span>.typography.labelSmall) }
                    }
                }
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">24</span>.dp).navigationBarsPadding())
            }
        },
        sheetPeekHeight = <span class="nu">128</span>.dp,
        topBar = {
            <span class="ty">TopAppBar</span>(title = { <span class="ty">Text</span>(<span class="st">"Detail"</span>) })
        }
    ) { padding ->
        <span class="ty">Box</span>(<span class="ty">Modifier</span>.padding(padding).fillMaxSize(), contentAlignment = <span class="ty">Alignment</span>.Center) {
            <span class="ty">Text</span>(<span class="st">"Main content area"</span>, color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant)
        }
    }
}`
  },
  {
    id: 145, category: "controls", icon: "⏳",
    title: "Loading Dialog",
    desc: "Full-screen loading overlay with CircularProgressIndicator and blurred backdrop.",
    tags: ["Loading", "Overlay", "Dialog", "CircularProgress"],
    preview: `<div class="android-canvas" style="padding:0;position:relative;min-height:170px;overflow:hidden;border-radius:8px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#49454F;font-size:12px">Content beneath</div><div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;border-radius:8px"><div style="background:#FFFBFE;border-radius:28px;padding:24px 32px;display:flex;flex-direction:column;align-items:center;gap:12px"><div style="width:32px;height:32px;border-radius:50%;border:3px solid #E8DEF8;border-top-color:#6750A4;animation:spin 0.9s linear infinite"></div><div style="color:#1C1B1F;font-size:13px;font-weight:500">Loading…</div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">Modifier</span>.<span class="fn">loadingOverlay</span>(
    isLoading: <span class="ty">Boolean</span>,
    message: <span class="ty">String</span> = <span class="st">"Loading…"</span>
): <span class="ty">Modifier</span> = this.then(
    <span class="ty">Modifier</span>.composed {
        this
    }
)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">LoadingOverlay</span>(isLoading: <span class="ty">Boolean</span>, message: <span class="ty">String</span> = <span class="st">"Loading…"</span>, content: <span class="pa">@Composable</span> () -> <span class="ty">Unit</span>) {
    <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.fillMaxSize()) {
        content()
        <span class="ty">AnimatedVisibility</span>(
            visible = isLoading,
            enter = fadeIn(),
            exit = fadeOut()
        ) {
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxSize().background(<span class="ty">Color</span>.Black.copy(alpha = <span class="nu">0.4f</span>)),
                contentAlignment = <span class="ty">Alignment</span>.Center
            ) {
                <span class="ty">Surface</span>(shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">28</span>.dp), tonalElevation = <span class="nu">6</span>.dp) {
                    <span class="ty">Column</span>(
                        modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">32</span>.dp, vertical = <span class="nu">24</span>.dp),
                        horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally,
                        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp)
                    ) {
                        <span class="ty">CircularProgressIndicator</span>()
                        <span class="ty">Text</span>(message, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium)
                    }
                }
            }
        }
    }
}

<span class="cm">// Usage</span>
<span class="ty">LoadingOverlay</span>(isLoading = isLoading, message = <span class="st">"Saving…"</span>) {
    <span class="ty">MainContent</span>()
}`
  },
  {
    id: 146, category: "controls", icon: "✅",
    title: "Success Confirmation",
    desc: "Animated success checkmark composable with title, subtitle, and done button.",
    tags: ["Success", "Confirmation", "Animation", "Checkmark"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:10px;padding:20px"><div style="width:72px;height:72px;border-radius:36px;background:rgba(61,220,132,0.15);display:flex;align-items:center;justify-content:center"><div style="width:52px;height:52px;border-radius:26px;background:#3DDC84;display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700">✓</div></div><div style="font-size:16px;font-weight:500;color:#1C1B1F;text-align:center">Payment Successful!</div><div style="font-size:12px;color:#49454F;text-align:center;max-width:200px;line-height:1.5">Your order has been placed and a receipt was sent to your email.</div><button class="md-btn filled" style="margin-top:6px">Done</button></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SuccessView</span>(title: <span class="ty">String</span>, subtitle: <span class="ty">String</span>, onDone: () -> <span class="ty">Unit</span>) {
    <span class="kw">var</span> visible <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }
    <span class="ty">LaunchedEffect</span>(<span class="ty">Unit</span>) { visible = <span class="kw">true</span> }

    <span class="ty">Column</span>(
        modifier = <span class="ty">Modifier</span>.fillMaxWidth().padding(<span class="nu">32</span>.dp),
        horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally,
        verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">16</span>.dp)
    ) {
        <span class="kw">val</span> scale <span class="kw">by</span> animateFloatAsState(
            targetValue = <span class="kw">if</span> (visible) <span class="nu">1f</span> <span class="kw">else</span> <span class="nu">0f</span>,
            animationSpec = spring(dampingRatio = <span class="ty">Spring</span>.DampingRatioMediumBouncy, stiffness = <span class="ty">Spring</span>.StiffnessMedium),
            label = <span class="st">"scale"</span>
        )
        <span class="ty">Box</span>(
            modifier = <span class="ty">Modifier</span>.size(<span class="nu">96</span>.dp).scale(scale)
                .background(<span class="ty">Color</span>(<span class="nu">0xFF3DDC84</span>.toInt()).copy(alpha = <span class="nu">0.15f</span>), <span class="ty">CircleShape</span>),
            contentAlignment = <span class="ty">Alignment</span>.Center
        ) {
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>.size(<span class="nu">68</span>.dp).background(<span class="ty">Color</span>(<span class="nu">0xFF3DDC84</span>.toInt()), <span class="ty">CircleShape</span>),
                contentAlignment = <span class="ty">Alignment</span>.Center
            ) {
                <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Check, <span class="kw">null</span>, tint = <span class="ty">Color</span>.White, modifier = <span class="ty">Modifier</span>.size(<span class="nu">36</span>.dp))
            }
        }
        <span class="ty">Text</span>(title, style = <span class="ty">MaterialTheme</span>.typography.headlineSmall)
        <span class="ty">Text</span>(subtitle, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
            color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant, textAlign = <span class="ty">TextAlign</span>.Center)
        <span class="ty">Button</span>(onClick = onDone) { <span class="ty">Text</span>(<span class="st">"Done"</span>) }
    }
}`
  },
  {
    id: 147, category: "controls", icon: "⭐",
    title: "Star Rating",
    desc: "Interactive tappable star rating with animated selection and haptic feedback.",
    tags: ["Rating", "Stars", "Review", "Interactive"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:12px;padding:20px"><div style="font-size:13px;font-weight:500;color:#1C1B1F">Rate your experience</div><div style="display:flex;gap:4px"><span style="font-size:36px;color:#FF9800">★</span><span style="font-size:36px;color:#FF9800">★</span><span style="font-size:36px;color:#FF9800">★</span><span style="font-size:36px;color:#FF9800">★</span><span style="font-size:36px;color:#CAC4D0">★</span></div><div style="font-size:12px;color:#49454F">4 out of 5</div><button class="md-btn filled" style="margin-top:4px">Submit Review</button></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">StarRating</span>(
    rating: <span class="ty">Int</span>,
    maxRating: <span class="ty">Int</span> = <span class="nu">5</span>,
    starSize: <span class="ty">Dp</span> = <span class="nu">36</span>.dp,
    onRatingChange: (<span class="ty">Int</span>) -> <span class="ty">Unit</span>
) {
    <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">4</span>.dp)) {
        <span class="kw">for</span> (star <span class="kw">in</span> <span class="nu">1</span>..maxRating) {
            <span class="kw">val</span> filled = star <= rating
            <span class="kw">val</span> scale <span class="kw">by</span> animateFloatAsState(
                targetValue = <span class="kw">if</span> (filled) <span class="nu">1.15f</span> <span class="kw">else</span> <span class="nu">1f</span>,
                animationSpec = spring(dampingRatio = <span class="ty">Spring</span>.DampingRatioMediumBouncy),
                label = <span class="st">"star$star"</span>
            )
            <span class="ty">Icon</span>(
                imageVector = <span class="kw">if</span> (filled) <span class="ty">Icons</span>.Default.Star <span class="kw">else</span> <span class="ty">Icons</span>.Default.StarOutline,
                contentDescription = <span class="st">"$star stars"</span>,
                tint = <span class="kw">if</span> (filled) <span class="ty">Color</span>(<span class="nu">0xFFFF9800</span>.toInt())
                       <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.outlineVariant,
                modifier = <span class="ty">Modifier</span>.size(starSize).scale(scale)
                    .clickable(
                        interactionSource = remember { <span class="ty">MutableInteractionSource</span>() },
                        indication = <span class="kw">null</span>
                    ) { onRatingChange(<span class="kw">if</span> (star == rating) <span class="nu">0</span> <span class="kw">else</span> star) }
            )
        }
    }
}`
  },
  {
    id: 148, category: "controls", icon: "🔀",
    title: "Tab Row Selector",
    desc: "Custom TabRow segmented selector with animated sliding indicator.",
    tags: ["TabRow", "Tab", "Segmented", "Indicator"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:14px"><div style="background:#E8DEF8;border-radius:10px;padding:3px;display:flex;width:100%"><div style="flex:1;background:#FFFBFE;border-radius:8px;padding:7px;font-size:13px;font-weight:500;color:#1C1B1F;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.08)">Day</div><div style="flex:1;padding:7px;font-size:13px;color:#49454F;text-align:center">Week</div><div style="flex:1;padding:7px;font-size:13px;color:#49454F;text-align:center">Month</div></div><div style="background:#FFFBFE;border-radius:10px;padding:14px;width:100%;display:flex;flex-direction:column;gap:6px"><div style="height:8px;background:rgba(103,80,164,0.15);border-radius:4px;width:100%"></div><div style="height:8px;background:rgba(103,80,164,0.08);border-radius:4px;width:75%"></div><div style="height:8px;background:rgba(103,80,164,0.05);border-radius:4px;width:55%"></div></div></div>`,
    code: `<span class="kw">enum class</span> <span class="ty">TimeRange</span>(val label: <span class="ty">String</span>) {
    DAY(<span class="st">"Day"</span>), WEEK(<span class="st">"Week"</span>), MONTH(<span class="st">"Month"</span>), YEAR(<span class="st">"Year"</span>)
}

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SegmentedControl</span>(
    options: <span class="ty">List</span>&lt;<span class="ty">TimeRange</span>&gt;,
    selected: <span class="ty">TimeRange</span>,
    onSelect: (<span class="ty">TimeRange</span>) -> <span class="ty">Unit</span>
) {
    <span class="ty">TabRow</span>(
        selectedTabIndex = options.indexOf(selected),
        indicator = { tabPositions ->
            <span class="ty">Box</span>(
                modifier = <span class="ty">Modifier</span>
                    .tabIndicatorOffset(tabPositions[options.indexOf(selected)])
                    .fillMaxHeight()
                    .padding(<span class="nu">3</span>.dp)
                    .background(<span class="ty">MaterialTheme</span>.colorScheme.surface, <span class="ty">RoundedCornerShape</span>(<span class="nu">8</span>.dp))
            )
        },
        divider = {},
        containerColor = <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer,
        modifier = <span class="ty">Modifier</span>.clip(<span class="ty">RoundedCornerShape</span>(<span class="nu">10</span>.dp))
    ) {
        options.forEach { option ->
            <span class="ty">Tab</span>(
                selected = selected == option,
                onClick = { onSelect(option) },
                text = {
                    <span class="ty">Text</span>(
                        option.label,
                        color = <span class="kw">if</span> (selected == option) <span class="ty">MaterialTheme</span>.colorScheme.onSurface
                                <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant
                    )
                }
            )
        }
    }
}`
  },
  {
    id: 149, category: "controls", icon: "🪜",
    title: "Step Progress Indicator",
    desc: "Numbered horizontal step indicator showing current step in a multi-step flow.",
    tags: ["Progress", "Steps", "Wizard", "Stepper"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:14px;padding:16px"><div style="display:flex;align-items:center;width:100%"><div style="width:32px;height:32px;border-radius:16px;background:#6750A4;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:500;flex-shrink:0">1</div><div style="flex:1;height:3px;background:#6750A4"></div><div style="width:32px;height:32px;border-radius:16px;background:#6750A4;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:500;flex-shrink:0">2</div><div style="flex:1;height:3px;background:#CAC4D0"></div><div style="width:32px;height:32px;border-radius:16px;background:#E8DEF8;display:flex;align-items:center;justify-content:center;color:#49454F;font-size:13px;font-weight:500;flex-shrink:0">3</div><div style="flex:1;height:3px;background:#CAC4D0"></div><div style="width:32px;height:32px;border-radius:16px;background:#E8DEF8;display:flex;align-items:center;justify-content:center;color:#49454F;font-size:13px;font-weight:500;flex-shrink:0">4</div></div><div style="display:flex;justify-content:space-between;width:100%;padding:0 4px"><div style="font-size:10px;color:#6750A4;font-weight:500;text-align:center;width:32px">Info</div><div style="font-size:10px;color:#6750A4;font-weight:500;text-align:center;width:32px">Photo</div><div style="font-size:10px;color:#49454F;text-align:center;width:32px">Plan</div><div style="font-size:10px;color:#49454F;text-align:center;width:32px">Done</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">StepProgressIndicator</span>(steps: <span class="ty">List</span>&lt;<span class="ty">String</span>&gt;, currentStep: <span class="ty">Int</span>) {
    <span class="ty">Column</span> {
        <span class="ty">Row</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth(), verticalAlignment = <span class="ty">Alignment</span>.CenterVertically) {
            steps.forEachIndexed { index, _ ->
                <span class="kw">val</span> isDone = index < currentStep
                <span class="kw">val</span> isCurrent = index == currentStep - <span class="nu">1</span>
                <span class="ty">Box</span>(
                    modifier = <span class="ty">Modifier</span>.size(<span class="nu">32</span>.dp).background(
                        color = <span class="kw">if</span> (isDone || isCurrent) <span class="ty">MaterialTheme</span>.colorScheme.primary
                                <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.primaryContainer,
                        shape = <span class="ty">CircleShape</span>
                    ),
                    contentAlignment = <span class="ty">Alignment</span>.Center
                ) {
                    <span class="kw">if</span> (isDone && !isCurrent) {
                        <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Check, <span class="kw">null</span>, tint = <span class="ty">Color</span>.White, modifier = <span class="ty">Modifier</span>.size(<span class="nu">16</span>.dp))
                    } <span class="kw">else</span> {
                        <span class="ty">Text</span>(<span class="st">"\${index + 1}"</span>, color = <span class="kw">if</span> (isDone || isCurrent) <span class="ty">Color</span>.White
                                               <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.onPrimaryContainer,
                            style = <span class="ty">MaterialTheme</span>.typography.labelMedium)
                    }
                }
                <span class="kw">if</span> (index < steps.lastIndex) {
                    <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>).height(<span class="nu">3</span>.dp)
                        .background(<span class="kw">if</span> (index < currentStep - <span class="nu">1</span>) <span class="ty">MaterialTheme</span>.colorScheme.primary
                                    <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.outlineVariant))
                }
            }
        }
        <span class="ty">Row</span>(modifier = <span class="ty">Modifier</span>.fillMaxWidth()) {
            steps.forEachIndexed { index, step ->
                <span class="ty">Text</span>(step, style = <span class="ty">MaterialTheme</span>.typography.labelSmall,
                    color = <span class="kw">if</span> (index < currentStep) <span class="ty">MaterialTheme</span>.colorScheme.primary
                            <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant,
                    textAlign = <span class="ty">TextAlign</span>.Center,
                    modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>))
            }
        }
    }
}`
  },
  {
    id: 150, category: "controls", icon: "🔍",
    title: "Search with Suggestions",
    desc: "SearchBar with recent searches, live suggestions, and history support.",
    tags: ["SearchBar", "Suggestions", "Recent", "Filter"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:0;padding:10px"><div style="background:#FFFBFE;border-radius:28px;overflow:hidden;border:1px solid #CAC4D0;margin-bottom:8px"><div style="display:flex;align-items:center;gap:8px;padding:10px 16px"><span style="color:#49454F;font-size:14px">🔍</span><span style="font-size:13px;color:#49454F;flex:1">Search snippets…</span></div></div><div style="background:#FFFBFE;border-radius:12px;overflow:hidden;border:1px solid #CAC4D0;width:100%"><div style="padding:6px 14px;font-size:11px;font-weight:500;color:#49454F;text-transform:uppercase;letter-spacing:0.5px;background:#F7F2FA">Recent</div><div style="padding:10px 14px;font-size:13px;color:#1C1B1F;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F7F2FA"><span style="color:#49454F">🕐</span>Row & Column</div><div style="padding:10px 14px;font-size:13px;color:#1C1B1F;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F7F2FA"><span style="color:#49454F">🕐</span>Custom Button</div><div style="padding:10px 14px;font-size:13px;color:#6750A4;display:flex;align-items:center;gap:10px"><span>🔍</span>Compose animations</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">SearchWithSuggestions</span>(items: <span class="ty">List</span>&lt;<span class="ty">String</span>&gt;) {
    <span class="kw">var</span> query <span class="kw">by</span> remember { mutableStateOf(<span class="st">""</span>) }
    <span class="kw">var</span> active <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }
    <span class="kw">var</span> recent <span class="kw">by</span> remember { mutableStateOf(listOf(<span class="st">"Row & Column"</span>, <span class="st">"Custom Button"</span>)) }
    <span class="kw">val</span> suggestions = <span class="kw">if</span> (query.isEmpty()) recent <span class="kw">else</span> items.filter { it.contains(query, ignoreCase = <span class="kw">true</span>) }

    <span class="ty">SearchBar</span>(
        inputField = {
            <span class="ty">SearchBarDefaults</span>.InputField(
                query = query,
                onQueryChange = { query = it },
                onSearch = { active = <span class="kw">false</span>; <span class="kw">if</span> (query.isNotEmpty()) recent = listOf(query) + recent },
                expanded = active,
                onExpandedChange = { active = it },
                placeholder = { <span class="ty">Text</span>(<span class="st">"Search snippets…"</span>) },
                leadingIcon = { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Search, <span class="kw">null</span>) },
                trailingIcon = { <span class="kw">if</span> (active) <span class="ty">IconButton</span>({ query = <span class="st">""</span>; active = <span class="kw">false</span> }) { <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Close, <span class="kw">null</span>) } }
            )
        },
        expanded = active,
        onExpandedChange = { active = it },
        modifier = <span class="ty">Modifier</span>.fillMaxWidth()
    ) {
        <span class="kw">if</span> (query.isEmpty()) {
            <span class="ty">Text</span>(<span class="st">"Recent"</span>, style = <span class="ty">MaterialTheme</span>.typography.labelSmall, modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp))
        }
        suggestions.forEach { suggestion ->
            <span class="ty">ListItem</span>(
                headlineContent = { <span class="ty">Text</span>(suggestion) },
                leadingContent = {
                    <span class="ty">Icon</span>(<span class="kw">if</span> (query.isEmpty()) <span class="ty">Icons</span>.Default.History <span class="kw">else</span> <span class="ty">Icons</span>.Default.Search, <span class="kw">null</span>)
                },
                modifier = <span class="ty">Modifier</span>.clickable { query = suggestion; active = <span class="kw">false</span> }
            )
        }
    }
}`
  },

  // ── ANIMATION (continued) ────────────────────────────────────────────
  {
    id: 151, category: "animation", icon: "✍️",
    title: "Typewriter Text Effect",
    desc: "Characters appear one-by-one with configurable speed and blinking cursor.",
    tags: ["Animation", "Text", "Typewriter", "LaunchedEffect"],
    preview: `<div class="android-canvas" style="background:#1C1B1F;border-radius:8px;padding:20px;flex-direction:column;gap:8px;align-items:flex-start"><div style="font-size:11px;color:#3DDC84;font-family:monospace;letter-spacing:0.5px">TYPEWRITER</div><div style="font-size:15px;font-weight:500;color:#E6E1E5;font-family:monospace;line-height:1.5">Building beautiful<br>Compose UIs<span style="border-right:2px solid #3DDC84;margin-left:1px">  </span></div><div style="margin-top:6px;display:flex;gap:6px"><div style="width:50px;height:4px;border-radius:2px;background:#3DDC84;opacity:0.4"></div><div style="width:30px;height:4px;border-radius:2px;background:#3DDC84;opacity:0.2"></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">TypewriterText</span>(
    fullText: <span class="ty">String</span>,
    speedMs: <span class="ty">Long</span> = <span class="nu">60</span>,
    style: <span class="ty">TextStyle</span> = <span class="ty">LocalTextStyle</span>.current
) {
    <span class="kw">var</span> displayed <span class="kw">by</span> remember { mutableStateOf(<span class="st">""</span>) }
    <span class="kw">var</span> cursorVisible <span class="kw">by</span> remember { mutableStateOf(<span class="kw">true</span>) }

    <span class="ty">LaunchedEffect</span>(fullText) {
        displayed = <span class="st">""</span>
        fullText.forEach { char ->
            displayed += char
            delay(speedMs)
        }
        <span class="cm">// Blink cursor after done</span>
        <span class="kw">while</span> (<span class="kw">true</span>) {
            delay(<span class="nu">500</span>)
            cursorVisible = !cursorVisible
        }
    }

    <span class="ty">Text</span>(
        text = displayed + <span class="kw">if</span> (cursorVisible) <span class="st">"|"</span> <span class="kw">else</span> <span class="st">" "</span>,
        style = style
    )
}

<span class="cm">// Usage</span>
<span class="ty">TypewriterText</span>(
    fullText = <span class="st">"Hello, Jetpack Compose!"</span>,
    speedMs = <span class="nu">60</span>,
    style = <span class="ty">MaterialTheme</span>.typography.bodyLarge
)`
  },
  {
    id: 152, category: "animation", icon: "💥",
    title: "Shake Animation",
    desc: "Modifier extension that applies a horizontal shake effect for validation errors.",
    tags: ["Shake", "Animation", "Error", "Modifier"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:14px"><div style="background:#FFFBFE;border-radius:4px;width:100%;padding:0;overflow:hidden;border:2px solid #B3261E"><div style="display:flex;align-items:center;padding:10px 12px;gap:8px"><span style="font-size:14px;color:#49454F">📧</span><span style="font-size:13px;color:#1C1B1F">wrong@email</span></div></div><div style="display:flex;align-items:center;gap:6px;padding:0 4px"><span style="color:#B3261E;font-size:12px">⚠️ Please enter a valid email address</span></div><button class="md-btn filled" style="width:100%">Sign In</button></div>`,
    code: `<span class="kw">fun</span> <span class="ty">Modifier</span>.<span class="fn">shake</span>(enabled: <span class="ty">Boolean</span>): <span class="ty">Modifier</span> = composed {
    <span class="kw">val</span> offset = remember { <span class="ty">Animatable</span>(<span class="nu">0f</span>) }
    <span class="ty">LaunchedEffect</span>(enabled) {
        <span class="kw">if</span> (enabled) {
            repeat(<span class="nu">4</span>) {
                offset.animateTo(<span class="nu">10f</span>, animationSpec = tween(<span class="nu">60</span>))
                offset.animateTo(-<span class="nu">10f</span>, animationSpec = tween(<span class="nu">60</span>))
            }
            offset.animateTo(<span class="nu">0f</span>, animationSpec = tween(<span class="nu">60</span>))
        }
    }
    this.offset(x = offset.value.dp)
}

<span class="cm">// Usage</span>
<span class="kw">var</span> shakeField <span class="kw">by</span> remember { mutableStateOf(<span class="kw">false</span>) }
<span class="kw">var</span> email <span class="kw">by</span> remember { mutableStateOf(<span class="st">""</span>) }

<span class="ty">OutlinedTextField</span>(
    value = email,
    onValueChange = { email = it },
    label = { <span class="ty">Text</span>(<span class="st">"Email"</span>) },
    isError = shakeField,
    modifier = <span class="ty">Modifier</span>.shake(shakeField)
)
<span class="ty">Button</span>(onClick = {
    <span class="kw">if</span> (!email.contains(<span class="st">"@"</span>)) {
        shakeField = <span class="kw">true</span>
        <span class="cm">// reset after animation</span>
    }
}) { <span class="ty">Text</span>(<span class="st">"Sign In"</span>) }`
  },
  {
    id: 153, category: "animation", icon: "🌈",
    title: "Animated Gradient Background",
    desc: "Smoothly shifting colour gradient using InfiniteTransition and animated colours.",
    tags: ["Gradient", "Background", "Animation", "InfiniteTransition"],
    preview: `<div class="android-canvas" style="padding:0;overflow:hidden;border-radius:8px"><div style="width:100%;min-height:160px;background:linear-gradient(135deg,#667eea 0%,#764ba2 30%,#f093fb 60%,#6750A4 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px"><div style="color:rgba(255,255,255,0.9);font-size:16px;font-weight:500;text-align:center">Live Gradient</div><div style="color:rgba(255,255,255,0.7);font-size:12px">InfiniteTransition colours</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">AnimatedGradientBackground</span>(modifier: <span class="ty">Modifier</span> = <span class="ty">Modifier</span>) {
    <span class="kw">val</span> palettes = listOf(
        listOf(<span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF9C4ADB</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF2563EB</span>.toInt())),
        listOf(<span class="ty">Color</span>(<span class="nu">0xFFF97316</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFFEF4444</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFFEC4899</span>.toInt())),
        listOf(<span class="ty">Color</span>(<span class="nu">0xFF10B981</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF06B6D4</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF3B82F6</span>.toInt()))
    )
    <span class="kw">var</span> paletteIndex <span class="kw">by</span> remember { mutableIntStateOf(<span class="nu">0</span>) }
    <span class="kw">val</span> transition = rememberInfiniteTransition(label = <span class="st">"gradient"</span>)
    <span class="kw">val</span> angle <span class="kw">by</span> transition.animateFloat(
        initialValue = <span class="nu">0f</span>, targetValue = <span class="nu">360f</span>,
        animationSpec = infiniteRepeatable(tween(<span class="nu">8000</span>, easing = <span class="ty">LinearEasing</span>)),
        label = <span class="st">"angle"</span>
    )

    <span class="ty">LaunchedEffect</span>(<span class="ty">Unit</span>) {
        <span class="kw">while</span> (<span class="kw">true</span>) {
            delay(<span class="nu">4000</span>)
            paletteIndex = (paletteIndex + <span class="nu">1</span>) % palettes.size
        }
    }

    <span class="kw">val</span> colors = palettes[paletteIndex]
    <span class="ty">Box</span>(
        modifier = modifier.background(
            <span class="ty">Brush</span>.linearGradient(
                colors = colors,
                start = <span class="ty">Offset</span>(<span class="nu">0f</span>, <span class="num">0f</span>),
                end = <span class="ty">Offset</span>(
                    cos(Math.toRadians(angle.toDouble()).toFloat()) * <span class="nu">1000f</span>,
                    sin(Math.toRadians(angle.toDouble()).toFloat()) * <span class="nu">1000f</span>
                )
            )
        )
    )
}`
  },

  // ── NAVIGATION (continued) ───────────────────────────────────────────
  {
    id: 154, category: "navigation", icon: "🎠",
    title: "Onboarding Pager",
    desc: "HorizontalPager onboarding with animated page dots and Get Started button.",
    tags: ["Onboarding", "HorizontalPager", "PageIndicator", "DataStore"],
    preview: `<div class="android-canvas" style="flex-direction:column;gap:12px;padding:20px"><div style="font-size:44px;text-align:center">🎨</div><div style="font-size:17px;font-weight:500;color:#1C1B1F;text-align:center">Design Beautiful UIs</div><div style="font-size:12px;color:#49454F;text-align:center;max-width:200px;line-height:1.5">Build stunning interfaces with Jetpack Compose's declarative syntax.</div><div style="display:flex;gap:6px;justify-content:center;margin-top:4px"><div style="width:20px;height:8px;border-radius:4px;background:#6750A4"></div><div style="width:8px;height:8px;border-radius:4px;background:#CAC4D0"></div><div style="width:8px;height:8px;border-radius:4px;background:#CAC4D0"></div></div><button class="md-btn filled" style="margin-top:4px;width:100%">Continue</button></div>`,
    code: `<span class="kw">data class</span> <span class="ty">OnboardPage</span>(<span class="kw">val</span> icon: <span class="ty">String</span>, <span class="kw">val</span> title: <span class="ty">String</span>, <span class="kw">val</span> subtitle: <span class="ty">String</span>)

<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">OnboardingScreen</span>(onFinish: () -> <span class="ty">Unit</span>) {
    <span class="kw">val</span> pages = listOf(
        <span class="ty">OnboardPage</span>(<span class="st">"🎨"</span>, <span class="st">"Design Beautiful UIs"</span>, <span class="st">"Build with Jetpack Compose."</span>),
        <span class="ty">OnboardPage</span>(<span class="st">"⚡"</span>, <span class="st">"Blazing Performance"</span>, <span class="st">"Native speed on all Android devices."</span>),
        <span class="ty">OnboardPage</span>(<span class="st">"🔄"</span>, <span class="st">"Live Previews"</span>, <span class="st">"See changes instantly in the IDE."</span>)
    )
    <span class="kw">val</span> pagerState = rememberPagerState { pages.size }
    <span class="kw">val</span> scope = rememberCoroutineScope()

    <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.fillMaxSize()) {
        <span class="ty">HorizontalPager</span>(state = pagerState, modifier = <span class="ty">Modifier</span>.weight(<span class="nu">1f</span>)) { page ->
            <span class="ty">Column</span>(
                modifier = <span class="ty">Modifier</span>.fillMaxSize().padding(<span class="nu">32</span>.dp),
                horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally,
                verticalArrangement = <span class="ty">Arrangement</span>.Center
            ) {
                <span class="ty">Text</span>(pages[page].icon, style = <span class="ty">MaterialTheme</span>.typography.displaySmall)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">24</span>.dp))
                <span class="ty">Text</span>(pages[page].title, style = <span class="ty">MaterialTheme</span>.typography.titleLarge)
                <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">8</span>.dp))
                <span class="ty">Text</span>(pages[page].subtitle, style = <span class="ty">MaterialTheme</span>.typography.bodyMedium,
                    color = <span class="ty">MaterialTheme</span>.colorScheme.onSurfaceVariant, textAlign = <span class="ty">TextAlign</span>.Center)
            }
        }
        <span class="ty">Column</span>(modifier = <span class="ty">Modifier</span>.padding(<span class="nu">24</span>.dp), horizontalAlignment = <span class="ty">Alignment</span>.CenterHorizontally) {
            <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">6</span>.dp)) {
                repeat(pages.size) { i ->
                    <span class="ty">Box</span>(modifier = <span class="ty">Modifier</span>.height(<span class="nu">8</span>.dp)
                        .width(<span class="kw">if</span> (pagerState.currentPage == i) <span class="nu">20</span>.dp <span class="kw">else</span> <span class="nu">8</span>.dp)
                        .background(<span class="kw">if</span> (pagerState.currentPage == i) <span class="ty">MaterialTheme</span>.colorScheme.primary
                                    <span class="kw">else</span> <span class="ty">MaterialTheme</span>.colorScheme.outlineVariant, <span class="ty">CircleShape</span>))
                }
            }
            <span class="ty">Spacer</span>(<span class="ty">Modifier</span>.height(<span class="nu">20</span>.dp))
            <span class="ty">Button</span>(
                onClick = {
                    <span class="kw">if</span> (pagerState.currentPage < pages.lastIndex)
                        scope.launch { pagerState.animateScrollToPage(pagerState.currentPage + <span class="nu">1</span>) }
                    <span class="kw">else</span> onFinish()
                },
                modifier = <span class="ty">Modifier</span>.fillMaxWidth()
            ) {
                <span class="ty">Text</span>(<span class="kw">if</span> (pagerState.currentPage < pages.lastIndex) <span class="st">"Continue"</span> <span class="kw">else</span> <span class="st">"Get Started"</span>)
            }
        }
    }
}`
  },
  {
    id: 155, category: "navigation", icon: "🪟",
    title: "Navigation Drawer",
    desc: "Adaptive NavigationDrawer with header, grouped items, and selected state.",
    tags: ["NavigationDrawer", "DrawerItem", "Sidebar", "Adaptive"],
    preview: `<div class="android-canvas" style="padding:0;overflow:hidden;border-radius:8px"><div style="display:flex;height:170px;width:100%"><div style="width:120px;background:#F7F2FA;border-right:1px solid #CAC4D0;display:flex;flex-direction:column"><div style="padding:12px 10px;font-size:11px;font-weight:500;color:#1C1B1F;border-bottom:1px solid #CAC4D0">LIBRARY</div><div style="padding:9px 10px;font-size:12px;color:#6750A4;font-weight:500;background:#E8DEF8;border-radius:0 50px 50px 0;margin-right:6px;display:flex;align-items:center;gap:6px"><span>📱</span>Controls</div><div style="padding:9px 10px;font-size:12px;color:#1C1B1F;display:flex;align-items:center;gap:6px"><span>🎨</span>Styling</div><div style="padding:9px 10px;font-size:12px;color:#1C1B1F;display:flex;align-items:center;gap:6px"><span>🔀</span>Animation</div></div><div style="flex:1;background:#FFFBFE;display:flex;align-items:center;justify-content:center;font-size:12px;color:#49454F">Content</div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">AppWithDrawer</span>() {
    <span class="kw">val</span> drawerState = rememberDrawerState(<span class="ty">DrawerValue</span>.Closed)
    <span class="kw">val</span> scope = rememberCoroutineScope()
    <span class="kw">var</span> selectedItem <span class="kw">by</span> remember { mutableStateOf(<span class="st">"Controls"</span>) }

    <span class="kw">val</span> navItems = listOf(
        <span class="st">"Controls"</span> to <span class="ty">Icons</span>.Default.TouchApp,
        <span class="st">"Styling"</span>  to <span class="ty">Icons</span>.Default.Palette,
        <span class="st">"Animation"</span> to <span class="ty">Icons</span>.Default.Animation,
        <span class="st">"Navigation"</span> to <span class="ty">Icons</span>.Default.Navigation
    )

    <span class="ty">ModalNavigationDrawer</span>(
        drawerState = drawerState,
        drawerContent = {
            <span class="ty">ModalDrawerSheet</span> {
                <span class="ty">Text</span>(<span class="st">"Library"</span>, style = <span class="ty">MaterialTheme</span>.typography.titleLarge,
                    modifier = <span class="ty">Modifier</span>.padding(<span class="nu">16</span>.dp))
                <span class="ty">HorizontalDivider</span>()
                navItems.forEach { (label, icon) ->
                    <span class="ty">NavigationDrawerItem</span>(
                        icon = { <span class="ty">Icon</span>(icon, <span class="kw">null</span>) },
                        label = { <span class="ty">Text</span>(label) },
                        selected = selectedItem == label,
                        onClick = { selectedItem = label; scope.launch { drawerState.close() } },
                        modifier = <span class="ty">Modifier</span>.padding(horizontal = <span class="nu">8</span>.dp)
                    )
                }
            }
        }
    ) {
        <span class="ty">Scaffold</span>(
            topBar = {
                <span class="ty">TopAppBar</span>(
                    title = { <span class="ty">Text</span>(selectedItem) },
                    navigationIcon = {
                        <span class="ty">IconButton</span>(onClick = { scope.launch { drawerState.open() } }) {
                            <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Menu, <span class="st">"Menu"</span>)
                        }
                    }
                )
            }
        ) { padding -> <span class="ty">Box</span>(<span class="ty">Modifier</span>.padding(padding)) { <span class="cm">/* content */</span> } }
    }
}`
  },

  // ── STYLING (continued) ──────────────────────────────────────────────
  {
    id: 156, category: "styling", icon: "🪟",
    title: "Glassmorphism Card",
    desc: "Frosted glass card with translucent blur effect and gradient background.",
    tags: ["Glass", "Blur", "BlurMask", "Design"],
    preview: `<div class="android-canvas" style="padding:0;overflow:hidden;border-radius:8px"><div style="width:100%;min-height:160px;background:linear-gradient(135deg,#1a1a2e,#16213e,#6750A4);position:relative;display:flex;align-items:center;justify-content:center"><div style="position:absolute;width:80px;height:80px;border-radius:40px;background:rgba(103,80,164,0.4);top:10px;left:20px;filter:blur(20px)"></div><div style="position:absolute;width:60px;height:60px;border-radius:30px;background:rgba(255,100,100,0.3);bottom:15px;right:30px;filter:blur(15px)"></div><div style="background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:18px 22px;width:75%"><div style="font-size:14px;font-weight:500;color:#fff;margin-bottom:6px">Premium Plan</div><div style="font-size:12px;color:rgba(255,255,255,0.75);margin-bottom:12px">All features unlocked</div><div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:7px 14px;font-size:12px;font-weight:500;color:#fff;display:inline-block">Upgrade Now</div></div></div></div>`,
    code: `<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">GlassCard</span>() {
    <span class="ty">Box</span>(
        modifier = <span class="ty">Modifier</span>.fillMaxWidth().height(<span class="nu">220</span>.dp)
            .background(<span class="ty">Brush</span>.linearGradient(
                colors = listOf(<span class="ty">Color</span>(<span class="nu">0xFF1a1a2e</span>.toInt()), <span class="ty">Color</span>(<span class="nu">0xFF0f3460</span>.toInt()))
            ))
    ) {
        <span class="cm">// Blurred blob decorations</span>
        <span class="ty">Box</span>(<span class="ty">Modifier</span>.size(<span class="nu">120</span>.dp).offset(-<span class="nu">30</span>.dp, -<span class="nu">30</span>.dp)
            .background(<span class="ty">Color</span>(<span class="nu">0xFF6750A4</span>.toInt()).copy(alpha = <span class="nu">0.4f</span>), <span class="ty">CircleShape</span>)
            .blur(<span class="nu">40</span>.dp))
        <span class="ty">Box</span>(<span class="ty">Modifier</span>.size(<span class="nu">100</span>.dp).align(<span class="ty">Alignment</span>.BottomEnd).offset(<span class="nu">20</span>.dp, <span class="nu">20</span>.dp)
            .background(<span class="ty">Color</span>(<span class="nu">0xFFEF4444</span>.toInt()).copy(alpha = <span class="nu">0.3f</span>), <span class="ty">CircleShape</span>)
            .blur(<span class="nu">30</span>.dp))

        <span class="cm">// Glass panel</span>
        <span class="ty">Column</span>(
            modifier = <span class="ty">Modifier</span>.align(<span class="ty">Alignment</span>.Center)
                .fillMaxWidth(<span class="nu">0.75f</span>)
                .background(
                    color = <span class="ty">Color</span>.White.copy(alpha = <span class="nu">0.12f</span>),
                    shape = <span class="ty">RoundedCornerShape</span>(<span class="nu">16</span>.dp)
                )
                .border(<span class="nu">1</span>.dp, <span class="ty">Color</span>.White.copy(alpha = <span class="nu">0.2f</span>), <span class="ty">RoundedCornerShape</span>(<span class="nu">16</span>.dp))
                .padding(<span class="nu">20</span>.dp),
            verticalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)
        ) {
            <span class="ty">Row</span>(horizontalArrangement = <span class="ty">Arrangement</span>.spacedBy(<span class="nu">8</span>.dp)) {
                <span class="ty">Icon</span>(<span class="ty">Icons</span>.Default.Star, <span class="kw">null</span>, tint = <span class="ty">Color</span>(<span class="nu">0xFFFBBF24</span>.toInt()), modifier = <span class="ty">Modifier</span>.size(<span class="nu">18</span>.dp))
                <span class="ty">Text</span>(<span class="st">"Premium"</span>, color = <span class="ty">Color</span>.White, style = <span class="ty">MaterialTheme</span>.typography.titleMedium)
            }
            <span class="ty">Text</span>(<span class="st">"Unlock all features and remove ads."</span>,
                color = <span class="ty">Color</span>.White.copy(alpha = <span class="nu">0.8f</span>), style = <span class="ty">MaterialTheme</span>.typography.bodySmall)
            <span class="ty">Button</span>(
                onClick = {},
                colors = <span class="ty">ButtonDefaults</span>.buttonColors(containerColor = <span class="ty">Color</span>.White.copy(alpha = <span class="nu">0.2f</span>))
            ) { <span class="ty">Text</span>(<span class="st">"Upgrade Now"</span>, color = <span class="ty">Color</span>.White) }
        }
    }
}`
  },
  {
    id: 157, category: "styling", icon: "🌈",
    title: "Gradient Text",
    desc: "Text with a linear gradient fill using Brush.linearGradient on TextStyle.",
    tags: ["Gradient", "Text", "Brush", "Typography"],
    preview: `<div class="android-canvas" style="background:#1C1B1F;flex-direction:column;gap:10px;align-items:flex-start;padding:20px"><div style="font-size:22px;font-weight:700;background:linear-gradient(135deg,#667eea,#9C4ADB,#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.5px">Compose Magic</div><div style="font-size:16px;font-weight:500;background:linear-gradient(135deg,#f093fb,#FF5449);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Design System</div><div style="font-size:14px;font-weight:500;background:linear-gradient(135deg,#4facfe,#00f2fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Build beautiful apps</div></div>`,
    code: `<span class="cm">// Compose supports Brush directly in TextStyle / SpanStyle</span>
<span class="pa">@Composable</span>
<span class="kw">fun</span> <span class="fn">GradientText</span>(
    text: <span class="ty">String</span>,
    style: <span class="ty">TextStyle</span> = <span class="ty">MaterialTheme</span>.typography.displaySmall,
    colors: <span class="ty">List</span>&lt;<span class="ty">Color</span>&gt; = listOf(<span class="ty">MaterialTheme</span>.colorScheme.primary, <span class="ty">MaterialTheme</span>.colorScheme.tertiary)
) {
    <span class="ty">Text</span>(
        text = text,
        style = style.copy(
            brush = <span class="ty">Brush</span>.linearGradient(colors = colors)
        )
    )
}

<span class="cm">// Usage</span>
<span class="ty">GradientText</span>(
    text = <span class="st">"Compose Magic"</span>,
    style = <span class="ty">MaterialTheme</span>.typography.displaySmall,
    colors = listOf(
        <span class="ty">Color</span>(<span class="nu">0xFF667EEA</span>.toInt()),
        <span class="ty">Color</span>(<span class="nu">0xFF9C4ADB</span>.toInt()),
        <span class="ty">Color</span>(<span class="nu">0xFFF093FB</span>.toInt())
    )
)

<span class="cm">// Inline in AnnotatedString for mixed styles</span>
<span class="ty">Text</span>(
    text = buildAnnotatedString {
        <span class="kw">withStyle</span>(<span class="ty">SpanStyle</span>(
            brush = <span class="ty">Brush</span>.linearGradient(listOf(<span class="ty">Color</span>.Blue, <span class="ty">Color</span>.Cyan))
        )) {
            append(<span class="st">"Gradient"</span>)
        }
        append(<span class="st">" normal text"</span>)
    }
)`
  },
];
