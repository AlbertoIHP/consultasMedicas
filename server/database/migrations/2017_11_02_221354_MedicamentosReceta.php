<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MedicamentosReceta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('MedicamentosReceta', function (Blueprint $table) {
        $table->increments('id');
        $table->string('dosis');
        $table->integer('cantidad');
        $table->integer('tiempo');
        $table->integer('intervalo');

        $table->integer('Medicamento_id')->unsigned()->nullable();
        $table->integer('ViaAdministracionMedicamento_id')->unsigned()->nullable();
        $table->integer('Receta_id')->unsigned()->nullable();
        
        $table->foreign('Medicamento_id')->references('id')->on('Medicamento')->onDelete('cascade');
        $table->foreign('ViaAdministracionMedicamento_id')->references('id')->on('ViaAdministracionMedicamento')->onDelete('cascade');
        $table->foreign('Receta_id')->references('id')->on('Receta')->onDelete('cascade');

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
        Schema::dropIfExists('MedicamentosReceta');
    }
}