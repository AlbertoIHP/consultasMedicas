<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class VistaUsuario extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW VistaUsuario AS (
                        SELECT
                            Usuario.id,
                            Usuario.email,
                            Usuario.password,
                            Usuario.Role_id,
                            Role.nombre as Role,
                            Usuario.Persona_id
                        FROM 
                            Usuario
                        INNER JOIN 
                            Role ON Role.id = Usuario.Role_id
                        WHERE
                            Usuario.deleted_at IS NULL
                        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW VistaUsuario");
    }
}