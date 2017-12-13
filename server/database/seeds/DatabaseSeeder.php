<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$this->call(moduloatenciones::class);
		$this->call(modulopacientes::class);
		$this->call(modulocitas::class);
		
	}
}
