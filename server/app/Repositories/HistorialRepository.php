<?php

namespace App\Repositories;

use App\Models\Historial;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HistorialRepository
 * @package App\Repositories
 * @version October 10, 2017, 2:37 pm UTC
 *
 * @method Historial findWithoutFail($id, $columns = ['*'])
 * @method Historial find($id, $columns = ['*'])
 * @method Historial first($columns = ['*'])
*/
class HistorialRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaConsulta',
        'informacionMedica',
        'FichaMedica_id',
        'habitos',
        'peso',
        'estatura'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Historial::class;
    }
}
