<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class FilterUser extends Controller
{
    public function filteruser(Request $request)
    {/*
         'Departamento',
        'Gestor',
        */
        $filter = $request->input('filter');
        $users = User::where(function ($query) use ($filter) {
            $query->where('Nome', 'LIKE', "%$filter%")
                ->orWhere('Departamento', 'LIKE', "%$filter%")
                ->orWhere('Gestor', 'LIKE', "%$filter%");
        })->get();



        return response()->json(['message' =>  $users]);
    }
}
