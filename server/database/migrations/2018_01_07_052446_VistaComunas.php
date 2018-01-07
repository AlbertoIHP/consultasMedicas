<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaComunas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW VistaComuna AS (
                        SELECT
                            Comuna.id,
                            Comuna.nombre,
                            Comuna.Provincia_id,
                            Provincia.nombre AS Provincia
                        FROM 
                            Comuna
                        INNER JOIN 
                            Provincia ON Provincia.id = Comuna.Provincia_id
                        WHERE
                            Comuna.deleted_at IS NULL 
                        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaComuna");
    }
}