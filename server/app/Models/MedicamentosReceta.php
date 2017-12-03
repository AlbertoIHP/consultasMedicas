<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="MedicamentosReceta",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="dosis",
 *          description="dosis",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cantidad",
 *          description="cantidad",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="tiempo",
 *          description="tiempo",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="intervalo",
 *          description="intervalo",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Medicamento_id",
 *          description="Medicamento_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="ViaAdministracionMedicamento_id",
 *          description="ViaAdministracionMedicamento_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Receta_id",
 *          description="Receta_id",
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
class MedicamentosReceta extends Model
{
    use SoftDeletes;

    public $table = 'MedicamentosReceta';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'dosis',
        'cantidad',
        'tiempo',
        'intervalo',
        'Medicamento_id',
        'ViaAdministracionMedicamento_id',
        'Receta_id',
        'remember_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'dosis' => 'string',
        'cantidad' => 'integer',
        'tiempo' => 'integer',
        'intervalo' => 'integer',
        'Medicamento_id' => 'integer',
        'ViaAdministracionMedicamento_id' => 'integer',
        'Receta_id' => 'integer',
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
    public function medicamento()
    {
        return $this->belongsTo(\App\Models\Medicamento::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function recetum()
    {
        return $this->belongsTo(\App\Models\Recetum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function viaAdministracionMedicamento()
    {
        return $this->belongsTo(\App\Models\ViaAdministracionMedicamento::class);
    }
}
