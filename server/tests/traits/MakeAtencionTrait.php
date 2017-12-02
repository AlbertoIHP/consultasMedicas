<?php

use Faker\Factory as Faker;
use App\Models\Atencion;
use App\Repositories\AtencionRepository;

trait MakeAtencionTrait
{
    /**
     * Create fake instance of Atencion and save it in database
     *
     * @param array $atencionFields
     * @return Atencion
     */
    public function makeAtencion($atencionFields = [])
    {
        /** @var AtencionRepository $atencionRepo */
        $atencionRepo = App::make(AtencionRepository::class);
        $theme = $this->fakeAtencionData($atencionFields);
        return $atencionRepo->create($theme);
    }

    /**
     * Get fake instance of Atencion
     *
     * @param array $atencionFields
     * @return Atencion
     */
    public function fakeAtencion($atencionFields = [])
    {
        return new Atencion($this->fakeAtencionData($atencionFields));
    }

    /**
     * Get fake data of Atencion
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAtencionData($atencionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'peso' => $fake->word,
            'estatura' => $fake->word,
            'calificacion' => $fake->randomDigitNotNull,
            'BoxConsulta_id' => $fake->randomDigitNotNull,
            'Cita_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $atencionFields);
    }
}
