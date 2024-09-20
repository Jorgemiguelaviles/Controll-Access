<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;
use App\Models\User;

class EditGroupController extends Controller
{
    public function editgroupcontroller(Request $request)
    {

        // Função para formatar uma string
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



        // Defini  o das mensagens de valida  o
        $mensagens = [
            'required' => 'O campo :attribute   obrigat rio.',
            'unique' => 'O campo :attribute j  est  em uso.',
            'array' => 'O campo :attribute deve ser um array.',
            'tiposDeAcesso.required' => '  necess rio pelo menos um tipo de acesso.',
            'tiposDeAcesso.*.required' => 'Todos os tipos de acesso s o obrigat rios.',
            'tiposDeAcesso.*.unique' => 'J  existe um tipo de acesso com o mesmo nome para este sistema.',
            // Adicione mais mensagens conforme necess rio
        ];

        // Obt m o StatusAlterActive do request
        $StatusAlterActive = $request->input('StatusAlterActive');

        // Valida  o condicional
        if (!$StatusAlterActive) {
            $request->validate([
                'nomeDoGrupo' => 'required',
                'descricaoDoGrupo' => 'nullable',
                // Adicione outras regras conforme necess rio
            ], $mensagens);
        }

        // Verificar se os campos existem
        $nomeDoGrupo = $request->has('nomeDoGrupo') ? $request->input('nomeDoGrupo') : null;
        $descricaoDoGrupo = $request->has('descricaoDoGrupo') ? $request->input('descricaoDoGrupo') : null;
        $listSecondary = $request->has('listSecondary') ? $request->input('listSecondary') : [];
        $systemStatusSecondary = $request->has('systemStatusSecondary') ? $request->input('systemStatusSecondary') : [];
        $database = $request->has('database') ? $request->input('database') : [];
        $chave = $request->has('chave') ? $request->input('chave') : null;
        $statusGroup = $request->has('statusGroup') ? $request->input('statusGroup') : null;
        $listMain = $request->has('listMain') ? $request->input('listMain') : null;
        $all = $request->all();
        $dadosgrupo = $request['dadosgrupo'];
        $id =  $dadosgrupo['id'];


        // Verifica se h  usu rios no grupo e se est  tentando desativar o grupo
        if ($this->hasUsersInGroup($chave) && $statusGroup === false) {
            return response()->json(['error' => 'Impossivel desabilitar o grupo. Existem usu rios no mesmo.'], 400);
        }

        // Modifica o departamento dos usu rios caso o nome do grupo tenha sido alterado
        if ($this->hasUsersInGroup($chave) && $chave != $nomeDoGrupo) {
            $this->modifyUsersInGroup($chave, $nomeDoGrupo);
        }

        // Recupera o sistema pelo ID
        $system = Departament::find($id);

        if ($system) {
            // Atualiza os dados do sistema
            $system->NomeDoSetor = $nomeDoGrupo;
            $system->DescricaoDepartamento = $descricaoDoGrupo;
            $system->status = $statusGroup;

            //return response()->json(['message' => $systemStatusSecondary]);
            // Atualiza as permiss es de acesso do sistema

            $combinacoes = [];

            //return response()->json(['message' => $database]);

            foreach ($listMain as $indice1 => $nome1) {


                foreach ($listSecondary as $indice2 => $nome2) {
                    $combinacao = combineAndFormatStrings($nome1,  $nome2);
                    $combinacoes[] = $combinacao;



                    if ($database[$indice2]['acesso'] === $combinacao) {
                        $system->{$database[$indice2]['acesso']} = $systemStatusSecondary[$indice2 + 1];
                    }
                }
            }

            $system->save();

            return response()->json(['message' => 'Sistema atualizado com sucesso']);
        } else {
            return response()->json(['error' => 'Sistema n o encontrado'], 404);
        }
    }

    // M todo para verificar se h  usu rios no grupo
    private function hasUsersInGroup($groupName)
    {
        // Verifique se h  usu rios na tabela User com o departamento correspondente
        return User::where('Departamento', $groupName)->exists();
    }

    // M todo para modificar o departamento dos usu rios em um grupo
    private function modifyUsersInGroup($groupName, $newGroupName)
    {
        // Recupera todos os usu rios com o departamento correspondente
        $usersToUpdate = User::where('Departamento', $groupName)->get();

        // Verifica se h  usu rios para atualizar
        if ($usersToUpdate->isNotEmpty()) {
            // Atualiza o departamento para o novo grupo
            foreach ($usersToUpdate as $user) {
                $user->Departamento = $newGroupName;
                $user->save();
            }

            return true; // Usu rios atualizados com sucesso
        } else {
            return false; // Nenhum usu rio encontrado para atualizar
        }
    }
}
