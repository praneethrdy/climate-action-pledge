# Climate Action Pledge - WordPress Deployment Guide

## Overview
This guide explains how to deploy the Climate Action Pledge microsite for WordPress integration, including Google Sheets backend simulation and responsive design optimization.

## Deployment Options

### Option 1: Static Hosting + WordPress Embed
1. **Deploy the React app** to a static hosting service:
   - Netlify (recommended)
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Upload the `dist` folder** to your hosting service

4. **Install the WordPress plugin** (see WordPress Integration section)

### Option 2: WordPress Custom Block/Plugin
1. Create a custom WordPress plugin using the provided PHP files
2. Upload the React build files to the plugin directory
3. Register the block/shortcode/widget

## Google Sheets Backend Setup

### 1. Create Google Sheets Document
1. Create a new Google Sheet named "Climate Action Pledges 2024"
2. Set up columns: ID, Name, Email, Mobile, State, Profile Type, Commitments, Date, Hearts Rating, Timestamp
3. Share the sheet with appropriate permissions

### 2. Google Sheets API (Optional)
For real Google Sheets integration:
1. Enable Google Sheets API in Google Cloud Console
2. Create service account credentials
3. Update `src/utils/googleSheetsAPI.ts` with real API calls
4. Replace the simulation functions with actual API calls

### 3. Current Simulation
The current implementation simulates Google Sheets using localStorage:
- Data persists between sessions
- Mimics Google Sheets row structure
- Includes proper error handling
- Ready for real API integration

## WordPress Integration

### 1. Plugin Installation
1. Copy `wordpress-integration.php` to your WordPress plugins directory
2. Copy `climate-pledge-responsive.css` to the same directory
3. Copy `climate-pledge-block.js` to the same directory
4. Activate the plugin in WordPress admin

### 2. Configuration
1. Go to Settings → Climate Pledge in WordPress admin
2. Enter your deployed site URL
3. Save settings

### 3. Usage Options

#### Shortcode
```php
[climate_pledge_widget height="800px" responsive="true"]
```

#### Widget
1. Go to Appearance → Widgets
2. Add "Climate Action Pledge" widget
3. Configure height and title

#### Gutenberg Block
1. In block editor, search for "Climate Action Pledge"
2. Add the block to your content
3. Configure settings in the sidebar

## Responsive Design Features

### Mobile Optimization
- Responsive breakpoints: 1200px, 992px, 768px, 576px, 480px
- Touch-friendly form inputs
- Optimized certificate display for mobile
- Smooth scrolling and animations

### WordPress Theme Compatibility
- Inherits theme colors and fonts where appropriate
- Proper spacing and margins
- Compatible with popular themes
- Print-friendly styles

### Performance Optimization
- Lazy loading for iframes
- Optimized images and assets
- Minimal external dependencies
- Fast loading animations

## Security Considerations

### Data Privacy
- Email and mobile numbers never displayed publicly
- Local storage encryption (can be enhanced)
- GDPR-compliant data handling
- Clear privacy notices

### WordPress Security
- Sanitized inputs and outputs
- Proper nonce verification
- Capability checks for admin functions
- XSS protection

## Customization Options

### Styling
- CSS custom properties for easy theming
- WordPress theme integration
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)

### Functionality
- Configurable commitment themes
- Customizable certificate templates
- Flexible KPI targets
- Multi-language support ready

## Testing Checklist

### Functionality Testing
- [ ] Form submission works
- [ ] Certificate generation displays correctly
- [ ] Pledge wall updates in real-time
- [ ] KPI dashboard shows accurate counts
- [ ] Social sharing functions properly
- [ ] PNG download works on all devices

### Responsive Testing
- [ ] Mobile phones (320px - 768px)
- [ ] Tablets (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Touch interactions work properly
- [ ] Forms are easy to use on mobile

### WordPress Integration Testing
- [ ] Shortcode displays correctly
- [ ] Widget functions in sidebars
- [ ] Gutenberg block works in editor
- [ ] Responsive iframe behavior
- [ ] Theme compatibility

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Deployment Commands

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## Support and Maintenance

### Regular Updates
- Monitor Google Sheets API quotas
- Update commitment themes seasonally
- Refresh mock data periodically
- Update WordPress plugin compatibility

### Analytics Integration
- Google Analytics 4 ready
- Custom event tracking for pledges
- Conversion tracking for certificates
- Social sharing analytics

## Troubleshooting

### Common Issues
1. **iframe not loading**: Check CORS settings and URL configuration
2. **Mobile display issues**: Verify responsive CSS is loaded
3. **Form submission errors**: Check Google Sheets API limits
4. **Certificate download fails**: Verify browser permissions

### Debug Mode
Enable debug mode by adding `?debug=true` to the URL for additional logging.

## Performance Metrics

### Target Performance
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Optimization Features
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies