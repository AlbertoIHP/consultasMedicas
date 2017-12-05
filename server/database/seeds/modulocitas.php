<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class modulocitas extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Pendiente de confirmación',
        	'descripcion' => 'Hora agendada pero no confirmada',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Confirmada',
        	'descripcion' => 'El paciente ha confirmado la hora',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'No concretada',
        	'descripcion' => 'El paciente no concreta la cita al médico',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Concretada',
        	'descripcion' => 'El paciente ha asistido a la consulta médica',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Fonoaudiología',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Cardiología adulto',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Cardiología infantil',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Dermatología',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Reumatología',
        ]);

    }
}
