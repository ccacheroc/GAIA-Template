import { createBrowserRouter, Navigate } from 'react-router-dom';
import CreateQuizPage from '@/features/quiz-management/pages/CreateQuizPage';
import QuizEditorPage from '@/features/quiz-management/pages/QuizEditorPage';
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
            <>
                <QuizEditorPage />
                <Toaster position="top-right" richColors />
            </>
        ),
    },
]);
