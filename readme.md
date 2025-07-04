# 🎓 YT Learn

**YT Learn** is a modern web application designed to simplify and streamline the learning experience using YouTube. It allows users to create custom **topics** (like playlists) and **add their favorite YouTube videos** under each topic—making learning organized, focused, and distraction-free.

---

## 🚀 Live Demo

👉 https://ytlearn-gamma.vercel.app/

---

## 🧠 Why YT Learn?

YouTube is a great platform for learning, but it’s crowded and unstructured. Learners often:

- Lose track of valuable videos
- Struggle to organize content by topic
- Get distracted by unrelated recommendations

**YT Learn** solves this by providing a clean, user-centered interface to **save, organize, and view** videos under custom learning topics.

---

## 🔧 Tech Stack

### Frontend

- **Next.js** – React-based framework for fast and scalable apps
- **Tailwind CSS** – Utility-first styling
- **Shadcn UI** – Beautiful, accessible UI components
- **Framer Motion** – Smooth animations and transitions

### Backend

- **Node.js + Express.js** – RESTful API
- **MongoDB** – NoSQL database for storing users, topics, and video data
- **YouTube Data API v3** – Fetching video metadata from user-pasted links

### Authentication

- **JWT (JSON Web Token)** – Secure user authentication system

---

## ✨ Features

- 🔐 **User Authentication** (Register/Login)
- 📁 **Create Topics** – Organize your learning by subjects
- 🔗 **Add YouTube Videos** – Paste a link and the app fetches title, thumbnail, etc.
- 🎬 **Embedded Video Viewer** – Watch videos directly in the app
- 🗂️ **Topic-based Organization** – All your videos grouped neatly
- 📱 **Responsive UI** – Works smoothly on mobile, and desktop

---

## 📸 Screenshots

- **Landing Page**
  ![Home Page](./screenshots/landingpage.png)
- **Dahsboard**
  ![Home Page](./screenshots/dashboard.png)
- **Create Topic Form**
  ![Home Page](./screenshots/createtopic.png)
- **Add Video Form**
  ![Home Page](./screenshots/addvideo.png)
- **Topics Page**
  ![Home Page](./screenshots/topicspage.png)
- **Embedded Video Viewer**
  ![Home Page](./screenshots/videopage.png)

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/msudipta15/ytlearn.git
cd yt-learn

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start the backend
npm start

# Start the frontend (in a separate terminal)
npm run dev
```
