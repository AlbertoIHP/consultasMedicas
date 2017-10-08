<?php

use App\Models\DiagnosticoAtencion;
use App\Repositories\DiagnosticoAtencionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticoAtencionRepositoryTest extends TestCase
{
    use MakeDiagnosticoAtencionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var DiagnosticoAtencionRepository
     */
    protected $diagnosticoAtencionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->diagnosticoAtencionRepo = App::make(DiagnosticoAtencionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->fakeDiagnosticoAtencionData();
        $createdDiagnosticoAtencion = $this->diagnosticoAtencionRepo->create($diagnosticoAtencion);
        $createdDiagnosticoAtencion = $createdDiagnosticoAtencion->toArray();
        $this->assertArrayHasKey('id', $createdDiagnosticoAtencion);
        $this->assertNotNull($createdDiagnosticoAtencion['id'], 'Created DiagnosticoAtencion must have id specified');
        $this->assertNotNull(DiagnosticoAtencion::find($createdDiagnosticoAtencion['id']), 'DiagnosticoAtencion with given id must be in DB');
        $this->assertModelData($diagnosticoAtencion, $createdDiagnosticoAtencion);
    }

    /**
     * @test read
     */
    public function testReadDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $dbDiagnosticoAtencion = $this->diagnosticoAtencionRepo->find($diagnosticoAtencion->id);
        $dbDiagnosticoAtencion = $dbDiagnosticoAtencion->toArray();
        $this->assertModelData($diagnosticoAtencion->toArray(), $dbDiagnosticoAtencion);
    }

    /**
     * @test update
     */
    public function testUpdateDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $fakeDiagnosticoAtencion = $this->fakeDiagnosticoAtencionData();
        $updatedDiagnosticoAtencion = $this->diagnosticoAtencionRepo->update($fakeDiagnosticoAtencion, $diagnosticoAtencion->id);
        $this->assertModelData($fakeDiagnosticoAtencion, $updatedDiagnosticoAtencion->toArray());
        $dbDiagnosticoAtencion = $this->diagnosticoAtencionRepo->find($diagnosticoAtencion->id);
        $this->assertModelData($fakeDiagnosticoAtencion, $dbDiagnosticoAtencion->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteDiagnosticoAtencion()
    {
        $diagnosticoAtencion = $this->makeDiagnosticoAtencion();
        $resp = $this->diagnosticoAtencionRepo->delete($diagnosticoAtencion->id);
        $this->assertTrue($resp);
        $this->assertNull(DiagnosticoAtencion::find($diagnosticoAtencion->id), 'DiagnosticoAtencion should not exist in DB');
    }
}
