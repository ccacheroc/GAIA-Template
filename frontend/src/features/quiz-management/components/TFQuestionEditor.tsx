
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateQuestion } from '../api/questionQueries';
import { QuestionType } from '../types';
import { toast } from 'sonner';

// [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-FE-T03]

interface TFQuestionEditorProps {
    quizId: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const TFQuestionEditor: React.FC<TFQuestionEditorProps> = ({ quizId, onSuccess, onCancel }) => {
    const [content, setContent] = useState('');
    const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);

    const { mutate: createQuestion, isPending } = useCreateQuestion(quizId);

    const handleSave = () => {
        if (!content.trim()) {
            toast.error('Question content is required');
            return;
        }
        if (correctOptionIndex === null) {
            toast.error('Please select the correct answer');
            return;
        }

        createQuestion({
            type: QuestionType.TF,
            content,
            options: [
                { content: 'True', is_correct: correctOptionIndex === 0 },
                { content: 'False', is_correct: correctOptionIndex === 1 }
            ]
        }, {
            onSuccess: () => {
                toast.success('Question added successfully');
                setContent('');
                setCorrectOptionIndex(null);
                if (onSuccess) onSuccess();
            },
            onError: (error: any) => {
                toast.error(error.response?.data?.detail || 'Failed to add question');
            }
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Add True/False Question
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="question-content">Question Text</Label>
                    <Input
                        id="question-content"
                        placeholder="Type your question here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <Label>Select Correct Answer</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant={correctOptionIndex === 0 ? "default" : "outline"}
                            className="h-20 text-lg transition-all active:scale-95"
                            onClick={() => setCorrectOptionIndex(0)}
                        >
                            True
                        </Button>
                        <Button
                            type="button"
                            variant={correctOptionIndex === 1 ? "default" : "outline"}
                            className="h-20 text-lg transition-all active:scale-95"
                            onClick={() => setCorrectOptionIndex(1)}
                        >
                            False
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t pt-6">
                {onCancel && (
                    <Button variant="ghost" onClick={onCancel} disabled={isPending}>
                        Cancel
                    </Button>
                )}
                <Button onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Question'}
                </Button>
            </CardFooter>
        </Card>
    );
};
