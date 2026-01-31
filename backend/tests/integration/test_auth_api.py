import pytest
from httpx import AsyncClient

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

@pytest.mark.asyncio
async def test_teacher_registration_success(client: AsyncClient):
    # Given
    payload = {
        "email": "new.teacher@gaia.edu",
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
    payload = {
        "email": "duplicate@gaia.edu",
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
