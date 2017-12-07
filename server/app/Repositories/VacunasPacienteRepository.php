<?php

namespace App\Repositories;

use App\Models\VacunasPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class VacunasPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:16 am UTC
 *
 * @method VacunasPaciente findWithoutFail($id, $columns = ['*'])
 * @method VacunasPaciente find($id, $columns = ['*'])
 * @method VacunasPaciente first($columns = ['*'])
*/
class VacunasPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaVacunacion',
        'Vacuna_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return VacunasPaciente::class;
    }
}
