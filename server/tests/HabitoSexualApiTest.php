<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitoSexualApiTest extends TestCase
{
    use MakeHabitoSexualTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHabitoSexual()
    {
        $habitoSexual = $this->fakeHabitoSexualData();
        $this->json('POST', '/api/v1/habitoSexuals', $habitoSexual);

        $this->assertApiResponse($habitoSexual);
    }

    /**
     * @test
     */
    public function testReadHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $this->json('GET', '/api/v1/habitoSexuals/'.$habitoSexual->id);

        $this->assertApiResponse($habitoSexual->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $editedHabitoSexual = $this->fakeHabitoSexualData();

        $this->json('PUT', '/api/v1/habitoSexuals/'.$habitoSexual->id, $editedHabitoSexual);

        $this->assertApiResponse($editedHabitoSexual);
    }

    /**
     * @test
     */
    public function testDeleteHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $this->json('DELETE', '/api/v1/habitoSexuals/'.$habitoSexual->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/habitoSexuals/'.$habitoSexual->id);

        $this->assertResponseStatus(404);
    }
}
