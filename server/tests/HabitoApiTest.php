<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitoApiTest extends TestCase
{
    use MakeHabitoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHabito()
    {
        $habito = $this->fakeHabitoData();
        $this->json('POST', '/api/v1/habitos', $habito);

        $this->assertApiResponse($habito);
    }

    /**
     * @test
     */
    public function testReadHabito()
    {
        $habito = $this->makeHabito();
        $this->json('GET', '/api/v1/habitos/'.$habito->id);

        $this->assertApiResponse($habito->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHabito()
    {
        $habito = $this->makeHabito();
        $editedHabito = $this->fakeHabitoData();

        $this->json('PUT', '/api/v1/habitos/'.$habito->id, $editedHabito);

        $this->assertApiResponse($editedHabito);
    }

    /**
     * @test
     */
    public function testDeleteHabito()
    {
        $habito = $this->makeHabito();
        $this->json('DELETE', '/api/v1/habitos/'.$habito->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/habitos/'.$habito->id);

        $this->assertResponseStatus(404);
    }
}
