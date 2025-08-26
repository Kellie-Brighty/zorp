# Zorp - Super App (Ride-Hailing, Car Wash, Groceries Delivery)

## Overview
Zorp is a **Progressive Web App (PWA)** combining:
- 🚖 Ride-Hailing  
- 🚘 Car Wash  
- 🛒 Groceries Ordering & Delivery  

Built with **ReactJS, TypeScript, Vite, TailwindCSS, Ant Design** and powered by **Firebase** backend.

---

## User Flow Wireframes (Textual Descriptions)

### 1. Onboarding & Authentication
**Screens:**
- **Splash Screen:**  
  - Zorp logo + tagline: "Your Ride. Your Wash. Your Groceries."  
  - Button: "Get Started"

- **Login/Signup:**  
  - Options: Email, Google, Phone OTP  
  - Ant Design form with inputs  
  - Large gradient button (red/black theme)

- **User Role Selection (first login):**  
  - Rider | Driver | Vendor  
  - Card-based UI with icons  

---

### 2. Ride-Hailing Flow
**Screens:**
- **Home (Ride tab active by default):**  
  - Map (Google Maps/Mapbox integration placeholder)  
  - Search bar: "Where to?"  
  - Saved locations (Home, Work, Recent)

- **Ride Details:**  
  - Pickup & Drop-off fields  
  - Fare estimate card  
  - Ride type selector (Economy, Premium, XL)  

- **Driver Assigned:**  
  - Driver profile (image, rating, car model)  
  - ETA & live tracking on map  
  - Cancel Ride button  

- **Ride In Progress:**  
  - Live map updates  
  - Driver info & ride status  

- **Ride Completed:**  
  - Fare summary  
  - Rating & feedback modal  

---

### 3. Car Wash Flow
**Screens:**
- **Car Wash Home:**  
  - Banner image (sparkling car)  
  - Buttons for packages: Basic | Premium | Detailing  
  - Icons with short descriptions  

- **Booking Form:**  
  - Select car type  
  - Choose package  
  - Schedule date & time (Ant Design datepicker & timepicker)  
  - Location field  

- **Booking Confirmation:**  
  - Order details summary  
  - Payment option  
  - Status tracking: Pending → Accepted → In Progress → Completed  

---

### 4. Groceries Flow
**Screens:**
- **Groceries Home:**  
  - Search bar: "Search groceries…"  
  - Categories (grid with icons: Fruits, Drinks, Snacks, Household, etc.)  

- **Product Listing:**  
  - Cards with image, name, price, add-to-cart button  

- **Cart:**  
  - List of selected items  
  - Quantity adjusters  
  - Checkout button  

- **Checkout:**  
  - Delivery address  
  - Payment option  
  - Confirm order button  

- **Order Tracking:**  
  - Status: Preparing → Out for delivery → Delivered  
  - Delivery ETA  

---

### 5. Admin Dashboard (Web only)
**Screens:**
- **Dashboard Overview:**  
  - Cards: Total Rides | Car Wash Bookings | Grocery Orders | Active Users  

- **User Management:**  
  - Table of users with filters (Rider, Driver, Vendor)  

- **Orders Management:**  
  - Separate tabs: Rides, Car Wash, Groceries  
  - Status updates, cancellation, refunds  

- **Reports & Analytics:**  
  - Charts (rides per day, revenue, growth trends)  

---

## Global Navigation
- **Bottom Tab Bar (Mobile):**  
  - Ride | Car Wash | Groceries | Profile  

- **Side Menu (Desktop/PWA install):**  
  - Dashboard  
  - Notifications  
  - Wallet/Payments  
  - Settings  

---

## Suggested Folder Structure



zorp-pwa/
│── public/ # Static files
│── src/
│ ├── assets/ # Images, icons
│ ├── components/ # Shared UI components
│ ├── modules/
│ │ ├── auth/ # Login, signup, onboarding
│ │ ├── rides/ # Ride-hailing features
│ │ ├── carwash/ # Car wash features
│ │ ├── groceries/ # Groceries ordering & delivery
│ │ └── admin/ # Admin dashboard
│ ├── contexts/ # Global state, providers
│ ├── hooks/ # Custom hooks
│ ├── layouts/ # Page layouts
│ ├── pages/ # Main app pages
│ ├── services/ # Firebase, APIs
│ ├── styles/ # Tailwind & global styles
│ ├── utils/ # Helpers & utilities
│ └── main.tsx # Entry point
│── package.json
│── tailwind.config.js
│── tsconfig.json
│── vite.config.ts


---


---

## Firebase Collections
- **users** → riders, drivers, vendors, admins  
- **rides** → ride-hailing trips  
- **car_washes** → wash bookings  
- **groceries** → product catalog  
- **orders** → grocery orders  
- **notifications** → push notifications  

---

## Color Palette
- **Primary Red:** #D32F2F  
- **Deep Black:** #121212  
- **White:** #FFFFFF  
- **Gold Sparkle:** #FFD700  

---

## Next Steps
1. Setup project base (React + Vite + TS + Tailwind + Ant Design)  
2. Configure Firebase project (auth, firestore, functions, storage)  
3. Build UI screens following above wireframes  
4. Implement flows one by one:  
   - Auth → Rides → Car Wash → Groceries → Admin  
5. Add PWA capabilities + push notifications  

Please make sure that you do not use any emojis in the project, make sure to use only icons from libraries or maybe custom created svgs.

And use Livvic + Open sans fonts from google fonts

---
