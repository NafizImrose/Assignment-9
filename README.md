# StudyNook – Library Study Room Booking

**Live Site:** [https://studynook.vercel.app](https://studynook.vercel.app)

StudyNook is a full-stack web application where students and library users can list study rooms they control, and any registered user can browse, search, filter, and book those rooms for a specific date and time slot.

## Features

- **Browse & Book Study Rooms** – Explore available study spaces with detailed room cards showing amenities, capacity, floor, and hourly rates
- **Smart Search & Filters** – Search rooms by name and filter by amenities, hourly rate range, and floor location
- **User Authentication UI** – Login and registration pages with password validation, Google OAuth button, and toast notifications
- **Room Management Dashboard** – Add, edit, and delete your own study room listings with a comprehensive form
- **Booking System** – Book rooms with date/time selection, real-time cost calculation, and booking management with cancel functionality
- **Responsive Design** – Fully responsive layout optimized for mobile, tablet, and desktop with dark/light theme toggle
- **Dynamic Page Titles & Loading States** – Route-based browser tab titles, skeleton loaders, and a custom 404 page

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- **Email:** demo@studynook.com
- **Password:** Demo123

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with hero, latest rooms, and info sections |
| `/rooms` | Public | All rooms with search and filters |
| `/rooms/:id` | Public | Room details with booking modal |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/add-room` | Private | Add a new study room |
| `/my-listings` | Private | Manage your room listings |
| `/my-bookings` | Private | View and cancel bookings |
| `/about` | Public | About page |

## Note

This is the **frontend UI only**. Backend API integration (MongoDB, JWT authentication, CRUD operations) is not included in this version.
