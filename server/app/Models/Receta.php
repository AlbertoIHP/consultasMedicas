<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Receta",
 *      required={""},
 *      @SWG\Property(
 *          property="idReceta",
 *          description="idReceta",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Recetacol",
 *          description="Recetacol",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Atention_Cita_idCita",
 *          description="Atention_Cita_idCita",
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
        'Atention_Cita_idCita'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'idReceta' => 'integer',
        'Recetacol' => 'string',
        'Atention_Cita_idCita' => 'integer'
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
