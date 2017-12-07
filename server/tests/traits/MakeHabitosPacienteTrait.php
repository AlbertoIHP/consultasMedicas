<?php

use Faker\Factory as Faker;
use App\Models\HabitosPaciente;
use App\Repositories\HabitosPacienteRepository;

trait MakeHabitosPacienteTrait
{
    /**
     * Create fake instance of HabitosPaciente and save it in database
     *
     * @param array $habitosPacienteFields
     * @return HabitosPaciente
     */
    public function makeHabitosPaciente($habitosPacienteFields = [])
    {
        /** @var HabitosPacienteRepository $habitosPacienteRepo */
        $habitosPacienteRepo = App::make(HabitosPacienteRepository::class);
        $theme = $this->fakeHabitosPacienteData($habitosPacienteFields);
        return $habitosPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of HabitosPaciente
     *
     * @param array $habitosPacienteFields
     * @return HabitosPaciente
     */
    public function fakeHabitosPaciente($habitosPacienteFields = [])
    {
        return new HabitosPaciente($this->fakeHabitosPacienteData($habitosPacienteFields));
    }

    /**
     * Get fake data of HabitosPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHabitosPacienteData($habitosPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaInicio' => $fake->word,
            'Habito_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $habitosPacienteFields);
    }
}
