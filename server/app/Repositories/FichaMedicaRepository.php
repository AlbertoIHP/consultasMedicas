<?php

namespace App\Repositories;

use App\Models\FichaMedica;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class FichaMedicaRepository
 * @package App\Repositories
 * @version October 15, 2017, 3:59 am UTC
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
        'nombreResponsable',
        'fechaCreacion',
        'pesoActual',
        'estaturaActual',
        'Persona_id',
        'TipoSangre_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return FichaMedica::class;
    }
}
