<?php

namespace App\Http\Controllers;

use App\Models\Setor;
use App\Models\Aprovador;
use Illuminate\Http\Request;

class SetorAprovadorController extends Controller
{
    // Método para exibir setores e seus aprovadores em cards
    public function index()
    {
        $setores = Setor::with('aprovadores')->get();
        return view('setores_aprovadores.index', compact('setores'));
    }

    // Método para editar um setor e seus aprovadores
    public function edit($id)
    {
        $setor = Setor::with('aprovadores')->findOrFail($id);
        return view('setores_aprovadores.edit', compact('setor'));
    }

    // Método para atualizar um setor
    public function updateSetor(Request $request, $id)
    {
        $setor = Setor::findOrFail($id);

        $request->validate([
            'nome' => 'required|unique:setores,nome,' . $setor->id,
            'DescricaoDepartamento' => 'nullable|string',
        ]);

        $setor->update($request->all());

        return redirect()->route('setores_aprovadores.index')->with('success', 'Setor atualizado com sucesso.');
    }

    // Método para atualizar um aprovador
    public function updateAprovador(Request $request, $id)
    {
        $aprovador = Aprovador::findOrFail($id);

        $request->validate([
            'nome' => 'required',
            'email' => 'required|unique:aprovadores,email,' . $aprovador->id . '|email',
        ]);

        $aprovador->update($request->all());

        return redirect()->route('setores_aprovadores.index')->with('success', 'Aprovador atualizado com sucesso.');
    }
}
