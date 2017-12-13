<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EnfermedadesCronicasPacienteApiTest extends TestCase
{
    use MakeEnfermedadesCronicasPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->fakeEnfermedadesCronicasPacienteData();
        $this->json('POST', '/api/v1/enfermedadesCronicasPacientes', $enfermedadesCronicasPaciente);

        $this->assertApiResponse($enfermedadesCronicasPaciente);
    }

    /**
     * @test
     */
    public function testReadEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $this->json('GET', '/api/v1/enfermedadesCronicasPacientes/'.$enfermedadesCronicasPaciente->id);

        $this->assertApiResponse($enfermedadesCronicasPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $editedEnfermedadesCronicasPaciente = $this->fakeEnfermedadesCronicasPacienteData();

        $this->json('PUT', '/api/v1/enfermedadesCronicasPacientes/'.$enfermedadesCronicasPaciente->id, $editedEnfermedadesCronicasPaciente);

        $this->assertApiResponse($editedEnfermedadesCronicasPaciente);
    }

    /**
     * @test
     */
    public function testDeleteEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $this->json('DELETE', '/api/v1/enfermedadesCronicasPacientes/'.$enfermedadesCronicasPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/enfermedadesCronicasPacientes/'.$enfermedadesCronicasPaciente->id);

        $this->assertResponseStatus(404);
    }
}
