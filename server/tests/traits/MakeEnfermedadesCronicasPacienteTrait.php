<?php

use Faker\Factory as Faker;
use App\Models\EnfermedadesCronicasPaciente;
use App\Repositories\EnfermedadesCronicasPacienteRepository;

trait MakeEnfermedadesCronicasPacienteTrait
{
    /**
     * Create fake instance of EnfermedadesCronicasPaciente and save it in database
     *
     * @param array $enfermedadesCronicasPacienteFields
     * @return EnfermedadesCronicasPaciente
     */
    public function makeEnfermedadesCronicasPaciente($enfermedadesCronicasPacienteFields = [])
    {
        /** @var EnfermedadesCronicasPacienteRepository $enfermedadesCronicasPacienteRepo */
        $enfermedadesCronicasPacienteRepo = App::make(EnfermedadesCronicasPacienteRepository::class);
        $theme = $this->fakeEnfermedadesCronicasPacienteData($enfermedadesCronicasPacienteFields);
        return $enfermedadesCronicasPacienteRepo->create($theme);
    }

    /**
     * Get fake instance of EnfermedadesCronicasPaciente
     *
     * @param array $enfermedadesCronicasPacienteFields
     * @return EnfermedadesCronicasPaciente
     */
    public function fakeEnfermedadesCronicasPaciente($enfermedadesCronicasPacienteFields = [])
    {
        return new EnfermedadesCronicasPaciente($this->fakeEnfermedadesCronicasPacienteData($enfermedadesCronicasPacienteFields));
    }

    /**
     * Get fake data of EnfermedadesCronicasPaciente
     *
     * @param array $postFields
     * @return array
     */
    public function fakeEnfermedadesCronicasPacienteData($enfermedadesCronicasPacienteFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaDeteccion' => $fake->word,
            'EnfermedadCronica_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $enfermedadesCronicasPacienteFields);
    }
}
