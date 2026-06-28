<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 1. Ruta para generar la intención de pago
Route::post('/paypal/order/create', [PaymentController::class, 'createOrder']);

// 2. Ruta para confirmar que el usuario pagó
Route::post('/paypal/order/capture', [PaymentController::class, 'captureOrder']);
