<?php

namespace App\Repositories;

use App\Models\Disponibilidad;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DisponibilidadRepository
 * @package App\Repositories
 * @version December 22, 2017, 2:13 am UTC
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
        'disponible',
        'Medico_id',
        'Horario_id',
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
