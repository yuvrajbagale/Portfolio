# Spider Web Cursor Component 🕸️✨

A **trending**, dynamic, physics-based particle network animation that follows the mouse cursor, creating a beautiful "spider-web" effect with modern design features.

## 🎨 Trending Features

- 🌈 **Dynamic Gradient Colors** - Colors shift based on mouse position and time
- ✨ **Enhanced Glow Effects** - Multi-layer glow with customizable intensity
- 🎯 **Particle Trails** - Beautiful trailing effects following particles
- 🎭 **Multiple Color Themes** - 6 preset themes + auto mode
- 🌊 **Wave Effects** - Organic, fluid motion with wave distortions
- 💫 **Smooth Mouse Tracking** - Elastic, physics-based cursor following
- 🎪 **Interactive Enhancements** - Enhanced effects on buttons, links, and magnetic elements
- 🎨 **Gradient Connections** - Lines with smooth color gradients
- ⚡ **Performance Optimized** - 60fps smooth animations
- ♿ **Accessible** - Respects `prefers-reduced-motion` and auto-disables on touch devices

## 🚀 Usage

### Basic Usage

```html
<app-spider-web-cursor></app-spider-web-cursor>
```

### Full Customization

```html
<app-spider-web-cursor
  [particleCount]="60"
  [maxDistance]="180"
  [cursorForce]="0.12"
  [speed]="0.6"
  [connectToCursor]="true"
  [pauseOnScroll]="false"
  [enableGlow]="true"
  [particleSize]="2.5"
  theme="neon"
  [enableTrails]="true"
  [enableGradient]="true"
  [enableWaveEffect]="true"
></app-spider-web-cursor>
```

## 📋 Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `particleCount` | `number` | `50` | Number of particles in the network |
| `maxDistance` | `number` | `150` | Maximum distance for particle connections |
| `particleColor` | `string` | `''` | Custom particle color (overrides theme) |
| `lineColor` | `string` | `''` | Custom line color (overrides theme) |
| `cursorForce` | `number` | `0.1` | Strength of cursor attraction (0-1) |
| `speed` | `number` | `0.5` | Base movement speed of particles |
| `connectToCursor` | `boolean` | `true` | Whether to draw lines from particles to cursor |
| `pauseOnScroll` | `boolean` | `false` | Pause animation during scroll |
| `enableGlow` | `boolean` | `true` | Enable multi-layer glow effect on particles |
| `particleSize` | `number` | `2` | Base radius of particles in pixels |
| `theme` | `string` | `'auto'` | Color theme: `'auto'`, `'neon'`, `'ocean'`, `'sunset'`, `'forest'`, `'purple'`, `'cyber'` |
| `enableTrails` | `boolean` | `true` | Enable particle trail effects |
| `enableGradient` | `boolean` | `true` | Enable dynamic gradient colors |
| `enableWaveEffect` | `boolean` | `true` | Enable wave distortion effects |

## 🎨 Color Themes

### Available Themes

1. **`auto`** - Automatically adapts to dark/light mode
2. **`neon`** - Vibrant cyan, magenta, green (cyberpunk style)
3. **`ocean`** - Blue tones (calm, aquatic)
4. **`sunset`** - Warm reds and oranges
5. **`forest`** - Green nature tones
6. **`purple`** - Purple and violet shades
7. **`cyber`** - High-contrast cyberpunk (green, cyan, magenta, yellow)

### Theme Examples

```html
<!-- Neon Cyberpunk Theme -->
<app-spider-web-cursor theme="neon"></app-spider-web-cursor>

<!-- Ocean Theme -->
<app-spider-web-cursor theme="ocean"></app-spider-web-cursor>

<!-- Sunset Theme -->
<app-spider-web-cursor theme="sunset"></app-spider-web-cursor>
```

## ✨ New Features

### Dynamic Gradients
Colors automatically shift based on:
- Mouse position (X-axis affects hue)
- Time (continuous color animation)
- Theme selection

### Particle Trails
Particles leave beautiful trailing effects that fade over time, creating a sense of motion and depth.

### Wave Effects
Organic wave distortions create fluid, natural motion patterns.

