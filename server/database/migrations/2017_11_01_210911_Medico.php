<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Medico extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Medico', function (Blueprint $table) {
        $table->increments('id');

        $table->integer('Especialidad_id')->unsigned()->nullable();
        $table->integer('Persona_id')->unsigned()->nullable(); 

        $table->foreign('Especialidad_id')->references('id')->on('Especialidad')->onDelete('cascade');
        $table->foreign('Persona_id')->references('id')->on('Persona')->onDelete('cascade');

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
        Schema::dropIfExists('Medico');
    }
}