<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $orders = [];
        $favorites = [];

        if ($user) {
            $orders = $user->orders()->with(['orderItems.product'])->latest()->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'order_items' => $order->orderItems->map(function ($it) {
                        return [
                            'id' => $it->id,
                            'quantity' => $it->quantity,
                            'price' => $it->price,
                            'product' => $it->product ? [
                                'name' => $it->product->name,
                                'type' => $it->product->type,
                            ] : null,
                        ];
                    })->toArray(),
                ];
            })->toArray();

            $favorites = $user->favorites()->with('product.category')->latest()->get()->map(function ($fav) {
                return $fav->product ? [
                    'id' => $fav->id,
                    'product_id' => $fav->product->id,
                    'name' => $fav->product->name,
                    'slug' => $fav->product->slug,
                    'price' => $fav->product->price,
                    'image' => $fav->product->image,
                    'type' => $fav->product->type,
                    'category' => $fav->product->category?->name,
                ] : null;
            })->filter()->values()->toArray();
        }

        return Inertia::render('Profile/Index', [
            'purchases' => $orders,
            'favorites' => $favorites,
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        if ($request->is('profile')) {
            return Redirect::to('/profile');
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
