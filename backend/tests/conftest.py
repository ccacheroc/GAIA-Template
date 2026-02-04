import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.infrastructure.db.session import get_db

# Use a mock or separate DB for integration tests if needed
# For now, we'll keep it simple for unit-like tests of the API

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def db_session():
    # This could be an in-memory SQLite for faster tests
    # or a mock session
    from unittest.mock import MagicMock
    return MagicMock()
