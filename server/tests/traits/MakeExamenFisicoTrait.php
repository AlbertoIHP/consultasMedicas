<?php

use Faker\Factory as Faker;
use App\Models\ExamenFisico;
use App\Repositories\ExamenFisicoRepository;

trait MakeExamenFisicoTrait
{
    /**
     * Create fake instance of ExamenFisico and save it in database
     *
     * @param array $examenFisicoFields
     * @return ExamenFisico
     */
    public function makeExamenFisico($examenFisicoFields = [])
    {
        /** @var ExamenFisicoRepository $examenFisicoRepo */
        $examenFisicoRepo = App::make(ExamenFisicoRepository::class);
        $theme = $this->fakeExamenFisicoData($examenFisicoFields);
        return $examenFisicoRepo->create($theme);
    }

    /**
     * Get fake instance of ExamenFisico
     *
     * @param array $examenFisicoFields
     * @return ExamenFisico
     */
    public function fakeExamenFisico($examenFisicoFields = [])
    {
        return new ExamenFisico($this->fakeExamenFisicoData($examenFisicoFields));
    }

    /**
     * Get fake data of ExamenFisico
     *
     * @param array $postFields
     * @return array
     */
    public function fakeExamenFisicoData($examenFisicoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaExamen' => $fake->word,
            'peso' => $fake->randomDigitNotNull,
            'estatura' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $examenFisicoFields);
    }
}
