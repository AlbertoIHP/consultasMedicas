<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VacunaApiTest extends TestCase
{
    use MakeVacunaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateVacuna()
    {
        $vacuna = $this->fakeVacunaData();
        $this->json('POST', '/api/v1/vacunas', $vacuna);

        $this->assertApiResponse($vacuna);
    }

    /**
     * @test
     */
    public function testReadVacuna()
    {
        $vacuna = $this->makeVacuna();
        $this->json('GET', '/api/v1/vacunas/'.$vacuna->id);

        $this->assertApiResponse($vacuna->toArray());
    }

    /**
     * @test
     */
    public function testUpdateVacuna()
    {
        $vacuna = $this->makeVacuna();
        $editedVacuna = $this->fakeVacunaData();

        $this->json('PUT', '/api/v1/vacunas/'.$vacuna->id, $editedVacuna);

        $this->assertApiResponse($editedVacuna);
    }

    /**
     * @test
     */
    public function testDeleteVacuna()
    {
        $vacuna = $this->makeVacuna();
        $this->json('DELETE', '/api/v1/vacunas/'.$vacuna->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/vacunas/'.$vacuna->id);

        $this->assertResponseStatus(404);
    }
}
