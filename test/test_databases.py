#!/usr/bin/env python3

import unittest
from app.config import DevelopmentConfig, TestingConfig, ProductionConfig


class TestDatabaseConfigurations(unittest.TestCase):

    def test_DevelopmentConfig(self):
        config = DevelopmentConfig
        self.assertTrue(config.DEBUG)
        self.assertEqual(config.SQLALCHEMY_DATABASE_URI, 'mysql://segun@localhost/development_db')
        self.assertFalse(config.SQLALCHEMY_TRACK_MODIFICATIONS)

    def test_TestingConfig(self):
        config = TestingConfig
        self.assertFalse(config.DEBUG)
        self.assertEqual(config.SQLALCHEMY_DATABASE_URI, 'mysql://segun@localhost/test_db')
        self.assertFalse(config.SQLALCHEMY_TRACK_MODIFICATIONS)

    def test_ProductionConfig(self):
        config = ProductionConfig
        self.assertFalse(config.DEBUG)
        self.assertEqual(config.SQLALCHEMY_DATABASE_URI, 'mysql://segun@localhost/production_db')
        self.assertFalse(config.SQLALCHEMY_TRACK_MODIFICATIONS)

if __name__ == '__main__':
    unittest.main()
