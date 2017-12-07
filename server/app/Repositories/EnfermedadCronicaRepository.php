<?php

namespace App\Repositories;

use App\Models\EnfermedadCronica;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class EnfermedadCronicaRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:15 am UTC
 *
 * @method EnfermedadCronica findWithoutFail($id, $columns = ['*'])
 * @method EnfermedadCronica find($id, $columns = ['*'])
 * @method EnfermedadCronica first($columns = ['*'])
*/
class EnfermedadCronicaRepository extends BaseRepository
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
        return EnfermedadCronica::class;
    }
}
