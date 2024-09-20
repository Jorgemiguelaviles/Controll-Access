<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class EditUserController extends Controller
{
    public function editusercontroller(Request $request)
    {

        function formatString($string)
        {
            // Remove caracteres especiais
            $string = preg_replace('/[^a-zA-Z_]/', '', $string);

            // Remove espaços
            $string = str_replace(' ', '', $string);

            return $string;
        }

        // Função para combinar e formatar strings
        function combineAndFormatStrings($string1, $string2)
        {
            $formattedString1 = formatString($string1);
            $formattedString2 = formatString($string2);

            // Junte as strings
            $combinedString = $formattedString1 . $formattedString2;

            return $combinedString;
        }

        try {

            $database = $request->input('database');
            $idEdit = $database['3']['id'];

            $validator = Validator::make($request->all(), [
                'nome' => 'required|unique:users,nome,' . $idEdit, // Nome obrigatório e único
                'chapa' => 'required|unique:users,chapa,' . $idEdit, // Chapa obrigatória e única
                'horarioDoAlmoco' => 'required', // Horário do almoço obrigatório
                'grupo' => 'required', // Grupo obrigatório
                'CPF' => 'nullable|unique:users,CPF,' . $idEdit, // CPF único (pode ser nulo)
                'usuario' => 'nullable|unique:users,usuario,' . $idEdit, // Usuário único (pode ser nulo)
                'senha' => 'nullable', // Senha opcional
                'tipo' => 'nullable', // Tipo opcional
                // Adicione outras validações conforme necessário
            ], [
                'nome.required' => 'O campo nome é obrigatório.',
                'nome.unique' => 'O nome informado já está em uso.',
                'chapa.required' => 'O campo chapa é obrigatório.',
                'chapa.unique' => 'A chapa informada já está em uso.',
                'horarioDoAlmoco.required' => 'O campo horário do almoço é obrigatório.',
                'grupo.required' => 'O campo grupo é obrigatório.',
                'CPF.unique' => 'O CPF informado já está em uso.',
                'usuario.unique' => 'O usuário informado já está em uso.',
                // Adicione outras mensagens conforme necessário
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors()->all();
                return response()->json(['errors' => $errors], 422);
            }


            $status = $request->input('status');
            $initstatus = $request->input('initstatus');
            $isGestor = $request->input('isGestor');
            $isGestorInit = $request->input('isGestorInit');
            $isAprovador = $request->input('isAprovador');
            $isAprovadorInit = $request->input('isAprovadorInit');





            $system = User::find($idEdit);
            if (!$system) {
                return response()->json(['message' => 'Sistema não encontrado.'], 404);
            }

            //return response()->json(['errors' => $idEdit]);

            // Obter dados do request
            $nome = $request->input('nome');
            $nomeorigem = $request->input('nomeorigem');
            $chapa = $request->input('chapa');
            $PN = $request->input('PN');
            $horarioDoAlmoco = $request->input('horarioDoAlmoco');
            $grupo = $request->input('grupo');
            $gestorResponsavel = $request->input('gestorResponsavel');
            $CPF = $request->input('CPF');
            $usuario = $request->input('usuario');
            $senha = $request->input('senha');
            $name = $request->input('tipo');
            $listSecondary = $request->input('listSecondary');
            $listMain =  $request->input('listMain');
            $systemStatusSecondary = $request->input('systemStatusSecondary');




            $email = $request->input('email');

            $all = $request->all('');


            if (is_null($isGestor)) {
                $isGestor = false;
            }


            if (is_null($isAprovador)) {
                $isAprovador = false;
            }



            foreach ($database['2']['message'] as $item) {
                if ($item['NomeDoSetor'] ===  $grupo) {
                    $id_departament = $item['id'];
                    break;
                }
            }




            if ($nomeorigem != $nome) {
                $registros = User::where('Gestor', $nomeorigem)->get();
                foreach ($registros as $registro) {
                    // Atualiza o campo "Gestor" para $nome
                    $registro->Gestor = $nome;
                    $registro->save();
                }
            }

            $system->Nome = $nome;
            $system->Chapa = $chapa;
            $system->PN = $PN;
            $system->Horario_do_almoço = $horarioDoAlmoco;
            $system->Departamento = $grupo;
            $system->Gestor = $gestorResponsavel;
            $system->CPF = $CPF;
            $system->Usuario = $usuario;
            $system->GestorCheck = $isGestor;
            $system->AprovadorCheck = $isAprovador;
            $system->Email = $email;
            $system->status = $status;


            // Verifica se a senha não está vazia antes de atribuí-la
            if (isset($senha) && $senha !== '') {
                $system->Senha = password_hash($senha, PASSWORD_DEFAULT);
            }


            $system->rotaDaFoto = isset($name) ? "js/assets/Armazenamentophotos/{$name}" : null;

            $system->save();


            $fotoBase64 = $request->input('photo');
            if ($fotoBase64) {
                // Converta a foto de base64 para o formato de arquivo de imagem
                list($type, $fotoBase64) = explode(';', $fotoBase64);
                list(, $fotoBase64) = explode(',', $fotoBase64);
                $foto = base64_decode($fotoBase64);

                // Caminho para o diretório onde as fotos serão armazenadas
                $diretorioFotos = 'js/assets/Armazenamentophotos/';

                // Verifique se o diretório de fotos existe, caso contrário, crie-o
                if (!file_exists($diretorioFotos) && !is_dir($diretorioFotos)) {
                    if (!mkdir($diretorioFotos, 0777, true)) {
                        // Se a criação do diretório falhar, trate o erro
                        throw new \Exception('Falha ao criar o diretório de destino');
                    }
                }

                // Gere um nome único para a foto
                $nomeFoto = uniqid() . '.png'; // ou qualquer extensão de imagem que você esteja usando

                // Salve a foto no diretório de fotos
                file_put_contents($diretorioFotos . $nomeFoto, $foto);

                // Atualize o campo 'rotaDaFoto' no banco de dados com o caminho da foto
                $system->rotaDaFoto = $diretorioFotos . $nomeFoto;

                // Salvar o modelo no banco de dados com o caminho da foto
                $system->save();
            }

            $count = count($database['1']);
            $listi = [];

            //return response()->json(['message' =>  $database[1]]);


            foreach ($listMain as $indice1 => $nome1) {
                foreach ($listSecondary as $indice2 => $nome2) {
                    $combinacao = combineAndFormatStrings($nome1,  $nome2);
                    if ($database[1][$indice2]['acesso'] === $combinacao) {
                        $system->{$database[1][$indice2]['acesso']} = $systemStatusSecondary[$indice2 + 1];
                    }
                }
            }


            $system->save();

            return response()->json(['message' =>  'Usuário atualizdo com sucesso']);
        } catch (\Exception $e) {
            // Captura qualquer outra exceção e retorna uma resposta de erro
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
