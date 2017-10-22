<?php

namespace App\Repositories;

use App\Models\Prevision;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PrevisionRepository
 * @package App\Repositories
 * @version October 16, 2017, 10:48 pm UTC
 *
 * @method Prevision findWithoutFail($id, $columns = ['*'])
 * @method Prevision find($id, $columns = ['*'])
 * @method Prevision first($columns = ['*'])
*/
class PrevisionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descripcion',
        'nombre',
        'isapre'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Prevision::class;
    }
}
