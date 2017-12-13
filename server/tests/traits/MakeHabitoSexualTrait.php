<?php

use Faker\Factory as Faker;
use App\Models\HabitoSexual;
use App\Repositories\HabitoSexualRepository;

trait MakeHabitoSexualTrait
{
    /**
     * Create fake instance of HabitoSexual and save it in database
     *
     * @param array $habitoSexualFields
     * @return HabitoSexual
     */
    public function makeHabitoSexual($habitoSexualFields = [])
    {
        /** @var HabitoSexualRepository $habitoSexualRepo */
        $habitoSexualRepo = App::make(HabitoSexualRepository::class);
        $theme = $this->fakeHabitoSexualData($habitoSexualFields);
        return $habitoSexualRepo->create($theme);
    }

    /**
     * Get fake instance of HabitoSexual
     *
     * @param array $habitoSexualFields
     * @return HabitoSexual
     */
    public function fakeHabitoSexual($habitoSexualFields = [])
    {
        return new HabitoSexual($this->fakeHabitoSexualData($habitoSexualFields));
    }

    /**
     * Get fake data of HabitoSexual
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHabitoSexualData($habitoSexualFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $habitoSexualFields);
    }
}
