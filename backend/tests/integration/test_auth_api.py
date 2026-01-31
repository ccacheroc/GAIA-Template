import pytest
from httpx import AsyncClient
import uuid

def random_email():
    return f"teacher_{uuid.uuid4()}@gaia.edu"

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

@pytest.mark.asyncio
async def test_teacher_registration_success(client: AsyncClient):
    # Given
    email = random_email()
    payload = {
        "email": email,
        "password": "securepassword123",
        "full_name": "New Teacher"
    }

    # When
    response = await client.post("/api/v1/auth/register", json=payload)

    # Then
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == payload["email"]
    assert data["full_name"] == payload["full_name"]
    assert "id" in data
    assert "created_at" in data
    assert "password" not in data
    assert "password_hash" not in data

@pytest.mark.asyncio
async def test_teacher_registration_duplicate_email(client: AsyncClient):
    # Given
    email = random_email()
    payload = {
        "email": email,
        "password": "securepassword123",
        "full_name": "First User"
    }
    # Register once
    await client.post("/api/v1/auth/register", json=payload)

    # When - Register again with same email
    response = await client.post("/api/v1/auth/register", json=payload)

    # Then
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

# [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-BE-T01]
@pytest.mark.asyncio
async def test_teacher_login_success(client: AsyncClient):
    # Given a registered user
    email = random_email()
    password = "correctpassword"
    await client.post("/api/v1/auth/register", json={
        "email": email,
        "password": password,
        "full_name": "Login User"
    })

    # When logging in
    response = await client.post("/api/v1/auth/login", json={
        "email": email,
        "password": password
    })

    # Then
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_teacher_login_invalid_credentials(client: AsyncClient):
    # Given a registered user
    email = random_email()
    password = "correctpassword"
    await client.post("/api/v1/auth/register", json={
        "email": email,
        "password": password,
        "full_name": "Login User"
    })

    # When logging in with wrong password
    response = await client.post("/api/v1/auth/login", json={
        "email": email,
        "password": "wrongpassword"
    })

    # Then
    assert response.status_code == 401
    assert response.json()["detail"] == "Correo o contraseña incorrectos"
