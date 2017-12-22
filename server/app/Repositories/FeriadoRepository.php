<?php

namespace App\Repositories;

use App\Models\Feriado;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class FeriadoRepository
 * @package App\Repositories
 * @version December 22, 2017, 2:13 am UTC
 *
 * @method Feriado findWithoutFail($id, $columns = ['*'])
 * @method Feriado find($id, $columns = ['*'])
 * @method Feriado first($columns = ['*'])
*/
class FeriadoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'dia',
        'descripcion',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Feriado::class;
    }
}
