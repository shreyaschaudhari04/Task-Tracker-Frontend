# Task Tracker Frontend

🌟 **Task Tracker Frontend** is a modern task management app built using **Vue 3**, designed for fast, secure task tracking with user authentication and task CRUD operations.  
It integrates with a Nest.js + MongoDB backend and is designed for deployment on **Netlify**.
[Try It Out]([https://your-backend-url.com](https://tasktrackerv001.netlify.app/)


---

## 🚀 Features

✅ **User Authentication**
- Secure signup and login with JWT tokens
- Password confirmation on signup

✅ **Task Management**
- View task list (TaskList.vue)
- Add new tasks (TaskForm.vue)
- Update and delete tasks (optional extension)

✅ **Frontend Architecture**
- Vue 3 
- Vue Router (login, signup, task list routes)
- Vuex for state management (auth, token handling)
- Axios for API requests
- Tailwind CSS for responsive UI
- Vue Toastification for notifications

✅ **Security**
- JWT-based authentication
- CORS support (backend-side)
- HTTPS enforced by Netlify

---

## 🛠 Tech Stack

- **Vue 3**
- **Vuex**
- **Vue Router**
- **Tailwind CSS**
- **Axios**
- **Vue Toastification**
- **MongoDB Atlas (backend data storage)**
- **Nest.js backend (in separate repo)**

---

## ⚙️ Setup Instructions

### Clone the repo
```bash
git clone https://github.com/shreyaschaudhari04/Task-Tracker-Frontend.git
cd Task-Tracker-Frontend
```

### Install Dependencies
```bash
npm install
```

### Set up environment
Create a .env file and add your backend API URL:
```bash
VITE_API_URL=https://your-backend-url.com/api
```

### Run the app
```bash
npm run dev
```

## 🌐 Deployment

The frontend is designed to be deployed on **Netlify**.  
👉 Push to GitHub and connect your repo in Netlify for auto-deploy.

---

## 🔒 Security Measures

- **JWT Authentication** for secure session management  
- **HTTPS** via Netlify  
- **CORS** configured in backend for trusted origins  

