#!/usr/bin/env python3
import unittest
from app.app import create_app, db
from app.Views.user_views import app
from flask import json


class TestRoutes(unittest.TestCase):
    def setUp(self):
        # config app to use the test database
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://segun@localhost/test_db'
        app.config['TESTING'] = True

        self.app = app.test_client()
        self.ctx = app.app_context()
        self.ctx.push()

        # Create the test database schema
        db.create_all()

    def tearDown(self):
        # Clean up the database and context after each test
        db.session.remove()
        db.drop_all()
        self.ctx.pop()

    def test_register(self):
        # Test the registration route
        data = {
            'first_name': 'John',
            'middle_name': 'Doe',
            'last_name': 'Smith',
            'grad_year': '2023',
            'username': 'johndoe',
            'password': 'password',
            'confirm_password': 'password'
        }

        response = self.app.post('/register', json=data)
        print(response.status_code)
        print(response.data)
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        # Test the login route
        pass

    def test_delete_user(self):
        # Test the delete user route
        pass

if __name__ == '__main__':
    unittest.main()
