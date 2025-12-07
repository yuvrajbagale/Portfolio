import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-three-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three-background.component.html',
  styleUrls: ['./three-background.component.css']
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;
  @Input() particleCount: number = 1000;
  @Input() particleColor: number = 0x0ea5e9;
  @Input() enableRotation: boolean = true;
  @Input() animationSpeed: number = 1;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private animationId: number | null = null;
  private isDarkMode: boolean = false;

  constructor(private threeService: ThreeService) {
    // Check theme
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  ngOnInit(): void {
    this.initThreeScene();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initThreeScene(): void {
    const container = this.canvasContainer.nativeElement;
    
    // Create scene
    const { scene, camera, renderer } = this.threeService.createBasicScene(container, {
      backgroundColor: this.isDarkMode ? 0x111827 : 0xffffff,
      cameraPosition: { x: 0, y: 0, z: 5 }
    });

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Make background transparent
    this.scene.background = null;
    this.renderer.setClearColor(0x000000, 0);

    // Add lighting
    this.threeService.addLighting(this.scene, {
      ambientIntensity: 0.3,
      directionalIntensity: 0.5,
      pointLightIntensity: 0.5
    });

    // Create particles
    this.particles = this.threeService.createParticleSystem(
      this.particleCount,
      this.particleColor,
      0.02
    );
    this.scene.add(this.particles);

    // Add some 3D shapes
    this.add3DShapes();

    // Start animation
    this.animate();
  }

  private add3DShapes(): void {
    // Add rotating cubes
    for (let i = 0; i < 5; i++) {
      const cube = this.threeService.createRotatingCube(
        0.3,
        this.particleColor
      );
      cube.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      (cube as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      this.scene.add(cube);
    }

    // Add spheres
    for (let i = 0; i < 3; i++) {
      const sphere = this.threeService.createAnimatedSphere(
        0.2,
        this.particleColor
      );
      sphere.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      (sphere as any).pulseSpeed = Math.random() * 0.01 + 0.005;
      (sphere as any).baseScale = 1;
      this.scene.add(sphere);
    }
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001 * this.animationSpeed;

    // Animate particles
    if (this.particles) {
      const positions = this.particles.geometry.attributes['position'] as THREE.BufferAttribute;
      const count = positions.count;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions.array[i3] += Math.sin(time + i) * 0.0001;
        positions.array[i3 + 1] += Math.cos(time + i) * 0.0001;
        positions.array[i3 + 2] += Math.sin(time * 0.5 + i) * 0.0001;
      }

      positions.needsUpdate = true;
    }

    // Animate shapes
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        if (this.enableRotation) {
          if ((child as any).rotationSpeed) {
            child.rotation.x += (child as any).rotationSpeed.x * this.animationSpeed;
            child.rotation.y += (child as any).rotationSpeed.y * this.animationSpeed;
            child.rotation.z += (child as any).rotationSpeed.z * this.animationSpeed;
          } else {
            child.rotation.x += 0.01 * this.animationSpeed;
            child.rotation.y += 0.01 * this.animationSpeed;
          }
        }

        // Pulse effect for spheres
        if ((child as any).pulseSpeed) {
          const scale = (child as any).baseScale + Math.sin(time * 2) * 0.2;
          child.scale.set(scale, scale, scale);
        }
      }
    });

    // Rotate camera slightly for dynamic effect
    if (this.enableRotation) {
      this.camera.position.x = Math.sin(time * 0.1) * 0.5;
      this.camera.position.y = Math.cos(time * 0.1) * 0.5;
      this.camera.lookAt(0, 0, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.scene && this.renderer) {
      this.threeService.disposeScene(this.scene, this.renderer);
    }
  }
}

