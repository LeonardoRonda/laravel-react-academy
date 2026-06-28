import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import ProductForm from '@/Components/ProductForm';

export default function Create({ type, categories }) {
    const { flash } = usePage().props;
    const label = type === 'course' ? 'curso' : 'libro';

    const form = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        category_id: categories[0]?.id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('products.store', { type: type }), {
            onSuccess: () => {
                console.log('Guardado correctamente.');
            },
            onError: (errors) => {
                console.error('Errores del controlador:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Agregar {label}</h2>}
        >
            <Head title={`Agregar ${label}`} />

            <div className="mx-auto max-w-3xl">
                <div className="panel">
                    {flash?.message && (
                        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                            {flash.message}
                        </div>
                    )}

                    <h3 className="heading-section mb-6">
                        Detalles del {label}
                    </h3>

                    <ProductForm
                        {...form}
                        categories={categories}
                        type={type}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
