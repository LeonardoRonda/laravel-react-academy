import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Index({ items = [], total = 0, paypalClientId }) {
    const { post, processing, errors } = useForm();
    const [sdkReady, setSdkReady] = useState(false);
    const [paypalError, setPaypalError] = useState(null);
    const paypalButtonRef = useRef(null);

    const isPaypalConfigured = !!paypalClientId;

    useEffect(() => {
        if (!isPaypalConfigured) return;

        if (window.paypal) {
            setSdkReady(true);
            return;
        }

        const scriptId = 'paypal-sdk-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            script.onerror = () => {
                setPaypalError('Error al cargar la pasarela de PayPal.');
            };
            document.body.appendChild(script);
        } else {
            setSdkReady(true);
        }
    }, [paypalClientId, isPaypalConfigured]);

    useEffect(() => {
        if (!sdkReady || !window.paypal || !paypalButtonRef.current) return;

        // Clear container to avoid duplicate buttons on re-render
        paypalButtonRef.current.innerHTML = '';

        window.paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
            },
            createOrder: async () => {
                setPaypalError(null);
                try {
                    const response = await axios.post(route('paypal.create'));
                    return response.data.id;
                } catch (err) {
                    const errMsg = err.response?.data?.error || 'No se pudo iniciar el pago.';
                    setPaypalError(errMsg);
                    throw err;
                }
            },
            onApprove: async (data) => {
                try {
                    const response = await axios.post(route('paypal.capture'), {
                        paypal_order_id: data.orderID,
                    });
                    if (response.data.redirect) {
                        window.location.href = response.data.redirect;
                    }
                } catch (err) {
                    const errMsg = err.response?.data?.error || 'Ocurrió un error al procesar el pago.';
                    setPaypalError(errMsg);
                }
            },
            onError: (err) => {
                console.error('PayPal Error:', err);
                setPaypalError('Error en la pasarela de PayPal. Intente nuevamente.');
            }
        }).render(paypalButtonRef.current);
    }, [sdkReady, total, items.length]);

    const updateQuantity = (item, quantity) => {
        router.patch(
            route('cart.update', item.id),
            { quantity },
            { preserveScroll: true },
        );
    };

    const removeItem = (item) => {
        router.delete(route('cart.destroy', item.id), {
            preserveScroll: true,
        });
    };

    const checkout = (event) => {
        event.preventDefault();
        post(route('orders.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Carrito</h2>}>
            <Head title="Carrito" />

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <section className="panel">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="heading-section text-2xl">Mi carrito</h1>
                        <span className="text-muted text-sm">
                            {items.length} {items.length === 1 ? 'producto' : 'productos'}
                        </span>
                    </div>

                    {items.length ? (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <article
                                    key={item.id}
                                    className="grid gap-4 border-b border-white/10 pb-4 sm:grid-cols-[96px_1fr_auto]"
                                >
                                    {item.product.image ? (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-500">
                                            {item.product.type === 'course' ? 'Curso' : 'Libro'}
                                        </div>
                                    )}

                                    <div>
                                        <h2 className="font-semibold text-slate-100">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-muted mt-1 text-sm">
                                            {item.product.category?.name || 'General'}
                                        </p>
                                        <Link
                                            href={route('products.show', item.product.slug)}
                                            className="link-accent mt-2 inline-block text-sm"
                                        >
                                            Ver detalle
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                                        <p className="font-semibold text-indigo-400">
                                            ${Number(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                        <input
                                            type="number"
                                            min="1"
                                            max="99"
                                            value={item.quantity}
                                            onChange={(event) =>
                                                updateQuantity(item, event.target.value)
                                            }
                                            className="input-dark w-20 py-2 text-sm"
                                            aria-label={`Cantidad de ${item.product.name}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item)}
                                            className="text-sm font-medium text-red-400 transition hover:text-red-300"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="panel-muted border-dashed p-8 text-center">
                            <h2 className="heading-section text-lg">Tu carrito está vacío</h2>
                            <p className="text-muted mt-2 text-sm">
                                Explora los cursos y libros disponibles para comenzar.
                            </p>
                            <div className="mt-5 flex justify-center gap-3">
                                <Link href={route('products.courses')} className="btn-primary">
                                    Ver cursos
                                </Link>
                                <Link href={route('products.books')} className="btn-secondary">
                                    Ver libros
                                </Link>
                            </div>
                        </div>
                    )}
                </section>

                <aside className="panel h-fit">
                    <h2 className="heading-section text-lg">Resumen</h2>
                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted">Subtotal</span>
                            <span className="font-medium text-slate-100">
                                ${Number(total).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                            <span className="font-semibold text-slate-100">Total</span>
                            <span className="font-bold text-indigo-400">
                                ${Number(total).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {errors.cart && (
                        <p className="mt-4 text-sm text-red-400">{errors.cart}</p>
                    )}

                    {isPaypalConfigured ? (
                        <div className="mt-6 space-y-4">
                            <div ref={paypalButtonRef} id="paypal-button-container"></div>
                            {paypalError && (
                                <p className="text-sm text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                    {paypalError}
                                </p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={checkout} className="mt-6">
                            <div className="mb-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-400">
                                💡 PayPal no está configurado. Se usará el método de compra simulada.
                            </div>
                            <button
                                type="submit"
                                disabled={!items.length || processing}
                                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Finalizar compra (Simulado)
                            </button>
                        </form>
                    )}
                </aside>
            </div>
        </AuthenticatedLayout>
    );
}
