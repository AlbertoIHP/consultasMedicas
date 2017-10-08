<?php

namespace App\Repositories;

use App\Models\TipoBox;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class TipoBoxRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:39 am UTC
 *
 * @method TipoBox findWithoutFail($id, $columns = ['*'])
 * @method TipoBox find($id, $columns = ['*'])
 * @method TipoBox first($columns = ['*'])
*/
class TipoBoxRepository extends BaseRepository
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
        return TipoBox::class;
    }
}
