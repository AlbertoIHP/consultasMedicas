<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Disponibilidad",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="disponible",
 *          description="disponible",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Medico_id",
 *          description="Medico_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Horario_id",
 *          description="Horario_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Disponibilidad extends Model
{
    use SoftDeletes;

    public $table = 'Disponibilidad';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'disponible',
        'Medico_id',
        'Horario_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'disponible' => 'integer',
        'Medico_id' => 'integer',
        'Horario_id' => 'integer'
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
    public function horario()
    {
        return $this->belongsTo(\App\Models\Horario::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function medico()
    {
        return $this->belongsTo(\App\Models\Medico::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }

    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
    
}
