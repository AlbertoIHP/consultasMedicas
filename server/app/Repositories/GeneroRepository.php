<?php

namespace App\Repositories;

use App\Models\Genero;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GeneroRepository
 * @package App\Repositories
 * @version October 16, 2017, 10:49 pm UTC
 *
 * @method Genero findWithoutFail($id, $columns = ['*'])
 * @method Genero find($id, $columns = ['*'])
 * @method Genero first($columns = ['*'])
*/
class GeneroRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descripcion',
        'nombre'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Genero::class;
    }
}
