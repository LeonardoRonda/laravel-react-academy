<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cartItems = $request->user()
            ->cartItems()
            ->with(['product.category'])
            ->latest()
            ->get();

        return Inertia::render('Cart/Index', [
            'items' => $cartItems,
            'total' => $cartItems->sum(fn ($item) => $item->quantity * $item->product->price),
            'paypalClientId' => config('services.paypal.client_id'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $item = CartItem::firstOrNew([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
        ]);

        $item->quantity = $item->exists ? $item->quantity + 1 : 1;
        $item->save();

        return back()->with('message', 'Producto añadido al carrito');
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        abort_unless($cartItem->user_id === $request->user()->id, 403);

        $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return back()->with('message', 'Carrito actualizado');
    }

    public function destroy(Request $request, CartItem $cartItem): RedirectResponse
    {
        abort_unless($cartItem->user_id === $request->user()->id, 403);

        $cartItem->delete();

        return back()->with('message', 'Producto eliminado del carrito');
    }
}
