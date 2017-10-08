<?php

namespace App\Repositories;

use App\Models\HistorialFicha;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HistorialFichaRepository
 * @package App\Repositories
 * @version October 8, 2017, 6:57 am UTC
 *
 * @method HistorialFicha findWithoutFail($id, $columns = ['*'])
 * @method HistorialFicha find($id, $columns = ['*'])
 * @method HistorialFicha first($columns = ['*'])
*/
class HistorialFichaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaConsulta',
        'informacionMedica',
        'FichaMedica_id',
        'habitos'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return HistorialFicha::class;
    }
}
