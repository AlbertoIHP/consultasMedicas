<?php

namespace App\Repositories;

use App\Models\TipoSangre;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class TipoSangreRepository
 * @package App\Repositories
 * @version October 10, 2017, 2:36 pm UTC
 *
 * @method TipoSangre findWithoutFail($id, $columns = ['*'])
 * @method TipoSangre find($id, $columns = ['*'])
 * @method TipoSangre first($columns = ['*'])
*/
class TipoSangreRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'descripcion',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return TipoSangre::class;
    }
}
