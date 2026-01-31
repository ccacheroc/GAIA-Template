import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { QuizHeaderForm } from '../components/QuizHeaderForm';
import { useCreateQuiz } from '../api/quizQueries';

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T02]
export default function CreateQuizPage() {
    const navigate = useNavigate();
    const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

    const handleSubmit = async (values: { title: string; description?: string }) => {
        const quiz = await createQuiz(values);
        // Navigate to the next step (question editor)
        navigate(`/quizzes/${quiz.id}/edit`);
    };

    return (
        <div className="container py-12 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Volver a Mis Cuestionarios
                </Link>
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
                        Diseña tu Cuestionario
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Define el título y la descripción para empezar.
                    </p>
                </div>

                <QuizHeaderForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
}
