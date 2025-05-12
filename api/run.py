
from api.app import create_app
import logging

if __name__ == '__main__':
    logging.info("Starting Flask application...")
    app = create_app()
    app.run(debug=True, port=5000)
