<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Provincia",
 *      required={""},
 *      @SWG\Property(
 *          property="idProvincia",
 *          description="idProvincia",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombre",
 *          description="nombre",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Region_idRegion",
 *          description="Region_idRegion",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
 *      )
 * )
 */
class Provincia extends Model
{
    use SoftDeletes;

    public $table = 'Provincia';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'nombre',
        'Region_idRegion',
        'remember_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idProvincia' => 'integer',
        'nombre' => 'string',
        'Region_idRegion' => 'integer',
        'remember_token' => 'string'
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
    public function region()
    {
        return $this->belongsTo(\App\Models\Region::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function comunas()
    {
        return $this->hasMany(\App\Models\Comuna::class);
    }
}
