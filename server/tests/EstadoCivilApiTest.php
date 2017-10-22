<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EstadoCivilApiTest extends TestCase
{
    use MakeEstadoCivilTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateEstadoCivil()
    {
        $estadoCivil = $this->fakeEstadoCivilData();
        $this->json('POST', '/api/v1/estadoCivils', $estadoCivil);

        $this->assertApiResponse($estadoCivil);
    }

    /**
     * @test
     */
    public function testReadEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $this->json('GET', '/api/v1/estadoCivils/'.$estadoCivil->id);

        $this->assertApiResponse($estadoCivil->toArray());
    }

    /**
     * @test
     */
    public function testUpdateEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $editedEstadoCivil = $this->fakeEstadoCivilData();

        $this->json('PUT', '/api/v1/estadoCivils/'.$estadoCivil->id, $editedEstadoCivil);

        $this->assertApiResponse($editedEstadoCivil);
    }

    /**
     * @test
     */
    public function testDeleteEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $this->json('DELETE', '/api/v1/estadoCivils/'.$estadoCivil->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/estadoCivils/'.$estadoCivil->id);

        $this->assertResponseStatus(404);
    }
}
