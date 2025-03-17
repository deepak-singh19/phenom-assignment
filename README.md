# Node.js API with Spotify & Advice Integration

## 📌 Project Overview
This project is a Node.js API built with TypeScript that integrates with the Spotify API and the Advice Slip API. It allows users to fetch their top tracks from Spotify and get relevant life advice based on the track names. The application is secured with JWT authentication and includes rate limiting for API protection.

## 🚀 Features
- **User Authentication**: Secure login using JWT tokens.
- **Spotify Integration**: Authenticate with spotify to get top track.
- **Advice Integration**: Fetch advice based on the track name.
- **Database Storage**: MongoDB stores user requests and responses.
- **Rate Limiting**: Prevents excessive API calls.
- **Dockerization**: Run the application in a containerized environment.(OPTIONAL)

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, TypeScript
- **Authentication**: JWT
- **Database**: MongoDB with Mongoose
- **APIs**: Spotify API, Advice Slip API
- **Security**: Helmet, CORS, dotenv
- **Containerization**: Docker & Docker Compose

---

## 🔧 Setup & Installation
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Docker](https://www.docker.com/)
- Create a **Spotify Developer Account** and get API credentials
- Setup a **MongoDB database**

### Steps
#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo.git
cd your-repo
```

#### 2️⃣ Install Dependencies
```sh
npm install
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_secret_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=your_callback_route
```

#### 4️⃣ Start the Server
```sh
npm run dev
```

#### 5️⃣ Run with Docker (OPTIONAL)
##### Build and Run the Docker Container
```sh
docker build -t node-api .
docker run -p 3000:3000 --env-file .env node-api
```
##### Using Docker Compose
```sh
docker-compose up --build
```

---

## 📌 API Endpoints
### **Auth Routes**
- `POST /api/auth/login` → Authenticate with spotify and get JWT token

### **User Routes**
- `GET /api/user/:user_id/track-advice` → Fetch advice based on a track name

---

## 📜 System Architecture
The application follows a **modular and scalable architecture**, with separate layers for:
1. **Controller Layer**: Handles request validation & response formatting.
2. **Service Layer**: Manages business logic & API integrations.
3. **Middleware Layer**: Implements authentication, rate limiting, and error handling.
4. **Database Layer**: Manages MongoDB operations using Mongoose.
5. **Security Layer**: Includes JWT authentication and security headers.

---

## 📚 Biggest Learning Takeaway
This project demonstrated the power of **third-party API integrations** while managing authentication, rate limiting, and data consistency effectively. Using TypeScript and Docker helped improve scalability and maintainability.



