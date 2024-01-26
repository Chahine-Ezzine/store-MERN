This repository contains the backend code for a CRUD product store application built using the MERN stack. The application is designed to manage product data with functionalities to create, read, update, and delete (CRUD) product entries.

Technologies Used
Node.js
Express.js: For handling API requests.
Mongoose: For database interactions.
MongoDB: As the database.
CORS: To enable cross-origin requests.
Features
CRUD Operations: Supports creating, reading, updating, and deleting product entries.
Database Integration: Uses MongoDB for storing and retrieving product data.
Getting Started
Installation
Clone the repository.
Run npm install to install dependencies.
Ensure MongoDB is set up and running.
Configuration
Update the mongoDBURL in the config.js file with your MongoDB connection string.
The default port is set to 5555. This can be changed in the config.js file.
Running the Application
Start the application with npm start.
The server will start on the specified port, and connect to the MongoDB database.
API Endpoints
POST /items: Create a new product.
GET /items: Retrieve all products.
GET /items/:id: Retrieve a product by its ID.
PUT /items/:id: Update a product by its ID.
DELETE /items/:id: Delete a product by its ID.
Development Notes
The application logs database connection status and server listening port on startup.
CORS is enabled for all origins.
