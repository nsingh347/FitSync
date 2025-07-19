# FitSync - Personal Fitness & Nutrition Tracker

## Overview

FitSync is a privacy-focused fitness and nutrition tracking application designed to offer a smooth and engaging user experience. It features personalized Indian meal plans, adaptive workout routines, and intelligent progress tracking, all wrapped in a modern, animated UI with gamification elements. The app is built as a full-stack web application with React on the frontend and Express.js on the backend, designed to work entirely offline with local data storage by default.

---

## User Preferences

- Communication style: Simple, everyday language

---

## System Architecture

### Frontend

- **Framework:** React 18 with TypeScript  
- **Routing:** Wouter (client-side routing)  
- **UI Components:** Radix UI primitives combined with shadcn/ui components and custom advanced components  
- **Styling:** Tailwind CSS using gradient themes, glass morphism, and advanced animations  
- **State Management:** React hooks with localStorage persistence  
- **Data Fetching:** TanStack Query for API state management  
- **Forms:** React Hook Form with Zod for validation  
- **Animations:** Framer Motion with scroll-triggered effects, parallax, and micro-interactions  
- **Gamification:** Achievement system with popups, notifications, and progress tracking  
- **Interactive Elements:** Floating particles, typewriter effects, progress rings, tutorial system  

### Backend

- **Runtime:** Node.js with Express.js  
- **Language:** TypeScript with ES modules  
- **Development Tools:** Vite for dev server and HMR, esbuild for production bundling  
- **API:** RESTful endpoints serving JSON data  

---

## Data Storage Solutions

- **Primary Storage:** Browser localStorage for user profiles and progress data (privacy-first)  
- **Database Ready:** Drizzle ORM configured for PostgreSQL (via Neon) for future scalability  
- **Development Data:** JSON files and in-memory storage for sample data  
- **Session Management:** Connect-pg-simple for PostgreSQL session storage (configured but not actively used)  

---

## Authentication and Authorization

- Currently no authentication system to keep user data private and local  
- User data stored exclusively in browser localStorage  
- Database schema supports multi-user setup for future implementation  

---

## Key Components

### Core Pages

- **Landing Page (`/`):** Feature showcase and onboarding  
- **Sign Up Page (`/signup`):** User profile creation and goal setting  
- **Dashboard (`/dashboard`):** Main interface for progress tracking and plans  
- **404 Page:** Handles undefined routes  

### Data Models

- **User Profile:** Demographics, goals, activity levels, workout preferences  
- **Progress Entry:** Daily logs for weight, calories, water intake, completed workouts  
- **Meal Plans:** Indian cuisine-focused nutrition plans tailored to goals  
- **Workout Plans:** Exercise routines customized by goal, fitness level, and workout type (home/gym/yoga)  
- **Blog Posts:** Educational content on fitness and nutrition  

---

## Business Logic

- **Meal Plan Generation:** Algorithmically creates plans based on user goals and activity level  
- **Workout Plan Generation:** Custom exercise routines adapted by workout type and fitness level  
- **Progress Tracking:** Daily logs with visual progress indicators  
- **Motivational System:** Daily quotes and achievement tracking  
- **Workout Type Customization:** Supports three workout categories with specific exercises and equipment  

---

## Data Flow

1. **User Onboarding:** Profile creation → saved to localStorage → redirect to dashboard  
2. **Daily Usage:** Dashboard loads profile → generates or retrieves plans → tracks progress  
3. **Progress Persistence:** All data interactions saved in real-time to localStorage  
4. **Plan Generation:** Dynamic, based on user profile parameters  
5. **API Integration:** Prepared for backend data fetching via TanStack Query  

---

## External Dependencies

### UI & Styling

- Radix UI for accessibility  
- Tailwind CSS for utility-first styling  
- Lucide React for icons  
- Framer Motion for animations  

### Development Tools

- Vite for fast development with HMR  
- TypeScript for type safety  
- ESLint and Prettier for code quality  
- Drizzle Kit for database migrations  

### Backend Dependencies

- Express.js server framework  
- Neon adapter for PostgreSQL connection  
- Date-fns for date manipulation  
- Nanoid for unique ID generation  

---

## Deployment Strategy

### Development

- Vite dev server with hot module replacement  
- Express backend with auto-reload using `tsx`  
- Shared TypeScript types between frontend and backend  
- Optimized for Replit cloud development environment  

### Production

- Vite builds frontend to `dist/public`  
- esbuild bundles backend to `dist/index.js`  
- Express serves static files  
- Environment-based configuration with `.env` variables  

---

## Database Migration

- Drizzle migrations located in `./migrations` directory  
- PostgreSQL connection via `DATABASE_URL` environment variable  
- Schema definitions in shared `schema.ts`  

---

## Scalability Considerations

- Architecture supports easy transition from localStorage to cloud database  
- API endpoints ready to support authentication and multi-user features  
- Modular component structure facilitates feature expansion  
- Type-safe models enable confident refactoring and maintenance  
- User privacy prioritized by default with flexibility for future growth  

---

## Summary

FitSync is a modern, privacy-first fitness and nutrition tracker offering tailored Indian meal plans and workout routines. It combines advanced frontend UI/UX with a flexible backend architecture designed to work offline but ready for future cloud scaling. The application focuses on simplicity, user engagement, and data privacy, providing a complete and enjoyable health companion experience.

---
