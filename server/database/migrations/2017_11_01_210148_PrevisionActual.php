<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PrevisionActual extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('PrevisionActual', function (Blueprint $table) {
        $table->increments('id');
        $table->date('fechaActualizacion');
        $table->integer('activado')->default(1);


        $table->integer('Prevision_id')->unsigned()->nullable();
        $table->integer('Persona_id')->unsigned()->nullable();        

        $table->foreign('Prevision_id')->references('id')->on('Prevision')->onDelete('cascade');
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
        Schema::dropIfExists('PrevisionActual');
    }
}