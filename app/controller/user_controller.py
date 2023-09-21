#!/usr/bin/python3

# Import Modules
from flask import Blueprint, request, jsonify, session, redirect, url_for
from app.app import create_app, db
from functools import wraps
from sqlalchemy.exc import SQLAlchemyError
from app.model.user_model import UserProfile
from sqlalchemy import or_

user_bp = Blueprint('user', __name__)
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
            confirm_password=data['confirm_password']
        )

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
        return jsonify({"message": "Login failed. Invalid username or password"})


def login_required(f):
    @wraps(f)
    def decorated_function():
        if not session.get('logged_in'):
            return redirect(url_for('login'))
        return f()

    return decorated_function

# Route for deleting user data by username
@user_bp.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
    try:
        user = UserProfile.query.filter_by(username=username).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User Deleted succussfully!"}), 200
        else:
            return jsonify({"message": "User Not Found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@user_bp.route('/users/<int:grad_year>', methods=['GET'])
@login_required
def get_user_by_class(grad_year):
    try:
        users =  UserProfile.query.filter(grad_year=grad_year).all()
        
        if users:
            data = [{'username': user.username, 'grad_year': user.grad_year} for user in users]
            return jsonify({'users': data}), 200
        else:
            return jsonify({'message': 'No alumni found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@user_bp.route('/users/<string:name>/', methods=['GET'])
@login_required
def get_user_by_name(name):
    try:
        users = UserProfile.query.filter(
                or_(
                    UserProfile.first_name == name,
                    UserProfile.last_name == name,
                    UserProfile.middle_name == name
                )
            ).all()

        user_data = []
        for user in users:
            user_data.append({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'middle_name': user.middle_name
            })

        if users:
            user_data = [{'first_name': user.first_name, 'middle_name': user.middle_name, 'last_name': user.last_name} for user in users]
            return jsonify(user_data), 200
        else:
            return jsonify({"message": 'Alumni Not Found'}), 404


    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
