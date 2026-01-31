from uuid import uuid4
from app.infrastructure.models.quiz import Question
from app.domain.services.sequence_auditor import SequenceAuditor

def test_audit_valid_sequence():
    q1 = Question(id=uuid4(), sequence=1)
    q2 = Question(id=uuid4(), sequence=2)
    assert SequenceAuditor.audit([q1, q2]) == True

def test_audit_invalid_sequence_gap():
    q1 = Question(id=uuid4(), sequence=1)
    q2 = Question(id=uuid4(), sequence=3)
    assert SequenceAuditor.audit([q1, q2]) == False

def test_audit_invalid_sequence_duplicate():
    q1 = Question(id=uuid4(), sequence=1)
    q2 = Question(id=uuid4(), sequence=1)
    # The auditor should detect duplicates or gaps.
    # Duplicates are also invalid 1..N
    assert SequenceAuditor.audit([q1, q2]) == False

def test_audit_invalid_sequence_start():
    q1 = Question(id=uuid4(), sequence=0)
    assert SequenceAuditor.audit([q1]) == False

def test_repair_sequence():
    q1 = Question(id=uuid4(), sequence=1)
    q3 = Question(id=uuid4(), sequence=3)
    q5 = Question(id=uuid4(), sequence=5)
    
    # Input list might be unsorted, repair should respect current sequence order
    input_questions = [q3, q1, q5] 
    
    repaired = SequenceAuditor.repair(input_questions)
    
    assert len(repaired) == 3
    # Q1 (seq 1) -> 1
    # Q3 (seq 3) -> 2
    # Q5 (seq 5) -> 3
    
    # We expect repair to return logically sorted list with new sequences?
    # Or modify in place?
    # Let's assume it returns a list of questions with updated sequences.
    
    assert repaired[0].id == q1.id
    assert repaired[0].sequence == 1
    
    assert repaired[1].id == q3.id
    assert repaired[1].sequence == 2
    
    assert repaired[2].id == q5.id
    assert repaired[2].sequence == 3
