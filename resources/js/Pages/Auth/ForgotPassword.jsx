import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <div className="mx-auto max-w-md py-12">
                <div className="panel">
                    <h1 className="heading-section mb-2">Recuperar contraseña</h1>
                    <p className="text-muted mb-6 text-sm">
                        Indica tu correo y te enviaremos un enlace para restablecer
                        tu contraseña.
                    </p>

                    {status && (
                        <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="email" value="Correo electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="input-dark"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <PrimaryButton disabled={processing}>
                            Enviar enlace
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
