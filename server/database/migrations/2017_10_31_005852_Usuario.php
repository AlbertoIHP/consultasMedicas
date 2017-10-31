<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Usuario extends Migration
    {
        Schema::create('Usuario', function (Blueprint $table) {
        $table->increments('id');
        $table->string('email');
        $table->string('password');

        $table->integer('Role_id')->unsigned()->nullable();
        $table->integer('Persona_id')->unsigned()->nullable();        

        $table->foreign('Role_id')->references('id')->on('Role')->onDelete('cascade');
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
        Schema::dropIfExists('Usuario');
    }
}