
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { QuestionList } from '../components/QuestionList';
import { TFQuestionEditor } from '../components/TFQuestionEditor';
import { MCQuestionEditor } from '../components/MCQuestionEditor';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, Eye } from 'lucide-react';
import { useQuiz } from '../api/quizQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { QuizPreview } from '../components/QuizPreview';
import { PublishButton } from '../components/PublishButton';

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T02]
export default function QuizEditorPage() {
    const { id } = useParams<{ id: string }>();
    const [mode, setMode] = useState<'list' | 'add_tf' | 'add_mc'>('list');
    const [isPreview, setIsPreview] = useState(false);
    const { data: quiz, isLoading } = useQuiz(id || '');

    if (!id) return <div className="p-8 text-center text-destructive">ID de Cuestionario no válido</div>;

    if (isLoading) return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-64 w-full" />
        </div>
    );

    const isPublished = quiz?.status === 'PUBLISHED';

    if (isPreview && quiz) {
        return (
            <div className="container py-8 animate-in fade-in zoom-in-95 duration-300">
                <QuizPreview quiz={quiz} onExit={() => setIsPreview(false)} />
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-4">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Volver a Mis Cuestionarios
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{quiz?.title || 'Sin Título'}</h1>
                        <p className="text-muted-foreground mt-1">{quiz?.description}</p>
                    </div>

                    {mode === 'list' && (
                        <div className="flex flex-col sm:flex-row gap-2">
                            {isPublished ? (
                                <div className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium border border-secondary/20">
                                    Publicado
                                </div>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsPreview(true)}
                                        disabled={!quiz?.questions || quiz.questions.length === 0}
                                        className="gap-2"
                                    >
                                        <Eye className="h-4 w-4" /> Vista Previa
                                    </Button>
                                    <PublishButton
                                        quizId={id}
                                        hasQuestions={!!quiz?.questions && quiz.questions.length > 0}
                                    />
                                </>
                            )}

                            {!isPublished && (
                                <>
                                    <div className="w-px h-6 bg-border hidden sm:block mx-1"></div>
                                    <Button onClick={() => setMode('add_tf')} size="sm" variant="outline" id="add-tf-btn" className="gap-2">
                                        <Plus className="h-4 w-4" /> Verdadero/Falso
                                    </Button>
                                    <Button onClick={() => setMode('add_mc')} size="sm" variant="outline" id="add-mc-btn" className="gap-2">
                                        <Plus className="h-4 w-4" /> Opción Múltiple
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {mode === 'list' && (
                <QuestionList quizId={id} disabled={isPublished} />
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
