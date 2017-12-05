<?php

use Faker\Factory as Faker;
use App\Models\AlergiasPaciente;
use App\Repositories\AlergiasPacienteRepository;

trait MakeAlergiasPacienteTrait
{
    /**
     * Create fake instance of AlergiasPaciente and save it in database
     *
     * @param array $alergiasPacienteFields
     * @return AlergiasPaciente
     */
    public function makeAlergiasPaciente($alergiasPacienteFields = [])
    {
        /** @var AlergiasPacienteRepository $alergiasPacienteRepo */
        $alergiasPacienteRepo = App::make(AlergiasPacienteRepository::class);
        $theme = $this->fakeAlergiasPacienteData($alergiasPacienteFields);
        return $alergiasPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of AlergiasPaciente
     *
     * @param array $alergiasPacienteFields
     * @return AlergiasPaciente
     */
    public function fakeAlergiasPaciente($alergiasPacienteFields = [])
    {
        return new AlergiasPaciente($this->fakeAlergiasPacienteData($alergiasPacienteFields));
    }

    /**
     * Get fake data of AlergiasPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAlergiasPacienteData($alergiasPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Medicamento_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $alergiasPacienteFields);
    }
}
