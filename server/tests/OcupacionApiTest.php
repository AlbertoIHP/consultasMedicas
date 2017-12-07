<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OcupacionApiTest extends TestCase
{
    use MakeOcupacionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOcupacion()
    {
        $ocupacion = $this->fakeOcupacionData();
        $this->json('POST', '/api/v1/ocupacions', $ocupacion);

        $this->assertApiResponse($ocupacion);
    }

    /**
     * @test
     */
    public function testReadOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $this->json('GET', '/api/v1/ocupacions/'.$ocupacion->id);

        $this->assertApiResponse($ocupacion->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $editedOcupacion = $this->fakeOcupacionData();

        $this->json('PUT', '/api/v1/ocupacions/'.$ocupacion->id, $editedOcupacion);

        $this->assertApiResponse($editedOcupacion);
    }

    /**
     * @test
     */
    public function testDeleteOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $this->json('DELETE', '/api/v1/ocupacions/'.$ocupacion->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/ocupacions/'.$ocupacion->id);

        $this->assertResponseStatus(404);
    }
}
