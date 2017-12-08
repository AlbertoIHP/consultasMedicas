<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExamenFisicoApiTest extends TestCase
{
    use MakeExamenFisicoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateExamenFisico()
    {
        $examenFisico = $this->fakeExamenFisicoData();
        $this->json('POST', '/api/v1/examenFisicos', $examenFisico);

        $this->assertApiResponse($examenFisico);
    }

    /**
     * @test
     */
    public function testReadExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $this->json('GET', '/api/v1/examenFisicos/'.$examenFisico->id);

        $this->assertApiResponse($examenFisico->toArray());
    }

    /**
     * @test
     */
    public function testUpdateExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $editedExamenFisico = $this->fakeExamenFisicoData();

        $this->json('PUT', '/api/v1/examenFisicos/'.$examenFisico->id, $editedExamenFisico);

        $this->assertApiResponse($editedExamenFisico);
    }

    /**
     * @test
     */
    public function testDeleteExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $this->json('DELETE', '/api/v1/examenFisicos/'.$examenFisico->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/examenFisicos/'.$examenFisico->id);

        $this->assertResponseStatus(404);
    }
}
