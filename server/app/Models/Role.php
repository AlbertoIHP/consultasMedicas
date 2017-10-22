<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Role",
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
 *          property="write",
 *          description="write",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="view",
 *          description="view",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="edit",
 *          description="edit",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="delete",
 *          description="delete",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Role extends Model
{
	use SoftDeletes;

	public $table = 'Role';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'nombre',
		'write',
		'view',
		'edit',
		'delete'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'nombre' => 'string',
		'write' => 'integer',
		'view' => 'integer',
		'edit' => 'integer',
		'delete' => 'integer'
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
	public function usuarios()
	{
		return $this->hasMany(\App\Models\Usuario::class);
	}

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];
}
