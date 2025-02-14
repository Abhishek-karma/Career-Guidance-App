Here’s a comprehensive and detailed `README.md` file for your **Career Guidance App**:

---

# Career Guidance App

## Overview
The **Career Guidance App** is a web-based platform designed to assist students and parents in selecting suitable engineering and management universities in India and abroad. It provides essential information about institutions, including tuition fees, housing costs, eligibility criteria, campus placements, and scholarships. Additionally, the app features an aptitude test to help students make informed career choices.

This app is built with a modern tech stack, offering a seamless user experience for students and robust administrative capabilities for managing colleges and student applications.

---

## Features

### **Student Module**
1. **User Authentication**:
   - Secure login and signup using JWT-based authentication.
   - Password hashing for enhanced security.

2. **College Listing & Selection**:
   - Browse colleges with filters for location, tuition fees, and eligibility criteria.
   - Detailed college profiles with information on fees, placements, and scholarships.

3. **Eligibility Check & Aptitude Test**:
   - Take an aptitude test to assess career suitability.
   - View test results and get personalized college recommendations.

4. **College Registration & Application**:
   - Register for preferred colleges.
   - Submit applications and track their status.

5. **Profile Management**:
   - Update personal details, academic records, and location preferences.
   - View aptitude test scores and recommended colleges.

---

### **Admin Module**
1. **Manage Colleges**:
   - Add, update, or delete college information.
   - Set eligibility criteria, tuition fees, and housing costs.

2. **Oversee Student Registrations**:
   - View and manage student applications.
   - Monitor student aptitude test scores.

3. **Control College Listings & Admissions**:
   - Approve or reject college listings.
   - Manage admission processes and deadlines.

---

## Tech Stack

### **Frontend**
- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management for handling global app state.
- **React Router**: For navigation and routing within the app.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern UI design.
- **React Hook Form**: For efficient form handling and validation.
- **Axios**: For making HTTP requests to the backend.
- **ShadCN/UI**: A collection of reusable UI components.
- **Chart.js**: For visualizing data, such as aptitude test results.

### **Backend**
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing college, student, and test data.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (stored in HTTP-only cookies for enhanced security).

---

## Installation

### **Prerequisites**
- Node.js (v16 or higher) and npm installed.
- MongoDB instance running (local or cloud-based).

### **Clone Repository**
```sh
git clone https://github.com/Abhishek-karma/Career-Guidance-App.git
cd Career-Guidance-App
```

### **Backend Setup**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory and configure the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

---

## Usage

### **For Students**
1. Open the app in your browser: `http://localhost:5173`.
2. Register or log in to access your dashboard.
3. Browse colleges, take the aptitude test, and apply to your preferred institutions.
4. Manage your profile and track your applications.

### **For Admins**
1. Access the admin dashboard (ensure you have admin privileges).
2. Add or update college information.
3. Manage student applications and monitor aptitude test results.

---

## API Endpoints

### **Student Endpoints**
- **POST /student/register**: Register a new student.
- **POST /student/login**: Log in as a student.
- **GET /student/profile**: Get student profile details.
- **PUT /student/profile**: Update student profile.
- **GET /student/test/start**: Start the aptitude test.
- **POST /student/test/submit**: Submit aptitude test answers.
- **GET /student/results**: View aptitude test results.
- **GET /student/colleges**: Get eligible colleges based on test scores.
- **POST /student/colleges/register**: Register for a college.

### **Admin Endpoints**
- **POST /admin/register**: Register a new admin.
- **POST /admin/login**: Log in as an admin.
- **GET /admin/students**: Get all students.
- **GET /admin/stats**: Get admin statistics (total students, colleges, etc.).
- **POST /admin/colleges**: Add a new college.
- **PUT /admin/colleges/:id**: Update a college.
- **DELETE /admin/colleges/:id**: Delete a college.
- **POST /admin/questions**: Create aptitude test questions.
- **GET /admin/questions**: Get all aptitude test questions.
- **DELETE /admin/questions/:id**: Delete a specific question.

---

## Future Enhancements
1. **Payment Integration**:
   - Enable students to pay application fees securely.
2. **AI-based Career Suggestions**:
   - Provide personalized career recommendations based on aptitude test results.
3. **Notification System**:
   - Notify students about application updates, deadlines, and new college listings.
4. **Chat Support**:
   - Offer real-time guidance and counseling through a chat interface.

---

## Contributing
We welcome contributions to improve the app! Here’s how you can contribute:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch and submit a pull request.

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact
For queries, feedback, or collaboration, feel free to reach out:
- **Email**: abhikarma.work@gmail.com
- **GitHub**: [Abhishek-karma](https://github.com/Abhishek-karma)

---

This detailed `README.md` provides a complete overview of the app, its features, setup instructions, API endpoints, and future plans. It’s designed to help developers, contributors, and users understand and work with the project effectively.
