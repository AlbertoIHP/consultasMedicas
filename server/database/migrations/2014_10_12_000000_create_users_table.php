<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('Usuario', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Role', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('EstadoCivil', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Prevision', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('PrevisionActual', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('FichaMedica', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('Region', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Provincia', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('Comuna', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Genero', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('Persona', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
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
		Schema::table('Atention', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});

		Schema::table('Diagnostico', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Atention_has_Diagnostico', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});


		Schema::table('BoxConsulta', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('Receta', function (Blueprint $table) {
			$table->rememberToken();
			$table->timestamps();
			$table->timestamp('deleted_at')->nullable();

		});
		Schema::table('TipoBox', function (Blueprint $table) {
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
		Schema::table('Receta_has_Medicamento', function (Blueprint $table) {
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
		Schema::dropIfExists('users');
	}
}
