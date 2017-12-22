<?php

use App\Models\Feriado;
use App\Repositories\FeriadoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FeriadoRepositoryTest extends TestCase
{
    use MakeFeriadoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var FeriadoRepository
     */
    protected $feriadoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->feriadoRepo = App::make(FeriadoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateFeriado()
    {
        $feriado = $this->fakeFeriadoData();
        $createdFeriado = $this->feriadoRepo->create($feriado);
        $createdFeriado = $createdFeriado->toArray();
        $this->assertArrayHasKey('id', $createdFeriado);
        $this->assertNotNull($createdFeriado['id'], 'Created Feriado must have id specified');
        $this->assertNotNull(Feriado::find($createdFeriado['id']), 'Feriado with given id must be in DB');
        $this->assertModelData($feriado, $createdFeriado);
    }

    /**
     * @test read
     */
    public function testReadFeriado()
    {
        $feriado = $this->makeFeriado();
        $dbFeriado = $this->feriadoRepo->find($feriado->id);
        $dbFeriado = $dbFeriado->toArray();
        $this->assertModelData($feriado->toArray(), $dbFeriado);
    }

    /**
     * @test update
     */
    public function testUpdateFeriado()
    {
        $feriado = $this->makeFeriado();
        $fakeFeriado = $this->fakeFeriadoData();
        $updatedFeriado = $this->feriadoRepo->update($fakeFeriado, $feriado->id);
        $this->assertModelData($fakeFeriado, $updatedFeriado->toArray());
        $dbFeriado = $this->feriadoRepo->find($feriado->id);
        $this->assertModelData($fakeFeriado, $dbFeriado->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteFeriado()
    {
        $feriado = $this->makeFeriado();
        $resp = $this->feriadoRepo->delete($feriado->id);
        $this->assertTrue($resp);
        $this->assertNull(Feriado::find($feriado->id), 'Feriado should not exist in DB');
    }
}
