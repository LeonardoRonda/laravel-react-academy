<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Creamos una categoría primero para que los productos tengan a dónde asignarse
        $cat = Category::create(['name' => 'Programación', 'slug' => 'programacion']);

        Product::create([
            'category_id' => $cat->id,
            'name' => 'Curso de Laravel desde Cero',
            'slug' => 'curso-laravel-cero',
            'type' => 'course',
            'description' => 'Aprende PHP y Laravel profesionalmente.',
            'price' => 49.99,
            'stock' => 0,
        ]);

        Product::create([
            'category_id' => $cat->id,
            'name' => 'Libro: Patrones de Diseño',
            'slug' => 'libro-patrones',
            'type' => 'book',
            'description' => 'Guía esencial para arquitectura de software.',
            'price' => 25.00,
            'stock' => 10,
        ]);
    }
}
