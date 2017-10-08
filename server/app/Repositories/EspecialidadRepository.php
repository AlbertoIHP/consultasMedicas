<?php

namespace App\Repositories;

use App\Models\Especialidad;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EspecialidadRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:37 am UTC
 *
 * @method Especialidad findWithoutFail($id, $columns = ['*'])
 * @method Especialidad find($id, $columns = ['*'])
 * @method Especialidad first($columns = ['*'])
*/
class EspecialidadRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Especialidad::class;
    }
}
