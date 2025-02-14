# 🎬 Movie Management App

Welcome to the **Movie Management App**! This is a simple web application that allows users to manage a list of their favorite movies, add actors, and assign them to specific movies.

## 🚀 Features

- **Add Movies**: Users can add new movies with details such as title, year, director, and description.
- **Delete Movies**: Users can remove movies from the list.
- **List Movies**: All added movies are displayed in an organized list.
- **Add Actors**: Users can create actor profiles to be assigned to movies.
- **Delete Actors**: Users can remove actors from the database.
- **Assign Actors to Movies**: Actors can be assigned to specific movies to show their involvement.
- **Remove Actors from Movies**: Actors can be detached from movies if needed.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Milligram (Minimalist CSS framework)
- **Notifications**: React-Toastify for pop-up messages

### **Backend**
- **Framework**: FastAPI
- **Database**: SQLite (using Peewee ORM)
- **Validation**: Pydantic for data validation
- **Server**: Uvicorn for running the FastAPI application

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movie-management-app.git
   cd movie-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Backend Setup** (if applicable):
   Ensure your backend (`main.py`) is running properly to handle API requests.

## 🎥 How It Works

1. Click the **"Add a movie"** button to enter movie details and save it.
2. Click the **"Add an Actor"** button to create an actor profile.
3. Assign actors to movies using the **"Assign an Actor to a Movie"** button.
4. Remove or delete movies and actors using the respective delete options.

## 🛠 Future Enhancements

- Add a search and filter feature for movies.
- Improve UI design with more styling and animations.
- Implement authentication for users.
- Enhance the backend with a database for persistent storage.

---

Enjoy managing your movie collection! 🎬✨
