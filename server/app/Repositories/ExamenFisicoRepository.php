<?php

namespace App\Repositories;

use App\Models\ExamenFisico;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ExamenFisicoRepository
 * @package App\Repositories
 * @version December 8, 2017, 3:31 am UTC
 *
 * @method ExamenFisico findWithoutFail($id, $columns = ['*'])
 * @method ExamenFisico find($id, $columns = ['*'])
 * @method ExamenFisico first($columns = ['*'])
*/
class ExamenFisicoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaExamen',
        'peso',
        'estatura',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return ExamenFisico::class;
    }
}
