<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Persona extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Persona', function (Blueprint $table) {
        $table->increments('id');
        $table->string('rut');
        $table->string('nombre1');
        $table->string('nombre2');
        $table->string('apellido1');
        $table->string('apellido2');
        $table->string('fono_casa');
        $table->string('fono_trabajo');
        $table->string('movil');
        $table->integer('estado')->default(1);
        $table->date('fechaNacimiento');

        $table->integer('Genero_id')->unsigned()->nullable();
        $table->integer('Comuna_id')->unsigned()->nullable();
        $table->integer('EstadoCivil_id')->unsigned()->nullable();
        
        $table->foreign('Genero_id')->references('id')->on('Genero')->onDelete('cascade');
        $table->foreign('Comuna_id')->references('id')->on('Comuna')->onDelete('cascade');
        $table->foreign('EstadoCivil_id')->references('id')->on('EstadoCivil')->onDelete('cascade');

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
        Schema::dropIfExists('Persona');
    }
}