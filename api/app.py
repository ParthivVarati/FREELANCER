from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import mysql.connector
from mysql.connector import Error
import jwt
import datetime
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Database configuration for XAMPP
db_config = {
    'host': 'localhost',
    'user': 'freelancer',  # Updated username
    'password': 'parthiv',  # Updated password
    'database': 'freelancer',
    'port': 3308  # Updated port
}

# Secret key for JWT
SECRET_KEY = "freelancer_secret_key"

# ----- DATABASE FUNCTIONS -----

# Helper function to create a database connection
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        logger.info("MySQL Database connection successful")
    except Error as e:
        logger.error(f"Error: '{e}'")
    return connection

# Function to test database connection
def test_connection():
    connection = create_connection()
    if connection and connection.is_connected():
        db_info = connection.get_server_info()
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        database_name = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return {
            "connected": True,
            "server_info": db_info,
            "database_name": database_name
        }
    return {"connected": False}

# Function to initialize database tables
def init_database():
    logger.info("Starting database initialization...")
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Create provider table
            logger.info("Creating provider table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS provider (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    phone_number VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create seeker table
            logger.info("Creating seeker table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS seeker (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    phone_number VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    skill VARCHAR(255) NOT NULL,
                    years_of_experience INT NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    time_period VARCHAR(50) NOT NULL,
                    base_price DECIMAL(10, 2) NOT NULL,
                    rating DECIMAL(3, 1) DEFAULT 0,
                    reviews INT DEFAULT 0,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            connection.commit()
            logger.info("Database initialization completed successfully")
            cursor.close()
            connection.close()
            return True
        except Error as e:
            logger.error(f"Error initializing database: {e}")
            if connection.is_connected():
                cursor.close()
                connection.close()
            return False
    logger.error("Could not establish database connection for initialization")
    return False

# ----- AUTH FUNCTIONS -----

# Helper function to hash passwords
def hash_password(password):
    # Use a consistent hashing method for both registration and login
    return hashlib.sha256(password.encode()).hexdigest()

# Helper function to verify password
def verify_password(input_password, stored_password):
    # Hash the input password and compare with stored hash
    hashed_input = hash_password(input_password)
    return hashed_input == stored_password

# Helper function to generate JWT token
def generate_token(user_id, user_type):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'type': user_type
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

# Helper function to verify JWT token
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# ----- MAIN APP SETUP -----

def create_app():
    """Create and configure the Flask app"""
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Root route
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({
            "message": "Welcome to the Freelancer API",
            "status": "running",
            "available_endpoints": [
                "/api/init-db",
                "/api/test-db-connection",
                "/api/provider/register",
                "/api/provider/login",
                "/api/seeker/register",
                "/api/seeker/login",
                "/api/seeker/<seeker_id>",
                "/api/seekers"
            ]
        }), 200
    
    # ----- SYSTEM ROUTES -----
    
    @app.route('/api/init-db', methods=['GET'])
    def init_db():
        logger.info("Init-db endpoint called")
        success = init_database()
        if success:
            return jsonify({"message": "Database initialized successfully"}), 200
        else:
            # Check if database exists first
            try:
                test_conn = mysql.connector.connect(
                    host=db_config['host'],
                    user=db_config['user'],
                    password=db_config['password'],
                    port=db_config['port']
                )
                cursor = test_conn.cursor()
                
                # Check if database exists
                cursor.execute(f"SHOW DATABASES LIKE '{db_config['database']}'")
                result = cursor.fetchone()
                
                if not result:
                    logger.info(f"Database '{db_config['database']}' doesn't exist. Creating it.")
                    cursor.execute(f"CREATE DATABASE {db_config['database']}")
                    logger.info(f"Database '{db_config['database']}' created successfully")
                    cursor.close()
                    test_conn.close()
                    
                    # Try initialization again
                    success = init_database()
                    if success:
                        return jsonify({"message": "Database created and initialized successfully"}), 200
                else:
                    cursor.close()
                    test_conn.close()
                    
                return jsonify({
                    "error": "Database initialization failed", 
                    "details": "Database exists but tables could not be created. Check permissions and server logs."
                }), 500
                
            except Error as e:
                logger.error(f"Error checking/creating database: {e}")
                return jsonify({
                    "error": "Database initialization failed",
                    "details": str(e)
                }), 500

    @app.route('/api/test-db-connection', methods=['GET'])
    def test_db_connection():
        result = test_connection()
        if result["connected"]:
            return jsonify({
                "message": "Database connection successful",
                "server_info": result["server_info"],
                "database_name": result["database_name"]
            }), 200
        else:
            return jsonify({"error": "Database connection failed"}), 500
    
    # ----- PROVIDER ROUTES -----
    
    @app.route('/api/provider/register', methods=['POST'])
    def provider_register():
        data = request.json
        name = data.get('name')
        phone_number = data.get('phone_number')
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not all([name, phone_number, email, password]):
            return jsonify({"error": "All fields are required"}), 400
        
        # Hash the password
        hashed_password = hash_password(password)
        
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor()
                
                # Check if email already exists
                cursor.execute("SELECT * FROM provider WHERE email = %s", (email,))
                if cursor.fetchone():
                    return jsonify({"error": "Email already registered"}), 400
                
                # Insert new provider
                cursor.execute(
                    "INSERT INTO provider (name, phone_number, email, password) VALUES (%s, %s, %s, %s)",
                    (name, phone_number, email, hashed_password)
                )
                connection.commit()
                return jsonify({"message": "Registration successful"}), 201
            except Error as e:
                logger.error(f"Error registering provider: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500

    @app.route('/api/provider/login', methods=['POST'])
    def provider_login():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400
        
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                
                # Get the stored password hash
                cursor.execute(
                    "SELECT id, name, email, password FROM provider WHERE email = %s",
                    (email,)
                )
                user = cursor.fetchone()
                
                if user and verify_password(password, user['password']):
                    # Generate JWT token
                    token = generate_token(user['id'], 'provider')
                    return jsonify({
                        "message": "Login successful",
                        "token": token,
                        "user": {
                            "id": user['id'],
                            "name": user['name'],
                            "email": user['email'],
                            "userType": "provider"
                        }
                    }), 200
                else:
                    return jsonify({"error": "Invalid credentials"}), 401
            except Error as e:
                logger.error(f"Error during provider login: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500
    
    # ----- SEEKER ROUTES -----
    
    @app.route('/api/seeker/register', methods=['POST'])
    def seeker_register():
        data = request.json
        name = data.get('name')
        phone_number = data.get('phone_number')
        email = data.get('email')
        skill = data.get('skill')
        years_of_experience = data.get('years_of_experience')
        location = data.get('location')
        time_period = data.get('time_period')
        base_price = data.get('base_price')
        password = data.get('password')
        
        # Validate required fields
        if not all([name, phone_number, email, skill, years_of_experience, location, time_period, base_price, password]):
            return jsonify({"error": "All fields are required"}), 400
        
        # Hash the password
        hashed_password = hash_password(password)
        
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor()
                
                # Check if email already exists
                cursor.execute("SELECT * FROM seeker WHERE email = %s", (email,))
                if cursor.fetchone():
                    return jsonify({"error": "Email already registered"}), 400
                
                # Insert new seeker
                cursor.execute(
                    """INSERT INTO seeker 
                    (name, phone_number, email, skill, years_of_experience, location, time_period, base_price, password, rating, reviews) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                    (name, phone_number, email, skill, years_of_experience, location, time_period, base_price, hashed_password, 0, 0)
                )
                connection.commit()
                return jsonify({"message": "Registration successful"}), 201
            except Error as e:
                logger.error(f"Error registering seeker: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500

    @app.route('/api/seeker/login', methods=['POST'])
    def seeker_login():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400
        
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                
                # Get stored password hash too
                cursor.execute(
                    "SELECT id, name, email, password, skill, years_of_experience, location, time_period, base_price, rating, reviews FROM seeker WHERE email = %s",
                    (email,)
                )
                user = cursor.fetchone()
                
                if user and verify_password(password, user['password']):
                    # Generate JWT token
                    token = generate_token(user['id'], 'seeker')
                    return jsonify({
                        "message": "Login successful",
                        "token": token,
                        "user": {
                            "id": user['id'],
                            "name": user['name'],
                            "email": user['email'],
                            "skill": user['skill'],
                            "experience": user['years_of_experience'],
                            "location": user['location'],
                            "timePeriod": user['time_period'],
                            "basePrice": user['base_price'],
                            "rating": user['rating'],
                            "reviews": user['reviews'] or 0,
                            "userType": "seeker"
                        }
                    }), 200
                else:
                    return jsonify({"error": "Invalid credentials"}), 401
            except Error as e:
                logger.error(f"Error during seeker login: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500

    @app.route('/api/seeker/<int:seeker_id>', methods=['GET'])
    def get_seeker(seeker_id):
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                cursor.execute(
                    "SELECT id, name, email, skill, years_of_experience, location, time_period, base_price, rating, reviews FROM seeker WHERE id = %s",
                    (seeker_id,)
                )
                seeker = cursor.fetchone()
                
                if seeker:
                    return jsonify({
                        "id": seeker['id'],
                        "name": seeker['name'],
                        "email": seeker['email'],
                        "skill": seeker['skill'],
                        "experience": seeker['years_of_experience'],
                        "location": seeker['location'],
                        "timePeriod": seeker['time_period'],
                        "basePrice": seeker['base_price'],
                        "rating": seeker['rating'],
                        "reviews": seeker['reviews'] or 0
                    }), 200
                else:
                    return jsonify({"error": "Seeker not found"}), 404
            except Error as e:
                logger.error(f"Error getting seeker profile: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500
    
    # ----- SEARCH ROUTES -----
    
    @app.route('/api/seekers', methods=['GET'])
    def get_seekers():
        # Get query parameters
        skill = request.args.get('skill', '')
        location = request.args.get('location', '')
        time_period = request.args.get('time_period', '') or request.args.get('timePeriod', '')
        rating = request.args.get('rating', '')
        
        # Construct the base query
        query = "SELECT * FROM seeker WHERE 1=1"
        params = []
        
        # Add filters
        if skill:
            query += " AND skill LIKE %s"
            params.append(f"%{skill}%")
        
        if location:
            query += " AND location LIKE %s"
            params.append(f"%{location}%")
        
        if time_period:
            query += " AND time_period LIKE %s"
            params.append(f"%{time_period}%")
        
        if rating:
            query += " AND rating >= %s"
            params.append(rating)
        
        connection = create_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                cursor.execute(query, params)
                seekers = cursor.fetchall()
                
                # Format the data
                formatted_seekers = []
                for seeker in seekers:
                    formatted_seekers.append({
                        "id": seeker['id'],
                        "name": seeker['name'],
                        "skill": seeker['skill'],
                        "experience": seeker['years_of_experience'],
                        "location": seeker['location'],
                        "timePeriod": seeker['time_period'],
                        "basePrice": seeker['base_price'],
                        "rating": seeker['rating'],
                        "reviews": seeker['reviews'] or 0
                    })
                
                return jsonify(formatted_seekers), 200
            except Error as e:
                logger.error(f"Error searching seekers: {e}")
                return jsonify({"error": str(e)}), 500
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500
    
    return app

# Run the application
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
