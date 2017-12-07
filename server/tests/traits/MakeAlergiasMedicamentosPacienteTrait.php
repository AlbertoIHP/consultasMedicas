<?php

use Faker\Factory as Faker;
use App\Models\AlergiasMedicamentosPaciente;
use App\Repositories\AlergiasMedicamentosPacienteRepository;

trait MakeAlergiasMedicamentosPacienteTrait
{
    /**
     * Create fake instance of AlergiasMedicamentosPaciente and save it in database
     *
     * @param array $alergiasMedicamentosPacienteFields
     * @return AlergiasMedicamentosPaciente
     */
    public function makeAlergiasMedicamentosPaciente($alergiasMedicamentosPacienteFields = [])
    {
        /** @var AlergiasMedicamentosPacienteRepository $alergiasMedicamentosPacienteRepo */
        $alergiasMedicamentosPacienteRepo = App::make(AlergiasMedicamentosPacienteRepository::class);
        $theme = $this->fakeAlergiasMedicamentosPacienteData($alergiasMedicamentosPacienteFields);
        return $alergiasMedicamentosPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of AlergiasMedicamentosPaciente
     *
     * @param array $alergiasMedicamentosPacienteFields
     * @return AlergiasMedicamentosPaciente
     */
    public function fakeAlergiasMedicamentosPaciente($alergiasMedicamentosPacienteFields = [])
    {
        return new AlergiasMedicamentosPaciente($this->fakeAlergiasMedicamentosPacienteData($alergiasMedicamentosPacienteFields));
    }

    /**
     * Get fake data of AlergiasMedicamentosPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAlergiasMedicamentosPacienteData($alergiasMedicamentosPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaInicio' => $fake->word,
            'Medicamento_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $alergiasMedicamentosPacienteFields);
    }
}
