<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticosAtencionApiTest extends TestCase
{
    use MakeDiagnosticosAtencionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->fakeDiagnosticosAtencionData();
        $this->json('POST', '/api/v1/diagnosticosAtencions', $diagnosticosAtencion);

        $this->assertApiResponse($diagnosticosAtencion);
    }

    /**
     * @test
     */
    public function testReadDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $this->json('GET', '/api/v1/diagnosticosAtencions/'.$diagnosticosAtencion->id);

        $this->assertApiResponse($diagnosticosAtencion->toArray());
    }

    /**
     * @test
     */
    public function testUpdateDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $editedDiagnosticosAtencion = $this->fakeDiagnosticosAtencionData();

        $this->json('PUT', '/api/v1/diagnosticosAtencions/'.$diagnosticosAtencion->id, $editedDiagnosticosAtencion);

        $this->assertApiResponse($editedDiagnosticosAtencion);
    }

    /**
     * @test
     */
    public function testDeleteDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $this->json('DELETE', '/api/v1/diagnosticosAtencions/'.$diagnosticosAtencion->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/diagnosticosAtencions/'.$diagnosticosAtencion->id);

        $this->assertResponseStatus(404);
    }
}
