<?php

namespace App\Repositories;

use App\Models\Ocupacion;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class OcupacionRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:15 am UTC
 *
 * @method Ocupacion findWithoutFail($id, $columns = ['*'])
 * @method Ocupacion find($id, $columns = ['*'])
 * @method Ocupacion first($columns = ['*'])
*/
class OcupacionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Ocupacion::class;
    }
}
