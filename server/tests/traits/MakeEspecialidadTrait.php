<?php

use Faker\Factory as Faker;
use App\Models\Especialidad;
use App\Repositories\EspecialidadRepository;

trait MakeEspecialidadTrait
{
    /**
     * Create fake instance of Especialidad and save it in database
     *
     * @param array $especialidadFields
     * @return Especialidad
     */
    public function makeEspecialidad($especialidadFields = [])
    {
        /** @var EspecialidadRepository $especialidadRepo */
        $especialidadRepo = App::make(EspecialidadRepository::class);
        $theme = $this->fakeEspecialidadData($especialidadFields);
        return $especialidadRepo->create($theme);
    }

    /**
     * Get fake instance of Especialidad
     *
     * @param array $especialidadFields
     * @return Especialidad
     */
    public function fakeEspecialidad($especialidadFields = [])
    {
        return new Especialidad($this->fakeEspecialidadData($especialidadFields));
    }

    /**
     * Get fake data of Especialidad
     *
     * @param array $postFields
     * @return array
     */
    public function fakeEspecialidadData($especialidadFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word
        ], $especialidadFields);
    }
}
