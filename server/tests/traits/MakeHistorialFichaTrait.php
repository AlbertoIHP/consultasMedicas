<?php

use Faker\Factory as Faker;
use App\Models\HistorialFicha;
use App\Repositories\HistorialFichaRepository;

trait MakeHistorialFichaTrait
{
    /**
     * Create fake instance of HistorialFicha and save it in database
     *
     * @param array $historialFichaFields
     * @return HistorialFicha
     */
    public function makeHistorialFicha($historialFichaFields = [])
    {
        /** @var HistorialFichaRepository $historialFichaRepo */
        $historialFichaRepo = App::make(HistorialFichaRepository::class);
        $theme = $this->fakeHistorialFichaData($historialFichaFields);
        return $historialFichaRepo->create($theme);
    }

    /**
     * Get fake instance of HistorialFicha
     *
     * @param array $historialFichaFields
     * @return HistorialFicha
     */
    public function fakeHistorialFicha($historialFichaFields = [])
    {
        return new HistorialFicha($this->fakeHistorialFichaData($historialFichaFields));
    }

    /**
     * Get fake data of HistorialFicha
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHistorialFichaData($historialFichaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaConsulta' => $fake->word,
            'informacionMedica' => $fake->word,
            'FichaMedica_id' => $fake->randomDigitNotNull,
            'habitos' => $fake->word,
            'peso' => $fake->word,
            'estatura' => $fake->word
        ], $historialFichaFields);
    }
}
