<?php

use Faker\Factory as Faker;
use App\Models\Comuna;
use App\Repositories\ComunaRepository;

trait MakeComunaTrait
{
    /**
     * Create fake instance of Comuna and save it in database
     *
     * @param array $comunaFields
     * @return Comuna
     */
    public function makeComuna($comunaFields = [])
    {
        /** @var ComunaRepository $comunaRepo */
        $comunaRepo = App::make(ComunaRepository::class);
        $theme = $this->fakeComunaData($comunaFields);
        return $comunaRepo->create($theme);
    }

    /**
     * Get fake instance of Comuna
     *
     * @param array $comunaFields
     * @return Comuna
     */
    public function fakeComuna($comunaFields = [])
    {
        return new Comuna($this->fakeComunaData($comunaFields));
    }

    /**
     * Get fake data of Comuna
     *
     * @param array $postFields
     * @return array
     */
    public function fakeComunaData($comunaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'idComuna' => $fake->randomDigitNotNull,
            'nombre' => $fake->word
        ], $comunaFields);
    }
}
