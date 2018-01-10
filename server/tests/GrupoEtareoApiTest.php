<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtareoApiTest extends TestCase
{
    use MakeGrupoEtareoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateGrupoEtareo()
    {
        $grupoEtareo = $this->fakeGrupoEtareoData();
        $this->json('POST', '/api/v1/grupoEtareos', $grupoEtareo);

        $this->assertApiResponse($grupoEtareo);
    }

    /**
     * @test
     */
    public function testReadGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $this->json('GET', '/api/v1/grupoEtareos/'.$grupoEtareo->id);

        $this->assertApiResponse($grupoEtareo->toArray());
    }

    /**
     * @test
     */
    public function testUpdateGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $editedGrupoEtareo = $this->fakeGrupoEtareoData();

        $this->json('PUT', '/api/v1/grupoEtareos/'.$grupoEtareo->id, $editedGrupoEtareo);

        $this->assertApiResponse($editedGrupoEtareo);
    }

    /**
     * @test
     */
    public function testDeleteGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $this->json('DELETE', '/api/v1/grupoEtareos/'.$grupoEtareo->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/grupoEtareos/'.$grupoEtareo->id);

        $this->assertResponseStatus(404);
    }
}
