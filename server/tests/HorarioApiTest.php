<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HorarioApiTest extends TestCase
{
    use MakeHorarioTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateHorario()
    {
        $horario = $this->fakeHorarioData();
        $this->json('POST', '/api/v1/horarios', $horario);

        $this->assertApiResponse($horario);
    }

    /**
     * @test
     */
    public function testReadHorario()
    {
        $horario = $this->makeHorario();
        $this->json('GET', '/api/v1/horarios/'.$horario->id);

        $this->assertApiResponse($horario->toArray());
    }

    /**
     * @test
     */
    public function testUpdateHorario()
    {
        $horario = $this->makeHorario();
        $editedHorario = $this->fakeHorarioData();

        $this->json('PUT', '/api/v1/horarios/'.$horario->id, $editedHorario);

        $this->assertApiResponse($editedHorario);
    }

    /**
     * @test
     */
    public function testDeleteHorario()
    {
        $horario = $this->makeHorario();
        $this->json('DELETE', '/api/v1/horarios/'.$horario->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/horarios/'.$horario->id);

        $this->assertResponseStatus(404);
    }
}
