<?php

use App\Models\Diagnostico;
use App\Repositories\DiagnosticoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DiagnosticoRepositoryTest extends TestCase
{
    use MakeDiagnosticoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var DiagnosticoRepository
     */
    protected $diagnosticoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->diagnosticoRepo = App::make(DiagnosticoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateDiagnostico()
    {
        $diagnostico = $this->fakeDiagnosticoData();
        $createdDiagnostico = $this->diagnosticoRepo->create($diagnostico);
        $createdDiagnostico = $createdDiagnostico->toArray();
        $this->assertArrayHasKey('id', $createdDiagnostico);
        $this->assertNotNull($createdDiagnostico['id'], 'Created Diagnostico must have id specified');
        $this->assertNotNull(Diagnostico::find($createdDiagnostico['id']), 'Diagnostico with given id must be in DB');
        $this->assertModelData($diagnostico, $createdDiagnostico);
    }

    /**
     * @test read
     */
    public function testReadDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $dbDiagnostico = $this->diagnosticoRepo->find($diagnostico->id);
        $dbDiagnostico = $dbDiagnostico->toArray();
        $this->assertModelData($diagnostico->toArray(), $dbDiagnostico);
    }

    /**
     * @test update
     */
    public function testUpdateDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $fakeDiagnostico = $this->fakeDiagnosticoData();
        $updatedDiagnostico = $this->diagnosticoRepo->update($fakeDiagnostico, $diagnostico->id);
        $this->assertModelData($fakeDiagnostico, $updatedDiagnostico->toArray());
        $dbDiagnostico = $this->diagnosticoRepo->find($diagnostico->id);
        $this->assertModelData($fakeDiagnostico, $dbDiagnostico->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteDiagnostico()
    {
        $diagnostico = $this->makeDiagnostico();
        $resp = $this->diagnosticoRepo->delete($diagnostico->id);
        $this->assertTrue($resp);
        $this->assertNull(Diagnostico::find($diagnostico->id), 'Diagnostico should not exist in DB');
    }
}
