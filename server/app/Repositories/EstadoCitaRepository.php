<?php

namespace App\Repositories;

use App\Models\EstadoCita;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EstadoCitaRepository
 * @package App\Repositories
 * @version November 3, 2017, 12:43 am UTC
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
        'nombre',
        'descripcion'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return EstadoCita::class;
    }
}
