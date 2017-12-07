<?php

use Faker\Factory as Faker;
use App\Models\UsoMedicamento;
use App\Repositories\UsoMedicamentoRepository;

trait MakeUsoMedicamentoTrait
{
    /**
     * Create fake instance of UsoMedicamento and save it in database
     *
     * @param array $usoMedicamentoFields
     * @return UsoMedicamento
     */
    public function makeUsoMedicamento($usoMedicamentoFields = [])
    {
        /** @var UsoMedicamentoRepository $usoMedicamentoRepo */
        $usoMedicamentoRepo = App::make(UsoMedicamentoRepository::class);
        $theme = $this->fakeUsoMedicamentoData($usoMedicamentoFields);
        return $usoMedicamentoRepo->create($theme);
    }

    /**
     * Get fake instance of UsoMedicamento
     *
     * @param array $usoMedicamentoFields
     * @return UsoMedicamento
     */
    public function fakeUsoMedicamento($usoMedicamentoFields = [])
    {
        return new UsoMedicamento($this->fakeUsoMedicamentoData($usoMedicamentoFields));
    }

    /**
     * Get fake data of UsoMedicamento
     *
     * @param array $postFields
     * @return array
     */
    public function fakeUsoMedicamentoData($usoMedicamentoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'fechaInicio' => $fake->word,
            'Medicamento_id' => $fake->randomDigitNotNull,
            'Paciente_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $usoMedicamentoFields);
    }
}
