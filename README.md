# Capture Now

A fast and elegant note-taking application built with Next.js for capturing your daily thoughts and ideas.

## Overview

Capture Now is a modern note-taking application designed to help you quickly capture and organize your thoughts. With support for markdown formatting, tagging, and statistics tracking, it provides an intuitive interface for managing your daily notes.

## Features

### Core Functionality
- **Quick Note Creation**: Fast and intuitive interface for capturing ideas
- **Markdown Support**: Write notes with full markdown formatting including headers, lists, code blocks, and more
- **Tag Management**: Organize notes with custom color-coded tags
- **Archive System**: Archive notes to keep your active workspace clean
- **Favorites**: Mark important notes as favorites for quick access
- **Search**: Full-text search across all your notes

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Easy on the eyes with elegant dark theme
- **Sidebar Navigation**: Quick access to all notes, favorites, archive, and tags
- **Breadcrumb Navigation**: Always know where you are in the app
- **Skeleton Loading**: Smooth loading states for better UX

### Statistics & Tracking
- **Daily Stats**: Track notes created today
- **Monthly Totals**: Monitor your productivity over time
- **Streak Counter**: See how many consecutive days you've been taking notes
- **Tag Analytics**: View active tags and their usage

### Authentication & Security
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **Password Hashing**: User passwords encrypted with bcrypt
- **Protected Routes**: Client-side and server-side route protection

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **Zustand**: Lightweight state management
- **Lucide React**: Modern icon system

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Drizzle ORM**: TypeScript-first ORM
- **PostgreSQL**: Robust relational database
- **JWT**: Secure authentication tokens
- **Zod**: Runtime type validation

### Development Tools
- **ESLint**: Code quality and consistency
- **Drizzle Kit**: Database migration management
- **tsx**: Fast TypeScript execution

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd capture-now
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/capture_now
JWT_SECRET=your-secret-key-here
```

4. Run database migrations
```bash
npm run db:push
# or generate and migrate
npm run db:generate
npm run db:migrate
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Scripts

- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes directly to the database
- `npm run db:studio` - Open Drizzle Studio for database management
- `npm run db:check` - Check migration consistency
- `npm run db:pull` - Pull schema from existing database
- `npm run db:seed` - Seed the database with test data

## Project Structure

```
capture-now/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── notes/             # Notes management pages
│   └── page.tsx           # Home page
├── src/
│   ├── components/        # React components
│   │   ├── editor/       # Markdown editor components
│   │   ├── layout/       # Layout components
│   │   ├── skeletons/    # Loading skeletons
│   │   └── ui/           # UI components
│   ├── db/               # Database configuration
│   │   ├── queries/      # Database queries
│   │   └── schema/       # Database schema
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── services/         # Business logic services
│   ├── stores/           # Zustand stores
│   └── types/            # TypeScript types
└── constants/            # Application constants
```

## Key Components

### Database Schema
- **Users**: User authentication and profile data
- **Notes**: Note content, timestamps, and metadata
- **Tags**: Custom tags with colors
- **Note Tags**: Many-to-many relationship between notes and tags
- **User Settings**: User preferences
- **Daily Stats**: Statistics tracking

### Custom Hooks
- `useNotes`: Manage note CRUD operations
- `useTags`: Handle tag management
- `useAuth`: Authentication state and operations
- `useNoteNavigation`: Handle note routing
- `useNoteValidation`: Validate note content

### State Management
- `authStore`: Authentication state
- `navigationStore`: Navigation history and state
- `sidebarStore`: Sidebar visibility state

## Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent file naming conventions
- Write self-documenting code with clear variable names

### Building for Production
```bash
npm run build
npm run start
```