<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtnicoApiTest extends TestCase
{
    use MakeGrupoEtnicoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateGrupoEtnico()
    {
        $grupoEtnico = $this->fakeGrupoEtnicoData();
        $this->json('POST', '/api/v1/grupoEtnicos', $grupoEtnico);

        $this->assertApiResponse($grupoEtnico);
    }

    /**
     * @test
     */
    public function testReadGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $this->json('GET', '/api/v1/grupoEtnicos/'.$grupoEtnico->id);

        $this->assertApiResponse($grupoEtnico->toArray());
    }

    /**
     * @test
     */
    public function testUpdateGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $editedGrupoEtnico = $this->fakeGrupoEtnicoData();

        $this->json('PUT', '/api/v1/grupoEtnicos/'.$grupoEtnico->id, $editedGrupoEtnico);

        $this->assertApiResponse($editedGrupoEtnico);
    }

    /**
     * @test
     */
    public function testDeleteGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $this->json('DELETE', '/api/v1/grupoEtnicos/'.$grupoEtnico->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/grupoEtnicos/'.$grupoEtnico->id);

        $this->assertResponseStatus(404);
    }
}
