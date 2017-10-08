<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PrevisionActual",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaActualizacion",
 *          description="fechaActualizacion",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="Prevision_idPrevision",
 *          description="Prevision_idPrevision",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Persona_rut",
 *          description="Persona_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
 *      )
 * )
 */
class PrevisionActual extends Model
{
    use SoftDeletes;

    public $table = 'PrevisionActual';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fechaActualizacion',
        'Prevision_idPrevision',
        'Persona_rut',
        'remember_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fechaActualizacion' => 'date',
        'Prevision_idPrevision' => 'integer',
        'Persona_rut' => 'string',
        'remember_token' => 'string'
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
    public function prevision()
    {
        return $this->belongsTo(\App\Models\Prevision::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function persona()
    {
        return $this->belongsTo(\App\Models\Persona::class);
    }
}
