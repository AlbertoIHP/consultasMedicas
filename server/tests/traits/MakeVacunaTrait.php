<?php

use Faker\Factory as Faker;
use App\Models\Vacuna;
use App\Repositories\VacunaRepository;

trait MakeVacunaTrait
{
    /**
     * Create fake instance of Vacuna and save it in database
     *
     * @param array $vacunaFields
     * @return Vacuna
     */
    public function makeVacuna($vacunaFields = [])
    {
        /** @var VacunaRepository $vacunaRepo */
        $vacunaRepo = App::make(VacunaRepository::class);
        $theme = $this->fakeVacunaData($vacunaFields);
        return $vacunaRepo->create($theme);
    }

    /**
     * Get fake instance of Vacuna
     *
     * @param array $vacunaFields
     * @return Vacuna
     */
    public function fakeVacuna($vacunaFields = [])
    {
        return new Vacuna($this->fakeVacunaData($vacunaFields));
    }

    /**
     * Get fake data of Vacuna
     *
     * @param array $postFields
     * @return array
     */
    public function fakeVacunaData($vacunaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $vacunaFields);
    }
}
