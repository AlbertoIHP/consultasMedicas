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
            'fecha' => $fake->word,
            'hora' => $fake->word,
            'EstadoCita_id' => $fake->randomDigitNotNull,
            'BoxConsulta_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'Medico_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $citaFields);
    }
}
