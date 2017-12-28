<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaPaciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW VistaPaciente AS (
                        SELECT
                        Paciente.id, Paciente.Persona_id, nombre1,nombre2,apellido1,apellido2,rut, fono_casa, fono_trabajo, movil, estado, fechaNacimiento, direccion, Genero.nombre as Genero, Comuna.nombre as Comuna, Provincia.nombre as Provincia, Region.nombre as Region, EstadoCivil.nombre as EstadoCivil, TipoSangre.nombre AS TipoSangre, Ocupacion.nombre AS Ocupacion, GrupoEtnico.nombre AS GrupoEtnico, Prevision.nombre AS Prevision
                        FROM 
                        Paciente 
                        INNER JOIN 
                        Persona ON Persona.id = Paciente.Persona_id 
                        INNER JOIN 
                        TipoSangre ON TipoSangre.id = Paciente.TipoSangre_id 
                        INNER JOIN
                        Ocupacion ON Ocupacion.id = Paciente.Ocupacion_id 
                        INNER JOIN 
                        GrupoEtnico ON GrupoEtnico.id = Paciente.GrupoEtnico_id
                        INNER JOIN
                        Genero ON Genero.id = Persona.Genero_id
                        INNER JOIN
                        Comuna ON Comuna.id = Persona.Comuna_id
                        INNER JOIN
                        Provincia ON Provincia.id = Comuna.Provincia_id
                        INNER JOIN
                            Region ON Region.id = Provincia.Region_id
                        INNER JOIN
                            EstadoCivil ON EstadoCivil.id = Persona.EstadoCivil_id
                        INNER JOIN
                            PrevisionActual ON Persona.id = PrevisionActual.Persona_id and activado = 1
                        INNER JOIN
                            Prevision ON PrevisionActual.Prevision_id = Prevision.id
                        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaPaciente");
    }
}