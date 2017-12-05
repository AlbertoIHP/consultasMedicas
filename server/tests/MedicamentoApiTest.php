<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicamentoApiTest extends TestCase
{
    use MakeMedicamentoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateMedicamento()
    {
        $medicamento = $this->fakeMedicamentoData();
        $this->json('POST', '/api/v1/medicamentos', $medicamento);

        $this->assertApiResponse($medicamento);
    }

    /**
     * @test
     */
    public function testReadMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $this->json('GET', '/api/v1/medicamentos/'.$medicamento->id);

        $this->assertApiResponse($medicamento->toArray());
    }

    /**
     * @test
     */
    public function testUpdateMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $editedMedicamento = $this->fakeMedicamentoData();

        $this->json('PUT', '/api/v1/medicamentos/'.$medicamento->id, $editedMedicamento);

        $this->assertApiResponse($editedMedicamento);
    }

    /**
     * @test
     */
    public function testDeleteMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $this->json('DELETE', '/api/v1/medicamentos/'.$medicamento->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/medicamentos/'.$medicamento->id);

        $this->assertResponseStatus(404);
    }
}
