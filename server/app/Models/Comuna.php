<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Comuna",
 *      required={""},
 *      @SWG\Property(
 *          property="Provincia_idProvincia",
 *          description="Provincia_idProvincia",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="idComuna",
 *          description="idComuna",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombre",
 *          description="nombre",
 *          type="string"
 *      )
 * )
 */
class Comuna extends Model
{
    use SoftDeletes;

    public $table = 'Comuna';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'idComuna',
        'nombre'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'Provincia_idProvincia' => 'integer',
        'idComuna' => 'integer',
        'nombre' => 'string'
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
    public function provincium()
    {
        return $this->belongsTo(\App\Models\Provincium::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function personas()
    {
        return $this->hasMany(\App\Models\Persona::class);
    }
}
