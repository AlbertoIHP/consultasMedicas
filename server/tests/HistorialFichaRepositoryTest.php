<?php

use App\Models\HistorialFicha;
use App\Repositories\HistorialFichaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HistorialFichaRepositoryTest extends TestCase
{
    use MakeHistorialFichaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HistorialFichaRepository
     */
    protected $historialFichaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->historialFichaRepo = App::make(HistorialFichaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHistorialFicha()
    {
        $historialFicha = $this->fakeHistorialFichaData();
        $createdHistorialFicha = $this->historialFichaRepo->create($historialFicha);
        $createdHistorialFicha = $createdHistorialFicha->toArray();
        $this->assertArrayHasKey('id', $createdHistorialFicha);
        $this->assertNotNull($createdHistorialFicha['id'], 'Created HistorialFicha must have id specified');
        $this->assertNotNull(HistorialFicha::find($createdHistorialFicha['id']), 'HistorialFicha with given id must be in DB');
        $this->assertModelData($historialFicha, $createdHistorialFicha);
    }

    /**
     * @test read
     */
    public function testReadHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $dbHistorialFicha = $this->historialFichaRepo->find($historialFicha->id);
        $dbHistorialFicha = $dbHistorialFicha->toArray();
        $this->assertModelData($historialFicha->toArray(), $dbHistorialFicha);
    }

    /**
     * @test update
     */
    public function testUpdateHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $fakeHistorialFicha = $this->fakeHistorialFichaData();
        $updatedHistorialFicha = $this->historialFichaRepo->update($fakeHistorialFicha, $historialFicha->id);
        $this->assertModelData($fakeHistorialFicha, $updatedHistorialFicha->toArray());
        $dbHistorialFicha = $this->historialFichaRepo->find($historialFicha->id);
        $this->assertModelData($fakeHistorialFicha, $dbHistorialFicha->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHistorialFicha()
    {
        $historialFicha = $this->makeHistorialFicha();
        $resp = $this->historialFichaRepo->delete($historialFicha->id);
        $this->assertTrue($resp);
        $this->assertNull(HistorialFicha::find($historialFicha->id), 'HistorialFicha should not exist in DB');
    }
}
