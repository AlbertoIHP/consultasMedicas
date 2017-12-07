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
 *          property="dia",
 *          description="dia",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="hora_inicio",
 *          description="hora_inicio",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="hora_termino",
 *          description="hora_termino",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Medico_id",
 *          description="Medico_id",
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
        'dia',
        'hora_inicio',
        'hora_termino',
        'Medico_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'dia' => 'string',
        'hora_inicio' => 'string',
        'hora_termino' => 'string',
        'Medico_id' => 'integer'
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
    public function medico()
    {
        return $this->belongsTo(\App\Models\Medico::class);
    }
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
