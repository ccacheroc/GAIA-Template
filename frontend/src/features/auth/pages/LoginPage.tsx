import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { loginSchema, type LoginInput } from '../schemas/authSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: LoginInput) => {
        try {
            await login(data);
            navigate('/');
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.detail || 'Error al iniciar sesión';
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--warm-white)] p-4">
            <Card className="w-full max-w-md shadow-lg border-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-[var(--brand-navy)]">
                        Iniciar Sesión
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Accede a tu cuenta de profesor
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-[var(--brand-terracotta)] hover:bg-[var(--brand-terracotta-aa)] text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Iniciando...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-[var(--brand-terracotta)] hover:underline font-medium">
                            Regístrate aquí
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
