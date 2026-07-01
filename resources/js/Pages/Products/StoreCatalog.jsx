import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';

export default function Index({ products, title }) {
    const user = usePage().props.auth.user;

    const resourceType = title === 'Cursos' ? 'course' : 'book';

    const content = (
        <>
            <Head title={title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="heading-page text-2xl">Conoce nuestros {title}</h1>

                        {user?.is_admin && (
                            <a
                                href={route('products.create', { type: resourceType })}
                                className="btn-primary"
                            >
                                Agregar {resourceType === 'course' ? 'curso' : 'libro'}
                            </a>
                        )}
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    if (user) {
        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl">{title}</h2>}>
                {content}
            </AuthenticatedLayout>
        );
    }

    return <GuestLayout>{content}</GuestLayout>;
}
