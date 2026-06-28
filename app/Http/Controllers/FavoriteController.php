<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $favorite = Favorite::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return back()->with('message', 'Eliminado de favoritos');
        }

        Favorite::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        return back()->with('message', 'Añadido a favoritos');
    }
}
