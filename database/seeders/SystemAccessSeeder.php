<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acesso;
use App\Models\System;

class SystemAccessSeeder extends Seeder
{
    public function run()
    {
        $engenhariaSystem = System::where('nome_do_sistema', 'Engenharia')->first();
        $ouvidoriaSystem = System::where('nome_do_sistema', 'Ouvidoria')->first();
        $tiToolsSystem = System::where('nome_do_sistema', 'TITOOLS')->first();
        $reembolsoSystem = System::where('nome_do_sistema', 'Reembolso')->first();

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Comum Engenharia',
            'system_id' => $engenhariaSystem->id,
            'acesso' => 'EngenhariaComumEngenharia'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'engenharia',
            'system_id' => $engenhariaSystem->id,
            'acesso' => 'Engenhariaengenharia'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Administração RH',
            'system_id' => $ouvidoriaSystem->id,
            'acesso' => 'OuvidoriaAdministraoRH'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'TI',
            'system_id' => $tiToolsSystem->id,
            'acesso' => 'TITOOLSTI'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Comum reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ReembolsoComumreembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Gestor reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ReembolsoGestorreembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Contabilidade reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ReembolsoContabilidadereembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Administração reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ReembolsoAdministraoreembolso'
        ]);
    }
}
