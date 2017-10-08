<?php

namespace App\Repositories;

use App\Models\FichaMedica;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class FichaMedicaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:36 am UTC
 *
 * @method FichaMedica findWithoutFail($id, $columns = ['*'])
 * @method FichaMedica find($id, $columns = ['*'])
 * @method FichaMedica first($columns = ['*'])
*/
class FichaMedicaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'FichaMedicacol'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return FichaMedica::class;
    }
}
