# Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

3. **Build for Production**
   ```bash
   npm run build
   ```

## Customization Checklist

### 1. Update Personal Information
- [ ] Edit `src/app/pages/about/about.component.ts` - Update skills and experience
- [ ] Edit `src/app/pages/resume/resume.component.ts` - Update resume data
- [ ] Edit `src/app/pages/contact/contact.component.html` - Update contact info
- [ ] Edit `src/app/components/footer/footer.component.ts` - Update social links

### 2. Add Your Projects
- [ ] Edit `src/app/services/project.service.ts` - Add your project data
- [ ] Add project images to `src/assets/` folder
- [ ] Update project URLs (GitHub, Live site)

### 3. Customize Colors
- [ ] Edit `tailwind.config.js` - Update primary color scheme
- [ ] Adjust gradient colors in components

### 4. Add Resume PDF
- [ ] Place your resume PDF in `src/assets/`
- [ ] Update resume download functionality in `resume.component.ts`

### 5. Configure Contact Form
- [ ] Set up email service (SendGrid, etc.)
- [ ] Update contact form submission in `contact.component.ts`
- [ ] Add API endpoint for form submission

### 6. Add Lottie Animations (Optional)
- [ ] Install lottie-web: `npm install lottie-web`
- [ ] Add Lottie JSON files to `src/assets/`
- [ ] Integrate in contact page or other components

## Notes

- **GSAP ScrollTrigger**: The project uses GSAP free version. ScrollTrigger is commented out as it requires a premium license. Uncomment if you have GSAP premium.
- **Images**: Project images use placeholder URLs. Replace with your actual project images.
- **Email Service**: Contact form currently simulates submission. Integrate with your preferred email service.

## Deployment

### AWS S3
1. Build: `npm run build`
2. Upload `dist/portfolivo` to S3 bucket
3. Configure static website hosting

### Netlify/Vercel
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist/portfolivo`

## Support

For issues or questions, refer to the main README.md file.

