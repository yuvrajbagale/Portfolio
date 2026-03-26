# Yuvraj Bagale - Portfolio

A modern, animated Angular 17 portfolio website showcasing the work and skills of Yuvraj Bagale, a Frontend Developer with 3.5+ years of experience.

## Features

- 🎨 **Modern UI/UX** - Clean, premium design inspired by Apple and Dribbble
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent storage
- ✨ **Smooth Animations** - GSAP-powered animations throughout the site
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🚀 **Fast Performance** - Optimized Angular standalone components
- 🎯 **SEO Friendly** - Proper meta tags and semantic HTML

## Tech Stack

- **Angular 17** - Latest Angular with standalone components
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animation library
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming

## Project Structure

```
src/
├── app/
│   ├── animations/          # Route animations
│   ├── components/          # Global components (Header, Footer)
│   ├── pages/              # Page components
│   │   ├── home/          # Home page with hero section
│   │   ├── about/         # About page with skills & timeline
│   │   ├── projects/      # Projects listing page
│   │   ├── project-detail/ # Individual project details
│   │   ├── resume/        # Resume page
│   │   └── contact/       # Contact form page
│   ├── services/          # Angular services
│   ├── utils/             # Utility functions (GSAP animations)
│   ├── app.component.ts   # Root component
│   └── app.routes.ts      # Routing configuration
├── assets/                # Static assets
├── styles.css             # Global styles with Tailwind
└── main.ts                # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolivo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/portfolivo` directory.

## Pages

### Home
- Animated hero section with gradient blobs
- Smooth text reveal animations
- Quick stats section
- Call-to-action buttons

### About
- Profile card with animated introduction
- Skills with progress bars
- Experience timeline with alternating layout

### Projects
- Card-based project grid
- Hover animations
- Project filtering by category
- Links to detailed project pages

### Project Detail
- Full project information
- Technology stack display
- Feature list
- Links to live site and GitHub

### Resume
- Structured resume layout
- Download functionality
- Skills categorization
- Experience and education sections

### Contact
- Validated contact form
- Real-time form validation
- Contact information display
- Social media links

## Customization

### Update Personal Information

Edit the following files:
- `src/app/pages/about/about.component.ts` - Skills and experience
- `src/app/pages/resume/resume.component.ts` - Resume data
- `src/app/pages/contact/contact.component.html` - Contact information
- `src/app/services/project.service.ts` - Project data

### Change Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Add Projects

Add new projects in `src/app/services/project.service.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Title',
  description: 'Short description',
  longDescription: 'Detailed description',
  technologies: ['Tech1', 'Tech2'],
  features: ['Feature1', 'Feature2'],
  category: 'Category',
  imageUrl: 'image-url',
  githubUrl: 'github-url',
  liveUrl: 'live-url'
}
```

## Animation Customization

GSAP animations are centralized in `src/app/utils/gsap.animations.ts`. You can:
- Modify animation timings
- Add new animation types
- Adjust easing functions

## Deployment

### AWS S3 Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/portfolivo` folder to your S3 bucket

3. Configure S3 bucket for static website hosting

### Other Platforms

The built files can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

Yuvraj Bagale
- Email: yuvrajbagale123@gmail.com
- Location: India

---

Built with ❤️ using Angular 17 and Tailwind CSS

