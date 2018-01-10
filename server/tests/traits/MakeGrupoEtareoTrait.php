<?php

use Faker\Factory as Faker;
use App\Models\GrupoEtareo;
use App\Repositories\GrupoEtareoRepository;

trait MakeGrupoEtareoTrait
{
    /**
     * Create fake instance of GrupoEtareo and save it in database
     *
     * @param array $grupoEtareoFields
     * @return GrupoEtareo
     */
    public function makeGrupoEtareo($grupoEtareoFields = [])
    {
        /** @var GrupoEtareoRepository $grupoEtareoRepo */
        $grupoEtareoRepo = App::make(GrupoEtareoRepository::class);
        $theme = $this->fakeGrupoEtareoData($grupoEtareoFields);
        return $grupoEtareoRepo->create($theme);
    }

    /**
     * Get fake instance of GrupoEtareo
     *
     * @param array $grupoEtareoFields
     * @return GrupoEtareo
     */
    public function fakeGrupoEtareo($grupoEtareoFields = [])
    {
        return new GrupoEtareo($this->fakeGrupoEtareoData($grupoEtareoFields));
    }

    /**
     * Get fake data of GrupoEtareo
     *
     * @param array $postFields
     * @return array
     */
    public function fakeGrupoEtareoData($grupoEtareoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'edadMinima' => $fake->randomDigitNotNull,
            'edadMaxima' => $fake->randomDigitNotNull
        ], $grupoEtareoFields);
    }
}
