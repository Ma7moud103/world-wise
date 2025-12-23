# 🌍 WorldWise

WorldWise is a simple travel tracking web application that allows users to mark cities they have visited on an interactive map, add notes about their trips, and keep track of travel dates.

The project focuses on **React fundamentals**, **routing**, **map integration**, and **real-world app structure**, while using **Supabase** as a backend service.

---

## 🚀 Live Demo

🔗 [https://world-wise-p64u.vercel.app/](https://world-wise-p64u.vercel.app/)

---

## 📦 GitHub Repository

🔗 [https://github.com/Ma7moud103/world-wise.git](https://github.com/Ma7moud103/world-wise.git)

---

## 🛠 Tech Stack

* **React**
* **React Router DOM** (Client-side routing)
* **Vite** (Fast development & build tool)
* **CSS Modules** (Scoped styling)
* **Supabase** (Backend as a Service)
* **Leaflet** (Interactive maps)
* **React Datepicker** (Date selection UI)

---

## ✨ Features

* 🗺 **Interactive Map** using Leaflet
* 📍 **Add visited cities** by clicking on the map
* 📝 **City details & notes** for each location
* 📅 **Trip date selection** with date picker
* 🔄 **Dynamic routing** between pages
* 📊 **List of visited cities & countries**
* ☁️ **Persistent data storage** using Supabase
* ⚡ **Fast performance** with Vite

---

## 📂 Project Structure (High Level)

```
world-wise/
├── src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   └── App.jsx
├── public/
├── package.json
└── vite.config.js
```

---

## 🔐 Environment Variables

This project uses **Supabase**. You must define the following environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

⚠️ **Important**: Do NOT commit your `.env` file to GitHub.

---

## ▶️ Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Ma7moud103/world-wise.git
   ```

2. Navigate to the project folder:

   ```bash
   cd world-wise
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add your Supabase credentials

5. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

The project is deployed on **Vercel**.

* Automatic deployment on every `git push`
* Environment variables managed via Vercel dashboard

---

## 🎯 Learning Goals

* Working with **React Router** in real projects
* Managing global state using **Context API**
* Integrating **maps** into React applications
* Handling **forms & dates**
* Connecting a frontend app to **Supabase**

---

## 👤 Author

**Mahmoud Shawky**
Front-End Developer (React)

* GitHub: [https://github.com/Ma7moud103](https://github.com/Ma7moud103)

---

## 📄 License

This project is for educational purposes.
