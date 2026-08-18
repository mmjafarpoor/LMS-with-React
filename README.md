# 🎓 Learning Management System (LMS)

A modern and responsive **Learning Management System (LMS)** built with **React** and modern frontend technologies.

This project is designed to provide an online learning platform where students can discover courses, explore instructors, read educational content, and interact with the platform through a clean and responsive user interface.

The application focuses on providing a smooth learning experience while maintaining a scalable and maintainable frontend architecture.

---

## ✨ Features

### 🏠 Landing Page

The landing page provides an introduction to the platform and gives users quick access to the most important sections.

* Hero section
* Smart Adaptive Slider
* Featured courses
* Popular instructors
* Latest news
* Platform introduction
* Animated RoadMap
* Comment Slider
* Responsive design
* Smooth navigation

---

### 📚 Courses

Users can browse and explore available courses.

Features include:

* Course listing
* Course details
* Course search
* Course filtering
* Price filtering
* Instructor filtering
* Course categories
* Pagination
* Different course display modes
* Responsive course cards
* Course fallback images

---

## 💳 Payment System

The LMS supports a payment flow for purchasing courses and other paid services.

The payment process is handled through the backend payment APIs and allows the application to track the complete transaction lifecycle.

### Payment Flow

```text
User
  ↓
Select Course
  ↓
Course Details
  ↓
Start Purchase
  ↓
Create Payment Request
  ↓
Redirect / Payment Gateway
  ↓
User Completes Payment
  ↓
Payment Callback
  ↓
Verify Transaction
  ↓
Payment Result
  ↓
Course Access Granted
```

### Payment States

The frontend handles different states of a payment transaction, including:

* Payment initiation
* Redirecting to payment gateway
* Successful payment
* Failed payment
* Cancelled payment
* Payment verification
* Loading states
* Error handling

### Example Scenario

```text
Course
   ↓
Purchase
   ↓
Payment Request
   ↓
Gateway
   ↓
Successful Transaction
   ↓
Backend Verification
   ↓
Enrollment
   ↓
User Can Access Course
```

The frontend does not consider the payment successful solely based on the user's return from the payment gateway. The transaction should be verified through the backend before granting course access.

---

## 🎟️ Reservation System

The LMS also supports a **reservation flow** for reservable educational services or events.

Users can select an available item, choose the required reservation information, and submit their reservation through the platform.

### Reservation Flow

```text
User
  ↓
Select Reservable Item
  ↓
View Details
  ↓
Select Available Date / Time
  ↓
Enter Required Information
  ↓
Submit Reservation
  ↓
Reservation API
  ↓
Backend Validation
  ↓
Reservation Created
  ↓
Confirmation
```

### Reservation Features

* View available reservations
* Select date
* Select time
* Submit reservation
* Reservation validation
* Loading states
* Error handling
* Reservation confirmation
* Reservation status

### Reservation State

A reservation can have different states depending on the backend business logic.

```text
Available
    ↓
Pending
    ↓
Confirmed
    ↓
Completed
```

Possible alternative states:

```text
Pending → Cancelled
Pending → Rejected
Confirmed → Cancelled
```

---

## 🔄 Complete User Journey

The LMS combines authentication, course discovery, purchasing, and reservation into a complete user journey.

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     Login    │
                    └──────┬───────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ Two-Step Verification│
                 └─────────┬──────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ LMS Homepage  │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │    Courses   │          │ Reservations │
       └──────┬───────┘          └──────┬───────┘
              │                         │
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │ Course Detail│          │ Select Slot  │
       └──────┬───────┘          └──────┬───────┘
              │                         │
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │   Payment    │          │ Reservation  │
       └──────┬───────┘          └──────┬───────┘
              │                         │
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │ Verification │          │ Confirmation │
       └──────┬───────┘          └──────────────┘
              │
              ▼
       ┌──────────────┐
       │ Course Access│
       └──────────────┘
```

---

## 🧠 Business Logic Separation

The application keeps business logic separated from UI components.

For example:

```text
Component
    ↓
Custom Hook / Query
    ↓
Service Layer
    ↓
API Client
    ↓
Backend
```

This architecture makes complex scenarios such as authentication, payment, and reservation easier to maintain.

---

## 🔗 Service Layer

API calls are organized into separate services based on their domain.

```text
services/
│
├── authService/
│   ├── login
│   ├── verifyCode
│   └── resendCode
│
├── courseService/
│   ├── getCourses
│   ├── getCourseDetails
│   └── ...
│
├── paymentService/
│   ├── createPayment
│   ├── verifyPayment
│   └── ...
│
├── reservationService/
│   ├── getAvailableSlots
│   ├── createReservation
│   └── ...
│
├── newsService/
│   ├── getNews
│   ├── getNewsDetails
│   └── ...
│
└── teachersService/
    └── ...