### Enhanced Glow
Multi-layer glow effects with:
- Outer glow (soft, large radius)
- Inner glow (bright, tight radius)
- Sparkle effects on interactive elements

### Gradient Connections
Lines between particles use smooth gradients, creating a more organic, flowing appearance.

## 🎯 Interactive Elements

The component automatically detects and enhances interaction with:
- `<button>` elements
- `<a>` (links)
- Elements with `.magnetic` class

When hovering these elements:
- Line strength increases 2.5x
- Particle attraction doubles
- Particle size increases 2x
- Sparkle effects appear
- Connection distance increases

## 🎨 Customization Examples

### Minimalist Style
```html
<app-spider-web-cursor
  [particleCount]="30"
  [enableGlow]="false"
  [enableTrails]="false"
  theme="auto"
></app-spider-web-cursor>
```

### Maximum Impact
```html
<app-spider-web-cursor
  [particleCount]="100"
  [maxDistance]="250"
  [enableGlow]="true"
  [enableTrails]="true"
  [enableGradient]="true"
  [enableWaveEffect]="true"
  theme="cyber"
></app-spider-web-cursor>
```

### Subtle Background Effect
```html
<app-spider-web-cursor
  [particleCount]="40"
  [maxDistance]="120"
  [cursorForce]="0.05"
  [enableGlow]="false"
  theme="ocean"
></app-spider-web-cursor>
```

## ⚡ Performance

- ✅ Auto-disables on touch devices
- ✅ Respects `prefers-reduced-motion` (reduces particle count and speed)
- ✅ Uses `requestAnimationFrame` for smooth 60fps animation
- ✅ Runs outside Angular zone for optimal performance
- ✅ Cached vector calculations
- ✅ Retina display support (high DPI scaling)
- ✅ Efficient trail management (max 5 points per particle)

## 🎭 CSS Positioning

The canvas is positioned:
- `position: fixed` - Fullscreen overlay
- `z-index: 1` - Behind UI but above background
- `pointer-events: none` - Doesn't interfere with clicks

Make sure your main content has `z-index: 10` or higher.

## 🔧 Advanced Customization

### Custom Colors (Overrides Theme)

```html
<app-spider-web-cursor
  particleColor="rgba(255, 0, 150, 0.8)"
  lineColor="rgba(255, 0, 150, 0.4)"
  theme="auto"
></app-spider-web-cursor>
```

### Combining Features

```html
<app-spider-web-cursor
  theme="neon"
  [enableGlow]="true"
  [enableTrails]="true"
  [enableGradient]="true"
  [enableWaveEffect]="true"
  [particleCount]="80"
></app-spider-web-cursor>
```

## 🎪 Magnetic Elements

Add the `magnetic` class to any element for enhanced interaction:

```html
<button class="magnetic">Hover Me</button>
<a href="#" class="magnetic">Link with Effect</a>
<div class="magnetic">Any Element</div>
```

## 🐛 Troubleshooting

### Canvas not visible
- Check that `z-index` of main content is higher than canvas (default: 1)
- Verify component is not hidden (touch device check)

### Performance issues
- Reduce `particleCount` (try 30-40)
- Reduce `maxDistance` (try 100-120)
- Disable `enableGlow` or `enableTrails`
- Disable `enableWaveEffect`

### Colors not changing
- Ensure `enableGradient` is `true`
- Check theme is set correctly
- Verify `ThemeService` is properly configured

### Not responding to theme changes
- Ensure `ThemeService` is properly configured
- Check that component is included in app module
- Verify theme name is correct (case-sensitive)

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ⚠️ Auto-disabled (touch detection)

## 🎨 Design Trends Implemented

- ✅ **Glassmorphism** - Subtle backdrop effects
- ✅ **Neon/Glow** - Vibrant glow effects
- ✅ **Gradient Animations** - Dynamic color shifts
- ✅ **Particle Systems** - Modern particle effects
- ✅ **Magnetic Interactions** - Enhanced hover effects
- ✅ **Smooth Animations** - Physics-based motion
- ✅ **Color Psychology** - Multiple themed palettes

## 📝 License

Part of the Portfolivo project.

---

**Made with ❤️ and modern web technologies**
