<?php

use Faker\Factory as Faker;
use App\Models\Feriado;
use App\Repositories\FeriadoRepository;

trait MakeFeriadoTrait
{
    /**
     * Create fake instance of Feriado and save it in database
     *
     * @param array $feriadoFields
     * @return Feriado
     */
    public function makeFeriado($feriadoFields = [])
    {
        /** @var FeriadoRepository $feriadoRepo */
        $feriadoRepo = App::make(FeriadoRepository::class);
        $theme = $this->fakeFeriadoData($feriadoFields);
        return $feriadoRepo->create($theme);
    }

    /**
     * Get fake instance of Feriado
     *
     * @param array $feriadoFields
     * @return Feriado
     */
    public function fakeFeriado($feriadoFields = [])
    {
        return new Feriado($this->fakeFeriadoData($feriadoFields));
    }

    /**
     * Get fake data of Feriado
     *
     * @param array $postFields
     * @return array
     */
    public function fakeFeriadoData($feriadoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'dia' => $fake->word,
            'descripcion' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $feriadoFields);
    }
}
