<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasComunesPacienteApiTest extends TestCase
{
    use MakeAlergiasComunesPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->fakeAlergiasComunesPacienteData();
        $this->json('POST', '/api/v1/alergiasComunesPacientes', $alergiasComunesPaciente);

        $this->assertApiResponse($alergiasComunesPaciente);
    }

    /**
     * @test
     */
    public function testReadAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $this->json('GET', '/api/v1/alergiasComunesPacientes/'.$alergiasComunesPaciente->id);

        $this->assertApiResponse($alergiasComunesPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $editedAlergiasComunesPaciente = $this->fakeAlergiasComunesPacienteData();

        $this->json('PUT', '/api/v1/alergiasComunesPacientes/'.$alergiasComunesPaciente->id, $editedAlergiasComunesPaciente);

        $this->assertApiResponse($editedAlergiasComunesPaciente);
    }

    /**
     * @test
     */
    public function testDeleteAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $this->json('DELETE', '/api/v1/alergiasComunesPacientes/'.$alergiasComunesPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/alergiasComunesPacientes/'.$alergiasComunesPaciente->id);

        $this->assertResponseStatus(404);
    }
}
