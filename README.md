# CareSync - B2B Healthcare SaaS Platform

CareSync is a high-fidelity, responsive B2B healthcare provider portal built with React, TypeScript, and Tailwind CSS v4. It features a modern, glassmorphic UI, robust state management, live Firebase Authentication, and native-feeling interactions including a Progressive Web App (PWA) architecture.

## Features

- **Live Authentication**: Integrated with Firebase Auth for real-world user signup, login, and session persistence. Includes a fallback "Mock Mode" for environments missing API keys.
- **Progressive Web App (PWA)**: Implements an App Shell Service Worker caching strategy and `manifest.json`, allowing the app to be installed natively and function flawlessly offline.
- **Patient Management**: Complete directory with animated Grid/List view toggles, advanced search filtering, and dedicated single-patient profile routing.
- **Analytics Dashboard**: Interactive charts and metric tracking powered by `recharts`.
- **Responsive Architecture**: Implements a dedicated UI state store for a mobile-first, slide-out hamburger sidebar, and flawlessly responsive dropdowns.
- **Micro-Interactions**: Features buttery smooth page transitions (`framer-motion`) and premium native-like toast notifications (`sonner`).

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **State Management**: Zustand (Global Auth, Patients, and UI stores)
- **Routing**: React Router DOM v6
- **Backend/Auth**: Firebase Authentication
- **Animations/UX**: Framer Motion, Sonner

## Setup Instructions

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables (Firebase)
To use live authentication, create a `.env` file in the root directory (you can copy `.env.example`) and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
*Note: If no environment variables are provided, the application will intelligently fall back to a "Mock Mode", allowing UI interaction and simulated logins without breaking.*

### 3. Development Server
Start the Vite development server:
```bash
npm run dev
```

### 4. Production Build
Build the application for production deployment:
```bash
npm run build
```

## Service Worker & Notifications
The application includes a custom `public/sw.js` that handles offline caching and simulates OS-level push notifications. You can test the notification system by clicking the "Bell" icon in the top right header and selecting "Test OS Push Notification".
