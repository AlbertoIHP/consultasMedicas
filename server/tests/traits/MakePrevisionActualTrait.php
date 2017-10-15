<?php

use Faker\Factory as Faker;
use App\Models\PrevisionActual;
use App\Repositories\PrevisionActualRepository;

trait MakePrevisionActualTrait
{
    /**
     * Create fake instance of PrevisionActual and save it in database
     *
     * @param array $previsionActualFields
     * @return PrevisionActual
     */
    public function makePrevisionActual($previsionActualFields = [])
    {
        /** @var PrevisionActualRepository $previsionActualRepo */
        $previsionActualRepo = App::make(PrevisionActualRepository::class);
        $theme = $this->fakePrevisionActualData($previsionActualFields);
        return $previsionActualRepo->create($theme);
    }

    /**
     * Get fake instance of PrevisionActual
     *
     * @param array $previsionActualFields
     * @return PrevisionActual
     */
    public function fakePrevisionActual($previsionActualFields = [])
    {
        return new PrevisionActual($this->fakePrevisionActualData($previsionActualFields));
    }

    /**
     * Get fake data of PrevisionActual
     *
     * @param array $postFields
     * @return array
     */
    public function fakePrevisionActualData($previsionActualFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaActualizacion' => $fake->word,
            'Prevision_id' => $fake->randomDigitNotNull,
            'Persona_id' => $fake->randomDigitNotNull,
            'activado' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $previsionActualFields);
    }
}
