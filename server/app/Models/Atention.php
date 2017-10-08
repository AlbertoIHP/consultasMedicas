<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Atention",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Cita_idCita",
 *          description="Cita_idCita",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Doctor_rut",
 *          description="Doctor_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="BoxConsulta_idConsulta",
 *          description="BoxConsulta_idConsulta",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Atention extends Model
{
    use SoftDeletes;

    public $table = 'Atention';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Cita_idCita',
        'Doctor_rut',
        'BoxConsulta_idConsulta'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Cita_idCita' => 'integer',
        'Doctor_rut' => 'string',
        'BoxConsulta_idConsulta' => 'integer'
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
    public function doctor()
    {
        return $this->belongsTo(\App\Models\Doctor::class);
    }
}
