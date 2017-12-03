<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AtencionApiTest extends TestCase
{
    use MakeAtencionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAtencion()
    {
        $atencion = $this->fakeAtencionData();
        $this->json('POST', '/api/v1/atencions', $atencion);

        $this->assertApiResponse($atencion);
    }

    /**
     * @test
     */
    public function testReadAtencion()
    {
        $atencion = $this->makeAtencion();
        $this->json('GET', '/api/v1/atencions/'.$atencion->id);

        $this->assertApiResponse($atencion->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAtencion()
    {
        $atencion = $this->makeAtencion();
        $editedAtencion = $this->fakeAtencionData();

        $this->json('PUT', '/api/v1/atencions/'.$atencion->id, $editedAtencion);

        $this->assertApiResponse($editedAtencion);
    }

    /**
     * @test
     */
    public function testDeleteAtencion()
    {
        $atencion = $this->makeAtencion();
        $this->json('DELETE', '/api/v1/atencions/'.$atencion->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/atencions/'.$atencion->id);

        $this->assertResponseStatus(404);
    }
}
