<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Departament;

class DepartamentSeeder extends Seeder
{
    public function run()
    {
        Departament::firstOrCreate([
            'NomeDoSetor' => 'Engenharia',
            'DescricaoDepartamento' => '',
            'EngenhariaComumEngenharia' => true,
            'Engenhariaengenharia' => true,
            'OuvidoriaAdministraoRH' => false,
            'TITOOLSTI' => false,
            'ReembolsoComumreembolso' => true,
            'ReembolsoGestorreembolso' => false,
            'ReembolsoContabilidadereembolso' => false,
            'ReembolsoAdministraoreembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'Comum',
            'DescricaoDepartamento' => 'Departamento de teste de usuários comuns',
            'EngenhariaComumEngenharia' => true,
            'Engenhariaengenharia' => false,
            'OuvidoriaAdministraoRH' => false,
            'TITOOLSTI' => false,
            'ReembolsoComumreembolso' => true,
            'ReembolsoGestorreembolso' => false,
            'ReembolsoContabilidadereembolso' => false,
            'ReembolsoAdministraoreembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'RH',
            'DescricaoDepartamento' => 'Recursos Humanos',
            'EngenhariaComumEngenharia' => false,
            'Engenhariaengenharia' => false,
            'OuvidoriaAdministraoRH' => true,
            'TITOOLSTI' => false,
            'ReembolsoComumreembolso' => false,
            'ReembolsoGestorreembolso' => false,
            'ReembolsoContabilidadereembolso' => false,
            'ReembolsoAdministraoreembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'TI',
            'DescricaoDepartamento' => 'Tecnologia da Informação',
            'EngenhariaComumEngenharia' => true,
            'Engenhariaengenharia' => true,
            'OuvidoriaAdministraoRH' => true,
            'TITOOLSTI' => true,
            'ReembolsoComumreembolso' => true,
            'ReembolsoGestorreembolso' => true,
            'ReembolsoContabilidadereembolso' => true,
            'ReembolsoAdministraoreembolso' => true,

        ]);
    }
}
