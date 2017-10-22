<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PrevisionActualApiTest extends TestCase
{
    use MakePrevisionActualTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePrevisionActual()
    {
        $previsionActual = $this->fakePrevisionActualData();
        $this->json('POST', '/api/v1/previsionActuals', $previsionActual);

        $this->assertApiResponse($previsionActual);
    }

    /**
     * @test
     */
    public function testReadPrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $this->json('GET', '/api/v1/previsionActuals/'.$previsionActual->id);

        $this->assertApiResponse($previsionActual->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $editedPrevisionActual = $this->fakePrevisionActualData();

        $this->json('PUT', '/api/v1/previsionActuals/'.$previsionActual->id, $editedPrevisionActual);

        $this->assertApiResponse($editedPrevisionActual);
    }

    /**
     * @test
     */
    public function testDeletePrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $this->json('DELETE', '/api/v1/previsionActuals/'.$previsionActual->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/previsionActuals/'.$previsionActual->id);

        $this->assertResponseStatus(404);
    }
}
