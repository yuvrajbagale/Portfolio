import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  HostListener,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

// Optional: Uncomment for GSAP-powered smoother motion
// import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  targetRadius: number;
  hue: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

interface ColorTheme {
  name: string;
  particles: string[];
  lines: string[];
  cursor: string[];
}

@Component({
  selector: 'app-spider-web-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spider-web-cursor.component.html',
  styleUrls: ['./spider-web-cursor.component.css']
})
export class SpiderWebCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Input properties
  @Input() particleCount: number = 50;
  @Input() maxDistance: number = 150;
  @Input() particleColor: string = '';
  @Input() lineColor: string = '';
  @Input() cursorForce: number = 0.1;
  @Input() speed: number = 0.5;
  @Input() connectToCursor: boolean = true;
  @Input() pauseOnScroll: boolean = false;
  @Input() enableGlow: boolean = true;
  @Input() particleSize: number = 2;
  @Input() theme: 'auto' | 'neon' | 'ocean' | 'sunset' | 'forest' | 'purple' | 'cyber' = 'auto';
  @Input() enableTrails: boolean = true;
  @Input() enableGradient: boolean = true;
  @Input() enableWaveEffect: boolean = true;

  // Internal state
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private smoothMouseX: number = 0;
  private smoothMouseY: number = 0;
  private isMouseActive: boolean = false;
  private animationFrameId: number = 0;
  private isPaused: boolean = false;
  isTouchDevice: boolean = false;
  prefersReducedMotion: boolean = false;
  private isHoveringInteractive: boolean = false;
  private time: number = 0;
  private colorOffset: number = 0;

  // Theme
  private isDarkMode: boolean = false;
  private themeSubscription?: Subscription;
  private currentTheme: ColorTheme | null = null;

  // Cached values
  private width: number = 0;
  private height: number = 0;
  private halfWidth: number = 0;
  private halfHeight: number = 0;

  // Color themes
  private themes: { [key: string]: ColorTheme } = {
    neon: {
      name: 'Neon',
      particles: ['#00f5ff', '#ff00ff', '#00ff88', '#ff0080'],
      lines: ['#00f5ff', '#ff00ff'],
      cursor: ['#00ffff', '#ff00ff']
    },
    ocean: {
      name: 'Ocean',
      particles: ['#00d4ff', '#0099cc', '#0066ff', '#00bfff'],
      lines: ['#00d4ff', '#0099cc'],
      cursor: ['#00ffff', '#0080ff']
    },
    sunset: {
      name: 'Sunset',
      particles: ['#ff6b6b', '#ffa500', '#ff4757', '#ff6348'],
      lines: ['#ff6b6b', '#ffa500'],
      cursor: ['#ff4757', '#ffa500']
    },
    forest: {
      name: 'Forest',
      particles: ['#00ff88', '#32cd32', '#00cc66', '#00ff99'],
      lines: ['#00ff88', '#32cd32'],
      cursor: ['#00ff99', '#00cc66']
    },
    purple: {
      name: 'Purple',
      particles: ['#a855f7', '#9333ea', '#c084fc', '#d946ef'],
      lines: ['#a855f7', '#9333ea'],
      cursor: ['#c084fc', '#d946ef']
    },
    cyber: {
      name: 'Cyber',
      particles: ['#00ff41', '#00d9ff', '#ff00ff', '#ffff00'],
      lines: ['#00ff41', '#00d9ff'],
      cursor: ['#00ffff', '#ff00ff']
    }
  };

  constructor(
    private ngZone: NgZone,
    private themeService: ThemeService
  ) {
    this.detectTouchDevice();
    this.detectReducedMotion();
  }

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.updateTheme();
    });
    this.updateTheme();
  }

  ngAfterViewInit(): void {
    if (this.isTouchDevice || this.prefersReducedMotion) {
      return;
    }

    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    if (!this.ctx) {
      console.warn('Canvas context not available');
      return;
    }

    this.initCanvas();
    this.initParticles();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.themeSubscription?.unsubscribe();
    this.removeEventListeners();
  }

  private detectTouchDevice(): void {
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private detectReducedMotion(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) {
      this.particleCount = Math.floor(this.particleCount * 0.3);
      this.speed *= 0.5;
    }
  }

  private initCanvas(): void {
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    // Set actual size in memory (scaled for retina displays)
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // Scale context for retina displays
    this.ctx.scale(dpr, dpr);
  }

  private updateTheme(): void {
    if (this.theme === 'auto') {
      this.currentTheme = null; // Will use default colors
    } else {
      this.currentTheme = this.themes[this.theme] || this.themes['neon'];
    }
  }

  private getParticleColor(particle?: Particle): string {
    if (this.particleColor) return this.particleColor;
    
    if (this.currentTheme && this.enableGradient) {
      const colors = this.currentTheme.particles;
      const index = particle ? Math.floor(particle.hue) % colors.length : 0;
      return colors[index] + 'cc'; // Add alpha
    }

    // Dynamic gradient based on mouse position
    if (this.enableGradient && this.isMouseActive) {
      const hue = (this.colorOffset + (this.mouseX / this.width) * 60) % 360;
      return `hsla(${hue}, 70%, 60%, 0.8)`;
    }

    return this.isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.6)';
  }

  private getLineColor(p1?: Particle, p2?: Particle): string {
    if (this.lineColor) return this.lineColor;
    
    if (this.currentTheme && this.enableGradient) {
      const colors = this.currentTheme.lines;
      return colors[0] + '80'; // Add alpha
    }

    // Gradient line color
    if (this.enableGradient && p1 && p2) {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const hue = (this.colorOffset + (midX / this.width) * 60) % 360;
      return `hsla(${hue}, 70%, 50%, 0.4)`;
    }

    return this.isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)';
  }

  private getCursorLineColor(): string {
    if (this.currentTheme && this.enableGradient) {
      const colors = this.currentTheme.cursor;
      return colors[0] + 'aa';
    }

    if (this.enableGradient && this.isMouseActive) {
      const hue = (this.colorOffset + (this.mouseX / this.width) * 60) % 360;
      return `hsla(${hue}, 80%, 70%, 0.6)`;
    }

    return this.isDarkMode ? 'rgba(147, 197, 253, 0.6)' : 'rgba(59, 130, 246, 0.5)';
  }

  private initParticles(): void {
    this.particles = [];
    const baseRadius = this.particleSize;

    for (let i = 0; i < this.particleCount; i++) {
      const hue = (360 / this.particleCount) * i;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
        radius: baseRadius,
        baseRadius: baseRadius,
        targetRadius: baseRadius,
        hue: hue,
        trail: []
      });
    }
  }

  private startAnimation(): void {
    if (this.animationFrameId) return;

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private animate = (): void => {
    if (this.isPaused) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    this.time += 0.016; // ~60fps
    this.colorOffset = (this.colorOffset + 0.5) % 360;

    // Smooth mouse position
    this.smoothMouseX += (this.mouseX - this.smoothMouseX) * 0.1;
    this.smoothMouseY += (this.mouseY - this.smoothMouseY) * 0.1;

    this.updateParticles();
    this.draw();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updateParticles(): void {
    const mouseForce = this.isMouseActive ? this.cursorForce : 0;
    const interactiveMultiplier = this.isHoveringInteractive ? 2.5 : 1;
    const effectiveForce = mouseForce * interactiveMultiplier;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Wave effect on particles
      if (this.enableWaveEffect) {
        const waveX = Math.sin(this.time * 2 + p.x * 0.01) * 2;
        const waveY = Math.cos(this.time * 2 + p.y * 0.01) * 2;
        p.vx += waveX * 0.01;
        p.vy += waveY * 0.01;
      }

      // Mouse attraction/repulsion
      if (this.isMouseActive) {
        const dx = this.smoothMouseX - p.x;
        const dy = this.smoothMouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 50;

        if (distance < minDistance) {
          // Repel when too close
          const force = (minDistance - distance) / minDistance;
          p.vx -= (dx / distance) * force * 0.08;
          p.vy -= (dy / distance) * force * 0.08;
        } else if (distance < this.maxDistance * 2) {
          // Attract when in range
          const force = effectiveForce / (distance * 0.1);
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }
      }

      // Particle interactions (repulsion)
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minParticleDistance = 30;

        if (distance < minParticleDistance && distance > 0) {
          const force = (minParticleDistance - distance) / minParticleDistance * 0.02;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          p.vx -= fx;
          p.vy -= fy;
          p2.vx += fx;
          p2.vy += fy;
        }
      }

      // Apply velocity with damping
      p.vx *= 0.94;
      p.vy *= 0.94;

      // Add random drift
      p.vx += (Math.random() - 0.5) * 0.02 * this.speed;
      p.vy += (Math.random() - 0.5) * 0.02 * this.speed;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Boundary wrapping
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Update trail
      if (this.enableTrails) {
        p.trail.push({ x: p.x, y: p.y, opacity: 1 });
        if (p.trail.length > 5) {
          p.trail.shift();
        }
        // Fade trail
        p.trail.forEach(point => {
          point.opacity *= 0.7;
        });
      }

      // Smooth radius animation
      p.radius += (p.targetRadius - p.radius) * 0.1;

      // Update hue for color animation
      p.hue = (p.hue + 0.5) % 360;
    }
  }

  private draw(): void {
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw trails
    if (this.enableTrails) {
      this.drawTrails();
    }

    // Draw connections between particles
    this.drawConnections();

    // Draw cursor connection
    if (this.connectToCursor && this.isMouseActive) {
      this.drawCursorConnections();
    }

    // Draw particles
    this.drawParticles();
  }

  private drawTrails(): void {
    for (const particle of this.particles) {
      if (particle.trail.length < 2) continue;

      const color = this.getParticleColor(particle);
      for (let i = 0; i < particle.trail.length - 1; i++) {
        const point = particle.trail[i];
        const nextPoint = particle.trail[i + 1];

        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(nextPoint.x, nextPoint.y);
        this.ctx.strokeStyle = color.replace('0.8', (point.opacity * 0.3).toString()).replace('0.6', (point.opacity * 0.2).toString());
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }
  }

  private drawConnections(): void {
    const maxDist = this.isHoveringInteractive ? this.maxDistance * 1.5 : this.maxDistance;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          const opacity = (1 - distance / maxDist) * 0.6;
          const lineWidth = (1 - distance / maxDist) * 1.5;

          // Create gradient line
          const gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          const color1 = this.getLineColor(p1, p2);
          const color2 = this.getLineColor(p2, p1);
          
          gradient.addColorStop(0, color1.replace(/[\d.]+\)$/, `${opacity})`));
          gradient.addColorStop(1, color2.replace(/[\d.]+\)$/, `${opacity})`));

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = lineWidth;
          this.ctx.stroke();
        }
      }
    }
  }

  private drawCursorConnections(): void {
    const maxDist = this.maxDistance * 2.5;
    const cursorColor = this.getCursorLineColor();

    for (const particle of this.particles) {
      const dx = this.smoothMouseX - particle.x;
      const dy = this.smoothMouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDist) {
        const opacity = (1 - distance / maxDist) * 0.8;
        const lineWidth = (1 - distance / maxDist) * 2.5;

        // Create gradient from particle to cursor
        const gradient = this.ctx.createLinearGradient(
          particle.x, particle.y,
          this.smoothMouseX, this.smoothMouseY
        );
        const particleColor = this.getParticleColor(particle);
        gradient.addColorStop(0, particleColor.replace(/[\d.]+\)$/, `${opacity * 0.5})`));
        gradient.addColorStop(1, cursorColor.replace(/[\d.]+\)$/, `${opacity})`));

        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.smoothMouseX, this.smoothMouseY);
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();

        // Add glow effect on cursor lines
        if (this.enableGlow) {
          this.ctx.shadowBlur = 10;
          this.ctx.shadowColor = cursorColor;
          this.ctx.stroke();
          this.ctx.shadowBlur = 0;
        }
      }
    }
  }

  private drawParticles(): void {
    for (const particle of this.particles) {
      const particleColor = this.getParticleColor(particle);

      // Enhanced glow effect with multiple layers
      if (this.enableGlow) {
        // Outer glow
        const outerGradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        outerGradient.addColorStop(0, particleColor);
        outerGradient.addColorStop(0.5, particleColor.replace(/[\d.]+\)$/, '0.3)'));
        outerGradient.addColorStop(1, particleColor.replace(/[\d.]+\)$/, '0)'));

        this.ctx.fillStyle = outerGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Inner glow
        const innerGradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        innerGradient.addColorStop(0, particleColor.replace(/[\d.]+\)$/, '1)'));
        innerGradient.addColorStop(1, particleColor);

        this.ctx.fillStyle = innerGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Draw particle core
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particleColor;
      this.ctx.fill();

      // Add sparkle effect on interactive hover
      if (this.isHoveringInteractive && Math.random() > 0.95) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(
          particle.x + (Math.random() - 0.5) * particle.radius * 2,
          particle.y + (Math.random() - 0.5) * particle.radius * 2,
          1, 0, Math.PI * 2
        );
        this.ctx.fill();
      }
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isTouchDevice) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.isMouseActive = true;

    // Check for interactive elements
    this.checkInteractiveElements(event.target as HTMLElement);
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.isMouseActive = false;
    this.isHoveringInteractive = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    // Reposition particles if needed
    for (const particle of this.particles) {
      if (particle.x > this.width) particle.x = this.width;
      if (particle.y > this.height) particle.y = this.height;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.pauseOnScroll) {
      this.isPaused = true;
      setTimeout(() => {
        this.isPaused = false;
      }, 100);
    }
  }

  private checkInteractiveElements(element: HTMLElement | null): void {
    if (!element) {
      this.isHoveringInteractive = false;
      return;
    }

    const tagName = element.tagName.toLowerCase();
    const isInteractive = 
      tagName === 'button' ||
      tagName === 'a' ||
      element.classList.contains('magnetic') ||
      element.closest('button, a, .magnetic') !== null;

    this.isHoveringInteractive = isInteractive;

    // Enhanced particle size on hover
    if (isInteractive) {
      for (const particle of this.particles) {
        particle.targetRadius = this.particleSize * 2;
      }
    } else {
      for (const particle of this.particles) {
        particle.targetRadius = this.particleSize;
      }
    }
  }

  private removeEventListeners(): void {
    // Event listeners are handled by @HostListener decorators
    // Angular will clean them up automatically
  }
}
