<?php

use App\Models\GrupoEtareoVacuna;
use App\Repositories\GrupoEtareoVacunaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GrupoEtareoVacunaRepositoryTest extends TestCase
{
    use MakeGrupoEtareoVacunaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var GrupoEtareoVacunaRepository
     */
    protected $grupoEtareoVacunaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->grupoEtareoVacunaRepo = App::make(GrupoEtareoVacunaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->fakeGrupoEtareoVacunaData();
        $createdGrupoEtareoVacuna = $this->grupoEtareoVacunaRepo->create($grupoEtareoVacuna);
        $createdGrupoEtareoVacuna = $createdGrupoEtareoVacuna->toArray();
        $this->assertArrayHasKey('id', $createdGrupoEtareoVacuna);
        $this->assertNotNull($createdGrupoEtareoVacuna['id'], 'Created GrupoEtareoVacuna must have id specified');
        $this->assertNotNull(GrupoEtareoVacuna::find($createdGrupoEtareoVacuna['id']), 'GrupoEtareoVacuna with given id must be in DB');
        $this->assertModelData($grupoEtareoVacuna, $createdGrupoEtareoVacuna);
    }

    /**
     * @test read
     */
    public function testReadGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $dbGrupoEtareoVacuna = $this->grupoEtareoVacunaRepo->find($grupoEtareoVacuna->id);
        $dbGrupoEtareoVacuna = $dbGrupoEtareoVacuna->toArray();
        $this->assertModelData($grupoEtareoVacuna->toArray(), $dbGrupoEtareoVacuna);
    }

    /**
     * @test update
     */
    public function testUpdateGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $fakeGrupoEtareoVacuna = $this->fakeGrupoEtareoVacunaData();
        $updatedGrupoEtareoVacuna = $this->grupoEtareoVacunaRepo->update($fakeGrupoEtareoVacuna, $grupoEtareoVacuna->id);
        $this->assertModelData($fakeGrupoEtareoVacuna, $updatedGrupoEtareoVacuna->toArray());
        $dbGrupoEtareoVacuna = $this->grupoEtareoVacunaRepo->find($grupoEtareoVacuna->id);
        $this->assertModelData($fakeGrupoEtareoVacuna, $dbGrupoEtareoVacuna->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteGrupoEtareoVacuna()
    {
        $grupoEtareoVacuna = $this->makeGrupoEtareoVacuna();
        $resp = $this->grupoEtareoVacunaRepo->delete($grupoEtareoVacuna->id);
        $this->assertTrue($resp);
        $this->assertNull(GrupoEtareoVacuna::find($grupoEtareoVacuna->id), 'GrupoEtareoVacuna should not exist in DB');
    }
}
