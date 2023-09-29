#!/usr/bin/python3

# Import Dependencies
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from app.app import db
from datetime import datetime
from sqlalchemy import UniqueConstraint
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import re


# Define the Model

# UserInfo Model
class UsersInfo(db.Model):
    ''' A class that defines the Users Description
    '''
    __tablename__ = 'users_info'

    # Column for user description
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)


class UserProfile(db.Model):
    ''' A class that defines the userProfile
    '''
    __tablename__ = 'users_profile'


    alumni_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    grad_year = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(15), nullable=False, unique=True)
    password = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    confirm_password = db.Column(db.String(15), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    
    # Add new column for user Description
    userDescript = db.Column(db.String(300), nullable=True)

    # foreign key relationship
    user_id = db.Column(db.Integer, db.ForeignKey('users_info.user_id'), nullable=False, autoincrement=True)

    # Relationship to access user profile description
    user_description = relationship('UsersInfo', backref='profile', uselist=False)

    # Create a new Usersinfo recod when a UserProfile is created
    def __init__(self, **kwargs):
        self.user_info = UsersInfo()
        super(UserProfile, self).__init__(**kwargs)

    # A validation check for email format using a Python library like 'validate_email'.
    def validate_email(self, email):
        ''' define a regular expression for a simple email format check
        '''
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            raise ValueError("Invalid email format")
