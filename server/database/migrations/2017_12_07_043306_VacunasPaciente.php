<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VacunasPaciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('VacunasPaciente', function (Blueprint $table) {
        $table->increments('id');
        $table->date("fechaVacunacion")->nullable();

        $table->integer('Vacuna_id')->unsigned()->nullable();
        $table->integer('Paciente_id')->unsigned()->nullable();        

        $table->foreign('Vacuna_id')->references('id')->on('Vacuna')->onDelete('cascade');
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
        Schema::dropIfExists('VacunasPaciente');
    }
}
