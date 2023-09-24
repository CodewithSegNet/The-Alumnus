#!/usr/bin/python3

# Import Dependencies
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from app.app import db
from datetime import datetime


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
    confirm_password = db.Column(db.String(15), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

