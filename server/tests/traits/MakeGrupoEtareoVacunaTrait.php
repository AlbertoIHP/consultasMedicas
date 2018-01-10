<?php

use Faker\Factory as Faker;
use App\Models\GrupoEtareoVacuna;
use App\Repositories\GrupoEtareoVacunaRepository;

trait MakeGrupoEtareoVacunaTrait
{
    /**
     * Create fake instance of GrupoEtareoVacuna and save it in database
     *
     * @param array $grupoEtareoVacunaFields
     * @return GrupoEtareoVacuna
     */
    public function makeGrupoEtareoVacuna($grupoEtareoVacunaFields = [])
    {
        /** @var GrupoEtareoVacunaRepository $grupoEtareoVacunaRepo */
        $grupoEtareoVacunaRepo = App::make(GrupoEtareoVacunaRepository::class);
        $theme = $this->fakeGrupoEtareoVacunaData($grupoEtareoVacunaFields);
        return $grupoEtareoVacunaRepo->create($theme);
    }

    /**
     * Get fake instance of GrupoEtareoVacuna
     *
     * @param array $grupoEtareoVacunaFields
     * @return GrupoEtareoVacuna
     */
    public function fakeGrupoEtareoVacuna($grupoEtareoVacunaFields = [])
    {
        return new GrupoEtareoVacuna($this->fakeGrupoEtareoVacunaData($grupoEtareoVacunaFields));
    }

    /**
     * Get fake data of GrupoEtareoVacuna
     *
     * @param array $postFields
     * @return array
     */
    public function fakeGrupoEtareoVacunaData($grupoEtareoVacunaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'GrupoEtareo_id' => $fake->randomDigitNotNull,
            'Vacuna_id' => $fake->randomDigitNotNull
        ], $grupoEtareoVacunaFields);
    }
}
