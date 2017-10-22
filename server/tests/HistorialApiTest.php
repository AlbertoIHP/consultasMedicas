<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HistorialApiTest extends TestCase
{
    use MakeHistorialTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHistorial()
    {
        $historial = $this->fakeHistorialData();
        $this->json('POST', '/api/v1/historials', $historial);

        $this->assertApiResponse($historial);
    }

    /**
     * @test
     */
    public function testReadHistorial()
    {
        $historial = $this->makeHistorial();
        $this->json('GET', '/api/v1/historials/'.$historial->id);

        $this->assertApiResponse($historial->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHistorial()
    {
        $historial = $this->makeHistorial();
        $editedHistorial = $this->fakeHistorialData();

        $this->json('PUT', '/api/v1/historials/'.$historial->id, $editedHistorial);

        $this->assertApiResponse($editedHistorial);
    }

    /**
     * @test
     */
    public function testDeleteHistorial()
    {
        $historial = $this->makeHistorial();
        $this->json('DELETE', '/api/v1/historials/'.$historial->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/historials/'.$historial->id);

        $this->assertResponseStatus(404);
    }
}
