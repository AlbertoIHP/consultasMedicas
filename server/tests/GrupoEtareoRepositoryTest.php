<?php

use App\Models\GrupoEtareo;
use App\Repositories\GrupoEtareoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtareoRepositoryTest extends TestCase
{
    use MakeGrupoEtareoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var GrupoEtareoRepository
     */
    protected $grupoEtareoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->grupoEtareoRepo = App::make(GrupoEtareoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateGrupoEtareo()
    {
        $grupoEtareo = $this->fakeGrupoEtareoData();
        $createdGrupoEtareo = $this->grupoEtareoRepo->create($grupoEtareo);
        $createdGrupoEtareo = $createdGrupoEtareo->toArray();
        $this->assertArrayHasKey('id', $createdGrupoEtareo);
        $this->assertNotNull($createdGrupoEtareo['id'], 'Created GrupoEtareo must have id specified');
        $this->assertNotNull(GrupoEtareo::find($createdGrupoEtareo['id']), 'GrupoEtareo with given id must be in DB');
        $this->assertModelData($grupoEtareo, $createdGrupoEtareo);
    }

    /**
     * @test read
     */
    public function testReadGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $dbGrupoEtareo = $this->grupoEtareoRepo->find($grupoEtareo->id);
        $dbGrupoEtareo = $dbGrupoEtareo->toArray();
        $this->assertModelData($grupoEtareo->toArray(), $dbGrupoEtareo);
    }

    /**
     * @test update
     */
    public function testUpdateGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $fakeGrupoEtareo = $this->fakeGrupoEtareoData();
        $updatedGrupoEtareo = $this->grupoEtareoRepo->update($fakeGrupoEtareo, $grupoEtareo->id);
        $this->assertModelData($fakeGrupoEtareo, $updatedGrupoEtareo->toArray());
        $dbGrupoEtareo = $this->grupoEtareoRepo->find($grupoEtareo->id);
        $this->assertModelData($fakeGrupoEtareo, $dbGrupoEtareo->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteGrupoEtareo()
    {
        $grupoEtareo = $this->makeGrupoEtareo();
        $resp = $this->grupoEtareoRepo->delete($grupoEtareo->id);
        $this->assertTrue($resp);
        $this->assertNull(GrupoEtareo::find($grupoEtareo->id), 'GrupoEtareo should not exist in DB');
    }
}
