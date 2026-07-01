import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(user.profile_photo_url);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
        });

    useEffect(() => {
        if (data.photo && typeof data.photo === 'object') {
            const previewUrl = URL.createObjectURL(data.photo);
            setPhotoPreview(previewUrl);

            return () => URL.revokeObjectURL(previewUrl);
        }

        setPhotoPreview(user.profile_photo_url);
    }, [data.photo, user.profile_photo_url]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), { forceFormData: true });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-slate-100">
                    Información personal
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Actualiza tu nombre y correo electrónico.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="photo" value="Foto de perfil" />

                    {photoPreview ? (
                        <img
                            src={photoPreview}
                            alt="Foto de perfil"
                            className="mt-2 h-24 w-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="mt-2 inline-flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                            Sin foto
                        </div>
                    )}

                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="mt-3 block w-full text-sm text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-slate-700 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-600"
                        onChange={(e) => setData('photo', e.target.files?.[0])}
                    />

                    <InputError className="mt-2" message={errors.photo} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-slate-300">
                            Tu correo electrónico no está verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="link-accent ml-1 underline"
                            >
                                Reenviar correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-400">
                                Se envió un nuevo enlace de verificación a tu correo.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-slate-400">
                            Guardado.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
