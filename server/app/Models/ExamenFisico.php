<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="ExamenFisico",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaExamen",
 *          description="fechaExamen",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="peso",
 *          description="peso",
 *          type="number",
 *          format="float"
 *      ),
 *      @SWG\Property(
 *          property="estatura",
 *          description="estatura",
 *          type="number",
 *          format="float"
 *      )
 * )
 */
class ExamenFisico extends Model
{
    use SoftDeletes;

    public $table = 'ExamenFisico';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'fechaExamen',
        'peso',
        'estatura'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'fechaExamen' => 'date',
        'peso' => 'float',
        'estatura' => 'float'
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
    public function atencions()
    {
        return $this->hasMany(\App\Models\Atencion::class);
    }
    
    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];   

}
