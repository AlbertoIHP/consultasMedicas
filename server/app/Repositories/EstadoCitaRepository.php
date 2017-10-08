<?php

namespace App\Repositories;

use App\Models\EstadoCita;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EstadoCitaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:36 am UTC
 *
 * @method EstadoCita findWithoutFail($id, $columns = ['*'])
 * @method EstadoCita find($id, $columns = ['*'])
 * @method EstadoCita first($columns = ['*'])
*/
class EstadoCitaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'estadoCita'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return EstadoCita::class;
    }
}
