<?php

use Faker\Factory as Faker;
use App\Models\DiagnosticoAtencion;
use App\Repositories\DiagnosticoAtencionRepository;

trait MakeDiagnosticoAtencionTrait
{
    /**
     * Create fake instance of DiagnosticoAtencion and save it in database
     *
     * @param array $diagnosticoAtencionFields
     * @return DiagnosticoAtencion
     */
    public function makeDiagnosticoAtencion($diagnosticoAtencionFields = [])
    {
        /** @var DiagnosticoAtencionRepository $diagnosticoAtencionRepo */
        $diagnosticoAtencionRepo = App::make(DiagnosticoAtencionRepository::class);
        $theme = $this->fakeDiagnosticoAtencionData($diagnosticoAtencionFields);
        return $diagnosticoAtencionRepo->create($theme);
    }

    /**
     * Get fake instance of DiagnosticoAtencion
     *
     * @param array $diagnosticoAtencionFields
     * @return DiagnosticoAtencion
     */
    public function fakeDiagnosticoAtencion($diagnosticoAtencionFields = [])
    {
        return new DiagnosticoAtencion($this->fakeDiagnosticoAtencionData($diagnosticoAtencionFields));
    }

    /**
     * Get fake data of DiagnosticoAtencion
     *
     * @param array $postFields
     * @return array
     */
    public function fakeDiagnosticoAtencionData($diagnosticoAtencionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Atention_Cita_idCita' => $fake->randomDigitNotNull,
            'Diagnostico_idDiagnostico' => $fake->randomDigitNotNull,
            'Observacion' => $fake->text
        ], $diagnosticoAtencionFields);
    }
}