```

This separation allows each business domain to evolve independently without tightly coupling API logic to UI components.

---

### 🔎 Course Search & Filtering

The course section includes a dynamic filtering system that allows users to find courses more easily.

Users can filter courses based on:

* Search query
* Instructor
* Price range
* Course type
* Debounce for cutting pressure on api

The filtering system is integrated with the backend API and supports pagination.

---

### 👨‍🏫 Teachers

Users can explore instructors and view their information.

Features include:

* Teacher listing
* Teacher information
* Teacher courses
* Search
* Pagination
* Responsive layout

---

### 📰 News

The platform provides an educational news section where users can discover the latest content and announcements.

Features include:

* News listing
* News details
* Search
* Pagination
* Favorite news
* News comments
* Responsive design

---

### ❤️ Favorites

Users can save content they are interested in for easier access later.

Supported content includes:

* Favorite news
* Saved educational content

---

### 💬 Comments

Users can interact with educational content through comments.

Comments are supported for:

* Courses
* News

The system handles:

* Adding comments
* Displaying comments
* Loading states
* Error handling

---

### 🔐 Authentication

The application includes an authentication system for users.

Features include:

* Login
* Registration
* Protected pages
* Authentication state
* Token-based authentication
* Persistent user session
* Logout

Authentication requests are handled through the centralized API layer.

---

## 🔐 Two-Step Verification

The LMS authentication system supports a **two-step verification flow** to provide an additional layer of security during user authentication.

### Authentication Flow

```text
User
  ↓
Enter Credentials
  ↓
Login API
  ↓
Verification Required?
  ↓
Send Verification Code
  ↓
User Enters Code
  ↓
Verify Code API
  ↓
Authentication Completed
  ↓
Access LMS
```

The verification process can be used to validate the user's identity before granting access to protected sections of the platform.


### Features

* Secure login flow
* Two-step verification
* Verification code handling
* API-based verification
* Loading and error states
* Resend verification code
* Protected routes
* Persistent authentication state

---

### 👤 User Profile

Authenticated users can access their profile and manage their personal information.

Possible profile features include:

* User information
* Profile picture
* Personal information
* Account management
* User preferences

---

### 🌓 Dark & Light Mode

The application supports both dark and light themes.

* Light mode
* Dark mode
* Persistent theme preference
* Theme-aware components
* Responsive theme behavior

---

### 📱 Responsive Design

The entire application is designed to provide a consistent experience across different devices.

Supported layouts include:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Tablet
* 📲 Mobile

The UI adapts dynamically to different screen sizes using responsive CSS and Tailwind CSS utilities.

---

## 🛠️ Technologies

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| React                | Frontend UI             |
| Vite                 | Build tool              |
| Tailwind CSS         | Styling                 |
| CSS Modules          | Component styling       |
| React Router         | Routing                 |
| Axios                | HTTP requests           |
| TanStack React Query | Server-state management |
| Zustand              | Global state management |
| Formik               | Form management         |
| Yup                  | Form validation         |
| React Toastify       | Notifications           |
| Framer Motion        | Animations              |
| React Paginate       | Pagination              |
| clsx                 | Conditional classes     |

---

## 🏗️ Project Structure

The project follows a modular architecture that separates pages, components, services, state management, and utilities.

```text
src/
│
├── assets/
│   ├── Gallery/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── common/
│   ├── CoursesPage/
│   ├── NewsContainer/
│   ├── Teachers/
│   └── ...
│
├── core/
│   ├── config/
│   │   └── queries/
│   │
│   ├── interceptor/
│   │   └── interceptor/
│   │
│   └── services/
│       ├── courseService/
│       ├── newsService/
│       ├── teachersService/
│       └── ...
│
├── pages/
│   ├── Home/
│   ├── Courses/
│   ├── CourseDetails/
│   ├── News/
│   ├── NewsDetails/
│   ├── Teachers/
│   ├── Profile/
│   └── Auth/
│
├── store/
│   ├── DarkStore/
│   ├── UserInfoStore/
│   └── ...
│
├── routes/
│
├── styles/
│
├── utility/
│
├── App.jsx
└── main.jsx
```

---

## 🔌 API Integration

The LMS communicates with the backend through REST APIs.

API communication is centralized using Axios to provide a consistent request and error-handling layer.

Example:

```javascript
export const getCourseDetails = (courseId) =>
  apiClient.get("/Home/GetCourseDetails", {
    params: {
      CourseId: courseId,
    },
  });
