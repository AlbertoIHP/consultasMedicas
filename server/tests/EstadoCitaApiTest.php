<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EstadoCitaApiTest extends TestCase
{
    use MakeEstadoCitaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateEstadoCita()
    {
        $estadoCita = $this->fakeEstadoCitaData();
        $this->json('POST', '/api/v1/estadoCitas', $estadoCita);

        $this->assertApiResponse($estadoCita);
    }

    /**
     * @test
     */
    public function testReadEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $this->json('GET', '/api/v1/estadoCitas/'.$estadoCita->id);

        $this->assertApiResponse($estadoCita->toArray());
    }

    /**
     * @test
     */
    public function testUpdateEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $editedEstadoCita = $this->fakeEstadoCitaData();

        $this->json('PUT', '/api/v1/estadoCitas/'.$estadoCita->id, $editedEstadoCita);

        $this->assertApiResponse($editedEstadoCita);
    }

    /**
     * @test
     */
    public function testDeleteEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $this->json('DELETE', '/api/v1/estadoCitas/'.$estadoCita->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/estadoCitas/'.$estadoCita->id);

        $this->assertResponseStatus(404);
    }
}
