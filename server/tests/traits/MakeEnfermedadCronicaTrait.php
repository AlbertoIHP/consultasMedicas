<?php

use Faker\Factory as Faker;
use App\Models\EnfermedadCronica;
use App\Repositories\EnfermedadCronicaRepository;

trait MakeEnfermedadCronicaTrait
{
    /**
     * Create fake instance of EnfermedadCronica and save it in database
     *
     * @param array $enfermedadCronicaFields
     * @return EnfermedadCronica
     */
    public function makeEnfermedadCronica($enfermedadCronicaFields = [])
    {
        /** @var EnfermedadCronicaRepository $enfermedadCronicaRepo */
        $enfermedadCronicaRepo = App::make(EnfermedadCronicaRepository::class);
        $theme = $this->fakeEnfermedadCronicaData($enfermedadCronicaFields);
        return $enfermedadCronicaRepo->create($theme);
    }

    /**
     * Get fake instance of EnfermedadCronica
     *
     * @param array $enfermedadCronicaFields
     * @return EnfermedadCronica
     */
    public function fakeEnfermedadCronica($enfermedadCronicaFields = [])
    {
        return new EnfermedadCronica($this->fakeEnfermedadCronicaData($enfermedadCronicaFields));
    }

    /**
     * Get fake data of EnfermedadCronica
     *
     * @param array $postFields
     * @return array
     */
    public function fakeEnfermedadCronicaData($enfermedadCronicaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $enfermedadCronicaFields);
    }
}
