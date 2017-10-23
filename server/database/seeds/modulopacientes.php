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

		DB::table('Region')->insert([
		'nombre' =>'XV Arica y Parinacota',
		]);

		DB::table('Region')->insert([
		'nombre' =>'I Tarapacá',
		]);


		DB::table('Region')->insert([
		'nombre' =>'II Antofagasta',
		]);

		DB::table('Region')->insert([
		'nombre' =>'III Atacama',
		]);

		DB::table('Region')->insert([
		'nombre' =>'IV Coquimbo',
		]);

		DB::table('Region')->insert([
		'nombre' =>'V Valparaíso',
		]);

		DB::table('Region')->insert([
		'nombre' =>"VI  O'Higgins",
		]);
		DB::table('Region')->insert([
		'nombre' =>'VII Maule',
		]);
		DB::table('Region')->insert([
		'nombre' =>'VIII Biobío',
		]);
		DB::table('Region')->insert([
		'nombre' =>'IX Araucanía',
		]);

		DB::table('Region')->insert([
		'nombre' =>'XIV Los Ríos',
		]);

		DB::table('Region')->insert([
		'nombre' =>'X Los Lagos',
		]);

		DB::table('Region')->insert([
		'nombre' =>'XI Aysén',
		]);

		DB::table('Region')->insert([
		'nombre' =>'XII Magallanes y Antártica',
		]);

		DB::table('Region')->insert([
		'nombre' =>'XVI Ñuble',
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Arica',
		'Region_id' => 2,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Parinacota',
		'Region_id' => 2,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Iquique',
		'Region_id' => 3,
		]);
		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Tamarugal',
		'Region_id' => 3,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Tocopilla',
		'Region_id' => 4,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de El Loa',
		'Region_id' => 4,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Antofagasta',
		'Region_id' => 4,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Chañaral',
		'Region_id' => 5,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Copiapó',
		'Region_id' => 5,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Huasco',
		'Region_id' => 5,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Elqui',
		'Region_id' => 6,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Limarí',
		'Region_id' => 6,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Choapa',
		'Region_id' => 6,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Petorca',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Los Andes',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de San Felipe de Aconcagua',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Quillota',
		'Region_id' => 7,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Valparaíso',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de San Antonio',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Isla de Pascua',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Marga Marga',
		'Region_id' => 7,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Chacabuco',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Santiago',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Cordillera',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Maipo',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Melipilla',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Talagante',
		'Region_id' => 1,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Cachapoal',
		'Region_id' => 8,
		]);
		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Colchagua',
		'Region_id' => 8,
		]);
		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Cardenal Caro',
		'Region_id' => 8,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Curicó',
		'Region_id' => 9,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Talca',
		'Region_id' => 9,
		]);
		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Linares',
		'Region_id' => 9,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Cauquenes',
		'Region_id' => 9,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Biobío',
		'Region_id' => 10,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Concepción',
		'Region_id' => 10,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Arauco',
		'Region_id' => 10,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Malleco',
		'Region_id' => 11,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Cautín',
		'Region_id' => 11,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Valdivia',
		'Region_id' => 12,
		]);
		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Ranco',
		'Region_id' => 12,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Osorno',
		'Region_id' => 13,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Llanquihue',
		'Region_id' => 13,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Chiloé',
		'Region_id' => 13,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Palena',
		'Region_id' => 13,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Coyhaique',
		'Region_id' => 14,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Aysén',
		'Region_id' => 14,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de General Carrera',
		'Region_id' => 14,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Capitán Prat',
		'Region_id' => 14,
		]);


		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Última Esperanza',
		'Region_id' => 15,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Magallanes',
		'Region_id' => 15,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Tierra del Fuego',
		'Region_id' => 15,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Antártica chilena',
		'Region_id' => 15,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Itata',
		'Region_id' => 16,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Punilla',
		'Region_id' => 16,
		]);

		DB::table('Provincia')->insert([
		'nombre' =>'Provincia de Diguillín',
		'Region_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Arica',
		'Provincia_id' => 1,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Camarones',
		'Provincia_id' => 1,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de General Lagos',
		'Provincia_id' => 2,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Putre',
		'Provincia_id' => 2,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Alto Hospicio',
		'Provincia_id' => 3,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Iquique',
		'Provincia_id' => 3,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Camiña',
		'Provincia_id' => 4,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Colchane',
		'Provincia_id' => 4,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Huara',
		'Provincia_id' => 4,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pica',
		'Provincia_id' => 4,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pozo Almonte',
		'Provincia_id' => 4,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de María Elena',
		'Provincia_id' => 5,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tocopilla',
		'Provincia_id' => 5,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Calama',
		'Provincia_id' => 6,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ollague',
		'Provincia_id' => 6,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Pedro de Atacama',
		'Provincia_id' => 6,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Antofagasta',
		'Provincia_id' => 7,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Mejillones',
		'Provincia_id' => 7,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Sierra Gorda',
		'Provincia_id' => 7,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Taltal',
		'Provincia_id' => 7,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chañaral',
		'Provincia_id' => 8,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Diego de Almagro',
		'Provincia_id' => 8,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Copiapó',
		'Provincia_id' => 9,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Caldera',
		'Provincia_id' => 9,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tierra Amarilla',
		'Provincia_id' => 9,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Vallenar',
		'Provincia_id' => 10,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Feirina',
		'Provincia_id' => 10,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Huasco',
		'Provincia_id' => 10,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Alto del Carmen',
		'Provincia_id' => 10,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Serena',
		'Provincia_id' => 11,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coquimbo',
		'Provincia_id' => 11,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Andacollo',
		'Provincia_id' => 11,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Higuera',
		'Provincia_id' => 11,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Paihuano',
		'Provincia_id' => 11,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Vicuña',
		'Provincia_id' => 11,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ovalle',
		'Provincia_id' => 12,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Combarbalá',
		'Provincia_id' => 12,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Monte Patria',
		'Provincia_id' => 12,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Punitaqui',
		'Provincia_id' => 12,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Rio Hurtado',
		'Provincia_id' => 12,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Illapel',
		'Provincia_id' => 13,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Canela',
		'Provincia_id' => 13,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Vilos',
		'Provincia_id' => 13,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Salamanca',
		'Provincia_id' => 13,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Ligua',
		'Provincia_id' => 14,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cabildo',
		'Provincia_id' => 14,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Zapallar',
		'Provincia_id' => 14,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Papudo',
		'Provincia_id' => 14,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Petorca',
		'Provincia_id' => 14,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Andes',
		'Provincia_id' => 15,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Esteban',
		'Provincia_id' => 15,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Calle Larga',
		'Provincia_id' => 15,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Rinconada',
		'Provincia_id' => 15,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Felipe ',
		'Provincia_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Llaillay ',
		'Provincia_id' => 16,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Putaendo ',
		'Provincia_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santa María ',
		'Provincia_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Catemu ',
		'Provincia_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Panquehue ',
		'Provincia_id' => 16,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quillota ',
		'Provincia_id' => 17,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Cruz ',
		'Provincia_id' => 17,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Calera ',
		'Provincia_id' => 17,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Nogales ',
		'Provincia_id' => 17,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Hijuelas ',
		'Provincia_id' => 17,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Valparaíso ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Viña del Mar ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Concón ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quintero ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puchuncaví ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Casablanca ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Juan Fernández ',
		'Provincia_id' => 18,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Antonio ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cartagena ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de El Tabo ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de El Quisco ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Algarrobo ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santo Domingo ',
		'Provincia_id' => 19,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Isla de Pascua ',
		'Provincia_id' => 20,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quilpué ',
		'Provincia_id' => 21,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Limache ',
		'Provincia_id' => 21,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Olmué ',
		'Provincia_id' => 21,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Villa Alemana ',
		'Provincia_id' => 21,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Colina ',
		'Provincia_id' => 22,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lampa ',
		'Provincia_id' => 22,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tiltil ',
		'Provincia_id' => 22,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santiago Centro ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Vitacura ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Ramón ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Miguel ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Joaquín ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Renca ',
		'Provincia_id' => 23,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Recoleta ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quinta Normal ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quilicura ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pudahuel ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Providencia ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Peñalolén ',
		'Provincia_id' => 23,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pedro Aguirre Cerda ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ñuñoa ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Maipú ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Macul ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lo Prado ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lo Espejo ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lo Barnchea ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Las Condes ',
		'Provincia_id' => 23,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Reina ',
		'Provincia_id' => 23,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Pintana ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Granja ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Florida ',
		'Provincia_id' => 23,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Cisterna ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Independencia ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Huechuraba ',
		'Provincia_id' => 23,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Estación Central ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de El Bosque ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Conchalí ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cerro Navia ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cerrillos ',
		'Provincia_id' => 23,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puente Alto ',
		'Provincia_id' => 24,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San José de Maipo ',
		'Provincia_id' => 24,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pirque ',
		'Provincia_id' => 24,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Bernardo ',
		'Provincia_id' => 25,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Buin ',
		'Provincia_id' => 25,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Paine ',
		'Provincia_id' => 25,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Calera de Tango ',
		'Provincia_id' => 25,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Melipilla ',
		'Provincia_id' => 26,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Alhué ',
		'Provincia_id' => 26,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curacaví ',
		'Provincia_id' => 26,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Maria Pinto ',
		'Provincia_id' => 26,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Pedro ',
		'Provincia_id' => 26,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Isla de Maipo ',
		'Provincia_id' => 27,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de El Monte ',
		'Provincia_id' => 27,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Padre Hurtado ',
		'Provincia_id' => 27,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Peñaflor ',
		'Provincia_id' => 27,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Talagante ',
		'Provincia_id' => 27,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Codegua ',
		'Provincia_id' => 28,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Machalí ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Rancagua ',
		'Provincia_id' => 28,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coinco ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Malloa ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Requínoa ',
		'Provincia_id' => 28,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coltauco ',
		'Provincia_id' => 28,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Olivar ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Rengo ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Doñihue ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Peumo ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Mostazal ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Graneros ',
		'Provincia_id' => 28,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pichidegua ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Vicente de Tagua ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Las Cabras ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quinta de Tilcoco ',
		'Provincia_id' => 28,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chépica ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Peralillo ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Placilla ',
		'Provincia_id' => 29,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chimbarongo ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lolol ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pumanque ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Fernando ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santa Cruz ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Nancagua ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Palmilla ',
		'Provincia_id' => 29,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Estrella ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Litueche ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Marchigue ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Navidad ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Paredones ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pichilemu ',
		'Provincia_id' => 30,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curicó ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Molina ',
		'Provincia_id' => 31,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Sagrada Familia ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Teno ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Vichuquén ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Romeral ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Rauco ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Hualañé ',
		'Provincia_id' => 31,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Licantén ',
		'Provincia_id' => 31,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Talca ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Clemente ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pelarco ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pencahue ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Maule ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Rafael ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curepto ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Constitución ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Empedrado ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Río claro ',
		'Provincia_id' => 32,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Linares ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Javier de Loncomilla ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Parral ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Villa Alegre ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Longaví ',
		'Provincia_id' => 33,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Colbún ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Retiro ',
		'Provincia_id' => 33,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Yerbas Buenas ',
		'Provincia_id' => 33,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cauquenes ',
		'Provincia_id' => 34,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chanco ',
		'Provincia_id' => 34,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pelluhue ',
		'Provincia_id' => 34,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Alto Biobío ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Antuco ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cabrero ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Laja ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Ángeles ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Mulchén ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Nacimiento ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Negrete ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quilaco ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quilleco ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Rosendo ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santa Bárbara ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tucapel ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Yumbel ',
		'Provincia_id' => 35,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Concepción ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coronel ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chiguayante ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Florida ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Hualpén ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Hualqui ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lota ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Penco ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Pedro de la Paz ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Santa Juana ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Talcahuano ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tomé ',
		'Provincia_id' => 36,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Arauco ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cañete ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Contulmo ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curanilahue ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lebu ',
		'Provincia_id' => 37,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Álamos ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tirúa ',
		'Provincia_id' => 37,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Angol ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Collipulli ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curacautín ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ercilla ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lonquimay ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Sauces ',
		'Provincia_id' => 38,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lumaco ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Purén ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Renaico ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Traiguén ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Victoria ',
		'Provincia_id' => 38,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Temuco ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Carahue ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cholchol ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cunco ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curarrehue ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Freire ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Galvarino ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Gorbea ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lautaro ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Loncoche ',
		'Provincia_id' => 39,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Melipeuco ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Nueva Imperial ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Padre Las Casas ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Perquenco ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pitrufquén ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pucón ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Saavedra ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Teodoro Schmidt ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Toltén ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Vilcún ',
		'Provincia_id' => 39,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Villarrica ',
		'Provincia_id' => 39,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Corral ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lanco ',
		'Provincia_id' => 40,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Lagos ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Mariquina ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Máfil ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Paillaco ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Panguipulli ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Valdivia ',
		'Provincia_id' => 40,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de La Unión ',
		'Provincia_id' => 41,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Futrono ',
		'Provincia_id' => 41,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Río Bueno ',
		'Provincia_id' => 41,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lago Ranco ',
		'Provincia_id' => 41,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Osorno ',
		'Provincia_id' => 42,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puerto Octay ',
		'Provincia_id' => 42,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Purranque ',
		'Provincia_id' => 42,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puyehue ',
		'Provincia_id' => 42,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Río Negro ',
		'Provincia_id' => 42,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Juan de la Costa ',
		'Provincia_id' => 42,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Pablo ',
		'Provincia_id' => 42,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Calbuco ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cochamó ',
		'Provincia_id' => 43,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Fresia ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Frutillar ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Llanquihue ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Los Muermos ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Maullín ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puerto Montt ',
		'Provincia_id' => 43,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puerto Varas ',
		'Provincia_id' => 43,
		]);


		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ancud ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Castro ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chonchi ',
		'Provincia_id' => 44,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Curaco de Vélez ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Dalcahue ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Puqueldón ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Queilén ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quemchi ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quellón ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quinchao ',
		'Provincia_id' => 44,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chaitén ',
		'Provincia_id' => 45,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de futaleufú ',
		'Provincia_id' => 45,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Hualaihué ',
		'Provincia_id' => 45,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Palena ',
		'Provincia_id' => 45,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Lago Verde ',
		'Provincia_id' => 46,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coyhaique ',
		'Provincia_id' => 46,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Aysén ',
		'Provincia_id' => 47,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cisnes ',
		'Provincia_id' => 47,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Guaitecas ',
		'Provincia_id' => 47,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Río Ibáñez ',
		'Provincia_id' => 48,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chile Chico ',
		'Provincia_id' => 48,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cochrane ',
		'Provincia_id' => 49,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de O"Higgins ',
		'Provincia_id' => 49,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Tortel ',
		'Provincia_id' => 49,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Natales ',
		'Provincia_id' => 50,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Torres del Paine ',
		'Provincia_id' => 50,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Laguna Blanca ',
		'Provincia_id' => 51,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Punta Arenas ',
		'Provincia_id' => 51,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Río Verde ',
		'Provincia_id' => 51,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Gregorio ',
		'Provincia_id' => 51,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cochrane ',
		'Provincia_id' => 52,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Porvenir ',
		'Provincia_id' => 52,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Primavera ',
		'Provincia_id' => 52,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Timaukel ',
		'Provincia_id' => 52,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cabo de Hornos ',
		'Provincia_id' => 53,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Antártica ',
		'Provincia_id' => 53,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Cobquecura ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coelemu ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ninhue ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Portezuelo ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quirihue ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ránquil ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Treguaco ',
		'Provincia_id' => 54,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Coihueco ',
		'Provincia_id' => 55,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Ñiquén ',
		'Provincia_id' => 55,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Carlos ',
		'Provincia_id' => 55,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Fabián ',
		'Provincia_id' => 55,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Nicolás ',
		'Provincia_id' => 55,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Bulnes ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chillán ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Chillán Viejo ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de El Carmen ',
		'Provincia_id' => 56,
		]);
		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pemuco ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Pinto ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Quillón ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de San Ignacio ',
		'Provincia_id' => 56,
		]);

		DB::table('Comuna')->insert([
		'nombre' =>'Comuna de Yungay ',
		'Provincia_id' => 56,
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
		  'Genero_id' => 2,
		  'EstadoCivil_id' => 4,
		  'Comuna_id'=> 10,
		  'estado' => 1,
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
		  'Genero_id' => 2,
		  'EstadoCivil_id' => 2,
		  'Comuna_id'=> 5,
		  'estado' => 1,
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
		  'Genero_id' => 2,
		  'EstadoCivil_id' => 3,
		  'Comuna_id'=> 15,
		  'estado' => 1,
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
		  'Genero_id' => 2,
		  'EstadoCivil_id' => 4,
		  'Comuna_id'=> 7,
		  'estado' => 1,
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
		  'Genero_id' => 2,
		  'EstadoCivil_id' => 1,
		  'Comuna_id'=> 13,
		  'estado' => 1,
		]);


		DB::table('Usuario')->insert([
			'email' =>'Jefatura@Jefatura.cl',
			'password' => bcrypt('Jefatura'),
			'Role_id' => 1,
			'Persona_id' => 1,
		]);

		DB::table('Usuario')->insert([
			'email' =>'Administrador@Administrador.cl',
			'password' => bcrypt('Administrador'),
			'Role_id' => 2,
			'Persona_id' => 2,
		]);

		DB::table('Usuario')->insert([
			'email' =>'Medico@Medico.cl',
			'password' => bcrypt('Medico'),
			'Role_id' => 3,
			'Persona_id' => 3,
		]);

		DB::table('Usuario')->insert([
			'email' =>'Paciente@Paciente.cl',
			'password' => bcrypt('Paciente'),
			'Role_id' => 4,
			'Persona_id' => 4,
		]);

		DB::table('Usuario')->insert([
			'email' =>'Secretaria@Secretaria.cl',
			'password' => bcrypt('Secretaria'),
			'Role_id' => 5,
			'Persona_id' => 5,
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


		DB::table('Paciente')->insert([
			'Persona_id' => 4,
			'TipoSangre_id' =>1,
			]);


		DB::table('PrevisionActual')->insert([
		'fechaActualizacion' => Carbon::create('2017', '02', '01'),
		'Prevision_id' => 1,
		'Persona_id' => 1,
		'activado' => 0,
		]);

		DB::table('PrevisionActual')->insert([
		'fechaActualizacion' => Carbon::create('2017', '03', '01'),
		'Prevision_id' => 2,
		'Persona_id' => 1,
		'activado' => 0,
		]);


		DB::table('PrevisionActual')->insert([
		'fechaActualizacion' => Carbon::create('2017', '05', '01'),
		'Prevision_id' => 1,
		'Persona_id' => 1,
		]);



		DB::table('Especialidad')->insert([
		  'nombre' => 'Pediatria',
		]);
		DB::table('Especialidad')->insert([
		  'nombre' => 'Nefrologia',
		]);
		DB::table('Especialidad')->insert([
		  'nombre' => 'Neurologia',
		]);




		DB::table('Medico')->insert([
		  'Especialidad_id' => 1,
		  'Persona_id' => 3,
		]);


		DB::table('EstadoCita')->insert([
			'nombre' => 'Pendiente',
			'descripcion' => 'La cita aun no ha sido confirmada por el paciente',
		]);


		DB::table('EstadoCita')->insert([
			'nombre' => 'Confirmado',
			'descripcion' => 'La cita ha sido confirmada por el paciente',
		]);


		DB::table('EstadoCita')->insert([
			'nombre' => 'Realizada',
			'descripcion' => 'Esta cita ya ha sido atendida',
		]);


		DB::table('TipoBox')->insert([
			'nombre' => 'Box Pediatria',
			'descripcion' => 'Box de pediatria',
		]);


		DB::table('TipoBox')->insert([
			'nombre' => 'Box Cirugia',
			'descripcion' => 'Tubos de oxigeno',
		]);



		DB::table('BoxConsulta')->insert([
			'ubicacion' => 'Sala 205',
			'TipoBox_id' => 1,
		]);



		DB::table('BoxConsulta')->insert([
			'ubicacion' => 'Sala 200',
			'TipoBox_id' => 2,
		]);



		DB::table('Cita')->insert([
			'fecha' => Carbon::create('2017', '01', '01'),
			'hora' => '22:55',
			'EstadoCita_id' => 1,
			'BoxConsulta_id' => 1,
			'Paciente_id' => 1,
			'Medico_id' => 1,

		]);
		

	}
}
