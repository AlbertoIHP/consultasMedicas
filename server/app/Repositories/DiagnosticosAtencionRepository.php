<?php

namespace App\Repositories;

use App\Models\DiagnosticosAtencion;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DiagnosticosAtencionRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:52 pm UTC
 *
 * @method DiagnosticosAtencion findWithoutFail($id, $columns = ['*'])
 * @method DiagnosticosAtencion find($id, $columns = ['*'])
 * @method DiagnosticosAtencion first($columns = ['*'])
*/
class DiagnosticosAtencionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Observacion',
        'Atencion_id',
        'Diagnostico_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return DiagnosticosAtencion::class;
    }
}
