<?php

namespace App\Repositories;

use App\Models\RecetaMedicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class RecetaMedicamentoRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:40 am UTC
 *
 * @method RecetaMedicamento findWithoutFail($id, $columns = ['*'])
 * @method RecetaMedicamento find($id, $columns = ['*'])
 * @method RecetaMedicamento first($columns = ['*'])
*/
class RecetaMedicamentoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Receta_idReceta',
        'Medicamento_idMedicamento',
        'Receta_has_Medicamentocol',
        'dosis',
        'cantidad',
        'tiempo',
        'intervalo',
        'ViaAdministracionMedicamento_idViaAdministracionMedicamento'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return RecetaMedicamento::class;
    }
}
