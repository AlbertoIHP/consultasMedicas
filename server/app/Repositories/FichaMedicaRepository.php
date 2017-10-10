<?php

namespace App\Repositories;

use App\Models\FichaMedica;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class FichaMedicaRepository
 * @package App\Repositories
 * @version October 10, 2017, 2:38 pm UTC
 *
 * @method FichaMedica findWithoutFail($id, $columns = ['*'])
 * @method FichaMedica find($id, $columns = ['*'])
 * @method FichaMedica first($columns = ['*'])
*/
class FichaMedicaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'Persona_rut',
        'nombreResponsable',
        'fechaCreacion',
        'pesoActual',
        'estaturaActual',
        'TipoSangre_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return FichaMedica::class;
    }
}
