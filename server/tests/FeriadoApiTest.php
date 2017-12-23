<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FeriadoApiTest extends TestCase
{
    use MakeFeriadoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateFeriado()
    {
        $feriado = $this->fakeFeriadoData();
        $this->json('POST', '/api/v1/feriados', $feriado);

        $this->assertApiResponse($feriado);
    }

    /**
     * @test
     */
    public function testReadFeriado()
    {
        $feriado = $this->makeFeriado();
        $this->json('GET', '/api/v1/feriados/'.$feriado->id);

        $this->assertApiResponse($feriado->toArray());
    }

    /**
     * @test
     */
    public function testUpdateFeriado()
    {
        $feriado = $this->makeFeriado();
        $editedFeriado = $this->fakeFeriadoData();

        $this->json('PUT', '/api/v1/feriados/'.$feriado->id, $editedFeriado);

        $this->assertApiResponse($editedFeriado);
    }

    /**
     * @test
     */
    public function testDeleteFeriado()
    {
        $feriado = $this->makeFeriado();
        $this->json('DELETE', '/api/v1/feriados/'.$feriado->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/feriados/'.$feriado->id);

        $this->assertResponseStatus(404);
    }
}
