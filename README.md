Mo's Movie Hut

Mo's Movie Hut is a web application for movie enthusiasts to search, register, and explore movie information. Users can log in, register, search for movies, and access detailed movie information.

Features User authentication system (registration and login). Search functionality for movies using external APIs. Responsive design for ease of use on various devices. Integration with MySQL for user and movie data management. Acts as an API for other applications to fetch movie data.

Tech Stacks: Frontend: HTML, CSS, JavaScript, EJS (Embedded JavaScript Templates) Backend: Node.js, Express.js Database: MySQL API Integration: Fetch data from external movie APIs

Installation: Clone this repository: git clone https://github.com/your-username/movie-project.git

Navigate to the project directory: cd movie-project

Install dependencies: npm install Set up the MySQL database: Create a MySQL database. Create necessary tables.

Start the server: node app.js Visit http://localhost:3000 in your browser.

Usage Homepage: Explore the website and navigate to different sections. Register/Login: Create an account or log in to access more features. Search Movies: Search for movies using the search bar. Logout: Log out of your account from the navigation bar.

API Endpoints This project exposes its own API endpoints: GET /api/movies: Fetch all movies. GET /api/movies/:id: Fetch details of a specific movie by ID. POST /api/movies: Add a new movie (requires authentication). DELETE /api/movies/:id: Delete a movie by ID (requires authentication).