# Career Guidance App

## Overview
The **Career Guidance App** is a web-based platform designed to assist students and parents in selecting suitable engineering and management universities in India and abroad. It provides essential information about institutions, including tuition fees, housing costs, eligibility criteria, campus placements, and scholarships. Additionally, the app features an aptitude test to help students make informed career choices.

## Features
### **Student Module**
- User Authentication (Login/Signup)
- College Listing & Selection
- Eligibility Check & Aptitude Test
- College Registration & Application
- Profile Management

### **Admin Module**
- Manage Colleges & Update Information
- Oversee Student Registrations
- Control College Listings & Admissions

## Tech Stack
### **Frontend**
- React, Redux, React Router
- Tailwind CSS
- React Hook Form
- Axios
- ShadCN/UI
- Chart.js

### **Backend**
- Node.js, Express.js
- MongoDB
- JWT Authentication (Cookies for security)

## Installation
### **Prerequisites**
- Node.js & npm installed
- MongoDB instance running (local/cloud)

### **Clone Repository**
```sh
git clone https://github.com/Abhishek-karma/Career-Guidance-App.git
cd Career-Guidance-App
```

### **Backend Setup**
```sh
cd backend
npm install
npm start
```
Create a `.env` file and configure your environment variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### **Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

## Usage
- Open the frontend in your browser: `http://localhost:5173`
- Ensure the backend is running at `http://localhost:5000`
- Register/Login as a Student to explore colleges and apply
- Admins can manage institutions and oversee student applications

## Future Enhancements
- **Payment Integration** for application fees
- **AI-based Career Suggestions** based on test results
- **Notification System** for student updates
- **Chat Support** for guidance & counseling

## Contributing
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your branch and submit a PR

## License
This project is licensed under the MIT License.

## Contact
For queries or collaboration, reach out at **abhishek.karma@example.com**

