from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

user = os.getenv("POSTGRES_USER", "postgres")
password = os.getenv("POSTGRES_PASSWORD", "password")
server = os.getenv("POSTGRES_SERVER", "localhost")
db_name = os.getenv("POSTGRES_DB", "gaia_db")
SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{server}/{db_name}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
