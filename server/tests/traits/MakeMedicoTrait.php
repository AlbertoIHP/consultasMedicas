<?php

use Faker\Factory as Faker;
use App\Models\Medico;
use App\Repositories\MedicoRepository;

trait MakeMedicoTrait
{
    /**
     * Create fake instance of Medico and save it in database
     *
     * @param array $medicoFields
     * @return Medico
     */
    public function makeMedico($medicoFields = [])
    {
        /** @var MedicoRepository $medicoRepo */
        $medicoRepo = App::make(MedicoRepository::class);
        $theme = $this->fakeMedicoData($medicoFields);
        return $medicoRepo->create($theme);
    }

    /**
     * Get fake instance of Medico
     *
     * @param array $medicoFields
     * @return Medico
     */
    public function fakeMedico($medicoFields = [])
    {
        return new Medico($this->fakeMedicoData($medicoFields));
    }

    /**
     * Get fake data of Medico
     *
     * @param array $postFields
     * @return array
     */
    public function fakeMedicoData($medicoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Especialidad_id' => $fake->randomDigitNotNull,
            'Persona_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $medicoFields);
    }
}
