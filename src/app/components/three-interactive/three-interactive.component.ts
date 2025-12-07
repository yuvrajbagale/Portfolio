import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-three-interactive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three-interactive.component.html',
  styleUrls: ['./three-interactive.component.css']
})
export class ThreeInteractiveComponent implements OnInit, OnDestroy {
  @ViewChild('interactiveContainer', { static: true }) interactiveContainer!: ElementRef<HTMLDivElement>;
  @Input() width: number = 300;
  @Input() height: number = 300;
  @Input() color: number = 0x0ea5e9;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;
  private animationId: number | null = null;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private threeService: ThreeService) {}

  ngOnInit(): void {
    this.initInteractiveScene();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initInteractiveScene(): void {
    const container = this.interactiveContainer.nativeElement;
    container.style.width = `${this.width}px`;
    container.style.height = `${this.height}px`;
    
    // Create scene
    const { scene, camera, renderer } = this.threeService.createBasicScene(container, {
      backgroundColor: 0x000000,
      cameraPosition: { x: 0, y: 0, z: 3 }
    });

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Make background transparent
    this.scene.background = null;
    this.renderer.setClearColor(0x000000, 0);

    // Add lighting
    this.threeService.addLighting(this.scene);

    // Create interactive mesh
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: this.color,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    // Add wireframe
    const wireframe = this.threeService.createWireframe(geometry, this.color);
    this.mesh.add(wireframe);

    // Add raycaster for mouse interaction
    this.setupMouseInteraction();

    // Start animation
    this.animate();
  }

  private setupMouseInteraction(): void {
    const container = this.interactiveContainer.nativeElement;
    
    container.addEventListener('mousemove', (event) => {
      const rect = container.getBoundingClientRect();
      this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    container.addEventListener('mouseenter', () => {
      (this.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(this.color);
      (this.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
    });

    container.addEventListener('mouseleave', () => {
      (this.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
    });
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    if (this.mesh) {
      // Rotate based on mouse position
      this.mesh.rotation.x += (this.mouseY * 0.5 - this.mesh.rotation.x) * 0.1;
      this.mesh.rotation.y += (this.mouseX * 0.5 - this.mesh.rotation.y) * 0.1;

      // Continuous rotation
      this.mesh.rotation.z += 0.01;

      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      this.mesh.scale.set(scale, scale, scale);
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

