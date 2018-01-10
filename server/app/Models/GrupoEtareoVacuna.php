<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="GrupoEtareoVacuna",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="GrupoEtareo_id",
 *          description="GrupoEtareo_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Vacuna_id",
 *          description="Vacuna_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class GrupoEtareoVacuna extends Model
{
    use SoftDeletes;

    public $table = 'GrupoEtareoVacuna';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'GrupoEtareo_id',
        'Vacuna_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'GrupoEtareo_id' => 'integer',
        'Vacuna_id' => 'integer'
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
    public function grupoEtareo()
    {
        return $this->belongsTo(\App\Models\GrupoEtareo::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function vacuna()
    {
        return $this->belongsTo(\App\Models\Vacuna::class);
    }
}
