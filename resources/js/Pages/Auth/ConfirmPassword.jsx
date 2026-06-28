import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="mx-auto max-w-md py-12">
                <div className="panel">
                    <h1 className="heading-section mb-2">Confirmar contraseña</h1>
                    <p className="text-muted mb-6 text-sm">
                        Esta es un área segura. Confirma tu contraseña para continuar.
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="input-dark"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <PrimaryButton disabled={processing}>Confirmar</PrimaryButton>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
