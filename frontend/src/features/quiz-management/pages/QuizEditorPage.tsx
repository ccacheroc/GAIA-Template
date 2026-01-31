
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QuestionList } from '../components/QuestionList';
import { TFQuestionEditor } from '../components/TFQuestionEditor';
import { MCQuestionEditor } from '../components/MCQuestionEditor';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, Eye, Edit2, Trash2, Save, X } from 'lucide-react';
import { useQuiz, useUpdateQuiz, useDeleteQuiz } from '../api/quizQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { QuizPreview } from '../components/QuizPreview';
import { PublishButton } from '../components/PublishButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// [Feature: Quiz Management] [Story: QQ-BUG-001] [Ticket: QQ-BUG-001-FE-T01]
export default function QuizEditorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [mode, setMode] = useState<'list' | 'add_tf' | 'add_mc'>('list');
    const [isPreview, setIsPreview] = useState(false);
    const [isEditingMetadata, setIsEditingMetadata] = useState(false);

    const { data: quiz, isLoading } = useQuiz(id || '');
    const updateQuiz = useUpdateQuiz(id || '');
    const deleteQuiz = useDeleteQuiz();

    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        if (quiz) {
            setEditTitle(quiz.title);
            setEditDescription(quiz.description || '');
        }
    }, [quiz]);

    if (!id) return <div className="p-8 text-center text-destructive">ID de Cuestionario no válido</div>;

    if (isLoading) return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-64 w-full" />
        </div>
    );

    const isPublished = quiz?.status === 'PUBLISHED';

    const handleUpdateQuiz = () => {
        if (!editTitle.trim()) {
            toast.error('El título es obligatorio');
            return;
        }
        updateQuiz.mutate({
            title: editTitle,
            description: editDescription
        }, {
            onSuccess: () => {
                setIsEditingMetadata(false);
                toast.success('Cuestionario actualizado');
            },
            onError: () => toast.error('Error al actualizar el cuestionario')
        });
    };

    const handleDeleteQuiz = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cuestionario? Se eliminarán también todas sus preguntas.')) {
            deleteQuiz.mutate(id, {
                onSuccess: () => {
                    toast.success('Cuestionario eliminado');
                    navigate('/');
                },
                onError: () => toast.error('Error al eliminar el cuestionario')
            });
        }
    };

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

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border pb-6">
                    <div className="flex-1 space-y-4">
                        {isEditingMetadata ? (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Título del cuestionario"
                                    className="text-2xl font-bold h-12"
                                />
                                <Textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Descripción corta"
                                    className="resize-none"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleUpdateQuiz} size="sm" className="gap-2">
                                        <Save className="h-4 w-4" /> Guardar
                                    </Button>
                                    <Button onClick={() => setIsEditingMetadata(false)} variant="ghost" size="sm" className="gap-2">
                                        <X className="h-4 w-4" /> Cancelar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{quiz?.title || 'Sin Título'}</h1>
                                    {!isPublished && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                                            onClick={() => setIsEditingMetadata(true)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <p className="text-muted-foreground mt-1">{quiz?.description}</p>
                            </div>
                        )}
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
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                        onClick={handleDeleteQuiz}
                                        title="Eliminar cuestionario"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {mode === 'list' && (
                <div className="space-y-6">
                    {!isPublished && (
                        <div className="flex justify-start gap-2">
                            <Button onClick={() => setMode('add_tf')} size="sm" variant="outline" id="add-tf-btn" className="gap-2">
                                <Plus className="h-4 w-4" /> Verdadero/Falso
                            </Button>
                            <Button onClick={() => setMode('add_mc')} size="sm" variant="outline" id="add-mc-btn" className="gap-2">
                                <Plus className="h-4 w-4" /> Opción Múltiple
                            </Button>
                        </div>
                    )}
                    <QuestionList quizId={id} disabled={isPublished} />
                </div>
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
