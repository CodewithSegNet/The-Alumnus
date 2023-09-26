#!/usr/bin/python3

# Import Dependencies
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from app.app import db
from datetime import datetime
from sqlalchemy import UniqueConstraint
import re


# Define the Model
class UserProfile(db.Model):
    ''' A class that defines the userProfile
    '''
    __tablename__ = 'users_profile'


    alumni_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    grad_year = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    confirm_password = db.Column(db.String(15), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # A validation check for email format using a Python library like 'validate_email'.
    def validate_email(self, email):
        ''' define a regular expression for a simple email format check
        '''
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            raise ValueError("Invalid email format")
