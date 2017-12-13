<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitosSexualesPacienteApiTest extends TestCase
{
    use MakeHabitosSexualesPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->fakeHabitosSexualesPacienteData();
        $this->json('POST', '/api/v1/habitosSexualesPacientes', $habitosSexualesPaciente);

        $this->assertApiResponse($habitosSexualesPaciente);
    }

    /**
     * @test
     */
    public function testReadHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $this->json('GET', '/api/v1/habitosSexualesPacientes/'.$habitosSexualesPaciente->id);

        $this->assertApiResponse($habitosSexualesPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $editedHabitosSexualesPaciente = $this->fakeHabitosSexualesPacienteData();

        $this->json('PUT', '/api/v1/habitosSexualesPacientes/'.$habitosSexualesPaciente->id, $editedHabitosSexualesPaciente);

        $this->assertApiResponse($editedHabitosSexualesPaciente);
    }

    /**
     * @test
     */
    public function testDeleteHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $this->json('DELETE', '/api/v1/habitosSexualesPacientes/'.$habitosSexualesPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/habitosSexualesPacientes/'.$habitosSexualesPaciente->id);

        $this->assertResponseStatus(404);
    }
}
