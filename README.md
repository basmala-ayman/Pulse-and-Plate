# 🥗 Pulse & Plate

**Pulse & Plate** is a full-stack web application for ordering healthy meals. It provides a fully responsive, easy-to-navigate interface for users to explore meals, manage orders, and maintain healthy eating habits. The platform also includes admin functionalities for menu and order management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Usage Guide](#usage-guide-for-users)
- [API and Database](#api-and-database)
- [Contributors](#contributors)

---

## Features

### User Features

- User registration & login (JWT authentication)
- Profile management (name, email)
- View categorized healthy meals
- Add meals to cart
- Place orders

### Admin Features

- Dashboard with controls for managing meals and orders
- CRUD operations for user, categories, items
- View and manage user orders

### General Features

- Fully responsive design (mobile/tablet/desktop)
- Form handling with validation (Formik)
- Navigation with React Router

---

## Tech Stack

### Frontend

- React
- React Router
- Bootstrap
- CSS
- Formik (form handling)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Bcrypt (password hashing)

---

# Getting Started

### Prerequisites

- Node.js & npm
- MongoDB installed and running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/basmala-ayman/Pulse-and-Plate.git

cd Pulse-and-Plate
```

2.  Install dependencies for both frontend and backend:

```bash
npm install -y
```

3. Create a file named `.env`and paste this line:
   ```bash
   MONGODB_URI=mongodb+srv://esraa:esraa@pulseandplasedb.veodylk.mongodb.net/pulseandplateDB?retryWrites=true&w=majority
   ```
4. Start the application:

- In one terminal (for frontend):

```bash
npm start
```

- In another terminal (for backend):

```bash
node server.js
```

## Available Scripts

#### Inside package.json, you can find:

- `npm start`: Runs the app in development mode
- `node server.js`: Starts the backend server

## Usage Guide (For Users)

1.  Register an account using your name, email, and password
2.  log in to access your profile and meal options
3.  Browse meals by category and add items to your cart
4.  Submit orders
5.  Update profile info(name and password)

## API and Database

### MongoDB Collections

- Users: Stores user info and encrypted passwords
- Menus: Has multiple categories
- Categories: Contains many items
- Items: Individual meal entries

## Contributors

- [Basmala Ayman](https://github.com/basmala-ayman)
- [Ruba Abdelsalam](https://github.com/Rrr3rrr2004)
- [Habiba Adel](https://github.com/Habiba-Adel)
- [Zeina Wady](https://github.com/zeinawady)
- [Hafsa Tarek](https://github.com/HafsaTarek)
- [Esraa Ahmed](https://github.com/2004esra)
