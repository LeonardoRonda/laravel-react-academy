import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ product }) {
    const user = usePage().props.auth.user;
    const { post, processing } = useForm({
        product_id: product.id,
    });

    const addToCart = (event) => {
        event.preventDefault();
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    const typeLabel = product.type === 'course' ? 'Curso' : 'Libro';

    const content = (
        <>
            <Head title={product.name} />

            <div className="py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
                        <section className="panel overflow-hidden p-0">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-72 w-full object-cover sm:h-96"
                                />
                            ) : (
                                <div className="flex h-72 w-full items-center justify-center bg-slate-800 text-slate-500 sm:h-96">
                                    {typeLabel}
                                </div>
                            )}

                            <div className="p-6 sm:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300">
                                        {typeLabel}
                                    </span>
                                    {product.category && (
                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>

                                <h1 className="heading-page text-3xl">{product.name}</h1>
                                <p className="text-muted mt-4 whitespace-pre-line">
                                    {product.description ||
                                        'Este producto todavía no tiene una descripción detallada.'}
                                </p>
                            </div>
                        </section>

                        <aside className="panel h-fit">
                            <p className="text-sm font-medium text-slate-400">Precio</p>
                            <p className="mt-1 text-4xl font-bold text-indigo-400">
                                ${Number(product.price).toFixed(2)}
                            </p>

                            <div className="text-muted mt-6 space-y-3 text-sm">
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <span>Disponibilidad</span>
                                    <span className="font-medium text-slate-100">
                                        {product.type === 'book'
                                            ? `${product.stock} unidades`
                                            : 'Acceso digital'}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <span>Tipo</span>
                                    <span className="font-medium text-slate-100">
                                        {typeLabel}
                                    </span>
                                </div>
                            </div>

                            {user ? (
                                <form onSubmit={addToCart} className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
                                    >
                                        Añadir al carrito
                                    </button>
                                </form>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-500"
                                >
                                    Iniciar sesión para comprar
                                </Link>
                            )}

                            <Link
                                href={
                                    product.type === 'course'
                                        ? route('products.courses')
                                        : route('products.books')
                                }
                                className="btn-secondary mt-3 block w-full text-center"
                            >
                                Volver a {product.type === 'course' ? 'cursos' : 'libros'}
                            </Link>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );

    if (user) {
        return (
            <AuthenticatedLayout
                header={<h2 className="text-xl font-semibold">{product.name}</h2>}
            >
                {content}
            </AuthenticatedLayout>
        );
    }

    return <GuestLayout>{content}</GuestLayout>;
}
