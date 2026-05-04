# TPW Development Guide

## 🚀 Getting Started

This guide covers everything developers need to know to work on The Purple Wings (TPW) financial literacy platform.

### Prerequisites

- **Node.js 18+** - Latest LTS version recommended
- **npm** or **yarn** package manager
- **Git** for version control
- **VS Code** or preferred IDE
- **Supabase CLI** (for database management)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/jhasavi/tpw.git
cd tpw

# Install dependencies
npm install

# Start development server
npm run dev

# Alternative: Use provided script
./start-dev.sh
```

## 🛠️ Development Environment

### Local Development

#### Development Server
```bash
# Start Next.js development server
npm run dev

# Server runs on http://localhost:3000
# Hot reload enabled for fast development
```

#### Database Setup
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Start local Supabase
supabase start

# Apply migrations
supabase db push
```

#### Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Required environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JANAGANA_API_URL=your_crm_api_url
JANAGANA_API_KEY=your_crm_api_key
```

### Code Quality Tools

#### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

#### Pre-commit Hooks
```bash
# Install husky for git hooks
npm install --save-dev husky

# Enable pre-commit hooks
npx husky install

# Add lint-staged for pre-commit checks
npm install --save-dev lint-staged
```

## 📁 Project Structure

### Directory Overview

```
tpw/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth routes
│   │   ├── api/                 # API routes
│   │   ├── courses/             # Course pages
│   │   ├── learn/               # Learning pages
│   │   └── layout.tsx           # Root layout
│   ├── components/              # React components
│   │   ├── ui/                  # UI components
│   │   ├── forms/               # Form components
│   │   └── layout/              # Layout components
│   ├── lib/                     # Utility libraries
│   │   ├── supabase/            # Supabase clients
│   │   ├── crm-*.ts             # CRM integration
│   │   └── utils.ts             # General utilities
│   ├── types/                   # TypeScript types
│   └── styles/                  # CSS and styling
├── supabase/                    # Database configuration
│   ├── migrations/              # Database migrations
│   ├── functions/               # Database functions
│   └── seed.sql                 # Seed data
├── public/                      # Static assets
├── docs/                        # Documentation
└── scripts/                     # Build and deployment scripts
```

### Key Files

#### Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

#### Core Libraries
- `src/lib/supabase/server.ts` - Server-side Supabase client
- `src/lib/supabase/client.ts` - Client-side Supabase client
- `src/lib/crm-events.ts` - Server-side CRM events
- `src/lib/crm-events-client.ts` - Client-side CRM events

## 🎯 Development Workflow

### Feature Development

#### 1. Create Feature Branch
```bash
# Create new feature branch
git checkout -b feature/course-progress-tracking

# Keep branch names descriptive
# Use: feature/, bugfix/, hotfix/, chore/ prefixes
```

#### 2. Development Process
```bash
# Install new dependencies
npm install package-name

# Run development server
npm run dev

# Run tests
npm run test

# Check code quality
npm run lint
npm run type-check
```

#### 3. Database Changes
```bash
# Create new migration
supabase db diff create --schema public

# Apply migration locally
supabase db push

# Test migration in staging
supabase db push --remote staging
```

### Code Standards

#### TypeScript Guidelines
```typescript
// Use interfaces for object shapes
interface UserProfile {
  id: string
  email: string
  fullName?: string
}

// Use enums for constants
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

