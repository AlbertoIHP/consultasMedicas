<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TipoBoxApiTest extends TestCase
{
    use MakeTipoBoxTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateTipoBox()
    {
        $tipoBox = $this->fakeTipoBoxData();
        $this->json('POST', '/api/v1/tipoBoxes', $tipoBox);

        $this->assertApiResponse($tipoBox);
    }

    /**
     * @test
     */
    public function testReadTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $this->json('GET', '/api/v1/tipoBoxes/'.$tipoBox->id);

        $this->assertApiResponse($tipoBox->toArray());
    }

    /**
     * @test
     */
    public function testUpdateTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $editedTipoBox = $this->fakeTipoBoxData();

        $this->json('PUT', '/api/v1/tipoBoxes/'.$tipoBox->id, $editedTipoBox);

        $this->assertApiResponse($editedTipoBox);
    }

    /**
     * @test
     */
    public function testDeleteTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $this->json('DELETE', '/api/v1/tipoBoxes/'.$tipoBox->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/tipoBoxes/'.$tipoBox->id);

        $this->assertResponseStatus(404);
    }
}
