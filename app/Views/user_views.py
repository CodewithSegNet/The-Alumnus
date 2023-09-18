#!/usr/bin/python3

# Import Modules
from flask import request, jsonify, session, redirect, url_for
from app.app import create_app, db
from sqlalchemy.exc import SQLAlchemyError
from app.Models.user_model import UserProfile
from sqlalchemy import or_

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
        return redirect(url_for('login'))
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
        # Store login status in the session
        session['logged_in'] = True
        session['username'] = user.username
        return jsonify({"message": "Login Successful!"}), 200
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


@app.route('/users/<int:grad_year>', methods=['GET'])
@login_required
def get_user_by_class():
    try:
        users =  UserProfile.query.filter(grad_year=grad_year).all()
        
        if users:
            data = [{'username': user.username, 'grad_year': user.grad_year} for user in users]
            return jsonify({'users': data}), 200
        else:
            return jsonify({'message': 'No alumni found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/users/<string:name>', methods=['GET'])
@login_required
def get_user_by_name():
    try:
        users = UserProfile.query.filter(
                or_(
                    first_name == name,
                    last_name == name,
                    middle_name == name
                )
            ).all()

        user_data = []
        for user in users:
            user_data.append({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'middle_name': user.middle_name
            })

        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
