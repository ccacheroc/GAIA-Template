from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Text, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum

Base = declarative_base()

class TaskStatus(str, enum.Enum):
    PENDIENTE = "pendiente"
    EN_PROGRESO = "en_progreso"
    COMPLETADA = "completada"

class TaskPriority(str, enum.Enum):
    BAJA = "baja"
    MEDIA = "media"
    ALTA = "alta"

class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.PENDIENTE)
    priority = Column(Enum(TaskPriority), nullable=False, default=TaskPriority.MEDIA)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime, nullable=True)

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-DB-T01]
