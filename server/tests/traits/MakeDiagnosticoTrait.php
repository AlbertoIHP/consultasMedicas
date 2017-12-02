<?php

use Faker\Factory as Faker;
use App\Models\Diagnostico;
use App\Repositories\DiagnosticoRepository;

trait MakeDiagnosticoTrait
{
    /**
     * Create fake instance of Diagnostico and save it in database
     *
     * @param array $diagnosticoFields
     * @return Diagnostico
     */
    public function makeDiagnostico($diagnosticoFields = [])
    {
        /** @var DiagnosticoRepository $diagnosticoRepo */
        $diagnosticoRepo = App::make(DiagnosticoRepository::class);
        $theme = $this->fakeDiagnosticoData($diagnosticoFields);
        return $diagnosticoRepo->create($theme);
    }

    /**
     * Get fake instance of Diagnostico
     *
     * @param array $diagnosticoFields
     * @return Diagnostico
     */
    public function fakeDiagnostico($diagnosticoFields = [])
    {
        return new Diagnostico($this->fakeDiagnosticoData($diagnosticoFields));
    }

    /**
     * Get fake data of Diagnostico
     *
     * @param array $postFields
     * @return array
     */
    public function fakeDiagnosticoData($diagnosticoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'diagnostico' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $diagnosticoFields);
    }
}
