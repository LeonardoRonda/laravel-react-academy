import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth, cart_count } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.is_admin;

    return (
        // Nota el cambio: bg-slate-950/50 y backdrop-blur-2xl
        <nav className="sticky top-0 z-50 w-full bg-slate-950/50 backdrop-blur-2xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-white font-bold text-xl tracking-tight">Academia</Link>

                        <div className="hidden md:flex space-x-6">
                            <Link href={route('home')} className="text-slate-400 hover:text-white transition">Inicio</Link>
                            <Link href={route('about')} className="text-slate-400 hover:text-white transition">Nosotros</Link>
                            <Link href={route('products.courses')} className="text-slate-400 hover:text-white transition">Cursos</Link>
                            <Link href={route('products.books')} className="text-slate-400 hover:text-white transition">Libros</Link>
                            <Link href={route('blog')} className="text-slate-400 hover:text-white transition">Blog</Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {user ? (
                            <>
                                {/* Admin link — solo visible para administradores */}
                                {isAdmin && (
                                    <Link
                                        href={route('products.admin')}
                                        className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                                        </svg>
                                        Admin
                                    </Link>
                                )}

                                {/* Carrito con badge contador */}
                                {!isAdmin && (
                                    <Link
                                        href={route('cart')}
                                        className="relative text-slate-400 hover:text-white transition p-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="21" r="1" />
                                            <circle cx="20" cy="21" r="1" />
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                        </svg>
                                        {cart_count > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                                                {cart_count > 99 ? '99+' : cart_count}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {/* Perfil */}
                                <Link href={route('profile.index')} className="text-slate-400 hover:text-white transition p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="bg-slate-800 text-white px-4 py-2 rounded-full hover:bg-slate-700 transition text-sm"
                                >
                                    Salir
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-slate-400 hover:text-white transition">Iniciar sesión</Link>
                                <Link
                                    href={route('register')}
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-500 transition font-medium text-sm"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
