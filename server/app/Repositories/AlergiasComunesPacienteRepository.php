<?php

namespace App\Repositories;

use App\Models\AlergiasComunesPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AlergiasComunesPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:17 am UTC
 *
 * @method AlergiasComunesPaciente findWithoutFail($id, $columns = ['*'])
 * @method AlergiasComunesPaciente find($id, $columns = ['*'])
 * @method AlergiasComunesPaciente first($columns = ['*'])
*/
class AlergiasComunesPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaDeteccion',
        'Alergia_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return AlergiasComunesPaciente::class;
    }
}
