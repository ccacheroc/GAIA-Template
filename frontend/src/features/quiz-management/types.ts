export const QuizStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED'
} as const;

export type QuizStatus = typeof QuizStatus[keyof typeof QuizStatus];

export interface Quiz {
    id: string;
    teacher_id: string;
    title: string;
    description?: string;
    status: QuizStatus;
    created_at: string;
    updated_at: string;
    questions?: Question[];
}

export interface CreateQuizDTO {
    title: string;
    description?: string;
}

export interface UpdateQuizDTO {
    title?: string;
    description?: string;
}

export const QuestionType = {
    TF: 'TF',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
} as const;

export type QuestionType = typeof QuestionType[keyof typeof QuestionType];

export interface Option {
    id: string;
    content: string;
    is_correct: boolean;
}

export interface Question {
    id: string;
    quiz_id: string;
    type: QuestionType;
    content: string;
    sequence: number;
    options: Option[];
}

export interface OptionCreate {
    content: string;
    is_correct: boolean;
}

export interface QuestionCreate {
    type: QuestionType;
    content: string;
    options: OptionCreate[];
}

export interface QuestionResponse extends Question { }

export interface QuestionReorderItem {
    id: string;
    sequence: number;
}

export interface QuestionReorderRequest {
    items: QuestionReorderItem[];
}
