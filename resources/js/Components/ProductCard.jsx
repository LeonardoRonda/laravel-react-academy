import { Link, router, usePage } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const { auth, favorite_ids } = usePage().props;
    const user = auth?.user;
    const isFavorited = favorite_ids?.includes(product.id);

    const addToCart = (e) => {
        e.preventDefault();
        if (!user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('cart.store'), { product_id: product.id }, { preserveScroll: true });
    };

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (!user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('favorites.store'), { product_id: product.id }, { preserveScroll: true });
    };

    return (
        <article className="group bg-slate-900 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/5 flex flex-col">

            {/* Imagen y Acciones Superiores */}
            <div className="relative h-48 overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        Sin imagen
                    </div>
                )}

                {/* Badge de Tipo */}
                <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                    {product.type === 'course' ? 'Curso' : 'Libro'}
                </span>

                {/* Botón Favoritos — toggle con estado visual */}
                {user && (
                    <button
                        type="button"
                        onClick={toggleFavorite}
                        className={`absolute top-4 right-4 z-10 p-2 backdrop-blur-md rounded-full transition-all border ${
                            isFavorited
                                ? 'bg-red-500/30 text-red-400 border-red-500/30 hover:bg-red-500/40'
                                : 'bg-black/20 text-white border-white/10 hover:bg-red-500/20 hover:text-red-400'
                        }`}
                        title={isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"
                            fill={isFavorited ? 'currentColor' : 'none'}
                            stroke="currentColor" strokeWidth="2"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

                {product.category && (
                    <span className="text-xs font-medium uppercase tracking-wide text-indigo-400 mb-4">
                        {product.category.name}
                    </span>
                )}

                {/* Footer: Precio y Acciones */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-white">${Number(product.price).toFixed(2)}</span>

                    <div className="flex gap-2">
                        <Link
                            href={route('products.show', product.slug)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition"
                        >
                            Ver
                        </Link>
                        {!user?.is_admin && (
                            <button
                                type="button"
                                onClick={addToCart}
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20"
                            >
                                Añadir
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
