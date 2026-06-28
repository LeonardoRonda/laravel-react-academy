import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const user = usePage().props.auth.user;

    const content = (
        <>
            <Head title="Blog" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h1 className="heading-page">Blog</h1>
                    <p className="text-muted mt-3">
                        Artículos, novedades y recursos para tu aprendizaje.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {['Consejos de estudio', 'Nuevos cursos', 'Libros recomendados'].map((title) => (
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
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Blog</h2>}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>{content}</GuestLayout>
    );
}
