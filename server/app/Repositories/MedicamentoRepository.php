<?php

namespace App\Repositories;

use App\Models\Medicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class MedicamentoRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:39 am UTC
 *
 * @method Medicamento findWithoutFail($id, $columns = ['*'])
 * @method Medicamento find($id, $columns = ['*'])
 * @method Medicamento first($columns = ['*'])
*/
class MedicamentoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombrecomun',
        'nombrecientifico'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Medicamento::class;
    }
}
