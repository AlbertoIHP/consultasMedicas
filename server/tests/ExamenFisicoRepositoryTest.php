<?php

use App\Models\ExamenFisico;
use App\Repositories\ExamenFisicoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExamenFisicoRepositoryTest extends TestCase
{
    use MakeExamenFisicoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ExamenFisicoRepository
     */
    protected $examenFisicoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->examenFisicoRepo = App::make(ExamenFisicoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateExamenFisico()
    {
        $examenFisico = $this->fakeExamenFisicoData();
        $createdExamenFisico = $this->examenFisicoRepo->create($examenFisico);
        $createdExamenFisico = $createdExamenFisico->toArray();
        $this->assertArrayHasKey('id', $createdExamenFisico);
        $this->assertNotNull($createdExamenFisico['id'], 'Created ExamenFisico must have id specified');
        $this->assertNotNull(ExamenFisico::find($createdExamenFisico['id']), 'ExamenFisico with given id must be in DB');
        $this->assertModelData($examenFisico, $createdExamenFisico);
    }

    /**
     * @test read
     */
    public function testReadExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $dbExamenFisico = $this->examenFisicoRepo->find($examenFisico->id);
        $dbExamenFisico = $dbExamenFisico->toArray();
        $this->assertModelData($examenFisico->toArray(), $dbExamenFisico);
    }

    /**
     * @test update
     */
    public function testUpdateExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $fakeExamenFisico = $this->fakeExamenFisicoData();
        $updatedExamenFisico = $this->examenFisicoRepo->update($fakeExamenFisico, $examenFisico->id);
        $this->assertModelData($fakeExamenFisico, $updatedExamenFisico->toArray());
        $dbExamenFisico = $this->examenFisicoRepo->find($examenFisico->id);
        $this->assertModelData($fakeExamenFisico, $dbExamenFisico->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteExamenFisico()
    {
        $examenFisico = $this->makeExamenFisico();
        $resp = $this->examenFisicoRepo->delete($examenFisico->id);
        $this->assertTrue($resp);
        $this->assertNull(ExamenFisico::find($examenFisico->id), 'ExamenFisico should not exist in DB');
    }
}
