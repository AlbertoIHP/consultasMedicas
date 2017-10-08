<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="DiagnosticoAtencion",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Atention_Cita_idCita",
 *          description="Atention_Cita_idCita",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Diagnostico_idDiagnostico",
 *          description="Diagnostico_idDiagnostico",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Observacion",
 *          description="Observacion",
 *          type="string"
 *      )
 * )
 */
class DiagnosticoAtencion extends Model
{
    use SoftDeletes;

    public $table = 'Atention_has_Diagnostico';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Atention_Cita_idCita',
        'Diagnostico_idDiagnostico',
        'Observacion'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Atention_Cita_idCita' => 'integer',
        'Diagnostico_idDiagnostico' => 'integer',
        'Observacion' => 'string'
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
    public function diagnostico()
    {
        return $this->belongsTo(\App\Models\Diagnostico::class);
    }
}
