<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EspecialidadApiTest extends TestCase
{
    use MakeEspecialidadTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateEspecialidad()
    {
        $especialidad = $this->fakeEspecialidadData();
        $this->json('POST', '/api/v1/especialidads', $especialidad);

        $this->assertApiResponse($especialidad);
    }

    /**
     * @test
     */
    public function testReadEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $this->json('GET', '/api/v1/especialidads/'.$especialidad->id);

        $this->assertApiResponse($especialidad->toArray());
    }

    /**
     * @test
     */
    public function testUpdateEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $editedEspecialidad = $this->fakeEspecialidadData();

        $this->json('PUT', '/api/v1/especialidads/'.$especialidad->id, $editedEspecialidad);

        $this->assertApiResponse($editedEspecialidad);
    }

    /**
     * @test
     */
    public function testDeleteEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $this->json('DELETE', '/api/v1/especialidads/'.$especialidad->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/especialidads/'.$especialidad->id);

        $this->assertResponseStatus(404);
    }
}
