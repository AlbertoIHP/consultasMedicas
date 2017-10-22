<?php

use Faker\Factory as Faker;
use App\Models\RecetaMedicamento;
use App\Repositories\RecetaMedicamentoRepository;

trait MakeRecetaMedicamentoTrait
{
    /**
     * Create fake instance of RecetaMedicamento and save it in database
     *
     * @param array $recetaMedicamentoFields
     * @return RecetaMedicamento
     */
    public function makeRecetaMedicamento($recetaMedicamentoFields = [])
    {
        /** @var RecetaMedicamentoRepository $recetaMedicamentoRepo */
        $recetaMedicamentoRepo = App::make(RecetaMedicamentoRepository::class);
        $theme = $this->fakeRecetaMedicamentoData($recetaMedicamentoFields);
        return $recetaMedicamentoRepo->create($theme);
    }

    /**
     * Get fake instance of RecetaMedicamento
     *
     * @param array $recetaMedicamentoFields
     * @return RecetaMedicamento
     */
    public function fakeRecetaMedicamento($recetaMedicamentoFields = [])
    {
        return new RecetaMedicamento($this->fakeRecetaMedicamentoData($recetaMedicamentoFields));
    }

    /**
     * Get fake data of RecetaMedicamento
     *
     * @param array $postFields
     * @return array
     */
    public function fakeRecetaMedicamentoData($recetaMedicamentoFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Receta_idReceta' => $fake->randomDigitNotNull,
            'Medicamento_idMedicamento' => $fake->randomDigitNotNull,
            'Receta_has_Medicamentocol' => $fake->word,
            'dosis' => $fake->word,
            'cantidad' => $fake->randomDigitNotNull,
            'tiempo' => $fake->randomDigitNotNull,
            'intervalo' => $fake->randomDigitNotNull,
            'ViaAdministracionMedicamento_idViaAdministracionMedicamento' => $fake->randomDigitNotNull
        ], $recetaMedicamentoFields);
    }
}
