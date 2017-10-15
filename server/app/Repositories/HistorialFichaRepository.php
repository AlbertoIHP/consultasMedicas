<?php

namespace App\Repositories;

use App\Models\HistorialFicha;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HistorialFichaRepository
 * @package App\Repositories
 * @version October 15, 2017, 3:58 am UTC
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
        'habitos',
        'peso',
        'estatura',
        'FichaMedica_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return HistorialFicha::class;
    }
}
