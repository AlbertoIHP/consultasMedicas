<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DisponibilidadApiTest extends TestCase
{
    use MakeDisponibilidadTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateDisponibilidad()
    {
        $disponibilidad = $this->fakeDisponibilidadData();
        $this->json('POST', '/api/v1/disponibilidads', $disponibilidad);

        $this->assertApiResponse($disponibilidad);
    }

    /**
     * @test
     */
    public function testReadDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $this->json('GET', '/api/v1/disponibilidads/'.$disponibilidad->id);

        $this->assertApiResponse($disponibilidad->toArray());
    }

    /**
     * @test
     */
    public function testUpdateDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $editedDisponibilidad = $this->fakeDisponibilidadData();

        $this->json('PUT', '/api/v1/disponibilidads/'.$disponibilidad->id, $editedDisponibilidad);

        $this->assertApiResponse($editedDisponibilidad);
    }

    /**
     * @test
     */
    public function testDeleteDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $this->json('DELETE', '/api/v1/disponibilidads/'.$disponibilidad->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/disponibilidads/'.$disponibilidad->id);

        $this->assertResponseStatus(404);
    }
}
