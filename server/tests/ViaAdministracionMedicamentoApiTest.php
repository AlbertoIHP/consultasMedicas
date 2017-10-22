<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ViaAdministracionMedicamentoApiTest extends TestCase
{
    use MakeViaAdministracionMedicamentoTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->fakeViaAdministracionMedicamentoData();
        $this->json('POST', '/api/v1/viaAdministracionMedicamentos', $viaAdministracionMedicamento);

        $this->assertApiResponse($viaAdministracionMedicamento);
    }

    /**
     * @test
     */
    public function testReadViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $this->json('GET', '/api/v1/viaAdministracionMedicamentos/'.$viaAdministracionMedicamento->id);

        $this->assertApiResponse($viaAdministracionMedicamento->toArray());
    }

    /**
     * @test
     */
    public function testUpdateViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $editedViaAdministracionMedicamento = $this->fakeViaAdministracionMedicamentoData();

        $this->json('PUT', '/api/v1/viaAdministracionMedicamentos/'.$viaAdministracionMedicamento->id, $editedViaAdministracionMedicamento);

        $this->assertApiResponse($editedViaAdministracionMedicamento);
    }

    /**
     * @test
     */
    public function testDeleteViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $this->json('DELETE', '/api/v1/viaAdministracionMedicamentos/'.$viaAdministracionMedicamento->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/viaAdministracionMedicamentos/'.$viaAdministracionMedicamento->id);

        $this->assertResponseStatus(404);
    }
}
