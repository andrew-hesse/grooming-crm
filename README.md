# 🐾 Grooming Salon CRM

A professional, full-stack CRM system for grooming salons built with modern web technologies. Features separate admin and client portals with appointment management, pet profiles, and payment tracking.

## ✨ Features

### Client Portal
- **Easy Appointment Booking**: Multi-step booking flow with real-time availability
- **Pet Profile Management**: Track multiple pets with photos and medical history
- **Appointment History**: View past and upcoming grooming sessions
- **Service Catalog**: Browse available services with pricing
- **Notifications**: Email/SMS reminders for upcoming appointments

### Admin Portal
- **Dashboard Analytics**: Real-time business metrics and KPIs
- **Appointment Management**: Calendar view with drag-and-drop scheduling
- **Client & Pet Database**: Comprehensive CRM with search and filters
- **Staff Management**: Assign groomers and track performance
- **Service & Pricing Management**: Configure services, prices, and durations
- **Financial Reports**: Revenue tracking and payment history
- **Inventory Tracking** (Coming soon)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Caching**: [Upstash Redis](https://upstash.com/) (Optional)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/grooming-crm.git
cd grooming-crm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy the contents of `supabase/schema.sql`
   - Execute the SQL

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
grooming-crm/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin portal routes (protected)
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── appointments/         # Appointment management
│   │   ├── clients/              # Client & pet management
│   │   └── settings/             # Admin settings
│   ├── (client)/                 # Client portal routes (protected)
│   │   ├── booking/              # Booking flow
│   │   ├── appointments/         # Client appointments
│   │   └── pets/                 # Pet management
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── signup/               # Signup page
│   ├── api/                      # API routes
│   └── page.tsx                  # Public homepage
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin-specific components
│   ├── client/                   # Client-specific components
│   └── shared/                   # Shared components
├── lib/
│   ├── supabase/                 # Supabase client utilities
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript type definitions
├── hooks/                        # Custom React hooks
├── __tests__/                    # Test files
└── supabase/
    └── schema.sql                # Database schema
```

## 🧪 Testing

Run the test suite:

```bash
npm test                  # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
```

**Coverage Goal**: 90%+ coverage across all modules

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles**: User profiles with role-based access
- **pets**: Pet information and medical history
- **services**: Available grooming services
- **appointments**: Booking records
- **payments**: Payment transactions

See `supabase/schema.sql` for the complete schema with relationships and RLS policies.

## 🔐 Authentication & Authorization

### User Roles

- **Client**: Can book appointments, manage pets, view history
- **Staff**: Can manage appointments, view client info
- **Admin**: Full access to all features and settings

### Protected Routes

Routes are protected using Next.js middleware:

- `/admin/*` - Requires admin or staff role
- `/client/*` - Requires authenticated user
- Public routes: `/`, `/auth/*`

## 🎨 Design System

The app uses a professional design system with:

- **Color Palette**: Primary (blue), Secondary (gray), Accent (green)
- **Typography**: Geist Sans & Geist Mono
- **Spacing**: Consistent 4px grid system
- **Components**: Based on shadcn/ui with custom variants
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design (320px to 4K)

### Theme Customization

Modify colors in `app/globals.css`:

```css
:root {
  --primary: #1e40af;
  --secondary: #f3f4f6;
  --accent: #10b981;
  /* ... */
}
```

## 📱 Responsive Design

The application is optimized for:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables for Production

Ensure these are set in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## 📚 Additional Documentation

- [Database Schema](./supabase/schema.sql)
- [Type Definitions](./types/database.types.ts)
- [Component Documentation](./components/ui/)
- [API Routes](./app/api/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Write TypeScript with strict mode
- Follow ESLint rules
- Add JSDoc comments to functions
- Write tests for new features (90%+ coverage)
- Use conventional commit messages

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design patterns inspired by [tatycan.com](https://github.com/Andrew-Hesse/tatycan.com)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/)

## 📧 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for pet grooming businesses**
