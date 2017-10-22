<?php

use Faker\Factory as Faker;
use App\Models\TipoBox;
use App\Repositories\TipoBoxRepository;

trait MakeTipoBoxTrait
{
    /**
     * Create fake instance of TipoBox and save it in database
     *
     * @param array $tipoBoxFields
     * @return TipoBox
     */
    public function makeTipoBox($tipoBoxFields = [])
    {
        /** @var TipoBoxRepository $tipoBoxRepo */
        $tipoBoxRepo = App::make(TipoBoxRepository::class);
        $theme = $this->fakeTipoBoxData($tipoBoxFields);
        return $tipoBoxRepo->create($theme);
    }

    /**
     * Get fake instance of TipoBox
     *
     * @param array $tipoBoxFields
     * @return TipoBox
     */
    public function fakeTipoBox($tipoBoxFields = [])
    {
        return new TipoBox($this->fakeTipoBoxData($tipoBoxFields));
    }

    /**
     * Get fake data of TipoBox
     *
     * @param array $postFields
     * @return array
     */
    public function fakeTipoBoxData($tipoBoxFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'descripcion' => $fake->word
        ], $tipoBoxFields);
    }
}
