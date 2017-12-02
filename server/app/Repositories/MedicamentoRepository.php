<?php

namespace App\Repositories;

use App\Models\Medicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class MedicamentoRepository
 * @package App\Repositories
 * @version December 1, 2017, 11:54 pm UTC
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
        'nombrecientifico',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Medicamento::class;
    }
}
