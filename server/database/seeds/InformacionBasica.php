<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class InformacionBasica extends Seeder
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
	'Region_idRegion' => 2,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Parinacota',
	'Region_idRegion' => 2,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Iquique',
	'Region_idRegion' => 3,
	]);
	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Tamarugal',
	'Region_idRegion' => 3,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Tocopilla',
	'Region_idRegion' => 4,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de El Loa',
	'Region_idRegion' => 4,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Antofagasta',
	'Region_idRegion' => 4,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Chañaral',
	'Region_idRegion' => 5,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Copiapó',
	'Region_idRegion' => 5,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Huasco',
	'Region_idRegion' => 5,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Elqui',
	'Region_idRegion' => 6,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Limarí',
	'Region_idRegion' => 6,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Choapa',
	'Region_idRegion' => 6,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Petorca',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Los Andes',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de San Felipe de Aconcagua',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Quillota',
	'Region_idRegion' => 7,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Valparaíso',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de San Antonio',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Isla de Pascua',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Marga Marga',
	'Region_idRegion' => 7,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Chacabuco',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Santiago',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Cordillera',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Maipo',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Melipilla',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Talagante',
	'Region_idRegion' => 1,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Cachapoal',
	'Region_idRegion' => 8,
	]);
	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Colchagua',
	'Region_idRegion' => 8,
	]);
	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Cardenal Caro',
	'Region_idRegion' => 8,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Curicó',
	'Region_idRegion' => 9,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Talca',
	'Region_idRegion' => 9,
	]);
	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Linares',
	'Region_idRegion' => 9,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Cauquenes',
	'Region_idRegion' => 9,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Biobío',
	'Region_idRegion' => 10,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Concepción',
	'Region_idRegion' => 10,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Arauco',
	'Region_idRegion' => 10,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Malleco',
	'Region_idRegion' => 11,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Cautín',
	'Region_idRegion' => 11,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Valdivia',
	'Region_idRegion' => 12,
	]);
	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Ranco',
	'Region_idRegion' => 12,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Osorno',
	'Region_idRegion' => 13,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Llanquihue',
	'Region_idRegion' => 13,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Chiloé',
	'Region_idRegion' => 13,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Palena',
	'Region_idRegion' => 13,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Coyhaique',
	'Region_idRegion' => 14,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Aysén',
	'Region_idRegion' => 14,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de General Carrera',
	'Region_idRegion' => 14,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Capitán Prat',
	'Region_idRegion' => 14,
	]);


	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Última Esperanza',
	'Region_idRegion' => 15,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Magallanes',
	'Region_idRegion' => 15,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Tierra del Fuego',
	'Region_idRegion' => 15,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Antártica chilena',
	'Region_idRegion' => 15,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Itata',
	'Region_idRegion' => 16,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Punilla',
	'Region_idRegion' => 16,
	]);

	DB::table('Provincia')->insert([
	'nombre' =>'Provincia de Diguillín',
	'Region_idRegion' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Arica',
	'Provincia_idProvincia' => 1,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Camarones',
	'Provincia_idProvincia' => 1,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de General Lagos',
	'Provincia_idProvincia' => 2,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Putre',
	'Provincia_idProvincia' => 2,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Alto Hospicio',
	'Provincia_idProvincia' => 3,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Iquique',
	'Provincia_idProvincia' => 3,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Camiña',
	'Provincia_idProvincia' => 4,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Colchane',
	'Provincia_idProvincia' => 4,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Huara',
	'Provincia_idProvincia' => 4,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pica',
	'Provincia_idProvincia' => 4,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pozo Almonte',
	'Provincia_idProvincia' => 4,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de María Elena',
	'Provincia_idProvincia' => 5,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tocopilla',
	'Provincia_idProvincia' => 5,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Calama',
	'Provincia_idProvincia' => 6,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ollague',
	'Provincia_idProvincia' => 6,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Pedro de Atacama',
	'Provincia_idProvincia' => 6,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Antofagasta',
	'Provincia_idProvincia' => 7,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Mejillones',
	'Provincia_idProvincia' => 7,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Sierra Gorda',
	'Provincia_idProvincia' => 7,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Taltal',
	'Provincia_idProvincia' => 7,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chañaral',
	'Provincia_idProvincia' => 8,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Diego de Almagro',
	'Provincia_idProvincia' => 8,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Copiapó',
	'Provincia_idProvincia' => 9,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Caldera',
	'Provincia_idProvincia' => 9,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tierra Amarilla',
	'Provincia_idProvincia' => 9,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Vallenar',
	'Provincia_idProvincia' => 10,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Feirina',
	'Provincia_idProvincia' => 10,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Huasco',
	'Provincia_idProvincia' => 10,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Alto del Carmen',
	'Provincia_idProvincia' => 10,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Serena',
	'Provincia_idProvincia' => 11,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coquimbo',
	'Provincia_idProvincia' => 11,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Andacollo',
	'Provincia_idProvincia' => 11,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Higuera',
	'Provincia_idProvincia' => 11,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Paihuano',
	'Provincia_idProvincia' => 11,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Vicuña',
	'Provincia_idProvincia' => 11,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ovalle',
	'Provincia_idProvincia' => 12,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Combarbalá',
	'Provincia_idProvincia' => 12,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Monte Patria',
	'Provincia_idProvincia' => 12,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Punitaqui',
	'Provincia_idProvincia' => 12,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Rio Hurtado',
	'Provincia_idProvincia' => 12,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Illapel',
	'Provincia_idProvincia' => 13,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Canela',
	'Provincia_idProvincia' => 13,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Vilos',
	'Provincia_idProvincia' => 13,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Salamanca',
	'Provincia_idProvincia' => 13,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Ligua',
	'Provincia_idProvincia' => 14,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cabildo',
	'Provincia_idProvincia' => 14,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Zapallar',
	'Provincia_idProvincia' => 14,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Papudo',
	'Provincia_idProvincia' => 14,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Petorca',
	'Provincia_idProvincia' => 14,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Andes',
	'Provincia_idProvincia' => 15,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Esteban',
	'Provincia_idProvincia' => 15,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Calle Larga',
	'Provincia_idProvincia' => 15,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Rinconada',
	'Provincia_idProvincia' => 15,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Felipe ',
	'Provincia_idProvincia' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Llaillay ',
	'Provincia_idProvincia' => 16,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Putaendo ',
	'Provincia_idProvincia' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santa María ',
	'Provincia_idProvincia' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Catemu ',
	'Provincia_idProvincia' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Panquehue ',
	'Provincia_idProvincia' => 16,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quillota ',
	'Provincia_idProvincia' => 17,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Cruz ',
	'Provincia_idProvincia' => 17,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Calera ',
	'Provincia_idProvincia' => 17,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Nogales ',
	'Provincia_idProvincia' => 17,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Hijuelas ',
	'Provincia_idProvincia' => 17,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Valparaíso ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Viña del Mar ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Concón ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quintero ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puchuncaví ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Casablanca ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Juan Fernández ',
	'Provincia_idProvincia' => 18,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Antonio ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cartagena ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de El Tabo ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de El Quisco ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Algarrobo ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santo Domingo ',
	'Provincia_idProvincia' => 19,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Isla de Pascua ',
	'Provincia_idProvincia' => 20,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quilpué ',
	'Provincia_idProvincia' => 21,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Limache ',
	'Provincia_idProvincia' => 21,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Olmué ',
	'Provincia_idProvincia' => 21,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Villa Alemana ',
	'Provincia_idProvincia' => 21,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Colina ',
	'Provincia_idProvincia' => 22,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lampa ',
	'Provincia_idProvincia' => 22,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tiltil ',
	'Provincia_idProvincia' => 22,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santiago Centro ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Vitacura ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Ramón ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Miguel ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Joaquín ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Renca ',
	'Provincia_idProvincia' => 23,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Recoleta ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quinta Normal ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quilicura ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pudahuel ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Providencia ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Peñalolén ',
	'Provincia_idProvincia' => 23,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pedro Aguirre Cerda ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ñuñoa ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Maipú ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Macul ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lo Prado ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lo Espejo ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lo Barnchea ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Las Condes ',
	'Provincia_idProvincia' => 23,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Reina ',
	'Provincia_idProvincia' => 23,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Pintana ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Granja ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Florida ',
	'Provincia_idProvincia' => 23,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Cisterna ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Independencia ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Huechuraba ',
	'Provincia_idProvincia' => 23,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Estación Central ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de El Bosque ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Conchalí ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cerro Navia ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cerrillos ',
	'Provincia_idProvincia' => 23,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puente Alto ',
	'Provincia_idProvincia' => 24,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San José de Maipo ',
	'Provincia_idProvincia' => 24,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pirque ',
	'Provincia_idProvincia' => 24,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Bernardo ',
	'Provincia_idProvincia' => 25,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Buin ',
	'Provincia_idProvincia' => 25,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Paine ',
	'Provincia_idProvincia' => 25,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Calera de Tango ',
	'Provincia_idProvincia' => 25,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Melipilla ',
	'Provincia_idProvincia' => 26,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Alhué ',
	'Provincia_idProvincia' => 26,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curacaví ',
	'Provincia_idProvincia' => 26,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Maria Pinto ',
	'Provincia_idProvincia' => 26,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Pedro ',
	'Provincia_idProvincia' => 26,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Isla de Maipo ',
	'Provincia_idProvincia' => 27,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de El Monte ',
	'Provincia_idProvincia' => 27,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Padre Hurtado ',
	'Provincia_idProvincia' => 27,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Peñaflor ',
	'Provincia_idProvincia' => 27,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Talagante ',
	'Provincia_idProvincia' => 27,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Codegua ',
	'Provincia_idProvincia' => 28,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Machalí ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Rancagua ',
	'Provincia_idProvincia' => 28,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coinco ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Malloa ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Requínoa ',
	'Provincia_idProvincia' => 28,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coltauco ',
	'Provincia_idProvincia' => 28,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Olivar ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Rengo ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Doñihue ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Peumo ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Mostazal ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Graneros ',
	'Provincia_idProvincia' => 28,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pichidegua ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Vicente de Tagua ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Las Cabras ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quinta de Tilcoco ',
	'Provincia_idProvincia' => 28,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chépica ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Peralillo ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Placilla ',
	'Provincia_idProvincia' => 29,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chimbarongo ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lolol ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pumanque ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Fernando ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santa Cruz ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Nancagua ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Palmilla ',
	'Provincia_idProvincia' => 29,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Estrella ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Litueche ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Marchigue ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Navidad ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Paredones ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pichilemu ',
	'Provincia_idProvincia' => 30,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curicó ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Molina ',
	'Provincia_idProvincia' => 31,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Sagrada Familia ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Teno ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Vichuquén ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Romeral ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Rauco ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Hualañé ',
	'Provincia_idProvincia' => 31,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Licantén ',
	'Provincia_idProvincia' => 31,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Talca ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Clemente ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pelarco ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pencahue ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Maule ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Rafael ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curepto ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Constitución ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Empedrado ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Río claro ',
	'Provincia_idProvincia' => 32,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Linares ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Javier de Loncomilla ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Parral ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Villa Alegre ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Longaví ',
	'Provincia_idProvincia' => 33,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Colbún ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Retiro ',
	'Provincia_idProvincia' => 33,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Yerbas Buenas ',
	'Provincia_idProvincia' => 33,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cauquenes ',
	'Provincia_idProvincia' => 34,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chanco ',
	'Provincia_idProvincia' => 34,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pelluhue ',
	'Provincia_idProvincia' => 34,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Alto Biobío ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Antuco ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cabrero ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Laja ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Ángeles ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Mulchén ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Nacimiento ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Negrete ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quilaco ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quilleco ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Rosendo ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santa Bárbara ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tucapel ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Yumbel ',
	'Provincia_idProvincia' => 35,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Concepción ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coronel ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chiguayante ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Florida ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Hualpén ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Hualqui ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lota ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Penco ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Pedro de la Paz ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Santa Juana ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Talcahuano ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tomé ',
	'Provincia_idProvincia' => 36,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Arauco ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cañete ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Contulmo ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curanilahue ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lebu ',
	'Provincia_idProvincia' => 37,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Álamos ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tirúa ',
	'Provincia_idProvincia' => 37,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Angol ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Collipulli ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curacautín ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ercilla ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lonquimay ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Sauces ',
	'Provincia_idProvincia' => 38,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lumaco ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Purén ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Renaico ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Traiguén ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Victoria ',
	'Provincia_idProvincia' => 38,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Temuco ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Carahue ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cholchol ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cunco ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curarrehue ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Freire ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Galvarino ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Gorbea ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lautaro ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Loncoche ',
	'Provincia_idProvincia' => 39,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Melipeuco ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Nueva Imperial ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Padre Las Casas ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Perquenco ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pitrufquén ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pucón ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Saavedra ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Teodoro Schmidt ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Toltén ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Vilcún ',
	'Provincia_idProvincia' => 39,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Villarrica ',
	'Provincia_idProvincia' => 39,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Corral ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lanco ',
	'Provincia_idProvincia' => 40,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Lagos ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Mariquina ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Máfil ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Paillaco ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Panguipulli ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Valdivia ',
	'Provincia_idProvincia' => 40,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de La Unión ',
	'Provincia_idProvincia' => 41,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Futrono ',
	'Provincia_idProvincia' => 41,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Río Bueno ',
	'Provincia_idProvincia' => 41,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lago Ranco ',
	'Provincia_idProvincia' => 41,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Osorno ',
	'Provincia_idProvincia' => 42,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puerto Octay ',
	'Provincia_idProvincia' => 42,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Purranque ',
	'Provincia_idProvincia' => 42,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puyehue ',
	'Provincia_idProvincia' => 42,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Río Negro ',
	'Provincia_idProvincia' => 42,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Juan de la Costa ',
	'Provincia_idProvincia' => 42,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Pablo ',
	'Provincia_idProvincia' => 42,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Calbuco ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cochamó ',
	'Provincia_idProvincia' => 43,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Fresia ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Frutillar ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Llanquihue ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Los Muermos ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Maullín ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puerto Montt ',
	'Provincia_idProvincia' => 43,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puerto Varas ',
	'Provincia_idProvincia' => 43,
	]);


	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ancud ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Castro ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chonchi ',
	'Provincia_idProvincia' => 44,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Curaco de Vélez ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Dalcahue ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Puqueldón ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Queilén ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quemchi ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quellón ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quinchao ',
	'Provincia_idProvincia' => 44,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chaitén ',
	'Provincia_idProvincia' => 45,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de futaleufú ',
	'Provincia_idProvincia' => 45,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Hualaihué ',
	'Provincia_idProvincia' => 45,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Palena ',
	'Provincia_idProvincia' => 45,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Lago Verde ',
	'Provincia_idProvincia' => 46,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coyhaique ',
	'Provincia_idProvincia' => 46,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Aysén ',
	'Provincia_idProvincia' => 47,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cisnes ',
	'Provincia_idProvincia' => 47,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Guaitecas ',
	'Provincia_idProvincia' => 47,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Río Ibáñez ',
	'Provincia_idProvincia' => 48,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chile Chico ',
	'Provincia_idProvincia' => 48,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cochrane ',
	'Provincia_idProvincia' => 49,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de O"Higgins ',
	'Provincia_idProvincia' => 49,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Tortel ',
	'Provincia_idProvincia' => 49,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Natales ',
	'Provincia_idProvincia' => 50,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Torres del Paine ',
	'Provincia_idProvincia' => 50,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Laguna Blanca ',
	'Provincia_idProvincia' => 51,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Punta Arenas ',
	'Provincia_idProvincia' => 51,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Río Verde ',
	'Provincia_idProvincia' => 51,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Gregorio ',
	'Provincia_idProvincia' => 51,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cochrane ',
	'Provincia_idProvincia' => 52,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Porvenir ',
	'Provincia_idProvincia' => 52,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Primavera ',
	'Provincia_idProvincia' => 52,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Timaukel ',
	'Provincia_idProvincia' => 52,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cabo de Hornos ',
	'Provincia_idProvincia' => 53,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Antártica ',
	'Provincia_idProvincia' => 53,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Cobquecura ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coelemu ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ninhue ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Portezuelo ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quirihue ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ránquil ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Treguaco ',
	'Provincia_idProvincia' => 54,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Coihueco ',
	'Provincia_idProvincia' => 55,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Ñiquén ',
	'Provincia_idProvincia' => 55,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Carlos ',
	'Provincia_idProvincia' => 55,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Fabián ',
	'Provincia_idProvincia' => 55,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Nicolás ',
	'Provincia_idProvincia' => 55,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Bulnes ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chillán ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Chillán Viejo ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de El Carmen ',
	'Provincia_idProvincia' => 56,
	]);
	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pemuco ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Pinto ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Quillón ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de San Ignacio ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('Comuna')->insert([
	'nombre' =>'Comuna de Yungay ',
	'Provincia_idProvincia' => 56,
	]);

	DB::table('EstadoCivil')->insert([
	'nombre' =>'Casado',
	'descripcion' => 'Casado',
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

	DB::table('Usuario')->insert([
	'email' =>'Jefatura@Jefatura.cl',
	'password' => bcrypt('Jefatura'),
	'Role_idRole' => 1,
	]);

	DB::table('Usuario')->insert([
	'email' =>'Administrador@Administrador.cl',
	'password' => bcrypt('Administrador'),
	'Role_idRole' => 2,
	]);

	DB::table('Usuario')->insert([
	'email' =>'Medico@Medico.cl',
	'password' => bcrypt('Medico'),
	'Role_idRole' => 3,
	]);

	DB::table('Usuario')->insert([
	'email' =>'Paciente@Paciente.cl',
	'password' => bcrypt('Paciente'),
	'Role_idRole' => 4,
	]);

	DB::table('Usuario')->insert([
	'email' =>'Secretaria@Secretaria.cl',
	'password' => bcrypt('Secretaria'),
	'Role_idRole' => 5,
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
	  'idGenero' => 2,
	  'EstadoCivil_idEstado' => 4,
	  'Comuna_idComuna'=> 10,
	  'Usuario_email' => 'Jefatura@Jefatura.cl',
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
	  'idGenero' => 2,
	  'EstadoCivil_idEstado' => 2,
	  'Comuna_idComuna'=> 5,
	  'Usuario_email' => 'Administrador@Administrador.cl',
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
	  'idGenero' => 2,
	  'EstadoCivil_idEstado' => 3,
	  'Comuna_idComuna'=> 15,
	  'Usuario_email' => 'Medico@Medico.cl',
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
	  'idGenero' => 2,
	  'EstadoCivil_idEstado' => 4,
	  'Comuna_idComuna'=> 7,
	  'Usuario_email' => 'Paciente@Paciente.cl',
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
	  'idGenero' => 2,
	  'EstadoCivil_idEstado' => 1,
	  'Comuna_idComuna'=> 13,
	  'Usuario_email' => 'Secretaria@Secretaria.cl',
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

	DB::table('FichaMedica')->insert([
	  'nombre' => 'Jorge Ignacio Hochtetter Poza',
	  'Persona_rut' => '178928367',
	  'nombreResponsable' => 'Jorge Ignacio Hochtetter Poza',
	  'fechaCreacion' => Carbon::create('2017', '01', '01'),
    'pesoActual' => '80',
    'estaturaActual' => '180',
    'TipoSangre_id' => 1,
	]);

	DB::table('Historial')->insert([
	  'fechaConsulta' => Carbon::create('2017', '01', '01'),
	  'habitos' => 'Ninguno',
	  'InformacionMedica' => 'En esta consulta se detecto algo raro',
	  'FichaMedica_id' => 1
	]);

	DB::table('Historial')->insert([
	  'fechaConsulta' => Carbon::create('2017', '02', '01'),
	  'habitos' => 'Ninguno',
	  'InformacionMedica' => 'En esta consulta se detecto algo raro',
	  'FichaMedica_id' => 1
	]);

	DB::table('Historial')->insert([
	  'fechaConsulta' => Carbon::create('2017', '03', '01'),
	  'habitos' => 'Ninguno',
	  'InformacionMedica' => 'En esta consulta se detecto algo raro',
	  'FichaMedica_id' => 1
	]);

	DB::table('Historial')->insert([
	  'fechaConsulta' => Carbon::create('2017', '04', '01'),
	  'habitos' => 'Ninguno',
	  'InformacionMedica' => 'En esta consulta se detecto algo raro',
	  'FichaMedica_id' => 1
	]);



	DB::table('PrevisionActual')->insert([
	'fechaActualizacion' => Carbon::create('2017', '02', '01'),
	'Prevision_idPrevision' => 1,
	'Persona_rut' => '178928367',
	]);

	DB::table('PrevisionActual')->insert([
	'fechaActualizacion' => Carbon::create('2017', '03', '01'),
	'Prevision_idPrevision' => 2,
	'Persona_rut' => '178928367',
	]);


	DB::table('PrevisionActual')->insert([
	'fechaActualizacion' => Carbon::create('2017', '05', '01'),
	'Prevision_idPrevision' => 1,
	'Persona_rut' => '178928367',
	]);


































	}
}
