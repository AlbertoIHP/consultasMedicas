<?php

use App\Models\TipoBox;
use App\Repositories\TipoBoxRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TipoBoxRepositoryTest extends TestCase
{
    use MakeTipoBoxTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var TipoBoxRepository
     */
    protected $tipoBoxRepo;

    public function setUp()
    {
        parent::setUp();
        $this->tipoBoxRepo = App::make(TipoBoxRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateTipoBox()
    {
        $tipoBox = $this->fakeTipoBoxData();
        $createdTipoBox = $this->tipoBoxRepo->create($tipoBox);
        $createdTipoBox = $createdTipoBox->toArray();
        $this->assertArrayHasKey('id', $createdTipoBox);
        $this->assertNotNull($createdTipoBox['id'], 'Created TipoBox must have id specified');
        $this->assertNotNull(TipoBox::find($createdTipoBox['id']), 'TipoBox with given id must be in DB');
        $this->assertModelData($tipoBox, $createdTipoBox);
    }

    /**
     * @test read
     */
    public function testReadTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $dbTipoBox = $this->tipoBoxRepo->find($tipoBox->id);
        $dbTipoBox = $dbTipoBox->toArray();
        $this->assertModelData($tipoBox->toArray(), $dbTipoBox);
    }

    /**
     * @test update
     */
    public function testUpdateTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $fakeTipoBox = $this->fakeTipoBoxData();
        $updatedTipoBox = $this->tipoBoxRepo->update($fakeTipoBox, $tipoBox->id);
        $this->assertModelData($fakeTipoBox, $updatedTipoBox->toArray());
        $dbTipoBox = $this->tipoBoxRepo->find($tipoBox->id);
        $this->assertModelData($fakeTipoBox, $dbTipoBox->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteTipoBox()
    {
        $tipoBox = $this->makeTipoBox();
        $resp = $this->tipoBoxRepo->delete($tipoBox->id);
        $this->assertTrue($resp);
        $this->assertNull(TipoBox::find($tipoBox->id), 'TipoBox should not exist in DB');
    }
}
