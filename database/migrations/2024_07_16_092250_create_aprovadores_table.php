<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::dropIfExists('aprovadores'); // Remove a tabela se ela existir

        Schema::create('aprovadores', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email');
            $table->unsignedBigInteger('setor_id');
            $table->unsignedBigInteger('id_user')->nullable();
            $table->boolean('isAprovador')->default(false);
            $table->timestamps();
            $table->foreign('setor_id')->references('id')->on('setores')->onDelete('cascade');
            $table->boolean('status')->default(false);
        });
    }

    public function down()
    {
        Schema::dropIfExists('aprovadores');
    }
};
