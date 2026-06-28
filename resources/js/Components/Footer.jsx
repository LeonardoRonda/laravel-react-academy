export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
                <p className="text-slate-400 text-sm">
                    © {new Date().getFullYear()} Academia. Todos los derechos reservados.
                </p>
                <div className="mt-4 flex justify-center space-x-6 text-slate-500 text-xs">
                    <a href="#" className="hover:text-indigo-400 transition">Política de Privacidad</a>
                    <a href="#" className="hover:text-indigo-400 transition">Términos de Servicio</a>
                    <a href="#" className="hover:text-indigo-400 transition">Contacto</a>
                </div>
            </div>
        </footer>
    );
}
