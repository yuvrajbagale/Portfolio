# Three.js 3D Elements Setup

## What's Implemented

### 1. Three.js Service (`src/app/services/three.service.ts`)
A comprehensive service for managing Three.js scenes, objects, and animations:
- Scene creation and management
- Particle systems
- 3D shapes (cubes, spheres, wireframes)
- Lighting setup
- Animation loops
- Resource cleanup

### 2. 3D Background Component (`src/app/components/three-background/`)
- Animated particle system (800 particles)
- Rotating 3D cubes and spheres
- Smooth animations
- Theme-aware colors
- Performance optimized

### 3. 3D Logo Component (`src/app/components/three-logo/`)
- 3D text/logo rendering
- Animated logo with rotation and pulse
- Customizable text and colors
- Wireframe effects

### 4. Interactive 3D Component (`src/app/components/three-interactive/`)
- Mouse-interactive 3D shapes
- Hover effects
- Responsive to mouse movement
- Perfect for showcasing skills or projects

## Usage

### 3D Background (Already Integrated)
The 3D background is automatically added to your app. It shows:
- Animated particles
- Rotating 3D shapes
- Smooth camera movement

### Add 3D Logo to Header
```html
<!-- In header.component.html -->
<app-three-logo
  [text]="'YB'"
  [size]="1.5"
  [color]="0x0ea5e9"
  [enableAnimation]="true"
></app-three-logo>
```

### Add Interactive 3D Element
```html
<!-- In any component -->
<app-three-interactive
  [width]="300"
  [height]="300"
  [color]="0x0ea5e9"
></app-three-interactive>
```

## Customization

### Change Particle Count
```html
<app-three-background [particleCount]="500"></app-three-background>
```

### Change Colors
Update in `app.component.ts`:
```typescript
threeColor = 0x0ea5e9; // Primary blue
// Or use other colors:
// 0x8b5cf6 (Purple)
// 0xec4899 (Pink)
```

### Disable Animations
```html
<app-three-background [enableRotation]="false"></app-three-background>
```

## Performance Notes

- Three.js adds ~400KB to bundle size (expected)
- Animations run at 60fps
- Particles are optimized for performance
- Automatic cleanup on component destroy

## Adding 3D Models

To add custom 3D models (GLTF/GLB):

1. Install GLTF loader:
```bash
npm install three/examples/jsm/loaders/GLTFLoader
```

2. Load model in component:
```typescript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
loader.load('/assets/models/your-model.gltf', (gltf) => {
  this.scene.add(gltf.scene);
});
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Supported (may impact performance)

## Troubleshooting

### 3D elements not showing?
- Check browser console for errors
- Ensure WebGL is enabled
- Try disabling hardware acceleration if issues occur

### Performance issues?
- Reduce particle count
- Disable rotation animations
- Use fewer 3D shapes

### Black screen?
- Check if WebGL is supported: `navigator.webgl`
- Verify Three.js is properly imported
- Check browser console for errors

