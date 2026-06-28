import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const user = usePage().props.auth.user;

    const content = (
        <>
            <Head title="Inicio" />
            
            {/* Contenedor principal con fondo oscuro para integrar todo */}
            <div className="min-h-screen bg-slate-950 py-16 lg:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge */}
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium text-xs tracking-widest uppercase">
                        Plataforma Académica
                    </span>
                    
                    {/* Títulos */}
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                        Bienvenidos a <span className="text-indigo-400">Academia</span>
                    </h1>
                    <p className="mt-6 mx-auto max-w-2xl text-xl text-slate-400 leading-relaxed">
                        Aquí encontrarás los recursos, herramientas y conocimientos necesarios para alcanzar tus metas profesionales.
                    </p>

                    {/* Grid de Secciones */}
                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {['Cursos', 'Libros', 'Material Extra'].map((title) => (
                            <article 
                                key={title} 
                                className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
                            >
                                <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                    <span className="text-indigo-400 group-hover:text-white font-bold">#</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">{title}</h2>
                                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                    Próximamente publicaremos contenido curado y técnico diseñado para potenciar tu aprendizaje.
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