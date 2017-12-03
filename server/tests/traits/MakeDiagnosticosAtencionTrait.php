<?php

use Faker\Factory as Faker;
use App\Models\DiagnosticosAtencion;
use App\Repositories\DiagnosticosAtencionRepository;

trait MakeDiagnosticosAtencionTrait
{
    /**
     * Create fake instance of DiagnosticosAtencion and save it in database
     *
     * @param array $diagnosticosAtencionFields
     * @return DiagnosticosAtencion
     */
    public function makeDiagnosticosAtencion($diagnosticosAtencionFields = [])
    {
        /** @var DiagnosticosAtencionRepository $diagnosticosAtencionRepo */
        $diagnosticosAtencionRepo = App::make(DiagnosticosAtencionRepository::class);
        $theme = $this->fakeDiagnosticosAtencionData($diagnosticosAtencionFields);
        return $diagnosticosAtencionRepo->create($theme);
    }

    /**
     * Get fake instance of DiagnosticosAtencion
     *
     * @param array $diagnosticosAtencionFields
     * @return DiagnosticosAtencion
     */
    public function fakeDiagnosticosAtencion($diagnosticosAtencionFields = [])
    {
        return new DiagnosticosAtencion($this->fakeDiagnosticosAtencionData($diagnosticosAtencionFields));
    }

    /**
     * Get fake data of DiagnosticosAtencion
     *
     * @param array $postFields
     * @return array
     */
    public function fakeDiagnosticosAtencionData($diagnosticosAtencionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Observacion' => $fake->text,
            'Atencion_id' => $fake->randomDigitNotNull,
            'Diagnostico_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $diagnosticosAtencionFields);
    }
}
