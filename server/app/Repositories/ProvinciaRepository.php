<?php

namespace App\Repositories;

use App\Models\Provincia;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ProvinciaRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:53 am UTC
 *
 * @method Provincia findWithoutFail($id, $columns = ['*'])
 * @method Provincia find($id, $columns = ['*'])
 * @method Provincia first($columns = ['*'])
*/
class ProvinciaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'Region_idRegion',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Provincia::class;
    }
}
