from sqlalchemy import create_engine

db_url = 'mysql+pymysql://segun@localhost/test_db'

try:
    engine = create_engine(db_url)
    connection = engine.connect()
    print("Database connection successful.")
    connection.close()
except Exception as e:
    print(f"Database connection error: {str(e)}")
