<?php

namespace App\Repositories;

use App\Models\Persona;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PersonaRepository
 * @package App\Repositories
 * @version October 16, 2017, 10:49 pm UTC
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
        'rut',
        'nombre1',
        'nombre2',
        'apellido1',
        'apellido2',
        'fono_casa',
        'fono_trabajo',
        'movil',
        'Genero_id',
        'Comuna_id',
        'EstadoCivil_id',
        'estado'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Persona::class;
    }
}
