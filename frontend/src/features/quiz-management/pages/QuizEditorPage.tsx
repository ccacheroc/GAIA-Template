
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { QuestionList } from '../components/QuestionList';
import { TFQuestionEditor } from '../components/TFQuestionEditor';
import { MCQuestionEditor } from '../components/MCQuestionEditor';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useQuiz } from '../api/quizQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuizEditorPage() {
    const { id } = useParams<{ id: string }>();
    const [mode, setMode] = useState<'list' | 'add_tf' | 'add_mc'>('list');
    const { data: quiz, isLoading } = useQuiz(id || '');

    if (!id) return <div>Invalid Quiz ID</div>;

    if (isLoading) return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-64 w-full" />
        </div>
    );

    return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-4">
                <Link to="/quizzes/create" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Quizzes
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{quiz?.title || 'Untitled Quiz'}</h1>
                        <p className="text-muted-foreground mt-1">{quiz?.description}</p>
                    </div>

                    {mode === 'list' && (
                        <div className="flex gap-2">
                            <Button onClick={() => setMode('add_tf')} size="sm" variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> True/False
                            </Button>
                            <Button onClick={() => setMode('add_mc')} size="sm" variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Multiple Choice
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {mode === 'list' && (
                <QuestionList quizId={id} />
            )}

            {mode === 'add_tf' && (
                <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <TFQuestionEditor
                        quizId={id}
                        onSuccess={() => setMode('list')}
                        onCancel={() => setMode('list')}
                    />
                </div>
            )}

            {mode === 'add_mc' && (
                <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <MCQuestionEditor
                        quizId={id}
                        onSuccess={() => setMode('list')}
                        onCancel={() => setMode('list')}
                    />
                </div>
            )}
        </div>
    );
}
