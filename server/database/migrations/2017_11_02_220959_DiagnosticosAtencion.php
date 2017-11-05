<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DiagnosticosAtencion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DiagnosticosAtencion', function (Blueprint $table) {
        $table->increments('id');
        $table->longText('Observacion');

        $table->integer('Atencion_id')->unsigned()->nullable();
        $table->integer('Diagnostico_id')->unsigned()->nullable();
        
        $table->foreign('Atencion_id')->references('id')->on('Atencion')->onDelete('cascade');
        $table->foreign('Diagnostico_id')->references('id')->on('Diagnostico')->onDelete('cascade');

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
        Schema::dropIfExists('DiagnosticosAtencion');
    }
}