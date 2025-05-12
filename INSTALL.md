
# FREELANCER - Installation Guide

This guide will help you set up and run the FREELANCER application, a responsive full-stack web application that connects providers (freelancers) and seekers (clients).

## Prerequisites

1. Node.js (v14.0.0 or higher)
2. Python (v3.8 or higher)
3. MySQL database server

## Database Setup

1. Create a MySQL database named `freelancer`
2. Use the following database configuration or update it in `api/app.py` if needed:
   ```python
   db_config = {
       'host': 'localhost',
       'user': 'root',
       'password': '',
       'database': 'freelancer'
   }
   ```

## Backend Setup

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask application:
   ```bash
   python app.py
   ```
   
   The API server will start on `http://localhost:5000`

6. Initialize the database by visiting:
   ```
   http://localhost:5000/api/init-db
   ```
   This will create the necessary tables in your database.

## Frontend Setup

1. Navigate to the project root directory

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register as a provider (freelancer) or a seeker (client)
3. Log in with your credentials
4. Explore the platform features:
   - Providers can search for potential clients
   - Seekers can create and manage their profiles

## Test Users

For testing purposes, you can register new users through the application interface.

## API Endpoints

The API provides the following endpoints:

- `/api/init-db` - Initialize database tables
- `/api/provider/register` - Register a new provider
- `/api/provider/login` - Login as a provider
- `/api/seekers` - Search for seekers with filtering
- `/api/seeker/register` - Register a new seeker
- `/api/seeker/login` - Login as a seeker
- `/api/seeker/:id` - Get a specific seeker's profile

## Troubleshooting

- If you encounter database connection issues, ensure your MySQL server is running and the credentials in `db_config` are correct.
- For CORS issues, ensure the Flask app is running on `http://localhost:5000` and the React app on `http://localhost:3000`.
