<?php

namespace App\Repositories;

use App\Models\PermisoModulo;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PermisoModuloRepository
 * @package App\Repositories
 * @version November 5, 2017, 5:22 am UTC
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
        'Role_id',
        'Modulo_id',
        'write',
        'erase',
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
