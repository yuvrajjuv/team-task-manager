🚀 Team Task Manager

A full-stack web application for managing projects and tasks with secure authentication.

---

📌 Overview

Team Task Manager is a MERN Stack application that allows users to manage their projects and tasks efficiently.

It includes:

- 🔐 Secure authentication using JWT
- 📁 Project management system
- 📝 Task tracking inside projects
- 🚫 Protected routes for authorized access
- 👤 Personalized dashboard

---

🛠️ Tech Stack

💻 Frontend

- ⚛️ React (Vite)
- 🔀 React Router DOM
- 📡 Axios

🖥️ Backend

- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB (Mongoose)
- 🔐 JWT Authentication

---

⚙️ Features

🔐 Authentication

- User Signup & Login
- JWT-based authentication
- Protected routes

📊 Dashboard

- Displays logged-in user name
- Logout functionality
- Route protection

📁 Project Management

- Create Project
- View Projects
- Update Project
- Delete Project

📝 Task Management

- Create Tasks inside Projects
- Update Task status (todo / in-progress / done)
- Delete Tasks
- Filter & Search Tasks

---

📂 Folder Structure

team-task-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json

---

🔑 Environment Variables

Create a ".env" file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

🚀 Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/yuvrajjuv/team-task-manager.git
cd team-task-manager

---

2️⃣ Backend Setup

cd backend
npm install
npm run dev

---

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

🌐 Run Application

- Frontend → http://localhost:5173
- Backend → http://localhost:5000

---

🔒 Protected Routes

- "/dashboard" → accessible only after login
- Unauthorized users are redirected to login page

---

🧪 API Endpoints

🔐 Auth

- "POST /api/auth/signup"
- "POST /api/auth/login"

📁 Projects

- "GET /api/projects"
- "POST /api/projects"
- "PUT /api/projects/:id"
- "DELETE /api/projects/:id"

📝 Tasks

- "GET /api/tasks"
- "POST /api/tasks"
- "PUT /api/tasks/:id"
- "DELETE /api/tasks/:id"

---

📸 Screenshots

- 🔑 Login Page
- 📊 Dashboard
- 📁 Projects API
- 📝 Tasks API

---

🎯 Future Improvements

- 🎨 UI improvements (Tailwind CSS / Material UI)
- 👥 Multi-user collaboration
- 📅 Task deadlines & reminders
- ☁️ Deployment (Vercel + Render)

---

👨‍💻 Author

Yuvraj Malviya

- GitHub: https://github.com/yuvrajjuv
- LinkedIn: https://www.linkedin.com/in/yuvraj-malviya

---

⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

🏁 Conclusion

This project demonstrates a complete full-stack development workflow, including:

✔ Authentication
✔ API Integration
✔ Database Operations
✔ Protected Frontend Routes

---

🔥 Built with dedication by Yuvraj Malviya 🚀
