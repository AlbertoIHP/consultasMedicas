<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="HistorialFicha",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaConsulta",
 *          description="fechaConsulta",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="informacionMedica",
 *          description="informacionMedica",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="habitos",
 *          description="habitos",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="peso",
 *          description="peso",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="estatura",
 *          description="estatura",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="FichaMedica_id",
 *          description="FichaMedica_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class HistorialFicha extends Model
{
	use SoftDeletes;

	public $table = 'Historial';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'fechaConsulta',
		'informacionMedica',
		'habitos',
		'peso',
		'estatura',
		'FichaMedica_id'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'fechaConsulta' => 'date',
		'informacionMedica' => 'string',
		'habitos' => 'string',
		'peso' => 'string',
		'estatura' => 'string',
		'FichaMedica_id' => 'integer'
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
	public function fichaMedica()
	{
		return $this->belongsTo(\App\Models\FichaMedica::class);
	}


	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
