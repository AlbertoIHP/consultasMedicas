<?php

namespace App\Repositories;

use App\Models\Atention;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AtentionRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:37 am UTC
 *
 * @method Atention findWithoutFail($id, $columns = ['*'])
 * @method Atention find($id, $columns = ['*'])
 * @method Atention first($columns = ['*'])
*/
class AtentionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Cita_idCita',
        'Doctor_rut',
        'BoxConsulta_idConsulta'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Atention::class;
    }
}
