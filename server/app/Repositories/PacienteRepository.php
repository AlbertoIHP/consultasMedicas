<?php

namespace App\Repositories;

use App\Models\Paciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PacienteRepository
 * @package App\Repositories
 * @version October 16, 2017, 10:49 pm UTC
 *
 * @method Paciente findWithoutFail($id, $columns = ['*'])
 * @method Paciente find($id, $columns = ['*'])
 * @method Paciente first($columns = ['*'])
*/
class PacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Persona_id',
        'TipoSangre_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Paciente::class;
    }
}
