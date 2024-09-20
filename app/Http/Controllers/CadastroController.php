<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setor;
use App\Models\Aprovador;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CadastroController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Validar os dados recebidos do cliente
            $validator = Validator::make($request->all(), [
                'nome' => 'required|string|max:255',
                'DescricaoDepartamento' => 'required|string|max:255',
                'aprovadores' => 'required|array',
                'aprovadores.*.nome' => 'required|string|max:255',
                'aprovadores.*.email' => 'required|email|max:255',
                'aprovadores.*.id_user' => 'required|integer',
                'comuns' => 'required|array',
                'comuns.*.nome' => 'required|string|max:255',
                'comuns.*.email' => 'required|email|max:255',
                'comuns.*.id_user' => 'required|integer',
            ]);

            // Verificar se houve erros de validação
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Criação do setor
            $setor = Setor::create([
                'nome' => $request->nome,
                'DescricaoDepartamento' => $request->DescricaoDepartamento,
            ]);

            // Criação dos aprovadores associados ao setor
            $aprovadores = [];
            foreach ($request->aprovadores as $aprovadorData) {
                $aprovador = new Aprovador([
                    'nome' => $aprovadorData['nome'],
                    'email' => $aprovadorData['email'],
                    'id_user' => $aprovadorData['id_user'],
                    'isAprovador' => true,
                ]);
                $setor->aprovadores()->save($aprovador);
                $aprovadores[] = $aprovador;
            }

            // Criação dos comuns associados ao setor
            $comuns = [];
            foreach ($request->comuns as $comumData) {
                $comum = new Aprovador([
                    'nome' => $comumData['nome'],
                    'email' => $comumData['email'],
                    'id_user' => $comumData['id_user'],
                    'isAprovador' => false,
                ]);
                $setor->aprovadores()->save($comum);
                $comuns[] = $comum;
            }

            DB::commit();

            return response()->json([
                'message' => 'Grupo de Aprovadores, Criado com Sucesso.',
                'setor' => $setor,
                'aprovadores' => $aprovadores,
                'comuns' => $comuns
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Falha ao Criar Grupo de Aprovadores.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
