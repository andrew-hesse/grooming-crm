# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based website for TATYCAN, a dog grooming salon. The site is built with modern web technologies and follows a component-based architecture for maintainability and scalability.

## Technology Stack

- **Frontend**: React 19 with JSX
- **Build Tool**: Vite 7.0
- **Styling**: Tailwind CSS 4.1 with custom theme
- **Routing**: React Router DOM 7.4
- **Animations**: Framer Motion 12.23
- **Image Gallery**: yet-another-react-lightbox 3.21
- **Icons**: React Icons 5.5
- **Linting**: ESLint 9.21 with React plugins

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Contact.jsx     # Contact form and info
│   ├── FAQ.jsx         # Frequently asked questions
│   ├── Footer.jsx      # Site footer
│   ├── Gallery.jsx     # Gallery preview component
│   ├── Hero.jsx        # Landing page hero section
│   ├── MobileContactButtons.jsx  # Mobile-specific contact UI
│   ├── Navbar.jsx      # Site navigation
│   ├── PriceList.jsx   # Pricing information
│   ├── Promotion.jsx   # Promotional content
│   ├── Services.jsx    # Service offerings
│   └── SkeletonLoader.jsx  # Loading state component
├── pages/              # Full page components
│   ├── GalleryPage.jsx # Complete gallery with lightbox
│   └── PriceListPage.jsx # Dedicated pricing page
├── assets/
│   └── images/         # Static image assets (.avif format)
├── App.jsx             # Main application component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind configuration
```

### Routing Structure
- `/` - Home page (Hero, Services, Gallery preview, Pricing, FAQ, Contact)
- `/galeria` - Full gallery page with lightbox functionality

### Key Architecture Patterns

1. **Component Composition**: The home page is composed of multiple section components loaded in App.jsx
2. **Loading States**: Components use SkeletonLoader for better UX during content loading
3. **Image Handling**: Dynamic image loading using Vite's import.meta.glob for gallery functionality
4. **Responsive Design**: Mobile-first approach with dedicated mobile components (MobileContactButtons)
5. **Custom Theme**: Tailwind CSS configuration with brand-specific colors and fonts defined in index.css

## Styling Guidelines

### Theme Configuration
The project uses a custom Tailwind theme with brand-specific colors:
- Primary: `#fff6ed` (warm off-white)
- Secondary: `#ffd8cc` (peachy pink)
- Accent: `#d67579` (coral red)
- Neutral: `#e4d4c8` (warm beige)
- Dark: `#2c2c2c` (charcoal)

### Typography
- Font Family: Poppins (Google Fonts)
- Loaded via CSS import in index.css

## Development Notes

1. **ESLint Configuration**: Uses flat config format with React-specific rules
2. **Vite Configuration**: Simple setup with React and Tailwind plugins
3. **Image Assets**: Gallery uses .avif format for optimal performance
4. **State Management**: Uses React hooks (useState, useEffect) - no external state management
5. **Internationalization**: Content is in Spanish, targeting Spanish-speaking users

## Component Guidelines

- All components are functional components using React hooks
- Loading states are implemented consistently across components
- Components follow a clear naming convention and are self-contained
- Use React Icons for consistent iconography
- Implement responsive design patterns throughout

## Testing and Quality

- Run `npm run lint` before committing changes
- Ensure all components are accessible and mobile-friendly
- Test gallery functionality across different devices
- Verify contact forms and interactive elements work properly

## Common Tasks

- **Adding new services**: Update the services array in Services.jsx
- **Gallery management**: Add .avif images to src/assets/images/ directory
- **Styling updates**: Modify theme variables in index.css for global changes
- **Navigation changes**: Update routes in App.jsx and navigation in Navbar.jsx