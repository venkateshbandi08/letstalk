# Let's Talk (Real time chatting app - using websockets)

### Deployed link : https://letstalk-v08.vercel.app
### Demo video : https://www.loom.com/share/2f456f92f673413d8b4a474ec0e74843?sid=f0848863-4bd9-40cc-b734-a4830112dd77

## Project Overview
This project is a web application of a chatting platform where two users can login/register and can chat with each other in realtime.

## Technologies Used
- **Frontend:** React, React Bootstrap, Styled Components
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** React Bootstrap, Styled Components

## Features
- **Register** one can Register by providing valid credientials
- **Login** one can login by providing valid credientials
- **Session Management:** Use JWT for user authentication and session management.
- **Set an Avatar:** A registered user can set an avatar as an display icon
- **Toasts:** Display success and error messages using toast notifications.
- **Logout:** A user can logout by clicking on the logout button

## Setup Instructions

### Backend
1. **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. **Navigate to the backend directory:**
    ```bash
    cd server
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the backend directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. **Run the backend server:**
    ```bash
    npm start
    ```

### Frontend
1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the frontend directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Run the frontend server:**
    ```bash
    npm start
    ```

### Usage
1. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.
2. **Register**
3. **Login**
4. **Set an avatar**
5. **choose a contact**
6. **start chatting**

## Project Structure

### Backend
- **server:** Entry point of the backend application.
- **routes:** Contains route files for different entities.
- **controllers:** Contains controller files for handling business logic.
- **models:** Contains Mongoose schema definitions.
- **middleware:** Contains middleware functions, including JWT authentication.

### Frontend
- **src/components:** Contains React components.
- **src/pages:** Contains main pages of the application.
- **src/utils:** Contains utility files such as API routes.
- **src/App.js:** Entry point of the frontend application.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.

