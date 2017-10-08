<?php

namespace App\Repositories;

use App\Models\DiagnosticoAtencion;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DiagnosticoAtencionRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:38 am UTC
 *
 * @method DiagnosticoAtencion findWithoutFail($id, $columns = ['*'])
 * @method DiagnosticoAtencion find($id, $columns = ['*'])
 * @method DiagnosticoAtencion first($columns = ['*'])
*/
class DiagnosticoAtencionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Atention_Cita_idCita',
        'Diagnostico_idDiagnostico',
        'Observacion'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return DiagnosticoAtencion::class;
    }
}
