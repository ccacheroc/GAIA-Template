import { createBrowserRouter, Navigate } from 'react-router-dom';
import CreateQuizPage from '@/features/quiz-management/pages/CreateQuizPage';
import { Toaster } from '@/components/ui/sonner';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/quizzes/create" replace />,
    },
    {
        path: '/quizzes/create',
        element: (
            <>
                <CreateQuizPage />
                <Toaster position="top-right" richColors />
            </>
        ),
    },
    {
        path: '/quizzes/:id/edit',
        element: (
            <div className="container py-12 text-center">
                <h1 className="text-3xl font-bold">Editor de Quiz (Próximamente)</h1>
                <p className="text-muted-foreground mt-4">Aquí podrás añadir preguntas a tu quiz.</p>
                <Toaster position="top-right" richColors />
            </div>
        ),
    },
]);
