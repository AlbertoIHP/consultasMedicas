<?php

namespace App\Repositories;

use App\Models\Cita;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class CitaRepository
 * @package App\Repositories
 * @version December 22, 2017, 2:33 am UTC
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
        'hora',
        'EstadoCita_id',
        'BoxConsulta_id',
        'Paciente_id',
        'Medico_id',
        'Disponibilidad_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Cita::class;
    }
}
