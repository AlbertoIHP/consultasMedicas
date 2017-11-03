<?php

namespace App\Repositories;

use App\Models\Cita;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class CitaRepository
 * @package App\Repositories
 * @version November 3, 2017, 12:44 am UTC
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
        'Medico_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Cita::class;
    }
}
