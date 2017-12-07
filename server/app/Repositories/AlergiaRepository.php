<?php

namespace App\Repositories;

use App\Models\Alergia;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AlergiaRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:15 am UTC
 *
 * @method Alergia findWithoutFail($id, $columns = ['*'])
 * @method Alergia find($id, $columns = ['*'])
 * @method Alergia first($columns = ['*'])
*/
class AlergiaRepository extends BaseRepository
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
        return Alergia::class;
    }
}
