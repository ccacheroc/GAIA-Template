import asyncio
import os
import argparse
import sys
from sqlalchemy import select
from sqlalchemy.orm import selectinload

# Add parent directory to path to allow imports from app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import AsyncSessionLocal, DATABASE_URL
from app.infrastructure.models.quiz import Quiz, Question
from app.domain.services.sequence_auditor import SequenceAuditor

async def audit_quizzes_logic(session, fix: bool = False):
    result = await session.execute(
        select(Quiz).options(selectinload(Quiz.questions))
    )
    quizzes = result.scalars().all()
    
    issues_found = 0
    fixed_count = 0
    
    print(f"Auditing {len(quizzes)} quizzes...")
    
    for quiz in quizzes:
        is_valid = SequenceAuditor.audit(quiz.questions)
        
        if not is_valid:
            issues_found += 1
            print(f"[FAIL] Quiz ID: {quiz.id} | Title: {quiz.title}")
            
            if fix:
                print(f"       -> Repairing...")
                SequenceAuditor.repair(quiz.questions)
                fixed_count += 1
        else:
            # print(f"[OK] Quiz ID: {quiz.id}")
            pass
            
    if fix and fixed_count > 0:
        await session.commit()
        print(f"Repaired {fixed_count} quizzes.")
    elif issues_found > 0:
        print(f"Found {issues_found} quizzes with sequence issues. Run with --fix to repair.")
    else:
        print("All quizzes are valid.")
        
    return issues_found, fixed_count

async def main():
    parser = argparse.ArgumentParser(description="Audit and repair question sequences.")
    parser.add_argument("--fix", action="store_true", help="Repair invalid sequences")
    args = parser.parse_args()
    
    print(f"Connecting to database: {DATABASE_URL}")
    async with AsyncSessionLocal() as session:
        await audit_quizzes_logic(session, args.fix)

if __name__ == "__main__":
    asyncio.run(main())
