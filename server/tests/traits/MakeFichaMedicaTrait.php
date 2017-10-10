<?php

use Faker\Factory as Faker;
use App\Models\FichaMedica;
use App\Repositories\FichaMedicaRepository;

trait MakeFichaMedicaTrait
{
    /**
     * Create fake instance of FichaMedica and save it in database
     *
     * @param array $fichaMedicaFields
     * @return FichaMedica
     */
    public function makeFichaMedica($fichaMedicaFields = [])
    {
        /** @var FichaMedicaRepository $fichaMedicaRepo */
        $fichaMedicaRepo = App::make(FichaMedicaRepository::class);
        $theme = $this->fakeFichaMedicaData($fichaMedicaFields);
        return $fichaMedicaRepo->create($theme);
    }

    /**
     * Get fake instance of FichaMedica
     *
     * @param array $fichaMedicaFields
     * @return FichaMedica
     */
    public function fakeFichaMedica($fichaMedicaFields = [])
    {
        return new FichaMedica($this->fakeFichaMedicaData($fichaMedicaFields));
    }

    /**
     * Get fake data of FichaMedica
     *
     * @param array $postFields
     * @return array
     */
    public function fakeFichaMedicaData($fichaMedicaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'Persona_rut' => $fake->word,
            'nombreResponsable' => $fake->word,
            'fechaCreacion' => $fake->word,
            'pesoActual' => $fake->word,
            'estaturaActual' => $fake->word,
            'TipoSangre_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $fichaMedicaFields);
    }
}
