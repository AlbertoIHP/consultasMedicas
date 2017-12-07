<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="HabitosPaciente",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaInicio",
 *          description="fechaInicio",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="Habito_id",
 *          description="Habito_id",
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
class HabitosPaciente extends Model
{
    use SoftDeletes;

    public $table = 'HabitosPaciente';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fechaInicio',
        'Habito_id',
        'Paciente_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fechaInicio' => 'date',
        'Habito_id' => 'integer',
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
    public function habito()
    {
        return $this->belongsTo(\App\Models\Habito::class);
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
