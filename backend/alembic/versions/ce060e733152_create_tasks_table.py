"""create_tasks_table

Revision ID: ce060e733152
Revises: 
Create Date: 2026-02-04 09:20:07.096118

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ce060e733152'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-DB-T01]
    op.create_table(
        'tasks',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('status', sa.Enum('pendiente', 'en_progreso', 'completada', name='taskstatus'), nullable=False, server_default='pendiente'),
        sa.Column('priority', sa.Enum('baja', 'media', 'alta', name='taskpriority'), nullable=False, server_default='media'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('tasks')
    op.execute('DROP TYPE taskstatus')
    op.execute('DROP TYPE taskpriority')
