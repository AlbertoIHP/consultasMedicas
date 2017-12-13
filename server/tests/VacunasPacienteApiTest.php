<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VacunasPacienteApiTest extends TestCase
{
    use MakeVacunasPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateVacunasPaciente()
    {
        $vacunasPaciente = $this->fakeVacunasPacienteData();
        $this->json('POST', '/api/v1/vacunasPacientes', $vacunasPaciente);

        $this->assertApiResponse($vacunasPaciente);
    }

    /**
     * @test
     */
    public function testReadVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $this->json('GET', '/api/v1/vacunasPacientes/'.$vacunasPaciente->id);

        $this->assertApiResponse($vacunasPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $editedVacunasPaciente = $this->fakeVacunasPacienteData();

        $this->json('PUT', '/api/v1/vacunasPacientes/'.$vacunasPaciente->id, $editedVacunasPaciente);

        $this->assertApiResponse($editedVacunasPaciente);
    }

    /**
     * @test
     */
    public function testDeleteVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $this->json('DELETE', '/api/v1/vacunasPacientes/'.$vacunasPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/vacunasPacientes/'.$vacunasPaciente->id);

        $this->assertResponseStatus(404);
    }
}
