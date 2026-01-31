
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { useQuiz } from '../api/quizQueries';
import { useReorderQuestions } from '../api/questionQueries';
import type { QuestionResponse } from '../types';
import { Card, CardContent } from '@/components/ui/card';

// Inline simple placeholderBadge since we don't have the badge component yet
function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}>
            {children}
        </span>
    );
}

interface SortableQuestionItemProps {
    question: QuestionResponse;
    disabled?: boolean;
}

export function SortableQuestionItem({ question, disabled }: SortableQuestionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: question.id,
        disabled: disabled
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1, // Elevate dragged item
        opacity: isDragging ? 0.8 : 1, // Slightly transparent when dragging
    };

    return (
        <div ref={setNodeRef} style={style} className={`mb-4 ${!disabled ? 'touch-none' : ''}`}>
            <Card className={isDragging ? 'shadow-xl ring-2 ring-primary/20' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                    {/* Handle - only show if not disabled */}
                    {!disabled && (
                        <div
                            {...attributes}
                            {...listeners}
                            className="cursor-move p-2 hover:bg-muted/50 rounded-md transition-colors"
                            aria-label="Drag handle"
                        >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-muted text-muted-foreground hover:bg-muted font-mono text-[10px] uppercase tracking-wider">
                                {question.type.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">#{question.sequence}</span>
                        </div>
                        <p className="text-sm font-medium line-clamp-2">{question.content}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface QuestionListProps {
    quizId: string;
    disabled?: boolean;
}

export function QuestionList({ quizId, disabled }: QuestionListProps) {
    const { data: quiz, isLoading } = useQuiz(quizId);
    const { mutate: reorderQuestions } = useReorderQuestions(quizId);

    // Local state for optimistic updates handling in DND context
    const [items, setItems] = useState<QuestionResponse[]>([]);

    // Sync local state when quiz data loads or changes
    useEffect(() => {
        if (quiz?.questions) {
            // Ensure questions are sorted by sequence initially
            const sortedQuestions = [...quiz.questions].sort((a, b) => a.sequence - b.sequence);
            setItems(sortedQuestions);
        }
    }, [quiz?.questions]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        if (disabled) return;
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    const newItems = arrayMove(items, oldIndex, newIndex);

                    // Create payload with updated sequences based on new array order
                    const reorderPayload = newItems.map((item, index) => ({
                        id: item.id,
                        sequence: index + 1 // 1-based index
                    }));

                    // Call mutation
                    reorderQuestions({ items: reorderPayload });

                    return newItems;
                }
                return items;
            });
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 w-full bg-muted/20 animate-pulse rounded-lg" />
                ))}
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/5">
                <p className="text-muted-foreground text-sm">
                    No questions yet. Use the "Add Question" button to get started!
                </p>
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(q => q.id)}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {items.map((question) => (
                        <SortableQuestionItem
                            key={question.id}
                            question={question}
                            disabled={disabled}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
