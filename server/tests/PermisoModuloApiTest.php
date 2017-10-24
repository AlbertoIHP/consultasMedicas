<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermisoModuloApiTest extends TestCase
{
    use MakePermisoModuloTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePermisoModulo()
    {
        $permisoModulo = $this->fakePermisoModuloData();
        $this->json('POST', '/api/v1/permisoModulos', $permisoModulo);

        $this->assertApiResponse($permisoModulo);
    }

    /**
     * @test
     */
    public function testReadPermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $this->json('GET', '/api/v1/permisoModulos/'.$permisoModulo->id);

        $this->assertApiResponse($permisoModulo->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $editedPermisoModulo = $this->fakePermisoModuloData();

        $this->json('PUT', '/api/v1/permisoModulos/'.$permisoModulo->id, $editedPermisoModulo);

        $this->assertApiResponse($editedPermisoModulo);
    }

    /**
     * @test
     */
    public function testDeletePermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $this->json('DELETE', '/api/v1/permisoModulos/'.$permisoModulo->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/permisoModulos/'.$permisoModulo->id);

        $this->assertResponseStatus(404);
    }
}
