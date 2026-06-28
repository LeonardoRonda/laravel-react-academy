import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar correo" />

            <div className="mx-auto max-w-md py-12">
                <div className="panel">
                    <h1 className="heading-section mb-2">Verifica tu correo</h1>
                    <p className="text-muted mb-6 text-sm">
                        Gracias por registrarte. Antes de continuar, verifica tu
                        correo haciendo clic en el enlace que te enviamos. Si no lo
                        recibiste, podemos enviarte otro.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                            Se envió un nuevo enlace de verificación a tu correo.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="flex items-center justify-between gap-4">
                            <PrimaryButton disabled={processing}>
                                Reenviar correo
                            </PrimaryButton>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="link-accent text-sm underline"
                            >
                                Cerrar sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
