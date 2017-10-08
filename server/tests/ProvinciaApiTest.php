<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProvinciaApiTest extends TestCase
{
    use MakeProvinciaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateProvincia()
    {
        $provincia = $this->fakeProvinciaData();
        $this->json('POST', '/api/v1/provincias', $provincia);

        $this->assertApiResponse($provincia);
    }

    /**
     * @test
     */
    public function testReadProvincia()
    {
        $provincia = $this->makeProvincia();
        $this->json('GET', '/api/v1/provincias/'.$provincia->id);

        $this->assertApiResponse($provincia->toArray());
    }

    /**
     * @test
     */
    public function testUpdateProvincia()
    {
        $provincia = $this->makeProvincia();
        $editedProvincia = $this->fakeProvinciaData();

        $this->json('PUT', '/api/v1/provincias/'.$provincia->id, $editedProvincia);

        $this->assertApiResponse($editedProvincia);
    }

    /**
     * @test
     */
    public function testDeleteProvincia()
    {
        $provincia = $this->makeProvincia();
        $this->json('DELETE', '/api/v1/provincias/'.$provincia->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/provincias/'.$provincia->id);

        $this->assertResponseStatus(404);
    }
}
