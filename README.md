## 🎬 MovieVault

I built this full-stack MERN web app to keep track of movies I've recently watched. It features a clean, dark glassmorphism UI, a 1-10 star rating system with hover previews, and quick toast notifications for actions. It handles all basic CRUD operations and includes a simple stats dashboard on the main page.

---

## 🛠️ What it Does

* **Add & Edit Movies:** Quick modal forms with validation for titles, directors, and release years.
* **Stats Dashboard:** A simple breakdown of your logs right at the top of the page.
* **Rating System:** Clean 1–10 star selector that previews the score when you hover.
* **UI Details:** Dark mode by default, responsive layout for mobile, and smooth CSS transitions.

---

## 📋 What You Need

Make sure you have these installed before trying to run the project locally:

* **Node.js** (v18 or higher)
* **npm** (v9+)
* **MongoDB** (Local instance running on v6+ or a MongoDB Atlas account)
* **Git**

---

## 🚀 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/movie-management-app.git
cd movie-management-app

```

### 2. Backend Setup

```bash
cd backend
npm install

# Set up your environment variables
cp .env.example .env

```

Open up the new `.env` file and drop in your connection string:

```env
MONGO_URI=mongodb://localhost:27017/movie-management
PORT=5000

```

*(If you are using Atlas, just swap out the local URI for your cluster connection string).*

Start the server:

```bash
# For development (uses nodemon for auto-reload)
npm run dev

# For production mode
npm start

```

The server runs on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal window and head to the frontend folder:

```bash
cd frontend
npm install
npm run dev

```

The React app will spin up at `http://localhost:5173`. I've set up a proxy configuration, so frontend API requests are automatically routed to the backend port.

---

## 📁 Project Structure

```
movie-management-app/
├── backend/
│   ├── config/db.js          # Database connection
│   ├── models/Movie.js       # Mongoose schema
│   ├── routes/movieRoutes.js # Express API routes
│   └── server.js             # Entry point
└── frontend/
    ├── src/
    │   ├── components/       # UI elements (Cards, Modals, Stars, Toasts)
    │   ├── services/         # Axios API calls
    │   ├── App.jsx           # Main state management
    │   └── main.jsx          # React entry point
    └── .env                  # Frontend environment variables

```

---

## 🔌 API Quick Reference

Base URL: `http://localhost:5000/api`

* `GET /movies` — Gets all logged movies.
* `GET /movies/:id` — Gets details for a single movie.
* `POST /movies` — Adds a new movie. Expects: `{ title, director, releaseYear, genre, rating }`.
* `PUT /movies/:id` — Updates an existing entry.
* `DELETE /movies/:id` — Deletes a movie.

---

## 📄 License

This project is open-source under the [MIT License](https://www.google.com/search?q=LICENSE).