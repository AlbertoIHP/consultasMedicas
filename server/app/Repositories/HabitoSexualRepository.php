<?php

namespace App\Repositories;

use App\Models\HabitoSexual;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class HabitoSexualRepository
 * @package App\Repositories
 * @version December 7, 2017, 5:14 am UTC
 *
 * @method HabitoSexual findWithoutFail($id, $columns = ['*'])
 * @method HabitoSexual find($id, $columns = ['*'])
 * @method HabitoSexual first($columns = ['*'])
*/
class HabitoSexualRepository extends BaseRepository
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
        return HabitoSexual::class;
    }
}
