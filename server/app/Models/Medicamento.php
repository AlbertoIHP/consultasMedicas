<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Medicamento",
 *      required={""},
 *      @SWG\Property(
 *          property="idMedicamento",
 *          description="idMedicamento",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombrecomun",
 *          description="nombrecomun",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="nombrecientifico",
 *          description="nombrecientifico",
 *          type="string"
 *      )
 * )
 */
class Medicamento extends Model
{
    use SoftDeletes;

    public $table = 'Medicamento';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'nombrecomun',
        'nombrecientifico'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idMedicamento' => 'integer',
        'nombrecomun' => 'string',
        'nombrecientifico' => 'string'
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
    public function recetaHasMedicamentos()
    {
        return $this->hasMany(\App\Models\RecetaHasMedicamento::class);
    }
}
