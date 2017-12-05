<?php

namespace App\Repositories;

use App\Models\Diagnostico;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class DiagnosticoRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:49 pm UTC
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
        'diagnostico',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Diagnostico::class;
    }
}
