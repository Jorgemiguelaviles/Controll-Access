<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function usercontroll(Request $request)
    {

        // Obter os parâmetros start e end da requisição
        $start = $request->query('start');
        $end = $request->query('end');
        $totalUser = User::count();

        // Validar e definir um valor padrão para start e end, se não forem fornecidos
        $start = $start ? (int)$start : 0;
        $end = $end ? (int)$end : null;

        if ($end === null) {
            // Se start ou end não foram fornecidos, retornar todos os departamentos
            $usuarios = User::all();
        } else {
            // Caso contrário, aplicar a paginação com base nos parâmetros start e end
            $usuarios = User::skip($start)->take($end - $start)->orderBy('Nome')->get();
        }

        return response()->json(['message' => $usuarios, 'maxvalue' => $totalUser, 'start' => $start,  'end' => $end]);
    }
}
