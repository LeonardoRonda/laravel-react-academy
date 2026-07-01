import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import AdminIndex from './AdminIndex';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ purchases = [], favorites = [] }) {
    const pageProps = usePage().props;
    const authUser = pageProps.auth?.user;
    const user = pageProps.user ?? authUser;
    const isAdmin = Boolean(user?.is_admin ?? authUser?.is_admin);
    const showUserPanels = !isAdmin;

    if (isAdmin) {
        return <AdminIndex />;
    }

    const removeFavorite = (productId) => {
        router.post(route('favorites.store'), { product_id: productId }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Mi perfil</h2>}>
            <Head title="Perfil" />

            <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
                <aside className="panel h-fit">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-indigo-500/20">
                        {user.profile_photo_url ? (
                            <img
                                src={user.profile_photo_url}
                                alt="Foto de perfil"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-300">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-slate-100">{user.name}</h1>
                    <p className="text-muted mt-1 text-sm">{user.email}</p>

                    <dl className="mt-6 space-y-4 text-sm">
                        <div className="border-t border-white/10 pt-4">
                            <dt className="font-medium text-slate-400">Cuenta creada</dt>
                            <dd className="mt-1 text-slate-100">
                                {user.created_at
                                    ? new Date(user.created_at).toLocaleDateString()
                                    : 'No disponible'}
                            </dd>
                        </div>
                        {showUserPanels && (
                            <>
                                <div className="border-t border-white/10 pt-4">
                                    <dt className="font-medium text-slate-400">Compras registradas</dt>
                                    <dd className="mt-1 text-slate-100">{purchases.length}</dd>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <dt className="font-medium text-slate-400">Favoritos</dt>
                                    <dd className="mt-1 text-slate-100">{favorites.length}</dd>
                                </div>
                            </>
                        )}
                    </dl>

                    <Link href={route('profile.edit')} className="btn-primary mt-6 block text-center">
                        Editar perfil
                    </Link>

                    <DeleteUserForm className="mt-6" />
                </aside>

                <div className="space-y-8">
                    {showUserPanels && (
                        <>
                            {/* ─── Sección Favoritos ─── */}
                            <section className="panel">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="heading-section text-2xl flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                Mis Favoritos
                            </h2>
                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
                                {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'}
                            </span>
                        </div>

                        {favorites.length ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {favorites.map((fav) => (
                                    <article
                                        key={fav.id}
                                        className="panel-muted rounded-xl p-4 flex gap-4 group hover:border-red-500/20 transition-colors"
                                    >
                                        {/* Miniatura */}
                                        <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800">
                                            {fav.image ? (
                                                <img
                                                    src={fav.image}
                                                    alt={fav.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-600 text-xs">
                                                    {fav.type === 'course' ? 'Curso' : 'Libro'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={route('products.show', fav.slug)}
                                                className="text-slate-100 font-semibold hover:text-indigo-400 transition line-clamp-1"
                                            >
                                                {fav.name}
                                            </Link>
                                            <div className="mt-1 flex items-center gap-2 text-sm">
                                                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-300">
                                                    {fav.type === 'course' ? 'Curso' : 'Libro'}
                                                </span>
                                                {fav.category && (
                                                    <span className="text-slate-500">{fav.category}</span>
                                                )}
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-lg font-bold text-indigo-400">
                                                    ${Number(fav.price).toFixed(2)}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFavorite(fav.product_id)}
                                                    className="text-xs font-medium text-red-400 hover:text-red-300 transition flex items-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                    Quitar
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="panel-muted border-dashed p-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <h3 className="heading-section text-lg">No tienes favoritos aún</h3>
                                <p className="text-muted mt-2 text-sm">
                                    Marca productos con el corazón para guardarlos aquí.
                                </p>
                                <Link
                                    href={route('products.courses')}
                                    className="btn-primary mt-5 inline-flex"
                                >
                                    Explorar cursos
                                </Link>
                            </div>
                        )}
                    </section>
                        </>
                    )}

                    {showUserPanels && (
                        <>
                            {/* ─── Sección Historial de Compras ─── */}
                            <section className="panel">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="heading-section text-2xl">Historial de compras</h2>
                                    <Link href={route('cart')} className="link-accent text-sm">
                                        Ir al carrito
                                    </Link>
                                </div>

                                {purchases.length ? (
                            <div className="space-y-4">
                                {purchases.map((order) => (
                                    <article
                                        key={order.id}
                                        className="panel-muted rounded-xl p-4"
                                    >
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="font-semibold text-slate-100">
                                                    Pedido #{order.id}
                                                </h3>
                                                <p className="text-muted text-sm">
                                                    {new Date(order.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-lg font-bold text-indigo-400">
                                                    ${Number(order.total).toFixed(2)}
                                                </p>
                                                <p className="text-xs font-medium uppercase text-emerald-400">
                                                    {order.status === 'paid' ? 'Pagado' : order.status}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="mt-4 divide-y divide-white/10">
                                            {order.order_items.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex justify-between py-3 text-sm"
                                                >
                                                    <span className="text-slate-300">
                                                        {item.product?.name || 'Producto no disponible'}{' '}
                                                        x{item.quantity}
                                                    </span>
                                                    <span className="font-medium text-slate-100">
                                                        ${Number(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="panel-muted border-dashed p-8 text-center">
                                <h3 className="heading-section text-lg">Aún no tienes compras</h3>
                                <p className="text-muted mt-2 text-sm">
                                    Cuando finalices una compra, aparecerá aquí con sus productos
                                    y total.
                                </p>
                                <Link
                                    href={route('products.courses')}
                                    className="btn-primary mt-5 inline-flex"
                                >
                                    Explorar cursos
                                </Link>
                            </div>
                        )}
                    </section>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
