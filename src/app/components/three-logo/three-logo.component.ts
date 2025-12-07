import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-three-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three-logo.component.html',
  styleUrls: ['./three-logo.component.css']
})
export class ThreeLogoComponent implements OnInit, OnDestroy {
  @ViewChild('logoContainer', { static: true }) logoContainer!: ElementRef<HTMLDivElement>;
  @Input() text: string = 'YB';
  @Input() size: number = 2;
  @Input() color: number = 0x0ea5e9;
  @Input() enableAnimation: boolean = true;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private logoMesh!: THREE.Group;
  private animationId: number | null = null;

  constructor(private threeService: ThreeService) {}

  ngOnInit(): void {
    this.initLogo();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private async initLogo(): Promise<void> {
    const container = this.logoContainer.nativeElement;
    
    // Create scene
    const { scene, camera, renderer } = this.threeService.createBasicScene(container, {
      backgroundColor: 0x000000,
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
      ambientIntensity: 0.5,
      directionalIntensity: 1,
      pointLightIntensity: 0.8
    });

    // Create logo from letters
    this.logoMesh = await this.createLogoMesh();
    this.scene.add(this.logoMesh);

    // Start animation
    if (this.enableAnimation) {
      this.animate();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private async createLogoMesh(): Promise<THREE.Group> {
    const group = new THREE.Group();
    const letters = this.text.split('');

    letters.forEach((letter, index) => {
      // Create letter geometry (simplified - using boxes for now)
      const geometry = new THREE.BoxGeometry(
        this.size * 0.8,
        this.size,
        this.size * 0.2
      );
      
      const material = new THREE.MeshStandardMaterial({
        color: this.color,
        metalness: 0.8,
        roughness: 0.2,
        emissive: this.color,
        emissiveIntensity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (index - (letters.length - 1) / 2) * this.size * 1.2;
      
      // Add wireframe
      const wireframe = this.threeService.createWireframe(geometry, this.color);
      mesh.add(wireframe);

      group.add(mesh);
    });

    return group;
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    if (this.logoMesh) {
      // Rotate logo
      this.logoMesh.rotation.y = Math.sin(time * 0.5) * 0.2;
      this.logoMesh.rotation.x = Math.cos(time * 0.3) * 0.1;

      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.05;
      this.logoMesh.scale.set(scale, scale, scale);

      // Animate individual letters
      this.logoMesh.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(time * 2 + index) * 0.1;
          child.rotation.z = Math.sin(time + index) * 0.1;
        }
      });
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

