<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="BoxConsulta",
 *      required={""},
 *      @SWG\Property(
 *          property="idConsulta",
 *          description="idConsulta",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="ubicacion",
 *          description="ubicacion",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="TipoBox_idTipoBox",
 *          description="TipoBox_idTipoBox",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class BoxConsulta extends Model
{
    use SoftDeletes;

    public $table = 'BoxConsulta';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'ubicacion',
        'TipoBox_idTipoBox'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idConsulta' => 'integer',
        'ubicacion' => 'string',
        'TipoBox_idTipoBox' => 'integer'
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
    public function tipoBox()
    {
        return $this->belongsTo(\App\Models\TipoBox::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function atentions()
    {
        return $this->hasMany(\App\Models\Atention::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }
}
