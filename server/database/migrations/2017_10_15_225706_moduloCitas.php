<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModuloCitas extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('Doctor', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Especialidad', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Cita', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('EstadoCita', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('UniversidadesComuna', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('Universidad', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('BoxConsulta', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('TipoBox', function (Blueprint $table) {
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
