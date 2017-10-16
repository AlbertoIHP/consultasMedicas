<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModuloAtencion extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('Atencion', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('Diagnostico', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('DiagnosticosAtencion', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('Receta', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('Medicamento', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('ViaAdministracionMedicamento', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('MedicamentosReceta', function (Blueprint $table) {
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
		//
	}
}
