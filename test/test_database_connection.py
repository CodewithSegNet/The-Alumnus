import unittest
from sqlalchemy import create_engine

class TestDatabaseConnection(unittest.TestCase):
    def test_database_connection(self):
        # database URL
        db_url = 'mysql+pymysql://segun@localhost/test_db'

        # Attempt to connect to the database
        try:
            engine = create_engine(db_url)
            connection = engine.connect()
            connection.close()
            # Database connection successful
            self.assertTrue(True)
        except Exception as e:
            self.fail(f"Failed to connect to the database: {str(e)}")

if __name__ == '__main__':
    unittest.main()
