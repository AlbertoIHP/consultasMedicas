<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="RecetaMedicamento",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Receta_idReceta",
 *          description="Receta_idReceta",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Medicamento_idMedicamento",
 *          description="Medicamento_idMedicamento",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Receta_has_Medicamentocol",
 *          description="Receta_has_Medicamentocol",
 *          type="string"
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
 *          property="ViaAdministracionMedicamento_idViaAdministracionMedicamento",
 *          description="ViaAdministracionMedicamento_idViaAdministracionMedicamento",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class RecetaMedicamento extends Model
{
    use SoftDeletes;

    public $table = 'Receta_has_Medicamento';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Receta_idReceta',
        'Medicamento_idMedicamento',
        'Receta_has_Medicamentocol',
        'dosis',
        'cantidad',
        'tiempo',
        'intervalo',
        'ViaAdministracionMedicamento_idViaAdministracionMedicamento'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Receta_idReceta' => 'integer',
        'Medicamento_idMedicamento' => 'integer',
        'Receta_has_Medicamentocol' => 'string',
        'dosis' => 'string',
        'cantidad' => 'integer',
        'tiempo' => 'integer',
        'intervalo' => 'integer',
        'ViaAdministracionMedicamento_idViaAdministracionMedicamento' => 'integer'
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
