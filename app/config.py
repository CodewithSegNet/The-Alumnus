#!/usr/bin/env python3
# Import 
import os

class Config:
    '''Base configuration class
    '''
    # database URI for SQLAlchemy
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")

    # Disable track modifications to avoid warning
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    '''Development configuration class
    '''
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://segun@localhost/development_db'

class TestingConfig(Config):
    '''Testing configuration class
    '''
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://segun@localhost/test_db'
    DEBUG = False

class ProductionConfig(Config):
    '''Production configuration class
    '''
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")

    # Mapping config names to their respective classes
config_map = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
}

# Set the active configuration based on an environment variable
active_env = os.getenv('FLASK_ENV', 'production')
config = config_map[active_env]
