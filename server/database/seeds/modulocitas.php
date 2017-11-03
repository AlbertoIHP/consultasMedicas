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
        DB::table('TipoBox')->insert([
        	'nombre' => 'Cardiología',
        	'descripcion' => 'Afecciones al corazón',
        ]);
        DB::table('TipoBox')->insert([
        	'nombre' => 'Broncopulmonar adulto',
        	'descripcion' => 'Afecciones al sistema respiratorio para',
        ]);
        DB::table('BoxConsulta')->insert([
        	'ubicacion' => 'Segundo Piso 213',
        	'TipoBox_id' => 1,
        ]);
        DB::table('BoxConsulta')->insert([
        	'ubicacion' => 'Tercer piso 312',
        	'TipoBox_id' => 2,
        ]);
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
        DB::table('Medico')->insert([
        	'Especialidad_id' => 2,
        	'Persona_id' => 3,
        ]);
        DB::table('Cita')->insert([
        	'fecha' => Carbon::create('2017', '09', '09'),
        	'hora' => '10:30',
        	'EstadoCita_id' => 3,
        	'BoxConsulta_id' => 1,
        	'Paciente_id' => 1,
        	'Medico_id' => 1,
        ]);
        DB::table('Cita')->insert([
        	'fecha' => Carbon::create('2017', '10', '10'),
        	'hora' => '16:30',
        	'EstadoCita_id' => 4,
        	'BoxConsulta_id' => 1,
        	'Paciente_id' => 1,
        	'Medico_id' => 1,
        ]);
        DB::table('Cita')->insert([
        	'fecha' => Carbon::create('2017', '10', '11'),
        	'hora' => '09:30',
        	'EstadoCita_id' => 2,
        	'BoxConsulta_id' => 1,
        	'Paciente_id' => 1,
        	'Medico_id' => 1,
        ]);
        DB::table('Cita')->insert([
        	'fecha' => Carbon::create('2017', '11', '11'),
        	'hora' => '15:30',
        	'EstadoCita_id' => 1,
        	'BoxConsulta_id' => 1,
        	'Paciente_id' => 1,
        	'Medico_id' => 1,
        ]);
    }
}
