<?php

namespace App\Repositories;

use App\Models\Cita;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class CitaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:36 am UTC
 *
 * @method Cita findWithoutFail($id, $columns = ['*'])
 * @method Cita find($id, $columns = ['*'])
 * @method Cita first($columns = ['*'])
*/
class CitaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fecha',
        'Consulta_idConsulta',
        'Doctor_rut',
        'Persona_rut',
        'fechahora',
        'EstadoCita_idEstadoCita'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Cita::class;
    }
}
