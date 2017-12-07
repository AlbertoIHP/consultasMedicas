<?php

use Faker\Factory as Faker;
use App\Models\Ocupacion;
use App\Repositories\OcupacionRepository;

trait MakeOcupacionTrait
{
    /**
     * Create fake instance of Ocupacion and save it in database
     *
     * @param array $ocupacionFields
     * @return Ocupacion
     */
    public function makeOcupacion($ocupacionFields = [])
    {
        /** @var OcupacionRepository $ocupacionRepo */
        $ocupacionRepo = App::make(OcupacionRepository::class);
        $theme = $this->fakeOcupacionData($ocupacionFields);
        return $ocupacionRepo->create($theme);
    }

    /**
     * Get fake instance of Ocupacion
     *
     * @param array $ocupacionFields
     * @return Ocupacion
     */
    public function fakeOcupacion($ocupacionFields = [])
    {
        return new Ocupacion($this->fakeOcupacionData($ocupacionFields));
    }

    /**
     * Get fake data of Ocupacion
     *
     * @param array $postFields
     * @return array
     */
    public function fakeOcupacionData($ocupacionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $ocupacionFields);
    }
}
