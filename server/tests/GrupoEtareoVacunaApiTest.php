<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtareoVacunaApiTest extends TestCase
{
    use MakeGrupoEtareoVacunaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->fakeGrupoEtareoVacunaData();
        $this->json('POST', '/api/v1/grupoEtareoVacunas', $grupoEtareoVacuna);

        $this->assertApiResponse($grupoEtareoVacuna);
    }

    /**
     * @test
     */
    public function testReadGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $this->json('GET', '/api/v1/grupoEtareoVacunas/'.$grupoEtareoVacuna->id);

        $this->assertApiResponse($grupoEtareoVacuna->toArray());
    }

    /**
     * @test
     */
    public function testUpdateGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $editedGrupoEtareoVacuna = $this->fakeGrupoEtareoVacunaData();

        $this->json('PUT', '/api/v1/grupoEtareoVacunas/'.$grupoEtareoVacuna->id, $editedGrupoEtareoVacuna);

        $this->assertApiResponse($editedGrupoEtareoVacuna);
    }

    /**
     * @test
     */
    public function testDeleteGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $this->json('DELETE', '/api/v1/grupoEtareoVacunas/'.$grupoEtareoVacuna->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/grupoEtareoVacunas/'.$grupoEtareoVacuna->id);

        $this->assertResponseStatus(404);
    }
}
