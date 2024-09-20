<?php

namespace App\Http\Controllers;

use App\Models\Setor;
use App\Models\Aprovador;
use Illuminate\Http\Request;

class SetorController extends Controller
{
    public function indexSetores()
    {
        $setores = Setor::all();
        return response()->json($setores);
    }

    public function indexAprovadores()
    {
        $aprovadores = Aprovador::all();
        return response()->json($aprovadores);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:setores,nome',
            'DescricaoDepartamento' => 'nullable|string'
        ]);

        $setor = Setor::create([
            'nome' => $request->nome,
            'DescricaoDepartamento' => $request->DescricaoDepartamento
        ]);

        return response()->json(['id_setor' => $setor->id], 201);
    }
}
