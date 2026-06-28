<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    // --- VISTAS PÚBLICAS ---

    public function indexCourses()
    {
        return Inertia::render('Products/StoreCatalog', [
            'products' => Product::where('type', 'course')->with('category')->get(),
            'title' => 'Cursos'
        ]);
    }

    public function indexBooks()
    {
        return Inertia::render('Products/StoreCatalog', [
            'products' => Product::where('type', 'book')->with('category')->get(),
            'title' => 'Libros'
        ]);
    }

    // Este es el método que soluciona tu error 500
    public function ProductDetail(Product $product)
    {
        return Inertia::render('Products/ProductDetail', [
            'product' => $product->load('category'),
        ]);
    }

    // --- ADMINISTRACIÓN (CRUD) ---

    public function adminDashboard()
    {
        return Inertia::render('Admin/AdminDashboard', [
            'products' => Product::all()
        ]);
    }

    public function create(Request $request, $type)
    {
        return Inertia::render('Products/Create', [
            'type' => $type,
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request, $type)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        Product::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name . '-' . Str::random(6)),
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image' => $request->image,
            'type' => $type,
        ]);

        return redirect()->route('products.admin');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // 1. Validar y capturar los datos validados en una variable
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        // 2. Actualizar usando el array validado.
        // Esto es más seguro que usar $request->all()
        $product->update($validatedData);

        // 3. Redirigir confirmando el éxito
        return redirect()->route('products.admin');
    }

    public function destroy(Product $product)
    {
        // 1. Primero borramos los registros hijos (order_items) que dependen de este producto
        \App\Models\OrderItem::where('product_id', $product->id)->delete();

        // 2. Ahora que no tiene hijos, ya podemos borrar el producto
        $product->delete();

        return redirect()->route('products.admin');
    }
}
