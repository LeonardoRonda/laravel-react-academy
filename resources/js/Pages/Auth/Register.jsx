import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClasses = 'input-dark mt-2';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear Cuenta" />

            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="panel p-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-slate-100">
                                Crear cuenta
                            </h1>
                            <p className="text-muted mt-2">
                                Únete a Academia y accede a cursos, libros y más
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className={inputClasses}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Correo electrónico" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={inputClasses}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={inputClasses}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmar contraseña"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className={inputClasses}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
                            >
                                {processing ? 'Creando cuenta...' : 'Crear cuenta'}
                            </button>

                            <div className="text-center text-sm text-slate-400">
                                ¿Ya tienes una cuenta?{' '}
                                <Link href={route('login')} className="link-accent">
                                    Inicia sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
