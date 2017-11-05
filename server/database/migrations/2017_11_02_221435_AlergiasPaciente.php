<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlergiasPaciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('AlergiasPaciente', function (Blueprint $table) {
        $table->increments('id');

        $table->integer('Medicamento_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();
        
        $table->foreign('Medicamento_id')->references('id')->on('Medicamento')->onDelete('cascade');
        $table->foreign('Paciente_id')->references('id')->on('Paciente')->onDelete('cascade');

        $table->rememberToken();
        $table->timestamps();
        $table->timestamp('deleted_at')->nullable();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('AlergiasPaciente');
    }
}