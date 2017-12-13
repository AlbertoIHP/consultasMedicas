<?php

namespace App\Repositories;

use App\Models\Paciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PacienteRepository
 * @package App\Repositories
 * @version December 8, 2017, 3:34 am UTC
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
        'TipoSangre_id',
        'GrupoEtnico_id',
        'Ocupacion_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Paciente::class;
    }
}
