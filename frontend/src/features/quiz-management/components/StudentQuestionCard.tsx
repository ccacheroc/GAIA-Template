import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Question } from '../types';

interface StudentQuestionCardProps {
    question: Question;
    selectedOptionId?: string;
    onOptionSelect: (optionId: string) => void;
}

export const StudentQuestionCard: React.FC<StudentQuestionCardProps> = ({
    question,
    selectedOptionId,
    onOptionSelect
}) => {
    return (
        <Card className="mb-4">
            <CardContent className="pt-6">
                <div className="flex gap-4">
                    <span className="font-medium text-muted-foreground w-6 flex-shrink-0">
                        {question.sequence}.
                    </span>
                    <div className="flex-1 space-y-4">
                        <div className="text-lg font-medium">{question.content}</div>

                        <RadioGroup
                            value={selectedOptionId}
                            onValueChange={onOptionSelect}
                            className="space-y-3"
                        >
                            {question.options.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2 border rounded p-3 hover:bg-slate-50 transition-colors">
                                    <RadioGroupItem value={option.id} id={option.id} />
                                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                        {option.content}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
