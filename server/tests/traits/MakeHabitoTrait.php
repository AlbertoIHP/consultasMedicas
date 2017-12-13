<?php

use Faker\Factory as Faker;
use App\Models\Habito;
use App\Repositories\HabitoRepository;

trait MakeHabitoTrait
{
    /**
     * Create fake instance of Habito and save it in database
     *
     * @param array $habitoFields
     * @return Habito
     */
    public function makeHabito($habitoFields = [])
    {
        /** @var HabitoRepository $habitoRepo */
        $habitoRepo = App::make(HabitoRepository::class);
        $theme = $this->fakeHabitoData($habitoFields);
        return $habitoRepo->create($theme);
    }

    /**
     * Get fake instance of Habito
     *
     * @param array $habitoFields
     * @return Habito
     */
    public function fakeHabito($habitoFields = [])
    {
        return new Habito($this->fakeHabitoData($habitoFields));
    }

    /**
     * Get fake data of Habito
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHabitoData($habitoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $habitoFields);
    }
}
