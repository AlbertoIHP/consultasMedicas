<?php

use Faker\Factory as Faker;
use App\Models\Disponibilidad;
use App\Repositories\DisponibilidadRepository;

trait MakeDisponibilidadTrait
{
    /**
     * Create fake instance of Disponibilidad and save it in database
     *
     * @param array $disponibilidadFields
     * @return Disponibilidad
     */
    public function makeDisponibilidad($disponibilidadFields = [])
    {
        /** @var DisponibilidadRepository $disponibilidadRepo */
        $disponibilidadRepo = App::make(DisponibilidadRepository::class);
        $theme = $this->fakeDisponibilidadData($disponibilidadFields);
        return $disponibilidadRepo->create($theme);
    }

    /**
     * Get fake instance of Disponibilidad
     *
     * @param array $disponibilidadFields
     * @return Disponibilidad
     */
    public function fakeDisponibilidad($disponibilidadFields = [])
    {
        return new Disponibilidad($this->fakeDisponibilidadData($disponibilidadFields));
    }

    /**
     * Get fake data of Disponibilidad
     *
     * @param array $postFields
     * @return array
     */
    public function fakeDisponibilidadData($disponibilidadFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'dia' => $fake->word,
            'hora_inicio' => $fake->word,
            'hora_termino' => $fake->word,
            'Medico_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $disponibilidadFields);
    }
}
