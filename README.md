# 🎬Watchoria Platform

A full-featured movie and TV shows platform built using **TMDB APIs** and **Supabase**, allowing users to discover content, manage watchlists, rate shows, and personalize their profiles.

This project is designed as a **production-level application**, inspired by platforms like TMDB and IMDb, with additional user-centric features.

---

## 🚀 Live Demo

🔗 https://watchoria.vercel.app

---

## 🛠️ Tech Stack

**Frontend**

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- swiper
- formik
- yup
- FontAwesome
- clsx
- react-helmet

**Backend & Services**

- Supabase (Authentication, Database, Storage)
- TMDB API

**Other**

- Environment Variables
- Protected Routes
- Pagination & Search
- Responsive Design

---

## ✨ Features

### 🏠 Home

- Trending movies & TV shows
- New releases
- Dynamic sections powered by TMDB

---

### 🎥 Movies

- Browse all movies
- Pagination support
- Detailed movie pages:
  - Overview
  - Cast
  - Recommendations
  - Where to watch
  - Trailer
  - User ratings
  - add and remove from watchlist

---

### 📺 TV Shows

- Browse TV shows with pagination
- TV show details:
  - Overview 
  - Cast
  - Recommendations
  - Where to watch
  - Seasons & episodes.
  - User ratings
  - add and remove from watchlist

---

### 🔍 Search

- Global search from header
- Dedicated search page
- Pagination for search results
- Search across movies , TV shows and persons

---

### ❤️ Watchlist

- Add / remove movies & TV shows
- User-specific watchlist
- Persistent data using Supabase
- Display watchlist in a dedicated page

---

### ⭐ Ratings

- Rate movies & TV shows
- Edit user ratings
- View all rated content in a ratings page
- Ratings linked to authenticated users

---

### 👤 Authentication

- Login & Signup using Supabase Auth
- Protected routes
- Only authenticated users can access:
  - Watchlist
  - Ratings
  - Profile

---

### 🧑‍💻 Profile

- View and edit user information
- Upload ,change and remove profile picture
- Display user watchlist & ratings
- Personalized user experience

---

## 🔐 Security & Authorization

- Supabase Row Level Security (RLS)
- Each user can only access and modify their own data
- Secure environment variables

---

## 🧠 Architecture Highlights

- Separation of concerns (API / UI / State)
- Centralized state management with Redux
- Reusable UI components
- Scalable folder structure

---

## 📈 Future Enhancements

- User reviews & comments
- Advanced watchlist categories
- Public user profiles
- User statistics & analytics
- Custom recommendation system
- Notifications system

---

## 🧪 Why This Project?

This project demonstrates:

- Real-world API integration
- Authentication & authorization
- User-based data handling
- Scalable frontend architecture
- Production-ready UI & UX practices
- Theme management (Dark / Light mode)

---

## 🧑 Author

**Marwan Ashraf**  
Frontend Developer  
🔗 Portfolio: https://watchoria.vercel.app/ 
🔗 GitHub: https://github.com/Marwanaashraf/watchoria.git

---

## 📄 License

This project is for educational and portfolio purposes.
TMDB data is provided by TMDB APIs.


##  Setup & Installation

# 1. Clone the repository

git clone https://github.com/Marwanaashraf/watchoria.git

# 2. Navigate to the project directory

cd watchoria

# 3. Install dependencies

npm install

# 4. Start the development server

npm start
