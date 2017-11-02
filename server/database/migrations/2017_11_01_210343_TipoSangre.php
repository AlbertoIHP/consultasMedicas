<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TipoSangre extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TipoSangre', function (Blueprint $table) {
        $table->increments('id');
        $table->string('nombre');
        $table->text('descripcion');
        
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
        Schema::dropIfExists('TipoSangre');
    }
}