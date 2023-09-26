#!/usr/bin/python3

# Import Modules
from flask import Blueprint, request, jsonify, session, redirect, url_for
from app.app import create_app, db
from functools import wraps
from sqlalchemy.exc import SQLAlchemyError
from app.model.user_model import UserProfile
from sqlalchemy import or_
import datetime


# create a Blueprint for user-related routes
user_bp = Blueprint('user', __name__)

# Create a Flask application
app = create_app()

# Route for registrating a new user
@user_bp.route('/register', methods=['POST'])
def register():
    ''' A route that handles user registration
    '''
    try:
        data = request.json
        # Extract registration data from JSON
        new_user = UserProfile(
            first_name=data['first_name'],
            middle_name=data['middle_name'],
            last_name=data['last_name'],
            grad_year=data['grad_year'],
            username=data['username'],
            password=data['password'],
            confirm_password=data['confirm_password'],
            email=data['email'],
            created_date=datetime.datetime.utcnow(),
            updated_date=datetime.datetime.utcnow()
        )

        # validate the email address
        try:
            new_user.validate_email(data['email'])
        except ValueError as e:
            return jsonify({'error': str(e)}), 400


        # Check if the username is already taken
        if UserProfile.query.filter_by(username=new_user.username).first():
            suggested_username = suggest_username(new_user.username)
            return jsonify({"message": "Username already taken, Try {} instead".format(suggested_username)}), 404
    

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registration successful!"}), 201
        return redirect(url_for('login'))


    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



# Route for user login
@user_bp.route('/login', methods=['POST'])
def login():
    ''' A route that handles the user login
    '''
    data = request.json
    username = data['username']
    password = data['password']

    # find the user in the database
    user = UserProfile.query.filter_by(username=username, password=password).first()

    if user:
        # Use the alumni_id as the unique identifier
        alumni_id = user.alumni_id

        # Store login status in the session
        session['logged_in'] = True
        session['username'] = user.username
        session['alumni_id'] = user.alumni_id
        success_message = 'Login Successful, {}'.format(user.username)
        session['success_message'] = success_message


        return jsonify({"message": success_message, "alumni_id": alumni_id}), 200
    else:
        return jsonify({"message": "Login failed. Invalid username or password"}), 400


def login_required(f):
    @wraps(f)
    def decorated_function():
        if not session.get('logged_in'):
            return redirect(url_for('login'))
        return f()

    return decorated_function

# Route for deleting user by Alumni_ID
@user_bp.route('/users/delete/<int:alumni_id>', methods=['DELETE'])
def delete_user_by_id(alumni_id):
    ''' Route that handles deleting of users
        by ID
    '''
    try:
        user = UserProfile.query.get(alumni_id)

        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User Deleted successfully!"}), 200
        else:
            return jsonify({"message": "User Not Found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Route for getting user by Alumni_ID
@user_bp.route('/users/<int:alumni_id>', methods=['GET'])
def user_by_id(alumni_id):
    ''' Route that handles getting users by 
        alumni_id
    '''
    try:
        user = UserProfile.query.get(alumni_id)

        if user:
            user_data = {
                    'alumni_id': user.alumni_id,
                    'first_name': user.first_name,
                    'middle_name': user.middle_name,
                    'last_name': user.last_name,
                    'grad_year': user.grad_year,
                    'username': user.username
                    }
            
            return jsonify({'user': user_data}), 200
        else:
            return jsonify({'message': 'User Not Found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@user_bp.route('/users/search', methods=['GET'])
@login_required
def get_users():
    try:
        name = request.args.get('name')
        grad_year = request.args.get('grad_year')

        query = UserProfile.query

        if grad_year is not None:
            query = query.filter(grad_year=grad_year).all()
        if name is not None:
            query = query.filter(or_(
                UserProfile.first_name.ilike('%{}%'.format(name)),
                UserProfile.middle_name.ilike('%{}%'.format(name)),
                UserProfile.last_name.ilike('%{}%'.format(name))
                )
            )

        users = query.all()

        if users:
            user_data = []
            for user in users:
                full_name = "{} {} {}".format(user.first_name, user.middle_name, user.last_name)
                user_data.append({
                    'full_name': full_name,
                    'username': user.username,
                    'grad_year': user.grad_year
                    })
            return jsonify({'users': user_data}), 200
        else:
            return jsonify({'message': 'No Alumni Found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Route that handles password reset by username
@user_bp.route('/resetpwd/<string:username>', methods=['GET'])
def reset_password(username):
    ''' a route for reseting users password
    '''
    try:
        new_password = request.args.get('new_password')

        # Find the user with the provided username
        user = UserProfile.query.filter_by(username=username).first()

        if user:
            # Update the user's password with new password
            user.password = new_password
            db.session.commit()

            return jsonify({"message": "Password Reset Successful"}), 200
        else:
            return jsonify({"message": "Invalid username"}), 400
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# function to suggest a unique username
def suggest_username(username):
    counter = 1
    suggested_username = username
        
    while UserProfile.query.filter_by(username=suggested_username).first():
        suggested_username = "{}{}".format(username, counter)
        counter += 1
    return suggested_username



if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
