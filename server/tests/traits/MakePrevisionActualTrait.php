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
            'Persona_rut' => $fake->word,
            'fechaActualizacion' => $fake->word,
            'Prevision_idPrevision' => $fake->randomDigitNotNull
        ], $previsionActualFields);
    }
}
