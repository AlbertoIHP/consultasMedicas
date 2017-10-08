<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BoxConsultaApiTest extends TestCase
{
    use MakeBoxConsultaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateBoxConsulta()
    {
        $boxConsulta = $this->fakeBoxConsultaData();
        $this->json('POST', '/api/v1/boxConsultas', $boxConsulta);

        $this->assertApiResponse($boxConsulta);
    }

    /**
     * @test
     */
    public function testReadBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $this->json('GET', '/api/v1/boxConsultas/'.$boxConsulta->id);

        $this->assertApiResponse($boxConsulta->toArray());
    }

    /**
     * @test
     */
    public function testUpdateBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $editedBoxConsulta = $this->fakeBoxConsultaData();

        $this->json('PUT', '/api/v1/boxConsultas/'.$boxConsulta->id, $editedBoxConsulta);

        $this->assertApiResponse($editedBoxConsulta);
    }

    /**
     * @test
     */
    public function testDeleteBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $this->json('DELETE', '/api/v1/boxConsultas/'.$boxConsulta->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/boxConsultas/'.$boxConsulta->id);

        $this->assertResponseStatus(404);
    }
}
