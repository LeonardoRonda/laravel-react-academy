import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Restablecer contraseña" />

            <div className="mx-auto max-w-md py-12">
                <div className="panel">
                    <h1 className="heading-section mb-6">Restablecer contraseña</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="email" value="Correo electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="input-dark"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Nueva contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="input-dark"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmar contraseña"
                            />
                            <TextInput
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="input-dark"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton disabled={processing}>
                            Restablecer contraseña
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
