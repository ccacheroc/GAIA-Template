import { useNavigate } from 'react-router-dom';
import { QuizHeaderForm } from '../components/QuizHeaderForm';
import { useCreateQuiz } from '../api/quizQueries';

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
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Diseña tu Experiencia
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Empieza por definir el título y la descripción de tu quiz.
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
