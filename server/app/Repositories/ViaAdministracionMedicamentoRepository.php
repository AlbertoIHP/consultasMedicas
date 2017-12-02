<?php

namespace App\Repositories;

use App\Models\ViaAdministracionMedicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ViaAdministracionMedicamentoRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:53 pm UTC
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
        'descripcion',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return ViaAdministracionMedicamento::class;
    }
}
