<?php

use App\Models\DiagnosticosAtencion;
use App\Repositories\DiagnosticosAtencionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticosAtencionRepositoryTest extends TestCase
{
    use MakeDiagnosticosAtencionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var DiagnosticosAtencionRepository
     */
    protected $diagnosticosAtencionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->diagnosticosAtencionRepo = App::make(DiagnosticosAtencionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->fakeDiagnosticosAtencionData();
        $createdDiagnosticosAtencion = $this->diagnosticosAtencionRepo->create($diagnosticosAtencion);
        $createdDiagnosticosAtencion = $createdDiagnosticosAtencion->toArray();
        $this->assertArrayHasKey('id', $createdDiagnosticosAtencion);
        $this->assertNotNull($createdDiagnosticosAtencion['id'], 'Created DiagnosticosAtencion must have id specified');
        $this->assertNotNull(DiagnosticosAtencion::find($createdDiagnosticosAtencion['id']), 'DiagnosticosAtencion with given id must be in DB');
        $this->assertModelData($diagnosticosAtencion, $createdDiagnosticosAtencion);
    }

    /**
     * @test read
     */
    public function testReadDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $dbDiagnosticosAtencion = $this->diagnosticosAtencionRepo->find($diagnosticosAtencion->id);
        $dbDiagnosticosAtencion = $dbDiagnosticosAtencion->toArray();
        $this->assertModelData($diagnosticosAtencion->toArray(), $dbDiagnosticosAtencion);
    }

    /**
     * @test update
     */
    public function testUpdateDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $fakeDiagnosticosAtencion = $this->fakeDiagnosticosAtencionData();
        $updatedDiagnosticosAtencion = $this->diagnosticosAtencionRepo->update($fakeDiagnosticosAtencion, $diagnosticosAtencion->id);
        $this->assertModelData($fakeDiagnosticosAtencion, $updatedDiagnosticosAtencion->toArray());
        $dbDiagnosticosAtencion = $this->diagnosticosAtencionRepo->find($diagnosticosAtencion->id);
        $this->assertModelData($fakeDiagnosticosAtencion, $dbDiagnosticosAtencion->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteDiagnosticosAtencion()
    {
        $diagnosticosAtencion = $this->makeDiagnosticosAtencion();
        $resp = $this->diagnosticosAtencionRepo->delete($diagnosticosAtencion->id);
        $this->assertTrue($resp);
        $this->assertNull(DiagnosticosAtencion::find($diagnosticosAtencion->id), 'DiagnosticosAtencion should not exist in DB');
    }
}
