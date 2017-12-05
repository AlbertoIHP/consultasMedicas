<?php

namespace App\Repositories;

use App\Models\Disponibilidad;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DisponibilidadRepository
 * @package App\Repositories
 * @version November 14, 2017, 5:49 am UTC
 *
 * @method Disponibilidad findWithoutFail($id, $columns = ['*'])
 * @method Disponibilidad find($id, $columns = ['*'])
 * @method Disponibilidad first($columns = ['*'])
*/
class DisponibilidadRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'dia',
        'hora_inicio',
        'hora_termino',
        'Medico_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Disponibilidad::class;
    }
}
