

# 🛒 Full-Stack E-Commerce App

This is a full-featured e-commerce web application built using:

- **Frontend**: Next.js (React)
- **Backend**: Node.js + Express.js (MVC Architecture)
- **Databases**: 
  - PostgreSQL (for Users, Orders)
  - MongoDB (for Products, Cart)

---

## 🌐 Live Website

👉 [Visit Live Site](https://manesh3107-full-stack-exam-manesh-p.vercel.app/)

---

## 🚀 Features

- User authentication (JWT-based)
- Product catalog (MongoDB)
- Shopping cart (MongoDB)
- Order placement (PostgreSQL)
- Analytics (Top spenders, sales by category)
- Responsive design with Tailwind CSS

---

## 🛠 Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```
### 2. Backend

```bash
cd backend
npm install
```

### 3. Frontend

```bash
cd ../ecommerce-frontend
npm install
```

### 4. Setup Environment Variables 
(Backend/.env)

```bash
PORT=

# PostgreSQL
PG_USER=
PG_PASSWORD=
PG_HOST=
PG_PORT=
PG_DATABASE=

# MongoDB
MONGO_URI=
DBNAME=

# JWT
JWT_SECRET=

#CORS
CORS_ORIGIN=

DATABASE_URL=
```

## ⚙️ Running the App Locally

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd backend
npm run dev
```

## Folder Breakdown

### backend/

- controllers/ – All route logic (auth, products, orders, analytics).

- models/pgsql/ – PostgreSQL data models for users, orders.

- models/mongodb/ – MongoDB schemas (products, cart).

- routes/ – Express route definitions.

- middleware/ – JWT authentication and error handling.

- config/ – DB connection config (Mongoose and PG Pool).

### frontend/
- app/ – Next.js page-based routing (products, cart, login, register).

- components/ – Reusable UI components (Navbar).

- context/ – React Context for user auth.

- lib/axios.ts – Preconfigured Axios instance for API calls.


## ☁️ Deployment
- Backend (Render)
- Postgres (Render)
- MongoDB (Mongo Atlas)
- Frontend (Vercel)


