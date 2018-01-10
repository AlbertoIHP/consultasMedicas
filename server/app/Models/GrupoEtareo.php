<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="GrupoEtareo",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombre",
 *          description="nombre",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="edadMinima",
 *          description="edadMinima",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="edadMaxima",
 *          description="edadMaxima",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class GrupoEtareo extends Model
{
    use SoftDeletes;

    public $table = 'GrupoEtareo';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'nombre',
        'edadMinima',
        'edadMaxima'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'nombre' => 'string',
        'edadMinima' => 'integer',
        'edadMaxima' => 'integer'
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
    public function grupoEtareoVacunas()
    {
        return $this->hasMany(\App\Models\GrupoEtareoVacuna::class);
    }
}
