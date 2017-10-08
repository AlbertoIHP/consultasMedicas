<?php

use Faker\Factory as Faker;
use App\Models\ViaAdministracionMedicamento;
use App\Repositories\ViaAdministracionMedicamentoRepository;

trait MakeViaAdministracionMedicamentoTrait
{
    /**
     * Create fake instance of ViaAdministracionMedicamento and save it in database
     *
     * @param array $viaAdministracionMedicamentoFields
     * @return ViaAdministracionMedicamento
     */
    public function makeViaAdministracionMedicamento($viaAdministracionMedicamentoFields = [])
    {
        /** @var ViaAdministracionMedicamentoRepository $viaAdministracionMedicamentoRepo */
        $viaAdministracionMedicamentoRepo = App::make(ViaAdministracionMedicamentoRepository::class);
        $theme = $this->fakeViaAdministracionMedicamentoData($viaAdministracionMedicamentoFields);
        return $viaAdministracionMedicamentoRepo->create($theme);
    }

    /**
     * Get fake instance of ViaAdministracionMedicamento
     *
     * @param array $viaAdministracionMedicamentoFields
     * @return ViaAdministracionMedicamento
     */
    public function fakeViaAdministracionMedicamento($viaAdministracionMedicamentoFields = [])
    {
        return new ViaAdministracionMedicamento($this->fakeViaAdministracionMedicamentoData($viaAdministracionMedicamentoFields));
    }

    /**
     * Get fake data of ViaAdministracionMedicamento
     *
     * @param array $postFields
     * @return array
     */
    public function fakeViaAdministracionMedicamentoData($viaAdministracionMedicamentoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'descripcion' => $fake->word
        ], $viaAdministracionMedicamentoFields);
    }
}
