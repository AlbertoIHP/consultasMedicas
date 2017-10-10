<?php

use App\Models\Historial;
use App\Repositories\HistorialRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HistorialRepositoryTest extends TestCase
{
    use MakeHistorialTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HistorialRepository
     */
    protected $historialRepo;

    public function setUp()
    {
        parent::setUp();
        $this->historialRepo = App::make(HistorialRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHistorial()
    {
        $historial = $this->fakeHistorialData();
        $createdHistorial = $this->historialRepo->create($historial);
        $createdHistorial = $createdHistorial->toArray();
        $this->assertArrayHasKey('id', $createdHistorial);
        $this->assertNotNull($createdHistorial['id'], 'Created Historial must have id specified');
        $this->assertNotNull(Historial::find($createdHistorial['id']), 'Historial with given id must be in DB');
        $this->assertModelData($historial, $createdHistorial);
    }

    /**
     * @test read
     */
    public function testReadHistorial()
    {
        $historial = $this->makeHistorial();
        $dbHistorial = $this->historialRepo->find($historial->id);
        $dbHistorial = $dbHistorial->toArray();
        $this->assertModelData($historial->toArray(), $dbHistorial);
    }

    /**
     * @test update
     */
    public function testUpdateHistorial()
    {
        $historial = $this->makeHistorial();
        $fakeHistorial = $this->fakeHistorialData();
        $updatedHistorial = $this->historialRepo->update($fakeHistorial, $historial->id);
        $this->assertModelData($fakeHistorial, $updatedHistorial->toArray());
        $dbHistorial = $this->historialRepo->find($historial->id);
        $this->assertModelData($fakeHistorial, $dbHistorial->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHistorial()
    {
        $historial = $this->makeHistorial();
        $resp = $this->historialRepo->delete($historial->id);
        $this->assertTrue($resp);
        $this->assertNull(Historial::find($historial->id), 'Historial should not exist in DB');
    }
}
