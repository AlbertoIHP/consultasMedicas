<?php

use App\Models\GrupoEtnico;
use App\Repositories\GrupoEtnicoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtnicoRepositoryTest extends TestCase
{
    use MakeGrupoEtnicoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var GrupoEtnicoRepository
     */
    protected $grupoEtnicoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->grupoEtnicoRepo = App::make(GrupoEtnicoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateGrupoEtnico()
    {
        $grupoEtnico = $this->fakeGrupoEtnicoData();
        $createdGrupoEtnico = $this->grupoEtnicoRepo->create($grupoEtnico);
        $createdGrupoEtnico = $createdGrupoEtnico->toArray();
        $this->assertArrayHasKey('id', $createdGrupoEtnico);
        $this->assertNotNull($createdGrupoEtnico['id'], 'Created GrupoEtnico must have id specified');
        $this->assertNotNull(GrupoEtnico::find($createdGrupoEtnico['id']), 'GrupoEtnico with given id must be in DB');
        $this->assertModelData($grupoEtnico, $createdGrupoEtnico);
    }

    /**
     * @test read
     */
    public function testReadGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $dbGrupoEtnico = $this->grupoEtnicoRepo->find($grupoEtnico->id);
        $dbGrupoEtnico = $dbGrupoEtnico->toArray();
        $this->assertModelData($grupoEtnico->toArray(), $dbGrupoEtnico);
    }

    /**
     * @test update
     */
    public function testUpdateGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $fakeGrupoEtnico = $this->fakeGrupoEtnicoData();
        $updatedGrupoEtnico = $this->grupoEtnicoRepo->update($fakeGrupoEtnico, $grupoEtnico->id);
        $this->assertModelData($fakeGrupoEtnico, $updatedGrupoEtnico->toArray());
        $dbGrupoEtnico = $this->grupoEtnicoRepo->find($grupoEtnico->id);
        $this->assertModelData($fakeGrupoEtnico, $dbGrupoEtnico->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteGrupoEtnico()
    {
        $grupoEtnico = $this->makeGrupoEtnico();
        $resp = $this->grupoEtnicoRepo->delete($grupoEtnico->id);
        $this->assertTrue($resp);
        $this->assertNull(GrupoEtnico::find($grupoEtnico->id), 'GrupoEtnico should not exist in DB');
    }
}
