<?php

namespace App\Repositories;

use App\Models\Vacuna;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class VacunaRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:02 am UTC
 *
 * @method Vacuna findWithoutFail($id, $columns = ['*'])
 * @method Vacuna find($id, $columns = ['*'])
 * @method Vacuna first($columns = ['*'])
*/
class VacunaRepository extends BaseRepository
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
        return Vacuna::class;
    }
}
