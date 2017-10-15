<?php

namespace App\Repositories;

use App\Models\PrevisionActual;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PrevisionActualRepository
 * @package App\Repositories
 * @version October 15, 2017, 3:57 am UTC
 *
 * @method PrevisionActual findWithoutFail($id, $columns = ['*'])
 * @method PrevisionActual find($id, $columns = ['*'])
 * @method PrevisionActual first($columns = ['*'])
*/
class PrevisionActualRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaActualizacion',
        'Prevision_id',
        'Persona_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return PrevisionActual::class;
    }
}
