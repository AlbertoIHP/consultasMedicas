<?php

namespace App\Repositories;

use App\Models\GrupoEtareo;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GrupoEtareoRepository
 * @package App\Repositories
 * @version January 10, 2018, 1:19 am UTC
 *
 * @method GrupoEtareo findWithoutFail($id, $columns = ['*'])
 * @method GrupoEtareo find($id, $columns = ['*'])
 * @method GrupoEtareo first($columns = ['*'])
*/
class GrupoEtareoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'edadMinima',
        'edadMaxima'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return GrupoEtareo::class;
    }
}
