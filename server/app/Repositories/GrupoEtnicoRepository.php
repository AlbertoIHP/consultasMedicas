<?php

namespace App\Repositories;

use App\Models\GrupoEtnico;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GrupoEtnicoRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:16 am UTC
 *
 * @method GrupoEtnico findWithoutFail($id, $columns = ['*'])
 * @method GrupoEtnico find($id, $columns = ['*'])
 * @method GrupoEtnico first($columns = ['*'])
*/
class GrupoEtnicoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'nombre',
        'remember_token'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return GrupoEtnico::class;
    }
}
