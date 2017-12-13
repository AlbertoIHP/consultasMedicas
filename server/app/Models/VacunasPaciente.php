<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="VacunasPaciente",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaVacunacion",
 *          description="fechaVacunacion",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="Vacuna_id",
 *          description="Vacuna_id",
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
class VacunasPaciente extends Model
{
    use SoftDeletes;

    public $table = 'VacunasPaciente';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fechaVacunacion',
        'Vacuna_id',
        'Paciente_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fechaVacunacion' => 'date',
        'Vacuna_id' => 'integer',
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
    public function paciente()
    {
        return $this->belongsTo(\App\Models\Paciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function vacuna()
    {
        return $this->belongsTo(\App\Models\Vacuna::class);
    }
    
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];

}
