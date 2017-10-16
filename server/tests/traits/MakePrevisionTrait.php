<?php

use Faker\Factory as Faker;
use App\Models\Prevision;
use App\Repositories\PrevisionRepository;

trait MakePrevisionTrait
{
    /**
     * Create fake instance of Prevision and save it in database
     *
     * @param array $previsionFields
     * @return Prevision
     */
    public function makePrevision($previsionFields = [])
    {
        /** @var PrevisionRepository $previsionRepo */
        $previsionRepo = App::make(PrevisionRepository::class);
        $theme = $this->fakePrevisionData($previsionFields);
        return $previsionRepo->create($theme);
    }

    /**
     * Get fake instance of Prevision
     *
     * @param array $previsionFields
     * @return Prevision
     */
    public function fakePrevision($previsionFields = [])
    {
        return new Prevision($this->fakePrevisionData($previsionFields));
    }

    /**
     * Get fake data of Prevision
     *
     * @param array $postFields
     * @return array
     */
    public function fakePrevisionData($previsionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'descripcion' => $fake->text,
            'nombre' => $fake->word,
            'isapre' => $fake->randomDigitNotNull
        ], $previsionFields);
    }
}
