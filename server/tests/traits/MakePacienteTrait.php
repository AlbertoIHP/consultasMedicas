<?php

use Faker\Factory as Faker;
use App\Models\Paciente;
use App\Repositories\PacienteRepository;

trait MakePacienteTrait
{
    /**
     * Create fake instance of Paciente and save it in database
     *
     * @param array $pacienteFields
     * @return Paciente
     */
    public function makePaciente($pacienteFields = [])
    {
        /** @var PacienteRepository $pacienteRepo */
        $pacienteRepo = App::make(PacienteRepository::class);
        $theme = $this->fakePacienteData($pacienteFields);
        return $pacienteRepo->create($theme);
    }

    /**
     * Get fake instance of Paciente
     *
     * @param array $pacienteFields
     * @return Paciente
     */
    public function fakePaciente($pacienteFields = [])
    {
        return new Paciente($this->fakePacienteData($pacienteFields));
    }

    /**
     * Get fake data of Paciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakePacienteData($pacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Persona_id' => $fake->randomDigitNotNull,
            'TipoSangre_id' => $fake->randomDigitNotNull
        ], $pacienteFields);
    }
}
