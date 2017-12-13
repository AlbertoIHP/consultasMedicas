<?php

namespace App\Repositories;

use App\Models\Habito;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HabitoRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:14 am UTC
 *
 * @method Habito findWithoutFail($id, $columns = ['*'])
 * @method Habito find($id, $columns = ['*'])
 * @method Habito first($columns = ['*'])
*/
class HabitoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Habito::class;
    }
}
