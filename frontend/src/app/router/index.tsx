import { createBrowserRouter } from 'react-router-dom';
import CreateQuizPage from '@/features/quiz-management/pages/CreateQuizPage';
import QuizEditorPage from '@/features/quiz-management/pages/QuizEditorPage';
import QuizListPage from '@/features/quiz-management/pages/QuizListPage';
import { Toaster } from 'sonner';

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T03]
export const router = createBrowserRouter([
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
