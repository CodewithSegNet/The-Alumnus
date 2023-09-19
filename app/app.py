#!/usr/bin/env python3
from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from decouple import config


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
   
    app.db = db

    # Register the user Blueprint
    from app.controller.user_controller import user_bp
    app.register_blueprint(user_bp, url_prefix='/user')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port='5000')
