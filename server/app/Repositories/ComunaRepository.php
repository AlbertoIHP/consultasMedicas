<?php

namespace App\Repositories;

use App\Models\Comuna;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ComunaRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:56 am UTC
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
        'Provincia_idProvincia',
        'nombre',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Comuna::class;
    }
}
