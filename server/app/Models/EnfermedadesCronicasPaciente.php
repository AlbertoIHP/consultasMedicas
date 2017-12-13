<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="EnfermedadesCronicasPaciente",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaDeteccion",
 *          description="fechaDeteccion",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="EnfermedadCronica_id",
 *          description="EnfermedadCronica_id",
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
class EnfermedadesCronicasPaciente extends Model
{
    use SoftDeletes;

    public $table = 'EnfermedadesCronicasPaciente';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fechaDeteccion',
        'EnfermedadCronica_id',
        'Paciente_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fechaDeteccion' => 'date',
        'EnfermedadCronica_id' => 'integer',
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
    public function enfermedadCronica()
    {
        return $this->belongsTo(\App\Models\EnfermedadCronica::class);
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
