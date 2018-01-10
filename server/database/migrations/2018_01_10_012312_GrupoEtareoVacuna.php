<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GrupoEtareoVacuna extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('GrupoEtareoVacuna', function (Blueprint $table) {
        $table->increments('id');

        $table->integer('GrupoEtareo_id')->unsigned()->nullable();
        $table->integer('Vacuna_id')->unsigned()->nullable();        

        $table->foreign('GrupoEtareo_id')->references('id')->on('GrupoEtareo')->onDelete('cascade');
        $table->foreign('Vacuna_id')->references('id')->on('Vacuna')->onDelete('cascade');

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
        Schema::dropIfExists('GrupoEtareoVacuna');
    }
}
