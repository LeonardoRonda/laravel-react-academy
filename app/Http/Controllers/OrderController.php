<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    private function getPaypalAccessToken(): string
    {
        $clientId = config('services.paypal.client_id');
        $clientSecret = config('services.paypal.secret');
        $baseUri = config('services.paypal.base_uri', 'https://api-m.sandbox.paypal.com');
        
        $url = rtrim($baseUri, '/') . '/v1/oauth2/token';

        $response = Http::asForm()
            ->withBasicAuth($clientId, $clientSecret)
            ->post($url, [
                'grant_type' => 'client_credentials'
            ]);

        if ($response->failed()) {
            throw new \Exception('Failed to obtain PayPal access token: ' . $response->body());
        }

        return $response->json()['access_token'];
    }

    public function createPaypalOrder(Request $request)
    {
        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Tu carrito está vacío.'], 400);
        }

        $total = $cartItems->sum(fn ($item) => $item->quantity * $item->product->price);

        try {
            $accessToken = $this->getPaypalAccessToken();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación con PayPal: ' . $e->getMessage()], 500);
        }

        $baseUri = config('services.paypal.base_uri', 'https://api-m.sandbox.paypal.com');
        $currency = config('services.paypal.currency', 'USD');
        $url = rtrim($baseUri, '/') . '/v2/checkout/orders';

        $response = Http::withToken($accessToken)
            ->post($url, [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => $currency,
                            'value' => number_format($total, 2, '.', '')
                        ]
                    ]
                ]
            ]);

        if ($response->failed()) {
            \Log::error('PayPal Order Creation Failed: ' . $response->body() . ' Status: ' . $response->status());
            return response()->json(['error' => 'No se pudo crear el pedido en PayPal: ' . ($response->json()['message'] ?? $response->body())], 500);
        }

        return response()->json($response->json());
    }

    public function capturePaypalOrder(Request $request)
    {
        $paypalOrderId = $request->input('paypal_order_id');
        if (!$paypalOrderId) {
            return response()->json(['error' => 'ID de orden de PayPal requerido.'], 400);
        }

        try {
            $accessToken = $this->getPaypalAccessToken();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación con PayPal: ' . $e->getMessage()], 500);
        }

        $baseUri = config('services.paypal.base_uri', 'https://api-m.sandbox.paypal.com');
        $url = rtrim($baseUri, '/') . "/v2/checkout/orders/{$paypalOrderId}/capture";

        $response = Http::withToken($accessToken)
            ->withHeaders(['Content-Type' => 'application/json'])
            ->withBody('{}', 'application/json')
            ->post($url);

        if ($response->failed()) {
            \Log::error('PayPal Order Capture Failed for ID ' . $paypalOrderId . ': ' . $response->body() . ' Status: ' . $response->status());
            return response()->json(['error' => 'No se pudo capturar el pago en PayPal: ' . ($response->json()['message'] ?? $response->body())], 500);
        }

        $paypalData = $response->json();
        
        if (($paypalData['status'] ?? '') !== 'COMPLETED') {
            \Log::warning('PayPal Order Capture status was not COMPLETED: ' . json_encode($paypalData));
            return response()->json(['error' => 'El pago no fue completado en PayPal.'], 400);
        }

        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'El carrito está vacío.'], 400);
        }

        $total = $cartItems->sum(fn ($item) => $item->quantity * $item->product->price);

        DB::transaction(function () use ($user, $cartItems, $total, $paypalOrderId) {
            // 1. Crear Orden
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'status' => 'paid',
            ]);

            // 2. Crear ítems
            foreach ($cartItems as $item) {
                $order->orderItems()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            // 3. Registrar Pago
            \App\Models\Payment::create([
                'order_id' => $order->id,
                'transaction_id' => $paypalOrderId,
                'payment_status' => 'completed',
                'amount' => $total,
            ]);

            // 4. Limpiar Carrito
            $user->cartItems()->delete();
        });

        // Guardar mensaje flash de sesión para Inertia
        session()->flash('message', 'Compra realizada correctamente con PayPal.');

        return response()->json([
            'success' => true,
            'message' => 'Compra realizada correctamente con PayPal.',
            'redirect' => route('profile.index')
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors([
                'cart' => 'Tu carrito está vacío.',
            ]);
        }

        DB::transaction(function () use ($user, $cartItems) {
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $cartItems->sum(fn ($item) => $item->quantity * $item->product->price),
                'status' => 'paid',
            ]);

            foreach ($cartItems as $item) {
                $order->orderItems()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            $user->cartItems()->delete();
        });

        return redirect()
            ->route('profile.index')
            ->with('message', 'Compra realizada correctamente.');
    }
}
