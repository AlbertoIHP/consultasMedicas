<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasPacienteApiTest extends TestCase
{
    use MakeAlergiasPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAlergiasPaciente()
    {
        $alergiasPaciente = $this->fakeAlergiasPacienteData();
        $this->json('POST', '/api/v1/alergiasPacientes', $alergiasPaciente);

        $this->assertApiResponse($alergiasPaciente);
    }

    /**
     * @test
     */
    public function testReadAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $this->json('GET', '/api/v1/alergiasPacientes/'.$alergiasPaciente->id);

        $this->assertApiResponse($alergiasPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $editedAlergiasPaciente = $this->fakeAlergiasPacienteData();

        $this->json('PUT', '/api/v1/alergiasPacientes/'.$alergiasPaciente->id, $editedAlergiasPaciente);

        $this->assertApiResponse($editedAlergiasPaciente);
    }

    /**
     * @test
     */
    public function testDeleteAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $this->json('DELETE', '/api/v1/alergiasPacientes/'.$alergiasPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/alergiasPacientes/'.$alergiasPaciente->id);

        $this->assertResponseStatus(404);
    }
}
