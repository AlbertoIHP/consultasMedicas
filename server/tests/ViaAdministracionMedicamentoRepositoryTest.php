<?php

use App\Models\ViaAdministracionMedicamento;
use App\Repositories\ViaAdministracionMedicamentoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ViaAdministracionMedicamentoRepositoryTest extends TestCase
{
    use MakeViaAdministracionMedicamentoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ViaAdministracionMedicamentoRepository
     */
    protected $viaAdministracionMedicamentoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->viaAdministracionMedicamentoRepo = App::make(ViaAdministracionMedicamentoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->fakeViaAdministracionMedicamentoData();
        $createdViaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepo->create($viaAdministracionMedicamento);
        $createdViaAdministracionMedicamento = $createdViaAdministracionMedicamento->toArray();
        $this->assertArrayHasKey('id', $createdViaAdministracionMedicamento);
        $this->assertNotNull($createdViaAdministracionMedicamento['id'], 'Created ViaAdministracionMedicamento must have id specified');
        $this->assertNotNull(ViaAdministracionMedicamento::find($createdViaAdministracionMedicamento['id']), 'ViaAdministracionMedicamento with given id must be in DB');
        $this->assertModelData($viaAdministracionMedicamento, $createdViaAdministracionMedicamento);
    }

    /**
     * @test read
     */
    public function testReadViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $dbViaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepo->find($viaAdministracionMedicamento->id);
        $dbViaAdministracionMedicamento = $dbViaAdministracionMedicamento->toArray();
        $this->assertModelData($viaAdministracionMedicamento->toArray(), $dbViaAdministracionMedicamento);
    }

    /**
     * @test update
     */
    public function testUpdateViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $fakeViaAdministracionMedicamento = $this->fakeViaAdministracionMedicamentoData();
        $updatedViaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepo->update($fakeViaAdministracionMedicamento, $viaAdministracionMedicamento->id);
        $this->assertModelData($fakeViaAdministracionMedicamento, $updatedViaAdministracionMedicamento->toArray());
        $dbViaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepo->find($viaAdministracionMedicamento->id);
        $this->assertModelData($fakeViaAdministracionMedicamento, $dbViaAdministracionMedicamento->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteViaAdministracionMedicamento()
    {
        $viaAdministracionMedicamento = $this->makeViaAdministracionMedicamento();
        $resp = $this->viaAdministracionMedicamentoRepo->delete($viaAdministracionMedicamento->id);
        $this->assertTrue($resp);
        $this->assertNull(ViaAdministracionMedicamento::find($viaAdministracionMedicamento->id), 'ViaAdministracionMedicamento should not exist in DB');
    }
}
