import React, { useState } from 'react';
import type { Quiz } from '../types';
import { StudentQuestionCard } from './StudentQuestionCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface QuizPreviewProps {
    quiz: Quiz;
    onExit: () => void;
}

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T02]
export const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz, onExit }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleOptionSelect = (questionId: string, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleSubmit = () => {
        const answeredCount = Object.keys(answers).length;
        const totalCount = quiz.questions?.length || 0;

        if (answeredCount < totalCount) {
            toast.warning(`Has respondido ${answeredCount} de ${totalCount} preguntas.`);
        } else {
            toast.success("¡Cuestionario enviado! (Modo Vista Previa)");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 p-4">
            <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs uppercase tracking-wide font-bold">
                        Vista Previa (Alumno)
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Así es como los alumnos verán tu cuestionario.
                    </span>
                </div>
                <Button variant="outline" size="sm" onClick={onExit} className="border-primary/20 hover:bg-primary/5">
                    Salir de Vista Previa
                </Button>
            </div>

            <div className="space-y-4 text-center pb-6 border-b border-border">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{quiz.title}</h1>
                {quiz.description && (
                    <p className="text-muted-foreground text-lg">{quiz.description}</p>
                )}
            </div>

            <div className="space-y-6">
                {quiz.questions?.map((question) => (
                    <StudentQuestionCard
                        key={question.id}
                        question={question}
                        selectedOptionId={answers[question.id]}
                        onOptionSelect={(optId) => handleOptionSelect(question.id, optId)}
                    />
                ))}

                {(!quiz.questions || quiz.questions.length === 0) && (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg border-muted">
                        Este cuestionario no tiene preguntas todavía.
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-6">
                <Button size="lg" onClick={handleSubmit} className="px-10 font-bold transition-all hover:opacity-90 active:scale-95">
                    Enviar Cuestionario
                </Button>
            </div>
        </div>
    );
};
