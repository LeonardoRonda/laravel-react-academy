import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function About() {
    const user = usePage().props.auth.user;

    const content = (
        <>
            <Head title="Nosotros" />
            <div className="min-h-screen bg-slate-950 py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Título de impacto */}
                <div className="mb-12 border-l-4 border-indigo-500 pl-6">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Sobre Nosotros</h1>
                    <p className="mt-2 text-slate-400">Construyendo el futuro de la educación técnica.</p>
                </div>

                {/* Grid estilo BENTO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bloque principal */}
                    <div className="md:col-span-2 p-8 rounded-3xl bg-slate-900 border border-slate-800">
                        <h2 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Academia nace como una respuesta a la necesidad de materiales de alta calidad para desarrolladores y diseñadores. 
                            Creemos en la democratización del conocimiento técnico mediante herramientas prácticas y contenido curado.
                        </p>
                    </div>

                    {/* Bloque secundario */}
                    <div className="p-8 rounded-3xl bg-indigo-600 border border-indigo-500 flex flex-col justify-center">
                        <span className="text-indigo-200 text-sm font-bold uppercase tracking-widest">Estatus</span>
                        <p className="mt-2 text-3xl font-black text-white">+500 Estudiantes</p>
                    </div>

                    {/* Bloques de valores */}
                    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
                        <h3 className="text-xl font-bold text-white mb-2">Calidad</h3>
                        <p className="text-slate-400">Contenido técnico verificado por expertos.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
                        <h3 className="text-xl font-bold text-white mb-2">Comunidad</h3>
                        <p className="text-slate-400">Aprendiendo y creciendo juntos.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
                        <h3 className="text-xl font-bold text-white mb-2">Innovación</h3>
                        <p className="text-slate-400">Siempre a la vanguardia tecnológica.</p>
                    </div>

                    {/* Mapa integrado */}
                    <div className="md:col-span-3 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">Nuestra Ubicación</h2>
                            <p className="text-slate-400 text-sm">Visítanos en nuestras instalaciones físicas.</p>
                        </div>
                        <div className="h-64 w-full">
                            <iframe
                                title="Ubicación de Academia"
                                className="h-full w-full grayscale contrast-125"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjAiTiAxMjLCsDI1JzA5LjAiVw!5e0!3m2!1ses!2sus!4v0000000000000"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

    return user ? (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">Nosotros</h2>}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>{content}</GuestLayout>
    );
}