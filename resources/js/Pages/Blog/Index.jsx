import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const user = usePage().props.auth.user;

    // Datos simulados con variedad para alimentar el Bento Grid
    const articles = [
        {
            title: 'Consejos de estudio para desarrolladores',
            description: 'Optimiza tu tiempo de aprendizaje con la técnica Pomodoro modificada para código y proyectos prácticos.',
            tag: 'Productividad',
            date: 'Hoy',
            size: 'md:col-span-2' // Tarjeta grande
        },
        {
            title: 'Nuevos cursos en camino',
            description: 'Próximamente: Especializaciones completas en Laravel avanzado, React, Docker y despliegue en la nube.',
            tag: 'Lanzamientos',
            date: 'Ayer',
            size: 'md:col-span-1 bg-gradient-to-br from-indigo-950 to-slate-900 border-indigo-500/20' // Tarjeta con acento
        },
        {
            title: 'Libros recomendados 2026',
            description: 'Nuestra biblioteca curada para arquitectos de software modernos y líderes técnicos.',
            tag: 'Recursos',
            date: 'Hace 3 días',
            size: 'md:col-span-1'
        },
        {
            title: 'Guía rápida: Configurando Arch Linux',
            description: 'Un walkthrough simplificado para crear tu entorno de desarrollo ideal paso a paso.',
            tag: 'Sysadmin',
            date: 'Hace 5 días',
            size: 'md:col-span-2'
        }
    ];

    const content = (
        <>
            <Head title="Blog" />
            
            <div className="min-h-screen bg-slate-950 py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Título de impacto (Mismo estilo que "Nosotros") */}
                    <div className="mb-12 border-l-4 border-indigo-500 pl-6">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Blog de Academia</h1>
                        <p className="mt-2 text-slate-400">Artículos, novedades y recursos técnicos para potenciar tu aprendizaje.</p>
                    </div>

                    {/* Grid estilo BENTO para los artículos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((article, index) => (
                            <article 
                                key={index} 
                                className={`p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group ${article.size}`}
                            >
                                <div>
                                    {/* Header de la tarjeta */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-500/10 rounded-full uppercase">
                                            {article.tag}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">
                                            {article.date}
                                        </span>
                                    </div>

                                    {/* Título */}
                                    <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                        {article.title}
                                    </h2>

                                    {/* Descripción */}
                                    <p className="mt-3 text-slate-400 leading-relaxed text-sm">
                                        {article.description}
                                    </p>
                                </div>

                                {/* Link interactivo abajo */}
                                <div className="mt-8 flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    <span>Leer artículo completo</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </article>
                        ))}

                        {/* Bloque Destacado de Suscripción al final del Bento */}
                        <div className="md:col-span-3 p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 border border-indigo-500 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-4">
                            <div>
                                <h3 className="text-2xl font-black text-white">¿Quieres mantenerte actualizado?</h3>
                                <p className="text-indigo-100 text-sm mt-1">Recibe notificaciones cuando publiquemos guías técnicas y nuevos recursos.</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Tu correo electrónico" 
                                    className="w-full md:w-64 bg-indigo-950/40 border border-indigo-400/30 rounded-2xl px-4 py-2.5 text-white placeholder-indigo-200/60 text-sm focus:outline-none focus:border-white"
                                />
                                <button className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-sm rounded-2xl hover:bg-slate-100 transition shadow-lg whitespace-nowrap">
                                    Suscribirse
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

    return user ? (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">Blog</h2>}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>{content}</GuestLayout>
    );
}