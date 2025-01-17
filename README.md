# Blog-API
This project implements a basic user authentication system using Express.js and Sequelize. It provides features for user registration, login, and user data retrieval, and uses JWT (JSON Web Tokens) for secure authentication.

# Features
- User Registration: Allows new users to create an account.
- User Login: Authenticates users and returns a JWT token.
- Protected Routes: Certain routes are protected and can only be accessed by authenticated users.
- User Data: Retrieve user data by sending a request with the JWT token.

# Technologies Used
- Node.js - JavaScript runtime for the backend.
- Express.js - Web framework for building the API.
- Sequelize - ORM for interacting with the database.
- JWT (JSON Web Token) - For secure user authentication.
- MySQL - The relational database used to store user data
- Bcrypt.js - For password hashing.

# Prerequisites
- Node.js and npm installed on your machine.
- A running MySQL database instance (configure the database in .env).

# Installation
#### 1. Clone the repository
#### 2. Install dependencies
```
npm install
```
#### 3. Configure the database
Create a .env file at the root of the project and add your database credentials:
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_EXPIRATION=
```
#### 4. Start the application
```
npm start
```