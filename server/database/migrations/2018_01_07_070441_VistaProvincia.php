<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaProvincia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW VistaProvincia AS (
                        SELECT
                            Provincia.id,
                            Provincia.nombre,
                            Provincia.Region_id,
                            Region.nombre AS Region
                        FROM 
                            Provincia
                        INNER JOIN 
                            Region ON Region.id = Provincia.Region_id 
                        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaProvincia");
    }
}
