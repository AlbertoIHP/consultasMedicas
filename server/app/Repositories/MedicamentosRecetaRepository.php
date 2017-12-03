<?php

namespace App\Repositories;

use App\Models\MedicamentosReceta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class MedicamentosRecetaRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:55 pm UTC
 *
 * @method MedicamentosReceta findWithoutFail($id, $columns = ['*'])
 * @method MedicamentosReceta find($id, $columns = ['*'])
 * @method MedicamentosReceta first($columns = ['*'])
*/
class MedicamentosRecetaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'dosis',
        'cantidad',
        'tiempo',
        'intervalo',
        'Medicamento_id',
        'ViaAdministracionMedicamento_id',
        'Receta_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return MedicamentosReceta::class;
    }
}
