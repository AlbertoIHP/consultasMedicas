<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Medico",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Especialidad_id",
 *          description="Especialidad_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Persona_id",
 *          description="Persona_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Medico extends Model
{
    use SoftDeletes;

    public $table = 'Medico';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Especialidad_id',
        'Persona_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Especialidad_id' => 'integer',
        'Persona_id' => 'integer'
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
    public function especialidad()
    {
        return $this->belongsTo(\App\Models\Especialidad::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function persona()
    {
        return $this->belongsTo(\App\Models\Persona::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function disponibilidads()
    {
        return $this->hasMany(\App\Models\Disponibilidad::class);
    }
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
