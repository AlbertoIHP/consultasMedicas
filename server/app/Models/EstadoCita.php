<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="EstadoCita",
 *      required={""},
 *      @SWG\Property(
 *          property="idEstadoCita",
 *          description="idEstadoCita",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="estadoCita",
 *          description="estadoCita",
 *          type="string"
 *      )
 * )
 */
class EstadoCita extends Model
{
    use SoftDeletes;

    public $table = 'EstadoCita';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'estadoCita'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idEstadoCita' => 'integer',
        'estadoCita' => 'string'
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
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }
}