// Prefer explicit return types
const getUserById = async (id: string): Promise<UserProfile | null> => {
  // Implementation
}
```

#### React Component Patterns
```typescript
// Use functional components with hooks
interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll 
}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleEnroll = useCallback(() => {
    setIsLoading(true)
    onEnroll?.(course.id)
  }, [course.id, onEnroll])
  
  return (
    <div className="course-card">
      {/* Component JSX */}
    </div>
  )
}
```

#### API Route Patterns
```typescript
// API routes with proper error handling
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    
    // Validate input
    const validatedData = schema.parse(body)
    
    // Process request
    const result = await processRequest(validatedData, user.id)
    
    return Response.json({ success: true, data: result })
    
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
```

## 🗄️ Database Development

### Schema Management

#### Creating Migrations
```sql
-- supabase/migrations/20240501_add_user_profiles.sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- Add RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);
```

#### Database Functions
```sql
-- supabase/functions/get_user_progress.sql
CREATE OR REPLACE FUNCTION get_user_progress(
  p_user_id UUID
) RETURNS TABLE (
  course_id UUID,
  course_title TEXT,
  progress_percentage INTEGER,
  lessons_completed INTEGER,
  total_lessons INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id as course_id,
    c.title as course_title,
    COALESCE(cp.progress_percentage, 0) as progress_percentage,
    COALESCE(cp.lessons_completed, 0) as lessons_completed,
    (SELECT COUNT(*) FROM lessons WHERE course_id = c.id) as total_lessons
  FROM courses c
  LEFT JOIN course_progress cp ON c.id = cp.course_id AND cp.user_id = p_user_id
  ORDER BY c.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Database Best Practices

#### Naming Conventions
- **Tables:** snake_case (e.g., `user_profiles`, `course_progress`)
- **Columns:** snake_case (e.g., `created_at`, `user_id`)
- **Functions:** snake_case (e.g., `get_user_progress`)
- **Indexes:** `idx_table_column` (e.g., `idx_users_email`)

#### Performance Optimization
```sql
-- Add appropriate indexes
CREATE INDEX idx_course_progress_user_course 
  ON course_progress(user_id, course_id);

-- Use partial indexes for better performance
CREATE INDEX idx_active_users 
  ON users(id) 
  WHERE status = 'active';

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM user_profiles WHERE user_id = $1;
```

## 🔐 Authentication & Security

### Supabase Authentication

#### Server-Side Auth
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

#### Client-Side Auth
```typescript
// src/lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () =>
  createClientComponentClient()
```

#### Protected Routes
```typescript
// Middleware for route protection
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  // Protect routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  return res
}
```

### Security Best Practices

#### Input Validation
```typescript
import { z } from 'zod'

// Validate API input
const courseSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(1000),
  difficulty_level: z.enum(['beginner', 'intermediate', 'advanced'])
})

// Validate user input
const validatedData = courseSchema.parse(requestBody)
```

#### Environment Variables
```typescript
// Never expose secrets to client
const serverConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // Service role key stays server-side only
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
}
```

#### Row Level Security
```sql
-- Enable RLS on all user data tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for data access
CREATE POLICY "Users can CRUD own profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
```

## 🧪 Testing

### Unit Testing

#### Component Testing
```typescript
// __tests__/components/CourseCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CourseCard } from '@/components/CourseCard'

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    difficulty_level: 'beginner'
  }
  
  it('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })
  
  it('calls onEnroll when enroll button is clicked', () => {
    const mockOnEnroll = jest.fn()
    render(<CourseCard course={mockCourse} onEnroll={mockOnEnroll} />)
    
    fireEvent.click(screen.getByText('Enroll'))
    expect(mockOnEnroll).toHaveBeenCalledWith('1')
  })
})
```

#### API Testing
```typescript
// __tests__/api/courses.test.ts
import { POST } from '@/app/api/courses/route'

describe('Courses API', () => {
  it('creates a new course successfully', async () => {
    const mockRequest = {
      json: async () => ({
        title: 'New Course',
        description: 'Course Description',
        difficulty_level: 'beginner'
      })
    }
    
    const response = await POST(mockRequest)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

### Integration Testing

#### E2E Testing with Playwright
```typescript
// tests/e2e/course-enrollment.spec.ts
import { test, expect } from '@playwright/test'

test('user can enroll in a course', async ({ page }) => {
  // Navigate to course page
  await page.goto('/courses/budgeting-basics')
  
  // Click enroll button
  await page.click('[data-testid="enroll-button"]')
  
  // Verify enrollment success
  await expect(page.locator('[data-testid="enrollment-success"]')).toBeVisible()
  
  // Check course appears in user dashboard
  await page.goto('/dashboard')
  await expect(page.locator('text=Budgeting Basics')).toBeVisible()
})
```

### Testing Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm run test CourseCard.test.tsx
```

## 🚀 Deployment

### Build Process

#### Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start

# Build with analysis
npm run build:analyze
```

#### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_anon_key
SUPABASE_SERVICE_ROLE_KEY=production_service_key
JANAGANA_API_URL=production_crm_url
JANAGANA_API_KEY=production_crm_key
```

### Vercel Deployment

#### Automatic Deployment
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

#### Deployment Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Database Deployment

#### Migration Management
```bash
# Apply migrations to production
supabase db push --remote production

# Check migration status
supabase migration list

# Rollback migration (if needed)
supabase migration rollback
```

#### Production Seeding
```sql
-- Seed production data
INSERT INTO curricula (title, description, slug) VALUES
('Financial Foundations', 'Basic financial concepts', 'financial-foundations'),
('Investment Mastery', 'Advanced investing strategies', 'investment-mastery');
```

## 🔧 Debugging

### Common Issues

#### Build Errors
```bash
# Check TypeScript errors
npm run type-check

# Check ESLint errors
npm run lint

# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Runtime Errors
```typescript
// Add error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

#### Database Issues
```sql
-- Check connection
SELECT version();

-- Check table existence
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS policies
SELECT policyname, tablename, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Debugging Tools

#### Browser DevTools
```typescript
// Add debug logging
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Debug info:', data)
}

// Use React DevTools
// Install browser extension for React debugging
```

#### Database Debugging
```bash
# Monitor database queries
supabase db logs

# Check database performance
supabase db status

# Run database functions
supabase db rpc get_user_progress '{"user_id": "123"}'
```

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools & Libraries
- **VS Code Extensions:** ES7+ React/Redux/React-Native snippets, Prettier, ESLint
- **Browser Extensions:** React Developer Tools, Redux DevTools
- **API Testing:** Postman, Insomnia
- **Database Management:** Supabase Dashboard, pgAdmin

### Community
- **GitHub Issues:** Report bugs and request features
- **Discord/Slack:** Developer community chat
- **Stack Overflow:** Technical questions
- **Documentation:** Contribute to project docs

---

**Last Updated:** May 3, 2026  
**Version:** 1.0  
**Maintainers:** TPW Development Team
