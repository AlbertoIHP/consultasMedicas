<?php

namespace App\Repositories;

use App\Models\Atencion;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AtencionRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:43 pm UTC
 *
 * @method Atencion findWithoutFail($id, $columns = ['*'])
 * @method Atencion find($id, $columns = ['*'])
 * @method Atencion first($columns = ['*'])
*/
class AtencionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'peso',
        'estatura',
        'calificacion',
        'BoxConsulta_id',
        'Cita_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Atencion::class;
    }
}
