<?php

namespace App\Repositories;

use App\Models\Prevision;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PrevisionRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:34 am UTC
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
        'descripcion'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Prevision::class;
    }
}
