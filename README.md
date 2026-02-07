# 🛒 NewStore2 – Full‑Stack E‑Commerce Application

A modern **full‑stack e‑commerce web application** built with **React, Zustand, Node.js, Express, MongoDB, and Stripe**. The project supports authentication, product management, cart & checkout flow, Stripe payments, and user profiles with order history.

---

## 🚀 Features

### 👤 Authentication

* User signup & login
* JWT‑based authentication (access & refresh tokens)
* Protected routes (cart, checkout, dashboard, profile)

### 🛍 Products

* View all products
* Featured products
* Category‑based browsing
* Admin dashboard:

  * Create products
  * Delete products
  * Toggle featured products
  * Cloudinary image uploads

### 🛒 Cart System

* Add products to cart
* Increase / decrease quantity
* Remove items
* Cart persistence (stored in database)
* Automatic cart total & quantity calculation

### 💳 Payments (Stripe)

* Stripe Checkout integration
* Secure payment flow
* Redirect to success / cancel pages
* Cart cleared after successful payment

### 👤 Profile Page

* View user details (name, email)
* View order history

---

## 🧰 Tech Stack

### Frontend

* React
* React Router
* Zustand (state management)
* Axios
* Tailwind CSS
* Framer Motion
* Stripe.js

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Stripe API
* Cloudinary

---

## 📁 Project Structure

```
NewStore2/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/ (zustand stores, axios)
│   │   └── App.jsx
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


```

App runs on:

https://clothesstore-hj66.onrender.com/

---

## 🧪 Test Credentials

You can create a test account or use Stripe test cards:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

---

## 🔐 Security Notes

* Passwords are hashed with bcrypt
* JWT tokens stored securely (httpOnly cookies)
* Protected backend routes

---

## 📌 Known Limitations

* Stripe Webhooks not yet implemented (payment handled via success redirect)
* Admin role currently manual

---

## 📈 Future Improvements

* Stripe webhook confirmation
* Admin role management
* Product reviews & ratings
* Order status tracking
* Email notifications

---

## 👨‍💻 Author

**Mahmoud Rabea Assaf**
Full‑Stack Developer

---

Give it a star ⭐ and feel free to contribute!
