# 📸 InstaStam

![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)
![React](https://img.shields.io/badge/react-18-blue)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**InstaStam** is a full-stack, pixel-perfect social media app inspired by Instagram.  
It combines a **React + Redux frontend** with a **Node.js/Express backend**, and offers **real-time interactions** powered by **Socket.io**.

---

## 🌍 Live Demo
👉 [InstaStam on Render](https://instastam.onrender.com/story)

---

## 📸 Screenshots

| Feed (Web) | Profile (Web) |
|------------|---------------|
| ![Feed Screenshot](./frontend/src/assets/screenshots/feed.png) | ![Profile Screenshot](./frontend/src/assets/screenshots/profile.png) |

| Group Chat (Web) | Mobile View |
|------------------|-------------|
| ![Messenger Screenshot](./frontend/src/assets/screenshots/group-chat.png) | ![Mobile Screenshot](./frontend/src/assets/screenshots/mobile.png) |

> ⚡ Replace with real screenshots from your `/assets/screenshots/` folder.

---

## 🚀 Tech Stack

### Frontend
- **React 18** (with Hooks)
- **Redux** (state management)
- **React Router** (routing)
- **SCSS Modules** (styling)
- **Vite** (build tool)
- **Axios** (HTTP client)
- **Socket.io-client** (real-time updates)
- **React Dropzone** (drag & drop file upload)
- **Emoji Picker React** (emoji support)
- **Jest** / **React Testing Library** (testing)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** (with Mongoose ODM)
- **Socket.io** (real-time communication)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **Cloudinary** (image uploads)
- **CORS**, **dotenv**, **morgan** (middleware & utilities)

---

## ✨ Features

- 🔑 **User Authentication**: Sign up, log in, JWT-based sessions  
- 👤 **User Page**: View user profiles, their posts, followers, and following  
- 📝 **Stories & Posts**: Create, view, like, and comment (with image upload)  
- 💬 **Real-time Group Chat**: Chat with multiple users at once via sockets  
- 🎉 **Emoji Support**: Use emojis in posts, comments, and chat  
- 📂 **Drag & Drop**: Upload images and files seamlessly  
- 🔔 **Notifications**: Real-time alerts for likes, comments, follows, and messages  
- 📰 **Feed**: Infinite scroll of stories from followed users  
- 🔍 **Explore Page**: Discover new users and trending stories  
- ❤️ **Like & Follow Toggle**: Instantly like/unlike posts and follow/unfollow users  
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop  

---

## 🗂️ Project Structure

```
instaStam/
├── backend/
│   ├── api/           # Express route handlers (auth, user, story, comment, chat)
│   ├── models/        # Mongoose schemas
│   ├── services/      # Business logic
│   ├── sockets/       # Socket.io setup (chat, notifications)
│   ├── config/        # DB, env, and middleware config
│   └── app.js         # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── assets/    # Images, fonts, screenshots, styles
│   │   ├── cmps/      # Reusable components
│   │   ├── pages/     # Route components (Feed, Profile, Explore, StoryDetails, GroupChat, etc.)
│   │   ├── services/  # API and utility services
│   │   ├── store/     # Redux modules
│   │   └── App.jsx    # Main app component
│   └── vite.config.js
│
├── README.md
└── package.json
```

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/instaStam.git
cd instaStam
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI, JWT secret, Cloudinary config, etc.
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows).

---

## 🧪 Running Tests

```bash
cd frontend
npm test
```

---

## 🛣️ Roadmap
- [ ] Story highlights
- [ ] Push notifications
- [ ] Video stories
- [ ] Story reactions (❤️ 😂 😮 😢)

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Check the [issues page](../../issues).

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by Coding Academy students – for learning, sharing, and connecting!
