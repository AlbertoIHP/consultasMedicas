<?php

use Faker\Factory as Faker;
use App\Models\Modulo;
use App\Repositories\ModuloRepository;

trait MakeModuloTrait
{
    /**
     * Create fake instance of Modulo and save it in database
     *
     * @param array $moduloFields
     * @return Modulo
     */
    public function makeModulo($moduloFields = [])
    {
        /** @var ModuloRepository $moduloRepo */
        $moduloRepo = App::make(ModuloRepository::class);
        $theme = $this->fakeModuloData($moduloFields);
        return $moduloRepo->create($theme);
    }

    /**
     * Get fake instance of Modulo
     *
     * @param array $moduloFields
     * @return Modulo
     */
    public function fakeModulo($moduloFields = [])
    {
        return new Modulo($this->fakeModuloData($moduloFields));
    }

    /**
     * Get fake data of Modulo
     *
     * @param array $postFields
     * @return array
     */
    public function fakeModuloData($moduloFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'name' => $fake->word
        ], $moduloFields);
    }
}
