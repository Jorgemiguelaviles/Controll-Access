<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Departaments extends Migration
{
    public function up()
    {
        Schema::create('departaments', function (Blueprint $table) {
            $table->id();
            $table->string('NomeDoSetor');
            $table->text('DescricaoDepartamento')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('EngenhariaComumEngenharia')->default(false);
            $table->boolean('Engenhariaengenharia')->default(false);
            $table->boolean('OuvidoriaAdministraoRH')->default(false);
            $table->boolean('ReembolsoComumreembolso')->default(false);
            $table->boolean('ReembolsoGestorreembolso')->default(false);
            $table->boolean('ReembolsoContabilidadereembolso')->default(false);
            $table->boolean('ReembolsoAdministraoreembolso')->default(false);
            $table->boolean('TITOOLSTI')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('departaments');
    }
}
