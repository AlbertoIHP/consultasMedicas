<?php

use Faker\Factory as Faker;
use App\Models\MedicamentosReceta;
use App\Repositories\MedicamentosRecetaRepository;

trait MakeMedicamentosRecetaTrait
{
    /**
     * Create fake instance of MedicamentosReceta and save it in database
     *
     * @param array $medicamentosRecetaFields
     * @return MedicamentosReceta
     */
    public function makeMedicamentosReceta($medicamentosRecetaFields = [])
    {
        /** @var MedicamentosRecetaRepository $medicamentosRecetaRepo */
        $medicamentosRecetaRepo = App::make(MedicamentosRecetaRepository::class);
        $theme = $this->fakeMedicamentosRecetaData($medicamentosRecetaFields);
        return $medicamentosRecetaRepo->create($theme);
    }

    /**
     * Get fake instance of MedicamentosReceta
     *
     * @param array $medicamentosRecetaFields
     * @return MedicamentosReceta
     */
    public function fakeMedicamentosReceta($medicamentosRecetaFields = [])
    {
        return new MedicamentosReceta($this->fakeMedicamentosRecetaData($medicamentosRecetaFields));
    }

    /**
     * Get fake data of MedicamentosReceta
     *
     * @param array $postFields
     * @return array
     */
    public function fakeMedicamentosRecetaData($medicamentosRecetaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'dosis' => $fake->word,
            'cantidad' => $fake->randomDigitNotNull,
            'tiempo' => $fake->randomDigitNotNull,
            'intervalo' => $fake->randomDigitNotNull,
            'Medicamento_id' => $fake->randomDigitNotNull,
            'ViaAdministracionMedicamento_id' => $fake->randomDigitNotNull,
            'Receta_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $medicamentosRecetaFields);
    }
}
