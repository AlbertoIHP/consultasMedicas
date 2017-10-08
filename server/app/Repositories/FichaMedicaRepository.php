<?php

namespace App\Repositories;

use App\Models\FichaMedica;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class FichaMedicaRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:56 am UTC
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
