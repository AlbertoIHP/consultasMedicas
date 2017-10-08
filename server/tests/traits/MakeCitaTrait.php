<?php

use Faker\Factory as Faker;
use App\Models\Cita;
use App\Repositories\CitaRepository;

trait MakeCitaTrait
{
    /**
     * Create fake instance of Cita and save it in database
     *
     * @param array $citaFields
     * @return Cita
     */
    public function makeCita($citaFields = [])
    {
        /** @var CitaRepository $citaRepo */
        $citaRepo = App::make(CitaRepository::class);
        $theme = $this->fakeCitaData($citaFields);
        return $citaRepo->create($theme);
    }

    /**
     * Get fake instance of Cita
     *
     * @param array $citaFields
     * @return Cita
     */
    public function fakeCita($citaFields = [])
    {
        return new Cita($this->fakeCitaData($citaFields));
    }

    /**
     * Get fake data of Cita
     *
     * @param array $postFields
     * @return array
     */
    public function fakeCitaData($citaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fecha' => $fake->date('Y-m-d H:i:s'),
            'Consulta_idConsulta' => $fake->randomDigitNotNull,
            'Doctor_rut' => $fake->word,
            'Persona_rut' => $fake->word,
            'fechahora' => $fake->date('Y-m-d H:i:s'),
            'EstadoCita_idEstadoCita' => $fake->randomDigitNotNull
        ], $citaFields);
    }
}
