<?php

use Faker\Factory as Faker;
use App\Models\GrupoEtnico;
use App\Repositories\GrupoEtnicoRepository;

trait MakeGrupoEtnicoTrait
{
    /**
     * Create fake instance of GrupoEtnico and save it in database
     *
     * @param array $grupoEtnicoFields
     * @return GrupoEtnico
     */
    public function makeGrupoEtnico($grupoEtnicoFields = [])
    {
        /** @var GrupoEtnicoRepository $grupoEtnicoRepo */
        $grupoEtnicoRepo = App::make(GrupoEtnicoRepository::class);
        $theme = $this->fakeGrupoEtnicoData($grupoEtnicoFields);
        return $grupoEtnicoRepo->create($theme);
    }

    /**
     * Get fake instance of GrupoEtnico
     *
     * @param array $grupoEtnicoFields
     * @return GrupoEtnico
     */
    public function fakeGrupoEtnico($grupoEtnicoFields = [])
    {
        return new GrupoEtnico($this->fakeGrupoEtnicoData($grupoEtnicoFields));
    }

    /**
     * Get fake data of GrupoEtnico
     *
     * @param array $postFields
     * @return array
     */
    public function fakeGrupoEtnicoData($grupoEtnicoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $grupoEtnicoFields);
    }
}
