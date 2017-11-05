<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PermisoModulo",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Role_id",
 *          description="Role_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Modulo_id",
 *          description="Modulo_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="write",
 *          description="write",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="erase",
 *          description="erase",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="update",
 *          description="update",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="view",
 *          description="view",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class PermisoModulo extends Model
{
    use SoftDeletes;

    public $table = 'PermisoModulo';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Role_id',
        'Modulo_id',
        'write',
        'erase',
        'update',
        'view'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Role_id' => 'integer',
        'Modulo_id' => 'integer',
        'write' => 'integer',
        'erase' => 'integer',
        'update' => 'integer',
        'view' => 'integer'
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
    public function modulo()
    {
        return $this->belongsTo(\App\Models\Modulo::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function role()
    {
        return $this->belongsTo(\App\Models\Role::class);
    }

 protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];   
}
