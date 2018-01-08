<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaPersona extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW VistaPersona AS (
                        SELECT 
                            persona.id,
                            persona.rut,
                            persona.nombre1,
                            persona.nombre2,
                            persona.apellido1,
                            persona.apellido2,
                            persona.fono_casa,
                            persona.fono_trabajo,
                            persona.movil,
                            genero.nombre as genero,
                            genero.id as Genero_id,
                            estadoCivil.nombre as estadoCivil, 
                            estadoCivil.id as EstadoCivil_id,
                            region.nombre as region,
                            region.id as Region_id, 
                            provincia.nombre as provincia,
                            provincia.id as Provincia_id,
                            comuna.nombre as comuna,
                            comuna.id as Comuna_id,
                            persona.estado,
                            persona.fechaNacimiento,
                            persona.direccion
                        FROM 
                            Persona persona
                        INNER JOIN 
                            EstadoCivil estadoCivil on estadoCivil.id = persona.EstadoCivil_id
                        INNER JOIN  
                            Genero genero on genero.id=persona.Genero_id
                       INNER JOIN  
                            Comuna comuna on comuna.id=persona.Comuna_id 
                        INNER JOIN  
                            Provincia provincia on provincia.id = comuna.Provincia_id 
                        INNER JOIN 
                            Region region on region.id = provincia.Region_id
                        WHERE
                            persona.deleted_at IS NULL

                    )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaPersona");
    }
}
