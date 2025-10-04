# Resume Tracker Application

## Overview

This is a **Resume Tracker** application designed to help a Java Fullstack Lead Engineer manage job applications throughout the job search process. The application tracks job applications, integrates with Gmail to monitor email communications from recruiters, and syncs data with Google Sheets for external tracking. It provides a dashboard-style interface with analytics, status tracking, and activity feeds to give users comprehensive visibility into their job search progress.

**Core Purpose:** Centralized job application tracking with automated Gmail and Google Sheets integration

**Target User:** Java Fullstack Lead Engineer (11 years experience) actively searching for positions

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**UI Component System:** 
- Shadcn/ui components (Radix UI primitives) configured with the "new-york" style
- Custom component library following Linear + Material Design hybrid approach
- Dark mode primary with light mode support
- Design emphasizes professional productivity, data density, and clear visual hierarchy

**State Management:**
- TanStack Query (React Query) for server state and API data fetching
- Local React state for UI interactions
- Query client configured with infinite stale time and disabled refetch on window focus

**Routing:** Wouter (lightweight client-side routing)

**Key Design Decisions:**
- Uses path aliases (`@/`, `@shared/`, `@assets/`) for clean imports
- Component-based architecture with reusable UI primitives
- Comprehensive design system defined in `design_guidelines.md` specifying colors, typography, spacing, and layout patterns
- All components include data-testid attributes for testing

### Backend Architecture

**Runtime:** Node.js with Express server

**Language:** TypeScript with ESM modules

**API Pattern:** RESTful endpoints under `/api` namespace

**Key Routes:**
- `/api/applications` - CRUD operations for job applications
- `/api/profile` - User profile management
- `/api/stats` - Dashboard statistics
- Email and sync operations integrated into application endpoints

**Storage Layer:**
- Interface-based storage abstraction (`IStorage`)
- Current implementation: In-memory storage (`MemStorage`)
- Database-ready schema defined with Drizzle ORM for future PostgreSQL migration
- Schema includes: users, applications, emails, and profile tables

**Design Rationale:**
- Storage interface allows seamless transition from in-memory to database without changing business logic
- Express middleware for request logging and error handling
- Vite integration in development for HMR and SSR capabilities

### Data Schema

**Applications:**
- Job tracking: company, title, location, salary, job URL
- Status workflow: applied → screening → interview → offer / rejected / withdrawn
- Applied date tracking, notes, Google Sheets synchronization ID

**Emails:**
- Linked to applications via `applicationId`
- Gmail integration: stores `gmailId`, from, subject, preview, content
- Importance flagging and timestamp tracking

**Profile:**
- User information: name, email, professional title, location
- Resume URL storage
- Google Sheets ID for spreadsheet sync

**Users:**
- Authentication schema (currently unused but defined for future implementation)

### External Dependencies

**Third-Party Service Integrations:**

1. **Gmail API (Google Mail Connector)**
   - Purpose: Fetch and analyze job-related emails from recruiters
   - Implementation: OAuth2 authentication via Replit Connectors
   - Key Features:
     - Automatic email fetching based on company name
     - Email content parsing and status analysis
     - Connection token refresh handling
   - Service: `server/services/gmail-service.ts`
   - Client: `server/gmail-client.ts`

2. **Google Sheets API (Google Sheet Connector)**
   - Purpose: Bidirectional sync of job applications with external spreadsheet
   - Implementation: OAuth2 authentication via Replit Connectors
   - Key Features:
     - Automatic spreadsheet creation with proper headers
     - Row-based application tracking with unique IDs
     - Update operations to keep spreadsheet in sync
   - Service: `server/services/sheets-service.ts`
   - Client: `server/sheets-client.ts`

3. **Replit Connectors Platform**
   - Used for secure OAuth credential management
   - Environment-based authentication (`REPL_IDENTITY`, `WEB_REPL_RENEWAL`)
   - Automatic token refresh and credential storage

**Database Configuration:**

- **Drizzle ORM** configured for PostgreSQL dialect
- **Neon Database** (@neondatabase/serverless) as the intended PostgreSQL provider
- Connection via `DATABASE_URL` environment variable
- Migration output directory: `./migrations`
- Schema location: `./shared/schema.ts`

**UI Component Dependencies:**

- **Radix UI** - Headless accessible component primitives
- **Recharts** - Data visualization for analytics charts
- **Embla Carousel** - Touch-friendly carousel component
- **date-fns** - Date manipulation and formatting
- **class-variance-authority** & **clsx** - Dynamic className composition
- **cmdk** - Command palette component

**Styling:**

- **Tailwind CSS** with custom configuration
- **PostCSS** with Autoprefixer
- Custom CSS variables for theming
- Google Fonts CDN: Inter (primary) and JetBrains Mono (monospace)

**Development Tools:**

- **TypeScript** strict mode with ESNext modules
- **Vite** plugins for development: runtime error overlay, cartographer, dev banner (Replit-specific)
- **esbuild** for production server bundling
- Path resolution configured for clean imports

**Authentication Pattern:**
- Ready for session-based auth with connect-pg-simple (PostgreSQL session store)
- User schema defined but authentication not yet implemented
- Designed for future integration

**Key Architectural Decisions:**

1. **Separation of Concerns:** Clear separation between client, server, and shared code with dedicated directories
2. **Type Safety:** End-to-end TypeScript with Zod schema validation for runtime type checking
3. **API Integration Pattern:** Centralized service layer for external API interactions with proper error handling and token management
4. **Progressive Enhancement:** In-memory storage allows immediate functionality while database schema is ready for production scaling
5. **Design System First:** Comprehensive design guidelines ensure consistent UX across all features