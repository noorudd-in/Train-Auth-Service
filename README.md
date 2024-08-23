# Train Ticketing - Auth Service

The Auth Service is responsible for managing user authentication and authorization. It handles tasks such as user registration, login, email verification, and basic user management. This service ensures that only authenticated users can book tickets.

# Note
This service is a part of microservice architecture that also includes:
- Search Service: Handles train route searches.
- Booking Service: Manages ticket bookings.
- API Gateway: Orchestrates requests across all microservices.

Running this single micro-service will not be beneficial. Kindly visit [main repository](https://github.com/noorudd-in/Train-Ticketing-Backend) and run all the required micro-services mentioned there. This readme will guide you how to run auth service.

# Installation
1. Clone the repository:
2. Install dependencies:\
`npm install`
3. Setup your MySQL Databases. Inside `src/config/config.json`\
Replace `username` and `password` with your actual MySQL connection.\
Replace `database` with the name of the database for the auth service. If the database is not created, sequelize will automatically create it for you.
4. Start your MySQL in the background. By default MySQL uses port 3306. If your MySQL is running on different port, you can modify the `host` and `port` inside the `src/config/config.json`
5. Create the database mentioned in `config.json` using sequelize. Make sure you are under `src` folder before executing any sequelize command.
```js
cd src
npx sequelize db:create
```
6. Create tables for our auth service defined in the models folder. Make sure you are inside `src` folder.\
`npx sequelize db:migrate`
7. Add dummy data to all our tables using seeders. Run the following command inside your `src` folder:\
`npx sequelize db:seed:all`
8. This will add the dummy data which is available inside `src/seeders/` folder to our tables. Adding one admin atleast is needed to perform other operations.
10. Now start your application using\
`npm start`. By default the auth service will start on\
`http://localhost:1441`

# API Endpoints
## Public Routes
**POST /auth/api/v1/register** - Register a new user and send a email for verification.

**POST /auth/api/v1/login** - Login an existing user. Only email verified users can login.

**GET /auth/api/v1/verify-email?token=xxx** - Verify user email after registration.

**POST /auth/api/v1/resend-verification-email** - Resend an email with new verification link.

## User Routes
**POST /auth/api/v1/profile/:id** - Get the profile of the authenticated user.

## Admin Routes
**GET /auth/api/v1/users** - Get a list of all users.

**GET /auth/api/v1/user/:id** - Get specific user details.

**PATCH /auth/api/v1/user/:id** - Update specific user details.

**DELETE /auth/api/v1/user/:id** - Delete a user.

# Dependencies
- bcrypt: For hashing passwords.
- dotenv: Loads environment variables from a .env file.
- express: Web framework for building the API.
- jsonwebtoken: For generating and verifying JWT tokens.
- mysql2: MySQL database driver.
- nodemailer: For sending emails.
- sequelize: ORM for interacting with the MySQL database.

# Dev Dependencies
- nodemon: Automatically restarts the server on file changes during development.
- sequelize-cli: Command-line interface for Sequelize. It helps to create models, configs, migrations, seeders very easily.

# API/Code Flow
When a user sends a request to the server, the flow is as follows::
- Middleware: The request first passes through the middleware, where it is validated. Here, checks are performed to ensure that required parameters are available. If the parameters are missing or invalid, the request is terminated, and an error response is sent back to the client. If validation is successful, the request is forwarded to
- Controller: The controller receives the validated request and handles any modifications, such as data transformation or mapping. It then forwards the request to
- Service: The service layer contains the core business logic. For example, this is where you might check if a user is authenticated before allowing a ticket booking. After processing the logic, the service layer sends the request to
- Repository: The repository is responsible for database operations. Here, SQL queries are executed to perform CRUD operations. For example, if the request is to create a new ticket, the repository handles the SQL commands and performs the necessary interactions with the database.

# Contributing
Contributions are welcome! Please create an issue or submit a pull request.

# License
MIT