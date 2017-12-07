<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiaApiTest extends TestCase
{
    use MakeAlergiaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAlergia()
    {
        $alergia = $this->fakeAlergiaData();
        $this->json('POST', '/api/v1/alergias', $alergia);

        $this->assertApiResponse($alergia);
    }

    /**
     * @test
     */
    public function testReadAlergia()
    {
        $alergia = $this->makeAlergia();
        $this->json('GET', '/api/v1/alergias/'.$alergia->id);

        $this->assertApiResponse($alergia->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAlergia()
    {
        $alergia = $this->makeAlergia();
        $editedAlergia = $this->fakeAlergiaData();

        $this->json('PUT', '/api/v1/alergias/'.$alergia->id, $editedAlergia);

        $this->assertApiResponse($editedAlergia);
    }

    /**
     * @test
     */
    public function testDeleteAlergia()
    {
        $alergia = $this->makeAlergia();
        $this->json('DELETE', '/api/v1/alergias/'.$alergia->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/alergias/'.$alergia->id);

        $this->assertResponseStatus(404);
    }
}
