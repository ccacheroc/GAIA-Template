"""rename teacher_id to owner_id in quizzes

Revision ID: 5ad36454a6d5
Revises: 2a699db78633
Create Date: 2026-01-31 15:36:08.827774

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5ad36454a6d5'
down_revision: Union[str, Sequence[str], None] = '2a699db78633'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands safe for data preservation ###
    op.alter_column('quizzes', 'teacher_id', new_column_name='owner_id')
    
    # Update constraints/indexes naming to match new column
    # Drop old index/fk
    op.drop_constraint('quizzes_teacher_id_fkey', 'quizzes', type_='foreignkey')
    op.drop_index('ix_quizzes_teacher_id', table_name='quizzes')
    
    # Create new index/fk
    op.create_foreign_key(None, 'quizzes', 'users', ['owner_id'], ['id'])
    op.create_index(op.f('ix_quizzes_owner_id'), 'quizzes', ['owner_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands safe for data preservation ###
    op.alter_column('quizzes', 'owner_id', new_column_name='teacher_id')
    
    op.drop_constraint(None, 'quizzes', type_='foreignkey') # Dropping the one created in upgrade
    op.drop_index(op.f('ix_quizzes_owner_id'), table_name='quizzes')
    
    op.create_foreign_key('quizzes_teacher_id_fkey', 'quizzes', 'users', ['teacher_id'], ['id'])
    op.create_index('ix_quizzes_teacher_id', 'quizzes', ['teacher_id'], unique=False)
    # ### end Alembic commands ###
