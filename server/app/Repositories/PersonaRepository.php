<?php

namespace App\Repositories;

use App\Models\Persona;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PersonaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:37 am UTC
 *
 * @method Persona findWithoutFail($id, $columns = ['*'])
 * @method Persona find($id, $columns = ['*'])
 * @method Persona first($columns = ['*'])
*/
class PersonaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre1',
        'nombre2',
        'apellido1',
        'apellido2',
        'tipo',
        'idRegion',
        'idProvincia',
        'fono_casa',
        'fono_trabajo',
        'movil',
        'idGenero',
        'FichaMedica_rut',
        'EstadoCivil_idEstadoCivil',
        'Comuna_Provincia_idProvincia',
        'Comuna_idComuna'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Persona::class;
    }
}
