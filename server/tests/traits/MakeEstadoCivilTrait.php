<?php

use Faker\Factory as Faker;
use App\Models\EstadoCivil;
use App\Repositories\EstadoCivilRepository;

trait MakeEstadoCivilTrait
{
    /**
     * Create fake instance of EstadoCivil and save it in database
     *
     * @param array $estadoCivilFields
     * @return EstadoCivil
     */
    public function makeEstadoCivil($estadoCivilFields = [])
    {
        /** @var EstadoCivilRepository $estadoCivilRepo */
        $estadoCivilRepo = App::make(EstadoCivilRepository::class);
        $theme = $this->fakeEstadoCivilData($estadoCivilFields);
        return $estadoCivilRepo->create($theme);
    }

    /**
     * Get fake instance of EstadoCivil
     *
     * @param array $estadoCivilFields
     * @return EstadoCivil
     */
    public function fakeEstadoCivil($estadoCivilFields = [])
    {
        return new EstadoCivil($this->fakeEstadoCivilData($estadoCivilFields));
    }

    /**
     * Get fake data of EstadoCivil
     *
     * @param array $postFields
     * @return array
     */
    public function fakeEstadoCivilData($estadoCivilFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'descripcion' => $fake->word,
            'nombre' => $fake->word
        ], $estadoCivilFields);
    }
}
