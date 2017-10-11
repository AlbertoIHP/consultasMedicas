<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Comuna",
 *      required={""},
 *      @SWG\Property(
 *          property="idComuna",
 *          description="idComuna",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Provincia_idProvincia",
 *          description="Provincia_idProvincia",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nombre",
 *          description="nombre",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
 *      )
 * )
 */
class Comuna extends Model
{
	use SoftDeletes;

	public $table = 'Comuna';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'Provincia_idProvincia',
		'nombre',
		'remember_token'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'idComuna' => 'integer',
		'Provincia_idProvincia' => 'integer',
		'nombre' => 'string',
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
	public function provincium()
	{
		return $this->belongsTo(\App\Models\Provincium::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 **/
	public function personas()
	{
		return $this->hasMany(\App\Models\Persona::class);
	}

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
