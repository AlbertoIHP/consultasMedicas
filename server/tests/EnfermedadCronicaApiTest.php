<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EnfermedadCronicaApiTest extends TestCase
{
    use MakeEnfermedadCronicaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateEnfermedadCronica()
    {
        $enfermedadCronica = $this->fakeEnfermedadCronicaData();
        $this->json('POST', '/api/v1/enfermedadCronicas', $enfermedadCronica);

        $this->assertApiResponse($enfermedadCronica);
    }

    /**
     * @test
     */
    public function testReadEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $this->json('GET', '/api/v1/enfermedadCronicas/'.$enfermedadCronica->id);

        $this->assertApiResponse($enfermedadCronica->toArray());
    }

    /**
     * @test
     */
    public function testUpdateEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $editedEnfermedadCronica = $this->fakeEnfermedadCronicaData();

        $this->json('PUT', '/api/v1/enfermedadCronicas/'.$enfermedadCronica->id, $editedEnfermedadCronica);

        $this->assertApiResponse($editedEnfermedadCronica);
    }

    /**
     * @test
     */
    public function testDeleteEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $this->json('DELETE', '/api/v1/enfermedadCronicas/'.$enfermedadCronica->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/enfermedadCronicas/'.$enfermedadCronica->id);

        $this->assertResponseStatus(404);
    }
}
