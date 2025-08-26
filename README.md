# Zorp - Super App

A Progressive Web App (PWA) combining ride-hailing, car wash services, and groceries delivery.

## 🚀 Features

- **Ride-Hailing**: Book rides with real-time tracking
- **Car Wash**: Schedule car wash services with different packages
- **Groceries**: Order groceries with delivery tracking
- **Multi-role Support**: Rider, Driver, Vendor, and Admin roles
- **PWA Ready**: Progressive Web App capabilities
- **Responsive Design**: Works on mobile and desktop

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Ant Design
- **Icons**: Lucide React (no emojis used)
- **Fonts**: Livvic + Open Sans (Google Fonts)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Routing**: React Router DOM
- **Package Manager**: Bun

## 🎨 Design System

- **Primary Colors**: Red (#D32F2F), Deep Black (#121212), White (#FFFFFF), Gold (#FFD700)
- **Typography**: Livvic for headings, Open Sans for body text
- **Icons**: Library icons only (no emojis)

## 📁 Project Structure

```
src/
├── assets/          # Images, icons
├── components/      # Shared UI components
├── contexts/        # Global state, providers
├── hooks/          # Custom hooks
├── layouts/        # Page layouts
├── modules/        # Feature modules
│   ├── auth/       # Authentication
│   ├── rides/      # Ride-hailing
│   ├── carwash/    # Car wash
│   ├── groceries/  # Groceries
│   └── admin/      # Admin dashboard
├── pages/          # Main app pages
├── services/       # Firebase, APIs
├── styles/         # Tailwind & global styles
└── utils/          # Helpers & utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Firebase project (for backend)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zorp
```

2. Install dependencies:
```bash
bun install
```

3. Configure Firebase:
   - Create a Firebase project
   - Update `src/services/firebase.ts` with your config
   - Enable Authentication, Firestore, and Storage

4. Start the development server:
```bash
bun run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📱 PWA Setup

The app is configured as a PWA. To build for production:

```bash
bun run build
```

## 🔧 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## 🎯 Next Steps

1. Configure Firebase project with proper credentials
2. Implement Firebase authentication
3. Build individual service modules (Rides, Car Wash, Groceries)
4. Add PWA capabilities and push notifications
5. Implement admin dashboard
6. Add real-time features and maps integration

## 📄 License

This project is licensed under the MIT License.
