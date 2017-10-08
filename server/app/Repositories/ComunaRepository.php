<?php

namespace App\Repositories;

use App\Models\Comuna;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ComunaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:35 am UTC
 *
 * @method Comuna findWithoutFail($id, $columns = ['*'])
 * @method Comuna find($id, $columns = ['*'])
 * @method Comuna first($columns = ['*'])
*/
class ComunaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'idComuna',
        'nombre'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Comuna::class;
    }
}
