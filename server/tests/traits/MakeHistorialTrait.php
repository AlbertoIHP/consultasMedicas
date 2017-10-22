<?php

use Faker\Factory as Faker;
use App\Models\Historial;
use App\Repositories\HistorialRepository;

trait MakeHistorialTrait
{
    /**
     * Create fake instance of Historial and save it in database
     *
     * @param array $historialFields
     * @return Historial
     */
    public function makeHistorial($historialFields = [])
    {
        /** @var HistorialRepository $historialRepo */
        $historialRepo = App::make(HistorialRepository::class);
        $theme = $this->fakeHistorialData($historialFields);
        return $historialRepo->create($theme);
    }

    /**
     * Get fake instance of Historial
     *
     * @param array $historialFields
     * @return Historial
     */
    public function fakeHistorial($historialFields = [])
    {
        return new Historial($this->fakeHistorialData($historialFields));
    }

    /**
     * Get fake data of Historial
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHistorialData($historialFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaConsulta' => $fake->word,
            'informacionMedica' => $fake->word,
            'FichaMedica_id' => $fake->randomDigitNotNull,
            'habitos' => $fake->word,
            'peso' => $fake->word,
            'estatura' => $fake->word
        ], $historialFields);
    }
}
