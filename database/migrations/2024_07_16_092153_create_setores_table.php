<?php

// Migration para a tabela de setores
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSetoresTable extends Migration
{
    public function up()
    {
        Schema::create('setores', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->text('DescricaoDepartamento')->nullable();
            $table->timestamps();
            $table->boolean('status')->default(false);
        });
    }

    public function down()
    {
        Schema::dropIfExists('setores');
    }
}
