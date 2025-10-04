# Design Guidelines: Resume Tracker Application

## Design Approach
**Selected Approach:** Design System - Linear + Material Design Hybrid
- **Justification:** Professional productivity tool requiring data density, clear hierarchy, and efficient workflow patterns
- **Primary Influence:** Linear's clean typography and modern dashboard aesthetics
- **Secondary Influence:** Material Design's data visualization and status feedback patterns
- **Guiding Principles:** Information clarity, workflow efficiency, professional credibility

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Base: 222 15% 8%
- Surface Elevated: 222 15% 12%
- Surface Subtle: 222 15% 16%
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Primary Accent: 221 83% 53% (Professional Blue)
- Success: 142 71% 45% (Application Accepted)
- Warning: 38 92% 50% (Pending Response)
- Error: 0 72% 51% (Rejected)
- Info: 199 89% 48% (Interview Scheduled)

**Light Mode:**
- Background Base: 0 0% 100%
- Surface: 0 0% 98%
- Text Primary: 222 15% 12%
- Text Secondary: 222 10% 45%
- Borders: 222 10% 90%

### B. Typography
- **Primary Font:** Inter (via Google Fonts CDN)
- **Monospace:** JetBrains Mono (for job IDs, dates)
- **Headings:** font-semibold, tracking-tight
  - H1: text-3xl (Dashboard title)
  - H2: text-2xl (Section headers)
  - H3: text-xl (Card headers)
- **Body:** text-sm to text-base, leading-relaxed
- **Labels:** text-xs font-medium uppercase tracking-wide (Status badges)

### C. Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-4 to p-6
- Card spacing: gap-4
- Section spacing: mt-8, mb-12
- Grid gaps: gap-6 (desktop), gap-4 (mobile)

**Grid Structure:**
- Sidebar: w-64 (fixed navigation)
- Main content: flex-1 with max-w-7xl mx-auto
- Job cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Application detail: Two-column layout (lg:grid-cols-3, details span 2)

### D. Component Library

**Navigation:**
- Fixed left sidebar with icon + label navigation
- Active state: subtle background (surface subtle) + primary text color
- Sections: Dashboard, Active Applications, All Jobs, Analytics, Settings

**Job Listing Cards:**
- Bordered cards with hover elevation (subtle shadow)
- Company logo (40x40px rounded)
- Job title (font-semibold text-lg)
- Location + Salary range (text-sm text-secondary)
- Applied date + Days ago (text-xs)
- Status badge (pill-shaped, colored by status)
- Quick actions: View Details, Email Thread, Update Status

**Status Badges:**
- Pill-shaped with colored backgrounds at 15% opacity
- Text in full color saturation
- Icons from Heroicons (checkmark, clock, x-mark, calendar)
- States: Applied, Screening, Interview, Offer, Rejected, Withdrawn

**Data Tables:**
- Striped rows for readability
- Sortable column headers with arrow indicators
- Sticky header on scroll
- Row hover state with subtle background change
- Compact density for information efficiency

**Email Thread View:**
- Timeline layout with connector lines
- Email cards showing sender, subject, preview, timestamp
- Expandable accordion for full content
- "Reply" and "Mark Important" actions
- Integration status indicator (Gmail sync badge)

**Application Detail Panel:**
- Slide-over panel (lg:w-2/3) or full-page view
- Tabbed interface: Overview, Timeline, Emails, Notes
- Key metrics at top: Applied Date, Last Contact, Next Action
- Progress stepper showing application stage
- Quick edit mode for custom notes

**Dashboard Widgets:**
- Stat cards: Application count, Response rate, Interview rate
- Recent activity feed with icons and timestamps
- Upcoming interviews calendar view
- Application funnel chart (Applied → Screening → Interview → Offer)

**Forms & Inputs:**
- Consistent height (h-10 for inputs, h-12 for buttons)
- Clear focus states with primary color ring
- Inline validation with error messages
- Autocomplete for company names and job titles
- Rich text editor for custom application notes

### E. Data Visualization
- **Charts:** Use Chart.js or Recharts
- Application trends: Line chart (applications over time)
- Status distribution: Donut chart with status colors
- Response rate: Progress bars with percentage labels
- Time-to-response: Horizontal bar chart

**Icons:** Heroicons (via CDN) for all UI elements - consistent 20px or 24px sizing

### F. Interactions
- Smooth transitions: transition-colors duration-200
- Micro-feedback: Scale on button press (active:scale-98)
- Loading states: Skeleton screens for data-heavy views
- Optimistic updates: Immediate UI response before API confirmation
- Toast notifications: Top-right position for status updates

## Specific Page Layouts

**Dashboard (Home):**
- Hero stats row: 4 metric cards (Total Applied, Active, Interviews, Offers)
- Quick filters: Status pills, Date range picker, Company search
- Job grid: 3-column responsive grid of job cards
- Sidebar: Filters (Location, Salary, Experience Level, Remote options)

**Job Detail View:**
- Split layout: Job info (left 2/3) + Application tracking (right 1/3)
- Job description with formatted sections
- Application form pre-filled with user data
- One-click apply button with Gmail/Sheets integration indicator

**Analytics Dashboard:**
- Time period selector (Last 7/30/90 days)
- KPI cards: Applications sent, Response rate, Interview conversion
- Visual charts: Application velocity, Success funnel, Response times
- Insights panel: AI-suggested optimizations based on patterns

## Accessibility & Polish
- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- Keyboard navigation with visible focus indicators
- Aria labels for all interactive elements
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Dark mode toggle in header with smooth theme transition