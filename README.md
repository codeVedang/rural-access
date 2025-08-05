<div align="center">
<br />
<h1><strong>RuralConnect - Full-Stack Delivery Platform</strong></h1>
<p>A full-stack web application designed to help rural communities access essential products and services. Built with the MERN stack and deployed live on Vercel and Render.</p>
<br />
</div>

<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
</p>

## 🚀 Live Demo
Frontend (Vercel): [LFRONTEND](https://rural-access-vedang.vercel.app/)

Backend API (Render): [BACKEND](https://rural-app-backend.onrender.com)

## ✨ Key Features
Responsive Homepage UI: Attractive interface with multiple sections.

Secure User Authentication: Full signup/login flow using JWT.

Private User Dashboard:

View past bookings with status and details.

Edit profile information (name, phone number).

Dynamic Product & Service Listings: Data served from the backend API.

Live Product Search: Instantly filter products by name.

Shopping Cart & Booking System: Add products to a cart and place an order.

Functional Contact Form: Stores user messages directly in the database.

Cloud Deployment: Separate, live deployments for the frontend, backend, and database.

## 🛠️ Tech Stack
Component

Technology

Frontend

React.js, Tailwind CSS, Axios

Backend

Node.js, Express.js

Database

MongoDB (with Mongoose)

Auth

JSON Web Tokens (JWT)

Deployment

Vercel (Frontend), Render (Backend), MongoDB Atlas (DB)

## ⚙️ Local Development Setup
``` bash 
To run this project on your local machine, follow these steps.

Prerequisites
Node.js (v16 or higher)

MongoDB installed and running locally.

1. Clone the Repository
git clone https://github.com/codeVedang/rural-access.git
cd rural-access

2. Setup the Backend
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your variables
# MONGO_URI=mongodb://localhost:27017/rural_access
# JWT_SECRET=your_super_secret_key

# Start the development server
npm run dev
# The backend will be running on http://localhost:5000

3. Setup the Frontend
# Open a new terminal and navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
# The frontend will open automatically at http://localhost:3000

🔌 API Endpoints
All backend API routes are prefixed with /api.

Method

Endpoint

Description

Access

POST

/auth/register

Register a new user.

Public

POST

/auth/login

Log in a user and get a token.

Public

GET

/users/me

Get the profile of the logged-in user.

Private

PUT

/users/me

Update the logged-in user's profile.

Private

GET

/services

Get the list of all services.

Public

GET

/products

Get all products (supports search query).

Public

GET

/news

Get the latest news headlines.

Public

POST

/contact

Submit the contact form.

Public

GET

/bookings

Get all bookings for the logged-in user.

Private

POST

/bookings

Create a new booking from the cart.

Private
```

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
