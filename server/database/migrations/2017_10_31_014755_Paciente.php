<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Paciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Paciente', function (Blueprint $table) {
        $table->increments('id');

        $table->integer('Persona_id')->unsigned()->nullable();
        $table->integer('TipoSangre_id')->unsigned()->nullable();

        $table->foreign('Persona_id')->references('id')->on('Persona')->onDelete('cascade');
        $table->foreign('TipoSangre_id')->references('id')->on('TipoSangre')->onDelete('cascade');

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
        Schema::dropIfExists('Paciente');
    }
}