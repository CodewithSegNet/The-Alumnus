#!/usr/bin/python3

# Import Modules
from flask import request, jsonify, g
from app.app import create_app, db
from sqlalchemy.exc import SQLAlchemyError
from app.Models.user_model import UserProfile

# create the app instance
app = create_app()

# Route for registrating a new user
@app.route('/register', methods=['POST'])
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

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registration successful!"}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Route for user login
@app.route('/login', methods=['POST'])
def login():
    ''' A route that handles the user login
    '''
    data = request.json
    username = data['username']
    password = data['password']

    # find the user in the database
    user = UserProfile.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"message": "Login Successful!"}), 200
    else:
        return jsonify({"message": "Login failed. Invalid username or password"})


# Route for deleting user data by username
@app.route('/users/<username>', methods=['DELETE'])
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

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
