<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Atencion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Atencion', function (Blueprint $table) {
        $table->increments('id');
        $table->string('peso');
        $table->string('estatura');
        $table->integer('calificacion');

        $table->integer('BoxConsulta_id')->unsigned()->nullable();
        $table->integer('Cita_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();
        
        $table->foreign('BoxConsulta_id')->references('id')->on('BoxConsulta')->onDelete('cascade');
        $table->foreign('Cita_id')->references('id')->on('Cita')->onDelete('cascade');
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
        Schema::dropIfExists('Atencion');
    }
}