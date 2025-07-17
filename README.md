# Climate Action Pledge Microsite

A comprehensive single-page website for climate action pledges with forms, certificates, and a public pledge wall.

## 🌱 Features

### Core Functionality
- **Hero Section**: Visual banner with clear messaging and call-to-action
- **Live KPIs**: Real-time dashboard showing target pledges, achieved pledges, and user categories
- **Why Take Climate Action**: Impact statement section about individual responsibility
- **Pledge Form**: Comprehensive form with validation and commitment themes
- **Certificate Generator**: Personalized certificates with star ratings
- **Public Pledge Wall**: Paginated table showing all pledges (privacy-safe)
- **Privacy Protection**: Email and mobile numbers never displayed publicly

### Technical Features
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Real-time Updates**: KPIs and pledge wall update automatically
- **Local Storage**: Persists data between sessions
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Accessibility**: WCAG compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, semantic HTML, and proper headings

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd climate-action-pledge

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🎯 Project Structure

```
src/
├── components/           # React components
│   ├── HeroSection.tsx
│   ├── LiveKPIs.tsx
│   ├── WhyTakeAction.tsx
│   ├── PledgeForm.tsx
│   ├── CertificateModal.tsx
│   ├── PledgeWall.tsx
│   └── Footer.tsx
├── data/                # Static data and mock data
│   ├── commitmentThemes.ts
│   └── mockData.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── storage.ts
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 📋 Form Fields

### Required Fields
- **Name**: Full name of the pledge taker
- **Email**: For verification (not displayed publicly)
- **Mobile Number**: For validation (not displayed publicly)
- **State**: Geographic location
- **Profile Type**: Student / Working Professional / Other
- **Commitments**: At least one commitment from available themes

### Commitment Themes
1. **🌱 Sustainable Living**
   - Reduce plastic usage by 50% in daily life
   - Use public transport or bike for short trips
   - Practice zero-waste cooking and meal planning

2. **💡 Energy Conservation**
   - Switch to LED bulbs and energy-efficient appliances
   - Unplug electronics when not in use
   - Use renewable energy sources where possible

3. **🌍 Community Action**
   - Participate in local tree planting drives
   - Educate 5 friends about climate change
   - Support eco-friendly businesses and products

## 🏆 Certificate Features

Each certificate includes:
- Personalized name
- "Cool Enough to Care!" statement
- Star rating (1-5 stars based on number of commitments)
- Unique pledge ID
- Date and location
- List of selected commitments
- Downloadable and shareable

## 📊 KPI Dashboard

Displays real-time statistics:
- **Target Pledges**: 1,000,000 (static)
- **Achieved Pledges**: Dynamic count of all pledges
- **Students**: Count of student pledges
- **Working Professionals**: Count of professional pledges
- **Workshops**: Count of "Other" category pledges
- **Progress Bar**: Visual progress toward target

## 🔒 Privacy & Security

- Email and mobile numbers are never displayed publicly
- Data is stored locally in browser storage
- Clear privacy notices throughout the form
- GDPR-compliant data handling practices
- No third-party data sharing

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradients and shadows
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessibility**: High contrast ratios and screen reader support
- **Loading States**: Smooth loading animations and feedback
- **Color System**: Consistent color palette with semantic meanings

## 🌟 Bonus Features

- **Smooth Scroll**: Animated scrolling between sections
- **Scroll to Top**: Floating button for easy navigation
- **Social Sharing**: Share certificates on social media
- **Progressive Enhancement**: Works even with JavaScript disabled
- **Performance Optimized**: Fast loading and smooth interactions

## 🔧 Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Vite**: Fast build tool and development server
- **Local Storage**: Browser-based data persistence

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The application is ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📞 Contact

For questions or support, please contact:
- Email: devarannagaripraneeth@gmail.com
- Phone: +91 9392577566

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ for our planet**
