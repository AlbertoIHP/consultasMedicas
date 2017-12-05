<?php

use Faker\Factory as Faker;
use App\Models\Medicamento;
use App\Repositories\MedicamentoRepository;

trait MakeMedicamentoTrait
{
    /**
     * Create fake instance of Medicamento and save it in database
     *
     * @param array $medicamentoFields
     * @return Medicamento
     */
    public function makeMedicamento($medicamentoFields = [])
    {
        /** @var MedicamentoRepository $medicamentoRepo */
        $medicamentoRepo = App::make(MedicamentoRepository::class);
        $theme = $this->fakeMedicamentoData($medicamentoFields);
        return $medicamentoRepo->create($theme);
    }

    /**
     * Get fake instance of Medicamento
     *
     * @param array $medicamentoFields
     * @return Medicamento
     */
    public function fakeMedicamento($medicamentoFields = [])
    {
        return new Medicamento($this->fakeMedicamentoData($medicamentoFields));
    }

    /**
     * Get fake data of Medicamento
     *
     * @param array $postFields
     * @return array
     */
    public function fakeMedicamentoData($medicamentoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombrecomun' => $fake->word,
            'nombrecientifico' => $fake->word,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $medicamentoFields);
    }
}
