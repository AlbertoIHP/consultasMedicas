<?php

namespace App\Repositories;

use App\Models\GrupoEtareoVacuna;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GrupoEtareoVacunaRepository
 * @package App\Repositories
 * @version January 10, 2018, 1:21 am UTC
 *
 * @method GrupoEtareoVacuna findWithoutFail($id, $columns = ['*'])
 * @method GrupoEtareoVacuna find($id, $columns = ['*'])
 * @method GrupoEtareoVacuna first($columns = ['*'])
*/
class GrupoEtareoVacunaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'GrupoEtareo_id',
        'Vacuna_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return GrupoEtareoVacuna::class;
    }
}
