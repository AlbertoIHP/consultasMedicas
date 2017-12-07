<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitosPacienteApiTest extends TestCase
{
    use MakeHabitosPacienteTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHabitosPaciente()
    {
        $habitosPaciente = $this->fakeHabitosPacienteData();
        $this->json('POST', '/api/v1/habitosPacientes', $habitosPaciente);

        $this->assertApiResponse($habitosPaciente);
    }

    /**
     * @test
     */
    public function testReadHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $this->json('GET', '/api/v1/habitosPacientes/'.$habitosPaciente->id);

        $this->assertApiResponse($habitosPaciente->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $editedHabitosPaciente = $this->fakeHabitosPacienteData();

        $this->json('PUT', '/api/v1/habitosPacientes/'.$habitosPaciente->id, $editedHabitosPaciente);

        $this->assertApiResponse($editedHabitosPaciente);
    }

    /**
     * @test
     */
    public function testDeleteHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $this->json('DELETE', '/api/v1/habitosPacientes/'.$habitosPaciente->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/habitosPacientes/'.$habitosPaciente->id);

        $this->assertResponseStatus(404);
    }
}
