<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HistorialFichaApiTest extends TestCase
{
    use MakeHistorialFichaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHistorialFicha()
    {
        $historialFicha = $this->fakeHistorialFichaData();
        $this->json('POST', '/api/v1/historialFichas', $historialFicha);

        $this->assertApiResponse($historialFicha);
    }

    /**
     * @test
     */
    public function testReadHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $this->json('GET', '/api/v1/historialFichas/'.$historialFicha->id);

        $this->assertApiResponse($historialFicha->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $editedHistorialFicha = $this->fakeHistorialFichaData();

        $this->json('PUT', '/api/v1/historialFichas/'.$historialFicha->id, $editedHistorialFicha);

        $this->assertApiResponse($editedHistorialFicha);
    }

    /**
     * @test
     */
    public function testDeleteHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $this->json('DELETE', '/api/v1/historialFichas/'.$historialFicha->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/historialFichas/'.$historialFicha->id);

        $this->assertResponseStatus(404);
    }
}
