<?php

namespace App\Repositories;

use App\Models\Receta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class RecetaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:39 am UTC
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
        'Atention_Cita_idCita'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Receta::class;
    }
}
