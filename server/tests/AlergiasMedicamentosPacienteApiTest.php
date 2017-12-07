<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasMedicamentosPacienteApiTest extends TestCase
{
    use MakeAlergiasMedicamentosPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->fakeAlergiasMedicamentosPacienteData();
        $this->json('POST', '/api/v1/alergiasMedicamentosPacientes', $alergiasMedicamentosPaciente);

        $this->assertApiResponse($alergiasMedicamentosPaciente);
    }

    /**
     * @test
     */
    public function testReadAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $this->json('GET', '/api/v1/alergiasMedicamentosPacientes/'.$alergiasMedicamentosPaciente->id);

        $this->assertApiResponse($alergiasMedicamentosPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $editedAlergiasMedicamentosPaciente = $this->fakeAlergiasMedicamentosPacienteData();

        $this->json('PUT', '/api/v1/alergiasMedicamentosPacientes/'.$alergiasMedicamentosPaciente->id, $editedAlergiasMedicamentosPaciente);

        $this->assertApiResponse($editedAlergiasMedicamentosPaciente);
    }

    /**
     * @test
     */
    public function testDeleteAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $this->json('DELETE', '/api/v1/alergiasMedicamentosPacientes/'.$alergiasMedicamentosPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/alergiasMedicamentosPacientes/'.$alergiasMedicamentosPaciente->id);

        $this->assertResponseStatus(404);
    }
}
