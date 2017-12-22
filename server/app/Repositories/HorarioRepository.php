<?php

namespace App\Repositories;

use App\Models\Horario;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HorarioRepository
 * @package App\Repositories
 * @version December 22, 2017, 2:34 am UTC
 *
 * @method Horario findWithoutFail($id, $columns = ['*'])
 * @method Horario find($id, $columns = ['*'])
 * @method Horario first($columns = ['*'])
*/
class HorarioRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'dia',
        'horaInicio',
        'improvisado',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Horario::class;
    }
}
