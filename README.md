Product Store Application Frontend
Introduction
This is the frontend part of a CRUD product store application developed using React. 

Key Features
CRUD Functionalities: Create, read, update, and delete products.
Search Functionality: Allows users to search for products based on different criteria.
Responsive Design: Ensures a consistent user experience across various devices and screen sizes.
Navigation and Routing: Utilizes react-router-dom for navigating between different pages and views.
Technologies Used
React: For building the user interface.
Axios: For making HTTP requests to the backend.
CSS: For styling components.
Installation and Setup
Clone the repository and navigate to the frontend directory.
Run npm install to install all the dependencies.
Ensure that the backend server is running to interact with the API.
Running the Application
Use npm start to run the application.
The application will be served at http://localhost:3000 by default.
Components
Layout
Handles the layout of the application including navigation and common UI elements.
Pages
HomePage: The landing page of the application.
ListItems: Displays a list of all products with options to edit or delete.
CreateItem: A form to add a new product to the store.
Functionality
Creating Products: Users can add new products to the store.
Listing Products: Products are listed, with options for editing or deleting.
Editing Products: Provides a modal for editing existing products.
Deleting Products: Allows users to delete products from the store.
Searching Products: Users can search for products using specific criteria.
API Interaction
The frontend interacts with the backend through RESTful APIs.
Axios is used for handling these HTTP requests.
Development Notes
The application is structured with a focus on modularity and reusability of components.
State management is handled using React's useState and useEffect hooks.
