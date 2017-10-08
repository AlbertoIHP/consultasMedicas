<?php

namespace App\Repositories;

use App\Models\PrevisionActual;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PrevisionActualRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:56 am UTC
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
        'Prevision_idPrevision',
        'Persona_rut',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return PrevisionActual::class;
    }
}
