<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Atencion",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="peso",
 *          description="peso",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="estatura",
 *          description="estatura",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="calificacion",
 *          description="calificacion",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="BoxConsulta_id",
 *          description="BoxConsulta_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Cita_id",
 *          description="Cita_id",
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
class Atencion extends Model
{
    use SoftDeletes;

    public $table = 'Atencion';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'peso',
        'estatura',
        'calificacion',
        'BoxConsulta_id',
        'Cita_id',
        'Paciente_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'peso' => 'string',
        'estatura' => 'string',
        'calificacion' => 'integer',
        'BoxConsulta_id' => 'integer',
        'Cita_id' => 'integer',
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
    public function boxConsultum()
    {
        return $this->belongsTo(\App\Models\BoxConsultum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function citum()
    {
        return $this->belongsTo(\App\Models\Citum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function paciente()
    {
        return $this->belongsTo(\App\Models\Paciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function diagnosticosAtencions()
    {
        return $this->hasMany(\App\Models\DiagnosticosAtencion::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function receta()
    {
        return $this->hasMany(\App\Models\Recetum::class);
    }

    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];   
 
}
