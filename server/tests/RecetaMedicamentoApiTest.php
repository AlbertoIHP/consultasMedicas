<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RecetaMedicamentoApiTest extends TestCase
{
    use MakeRecetaMedicamentoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateRecetaMedicamento()
    {
        $recetaMedicamento = $this->fakeRecetaMedicamentoData();
        $this->json('POST', '/api/v1/recetaMedicamentos', $recetaMedicamento);

        $this->assertApiResponse($recetaMedicamento);
    }

    /**
     * @test
     */
    public function testReadRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $this->json('GET', '/api/v1/recetaMedicamentos/'.$recetaMedicamento->id);

        $this->assertApiResponse($recetaMedicamento->toArray());
    }

    /**
     * @test
     */
    public function testUpdateRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $editedRecetaMedicamento = $this->fakeRecetaMedicamentoData();

        $this->json('PUT', '/api/v1/recetaMedicamentos/'.$recetaMedicamento->id, $editedRecetaMedicamento);

        $this->assertApiResponse($editedRecetaMedicamento);
    }

    /**
     * @test
     */
    public function testDeleteRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $this->json('DELETE', '/api/v1/recetaMedicamentos/'.$recetaMedicamento->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/recetaMedicamentos/'.$recetaMedicamento->id);

        $this->assertResponseStatus(404);
    }
}
