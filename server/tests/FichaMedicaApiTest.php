<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FichaMedicaApiTest extends TestCase
{
    use MakeFichaMedicaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateFichaMedica()
    {
        $fichaMedica = $this->fakeFichaMedicaData();
        $this->json('POST', '/api/v1/fichaMedicas', $fichaMedica);

        $this->assertApiResponse($fichaMedica);
    }

    /**
     * @test
     */
    public function testReadFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $this->json('GET', '/api/v1/fichaMedicas/'.$fichaMedica->id);

        $this->assertApiResponse($fichaMedica->toArray());
    }

    /**
     * @test
     */
    public function testUpdateFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $editedFichaMedica = $this->fakeFichaMedicaData();

        $this->json('PUT', '/api/v1/fichaMedicas/'.$fichaMedica->id, $editedFichaMedica);

        $this->assertApiResponse($editedFichaMedica);
    }

    /**
     * @test
     */
    public function testDeleteFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $this->json('DELETE', '/api/v1/fichaMedicas/'.$fichaMedica->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/fichaMedicas/'.$fichaMedica->id);

        $this->assertResponseStatus(404);
    }
}
