# Expense and Budget Manager API

A secure and simple **Node.js REST API** for managing personal finances.  
This project allows users to **register/login**, **add income**, **add expenses**, **set a monthly budget**, **track total spending**, **check remaining balance**, and receive a **budget exceeded alert through email (SMTP)**.  

It also includes an **admin module** where an admin can view the **financial report of a particular user** and **all users**.

---

## Features

### User Features
- User registration with validation
- User login with JWT authentication
- Add income
- Add expense
- Update and delete income/expense records
- Set monthly budget
- Track total monthly spending
- Check remaining balance
- Budget exceed alert
- Email notification via SMTP when budget is exceeded

### Admin Features
- View financial report of a particular user
- View financial reports of all users

### Security & Validation
- JWT-based authentication
- Role-based authorization
- Duplicate email prevention
- Email format validation
- Required field validation
- Protected routes
- Proper error handling

# Workflow Overview

- User registers and logs in
- JWT token is generated after login
- User uses token to access protected APIs
- User adds income and expenses
- User sets monthly budget

*System calculates:
-total income
-total expense
-total monthly spending
-remaining balance
-remaining budget

*If spending exceeds budget:
-alert is saved in notifications table
-warning email is sent via SMTP

*Admin logs in and views:
-report of one user
-report of all users

# Technologies Used <-----------------------------------------------
-Node.js
-Express.js
-MySQL
-JWT (jsonwebtoken)
-bcryptjs
-express-validator
-nodemailer
-dotenv
-cors

# Installation Instructions <-------------------------------------------

*Prerequisites

**Make sure these are installed on your system:
-Node.js
-npm
-MySQL Server
-Postman (for API testing)
-Git (optional)
