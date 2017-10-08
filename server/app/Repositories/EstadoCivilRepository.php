<?php

namespace App\Repositories;

use App\Models\EstadoCivil;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EstadoCivilRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:34 am UTC
 *
 * @method EstadoCivil findWithoutFail($id, $columns = ['*'])
 * @method EstadoCivil find($id, $columns = ['*'])
 * @method EstadoCivil first($columns = ['*'])
*/
class EstadoCivilRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descripcion',
        'nombre'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return EstadoCivil::class;
    }
}
