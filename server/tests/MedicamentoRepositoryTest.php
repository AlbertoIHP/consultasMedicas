<?php

use App\Models\Medicamento;
use App\Repositories\MedicamentoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicamentoRepositoryTest extends TestCase
{
    use MakeMedicamentoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var MedicamentoRepository
     */
    protected $medicamentoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->medicamentoRepo = App::make(MedicamentoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateMedicamento()
    {
        $medicamento = $this->fakeMedicamentoData();
        $createdMedicamento = $this->medicamentoRepo->create($medicamento);
        $createdMedicamento = $createdMedicamento->toArray();
        $this->assertArrayHasKey('id', $createdMedicamento);
        $this->assertNotNull($createdMedicamento['id'], 'Created Medicamento must have id specified');
        $this->assertNotNull(Medicamento::find($createdMedicamento['id']), 'Medicamento with given id must be in DB');
        $this->assertModelData($medicamento, $createdMedicamento);
    }

    /**
     * @test read
     */
    public function testReadMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $dbMedicamento = $this->medicamentoRepo->find($medicamento->id);
        $dbMedicamento = $dbMedicamento->toArray();
        $this->assertModelData($medicamento->toArray(), $dbMedicamento);
    }

    /**
     * @test update
     */
    public function testUpdateMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $fakeMedicamento = $this->fakeMedicamentoData();
        $updatedMedicamento = $this->medicamentoRepo->update($fakeMedicamento, $medicamento->id);
        $this->assertModelData($fakeMedicamento, $updatedMedicamento->toArray());
        $dbMedicamento = $this->medicamentoRepo->find($medicamento->id);
        $this->assertModelData($fakeMedicamento, $dbMedicamento->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteMedicamento()
    {
        $medicamento = $this->makeMedicamento();
        $resp = $this->medicamentoRepo->delete($medicamento->id);
        $this->assertTrue($resp);
        $this->assertNull(Medicamento::find($medicamento->id), 'Medicamento should not exist in DB');
    }
}
