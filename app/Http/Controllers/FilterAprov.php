<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setor;

class FilterAprov extends Controller
{
    public function Filteraprov(Request $request)
    {


        $filter = $request->input('filter');
        $sistemas = Setor::where('nome', 'LIKE', "%$filter%")->get();




        return response()->json(['message' =>  $sistemas]);
    }
}
