from typing import List
from app.infrastructure.models.quiz import Question

class SequenceAuditor:
    @staticmethod
    def audit(questions: List[Question]) -> bool:
        """
        Checks if the sequence of questions is continuous starting from 1 with no gaps or duplicates.
        Returns True if valid, False otherwise.
        """
        if not questions:
            return True
            
        # Sort by sequence, then by ID for determinism
        sorted_questions = sorted(questions, key=lambda q: (q.sequence, str(q.id)))
        
        expected_sequence = 1
        for q in sorted_questions:
            if q.sequence != expected_sequence:
                return False
            expected_sequence += 1
            
        return True

    @staticmethod
    def repair(questions: List[Question]) -> List[Question]:
        """
        Repairs the sequence of questions ensuring 1..N order.
        Preserves relative order of existing sequences.
        In case of duplicates, uses ID for deterministic ordering.
        Returns the list of questions with updated sequences.
        """
        if not questions:
            return []
            
        # Sort by sequence, then by ID for determinism
        sorted_questions = sorted(questions, key=lambda q: (q.sequence, str(q.id)))
        
        repaired = []
        for i, q in enumerate(sorted_questions, start=1):
            if q.sequence != i:
                q.sequence = i
            repaired.append(q)
            
        return repaired
