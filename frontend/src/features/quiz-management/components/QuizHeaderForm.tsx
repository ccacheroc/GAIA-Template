import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { quizSchema, type QuizFormValues } from '../schema';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizHeaderFormProps {
    initialData?: QuizFormValues;
    onSubmit: (data: QuizFormValues) => Promise<void>;
    isLoading?: boolean;
}

export function QuizHeaderForm({ initialData, onSubmit, isLoading }: QuizHeaderFormProps) {
    const form = useForm<QuizFormValues>({
        resolver: zodResolver(quizSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
        },
    });

    const handleSubmit = async (values: QuizFormValues) => {
        try {
            await onSubmit(values);
            toast.success(initialData ? 'Quiz actualizado correctamente' : 'Quiz creado correctamente');
        } catch (error) {
            toast.error('Error al guardar el quiz');
            console.error(error);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {initialData ? 'Editar Quiz' : 'Nuevo Quiz'}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="quiz-title">Título del Quiz</FormLabel>
                                    <FormControl>
                                        <Input id="quiz-title" placeholder="Ej: Fundamentos de IA" {...field} className="focus-visible:ring-primary" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="quiz-description">Descripción (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input id="quiz-description" placeholder="Describe brevemente de qué trata este quiz" {...field} className="focus-visible:ring-primary" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading} className="px-8 font-semibold transition-all hover:scale-105">
                                {isLoading ? 'Guardando...' : 'Guardar y Continuar'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
