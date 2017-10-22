<?php

use Faker\Factory as Faker;
use App\Models\TipoSangre;
use App\Repositories\TipoSangreRepository;

trait MakeTipoSangreTrait
{
    /**
     * Create fake instance of TipoSangre and save it in database
     *
     * @param array $tipoSangreFields
     * @return TipoSangre
     */
    public function makeTipoSangre($tipoSangreFields = [])
    {
        /** @var TipoSangreRepository $tipoSangreRepo */
        $tipoSangreRepo = App::make(TipoSangreRepository::class);
        $theme = $this->fakeTipoSangreData($tipoSangreFields);
        return $tipoSangreRepo->create($theme);
    }

    /**
     * Get fake instance of TipoSangre
     *
     * @param array $tipoSangreFields
     * @return TipoSangre
     */
    public function fakeTipoSangre($tipoSangreFields = [])
    {
        return new TipoSangre($this->fakeTipoSangreData($tipoSangreFields));
    }

    /**
     * Get fake data of TipoSangre
     *
     * @param array $postFields
     * @return array
     */
    public function fakeTipoSangreData($tipoSangreFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre' => $fake->word,
            'descripcion' => $fake->text
        ], $tipoSangreFields);
    }
}
