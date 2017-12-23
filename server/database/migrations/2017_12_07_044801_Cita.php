<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Cita extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Cita', function (Blueprint $table) {
        $table->increments('id');

        $table->integer('EstadoCita_id')->unsigned()->nullable();
        $table->integer('BoxConsulta_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();
        $table->integer('Medico_id')->unsigned()->nullable();
        $table->integer('Disponibilidad_id')->unsigned()->nullable();
        

        $table->foreign('EstadoCita_id')->references('id')->on('EstadoCita')->onDelete('cascade');
        $table->foreign('BoxConsulta_id')->references('id')->on('BoxConsulta')->onDelete('cascade');
        $table->foreign('Paciente_id')->references('id')->on('Paciente')->onDelete('cascade');
        $table->foreign('Medico_id')->references('id')->on('Medico')->onDelete('cascade');
        $table->foreign('Disponibilidad_id')->references('id')->on('Disponibilidad')->onDelete('cascade');

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
        Schema::dropIfExists('Cita');
    }
}