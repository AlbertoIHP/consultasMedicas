<?php

use Faker\Factory as Faker;
use App\Models\VacunasPaciente;
use App\Repositories\VacunasPacienteRepository;

trait MakeVacunasPacienteTrait
{
    /**
     * Create fake instance of VacunasPaciente and save it in database
     *
     * @param array $vacunasPacienteFields
     * @return VacunasPaciente
     */
    public function makeVacunasPaciente($vacunasPacienteFields = [])
    {
        /** @var VacunasPacienteRepository $vacunasPacienteRepo */
        $vacunasPacienteRepo = App::make(VacunasPacienteRepository::class);
        $theme = $this->fakeVacunasPacienteData($vacunasPacienteFields);
        return $vacunasPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of VacunasPaciente
     *
     * @param array $vacunasPacienteFields
     * @return VacunasPaciente
     */
    public function fakeVacunasPaciente($vacunasPacienteFields = [])
    {
        return new VacunasPaciente($this->fakeVacunasPacienteData($vacunasPacienteFields));
    }

    /**
     * Get fake data of VacunasPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeVacunasPacienteData($vacunasPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaVacunacion' => $fake->word,
            'Vacuna_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $vacunasPacienteFields);
    }
}
