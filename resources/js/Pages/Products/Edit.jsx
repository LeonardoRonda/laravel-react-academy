import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductForm from '@/Components/ProductForm';

export default function Edit({ product, categories }) {
    const form = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        image: product.image || '',
        category_id: product.category_id || (categories[0]?.id ?? ''),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Editar producto</h2>}>
            <Head title={`Editar ${product.name}`} />

            <div className="mx-auto max-w-3xl">
                <div className="panel">
                    <h3 className="heading-section mb-6">
                        Editar {product.type === 'course' ? 'curso' : 'libro'}
                    </h3>

                    <ProductForm
                        {...form}
                        categories={categories}
                        type={product.type}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
