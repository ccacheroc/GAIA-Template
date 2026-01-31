import { Link } from 'react-router-dom';
import { useQuizzes } from '../api/quizQueries';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Plus, ListChecks, FileText, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// [Feature: Quiz Management] [Story: QQ-TECH-001] [Ticket: QQ-TECH-001-FE-T03]
export default function QuizListPage() {
    const { data: quizzes, isLoading } = useQuizzes();

    if (isLoading) {
        return (
            <div className="container py-12 max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-12 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                        <ListChecks className="h-10 w-10 text-primary" />
                        Mis Cuestionarios
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Gestiona tus evaluaciones y crea nuevas experiencias de aprendizaje.
                    </p>
                </div>
                <Button asChild className="font-bold gap-2 active:scale-95 transition-transform">
                    <Link to="/quizzes/create">
                        <Plus className="h-5 w-5" /> Crear Nuevo
                    </Link>
                </Button>
            </div>

            {quizzes && quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} className="group hover:border-primary/40 transition-all hover:shadow-md bg-card">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${quiz.status === 'PUBLISHED'
                                        ? 'bg-secondary/10 text-secondary-foreground border border-secondary/20'
                                        : 'bg-muted text-muted-foreground border border-border'
                                        }`}>
                                        {quiz.status === 'PUBLISHED' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </div>
                                <CardTitle className="text-xl mt-4 line-clamp-1 text-foreground leading-tight">
                                    {quiz.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 min-h-[3rem]">
                                    {quiz.description || 'Sin descripción'}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-2">
                                <Button asChild variant="ghost" className="w-full justify-between group/btn hover:bg-primary/5 text-primary font-semibold">
                                    <Link to={`/quizzes/${quiz.id}/edit`}>
                                        Editar Cuestionario
                                        <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-xl bg-card/50">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="p-4 bg-primary/5 rounded-full w-fit mx-auto">
                            <Plus className="h-8 w-8 text-primary/40" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">No hay cuestionarios todavía</h3>
                        <p className="text-muted-foreground">
                            Parece que aún no has creado ningún cuestionario. ¿Quieres empezar ahora?
                        </p>
                        <Button asChild variant="outline" className="mt-4 border-primary/20 hover:bg-primary/5">
                            <Link to="/quizzes/create">Crear mi primer cuestionario</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
