import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  /**
   * Create a basic scene with camera and renderer
   */
  createBasicScene(container: HTMLElement, options?: {
    backgroundColor?: number;
    cameraPosition?: { x: number; y: number; z: number };
    enableControls?: boolean;
  }): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls?: any;
  } {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(options?.backgroundColor || 0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(
      options?.cameraPosition?.x || 0,
      options?.cameraPosition?.y || 0,
      options?.cameraPosition?.z || 5
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return { scene, camera, renderer };
  }

  /**
   * Create animated particles
   */
  createParticleSystem(
    count: number = 1000,
    color: number = 0x0ea5e9,
    size: number = 0.02
  ): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const threeColor = new THREE.Color(color);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      colors[i] = threeColor.r;
      colors[i + 1] = threeColor.g;
      colors[i + 2] = threeColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: size,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  }

  /**
   * Create 3D text geometry
   */
  async createTextGeometry(
    text: string,
    options?: {
      font?: string;
      size?: number;
      height?: number;
      color?: number;
    }
  ): Promise<THREE.Mesh> {
    // For now, we'll use a simple approach
    // In production, you'd load a font file
    const geometry = new THREE.BoxGeometry(
      options?.size || 1,
      options?.size || 1,
      options?.height || 0.2
    );
    const material = new THREE.MeshStandardMaterial({
      color: options?.color || 0x0ea5e9,
      metalness: 0.7,
      roughness: 0.3
    });

    return new THREE.Mesh(geometry, material);
  }

  /**
   * Create animated rotating cube
   */
  createRotatingCube(size: number = 1, color: number = 0x0ea5e9): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.7,
      roughness: 0.3,
      emissive: color,
      emissiveIntensity: 0.2
    });

    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  /**
   * Create animated sphere
   */
  createAnimatedSphere(
    radius: number = 1,
    color: number = 0x0ea5e9
  ): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9
    });

    const sphere = new THREE.Mesh(geometry, material);
    return sphere;
  }

  /**
   * Create wireframe geometry
   */
  createWireframe(geometry: THREE.BufferGeometry, color: number = 0x0ea5e9): THREE.LineSegments {
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: color });
    return new THREE.LineSegments(edges, material);
  }

  /**
   * Add lighting to scene
   */
  addLighting(scene: THREE.Scene, options?: {
    ambientIntensity?: number;
    directionalIntensity?: number;
    pointLightIntensity?: number;
  }): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      options?.ambientIntensity || 0.5
    );
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      options?.directionalIntensity || 1
    );
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Point light
    const pointLight = new THREE.PointLight(
      0x0ea5e9,
      options?.pointLightIntensity || 1,
      100
    );
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);
  }

  /**
   * Create animation loop
   */
  createAnimationLoop(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    onAnimate?: (delta: number) => void
  ): () => void {
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (onAnimate) {
        onAnimate(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Return cleanup function
    return () => {
      // Cleanup if needed
    };
  }

  /**
   * Cleanup Three.js resources
   */
  disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer): void {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    renderer.dispose();
    renderer.domElement.remove();
  }
}

