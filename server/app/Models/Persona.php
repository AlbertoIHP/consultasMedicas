<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Persona",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
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
 *          property="estado",
 *          description="estado",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="fechaNacimiento",
 *          description="fechaNacimiento",
 *          type="string",
 *          format="date"
 *      ),
 *      @SWG\Property(
 *          property="direccion",
 *          description="direccion",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="Genero_id",
 *          description="Genero_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Comuna_id",
 *          description="Comuna_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="EstadoCivil_id",
 *          description="EstadoCivil_id",
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
        'rut',
        'nombre1',
        'nombre2',
        'apellido1',
        'apellido2',
        'fono_casa',
        'fono_trabajo',
        'movil',
        'estado',
        'fechaNacimiento',
        'direccion',
        'Genero_id',
        'Comuna_id',
        'EstadoCivil_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'rut' => 'string',
        'nombre1' => 'string',
        'nombre2' => 'string',
        'apellido1' => 'string',
        'apellido2' => 'string',
        'fono_casa' => 'string',
        'fono_trabajo' => 'string',
        'movil' => 'string',
        'estado' => 'integer',
        'fechaNacimiento' => 'date',
        'direccion' => 'string',
        'Genero_id' => 'integer',
        'Comuna_id' => 'integer',
        'EstadoCivil_id' => 'integer'
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
    public function medicos()
    {
        return $this->hasMany(\App\Models\Medico::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function pacientes()
    {
        return $this->hasMany(\App\Models\Paciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function previsionActuals()
    {
        return $this->hasMany(\App\Models\PrevisionActual::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function usuarios()
    {
        return $this->hasMany(\App\Models\Usuario::class);
    }

    protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];   

}
