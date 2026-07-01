# 🌍 Wanderlust

### A Full-Stack Travel Booking Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 📖 About

**Wanderlust** is a full-stack travel booking platform where users can explore destinations, create property listings, upload images, write reviews, and book accommodations securely. Property owners can manage booking requests through an approval system, providing a seamless booking experience.
---

# ✨ Features

- 🔐 Secure User Authentication (Signup/Login)
- 🏡 Create, Edit & Delete Property Listings
- 🖼️ Image Upload with Cloudinary
- ⭐ Review & Rating System
- 🔎 Search Listings by Title, Location & Category
- 🗂️ Category-based Filtering
- 📅 Book Properties with Date Validation
- 📋 My Bookings Dashboard
- ✅ Owner Booking Approval (Accept/Reject)
- 📱 Owner Contact Information
- 🚫 Prevent Double Bookings
- 💬 Flash Messages & Form Validation
- 📱 Responsive User Interface

---

# 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js

### Cloud Storage
- Cloudinary

### Other Tools
- Multer
- Express Session
- Connect Flash
- Method Override

- ---

# 📂 Project Structure

```
wanderlust/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
└── README.md
```


---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/nishad-uday/wanderlust.git
```

Go to project folder

```bash
cd wanderlust
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
```

Run the application

```bash
npm start
```

Visit

```
http://localhost:8080
```

---

# 🚀 Future Enhancements

- 💳 Online Payment Gateway
- 📍 Google Maps Integration
- ❤️ Wishlist Feature
- 🔔 Email Notifications
- 📱 Progressive Web App (PWA)
- 🌍 Multi-language Support
- 📊 Admin Dashboard

- ---

# 👨‍💻 Author

**Uday Kumar**

- GitHub: https://github.com/nishad-uday
- LinkedIn: https://www.linkedin.com/in/uday-kumar-706/

---

⭐ If you like this project, don't forget to star the repository.
