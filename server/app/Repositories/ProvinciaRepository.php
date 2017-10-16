<?php

namespace App\Repositories;

use App\Models\Provincia;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ProvinciaRepository
 * @package App\Repositories
 * @version October 16, 2017, 10:47 pm UTC
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
        'Region_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Provincia::class;
    }
}
