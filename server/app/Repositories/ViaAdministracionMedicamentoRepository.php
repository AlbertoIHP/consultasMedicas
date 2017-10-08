<?php

namespace App\Repositories;

use App\Models\ViaAdministracionMedicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ViaAdministracionMedicamentoRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:39 am UTC
 *
 * @method ViaAdministracionMedicamento findWithoutFail($id, $columns = ['*'])
 * @method ViaAdministracionMedicamento find($id, $columns = ['*'])
 * @method ViaAdministracionMedicamento first($columns = ['*'])
*/
class ViaAdministracionMedicamentoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descripcion'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return ViaAdministracionMedicamento::class;
    }
}
