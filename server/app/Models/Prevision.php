<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Prevision",
 *      required={""},
 *      @SWG\Property(
 *          property="idPrevision",
 *          description="idPrevision",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="descripcion",
 *          description="descripcion",
 *          type="string"
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
class Prevision extends Model
{
	use SoftDeletes;

	public $table = 'Prevision';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'descripcion',
		'nombre',
		'remember_token'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'idPrevision' => 'integer',
		'descripcion' => 'string',
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
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 **/
	public function personas()
	{
		return $this->belongsToMany(\App\Models\Persona::class, 'PrevisionActual');
	}

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
