<?php

namespace App\Repositories;

use App\Models\Diagnostico;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DiagnosticoRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:38 am UTC
 *
 * @method Diagnostico findWithoutFail($id, $columns = ['*'])
 * @method Diagnostico find($id, $columns = ['*'])
 * @method Diagnostico first($columns = ['*'])
*/
class DiagnosticoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'diagnostico'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Diagnostico::class;
    }
}
