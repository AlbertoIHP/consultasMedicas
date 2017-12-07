<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsoMedicamentoApiTest extends TestCase
{
    use MakeUsoMedicamentoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateUsoMedicamento()
    {
        $usoMedicamento = $this->fakeUsoMedicamentoData();
        $this->json('POST', '/api/v1/usoMedicamentos', $usoMedicamento);

        $this->assertApiResponse($usoMedicamento);
    }

    /**
     * @test
     */
    public function testReadUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $this->json('GET', '/api/v1/usoMedicamentos/'.$usoMedicamento->id);

        $this->assertApiResponse($usoMedicamento->toArray());
    }

    /**
     * @test
     */
    public function testUpdateUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $editedUsoMedicamento = $this->fakeUsoMedicamentoData();

        $this->json('PUT', '/api/v1/usoMedicamentos/'.$usoMedicamento->id, $editedUsoMedicamento);

        $this->assertApiResponse($editedUsoMedicamento);
    }

    /**
     * @test
     */
    public function testDeleteUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $this->json('DELETE', '/api/v1/usoMedicamentos/'.$usoMedicamento->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/usoMedicamentos/'.$usoMedicamento->id);

        $this->assertResponseStatus(404);
    }
}
