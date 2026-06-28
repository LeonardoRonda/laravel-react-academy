import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClasses = 'input-dark mt-2';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="panel p-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-slate-100">
                                Bienvenido a Academia
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Accede a cursos, libros y material de estudio
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Correo electrónico"
                                    className="text-slate-300"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={inputClasses}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Contraseña"
                                    className="text-slate-300"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={inputClasses}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-slate-400">
                                        Recordarme
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-indigo-400 transition hover:text-indigo-300"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Iniciando sesión...'
                                    : 'Iniciar Sesión'}
                            </button>

                            <div className="text-center text-sm text-slate-400">
                                ¿No tienes una cuenta?{' '}
                                <Link
                                    href={route('register')}
                                    className="font-medium text-indigo-400 transition hover:text-indigo-300"
                                >
                                    Regístrate
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
