<?php

namespace App\Repositories;

use App\Models\Receta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class RecetaRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:54 pm UTC
 *
 * @method Receta findWithoutFail($id, $columns = ['*'])
 * @method Receta find($id, $columns = ['*'])
 * @method Receta first($columns = ['*'])
*/
class RecetaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'Recetacol',
        'Atencion_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Receta::class;
    }
}
