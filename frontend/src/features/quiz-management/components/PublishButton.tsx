import React from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePublishQuiz } from '../api/quizQueries';
import { toast } from 'sonner';

interface PublishButtonProps {
    quizId: string;
    hasQuestions: boolean;
    isPending?: boolean;
}

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T02]
export const PublishButton: React.FC<PublishButtonProps> = ({
    quizId,
    hasQuestions,
    isPending: isMutationPending
}) => {
    const publishMutation = usePublishQuiz(quizId);

    const handlePublish = () => {
        publishMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success('¡Cuestionario publicado correctamente!');
            },
            onError: (err: any) => {
                const message = err.response?.data?.detail || 'Error al publicar el cuestionario';
                toast.error(message);
            }
        });
    };

    const isPending = isMutationPending || publishMutation.isPending;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isPending || !hasQuestions}
                    variant={isPending ? "ghost" : "default"}
                    className="font-bold tracking-wide"
                >
                    {isPending ? 'Publicando...' : 'Publicar Cuestionario'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-primary/20 bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">¿Confirmas la publicación?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Una vez publicado, este cuestionario estará disponible para los alumnos.
                        No podrás editar las preguntas ni su orden mientras esté activo.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-primary/20">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePublish} className="bg-primary text-primary-foreground hover:opacity-90">
                        Publicar Ahora
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
