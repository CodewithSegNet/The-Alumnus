#!/usr/bin/env python3
from flask import Flask
from app.config import Config

def create_app():
    # Load configuration from your Config class
    app = Flask(__name__)
    app.config.from_object(Config)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
