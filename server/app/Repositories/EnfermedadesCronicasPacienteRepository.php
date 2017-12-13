<?php

namespace App\Repositories;

use App\Models\EnfermedadesCronicasPaciente;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EnfermedadesCronicasPacienteRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:17 am UTC
 *
 * @method EnfermedadesCronicasPaciente findWithoutFail($id, $columns = ['*'])
 * @method EnfermedadesCronicasPaciente find($id, $columns = ['*'])
 * @method EnfermedadesCronicasPaciente first($columns = ['*'])
*/
class EnfermedadesCronicasPacienteRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaDeteccion',
        'EnfermedadCronica_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return EnfermedadesCronicasPaciente::class;
    }
}
