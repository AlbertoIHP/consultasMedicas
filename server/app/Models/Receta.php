<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Receta",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Recetacol",
 *          description="Recetacol",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Atencion_id",
 *          description="Atencion_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Receta extends Model
{
    use SoftDeletes;

    public $table = 'Receta';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Recetacol',
        'Atencion_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Recetacol' => 'string',
        'Atencion_id' => 'integer'
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
    public function atencion()
    {
        return $this->belongsTo(\App\Models\Atencion::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function medicamentosReceta()
    {
        return $this->hasMany(\App\Models\MedicamentosRecetum::class);
    }

    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];   

}
