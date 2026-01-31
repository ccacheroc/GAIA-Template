import { createBrowserRouter, Link } from 'react-router-dom';
import CreateQuizPage from '@/features/quiz-management/pages/CreateQuizPage';
import QuizEditorPage from '@/features/quiz-management/pages/QuizEditorPage';
import QuizListPage from '@/features/quiz-management/pages/QuizListPage';
import { Toaster } from 'sonner';
import RegisterPage from '@/features/auth/pages/RegisterPage';

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T03]
export const router = createBrowserRouter([
    {
        path: '/register',
        element: (
            <>
                <RegisterPage />
                <Toaster position="top-right" richColors />
            </>
        ),
    },
    {
        path: '/login',
        element: (
            <div className="flex items-center justify-center min-h-screen">
                <p>Página de Login (Work in progress)</p>
                <Link to="/register" className="ml-2 text-blue-500">Volver a Registro</Link>
                <Toaster position="top-right" richColors />
            </div>
        ),
    },
    {
        path: '/',
        element: (
            <>
                <QuizListPage />
                <Toaster position="top-right" richColors />
            </>
        ),
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
