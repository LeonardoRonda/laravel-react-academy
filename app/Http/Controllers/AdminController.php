<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Delete all non-admin users.
     */
    public function destroyNonAdmins(Request $request)
    {
        // prevent deleting the currently authenticated admin accidentally
        $currentAdminId = $request->user()?->id;

        User::where('is_admin', false)->where('id', '!=', $currentAdminId)->delete();

        return Redirect::back()->with('message', 'Cuentas de usuarios no-admin eliminadas.');
    }
}
