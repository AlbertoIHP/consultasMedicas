<?php

namespace App\Repositories;

use App\Models\HabitosPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HabitosPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:17 am UTC
 *
 * @method HabitosPaciente findWithoutFail($id, $columns = ['*'])
 * @method HabitosPaciente find($id, $columns = ['*'])
 * @method HabitosPaciente first($columns = ['*'])
*/
class HabitosPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaInicio',
        'Habito_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return HabitosPaciente::class;
    }
}
