<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Horario",
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
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="horaInicio",
 *          description="horaInicio",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="improvisado",
 *          description="improvisado",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Horario extends Model
{
    use SoftDeletes;

    public $table = 'Horario';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'dia',
        'horaInicio',
        'improvisado'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'dia' => 'string',
        'horaInicio' => 'string',
        'horaFin' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function disponibilidads()
    {
        return $this->hasMany(\App\Models\Disponibilidad::class);
    }

    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];

}
