<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="FichaMedica",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombre",
 *          description="nombre",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Persona_rut",
 *          description="Persona_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="nombreResponsable",
 *          description="nombreResponsable",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="fechaCreacion",
 *          description="fechaCreacion",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="pesoActual",
 *          description="pesoActual",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="estaturaActual",
 *          description="estaturaActual",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="TipoSangre_id",
 *          description="TipoSangre_id",
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
class FichaMedica extends Model
{
	use SoftDeletes;

	public $table = 'FichaMedica';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'nombre',
		'Persona_rut',
		'nombreResponsable',
		'fechaCreacion',
		'pesoActual',
		'estaturaActual',
		'TipoSangre_id',
		'remember_token'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'nombre' => 'string',
		'Persona_rut' => 'string',
		'nombreResponsable' => 'string',
		'fechaCreacion' => 'date',
		'pesoActual' => 'string',
		'estaturaActual' => 'string',
		'TipoSangre_id' => 'integer',
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
	public function tipoSangre()
	{
		return $this->belongsTo(\App\Models\TipoSangre::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 **/
	public function historials()
	{
		return $this->hasMany(\App\Models\Historial::class);
	}

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
