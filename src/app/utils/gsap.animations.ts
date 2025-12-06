import { gsap } from 'gsap';

// ScrollTrigger is optional - uncomment if you have GSAP premium
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

export class GSAPAnimations {
  static fadeInUp(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out'
      }
    );
  }

  static fadeIn(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power2.out'
      }
    );
  }

  static slideInLeft(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out'
      }
    );
  }

  static slideInRight(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out'
      }
    );
  }

  static scaleIn(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)'
      }
    );
  }

  static textReveal(element: HTMLElement | string, delay: number = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
        clipPath: 'inset(0 0 100% 0)'
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        delay,
        ease: 'power3.out'
      }
    );
  }

  static staggerFadeIn(elements: HTMLElement[] | string, delay: number = 0.1) {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: delay,
        ease: 'power2.out'
      }
    );
  }

  static scrollReveal(element: HTMLElement | string, trigger?: HTMLElement | string) {
    // Simple scroll reveal without ScrollTrigger (works without premium)
    // For ScrollTrigger support, uncomment the ScrollTrigger import above
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        // ScrollTrigger requires GSAP premium - using IntersectionObserver alternative
        // scrollTrigger: {
        //   trigger: trigger || element,
        //   start: 'top 80%',
        //   toggleActions: 'play none none reverse'
        // }
      }
    );
  }

  static floating(element: HTMLElement | string) {
    return gsap.to(element, {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  static rotateBlob(element: HTMLElement | string) {
    return gsap.to(element, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
  }
}

