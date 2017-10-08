<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ComunaApiTest extends TestCase
{
    use MakeComunaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateComuna()
    {
        $comuna = $this->fakeComunaData();
        $this->json('POST', '/api/v1/comunas', $comuna);

        $this->assertApiResponse($comuna);
    }

    /**
     * @test
     */
    public function testReadComuna()
    {
        $comuna = $this->makeComuna();
        $this->json('GET', '/api/v1/comunas/'.$comuna->id);

        $this->assertApiResponse($comuna->toArray());
    }

    /**
     * @test
     */
    public function testUpdateComuna()
    {
        $comuna = $this->makeComuna();
        $editedComuna = $this->fakeComunaData();

        $this->json('PUT', '/api/v1/comunas/'.$comuna->id, $editedComuna);

        $this->assertApiResponse($editedComuna);
    }

    /**
     * @test
     */
    public function testDeleteComuna()
    {
        $comuna = $this->makeComuna();
        $this->json('DELETE', '/api/v1/comunas/'.$comuna->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/comunas/'.$comuna->id);

        $this->assertResponseStatus(404);
    }
}
