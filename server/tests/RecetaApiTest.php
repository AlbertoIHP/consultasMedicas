<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RecetaApiTest extends TestCase
{
    use MakeRecetaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateReceta()
    {
        $receta = $this->fakeRecetaData();
        $this->json('POST', '/api/v1/recetas', $receta);

        $this->assertApiResponse($receta);
    }

    /**
     * @test
     */
    public function testReadReceta()
    {
        $receta = $this->makeReceta();
        $this->json('GET', '/api/v1/recetas/'.$receta->id);

        $this->assertApiResponse($receta->toArray());
    }

    /**
     * @test
     */
    public function testUpdateReceta()
    {
        $receta = $this->makeReceta();
        $editedReceta = $this->fakeRecetaData();

        $this->json('PUT', '/api/v1/recetas/'.$receta->id, $editedReceta);

        $this->assertApiResponse($editedReceta);
    }

    /**
     * @test
     */
    public function testDeleteReceta()
    {
        $receta = $this->makeReceta();
        $this->json('DELETE', '/api/v1/recetas/'.$receta->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/recetas/'.$receta->id);

        $this->assertResponseStatus(404);
    }
}
