<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PersonaApiTest extends TestCase
{
    use MakePersonaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePersona()
    {
        $persona = $this->fakePersonaData();
        $this->json('POST', '/api/v1/personas', $persona);

        $this->assertApiResponse($persona);
    }

    /**
     * @test
     */
    public function testReadPersona()
    {
        $persona = $this->makePersona();
        $this->json('GET', '/api/v1/personas/'.$persona->id);

        $this->assertApiResponse($persona->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePersona()
    {
        $persona = $this->makePersona();
        $editedPersona = $this->fakePersonaData();

        $this->json('PUT', '/api/v1/personas/'.$persona->id, $editedPersona);

        $this->assertApiResponse($editedPersona);
    }

    /**
     * @test
     */
    public function testDeletePersona()
    {
        $persona = $this->makePersona();
        $this->json('DELETE', '/api/v1/personas/'.$persona->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/personas/'.$persona->id);

        $this->assertResponseStatus(404);
    }
}
