<?php

namespace App\Repositories;

use App\Models\BoxConsulta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class BoxConsultaRepository
 * @package App\Repositories
 * @version October 8, 2017, 1:38 am UTC
 *
 * @method BoxConsulta findWithoutFail($id, $columns = ['*'])
 * @method BoxConsulta find($id, $columns = ['*'])
 * @method BoxConsulta first($columns = ['*'])
*/
class BoxConsultaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'ubicacion',
        'TipoBox_idTipoBox'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return BoxConsulta::class;
    }
}
