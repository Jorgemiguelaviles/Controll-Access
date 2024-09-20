<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setor;
use App\Models\Aprovador;

class EditaAprovController extends Controller
{
    public function update(Request $request)
    {

        $mensagens = [
            'required' => 'O campo :attribute é obrigatório.',
            'exists' => 'O :attribute selecionado é inválido.',
            'string' => 'O campo :attribute deve ser uma string.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
            'email' => 'O campo :attribute deve ser um endereço de email válido.',
            'array' => 'O campo :attribute deve ser um array.',
        ];

        $grupoactive = $request->input('grupoactive');


        $regras = [
            'id' => !$grupoactive ? 'required|exists:setores,id' : 'sometimes|exists:setores,id',
            'nome' => !$grupoactive ? 'required|string|max:255' : 'sometimes|string|max:255',
            'DescricaoDepartamento' => !$grupoactive ? 'required|string|max:255' : 'sometimes|string|max:255',
            'aprovadores' => !$grupoactive ? 'required|array' : 'sometimes|array',
            'aprovadores.*.nome' => !$grupoactive ? 'required|string|max:255' : 'sometimes|string|max:255',
            'aprovadores.*.email' => !$grupoactive ? 'required|string|email|max:255' : 'sometimes|string|email|max:255',
            'aprovadores.*.id_user' => !$grupoactive ? 'required|integer' : 'sometimes|integer',
            'aprovadores.*.isAprovador' => !$grupoactive ? 'required|boolean' : 'sometimes|boolean',
            'comuns' => !$grupoactive ? 'required|array' : 'sometimes|array',
            'comuns.*.nome' => !$grupoactive ? 'required|string|max:255' : 'sometimes|string|max:255',
            'comuns.*.email' => !$grupoactive ? 'required|string|email|max:255' : 'sometimes|string|email|max:255',
            'comuns.*.id_user' => !$grupoactive ? 'required|integer' : 'sometimes|integer',
            'comuns.*.isAprovador' => !$grupoactive ? 'required|boolean' : 'sometimes|boolean',
        ];

        $data = $request->validate($regras, $mensagens);

        // Atualizar o setor
        $setor = Setor::findOrFail($data['id']);
        $setor->nome = $data['nome'];
        $setor->DescricaoDepartamento = $data['DescricaoDepartamento'];
        $setor->status = $grupoactive;
        $setor->save();

        // Atualizar aprovadores
        // Remove os aprovadores antigos
        Aprovador::where('setor_id', $setor->id)->delete();

        // Adiciona os novos aprovadores
        foreach ($data['aprovadores'] as $aprovadorData) {
            Aprovador::create([
                'nome' => $aprovadorData['nome'],
                'email' => $aprovadorData['email'],
                'setor_id' => $setor->id,
                'id_user' => $aprovadorData['id_user'],
                'isAprovador' => $aprovadorData['isAprovador'],
            ]);
        }

        // Adiciona os novos comuns
        foreach ($data['comuns'] as $comumData) {
            Aprovador::create([
                'nome' => $comumData['nome'],
                'email' => $comumData['email'],
                'setor_id' => $setor->id,
                'id_user' => $comumData['id_user'],
                'isAprovador' => $comumData['isAprovador'],
            ]);
        }

        return response()->json(['message' => 'Setor atualizado com sucesso.'], 201);
    }
}
