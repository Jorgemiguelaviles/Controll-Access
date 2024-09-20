<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;
use App\Models\Acesso;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CreateSystemController extends Controller
{
    public function createsystemcontroller(Request $request)
    {
        function formatString($string)
        {
            // Remove caracteres especiais
            $string = preg_replace('/[^a-zA-Z_]/', '', $string);

            // Remove espaços
            $string = str_replace(' ', '', $string);

            return $string;
        }

        function combineAndFormatStrings($string1, $string2)
        {
            $formattedString1 = formatString($string1);
            $formattedString2 = formatString($string2);

            // Junte as strings
            $combinedString = $formattedString1 . $formattedString2;

            return $combinedString;
        }

        $mensagens = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O campo :attribute já está em uso.',
            'array' => 'O campo :attribute deve ser um array.',
            'tiposDeAcesso.required' => 'É necessário pelo menos um tipo de acesso.',
            'tiposDeAcesso.*.required' => 'Todos os tipos de acesso são obrigatórios.',
            'tiposDeAcesso.*.unique' => 'Já existe um tipo de acesso com o mesmo nome para este sistema.',
            // Adicione mais mensagens conforme necessário
        ];

        try {
            // Validar os dados de entrada
            $request->validate([
                'nomeDoSistema' => ['required', 'unique:systems,nome_do_sistema', 'regex:/^\D.*$/'],
                'descricaoDoSistema' => ['nullable'],
                'imagem' => 'required',
                'tiposDeAcesso' => 'required',

            ], $mensagens);


            $tiposDeAcesso = $request->input('tiposDeAcesso');
            $tiposDeAcesso = explode(",", $tiposDeAcesso);

            foreach ($tiposDeAcesso as $tipoDeAcesso) {
                Validator::make(['tiposDeAcesso' => $tipoDeAcesso], [
                    'tiposDeAcesso' => ['required', 'unique:acessos,nome_do_acesso', 'regex:/^\D.*$/']
                ])->validate();
            }





            // Se a validação passar, prossiga com o restante do código

            $tiposDeAcesso = $request->input('tiposDeAcesso');
            $tiposDeAcesso = explode(",", $tiposDeAcesso);
            $all = $request->all();
            $nomeDoSistema = $request->input('nomeDoSistema');

            $existingSystem = System::where('nome_do_sistema', $nomeDoSistema)->first();

            /*if ($existingSystem) {
                return response()->json(['error' => 'Sistema já foi criado, favor reiniciar a página'], 422);
            }*/


            $descricaoDoSistema = $request->input('descricaoDoSistema');
            $url = $request->input('url');

            $imagem = $_FILES['imagem'] ?? null;





            $tmp_name_imagem = $imagem['tmp_name'];







            $diretorio_imagem = '/var/www/html/imgs/';
            $diretorio_video = '/var/www/html/Videos/';
            $rota_banco_image = 'https://alpinacloud.com.br/imgs/';



            $name_image = date('YmdHis') . '_' . uniqid() . '_' . rand(1000, 9999) . '.' . pathinfo($imagem['name'], PATHINFO_EXTENSION);





            $caminho_destino_imagem =  $diretorio_imagem . $name_image;



            $caminho_destino_imagem_data = $rota_banco_image . $name_image;



            move_uploaded_file($tmp_name_imagem, $caminho_destino_imagem);




            // Verifica se a URL existe
            $url = isset($url) ? $url : null;

            // Campos padr�o para cria��o do modelo
            $campos = [
                'nome_do_sistema' => $nomeDoSistema,
                'descricao' => $descricaoDoSistema,
                'status' => true,
                'imagens' =>  $caminho_destino_imagem_data,
            ];

            // Adiciona a URL aos campos, se existir
            if ($url !== null) {
                $campos['url'] = $url;
            }

            // Verifica se o sistema j� existe
            $system = System::firstOrCreate($campos);

            // Obtém o ID do sistema
            $systemID = $system->id;

            $comprimento = count($tiposDeAcesso);

            for ($i = 0; $i < $comprimento; $i++) {
                $nomeAcessoCamelCase = combineAndFormatStrings($nomeDoSistema, $tiposDeAcesso[$i]);

                // Adiciona a coluna na tabela Departament se ainda não existir
                if (!Schema::hasColumn('departaments', $nomeAcessoCamelCase)) {
                    Schema::table('departaments', function ($table) use ($nomeAcessoCamelCase) {
                        $table->boolean($nomeAcessoCamelCase)->default(false);
                    });
                }

                // Adiciona a coluna na tabela User se ainda não existir
                if (!Schema::hasColumn('users', $nomeAcessoCamelCase)) {
                    Schema::table('users', function ($table) use ($nomeAcessoCamelCase) {
                        $table->boolean($nomeAcessoCamelCase)->default(false);
                    });
                }

                // Cria ou obtém o acesso
                Acesso::firstOrCreate([
                    'nome_do_acesso' => $tiposDeAcesso[$i],
                    'system_id' =>  $systemID,
                    'acesso' => $nomeAcessoCamelCase,
                ]);
            }

            return response()->json(['message' => 'Atualização realizada com sucesso']);
        } catch (ValidationException $exception) {
            // Captura a exceção de validação e retorna uma resposta de erro personalizada
            $errorMessages = 'Sistema ja foi criado favor reiniciar a página';
            return response()->json(['error' => $exception], 422);
        }
    }
}
