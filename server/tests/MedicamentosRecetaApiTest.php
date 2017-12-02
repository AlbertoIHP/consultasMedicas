<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicamentosRecetaApiTest extends TestCase
{
    use MakeMedicamentosRecetaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateMedicamentosReceta()
    {
        $medicamentosReceta = $this->fakeMedicamentosRecetaData();
        $this->json('POST', '/api/v1/medicamentosRecetas', $medicamentosReceta);

        $this->assertApiResponse($medicamentosReceta);
    }

    /**
     * @test
     */
    public function testReadMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $this->json('GET', '/api/v1/medicamentosRecetas/'.$medicamentosReceta->id);

        $this->assertApiResponse($medicamentosReceta->toArray());
    }

    /**
     * @test
     */
    public function testUpdateMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $editedMedicamentosReceta = $this->fakeMedicamentosRecetaData();

        $this->json('PUT', '/api/v1/medicamentosRecetas/'.$medicamentosReceta->id, $editedMedicamentosReceta);

        $this->assertApiResponse($editedMedicamentosReceta);
    }

    /**
     * @test
     */
    public function testDeleteMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $this->json('DELETE', '/api/v1/medicamentosRecetas/'.$medicamentosReceta->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/medicamentosRecetas/'.$medicamentosReceta->id);

        $this->assertResponseStatus(404);
    }
}
