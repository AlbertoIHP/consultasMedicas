<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EnfermedadesCronicasPaciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('EnfermedadesCronicasPaciente', function (Blueprint $table) {
        $table->increments('id');
        $table->date("fechaDeteccion")->nullable();
        $table->text('observacion')->nullable();

        $table->integer('EnfermedadCronica_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();        

        $table->foreign('EnfermedadCronica_id')->references('id')->on('EnfermedadCronica')->onDelete('cascade');
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
        Schema::dropIfExists('EnfermedadesCronicasPaciente');
    }
}