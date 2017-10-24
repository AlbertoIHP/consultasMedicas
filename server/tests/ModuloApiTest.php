<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ModuloApiTest extends TestCase
{
    use MakeModuloTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateModulo()
    {
        $modulo = $this->fakeModuloData();
        $this->json('POST', '/api/v1/modulos', $modulo);

        $this->assertApiResponse($modulo);
    }

    /**
     * @test
     */
    public function testReadModulo()
    {
        $modulo = $this->makeModulo();
        $this->json('GET', '/api/v1/modulos/'.$modulo->id);

        $this->assertApiResponse($modulo->toArray());
    }

    /**
     * @test
     */
    public function testUpdateModulo()
    {
        $modulo = $this->makeModulo();
        $editedModulo = $this->fakeModuloData();

        $this->json('PUT', '/api/v1/modulos/'.$modulo->id, $editedModulo);

        $this->assertApiResponse($editedModulo);
    }

    /**
     * @test
     */
    public function testDeleteModulo()
    {
        $modulo = $this->makeModulo();
        $this->json('DELETE', '/api/v1/modulos/'.$modulo->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/modulos/'.$modulo->id);

        $this->assertResponseStatus(404);
    }
}
