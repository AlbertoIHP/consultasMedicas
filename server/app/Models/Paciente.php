<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Paciente",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
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
 *          property="TipoSangre_id",
 *          description="TipoSangre_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="GrupoEtnico_id",
 *          description="GrupoEtnico_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="Ocupacion_id",
 *          description="Ocupacion_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Paciente extends Model
{
    use SoftDeletes;

    public $table = 'Paciente';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'Persona_id',
        'TipoSangre_id',
        'GrupoEtnico_id',
        'Ocupacion_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'Persona_id' => 'integer',
        'TipoSangre_id' => 'integer',
        'GrupoEtnico_id' => 'integer',
        'Ocupacion_id' => 'integer'
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
    public function grupoEtnico()
    {
        return $this->belongsTo(\App\Models\GrupoEtnico::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function ocupacion()
    {
        return $this->belongsTo(\App\Models\Ocupacion::class);
    }

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
    public function alergiasComunesPacientes()
    {
        return $this->hasMany(\App\Models\AlergiasComunesPaciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function alergiasMedicamentosPacientes()
    {
        return $this->hasMany(\App\Models\AlergiasMedicamentosPaciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function atencions()
    {
        return $this->hasMany(\App\Models\Atencion::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function cita()
    {
        return $this->hasMany(\App\Models\Citum::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function enfermedadesCronicasPacientes()
    {
        return $this->hasMany(\App\Models\EnfermedadesCronicasPaciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function habitosPacientes()
    {
        return $this->hasMany(\App\Models\HabitosPaciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function habitosSexualesPacientes()
    {
        return $this->hasMany(\App\Models\HabitosSexualesPaciente::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function usoMedicamentos()
    {
        return $this->hasMany(\App\Models\UsoMedicamento::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function vacunasPacientes()
    {
        return $this->hasMany(\App\Models\VacunasPaciente::class);
    }

	protected $hidden = ['remember_token', 'updated_at', 'created_at', 'deleted_at'];	

}
