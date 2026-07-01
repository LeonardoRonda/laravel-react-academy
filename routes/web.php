
<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Páginas públicas
|--------------------------------------------------------------------------
*/

Route::get('/', fn() => Inertia::render('Welcome'))->name('home');
Route::get('/nosotros', fn() => Inertia::render('About'))->name('about');
Route::get('/blog', fn() => Inertia::render('Blog/Index'))->name('blog');

// Catálogo público
Route::get('/cursos', [ProductController::class, 'indexCourses'])->name('products.courses');
Route::get('/libros', [ProductController::class, 'indexBooks'])->name('products.books');
Route::get('/productos/{product:slug}', [ProductController::class, 'ProductDetail'])->name('products.show');

// CRUD Fotos
Route::get('/fotos', [PhotoController::class, 'index'])->name('photos.index');
Route::post('/fotos', [PhotoController::class, 'store'])->name('photos.store');
Route::delete('/fotos/{photo}', [PhotoController::class, 'destroy'])->name('photos.destroy');
/*
|--------------------------------------------------------------------------
| Usuario autenticado
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard y Perfil
    Route::get('/dashboard', fn() => redirect()->route('profile.index'))->name('dashboard');
    Route::get('/perfil', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/perfil/editar', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Carrito y Favoritos
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');

    Route::prefix('carrito')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('cart');
        Route::post('/', [CartController::class, 'store'])->name('cart.store');
        Route::patch('/{cartItem}', [CartController::class, 'update'])->name('cart.update');
        Route::delete('/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
        Route::post('/comprar', [OrderController::class, 'store'])->name('orders.store');
        Route::post('/paypal/create', [OrderController::class, 'createPaypalOrder'])->name('paypal.create');
        Route::post('/paypal/capture', [OrderController::class, 'capturePaypalOrder'])->name('paypal.capture');
    });

    Route::get('/mis-cursos', fn() => Inertia::render('Courses/MyCourses'))->name('my-courses');

    /*
    |--------------------------------------------------------------------------
    | ADMINISTRACIÓN (CRUD PRODUCTOS)
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->middleware('admin')->group(function () {
        // Dashboard Admin
        Route::get('/productos', [ProductController::class, 'adminDashboard'])->name('products.admin');

        // Operaciones Crear
        Route::get('/{type}/crear', [ProductController::class, 'create'])->name('products.create')->where('type', 'course|book');
        Route::post('/{type}', [ProductController::class, 'store'])->name('products.store')->where('type', 'course|book');

        // Operaciones Editar/Actualizar/Eliminar
        Route::get('/productos/{product}/editar', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/productos/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/productos/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });
});

require __DIR__ . '/auth.php';
