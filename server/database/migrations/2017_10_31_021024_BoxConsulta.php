<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BoxConsulta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('BoxConsulta', function (Blueprint $table) {
        $table->increments('id');
        $table->string('ubicacion');

        $table->integer('TipoBox_id')->unsigned()->nullable();

        $table->foreign('TipoBox_id')->references('id')->on('TipoBox')->onDelete('cascade');


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
        Schema::dropIfExists('BoxConsulta');
    }
}