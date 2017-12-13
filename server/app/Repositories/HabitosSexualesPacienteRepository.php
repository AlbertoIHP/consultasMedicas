<?php

namespace App\Repositories;

use App\Models\HabitosSexualesPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HabitosSexualesPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:16 am UTC
 *
 * @method HabitosSexualesPaciente findWithoutFail($id, $columns = ['*'])
 * @method HabitosSexualesPaciente find($id, $columns = ['*'])
 * @method HabitosSexualesPaciente first($columns = ['*'])
*/
class HabitosSexualesPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'verdadero',
        'HabitoSexual_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return HabitosSexualesPaciente::class;
    }
}
