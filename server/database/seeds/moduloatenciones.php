<?php

use Illuminate\Database\Seeder;

class moduloatenciones extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Medicamento')->insert([
		  'nombrecomun' => 'ZIAGEN',
		  'nombrecientifico' =>'Abacavir',
		]);

		DB::table('Medicamento')->insert([
		  'nombrecomun' => 'COGENTIN',
		  'nombrecientifico' =>'Benzotropina',
		]);

		DB::table('Medicamento')->insert([
		  'nombrecomun' => 'TYLENOL',
		  'nombrecientifico' =>'Paracetamol',
		]);

		DB::table('Medicamento')->insert([
		  'nombrecomun' => 'VICOPROFEN',
		  'nombrecientifico' =>'Hidrocodona/ibuprofeno',
		]);

		DB::table('Medicamento')->insert([
		  'nombrecomun' => 'ACLOVATE',
		  'nombrecientifico' =>'Alclometasona',
		]);
    }
}