```

This separation keeps API logic outside the UI components and makes the application easier to maintain.

---

## ⚡ Server State Management

The project uses **TanStack React Query** for managing server-side data.

React Query is responsible for:

* Fetching API data
* Caching
* Loading states
* Error states
* Refetching
* Synchronizing server data

This allows components to focus primarily on rendering and user interaction.

---

## 🧠 Global State Management

Global client-side state is handled using **Zustand**.

The application uses global state for things such as:

* User information
* Authentication-related data
* Theme
* Global UI state

Zustand keeps global state management lightweight and easy to maintain.

---

## 🔐 Authentication Architecture

The authentication system uses token-based authentication.

The general flow is:

```text
User
  ↓
Login Form
  ↓
Authentication API
  ↓
Access Token
  ↓
Token Storage
  ↓
Axios Interceptor
  ↓
Authorization Header
  ↓
Protected API Requests
```

The Axios interceptor automatically attaches the authentication token to API requests when available.

---

## 🔍 Search & Filtering Architecture

The course filtering system combines multiple filters into a single query state.

Example:

```javascript
const courseFilters = {
  priceType: "All",
  teacherId: [],
  costDown: 0,
  costUp: maxPrice,
  search: "",
};
```

The filtering system supports:

* Text search
* Instructor selection
* Price range
* Course type
* Pagination

Debouncing can also be used for inputs such as search and price filtering to prevent unnecessary API requests.

---

## 📄 Pagination

Large datasets are displayed using pagination to improve performance and user experience.

Pagination is used in sections such as:

* Courses
* Teachers
* News
* User Reserved 
* User Booked
* User Favorite Courses
* User Favorite News

The frontend communicates the current page and page size to the backend API.

---

## 📝 Forms & Validation

Forms are managed using **Formik** and validated using **Yup**.

This provides:

* Centralized form state
* Client-side validation
* Error messages
* Controlled inputs
* Reusable validation schemas

---

## 🔔 User Feedback

The application provides feedback for user actions using notifications and loading states.

Examples include:

* Successful login
* Failed requests
* Favorite actions
* Comment submission
* Form validation
* API errors

**React Toastify** is used for toast notifications throughout the application.

---

## 🎨 UI/UX

The interface is designed around a simple and modern educational experience.

The design system includes:

* Reusable components
* Consistent spacing
* Responsive layouts
* Dark/Light mode
* Loading states
* Empty states
* Error states
* Fallback images
* Responsive cards
* Accessible interactive elements

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/mmjafarpoor/LMS-with-React.git
```

### Navigate to the Project

```bash
cd LMS-with-React
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=your_api_base_url
```

Do not commit sensitive environment variables to the repository.

---

## 📦 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧩 Component Architecture

The application follows a component-based architecture.

Instead of putting all logic inside page components, reusable parts of the UI are extracted into independent components.

For example:

```text
Courses
│
├── SearchInput
├── CourseFilters
├── CourseCards
│   ├── RegularCard
│   └── FullLineCard
│
└── Pagination
```

This approach makes the application:

* Easier to maintain
* Easier to test
* Easier to reuse
* Easier to extend

---

## 📈 Future Improvements

Planned or possible improvements include:

* Online course enrollment
* Video learning system
* Student progress tracking
* Course reviews and ratings
* Online payments
* Shopping cart
* Wishlist
* Advanced user dashboard
* Notifications
* Real-time features
* Advanced course filtering
* Course categories
* Certificate system
* Learning progress analytics
* PWA / Offline support
* Improved accessibility
* Internationalization (i18n)

---

## 🎯 Project Goals

The main goals of this project are:

1. Build a modern and scalable LMS frontend.
2. Provide a smooth learning experience for users.
3. Follow modern React development practices.
4. Build reusable UI components.
5. Separate API, business logic, and presentation.
6. Efficiently manage server and client state.
7. Create a responsive interface for all devices.
8. Build a foundation that can be extended into a complete educational platform.

---

## 👨‍💻 Author

**Mohammad Mehdi Jafarpoor**

Frontend Developer focused on building modern and scalable web applications with React and modern frontend technologies.

* GitHub: [mmjafarpoor](https://github.com/mmjafarpoor)
* LinkedIn: [Mohammad Mehdi Jafarpoor](https://www.linkedin.com/in/mmjafarpoor/)

---

## 📄 License

This project is developed for educational and portfolio purposes.

