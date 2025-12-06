import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { PortfolioData } from '../../portfolio-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  // Portfolio data
  contactInfo = PortfolioData.contactInfo;
  socialLinks = PortfolioData.socialLinks;
  contactEmail = PortfolioData.personalInfo.email;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeInUp('.contact-title', 0);
      GSAPAnimations.slideInLeft('.contact-form', 0.2);
      GSAPAnimations.slideInRight('.contact-info', 0.3);
    }, 200);
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      // Simulate API call
      // In a real application, you would integrate with SendGrid or another email service
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        
        // Simulate success/error
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        if (success) {
          this.submitSuccess = true;
          this.contactForm.reset();
        } else {
          this.submitError = true;
        }
        
        this.isSubmitting = false;

        // Reset success/error messages after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
          this.submitError = false;
        }, 5000);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}

