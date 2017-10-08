<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Cita",
 *      required={""},
 *      @SWG\Property(
 *          property="idCita",
 *          description="idCita",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Consulta_idConsulta",
 *          description="Consulta_idConsulta",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Doctor_rut",
 *          description="Doctor_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Persona_rut",
 *          description="Persona_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="EstadoCita_idEstadoCita",
 *          description="EstadoCita_idEstadoCita",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Cita extends Model
{
    use SoftDeletes;

    public $table = 'Cita';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fecha',
        'Consulta_idConsulta',
        'Doctor_rut',
        'Persona_rut',
        'fechahora',
        'EstadoCita_idEstadoCita'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idCita' => 'integer',
        'Consulta_idConsulta' => 'integer',
        'Doctor_rut' => 'string',
        'Persona_rut' => 'string',
        'EstadoCita_idEstadoCita' => 'integer'
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
    public function estadoCitum()
    {
        return $this->belongsTo(\App\Models\EstadoCitum::class);
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
    public function atentions()
    {
        return $this->hasMany(\App\Models\Atention::class);
    }
}
