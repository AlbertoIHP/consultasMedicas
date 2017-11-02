<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PermisoModulo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('PermisoModulo', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('write')->default(1);
        $table->integer('delete')->default(1);
        $table->integer('update')->default(1);
        $table->integer('view')->default(1);

        $table->integer('Role_id')->unsigned()->nullable();
        $table->integer('Modulo_id')->unsigned()->nullable();

        $table->foreign('Role_id')->references('id')->on('Role')->onDelete('cascade');
        $table->foreign('Modulo_id')->references('id')->on('Modulo')->onDelete('cascade');

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
        Schema::dropIfExists('PermisoModulo');
    }
}