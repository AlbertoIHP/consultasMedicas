<?php

use App\Models\TipoSangre;
use App\Repositories\TipoSangreRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TipoSangreRepositoryTest extends TestCase
{
    use MakeTipoSangreTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var TipoSangreRepository
     */
    protected $tipoSangreRepo;

    public function setUp()
    {
        parent::setUp();
        $this->tipoSangreRepo = App::make(TipoSangreRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateTipoSangre()
    {
        $tipoSangre = $this->fakeTipoSangreData();
        $createdTipoSangre = $this->tipoSangreRepo->create($tipoSangre);
        $createdTipoSangre = $createdTipoSangre->toArray();
        $this->assertArrayHasKey('id', $createdTipoSangre);
        $this->assertNotNull($createdTipoSangre['id'], 'Created TipoSangre must have id specified');
        $this->assertNotNull(TipoSangre::find($createdTipoSangre['id']), 'TipoSangre with given id must be in DB');
        $this->assertModelData($tipoSangre, $createdTipoSangre);
    }

    /**
     * @test read
     */
    public function testReadTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $dbTipoSangre = $this->tipoSangreRepo->find($tipoSangre->id);
        $dbTipoSangre = $dbTipoSangre->toArray();
        $this->assertModelData($tipoSangre->toArray(), $dbTipoSangre);
    }

    /**
     * @test update
     */
    public function testUpdateTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $fakeTipoSangre = $this->fakeTipoSangreData();
        $updatedTipoSangre = $this->tipoSangreRepo->update($fakeTipoSangre, $tipoSangre->id);
        $this->assertModelData($fakeTipoSangre, $updatedTipoSangre->toArray());
        $dbTipoSangre = $this->tipoSangreRepo->find($tipoSangre->id);
        $this->assertModelData($fakeTipoSangre, $dbTipoSangre->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteTipoSangre()
    {
        $tipoSangre = $this->makeTipoSangre();
        $resp = $this->tipoSangreRepo->delete($tipoSangre->id);
        $this->assertTrue($resp);
        $this->assertNull(TipoSangre::find($tipoSangre->id), 'TipoSangre should not exist in DB');
    }
}
