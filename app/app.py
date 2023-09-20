#!/usr/bin/env python3
from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from decouple import config
from flask_cors import CORS

# create a slqalchemy object
db = SQLAlchemy()

def create_app():
    # Load configuration from your Config class
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize the database with the app
    db.init_app(app)

    # secret key from the .env file using python-decouple
    secret_key = config('SECRET_KEY')

    # set key for app
    app.secret_key = secret_key

    # Register the user Blueprint
    from app.controller.user_controller import user_bp
    app.register_blueprint(user_bp, url_prefix='/api')

    # Configure CORS to allow requests from any origin
    CORS(app)

    # create the datebase tables
    with app.app_context():
        db.create_all()


    return app

if __name__ == '__main__':
    app = create_app()

    app.run(host='0.0.0.0', port='5000')
