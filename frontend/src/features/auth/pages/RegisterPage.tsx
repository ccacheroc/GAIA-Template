import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerSchema, type RegisterInput } from '../schemas/authSchema';
import { authApi } from '../api/authApi';
import { LogIn, UserPlus } from 'lucide-react';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            full_name: '',
        },
    });

    const onSubmit = async (values: RegisterInput) => {
        setIsLoading(true);
        try {
            await authApi.register(values);
            toast.success('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Error al registrar la cuenta';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--warm-white)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-[var(--brand-terracotta-aa)]/10 text-[var(--brand-terracotta-aa)]">
                            <UserPlus size={32} />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-[var(--brand-navy)]">
                        Crear cuenta
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Regístrate como profesor para empezar a crear cuestionarios
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Álvaro Moya" data-testid="fullname-input" {...field} />
                                        </FormControl>
                                        <FormMessage data-testid="fullname-error" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nombre@colegio.edu" data-testid="email-input" {...field} />
                                        </FormControl>
                                        <FormMessage data-testid="email-error" />
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
                                            <Input type="password" placeholder="••••••••" data-testid="password-input" {...field} />
                                        </FormControl>
                                        <FormMessage data-testid="password-error" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" data-testid="confirm-password-input" {...field} />
                                        </FormControl>
                                        <FormMessage data-testid="confirm-password-error" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg bg-[var(--brand-terracotta-aa)] hover:bg-[var(--brand-terracotta-aa)]/90 transition-all duration-300"
                                disabled={isLoading}
                                data-testid="register-submit"
                            >
                                {isLoading ? 'Registrando...' : 'Registrarse'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500">
                                ¿Ya tienes cuenta?
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full border-slate-200 text-[var(--brand-navy)]" asChild>
                        <Link to="/login" className="flex items-center gap-2">
                            <LogIn size={16} />
                            Iniciar sesión
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
