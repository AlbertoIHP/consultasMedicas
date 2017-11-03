<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicoApiTest extends TestCase
{
    use MakeMedicoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateMedico()
    {
        $medico = $this->fakeMedicoData();
        $this->json('POST', '/api/v1/medicos', $medico);

        $this->assertApiResponse($medico);
    }

    /**
     * @test
     */
    public function testReadMedico()
    {
        $medico = $this->makeMedico();
        $this->json('GET', '/api/v1/medicos/'.$medico->id);

        $this->assertApiResponse($medico->toArray());
    }

    /**
     * @test
     */
    public function testUpdateMedico()
    {
        $medico = $this->makeMedico();
        $editedMedico = $this->fakeMedicoData();

        $this->json('PUT', '/api/v1/medicos/'.$medico->id, $editedMedico);

        $this->assertApiResponse($editedMedico);
    }

    /**
     * @test
     */
    public function testDeleteMedico()
    {
        $medico = $this->makeMedico();
        $this->json('DELETE', '/api/v1/medicos/'.$medico->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/medicos/'.$medico->id);

        $this->assertResponseStatus(404);
    }
}
