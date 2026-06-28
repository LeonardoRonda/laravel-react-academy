import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    // Usamos el layout como contenedor principal de estilos
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
            <Navbar />

            {/* Header: Ahora con diseño tipo card y blur */}
            {header && (
                <header className="bg-slate-900/50 backdrop-blur-md border border-white/5 mx-4 mt-8 rounded-3xl shadow-xl">
                    <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                        <div className="text-white text-xl font-bold tracking-tight">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            {/* Main: Espaciado uniforme */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
