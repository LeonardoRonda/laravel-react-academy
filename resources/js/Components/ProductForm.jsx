import { Link } from '@inertiajs/react';

export default function ProductForm({
    data,
    setData,
    processing,
    errors,
    categories = [],
    type,
    onSubmit
}) {
    const label = type === 'course' ? 'curso' : 'libro';

    // Clases oscuras para que combine con el diseño profesional
    const fieldClass = 'mt-1 block w-full rounded-xl border-white/10 bg-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500 p-3';

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">

                {/* Nombre */}
                <Field label={`Nombre del ${label}`} error={errors.name}>
                    <input
                        type="text"
                        className={fieldClass}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </Field>

                {/* Categoría */}
                <Field label="Categoría" error={errors.category_id}>
                    <select
                        className={fieldClass}
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                    >
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </Field>

                {/* Precio */}
                <Field label="Precio ($)" error={errors.price}>
                    <input
                        type="number"
                        step="0.01"
                        className={fieldClass}
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                    />
                </Field>

                {/* Stock */}
                <Field label={type === 'course' ? 'Cupos disponibles' : 'Stock físico'} error={errors.stock}>
                    <input
                        type="number"
                        className={fieldClass}
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                    />
                </Field>
            </div>

            {/* Descripción */}
            <Field label="Descripción" error={errors.description}>
                <textarea
                    rows="3"
                    className={fieldClass}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </Field>

            {/* Imagen */}
            <Field label="URL de la Imagen" error={errors.image}>
                <input
                    type="text"
                    className={fieldClass}
                    value={data.image}
                    onChange={(e) => setData('image', e.target.value)}
                />
            </Field>

            <button
                type="submit"
                disabled={processing}
                className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-3 text-white font-bold shadow-lg hover:bg-indigo-500 transition disabled:opacity-50"
            >
                {processing ? 'Guardando...' : `Guardar ${label}`}
            </button>
        </form>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-400 mb-2">{label}</label>
            {children}
            {error && <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>}
        </div>
    );
}
