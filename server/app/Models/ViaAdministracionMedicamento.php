<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="ViaAdministracionMedicamento",
 *      required={""},
 *      @SWG\Property(
 *          property="idViaAdministracionMedicamento",
 *          description="idViaAdministracionMedicamento",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="descripcion",
 *          description="descripcion",
 *          type="string"
 *      )
 * )
 */
class ViaAdministracionMedicamento extends Model
{
    use SoftDeletes;

    public $table = 'ViaAdministracionMedicamento';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'descripcion'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idViaAdministracionMedicamento' => 'integer',
        'descripcion' => 'string'
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
