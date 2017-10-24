<?php

namespace App\Repositories;

use App\Models\PermisoModulo;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PermisoModuloRepository
 * @package App\Repositories
 * @version October 24, 2017, 5:08 am UTC
 *
 * @method PermisoModulo findWithoutFail($id, $columns = ['*'])
 * @method PermisoModulo find($id, $columns = ['*'])
 * @method PermisoModulo first($columns = ['*'])
*/
class PermisoModuloRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Modulo_id',
        'write',
        'delete',
        'update',
        'view'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return PermisoModulo::class;
    }
}
