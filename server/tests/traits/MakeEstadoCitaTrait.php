<?php

use Faker\Factory as Faker;
use App\Models\EstadoCita;
use App\Repositories\EstadoCitaRepository;

trait MakeEstadoCitaTrait
{
    /**
     * Create fake instance of EstadoCita and save it in database
     *
     * @param array $estadoCitaFields
     * @return EstadoCita
     */
    public function makeEstadoCita($estadoCitaFields = [])
    {
        /** @var EstadoCitaRepository $estadoCitaRepo */
        $estadoCitaRepo = App::make(EstadoCitaRepository::class);
        $theme = $this->fakeEstadoCitaData($estadoCitaFields);
        return $estadoCitaRepo->create($theme);
    }

    /**
     * Get fake instance of EstadoCita
     *
     * @param array $estadoCitaFields
     * @return EstadoCita
     */
    public function fakeEstadoCita($estadoCitaFields = [])
    {
        return new EstadoCita($this->fakeEstadoCitaData($estadoCitaFields));
    }

    /**
     * Get fake data of EstadoCita
     *
     * @param array $postFields
     * @return array
     */
    public function fakeEstadoCitaData($estadoCitaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'estadoCita' => $fake->word
        ], $estadoCitaFields);
    }
}
