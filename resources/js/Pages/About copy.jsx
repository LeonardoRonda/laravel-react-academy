import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <GuestLayout>
            <Head title="Nosotros" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                        <div className="panel">
                            <h1 className="heading-page mb-4">Nosotros</h1>

                            <p className="text-muted mb-6">
                                Bienvenido a Academia. Somos una plataforma dedicada a
                                ofrecer cursos, libros y material de estudio para que
                                alcances tus metas académicas y profesionales.
                            </p>

                            <div className="space-y-6">
                                <section>
                                    <h2 className="heading-section mb-2">Nuestra misión</h2>
                                    <p className="text-muted text-sm leading-relaxed">
                                        Facilitar el acceso a contenido educativo de calidad,
                                        con herramientas claras para aprender a tu ritmo y
                                        seguir tu progreso.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="heading-section mb-2">Qué ofrecemos</h2>
                                    <ul className="text-muted space-y-2 text-sm">
                                        <li>Cursos en línea con acceso digital</li>
                                        <li>Libros y material complementario</li>
                                        <li>Recursos extra para reforzar tu aprendizaje</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="heading-section mb-2">Ubicación</h2>
                                    <p className="text-muted text-sm leading-relaxed">
                                        Visítanos en nuestras instalaciones o contáctanos para
                                        más información sobre horarios y servicios presenciales.
                                    </p>
                                </section>
                            </div>
                        </div>

                        <div className="panel overflow-hidden p-0 lg:sticky lg:top-24">
                            <div className="border-b border-white/10 px-6 py-4">
                                <h2 className="heading-section text-lg">Mapa</h2>
                                <p className="text-muted mt-1 text-sm">Encuéntranos aquí</p>
                            </div>
                            <div className="h-72 lg:h-[420px]">
                                <iframe
                                    title="Ubicación de Academia"
                                    className="h-full w-full"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjAiTiAxMjLCsDI1JzA5LjAiVw!5e0!3m2!1ses!2sus!4v0000000000000"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
