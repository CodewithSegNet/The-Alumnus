#!/usr/bin/env python3
import unittest
from app.app import create_app

class DatabaseTestCase(unittest.TestCase):

    def setUp(self):
        # Create the app instance using create_app()
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_database_connection(self):
        pass

if __name__ == '__main__':
    unittest.main()
