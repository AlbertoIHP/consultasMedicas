<?php

namespace App\Repositories;

use App\Models\AlergiasPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AlergiasPacienteRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:55 pm UTC
 *
 * @method AlergiasPaciente findWithoutFail($id, $columns = ['*'])
 * @method AlergiasPaciente find($id, $columns = ['*'])
 * @method AlergiasPaciente first($columns = ['*'])
*/
class AlergiasPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Medicamento_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return AlergiasPaciente::class;
    }
}
