<?php

use Faker\Factory as Faker;
use App\Models\HabitosSexualesPaciente;
use App\Repositories\HabitosSexualesPacienteRepository;

trait MakeHabitosSexualesPacienteTrait
{
    /**
     * Create fake instance of HabitosSexualesPaciente and save it in database
     *
     * @param array $habitosSexualesPacienteFields
     * @return HabitosSexualesPaciente
     */
    public function makeHabitosSexualesPaciente($habitosSexualesPacienteFields = [])
    {
        /** @var HabitosSexualesPacienteRepository $habitosSexualesPacienteRepo */
        $habitosSexualesPacienteRepo = App::make(HabitosSexualesPacienteRepository::class);
        $theme = $this->fakeHabitosSexualesPacienteData($habitosSexualesPacienteFields);
        return $habitosSexualesPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of HabitosSexualesPaciente
     *
     * @param array $habitosSexualesPacienteFields
     * @return HabitosSexualesPaciente
     */
    public function fakeHabitosSexualesPaciente($habitosSexualesPacienteFields = [])
    {
        return new HabitosSexualesPaciente($this->fakeHabitosSexualesPacienteData($habitosSexualesPacienteFields));
    }

    /**
     * Get fake data of HabitosSexualesPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHabitosSexualesPacienteData($habitosSexualesPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'verdadero' => $fake->randomDigitNotNull,
            'HabitoSexual_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $habitosSexualesPacienteFields);
    }
}
