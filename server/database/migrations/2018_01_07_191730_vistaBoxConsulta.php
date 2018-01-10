<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaBoxConsulta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         DB::statement("CREATE VIEW VistaBoxConsulta AS (
                        SELECT 
                            boxConsulta.id,
                            boxConsulta.ubicacion, 
                            tipoBox.nombre as tipoBox, 
                            boxConsulta.TipoBox_id 
                        FROM 
                            BoxConsulta boxConsulta 
                        INNER JOIN 
                            Especialidad tipoBox on boxConsulta.TipoBox_id=tipoBox.id 
                        WHERE
                            boxConsulta.deleted_at IS NULL
                        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaBoxConsulta");
    }
}
