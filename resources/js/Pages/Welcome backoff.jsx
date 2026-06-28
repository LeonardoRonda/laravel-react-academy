import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const user = usePage().props.auth.user;

    const content = (
        <>
            <Head title="Inicio" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h1 className="heading-page">Bienvenidos a Academia</h1>
                    <p className="text-muted mt-3 max-w-2xl text-lg">
                        Aquí encontrarás los materiales necesarios para aprender y
                        conseguir tus metas y sueños.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {['Cursos', 'Libros', 'Material extra'].map((title) => (
                            <article key={title} className="panel">
                                <h2 className="heading-section text-lg">{title}</h2>
                                <p className="text-muted mt-2 text-sm">
                                    Próximamente publicaremos contenido para ayudarte a
                                    aprender mejor.
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    return user ? (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Inicio</h2>}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>{content}</GuestLayout>
    );
}
