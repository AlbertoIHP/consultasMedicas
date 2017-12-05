<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticoApiTest extends TestCase
{
    use MakeDiagnosticoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateDiagnostico()
    {
        $diagnostico = $this->fakeDiagnosticoData();
        $this->json('POST', '/api/v1/diagnosticos', $diagnostico);

        $this->assertApiResponse($diagnostico);
    }

    /**
     * @test
     */
    public function testReadDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $this->json('GET', '/api/v1/diagnosticos/'.$diagnostico->id);

        $this->assertApiResponse($diagnostico->toArray());
    }

    /**
     * @test
     */
    public function testUpdateDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $editedDiagnostico = $this->fakeDiagnosticoData();

        $this->json('PUT', '/api/v1/diagnosticos/'.$diagnostico->id, $editedDiagnostico);

        $this->assertApiResponse($editedDiagnostico);
    }

    /**
     * @test
     */
    public function testDeleteDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $this->json('DELETE', '/api/v1/diagnosticos/'.$diagnostico->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/diagnosticos/'.$diagnostico->id);

        $this->assertResponseStatus(404);
    }
}
