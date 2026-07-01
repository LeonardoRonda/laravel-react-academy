import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminIndex() {
    const pageProps = usePage().props;
    const user = pageProps.user ?? pageProps.auth.user;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Panel de administrador</h2>}>
            <Head title="Panel de administrador" />

            <div className="mx-auto max-w-4xl space-y-6">
                <section className="panel">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-amber-500/20">
                                {user?.profile_photo_url ? (
                                    <img
                                        src={user.profile_photo_url}
                                        alt="Foto de perfil"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-amber-300">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-100">{user?.name}</h1>
                                <p className="text-sm text-slate-400">{user?.email}</p>
                            </div>
                        </div>
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
                            Administrador
                        </span>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-slate-400">
                        Este espacio está reservado para la gestión del contenido y las operaciones de administración.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={route('products.admin')} className="btn-primary">
                            Ir al panel de administración
                        </Link>
                        <Link href={route('profile.edit')} className="btn-secondary">
                            Editar perfil
                        </Link>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
