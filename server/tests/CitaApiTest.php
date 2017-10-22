<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CitaApiTest extends TestCase
{
    use MakeCitaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateCita()
    {
        $cita = $this->fakeCitaData();
        $this->json('POST', '/api/v1/citas', $cita);

        $this->assertApiResponse($cita);
    }

    /**
     * @test
     */
    public function testReadCita()
    {
        $cita = $this->makeCita();
        $this->json('GET', '/api/v1/citas/'.$cita->id);

        $this->assertApiResponse($cita->toArray());
    }

    /**
     * @test
     */
    public function testUpdateCita()
    {
        $cita = $this->makeCita();
        $editedCita = $this->fakeCitaData();

        $this->json('PUT', '/api/v1/citas/'.$cita->id, $editedCita);

        $this->assertApiResponse($editedCita);
    }

    /**
     * @test
     */
    public function testDeleteCita()
    {
        $cita = $this->makeCita();
        $this->json('DELETE', '/api/v1/citas/'.$cita->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/citas/'.$cita->id);

        $this->assertResponseStatus(404);
    }
}
