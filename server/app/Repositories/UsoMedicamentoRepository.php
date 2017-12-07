<?php

namespace App\Repositories;

use App\Models\UsoMedicamento;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class UsoMedicamentoRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:18 am UTC
 *
 * @method UsoMedicamento findWithoutFail($id, $columns = ['*'])
 * @method UsoMedicamento find($id, $columns = ['*'])
 * @method UsoMedicamento first($columns = ['*'])
*/
class UsoMedicamentoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'fechaInicio',
        'Medicamento_id',
        'Paciente_id',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return UsoMedicamento::class;
    }
}
