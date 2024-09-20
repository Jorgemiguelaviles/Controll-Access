<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Users extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Nome');
            $table->string('Chapa');
            $table->time('Horario_do_almoço');
            $table->string('Departamento');
            $table->string('PN')->nullable();
            $table->string('Gestor')->nullable();
            $table->string('CPF')->nullable();
            $table->string('rotaDaFoto')->nullable();
            $table->string('Usuario')->nullable();
            $table->string('Senha')->nullable();
            $table->string('Email')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('GestorCheck')->default(false);
            $table->boolean('EngenhariaComumEngenharia')->default(false);
            $table->boolean('Engenhariaengenharia')->default(false);
            $table->boolean('OuvidoriaAdministraoRH')->default(false);
            $table->boolean('TITOOLSTI')->default(false);
            $table->boolean('ReembolsoComumreembolso')->default(false);
            $table->boolean('ReembolsoGestorreembolso')->default(false);
            $table->boolean('ReembolsoContabilidadereembolso')->default(false);
            $table->boolean('ReembolsoAdministraoreembolso')->default(false);
            $table->unsignedBigInteger('id_departamento');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
