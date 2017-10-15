<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PrevisionActual",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaActualizacion",
 *          description="fechaActualizacion",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="Prevision_id",
 *          description="Prevision_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Persona_id",
 *          description="Persona_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="activado",
 *          description="activado",
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
class PrevisionActual extends Model
{
	use SoftDeletes;

	public $table = 'PrevisionActual';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'fechaActualizacion',
		'Prevision_id',
		'Persona_id',
		'activado',
		'remember_token'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'fechaActualizacion' => 'date',
		'Prevision_id' => 'integer',
		'Persona_id' => 'integer',
		'activado' => 'integer',
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
	public function persona()
	{
		return $this->belongsTo(\App\Models\Persona::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 **/
	public function prevision()
	{
		return $this->belongsTo(\App\Models\Prevision::class);
	}

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
