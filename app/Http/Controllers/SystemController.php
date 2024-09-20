<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;
use App\Models\Acesso;

class SystemController extends Controller
{
    public function systemcontroll(Request $request)
    {

        // Obter os parâmetros start e end da requisição
        $start = $request->query('start');
        $end = $request->query('end');

        // Validar e definir um valor padrão para start e end, se não forem fornecidos
        $start = $start ? (int)$start : 0;
        $end = $end ? (int)$end : null;

        if ($end === null) {
            $system = System::all();
            $access = Acesso::all();
            return response()->json(['message' => [$system, $access]]);
        } else {
            $totalSystems = System::count();

            $system = System::skip($start)->take($end - $start)->orderBy('nome_do_sistema')->get();
            // Obter apenas os IDs dos sistemas
            $systemIds = $system->pluck('id');

            $access = Acesso::whereIn('system_id', $systemIds)->get();
            return response()->json(['message' => [$system, $access, $totalSystems, $systemIds, $start, $end]]);
        }
    }
}
