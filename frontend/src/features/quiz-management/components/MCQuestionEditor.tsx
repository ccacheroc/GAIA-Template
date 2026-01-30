
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { questionSchema, type QuestionFormValues } from '../schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCreateQuestion } from '../api/questionQueries';
import { QuestionType } from '../types';
import { cn } from '@/lib/utils';

// [Feature: Quiz Management] [Story: QQ-TEACHER-003] [Ticket: QQ-TEACHER-003-FE-T03]

interface MCQuestionEditorProps {
    quizId: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const MCQuestionEditor: React.FC<MCQuestionEditorProps> = ({ quizId, onSuccess, onCancel }) => {
    const { mutate: createQuestion, isPending } = useCreateQuestion(quizId);

    const form = useForm<QuestionFormValues>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            content: '',
            options: [
                { content: '', is_correct: false },
                { content: '', is_correct: false },
                { content: '', is_correct: false },
                { content: '', is_correct: false },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options",
    });

    const handleSave = (values: QuestionFormValues) => {
        createQuestion({
            type: QuestionType.MULTIPLE_CHOICE,
            content: values.content,
            options: values.options,
        }, {
            onSuccess: () => {
                toast.success('Question added successfully');
                form.reset();
                if (onSuccess) onSuccess();
            },
            onError: (error: any) => {
                toast.error(error.response?.data?.detail || 'Failed to add question');
            }
        });
    };

    const handleSetCorrect = (index: number) => {
        const currentOptions = form.getValues('options');
        const updatedOptions = currentOptions.map((opt, i) => ({
            ...opt,
            is_correct: i === index
        }));
        form.setValue('options', updatedOptions);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader className="border-b bg-primary/5 pb-4">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center gap-2">
                    Multiple Choice Question
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...(form as any)}>
                    <form onSubmit={form.handleSubmit(handleSave as any)} className="space-y-8">
                        <FormField
                            control={form.control as any}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">Question Text</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Which planet is closest to the Sun?"
                                            className="h-12 text-lg focus-visible:ring-primary/50"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-semibold">Answers</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ content: '', is_correct: false })}
                                    disabled={fields.length >= 6}
                                    className="gap-1 text-xs h-8"
                                >
                                    <Plus className="h-3 w-3" /> Add Option
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="group flex items-start gap-2 relative">
                                        <div className="flex-1">
                                            <FormField
                                                control={form.control as any}
                                                name={`options.${index}.content`}
                                                render={({ field: inputField }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleSetCorrect(index)}
                                                                className={cn(
                                                                    "h-10 w-10 shrink-0 transition-all",
                                                                    form.watch(`options.${index}.is_correct`)
                                                                        ? "text-primary bg-primary/10"
                                                                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                                )}
                                                            >
                                                                <CheckCircle2 className={cn(
                                                                    "h-6 w-6",
                                                                    form.watch(`options.${index}.is_correct`) ? "fill-primary/20" : ""
                                                                )} />
                                                            </Button>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={`Option ${index + 1}`}
                                                                    className={cn(
                                                                        "transition-all",
                                                                        form.watch(`options.${index}.is_correct`) && "border-primary/50 bg-primary/5"
                                                                    )}
                                                                    {...inputField}
                                                                />
                                                            </FormControl>
                                                            {fields.length > 2 && (
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => remove(index)}
                                                                    className="h-10 w-10 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <FormMessage className="ml-12" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {form.formState.errors.options?.root && (
                                <p className="text-sm font-medium text-destructive mt-2">
                                    {form.formState.errors.options.root.message}
                                </p>
                            )}
                        </div>

                        <CardFooter className="flex justify-end gap-3 px-0 pt-6 border-t">
                            {onCancel && (
                                <Button variant="ghost" type="button" onClick={onCancel} disabled={isPending}>
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" disabled={isPending} className="px-8 transition-transform active:scale-95">
                                {isPending ? 'Saving...' : 'Save Question'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
