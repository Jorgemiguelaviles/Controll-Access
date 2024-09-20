<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;

class GroupController extends Controller
{
    public function groupControl(Request $request)
    {
        // Obter os parâmetros start e end da requisição
        $start = $request->query('start');
        $end = $request->query('end');
        $totalGroup = Departament::count();

        // Validar e definir um valor padrão para start e end, se não forem fornecidos
        $start = $start ? (int)$start : 0;
        $end = $end ? (int)$end : null;

        if ($end === null) {
            // Se start ou end não foram fornecidos, retornar todos os departamentos
            $departaments = Departament::all();
        } else {
            // Caso contrário, aplicar a paginação com base nos parâmetros start e end
            $departaments = Departament::skip($start)->take($end - $start)->orderBy('NomeDoSetor')->get();
        }

        return response()->json(['message' => $departaments, 'maxvalue' => $totalGroup, 'start' => $start, 'end' => $end]);
    }
}
