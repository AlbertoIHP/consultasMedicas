<?php

use Faker\Factory as Faker;
use App\Models\Alergia;
use App\Repositories\AlergiaRepository;

trait MakeAlergiaTrait
{
    /**
     * Create fake instance of Alergia and save it in database
     *
     * @param array $alergiaFields
     * @return Alergia
     */
    public function makeAlergia($alergiaFields = [])
    {
        /** @var AlergiaRepository $alergiaRepo */
        $alergiaRepo = App::make(AlergiaRepository::class);
        $theme = $this->fakeAlergiaData($alergiaFields);
        return $alergiaRepo->create($theme);
    }

    /**
     * Get fake instance of Alergia
     *
     * @param array $alergiaFields
     * @return Alergia
     */
    public function fakeAlergia($alergiaFields = [])
    {
        return new Alergia($this->fakeAlergiaData($alergiaFields));
    }

    /**
     * Get fake data of Alergia
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAlergiaData($alergiaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $alergiaFields);
    }
}
