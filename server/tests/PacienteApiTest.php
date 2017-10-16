<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PacienteApiTest extends TestCase
{
    use MakePacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePaciente()
    {
        $paciente = $this->fakePacienteData();
        $this->json('POST', '/api/v1/pacientes', $paciente);

        $this->assertApiResponse($paciente);
    }

    /**
     * @test
     */
    public function testReadPaciente()
    {
        $paciente = $this->makePaciente();
        $this->json('GET', '/api/v1/pacientes/'.$paciente->id);

        $this->assertApiResponse($paciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePaciente()
    {
        $paciente = $this->makePaciente();
        $editedPaciente = $this->fakePacienteData();

        $this->json('PUT', '/api/v1/pacientes/'.$paciente->id, $editedPaciente);

        $this->assertApiResponse($editedPaciente);
    }

    /**
     * @test
     */
    public function testDeletePaciente()
    {
        $paciente = $this->makePaciente();
        $this->json('DELETE', '/api/v1/pacientes/'.$paciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/pacientes/'.$paciente->id);

        $this->assertResponseStatus(404);
    }
}
