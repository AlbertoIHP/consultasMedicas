<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlergiasComunesPaciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('AlergiasComunesPaciente', function (Blueprint $table) {
        $table->increments('id');
        $table->date("fechaDeteccion");

        $table->integer('Alergia_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();        

        $table->foreign('Alergia_id')->references('id')->on('Alergia')->onDelete('cascade');
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
        Schema::dropIfExists('AlergiasComunesPaciente');
    }
}
