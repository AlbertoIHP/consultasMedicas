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
 *          property="tipo",
 *          description="tipo",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="idRegion",
 *          description="idRegion",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="idProvincia",
 *          description="idProvincia",
 *          type="integer",
 *          format="int32"
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
 *          property="FichaMedica_rut",
 *          description="FichaMedica_rut",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="EstadoCivil_idEstadoCivil",
 *          description="EstadoCivil_idEstadoCivil",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Comuna_Provincia_idProvincia",
 *          description="Comuna_Provincia_idProvincia",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Comuna_idComuna",
 *          description="Comuna_idComuna",
 *          type="integer",
 *          format="int32"
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
        'tipo',
        'idRegion',
        'idProvincia',
        'fono_casa',
        'fono_trabajo',
        'movil',
        'idGenero',
        'FichaMedica_rut',
        'EstadoCivil_idEstadoCivil',
        'Comuna_Provincia_idProvincia',
        'Comuna_idComuna'
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
        'tipo' => 'string',
        'idRegion' => 'integer',
        'idProvincia' => 'integer',
        'fono_casa' => 'string',
        'fono_trabajo' => 'string',
        'movil' => 'string',
        'idGenero' => 'integer',
        'FichaMedica_rut' => 'string',
        'EstadoCivil_idEstadoCivil' => 'integer',
        'Comuna_Provincia_idProvincia' => 'integer',
        'Comuna_idComuna' => 'integer'
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
    public function fichaMedica()
    {
        return $this->belongsTo(\App\Models\FichaMedica::class);
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
