<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Cita",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fecha",
 *          description="fecha",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="hora",
 *          description="hora",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="EstadoCita_id",
 *          description="EstadoCita_id",
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
 *          property="Paciente_id",
 *          description="Paciente_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Medico_id",
 *          description="Medico_id",
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
        'hora',
        'EstadoCita_id',
        'BoxConsulta_id',
        'Paciente_id',
        'Medico_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fecha' => 'string',
        'hora' => 'string',
        'EstadoCita_id' => 'integer',
        'BoxConsulta_id' => 'integer',
        'Paciente_id' => 'integer',
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
    public function medico()
    {
        return $this->belongsTo(\App\Models\Medico::class);
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
    public function atencions()
    {
        return $this->hasMany(\App\Models\Atencion::class);
    }
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
