<?php

namespace App\Repositories;

use App\Models\AlergiasMedicamentosPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AlergiasMedicamentosPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:18 am UTC
 *
 * @method AlergiasMedicamentosPaciente findWithoutFail($id, $columns = ['*'])
 * @method AlergiasMedicamentosPaciente find($id, $columns = ['*'])
 * @method AlergiasMedicamentosPaciente first($columns = ['*'])
*/
class AlergiasMedicamentosPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaInicio',
        'Medicamento_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return AlergiasMedicamentosPaciente::class;
    }
}
