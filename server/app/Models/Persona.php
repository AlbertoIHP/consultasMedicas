<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Persona",
 *      required={""},
 *      @SWG\Property(
 *          property="rut",
 *          description="rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="nombre1",
 *          description="nombre1",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="nombre2",
 *          description="nombre2",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="apellido1",
 *          description="apellido1",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="apellido2",
 *          description="apellido2",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="fono_casa",
 *          description="fono_casa",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="fono_trabajo",
 *          description="fono_trabajo",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="movil",
 *          description="movil",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="idGenero",
 *          description="idGenero",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="EstadoCivil_idEstado",
 *          description="EstadoCivil_idEstado",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Comuna_idComuna",
 *          description="Comuna_idComuna",
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
class Persona extends Model
{
    use SoftDeletes;

    public $table = 'Persona';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'nombre1',
        'nombre2',
        'apellido1',
        'apellido2',
        'fono_casa',
        'fono_trabajo',
        'movil',
        'idGenero',
        'EstadoCivil_idEstado',
        'Comuna_idComuna',
        'remember_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'rut' => 'string',
        'nombre1' => 'string',
        'nombre2' => 'string',
        'apellido1' => 'string',
        'apellido2' => 'string',
        'fono_casa' => 'string',
        'fono_trabajo' => 'string',
        'movil' => 'string',
        'idGenero' => 'integer',
        'EstadoCivil_idEstado' => 'integer',
        'Comuna_idComuna' => 'integer',
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
    public function comuna()
    {
        return $this->belongsTo(\App\Models\Comuna::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function estadoCivil()
    {
        return $this->belongsTo(\App\Models\EstadoCivil::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function genero()
    {
        return $this->belongsTo(\App\Models\Genero::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     **/
    public function doctor()
    {
        return $this->hasOne(\App\Models\Doctor::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function fichaMedicas()
    {
        return $this->hasMany(\App\Models\FichaMedica::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function previsions()
    {
        return $this->belongsToMany(\App\Models\Prevision::class, 'Persona_has_Prevision');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function previsions()
    {
        return $this->belongsToMany(\App\Models\Prevision::class, 'PrevisionActual');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function roles()
    {
        return $this->belongsToMany(\App\Models\Role::class, 'Usuario');
    }
}
