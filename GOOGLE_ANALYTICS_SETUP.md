# Google Analytics Setup Guide

## Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account for your portfolio
5. Set up a property (your website)
6. Choose "Web" as the platform

## Step 2: Get Your Measurement ID

1. In Google Analytics, go to **Admin** (gear icon)
2. Under **Property**, click **Data Streams**
3. Click on your web stream
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 3: Add Measurement ID to Your App

1. Open `src/app/app.component.ts`
2. Find this line:
   ```typescript
   const gaMeasurementId = 'G-XXXXXXXXXX';
   ```
3. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```typescript
   const gaMeasurementId = 'G-ABC123XYZ'; // Your actual ID
   ```

## Step 4: Test Your Setup

1. Build your app: `npm run build`
2. Serve it: `npx http-server -p 8080 dist/portfolivo`
3. Open your browser's Developer Tools
4. Go to the **Network** tab
5. Filter by "google-analytics" or "gtag"
6. Navigate through your site
7. You should see requests to Google Analytics

## What's Being Tracked

### Automatic Tracking:
- ✅ **Page Views** - Every route change
- ✅ **Page Titles** - Dynamic page titles

### Event Tracking:
- ✅ **Theme Toggle** - Light/Dark mode switches
- ✅ **Language Changes** - Language selection
- ✅ **Voice Commands** - Voice command usage
- ✅ **Form Submissions** - Contact form (success/error)
- ✅ **Button Clicks** - Navigation and CTA buttons
- ✅ **External Links** - Outbound link clicks
- ✅ **Social Media Clicks** - Social link clicks
- ✅ **File Downloads** - Resume downloads

## Viewing Your Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** → **Realtime** to see live data
4. Check **Reports** → **Engagement** → **Events** for event tracking

## Custom Events

You can add custom event tracking in any component:

```typescript
import { AnalyticsService } from '../services/analytics.service';

constructor(private analyticsService: AnalyticsService) {}

// Track custom event
this.analyticsService.trackEvent('custom_event', 'category', 'label', value);

// Track button click
this.analyticsService.trackButtonClick('Download Resume', 'header');

// Track download
this.analyticsService.trackDownload('resume.pdf', 'pdf');
```

## Privacy & GDPR

If you need GDPR compliance:
1. Add a cookie consent banner
2. Only initialize GA after user consent
3. Update `app.component.ts` to check for consent before initializing

## Troubleshooting

### Analytics not working?
1. Check browser console for errors
2. Verify Measurement ID is correct
3. Ensure you're testing on HTTPS or localhost
4. Check if ad blockers are blocking GA
5. Verify in Network tab that requests are being sent

### No data showing?
- Wait 24-48 hours for data to appear in reports
- Check Realtime reports for immediate verification
- Ensure Measurement ID is correct

## Alternative: Using @angular/fire

If you prefer Firebase Analytics:

```bash
npm install @angular/fire firebase
```

Then configure Firebase in your app. However, the current implementation uses gtag.js which is the standard Google Analytics 4 approach.

