<?php

namespace App\Repositories;

use App\Models\Modulo;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ModuloRepository
 * @package App\Repositories
 * @version October 24, 2017, 5:08 am UTC
 *
 * @method Modulo findWithoutFail($id, $columns = ['*'])
 * @method Modulo find($id, $columns = ['*'])
 * @method Modulo first($columns = ['*'])
*/
class ModuloRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Modulo::class;
    }
}
