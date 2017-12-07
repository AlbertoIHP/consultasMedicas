<?php

use Faker\Factory as Faker;
use App\Models\AlergiasComunesPaciente;
use App\Repositories\AlergiasComunesPacienteRepository;

trait MakeAlergiasComunesPacienteTrait
{
    /**
     * Create fake instance of AlergiasComunesPaciente and save it in database
     *
     * @param array $alergiasComunesPacienteFields
     * @return AlergiasComunesPaciente
     */
    public function makeAlergiasComunesPaciente($alergiasComunesPacienteFields = [])
    {
        /** @var AlergiasComunesPacienteRepository $alergiasComunesPacienteRepo */
        $alergiasComunesPacienteRepo = App::make(AlergiasComunesPacienteRepository::class);
        $theme = $this->fakeAlergiasComunesPacienteData($alergiasComunesPacienteFields);
        return $alergiasComunesPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of AlergiasComunesPaciente
     *
     * @param array $alergiasComunesPacienteFields
     * @return AlergiasComunesPaciente
     */
    public function fakeAlergiasComunesPaciente($alergiasComunesPacienteFields = [])
    {
        return new AlergiasComunesPaciente($this->fakeAlergiasComunesPacienteData($alergiasComunesPacienteFields));
    }

    /**
     * Get fake data of AlergiasComunesPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAlergiasComunesPacienteData($alergiasComunesPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaDeteccion' => $fake->word,
            'Alergia_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $alergiasComunesPacienteFields);
    }
}
