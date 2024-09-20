<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class viewGestores extends Controller
{
    public function viewGestores(Request $request)
    {
        $usuarios = User::where('GestorCheck', true)
            ->orderBy('Nome')
            ->pluck('Nome');
        return response()->json(['message' => $usuarios]);
    }
}
