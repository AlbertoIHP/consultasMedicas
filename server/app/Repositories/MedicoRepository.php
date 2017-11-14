<?php

namespace App\Repositories;

use App\Models\Medico;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class MedicoRepository
 * @package App\Repositories
 * @version November 14, 2017, 5:50 am UTC
 *
 * @method Medico findWithoutFail($id, $columns = ['*'])
 * @method Medico find($id, $columns = ['*'])
 * @method Medico first($columns = ['*'])
*/
class MedicoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Especialidad_id',
        'Persona_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Medico::class;
    }
}
