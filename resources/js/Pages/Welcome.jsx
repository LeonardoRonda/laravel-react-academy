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

                    {/* --- SECCIÓN DE COLLAGE DECORATIVO (6 IMÁGENES) --- */}
                    <div className="mt-24">
                        <div className="text-left mb-8">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Nuestro Espacio de Aprendizaje</h3>
                            <p className="text-slate-400 text-sm mt-1">Un vistazo a nuestra comunidad, herramientas y entorno de desarrollo.</p>
                        </div>
                        
                        {/* Grid Bento dinámico de 3 columnas en móviles y 4 en pantallas grandes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
                            
                            {/* Foto 1 - Destacada Grande */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 col-span-2 row-span-2 relative group">
                                <img 
                                    src="/storage/collage/foto1.jpeg" 
                                    alt="Espacio de trabajo 1" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0 contrast-[1.10]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
                                <span className="absolute bottom-4 left-4 text-white font-semibold text-xs bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-700">Comunidad</span>
                            </div>

                            {/* Foto 2 - Vertical Alta */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 row-span-2 relative group">
                                <img 
                                    src="/storage/collage/foto2.jpg" 
                                    alt="Espacio de trabajo 2" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                            </div>

                            {/* Foto 3 - Pequeña estándar */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 relative group">
                                <img 
                                    src="/storage/collage/foto3.jpg" 
                                    alt="Espacio de trabajo 3" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                            </div>

                            {/* Foto 4 - Pequeña estándar con etiqueta */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 relative group">
                                <img 
                                    src="/storage/collage/foto4.jpg" 
                                    alt="Espacio de trabajo 4" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                                <span className="absolute bottom-3 right-3 text-indigo-400 text-[10px] font-bold bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800 tracking-wider uppercase">Tech</span>
                            </div>

                            {/* Foto 5 - Horizontal Ancha en la parte inferior */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 col-span-2 relative group">
                                <img 
                                    src="/storage/collage/foto5.jpg" 
                                    alt="Espacio de trabajo 5" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                            </div>

                            {/* Foto 6 - Pequeña final para cerrar la cuadrícula */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 relative group">
                                <img 
                                    src="/storage/collage/foto6.png" 
                                    alt="Espacio de trabajo 6" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                            </div>

                        </div>
                    </div>
                    {/* --- FIN DE SECCIÓN COLLAGE --- */}

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