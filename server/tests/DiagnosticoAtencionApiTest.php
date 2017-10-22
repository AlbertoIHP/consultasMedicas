<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticoAtencionApiTest extends TestCase
{
    use MakeDiagnosticoAtencionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->fakeDiagnosticoAtencionData();
        $this->json('POST', '/api/v1/diagnosticoAtencions', $diagnosticoAtencion);

        $this->assertApiResponse($diagnosticoAtencion);
    }

    /**
     * @test
     */
    public function testReadDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $this->json('GET', '/api/v1/diagnosticoAtencions/'.$diagnosticoAtencion->id);

        $this->assertApiResponse($diagnosticoAtencion->toArray());
    }

    /**
     * @test
     */
    public function testUpdateDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $editedDiagnosticoAtencion = $this->fakeDiagnosticoAtencionData();

        $this->json('PUT', '/api/v1/diagnosticoAtencions/'.$diagnosticoAtencion->id, $editedDiagnosticoAtencion);

        $this->assertApiResponse($editedDiagnosticoAtencion);
    }

    /**
     * @test
     */
    public function testDeleteDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $this->json('DELETE', '/api/v1/diagnosticoAtencions/'.$diagnosticoAtencion->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/diagnosticoAtencions/'.$diagnosticoAtencion->id);

        $this->assertResponseStatus(404);
    }
}
