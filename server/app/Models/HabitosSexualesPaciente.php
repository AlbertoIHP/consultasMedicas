<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="HabitosSexualesPaciente",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="verdadero",
 *          description="verdadero",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="HabitoSexual_id",
 *          description="HabitoSexual_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Paciente_id",
 *          description="Paciente_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class HabitosSexualesPaciente extends Model
{
    use SoftDeletes;

    public $table = 'HabitosSexualesPaciente';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'verdadero',
        'HabitoSexual_id',
        'Paciente_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'verdadero' => 'integer',
        'HabitoSexual_id' => 'integer',
        'Paciente_id' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function habitoSexual()
    {
        return $this->belongsTo(\App\Models\HabitoSexual::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function paciente()
    {
        return $this->belongsTo(\App\Models\Paciente::class);
    }
    
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];

}
