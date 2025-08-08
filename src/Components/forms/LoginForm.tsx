'use client';
import { loginService } from '@/services/loginService';
import { LoginCredentials } from '@/types/login';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';



export default function LoginPage() {
    const [form, setForm] = useState<LoginCredentials>({
        username: '',
        password: ''
    });

    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const result = await loginService.login(form);
            localStorage.setItem('token', result.access_token);

            console.log('Login realizado com sucesso:', result);
            alert('Login realizado com sucesso');

            router.push('/products');
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert('Usuário ou senha inválidos');
            } else {
                alert('Erro ao tentar realizar o login');
            }
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" >
            <Card className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
                <CardHeader className="px-6 pt-6">
                    <CardTitle className="text-2xl">Entrar</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-4">
                    <form onSubmit={handleSubmit} className="space-y-4" >
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <input
                                type="text"
                                value={form.username}
                                onChange={e => setForm({ ...form, username: e.target.value })}
                                placeholder="Username"
                                className="mt-1"

                                style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Senha</Label>
                            </div>

                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                placeholder="*******"
                                required
                                className="mt-1"
                                style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <div className="pt-2">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}
