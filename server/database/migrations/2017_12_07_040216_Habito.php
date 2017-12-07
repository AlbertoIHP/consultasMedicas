<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Habito extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Habito', function (Blueprint $table) {
        $table->increments('id');
        $table->string('nombre');

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
        Schema::dropIfExists('Habito');
    }
}
