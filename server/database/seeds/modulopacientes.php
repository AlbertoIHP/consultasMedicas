<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class modulopacientes extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('Genero')->insert([
			'descripcion' => 'Mujer',
			'nombre' =>'Mujer',
		]);
		DB::table('Genero')->insert([
			'descripcion' => 'Hombre',
			'nombre' =>'Hombre',
		]);

		DB::table('Region')->insert([
			'nombre' =>'Region Meropolitana',
		]);








		DB::table('Provincia')->insert([
			'nombre' =>'Provincia de Arica',
			'Region_id' => 1,
		]);




		DB::table('Comuna')->insert([
			'nombre' =>'Comuna de Arica',
			'Provincia_id' => 1,
		]);






		DB::table('EstadoCivil')->insert([
			'nombre' =>'Hijo/a',
			'descripcion' => 'se acredita con el certificado de nacimiento.',
		]);

		DB::table('EstadoCivil')->insert([
			'nombre' =>'Padre o Madre',
			'descripcion' => 'se acredita con el certificado de nacimiento.',
		]);
		DB::table('EstadoCivil')->insert([
			'nombre' =>'Soltero/a',
			'descripcion' => 'no existe un certificado para acreditar este estado civil. Se puede acreditar con una declaración jurada ante un notario público.',
		]);
		DB::table('EstadoCivil')->insert([
			'nombre' =>'Casado/a',
			'descripcion' => 'se acredita con el certificado de matrimonio.',
		]);

		DB::table('EstadoCivil')->insert([
			'nombre' =>'Viudo/a',
			'descripcion' => 'se acredita con el certificado de matrimonio y el certificado de defunción.',
		]);

		DB::table('EstadoCivil')->insert([
			'nombre' =>'Divorciado/a',
			'descripcion' => 'se acredita con el certificado de matrimonio, el cual debe contener la subinscripción de la sentencia judicial que declara el divorcio.',
		]);

		DB::table('EstadoCivil')->insert([
			'nombre' =>'Separado/a',
			'descripcion' => 'Sólo en el caso de declararse judicialmente la separación, se acredita con la sentencia respectiva.',
		]);

		DB::table('EstadoCivil')->insert([
			'nombre' =>'Conviviente',
			'descripcion' => 'Se acredita con el certificado de conviviente emitido por el Registro civil.',
		]);

		DB::table('Prevision')->insert([
			'nombre' =>'FONASA',
			'descripcion' => 'Opera a través de un Seguro Social de Salud administrado por Fondo Nacional de Salud (FONASA). Sobre la base de un esquema de reparto, que se financia con el aporte de sus trabajadores/as y con recursos del Estado, provenientes de los impuestos generales de la nación. La cobertura que otorga este esquema son los mismos para todos los afiliados, independiente del monto de la cotización y del tamaño del grupo familiar cubierto.',
		]);

		DB::table('Prevision')->insert([
			'nombre' =>'ISAPRE',
			'descripcion' => 'La ISAPRE opera como un sistema de seguros de salud basado en contratos individuales, en el que los beneficios otorgados obedecen directamente al plan contratado que dependen del sexo, la edad, preexistencia de enfermedades, etc. de sus afiliados.',
		]);






		DB::table('Role')->insert([
			'nombre' =>'Jefatura',
		]);

		DB::table('Role')->insert([
			'nombre' =>'Administrador',
		]);

		DB::table('Role')->insert([
			'nombre' =>'Médico',
		]);
		DB::table('Role')->insert([
			'nombre' =>'Paciente',
		]);

		DB::table('Role')->insert([
			'nombre' =>'Secretaría',
		]);









		DB::table('Persona')->insert([
			'rut' => '19304736k',
			'nombre1' => 'Alberto',
			'nombre2' => 'Ignacio',
			'apellido1' => 'Herrera',
			'apellido2' => 'Poza',
			'fono_casa' => 'none',
			'fono_trabajo' => 'none',
			'movil' => '981962000',
			'Genero_id' => 11,
			'EstadoCivil_id' => 31,
			'Comuna_id'=> 1,
			'estado' => 1,
			'fechaNacimiento' => Carbon::create('1996', '04', '05'),
			'direccion' => 'Javiera Carrera 123',
		]);

		DB::table('Persona')->insert([
			'rut' => '19302847k',
			'nombre1' => 'Alonso',
			'nombre2' => 'Ignacio',
			'apellido1' => 'Bobadilla',
			'apellido2' => 'Poza',
			'fono_casa' => 'none',
			'fono_trabajo' => 'none',
			'movil' => '981962000',
			'Genero_id' => 11,
			'EstadoCivil_id' => 11,
			'Comuna_id'=> 1,
			'estado' => 1,
			'fechaNacimiento' => Carbon::create('1995', '04', '05'),
			'direccion' => 'Javiera Carrera 121',
		]);

		DB::table('Persona')->insert([
			'rut' => '18957283k',
			'nombre1' => 'Juan',
			'nombre2' => 'Pablo',
			'apellido1' => 'Tobias',
			'apellido2' => 'Toledo',
			'fono_casa' => 'none',
			'fono_trabajo' => 'none',
			'movil' => '981962000',
			'Genero_id' => 11,
			'EstadoCivil_id' => 21,
			'Comuna_id'=> 1,
			'estado' => 1,
			'fechaNacimiento' => Carbon::create('1994', '04', '05'),
			'direccion' => 'Javiera Carrera 021',
		]);


		DB::table('Persona')->insert([
			'rut' => '178928367',
			'nombre1' => 'Jorge',
			'nombre2' => 'Ignacio',
			'apellido1' => 'Hochtetter',
			'apellido2' => 'Poza',
			'fono_casa' => 'none',
			'fono_trabajo' => 'none',
			'movil' => '981962000',
			'Genero_id' => 11,
			'EstadoCivil_id' => 31,
			'Comuna_id'=> 1,
			'estado' => 1,
			'fechaNacimiento' => Carbon::create('1990', '04', '05'),
			'direccion' => 'Javiera Carrera 243',
		]);

		DB::table('Persona')->insert([
			'rut' => '168273729',
			'nombre1' => 'Roberto',
			'nombre2' => 'Ignacio',
			'apellido1' => 'Toledo',
			'apellido2' => 'Poza',
			'fono_casa' => 'none',
			'fono_trabajo' => 'none',
			'movil' => '981962000',
			'Genero_id' => 11,
			'EstadoCivil_id' => 1,
			'Comuna_id'=> 1,
			'estado' => 1,
			'fechaNacimiento' => Carbon::create('1977', '04', '05'),
			'direccion' => 'Javiera Carrera 323',
		]);











		DB::table('Usuario')->insert([
			'email' =>'Jefatura@Jefatura.cl',
			'password' => bcrypt('Jefatura'),
			'Role_id' => 1,
			'Persona_id' => 1,
			'confirmed' => 1
		]);

		DB::table('Usuario')->insert([
			'email' =>'Administrador@Administrador.cl',
			'password' => bcrypt('Administrador'),
			'Role_id' => 11,
			'Persona_id' => 11,
			'confirmed' => 1
		]);

		DB::table('Usuario')->insert([
			'email' =>'Medico@Medico.cl',
			'password' => bcrypt('Medico'),
			'Role_id' => 21,
			'Persona_id' => 21,
			'confirmed' => 1
		]);

		DB::table('Usuario')->insert([
			'email' =>'Paciente@Paciente.cl',
			'password' => bcrypt('Paciente'),
			'Role_id' => 31,
			'Persona_id' => 31,
			'confirmed' => 1
		]);

		DB::table('Usuario')->insert([
			'email' =>'Secretaria@Secretaria.cl',
			'password' => bcrypt('Secretaria'),
			'Role_id' => 41,
			'Persona_id' => 41,
			'confirmed' => 1
		]);







		

		DB::table('TipoSangre')->insert([
			'nombre' => ' O negativo',
			'descripcion' => ' Este tipo de sangre no tiene marcadores A ni B y tampoco presenta el factor Rh.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'O positivo',
			'descripcion' => 'Este tipo de sangre no tiene marcadores A ni B pero sí que presenta el factor Rh. Se trata de uno de los dos tipos de sangre más frecuentes (junto al A positivo).',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'A negativo',
			'descripcion' => 'Este tipo de sangre solo tiene el marcador A.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'A positivo',
			'descripcion' => 'Este tipo de sangre tiene el marcador A y el factor Rh, pero carece del marcador B. Junto con el O positivo, se trata de uno de los dos tipos de sangre más frecuentes.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'B negativo',
			'descripcion' => 'Este tipo de sangre solo tiene el marcador B.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'B positivo',
			'descripcion' => 'Este tipo de sangre tiene el marcador B y el factor Rh, pero carece del marcador A.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'AB negativo',
			'descripcion' => 'Este tipo de sangre tiene los marcadores A y B, pero carece del factor Rh.',
		]);

		DB::table('TipoSangre')->insert([
			'nombre' => 'AB positivo',
			'descripcion' => 'Este tipo de sangre tiene los tres marcadores: A, B y factor Rh.',
		]);

		DB::table('Vacuna')->insert([
			'nombre' => 'Vacuna BCG',
		]);

		DB::table('Vacuna')->insert([
			'nombre' => 'Vacuna pentavalente',
		]);

		DB::table('Vacuna')->insert([
			'nombre' => 'Vacuna Polio',
		]);

		DB::table('Vacuna')->insert([
			'nombre' => 'Vacuna meningococo',
		]);

		DB::table('GrupoEtnico')->insert([
			'nombre' => 'Mapuche',
		]);

		DB::table('GrupoEtnico')->insert([
			'nombre' => 'Rapanui',
		]);

		DB::table('GrupoEtnico')->insert([
			'nombre' => 'Aimara',
		]);

		DB::table('GrupoEtnico')->insert([
			'nombre' => 'Atacameño',
		]);

		DB::table('GrupoEtnico')->insert([
			'nombre' => 'Quechua',
		]);

		DB::table('Ocupacion')->insert([
			'nombre' => 'Trabajador independiente',
		]);

		DB::table('Ocupacion')->insert([
			'nombre' => 'Trabajador dependiente',
		]);

		DB::table('Ocupacion')->insert([
			'nombre' => 'Estudiante',
		]);

		DB::table('Ocupacion')->insert([
			'nombre' => 'Jubilado',
		]);

		DB::table('Habito')->insert([
			'nombre' => 'Fuma',
		]);

		DB::table('Habito')->insert([
			'nombre' => 'Consume alcochol',
		]);

		DB::table('Habito')->insert([
			'nombre' => 'Consume drogas',
		]);

		DB::table('HabitoSexual')->insert([
			'nombre' => 'Usa preservativo',
		]);

		DB::table('HabitoSexual')->insert([
			'nombre' => 'Tiene una pareja sexual',
		]);

		DB::table('HabitoSexual')->insert([
			'nombre' => 'Tiene relaciones sexuales de forma regular',
		]);

		DB::table('EnfermedadCronica')->insert([
			'nombre' => 'Hipertensión arterial',
		]);

		DB::table('EnfermedadCronica')->insert([
			'nombre' => 'Diabetes Mellitus Tipo 1',
		]);

		DB::table('EnfermedadCronica')->insert([
			'nombre' => 'Diabetes Mellitus Tipo 11',
		]);

		DB::table('EnfermedadCronica')->insert([
			'nombre' => 'VIH/SIDA',
		]);

		DB::table('Alergia')->insert([
			'nombre' => 'Alergía al polen',
		]);

		DB::table('Alergia')->insert([
			'nombre' => 'Alergía a los ácaros',
		]);

		DB::table('Alergia')->insert([
			'nombre' => 'Alergía al pelo de animales',
		]);

		DB::table('Alergia')->insert([
			'nombre' => 'Alergía a las picaduras de insectos',
		]);
		

		DB::table('Paciente')->insert([
			'Persona_id' => 31,
			'TipoSangre_id' => 1,
			'GrupoEtnico_id' => 1,
			'Ocupacion_id' => 11,
		]);
		
		DB::table('VacunasPaciente')->insert([
			'Vacuna_id' => 1,
			'Paciente_id' => 1,
			'fechaVacunacion' => Carbon::create('1999', '02', '01'),
		]);

		DB::table('VacunasPaciente')->insert([
			'Vacuna_id' => 11,
			'Paciente_id' => 1,
			'fechaVacunacion' => Carbon::create('1999', '04', '01'),
		]);

		DB::table('HabitosPaciente')->insert([
			'Habito_id' => 1,
			'Paciente_id' => 1,
			'fechaInicio' => Carbon::create('2005', '02', '01'),
		]);

		DB::table('HabitosSexualesPaciente')->insert([
			'HabitoSexual_id' => 1,
			'Paciente_id' => 1,
			'fechaInicio' => Carbon::create('2009', '02', '01'),
			'verdadero' => 1,
		]);

		DB::table('EnfermedadesCronicasPaciente')->insert([
			'EnfermedadCronica_id' => 1,
			'Paciente_id' => 1,
			'fechaDeteccion' => Carbon::create('2004', '02', '01'),
		]);

		DB::table('AlergiasComunesPaciente')->insert([
			'Alergia_id' => 1,
			'Paciente_id' => 1,
			'fechaDeteccion' => Carbon::create('1998', '02', '01'),
		]);

		DB::table('AlergiasMedicamentosPaciente')->insert([
			'Medicamento_id' => 11,
			'Paciente_id' => 1,
			'fechaInicio' => Carbon::create('1998', '02', '01'),
		]);

		DB::table('UsoMedicamento')->insert([
			'Medicamento_id' => 1,
			'Paciente_id' => 1,
			'fechaInicio' => Carbon::create('2009', '02', '01'),
		]);

		DB::table('PrevisionActual')->insert([
			'fechaActualizacion' => Carbon::create('2017', '02', '01'),
			'Prevision_id' => 1,
			'Persona_id' => 1,
			'activado' => 0,
		]);

		DB::table('PrevisionActual')->insert([
			'fechaActualizacion' => Carbon::create('2017', '03', '01'),
			'Prevision_id' => 11,
			'Persona_id' => 1,
			'activado' => 0,
		]);


		DB::table('PrevisionActual')->insert([
			'fechaActualizacion' => Carbon::create('2017', '05', '01'),
			'Prevision_id' => 1,
			'Persona_id' => 1,
		]);






		
		//Modulo pacientes
		//1-26
		DB::table('Modulo')->insert([
			'name' => 'Personas',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Pacientes',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'EstadoCivil',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Generos',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Comunas',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Provincias',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Regiones',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Previsiones',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Usuarios',
		]);
		
		DB::table('Modulo')->insert([
			'name' => 'Roles',
		]);
		//11
		DB::table('Modulo')->insert([
			'name' => 'TipoSangre',
		]);

		DB::table('Modulo')->insert([
			'name' => 'FichaMedica',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Ocupaciones',
		]);

		DB::table('Modulo')->insert([
			'name' => 'GrupoEtnico',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Alergias',
		]);

		DB::table('Modulo')->insert([
			'name' => 'AlergiasComunesPaciente',
		]);

		DB::table('Modulo')->insert([
			'name' => 'UsoMedicamento',
		]);

		DB::table('Modulo')->insert([
			'name' => 'EnfermedadCronica',
		]);

		DB::table('Modulo')->insert([
			'name' => 'EnfermedadesCronicasPaciente',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Habitos',
		]);

		DB::table('Modulo')->insert([
			'name' => 'HabitosPaciente',
		]);

		DB::table('Modulo')->insert([
			'name' => 'HabitoSexual',
		]);

		DB::table('Modulo')->insert([
			'name' => 'HabitosSexualesPaciente',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Vacuna',
		]);

		DB::table('Modulo')->insert([
			'name' => 'VacunasPaciente',
		]);

		DB::table('Modulo')->insert([
			'name' => 'AlergiasMedicamentosPaciente',
		]);

		//Módulos de Cita
		//27-32
		DB::table('Modulo')->insert([
			'name' => 'EstadoCita',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Especialidad',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Medico',
		]);


		DB::table('Modulo')->insert([
			'name' => 'BoxConsulta',
		]);

		DB::table('Modulo')->insert([
			'name' => 'TipoBox',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Cita',
		]);

		//Módulo atenciones
		//33-40

		DB::table('Modulo')->insert([
			'name' => 'Atencion',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Diagnostico',
		]);

		DB::table('Modulo')->insert([
			'name' => 'DiagnosticosAtencion',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Medicamento',
		]);

		DB::table('Modulo')->insert([
			'name' => 'MedicamentosReceta',
		]);

		DB::table('Modulo')->insert([
			'name' => 'Receta',
		]);

		DB::table('Modulo')->insert([
			'name' => 'ViaAdministracionMedicamento',
		]);

		DB::table('Modulo')->insert([
			'name' => 'ExamenFisico',
		]);

























		//Jefatura

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 1,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 11,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 21,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 31,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 41,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 51,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 61,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 71,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 81,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 91,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 101,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 121,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 131,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 141,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 171,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 191,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 211,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 231,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 261,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 271,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 281,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 291,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 301,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 311,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 321,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 331,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 351,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 381,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		//Permisos cuestionables (antiéticos)
		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 151,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 161,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 181,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 201,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 221,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 241,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 251,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 341,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 361,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 371,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);

		DB::table('PermisoModulo')->insert([
			'Role_id' => 1,
			'Modulo_id' => 391,
			'write' => 1,
			'erase' => 1,
			'update' => 1,
			'view' => 1,
		]);


	}
}
