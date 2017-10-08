<?php

namespace App\Repositories;

use App\Models\Persona;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PersonaRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:56 am UTC
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
        'fono_casa',
        'fono_trabajo',
        'movil',
        'idGenero',
        'EstadoCivil_idEstado',
        'Comuna_idComuna',
        'Usuario_email',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Persona::class;
    }
}
