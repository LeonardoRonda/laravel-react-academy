import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Admin({ products }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Administrar productos</h2>}>
            <Head title="Administrar productos" />

            <div className="grid gap-6 md:grid-cols-2 mb-10">
                <Card
                    title="Agregar curso"
                    text="Crea nuevos cursos para la plataforma."
                    href={route('products.create', { type: 'course' })}
                />
                <Card
                    title="Agregar libro"
                    text="Registra nuevos libros en el catálogo."
                    href={route('products.create', { type: 'book' })}
                />
            </div>

            <div className="panel overflow-hidden p-0">
                <div className="border-b border-white/10 px-6 py-4">
                    <h3 className="heading-section text-lg">Productos registrados</h3>
                    <p className="text-muted mt-1 text-sm">
                        Edita o elimina cursos y libros existentes.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td className="capitalize">{product.type}</td>
                                        <td>
                                            <div className="flex gap-4">
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                    className="link-accent text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-sm font-medium text-red-400 transition hover:text-red-300"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-8 text-center text-slate-400">
                                        No hay productos registrados todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Card({ title, text, href }) {
    return (
        <article className="panel">
            <h3 className="heading-section">{title}</h3>
            <p className="text-muted mt-3 text-sm">{text}</p>
            <Link href={href} className="btn-primary mt-6">
                Crear
            </Link>
        </article>
    );
}
