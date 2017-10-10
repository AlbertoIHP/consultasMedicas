<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TipoSangreApiTest extends TestCase
{
    use MakeTipoSangreTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateTipoSangre()
    {
        $tipoSangre = $this->fakeTipoSangreData();
        $this->json('POST', '/api/v1/tipoSangres', $tipoSangre);

        $this->assertApiResponse($tipoSangre);
    }

    /**
     * @test
     */
    public function testReadTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $this->json('GET', '/api/v1/tipoSangres/'.$tipoSangre->id);

        $this->assertApiResponse($tipoSangre->toArray());
    }

    /**
     * @test
     */
    public function testUpdateTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $editedTipoSangre = $this->fakeTipoSangreData();

        $this->json('PUT', '/api/v1/tipoSangres/'.$tipoSangre->id, $editedTipoSangre);

        $this->assertApiResponse($editedTipoSangre);
    }

    /**
     * @test
     */
    public function testDeleteTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $this->json('DELETE', '/api/v1/tipoSangres/'.$tipoSangre->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/tipoSangres/'.$tipoSangre->id);

        $this->assertResponseStatus(404);
    }
}
